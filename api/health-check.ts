import type { VercelRequest, VercelResponse } from '@vercel/node';
import { promises as dns } from 'dns';
import net from 'net';
import { Resend } from 'resend';

// NOTE: In-memory rate limits are per serverless instance only for v1.
// In a multi-instance deployment, each warm instance maintains its own Map.
const checkRateMap = new Map<string, number[]>();
const emailRateMap = new Map<string, number[]>();

const CHECK_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const CHECK_MAX_PER_HOUR = 5;
const EMAIL_MAX_PER_HOUR = 2;

const HTML_TIMEOUT_MS = 10000;
const PSI_TIMEOUT_MS = 35000;
const MAX_REDIRECTS = 3;
const MAX_HTML_BYTES = 1_500_000; // 1.5 MB cap

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

function getClientIp(req: VercelRequest): string {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length > 0) {
    return xff.split(',')[0].trim();
  }
  if (Array.isArray(xff) && xff.length > 0) {
    return xff[0].split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(map: Map<string, number[]>, ip: string, maxRequests: number): boolean {
  const now = Date.now();
  const prev = map.get(ip) || [];
  const recent = prev.filter((ts) => now - ts < CHECK_WINDOW_MS);
  if (recent.length >= maxRequests) {
    map.set(ip, recent);
    return true;
  }
  recent.push(now);
  map.set(ip, recent);
  return false;
}

function isPrivateOrReservedIp(ip: string): boolean {
  const normalized = ip.toLowerCase().trim();

  // Handle IPv4-mapped IPv6 addresses such as ::ffff:127.0.0.1
  if (normalized.startsWith('::ffff:')) {
    const mappedV4 = normalized.slice(7);
    if (net.isIP(mappedV4) === 4) {
      return isPrivateOrReservedIp(mappedV4);
    }
  }

  const version = net.isIP(normalized);
  if (version === 4) {
    const parts = normalized.split('.').map(Number);
    if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
      return true;
    }
    const [a, b, c] = parts;
    if (a === 0) return true; // 0.0.0.0/8
    if (a === 10) return true; // 10.0.0.0/8 private
    if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10 carrier-grade NAT
    if (a === 127) return true; // 127.0.0.0/8 loopback
    if (a === 169 && b === 254) return true; // 169.254.0.0/16 link-local & cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12 private
    if (a === 192 && b === 0 && c === 0) return true; // 192.0.0.0/24 IETF protocol
    if (a === 192 && b === 0 && c === 2) return true; // 192.0.2.0/24 TEST-NET-1
    if (a === 192 && b === 168) return true; // 192.168.0.0/16 private
    if (a === 198 && (b === 18 || b === 19)) return true; // 198.18.0.0/15 benchmark
    if (a === 198 && b === 51 && c === 100) return true; // 198.51.100.0/24 TEST-NET-2
    if (a === 203 && b === 0 && c === 113) return true; // 203.0.113.0/24 TEST-NET-3
    if (a >= 224) return true; // multicast & reserved
    return false;
  }

  if (version === 6) {
    if (normalized === '::' || normalized === '::1') return true;
    if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true; // Unique local fc00::/7
    if (
      normalized.startsWith('fe8') ||
      normalized.startsWith('fe9') ||
      normalized.startsWith('fea') ||
      normalized.startsWith('feb')
    ) {
      return true; // Link-local fe80::/10
    }
    if (normalized.startsWith('ff')) return true; // Multicast
    return false;
  }

  return true;
}

function isDisallowedHostname(hostname: string): boolean {
  const lower = hostname.toLowerCase().trim().replace(/\.$/, '');
  if (!lower || !lower.includes('.')) return true;
  if (
    lower === 'localhost' ||
    lower.endsWith('.localhost') ||
    lower.endsWith('.local') ||
    lower.endsWith('.internal') ||
    lower.endsWith('.arpa') ||
    lower.endsWith('.lan') ||
    lower.endsWith('.home') ||
    lower === 'metadata.google.internal'
  ) {
    return true;
  }
  return false;
}

