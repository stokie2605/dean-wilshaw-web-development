import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  AlertTriangle,
  XCircle,
  MessageSquare,
  Send,
  RotateCcw,
} from 'lucide-react';

export interface HtmlCheckItem {
  id: string;
  label: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
  explanation: string;
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

export interface HealthCheckReport {
  checkedUrl: string;
  hostname: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  psi: PsiMetrics;
  checks: HtmlCheckItem[];
  checkedAt: string;
}

interface ErrorState {
  code: 'INVALID_URL' | 'UNREACHABLE' | 'PSI_TIMEOUT' | 'RATE_LIMITED' | 'UNKNOWN';
  message: string;
}

const PROGRESS_STEPS = [
  'Connecting to your website...',
  'Checking phone buttons and Google setup...',
  'Running Google mobile speed test...',
  'Measuring mobile load time...',
  'Building your report...',
];

interface CircularGaugeProps {
  label: string;
  score: number;
}

const CircularGauge: React.FC<CircularGaugeProps> = ({ label, score }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setAnimatedScore(score);
      return;
    }

    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 90);
    return () => clearTimeout(timer);
  }, [score]);

  const offset = circumference - (Math.max(0, Math.min(100, animatedScore)) / 100) * circumference;

  const isLow = score < 50;
  const isMedium = score >= 50 && score < 85;

  const strokeColor = isLow ? '#D90429' : isMedium ? '#f59e0b' : '#10b981';
  const glowStyle = isLow
    ? 'drop-shadow(0 0 6px rgba(217, 4, 41, 0.5))'
    : 'none';

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 68 68" aria-hidden="true">
          <circle
            cx="34"
            cy="34"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="5"
            className="text-slate-200 dark:text-white/[0.1]"
          />
          <circle
            cx="34"
            cy="34"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              filter: glowStyle,
              transition: 'stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>
        <span
          className={`absolute font-geist font-extrabold text-base leading-none ${
            isLow
              ? 'text-[#D90429] dark:text-red-400'
              : isMedium
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-emerald-600 dark:text-emerald-400'
          }`}
        >
          {score}
        </span>
      </div>
      <span className="text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

interface WebsiteHealthCheckProps {
  standalone?: boolean;
}