async function validateAndResolveUrl(rawInput: string): Promise<{ ok: true; url: URL } | { ok: false; message: string }> {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { ok: false, message: 'Please enter a website address.' };
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(withProtocol);
  } catch {
    return { ok: false, message: 'That address does not look like a valid website URL.' };
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { ok: false, message: 'Only standard http and https website addresses are supported.' };
  }

  if (parsed.username || parsed.password) {
    return { ok: false, message: 'Website addresses with embedded credentials are not supported.' };
  }

  const hostname = parsed.hostname.replace(/^\[|\]$/g, '');
  const privateAddressMsg =
    "That address can't be checked. Please enter your public website address, like yourbusiness.co.uk.";

  if (isDisallowedHostname(hostname)) {
    return { ok: false, message: privateAddressMsg };
  }

  if (net.isIP(hostname) !== 0) {
    if (isPrivateOrReservedIp(hostname)) {
      return { ok: false, message: privateAddressMsg };
    }
    return { ok: true, url: parsed };
  }

  try {
    const records = await dns.lookup(hostname, { all: true, verbatim: true });
    if (!records || records.length === 0) {
      return { ok: false, message: 'We could not find that website address. Please check the spelling and try again.' };
    }
    for (const rec of records) {
      if (isPrivateOrReservedIp(rec.address)) {
        return { ok: false, message: privateAddressMsg };
      }
    }
  } catch {
    return { ok: false, message: 'We could not find that website address. Please check the spelling and try again.' };
  }

  return { ok: true, url: parsed };
}

async function fetchHtmlWithManualRedirects(initialUrl: URL): Promise<{
  finalUrl: URL;
  html: string;
}> {
  let currentUrl = initialUrl;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), HTML_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(currentUrl.toString(), {
        method: 'GET',
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1 DSWHealthCheck/1.0',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.9',
        },
      });
    } finally {
      clearTimeout(timeout);
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) {
        throw new Error('Redirect response was missing a location header.');
      }
      if (hop === MAX_REDIRECTS) {
        throw new Error('Too many redirects while loading the website.');
      }
      let nextTarget: URL;
      try {
        nextTarget = new URL(location, currentUrl);
      } catch {
        throw new Error('Website redirected to an invalid address.');
      }

      const resolved = await validateAndResolveUrl(nextTarget.toString());
      if (resolved.ok === false) {
        throw new Error(resolved.message);
      }
      currentUrl = resolved.url;
      continue;
    }

    if (!response.ok) {
      throw new Error(`Website returned status ${response.status}.`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      const text = await response.text();
      return { finalUrl: currentUrl, html: text.slice(0, MAX_HTML_BYTES) };
    }

    const chunks: Uint8Array[] = [];
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        received += value.byteLength;
        if (received >= MAX_HTML_BYTES) {
          await reader.cancel();
          break;
        }
      }
    }

    const decoder = new TextDecoder('utf-8');
    const html = chunks.map((chunk) => decoder.decode(chunk, { stream: true })).join('') + decoder.decode();
    return { finalUrl: currentUrl, html };
  }

  throw new Error('Too many redirects while loading the website.');
}