export const WebsiteHealthCheck: React.FC<WebsiteHealthCheckProps> = ({ standalone = false }) => {
  const navigate = useNavigate();
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [report, setReport] = useState<HealthCheckReport | null>(null);
  const [errorState, setErrorState] = useState<ErrorState | null>(null);

  // Email report state
  const [emailExpanded, setEmailExpanded] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentRef, setEmailSentRef] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);
  const autoRanRef = useRef(false);

  useEffect(() => {
    if (!loading) {
      setStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < PROGRESS_STEPS.length - 1 ? prev + 1 : prev));
    }, 3400);
    return () => clearInterval(interval);
  }, [loading]);

  const executeCheck = useCallback(async (rawUrl: string) => {
    const trimmed = rawUrl.trim();
    if (!trimmed) {
      setErrorState({
        code: 'INVALID_URL',
        message: 'Please enter your website address.',
      });
      return;
    }

    setLoading(true);
    setErrorState(null);
    setReport(null);
    setEmailSentRef(null);
    setEmailError(null);
    setEmailExpanded(false);

    try {
      const res = await fetch('/api/health-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorState({
          code: data.code || 'UNKNOWN',
          message:
            data.error ||
            'Could not check that website. Please check the address and try again.',
        });
        return;
      }

      setReport(data as HealthCheckReport);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch {
      setErrorState({
        code: 'UNREACHABLE',
        message: 'Could not connect. Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // On /check: if ?url= is present, prefill and auto-run the check
  useEffect(() => {
    if (!standalone || typeof window === 'undefined' || autoRanRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const paramUrl = params.get('url');
    if (paramUrl && paramUrl.trim()) {
      autoRanRef.current = true;
      setUrlInput(paramUrl.trim());
      executeCheck(paramUrl.trim());
    }
  }, [standalone, executeCheck]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (!standalone) {
      navigate(`/check?url=${encodeURIComponent(trimmed)}`);
      return;
    }

    executeCheck(trimmed);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!report) return;

    const trimmedEmail = emailInput.trim();
    if (!trimmedEmail) {
      setEmailError('Please enter your email address.');
      return;
    }

    setEmailSending(true);
    setEmailError(null);

    try {
      const res = await fetch('/api/health-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send-email',
          email: trimmedEmail,
          honeypot,
          report,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setEmailError(data.error || 'Could not send email right now.');
        return;
      }

      setEmailSentRef(data.refNumber || 'DSW-REPORT');
    } catch {
      setEmailError('Network error while sending.');
    } finally {
      setEmailSending(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setErrorState(null);
    setEmailSentRef(null);
    setEmailError(null);
    setEmailExpanded(false);
  };

  // HOMEPAGE SECTION: small label, one-line headline, URL input and button. Nothing else.
  if (!standalone) {
    return (
      <section
        id="health-check"
        aria-labelledby="health-check-heading"
        className="scroll-mt-20 sm:scroll-mt-24 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-50 dark:bg-[#040507] border-b border-slate-200 dark:border-white/[0.08]"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest font-bold text-[#D90429] dark:text-red-400 mb-2">
            Free Website Check
          </p>
          <h2
            id="health-check-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Is your website losing you trade jobs on phones?
          </h2>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3 max-w-xl">
            <label htmlFor="home-health-check-url" className="sr-only">
              Your website address
            </label>
            <input
              id="home-health-check-url"
              type="text"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="yourbusiness.co.uk"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 min-w-0 min-h-[48px] px-4 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.16] text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#D90429] dark:focus:border-[#D90429] transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl bg-[#D90429] hover:bg-[#b80322] active:bg-[#9a021c] text-white font-bold text-base whitespace-nowrap transition-colors cursor-pointer"
            >
              Check my website
            </button>
          </form>
        </div>
      </section>
    );
  }

  const getGradeMeta = (grade: HealthCheckReport['grade']) => {
    if (grade === 'A') {
      return {
        letterClass: 'text-emerald-600 dark:text-emerald-400',
        summary: 'Your website handles the main phone basics well, with a few small fixes that could bring in more enquiries.',
      };
    }
    if (grade === 'B') {
      return {
        letterClass: 'text-emerald-600 dark:text-emerald-400',
        summary: 'Your site works on phones, though fixing the flagged items below will help more local customers get in touch.',
      };
    }
    if (grade === 'C') {
      return {
        letterClass: 'text-amber-600 dark:text-amber-400',
        summary: 'Several mobile or Google essentials are missing or slow, making phone visitors work too hard to contact you.',
      };
    }
    return {
      letterClass:
        'text-[#D90429] dark:text-red-500 drop-shadow-[0_0_24px_rgba(217,4,41,0.45)]',
      summary: 'Slow loading or no tap to call button is probably costing you local enquiries on phones.',
    };
  };

  const getLoadSpeedMeta = (lcpSeconds: number) => {
    if (lcpSeconds <= 2.5) {
      return {
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-600 dark:text-emerald-400',
        label: 'Good',
      };
    }
    if (lcpSeconds <= 4.0) {
      return {
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-600 dark:text-amber-400',
        label: 'Could be quicker',
      };
    }
    return {
      dotClass: 'bg-[#D90429]',
      textClass: 'text-[#D90429] dark:text-red-400',
      label: 'Slow on phones',
    };
  };

  const whatsappMessage = report
    ? report.grade === 'A' || report.grade === 'B'
      ? `Hi Dean, I just ran your Website Health Check on ${report.checkedUrl} and got Grade ${report.grade}. Could you have a look at what would make it even better?`
      : `Hi Dean, I just ran your Website Health Check on ${report.checkedUrl} and got Grade ${report.grade}. Can you help me fix it?`
    : '';

  const whatsappFixUrl = report
    ? `https://wa.me/447348733365?text=${encodeURIComponent(whatsappMessage)}`
    : 'https://wa.me/447348733365';

  // /CHECK PAGE
  return (
    <section
      id="health-check"
      aria-labelledby="health-check-heading"
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-50 dark:bg-[#040507]"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest font-bold text-[#D90429] dark:text-red-400 mb-2">
          Free Website Check
        </p>
        <h1
          id="health-check-heading"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Is your website losing you trade jobs on phones?
        </h1>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3 max-w-xl">
          <label htmlFor="health-check-url" className="sr-only">
            Your website address
          </label>
          <input
            id="health-check-url"
            type="text"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="yourbusiness.co.uk"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            disabled={loading}
            className="flex-1 min-w-0 min-h-[48px] px-4 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.16] text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#D90429] dark:focus:border-[#D90429] transition-colors disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl bg-[#D90429] hover:bg-[#b80322] active:bg-[#9a021c] text-white font-bold text-base whitespace-nowrap transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Checking...' : 'Check my website'}
          </button>
        </form>

        {/* Loading state */}
        {loading && (
          <div role="status" aria-live="polite" className="mt-8 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-white/15 border-t-[#D90429] animate-spin shrink-0" />
            <p className="text-base font-semibold text-slate-700 dark:text-zinc-300">
              {PROGRESS_STEPS[stepIndex]}
            </p>
          </div>
        )}

        {/* Error state */}
        {errorState && !loading && (
          <div role="alert" className="mt-8 flex items-start gap-2.5 text-base text-[#D90429] dark:text-red-400">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
            <p>{errorState.message}</p>
          </div>
        )}

        {/* Report Results */}
        {report && !loading && (
          <div ref={resultsRef} className="mt-12 pt-10 border-t border-slate-300 dark:border-white/[0.12] space-y-10 scroll-mt-24">
            {/* 1. Grade: large letter with one-sentence summary beside it */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <span
                  className={`font-geist font-extrabold text-6xl sm:text-7xl leading-none tracking-tighter shrink-0 ${
                    getGradeMeta(report.grade).letterClass
                  }`}
                >
                  {report.grade}
                </span>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                    {report.hostname}
                  </p>
                  <p className="mt-1 text-base sm:text-lg text-slate-800 dark:text-zinc-200 leading-snug max-w-lg">
                    {getGradeMeta(report.grade).summary}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="self-start sm:self-center shrink-0 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 hover:text-[#D90429] dark:hover:text-red-400 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>

            {/* 2. Scores + Speed: one row of four small rings + single speed line */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <CircularGauge label="Performance" score={report.psi.performance} />
                <CircularGauge label="Accessibility" score={report.psi.accessibility} />
                <CircularGauge label="Best Practices" score={report.psi.bestPractices} />
                <CircularGauge label="SEO" score={report.psi.seo} />
              </div>

              <div className="flex items-center gap-2.5 text-base">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    getLoadSpeedMeta(report.psi.lcpSeconds).dotClass
                  }`}
                  aria-hidden="true"
                />
                <span className="font-bold text-slate-900 dark:text-white">
                  Loads in {report.psi.lcpSeconds}s
                </span>
                <span className={`font-semibold ${getLoadSpeedMeta(report.psi.lcpSeconds).textClass}`}>
                  {getLoadSpeedMeta(report.psi.lcpSeconds).label}
                </span>
              </div>
            </div>

            {/* 3. Checklist: passes = single short line with a tick, no explanation. Warnings & fails = label + one short sentence */}
            <ul className="space-y-3.5">
              {report.checks.map((item) => {
                if (item.status === 'pass') {
                  return (
                    <li key={item.id} className="flex items-center gap-2.5 text-base text-slate-700 dark:text-zinc-300">
                      <Check
                        className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </li>
                  );
                }

                const Icon = item.status === 'warning' ? AlertTriangle : XCircle;
                const iconColor =
                  item.status === 'warning'
                    ? 'text-amber-500 dark:text-amber-400'
                    : 'text-[#D90429] dark:text-red-400';

                return (
                  <li key={item.id} className="flex items-start gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 mt-1 ${iconColor}`} aria-hidden="true" />
                    <div className="text-base">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {item.label}.{' '}
                      </span>
                      <span className="text-slate-600 dark:text-zinc-400">
                        {item.explanation}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* 4. CTA: one line of copy + WhatsApp button + inline "Email me this report" link */}
            <div className="pt-8 border-t border-slate-300 dark:border-white/[0.12] space-y-4">
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {report.grade === 'A' || report.grade === 'B'
                  ? 'Want me to take a look at what would make your site even stronger?'
                  : 'Want me to fix these issues so your site brings in more local work?'}
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <a
                  href={whatsappFixUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-base whitespace-nowrap transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-black" aria-hidden="true" />
                  <span>
                    {report.grade === 'A' || report.grade === 'B'
                      ? 'Make it even better'
                      : 'Fix this for me'}
                  </span>
                </a>

                {!emailExpanded && !emailSentRef && (
                  <button
                    type="button"
                    onClick={() => setEmailExpanded(true)}
                    className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    Email me this report
                  </button>
                )}
              </div>

              {emailSentRef && (
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Report sent ({emailSentRef}) to {emailInput.trim()}.
                  </p>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Not there in a few minutes? Check your junk or spam folder.
                  </p>
                </div>
              )}

              {emailExpanded && !emailSentRef && (
                <form onSubmit={handleSendEmail} className="max-w-md pt-1 space-y-2">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="check-company-website">Company Website</label>
                    <input
                      id="check-company-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <label htmlFor="report-email-input" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="report-email-input"
                      type="email"
                      required
                      placeholder="you@yourbusiness.co.uk"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      disabled={emailSending}
                      className="flex-1 min-w-0 min-h-[44px] px-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.16] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#D90429]"
                    />
                    <button
                      type="submit"
                      disabled={emailSending}
                      className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm whitespace-nowrap transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{emailSending ? 'Sending...' : 'Send'}</span>
                    </button>
                  </div>
                  {emailError && (
                    <p role="alert" className="text-xs font-semibold text-[#D90429] dark:text-red-400">
                      {emailError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