export interface HtmlCheckItem {
  id: string;
  label: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
  explanation: string;
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function analyzeHtml(html: string, finalUrl: URL): HtmlCheckItem[] {
  const checks: HtmlCheckItem[] = [];

  // 1. HTTPS
  const isHttps = finalUrl.protocol === 'https:';
  checks.push({
    id: 'https',
    label: 'Secure HTTPS connection',
    status: isHttps ? 'pass' : 'fail',
    detail: isHttps ? 'Active' : 'Not secure (HTTP)',
    explanation: isHttps
      ? 'Your site uses a secure connection, so browsers do not warn customers away.'
      : 'Browsers label your site "Not Secure", which makes homeowners hesitate before calling or filling in a form.',
  });

  // 2. Mobile viewport meta tag
  const viewportMatch = html.match(/<meta[^>]+name=["']viewport["'][^>]*>/i);
  const hasViewport = Boolean(viewportMatch && /width\s*=\s*device-width/i.test(viewportMatch[0]));
  checks.push({
    id: 'viewport',
    label: 'Mobile screen sizing',
    status: hasViewport ? 'pass' : 'fail',
    detail: hasViewport ? 'Mobile viewport set' : 'Missing mobile viewport tag',
    explanation: hasViewport
      ? 'Your page scales properly to fit phone screens without pinching and zooming.'
      : 'Without a mobile viewport tag, phones shrink your page into tiny text that is hard to read or tap.',
  });

  // 3. Page title & meta description
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch ? decodeEntities(titleMatch[1]) : '';
  const descMatch =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
  const descText = descMatch ? decodeEntities(descMatch[1]) : '';

  if (!titleText || !descText) {
    const missingParts = !titleText && !descText ? 'page title and meta description' : !titleText ? 'page title' : 'meta description';
    checks.push({
      id: 'meta-seo',
      label: 'Google search title and description',
      status: 'fail',
      detail: `Missing ${missingParts}`,
      explanation: `Your ${missingParts} is missing, so Google has to guess what trade and area you cover in search results.`,
    });
  } else if (titleText.length > 68 || descText.length > 170) {
    checks.push({
      id: 'meta-seo',
      label: 'Google search title and description',
      status: 'warning',
      detail: `Title (${titleText.length} chars) or description (${descText.length} chars) is long`,
      explanation:
        'Your search title or description is too long and gets cut off on Google before customers see your area or phone number.',
    });
  } else {
    checks.push({
      id: 'meta-seo',
      label: 'Google search title and description',
      status: 'pass',
      detail: `${titleText.slice(0, 42)}${titleText.length > 42 ? '...' : ''}`,
      explanation: 'Your page has a clear title and description ready for local Google searches.',
    });
  }

  // 4. Tap to call link (tel:)
  const hasTelLink = /<a[^>]+href=["']\s*tel:[^"']+["']/i.test(html);
  checks.push({
    id: 'tap-to-call',
    label: 'Tap to call phone button',
    status: hasTelLink ? 'pass' : 'fail',
    detail: hasTelLink ? 'Clickable tel: link found' : 'No tap to call link found',
    explanation: hasTelLink
      ? 'Customers on phones can tap your number to ring you straight away.'
      : 'No tap to call button. Customers on phones have to copy your number by hand.',
  });

  // 5. WhatsApp link
  const hasWhatsApp = /href=["'][^"']*(?:wa\.me\/|api\.whatsapp\.com\/|whatsapp:\/\/)/i.test(html);
  checks.push({
    id: 'whatsapp',
    label: 'Direct WhatsApp chat button',
    status: hasWhatsApp ? 'pass' : 'warning',
    detail: hasWhatsApp ? 'WhatsApp link found' : 'No WhatsApp button found',
    explanation: hasWhatsApp
      ? 'Customers can message you photos of the job straight from their phone.'
      : 'Many homeowners prefer messaging a photo of the job on WhatsApp rather than ringing during work hours.',
  });

  // 6. OpenGraph image
  const ogImageMatch =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i);
  const hasOgImage = Boolean(ogImageMatch && ogImageMatch[1].trim().length > 0);
  checks.push({
    id: 'og-image',
    label: 'Facebook and WhatsApp share preview',
    status: hasOgImage ? 'pass' : 'warning',
    detail: hasOgImage ? 'Preview image present' : 'No OpenGraph preview image',
    explanation: hasOgImage
      ? 'When someone shares your website on Facebook or WhatsApp, it shows a proper preview image.'
      : 'Without a share image, your link looks blank or broken when recommended in local Facebook community groups.',
  });

  // 7. LocalBusiness or schema.org structured data
  const hasLocalSchema =
    /schema\.org[\s\S]{0,600}?(?:LocalBusiness|HomeAndConstructionBusiness|Plumber|Electrician|RoofingContractor|GeneralContractor|HVACBusiness|Locksmith|HousePainter|MovingCompany|ProfessionalService|Organization|Service)/i.test(
      html
    );
  checks.push({
    id: 'schema',
    label: 'Local business schema data for Google',
    status: hasLocalSchema ? 'pass' : 'warning',
    detail: hasLocalSchema ? 'Structured business data found' : 'No LocalBusiness schema found',
    explanation: hasLocalSchema
      ? 'Your site includes structured data that helps Google connect your website to your local service area.'
      : 'Adding LocalBusiness structured data helps Google understand your trade, town and phone number for local searches.',
  });

  // 8. Visible phone number in page text
  const visibleText = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  const ukPhoneRegex = /(?:(?:\+44\s?\(0\)\s?|\+44\s?|0)(?:1\d{2,4}|2\d{1,3}|3\d{2,3}|7\d{3}|800)\s?\d{3,4}\s?\d{2,4})/;
  const hasVisiblePhone = ukPhoneRegex.test(visibleText);
  checks.push({
    id: 'visible-phone',
    label: 'Phone number visible on the page',
    status: hasVisiblePhone ? 'pass' : 'fail',
    detail: hasVisiblePhone ? 'UK phone number visible' : 'No phone number found in page text',
    explanation: hasVisiblePhone
      ? 'Your phone number is clearly written on the page for visitors to see.'
      : 'We could not spot a standard UK phone number in your page text. Make sure your number is easy to spot right at the top.',
  });

  return checks;
}

export interface PsiMetrics {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  lcpSeconds: number;
  cls: number;
  tbtMs: number;
}

async function fetchPageSpeedInsights(targetUrl: string): Promise<PsiMetrics> {
  const apiKey = process.env.PSI_API_KEY;
  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  endpoint.searchParams.set('url', targetUrl);
  endpoint.searchParams.set('strategy', 'mobile');
  endpoint.searchParams.append('category', 'PERFORMANCE');
  endpoint.searchParams.append('category', 'ACCESSIBILITY');
  endpoint.searchParams.append('category', 'BEST_POST_PRACTICES');
  // Correct PSI category names:
  endpoint.searchParams.delete('category');
  endpoint.searchParams.append('category', 'performance');
  endpoint.searchParams.append('category', 'accessibility');
  endpoint.searchParams.append('category', 'best-practices');
  endpoint.searchParams.append('category', 'seo');
  if (apiKey) {
    endpoint.searchParams.set('key', apiKey);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PSI_TIMEOUT_MS);

  try {
    const res = await fetch(endpoint.toString(), {
      method: 'GET',
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      throw new Error(`PSI_${res.status}: ${errBody.slice(0, 200)}`);
    }

    const data: any = await res.json();
    const categories = data?.lighthouseResult?.categories;
    const audits = data?.lighthouseResult?.audits;

    if (!categories || !audits) {
      throw new Error('PSI_INVALID_PAYLOAD');
    }

    const toScore = (val: unknown): number => {
      const num = typeof val === 'number' ? val : 0;
      return Math.round(Math.max(0, Math.min(100, num * 100)));
    };

    const lcpMs = audits['largest-contentful-paint']?.numericValue ?? 0;
    const clsVal = audits['cumulative-layout-shift']?.numericValue ?? 0;
    const tbtVal = audits['total-blocking-time']?.numericValue ?? 0;

    return {
      performance: toScore(categories.performance?.score),
      accessibility: toScore(categories.accessibility?.score),
      bestPractices: toScore(categories['best-practices']?.score),
      seo: toScore(categories.seo?.score),
      lcpSeconds: Math.round((lcpMs / 1000) * 10) / 10,
      cls: Math.round(clsVal * 1000) / 1000,
      tbtMs: Math.round(tbtVal),
    };
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      throw new Error('PSI_TIMEOUT');
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

function calculateOverallGrade(psi: PsiMetrics, checks: HtmlCheckItem[]): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' {
  const psiWeighted =
    psi.performance * 0.45 +
    psi.seo * 0.25 +
    psi.accessibility * 0.15 +
    psi.bestPractices * 0.15;

  const htmlScoreTotal = checks.reduce((acc, item) => {
    if (item.status === 'pass') return acc + 100;
    if (item.status === 'warning') return acc + 55;
    return acc + 0;
  }, 0);
  const htmlAverage = checks.length > 0 ? htmlScoreTotal / checks.length : 50;

  let combined = psiWeighted * 0.65 + htmlAverage * 0.35;

  // Hard caps if critical phone basics are broken
  const tapToCallFailed = checks.some((c) => c.id === 'tap-to-call' && c.status === 'fail');
  const httpsFailed = checks.some((c) => c.id === 'https' && c.status === 'fail');
  if (psi.performance < 40 && tapToCallFailed) {
    combined = Math.min(combined, 48);
  } else if (httpsFailed && tapToCallFailed) {
    combined = Math.min(combined, 54);
  }

  if (combined >= 88 && psi.performance >= 75) return 'A';
  if (combined >= 76) return 'B';
  if (combined >= 63) return 'C';
  if (combined >= 50) return 'D';
  if (combined >= 38) return 'E';
  return 'F';
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

async function handleSendEmailReport(req: VercelRequest, res: VercelResponse, ip: string) {
  const { email, honeypot, report } = req.body || {};

  // Honeypot check: silently succeed if filled by a bot
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return res.status(200).json({
      success: true,
      refNumber: 'DSW-' + Math.floor(100000 + Math.random() * 900000),
    });
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return res.status(400).json({
      code: 'INVALID_EMAIL',
      error: 'Please enter a valid email address.',
    });
  }

  if (!report || typeof report !== 'object' || !report.checkedUrl || !report.grade) {
    return res.status(400).json({
      code: 'INVALID_REPORT',
      error: 'Report details are missing. Please run the website check first.',
    });
  }

  if (isRateLimited(emailRateMap, ip, EMAIL_MAX_PER_HOUR)) {
    return res.status(429).json({
      code: 'RATE_LIMITED',
      error: 'You have requested the maximum of 2 email reports this hour. Please message Dean on WhatsApp if you need anything else.',
    });
  }

  const resend = getResend();
  if (!resend) {
    console.error('CRITICAL: RESEND_API_KEY is not configured.');
    return res.status(500).json({
      code: 'EMAIL_CONFIG_ERROR',
      error: 'Email service is not configured on the server.',
    });
  }

  const refNumber = 'DSW-' + Math.floor(100000 + Math.random() * 900000);
  const safeEmail = email.trim();
  const safeUrl = escapeHtml(String(report.checkedUrl));
  const safeGrade = escapeHtml(String(report.grade));
  const perf = Number(report.psi?.performance ?? 0);
  const seo = Number(report.psi?.seo ?? 0);
  const a11y = Number(report.psi?.accessibility ?? 0);
  const bp = Number(report.psi?.bestPractices ?? 0);
  const lcp = Number(report.psi?.lcpSeconds ?? 0);

  const checksList: HtmlCheckItem[] = Array.isArray(report.checks) ? report.checks : [];
  const checkRowsHtml = checksList
    .map((c) => {
      const badgeColor =
        c.status === 'pass' ? '#16a34a' : c.status === 'warning' ? '#d97706' : '#dc2626';
      const statusWord = c.status === 'pass' ? 'PASS' : c.status === 'warning' ? 'WARNING' : 'FAIL';
      return `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
            <div style="font-weight: 700; color: #111827; font-size: 14px;">
              <span style="display: inline-block; padding: 2px 6px; border-radius: 4px; background: ${badgeColor}; color: #fff; font-size: 10px; margin-right: 8px; vertical-align: middle;">${statusWord}</span>
              ${escapeHtml(String(c.label || ''))}
            </div>
            <div style="color: #4b5563; font-size: 13px; margin-top: 4px;">${escapeHtml(String(c.explanation || ''))}</div>
          </td>
        </tr>
      `;
    })
    .join('');

  const whatsappFixUrl = `https://wa.me/447348733365?text=${encodeURIComponent(
    `Hi Dean, I ran the Website Health Check on ${report.checkedUrl} (Grade ${report.grade}, Ref ${refNumber}) and would like to get the issues fixed.`
  )}`;

  const reportHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; background: #ffffff;">
      <div style="background: #040507; padding: 22px 24px; border-bottom: 3px solid #D90429;">
        <h1 style="color: #ffffff; margin: 0; font-size: 18px;">Website Health Check Report</h1>
        <p style="color: #a1a1aa; margin: 4px 0 0; font-size: 12px;">Design Systems Web | Reference: ${refNumber}</p>
      </div>
      <div style="padding: 24px;">
        <p style="margin: 0 0 12px; font-size: 14px; color: #374151;">
          Checked website: <strong style="color: #111827;">${safeUrl}</strong>
        </p>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <div style="font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Overall Mobile Grade</div>
          <div style="font-size: 36px; font-weight: 800; color: #D90429; line-height: 1.1; margin-top: 4px;">Grade ${safeGrade}</div>
          <div style="font-size: 13px; color: #374151; margin-top: 10px;">
            Mobile Speed: <strong>${perf}/100</strong> | SEO: <strong>${seo}/100</strong> | Accessibility: <strong>${a11y}/100</strong> | Best Practices: <strong>${bp}/100</strong>
          </div>
          <div style="font-size: 13px; color: #374151; margin-top: 4px;">
            Time until page looks loaded on a phone: <strong>${lcp} seconds</strong>
          </div>
        </div>

        <h2 style="font-size: 15px; color: #111827; margin: 0 0 8px;">Lead &amp; Mobile Checklist</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${checkRowsHtml}
        </table>

        <div style="margin-top: 24px; text-align: center;">
          <a href="${whatsappFixUrl}" style="display: inline-block; background: #25D366; color: #000000; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px;">
            Fix this for me on WhatsApp
          </a>
        </div>
      </div>
      <div style="background: #f9fafb; padding: 14px 24px; font-size: 11px; color: #6b7280; border-top: 1px solid #e5e7eb;">
        Sent from designsystemsweb.co.uk | Dean Wilshaw (07348 733365)
      </div>
    </div>
  `;

  try {
    // Send lead notification + full report copy to Dean, and send user copy if Resend domain allows
    await resend.emails.send({
      from: 'Dean Wilshaw <dean@designsystemsweb.co.uk>',
      to: ['dean.wilshaw.web@gmail.com'],
      replyTo: safeEmail,
      subject: `Health Check Lead [${refNumber}] Grade ${String(report.grade)}: ${String(report.checkedUrl)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto 16px; padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; font-size: 13px; color: #991b1b;">
          <strong>New Health Check Report Requested</strong><br/>
          Lead email: <a href="mailto:${escapeHtml(safeEmail)}" style="color: #dc2626; font-weight: 700;">${escapeHtml(safeEmail)}</a><br/>
          Website checked: ${safeUrl}<br/>
          Grade: ${safeGrade} (${refNumber})
        </div>
        ${reportHtml}
      `,
    });

    // Attempt to send directly to the user as well (best-effort if using verified sender domain)
    if (safeEmail.toLowerCase() !== 'dean.wilshaw.web@gmail.com') {
      await resend.emails
        .send({
          from: 'Dean Wilshaw <dean@designsystemsweb.co.uk>',
          to: [safeEmail],
          replyTo: 'dean@designsystemsweb.co.uk',
          subject: `Your Website Health Check Report [${refNumber}]: Grade ${String(report.grade)}`,
          html: reportHtml,
        })
        .catch((userEmailErr) => {
          console.warn('User email dispatch notice (onboarding sender restriction or bounce):', userEmailErr);
        });
    }

    return res.status(200).json({
      success: true,
      refNumber,
      message: `Report logged under reference ${refNumber}.`,
    });
  } catch (err) {
    console.error('Resend health check error:', err);
    return res.status(500).json({
      code: 'EMAIL_SEND_FAILED',
      error: 'Could not send the email right now. Please message Dean directly on WhatsApp.',
    });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  const action = req.body?.action;

  if (action === 'send-email') {
    return handleSendEmailReport(req, res, ip);
  }

  const rawUrl = typeof req.body?.url === 'string' ? req.body.url : '';
  const validation = await validateAndResolveUrl(rawUrl);
  if (validation.ok === false) {
    return res.status(400).json({
      code: 'INVALID_URL',
      error: validation.message,
    });
  }

  if (isRateLimited(checkRateMap, ip, CHECK_MAX_PER_HOUR)) {
    return res.status(429).json({
      code: 'RATE_LIMITED',
      error: 'You have run 5 website checks this hour. Please wait a little while or message Dean on WhatsApp.',
    });
  }

  let htmlResult: { finalUrl: URL; html: string };
  try {
    htmlResult = await fetchHtmlWithManualRedirects(validation.url);
  } catch (err: any) {
    const isTimeout = err?.name === 'AbortError';
    return res.status(502).json({
      code: 'UNREACHABLE',
      error: isTimeout
        ? 'That website took too long to respond. Make sure the address is correct and the site is online.'
        : 'We could not reach that website. Please check the spelling and make sure the site is online.',
    });
  }

  const checks = analyzeHtml(htmlResult.html, htmlResult.finalUrl);

  let psi: PsiMetrics;
  try {
    psi = await fetchPageSpeedInsights(htmlResult.finalUrl.toString());
  } catch (err: any) {
    const msg = String(err?.message || '');
    if (msg.includes('PSI_TIMEOUT')) {
      return res.status(504).json({
        code: 'PSI_TIMEOUT',
        error: 'Google PageSpeed Insights timed out because that website took over 30 seconds to load on a mobile connection.',
      });
    }
    console.error('PageSpeed Insights error:', msg);
    return res.status(502).json({
      code: 'PSI_TIMEOUT',
      error: 'Google PageSpeed tests could not complete for that site right now. Please try again in a moment.',
    });
  }

  const grade = calculateOverallGrade(psi, checks);

  return res.status(200).json({
    checkedUrl: htmlResult.finalUrl.toString(),
    hostname: htmlResult.finalUrl.hostname,
    grade,
    psi,
    checks,
    checkedAt: new Date().toISOString(),
  });
}
