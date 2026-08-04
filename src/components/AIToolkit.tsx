import React, { useState, useCallback, useRef } from 'react';

/* -------------------------------------------------------------------------- */
/* useGroqStream — plain fetch() + ReadableStream, zero SDK dependency        */
/* -------------------------------------------------------------------------- */
function useGroqStream() {
  const [completion, setCompletion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const complete = useCallback(async (body: Record<string, unknown>) => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setCompletion('');
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        // Try to get JSON error message from the backend diagnostic
        let msg = `API error ${res.status}`;
        try {
          const json = await res.json();
          msg = json.error || msg;
        } catch {}
        setError(msg);
        return;
      }

      // Read the plain text stream chunk by chunk
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setCompletion((prev) => prev + chunk);
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') return; // user cancelled
      setError(err?.message || 'Network error — could not reach /api/completion');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  const reset = useCallback(() => {
    setCompletion('');
    setError(null);
  }, []);

  return { completion, isLoading, error, complete, stop, reset };
}

/* -------------------------------------------------------------------------- */
/* Simple Markdown Renderer — handles ### headings and **bold**               */
/* -------------------------------------------------------------------------- */
const renderMarkdown = (text: string): React.ReactNode[] => {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('### ')) {
      return (
        <h3 key={i} className="text-base font-bold text-white mt-6 mb-2">
          {line.replace(/^### /, '')}
        </h3>
      );
    }
    if (line.startsWith('## ')) {
      return <h2 key={i} className="text-lg font-extrabold text-white mt-6 mb-2">{line.replace(/^## /, '')}</h2>;
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} className="text-slate-300 text-sm leading-relaxed">
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
        )}
      </p>
    );
  });
};

/* -------------------------------------------------------------------------- */
/* Shared Output Card                                                          */
/* -------------------------------------------------------------------------- */
interface OutputCardProps {
  isLoading: boolean;
  completion: string;
  error: string | null;
  loadingLabel: string;
  badge?: string;
}

const OutputCard: React.FC<OutputCardProps> = ({ isLoading, completion, error, loadingLabel, badge }) => {
  if (!isLoading && !completion && !error) return null;

  return (
    <div className="bg-slate-950 border border-white/15 rounded-xl p-6 relative overflow-hidden shadow-xl">
      {/* Badge */}
      <div className="absolute top-0 right-0 px-3 py-1 bg-red-500/20 text-red-400 text-[10px] font-mono font-bold uppercase tracking-widest border-b border-l border-red-500/30 rounded-bl-lg">
        {isLoading && !completion ? 'AI Thinking...' : isLoading ? badge || 'Streaming...' : 'Complete'}
      </div>

      {/* Loading dots */}
      {isLoading && !completion && !error && (
        <div className="flex items-center gap-3 py-4 pt-6">
          <div className="flex gap-1">
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                className="w-2 h-2 rounded-full bg-red-500 animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
          <span className="text-sm text-slate-300 font-medium">{loadingLabel}</span>
        </div>
      )}

      {/* Rendered markdown output */}
      {completion && (
        <div className="max-w-none pt-4 space-y-0.5">
          {renderMarkdown(completion)}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-950/60 border border-red-500 rounded-xl p-4 text-sm font-mono text-red-300 mt-4">
          <p className="font-bold text-red-400 flex items-center gap-2">
            <span>⚠️</span> API Error
          </p>
          <p className="break-all whitespace-pre-wrap mt-1">{error}</p>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Shared constants                                                             */
/* -------------------------------------------------------------------------- */
type Tab = 'ad-bleed' | 'scope-estimator' | 'ux-critique';

// Industry is now auto-detected by the AI from the URL — no hardcoded list needed.

const SCOPE_PROMPT_PILLS = [
  'Luxury Auto Restoration Site with 3D Configurator & Quote Form',
  'High-End Private Dental Clinic with Online Booking & Patient Portal',
  'Bespoke Architectural Studio with Interactive Portfolio Bento',
];

interface AIToolkitProps {
  onOpenQuote?: () => void;
}

/* -------------------------------------------------------------------------- */
/* Root AIToolkit Component                                                    */
/* -------------------------------------------------------------------------- */
export const AIToolkit: React.FC<AIToolkitProps> = ({ onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState<Tab>('ad-bleed');

  const tabs = [
    {
      id: 'ad-bleed' as Tab,
      label: 'Ad Bleed Auditor',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'scope-estimator' as Tab,
      label: 'Scope Estimator',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'ux-critique' as Tab,
      label: 'UX Critique',
      badge: 'Coming Soon',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="ai-toolkit" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          AI-Powered Studio Toolkit
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
          Web Performance <span className="text-red-500">&amp; Revenue Intelligence</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Audit your site's mobile load speed, calculate ad budget bleed, generate technical build scopes, and run Vision UX audits.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 border ${
              activeTab === tab.id
                ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/25'
                : 'bg-slate-900/60 dark:bg-zinc-900/60/80 text-slate-300 border-white/10 hover:border-white/20'
            }`}
          >
            {tab.icon}
            {tab.label}
            {(tab as any).badge && (
              <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
                {(tab as any).badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-slate-900/90 dark:bg-zinc-900/60/95 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {activeTab === 'ad-bleed' && <AdBleedAuditor />}
        {activeTab === 'scope-estimator' && <ScopeEstimator onOpenQuote={onOpenQuote} />}
        {activeTab === 'ux-critique' && <VisionUxCritique onOpenQuote={onOpenQuote} />}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Tool #1: Ad Bleed Auditor                                                   */
/* -------------------------------------------------------------------------- */
const AdBleedAuditor: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isFetchingSpeed, setIsFetchingSpeed] = useState(false);
  const [auditStep, setAuditStep] = useState('');
  const [speedData, setSpeedData] = useState<{ score: number | null; lcp: string | null } | null>(null);
  const { completion, isLoading, error, complete, stop, reset } = useGroqStream();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    reset();
    setSpeedData(null);

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) targetUrl = 'https://' + targetUrl;

    // ── Step 1: PageSpeed — null on failure, no hardcoded defaults ───────────
    setIsFetchingSpeed(true);
    setAuditStep('Fetching Live Mobile Speed Data...');

    let score: number | null = null;
    let lcp: string | null = null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY;
      const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile${apiKey ? `&key=${apiKey}` : ''}`;
      const psRes = await fetch(psUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (psRes.ok) {
        const data = await psRes.json();
        const rawScore = data.lighthouseResult?.categories?.performance?.score;
        const rawLcp = data.lighthouseResult?.audits?.['largest-contentful-paint']?.displayValue;
        if (typeof rawScore === 'number') score = Math.round(rawScore * 100);
        if (typeof rawLcp === 'string') lcp = rawLcp;
      }
    } catch {
      // API unavailable — score and lcp remain null
    }

    setSpeedData({ score, lcp });
    setIsFetchingSpeed(false);

    // ── Step 2: Groq AI — pass real data or note it was unavailable ──────────
    setAuditStep('AI Auto-Detecting Industry & Calculating Ad Bleed...');
    const speedContext = score !== null && lcp !== null
      ? `Mobile PageSpeed Score: ${score}/100\nMobile Page Load Time: ${lcp}`
      : `Mobile speed data was unavailable for this URL. Base your estimate on typical load speeds for a website of this type — assume an average performing site.`;
    const prompt = `Website URL: ${targetUrl}\n${speedContext}`;

    const system = `You are an expert who helps UK business owners understand why their website is losing them money.

You will be given a website URL and how fast it loads on mobile.

First, work out what type of business it is from the domain name. Be specific and direct (e.g. "a sand and aggregate supplier" or "a private dental practice").

Write a short, plain-English report with these four sections. Talk directly to the business owner — no tech jargon, no acronyms. Use £ figures and real numbers.

### 🏢 What Your Business Does
One sentence on what the business is. Then state what businesses like this typically spend on Google Ads per month in the UK, and roughly what they pay each time someone clicks their ad.

### 🚨 How Many Customers You're Losing
In plain English, explain what percentage of people on phones are leaving before the page even loads — and what that means in real terms. Never use the words "bounce rate" — say "people leaving before they see anything". Keep it relatable.

### 💸 How Much Ad Budget Is Going in the Bin
Give a specific £ range for how much money is being wasted every month on clicks that go nowhere. Make it feel real with a relatable comparison (e.g. "That's roughly the cost of a weekend away, every single month, with nothing to show for it").

### ⚡ What Dean Wilshaw Can Do About It
Two short sentences. Explain that Dean builds websites that load in under half a second on any phone, so every click they pay for actually reaches a real customer. Focus on their money and their customers — not technology.`;

    await complete({ prompt, system });
    setAuditStep('');
  };

  const isRunning = isFetchingSpeed || isLoading;

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="p-2 bg-red-500/10 text-red-500 rounded-lg">💸</span>
          Google Ads Bleed &amp; Speed Auditor
        </h3>
        <p className="text-slate-400 text-sm mt-1">Analyze any website URL to calculate ad budget lost to slow mobile load speeds.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Target Website URL
            <span className="ml-2 text-amber-400 font-normal normal-case tracking-normal">— AI auto-detects industry &amp; CPC</span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. cargo4service.co.uk, harleystreetdental.com, anysite.com"
            required
            className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          />
        </div>

        <div className="md:col-span-1 flex items-end">
          <button
            type="submit"
            disabled={isRunning}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl transition duration-200 shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Auditing...
              </>
            ) : (
              <>
                <span>Run Ad Bleed Audit</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Status row */}
      {isRunning && auditStep && (
        <div className="bg-slate-950 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
          <span className="text-sm font-medium text-red-400">{auditStep}</span>
          {isLoading && (
            <button onClick={stop} className="ml-auto text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-md border border-white/10">
              Stop
            </button>
          )}
        </div>
      )}

      {/* Speed metric cards */}
      {speedData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/80 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Mobile Performance Score</p>
              {speedData.score !== null ? (
                <p className={`text-2xl font-black mt-1 ${speedData.score >= 90 ? 'text-emerald-400' : speedData.score >= 50 ? 'text-amber-400' : 'text-red-500'}`}>
                  {speedData.score} / 100
                </p>
              ) : (
                <p className="text-lg font-bold text-slate-500 mt-1">Live Data Unavailable</p>
              )}
            </div>
            {speedData.score !== null ? (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border font-bold text-xs ${speedData.score >= 90 ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-red-500/30 bg-red-500/10 text-red-500'}`}>
                {speedData.score >= 90 ? 'FAST' : 'SLOW'}
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center border border-slate-700 bg-slate-800 text-slate-500 text-[9px] font-bold text-center leading-tight px-1">
                N/A
              </div>
            )}
          </div>
          <div className="bg-slate-950/80 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Page Load Time (LCP)</p>
              {speedData.lcp !== null ? (
                <p className="text-2xl font-black text-white mt-1">{speedData.lcp}</p>
              ) : (
                <p className="text-lg font-bold text-slate-500 mt-1">Live Data Unavailable</p>
              )}
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400">⚡</div>
          </div>
        </div>
      )}

      <OutputCard
        isLoading={isLoading}
        completion={completion}
        error={error}
        loadingLabel="🤖 Groq AI is analysing revenue loss & ad bleed..."
        badge="Live AI Token Stream"
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Tool #2: Scope Estimator                                                    */
/* -------------------------------------------------------------------------- */
interface ScopeEstimatorProps { onOpenQuote?: () => void; }
interface ScopeData { architecture?: string; deliveryWindow?: string; performance?: string; features?: string[]; }

const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({ onOpenQuote }) => {
  const [description, setDescription] = useState('');
  const { completion, isLoading, error, complete, stop, reset } = useGroqStream();

  const parsedScope: ScopeData | null = (() => {
    if (!completion) return null;
    try { return JSON.parse(completion.replace(/```json/gi, '').replace(/```/g, '').trim()); }
    catch { return null; }
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    reset();

    const prompt = `Project Description: ${description.trim()}`;
    const system = `You are Dean Wilshaw's AI project assistant. Dean is a solo UK web developer based in Cheshire who builds fast, beautiful websites for local businesses and premium brands — typically delivered in 1 to 2 weeks.

Dean always builds with: React + Vite, Tailwind CSS, deployed on Vercel. He does not build mobile apps, e-commerce platforms, or enterprise software. He builds marketing websites, portfolio sites, and lead generation pages.

The user will describe a project. Output ONLY a JSON object — no extra text, no markdown fences.

Rules:
- architecture: Always "React + Vite, Tailwind CSS, Vercel Edge CDN" — never suggest Next.js, GraphQL, microservices, or anything enterprise
- deliveryWindow: Always "1 – 2 Weeks" — no exceptions
- performance: Always "100/100 Mobile Lighthouse score, loads in under 0.5 seconds on any phone"
- features: Exactly 3 features in plain English a business owner would understand — no jargon. E.g. "Click-to-call button on every page", "WhatsApp enquiry button", "Photo gallery with instant loading"

Return ONLY this JSON:
{"architecture":"string","deliveryWindow":"string","performance":"string","features":["string","string","string"]}`;

    await complete({ prompt, system });
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="p-2 bg-red-500/10 text-red-500 rounded-lg">📐</span>
          AI Technical Scope &amp; Architecture Estimator
        </h3>
        <p className="text-slate-400 text-sm mt-1">Describe your project to generate a real-time technical architecture breakdown, feature scope, and guaranteed build timeline.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Click a preset prompt or describe your project:
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {SCOPE_PROMPT_PILLS.map((pill) => (
              <button key={pill} type="button" onClick={() => setDescription(pill)}
                className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/15 px-3 py-1.5 rounded-lg transition text-left">
                + {pill}
              </button>
            ))}
          </div>
          <textarea
            rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. High-end bespoke property developer site with interactive project showcase and instant WhatsApp consultation booking..."
            required
            className="w-full bg-slate-950 border border-white/15 rounded-xl p-4 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={isLoading || !description.trim()}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl transition duration-200 shadow-lg shadow-red-600/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Architecting Scope...
              </>
            ) : (
              <><span>Generate Instant Technical Scope</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
          {isLoading && (
            <button type="button" onClick={stop} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg border border-white/10">Stop</button>
          )}
        </div>
      </form>

      <OutputCard
        isLoading={isLoading}
        completion={!parsedScope ? completion : ''}
        error={error}
        loadingLabel="🤖 Groq AI is architecting your technical scope..."
        badge="Scope Streaming"
      />

      {/* Bento cards once JSON parsed */}
      {parsedScope && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="bg-slate-950 border border-white/15 rounded-xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                <span className="p-1.5 bg-blue-500/10 text-blue-400 rounded">🛠️</span>Recommended Architecture
              </div>
              <p className="text-lg font-bold text-white leading-snug">{parsedScope.architecture || 'React 19 + Vite, Tailwind CSS, Vercel Edge'}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['React 19','Tailwind','Vite','Edge CDN'].map((t, i) => (
                <span key={t} className={`px-2.5 py-1 rounded border text-xs font-mono ${['bg-blue-500/10 text-blue-400 border-blue-500/20','bg-cyan-500/10 text-cyan-400 border-cyan-500/20','bg-purple-500/10 text-purple-400 border-purple-500/20','bg-emerald-500/10 text-emerald-400 border-emerald-500/20'][i]}`}>{t}</span>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 border border-white/15 rounded-xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded">⏱️</span>Delivery Window
              </div>
              <p className="text-3xl font-black text-emerald-400 tracking-tight">{parsedScope.deliveryWindow || '3 – 5 Business Days'}</p>
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />Guaranteed completion timeline.
            </p>
          </div>

          <div className="bg-slate-950 border border-white/15 rounded-xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded">⚡</span>Guaranteed Performance
              </div>
              <p className="text-xl font-bold text-white">{parsedScope.performance || '100/100 Mobile Score, <0.3s LCP'}</p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-amber-400 font-mono">
              <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded">Sub-second TTFB</span>
              <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded">Zero CLS</span>
            </div>
          </div>

          <div className="bg-slate-950 border border-white/15 rounded-xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                <span className="p-1.5 bg-red-500/10 text-red-500 rounded">✨</span>Built-in Key Features
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                {(parsedScope.features || ['Custom optimised gallery preloading','Zero-bundle bloat architecture','Instant mobile CTA & WhatsApp routing']).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span><span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={onOpenQuote}
              className="mt-5 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-4 rounded-xl transition duration-200 shadow-lg shadow-red-600/30 text-xs uppercase tracking-wider">
              Lock In This Build Scope →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Tool #3: Vision UX Critique                                                 */
/* -------------------------------------------------------------------------- */
interface VisionUxCritiqueProps { onOpenQuote?: () => void; }

const VisionUxCritique: React.FC<VisionUxCritiqueProps> = ({ onOpenQuote }) => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { completion, isLoading, error, complete, stop, reset } = useGroqStream();

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => { if (typeof e.target?.result === 'string') setImageBase64(e.target.result); };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!imageBase64) return;
    reset();

    const prompt = 'Analyze this mobile UI screenshot and identify 3 key conversion barriers.';
    const system = `You are a World-Class Mobile UI/UX Specialist & Conversion Rate Optimizer.
Analyze the uploaded mobile screenshot and return 3 clear, actionable conversion failures:

### 🎯 1. Headline & Visual Hierarchy
Analyze typography, CTA button contrast, color scheme, and hero layout.

### 📱 2. Above-the-Fold Friction
Analyze missing phone numbers, missing social proof badges, or buried value propositions.

### 📐 3. Mobile Layout & Spacing
Analyze touch target size, font legibility on small viewports, padding, and text density.`;

    await complete({ prompt, system, image: imageBase64 });
  };

  return (
    <div className="space-y-8 relative">
      {/* ── Coming Soon Glassmorphic Overlay ───────────────────────────────── */}
      <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden flex items-center justify-center"
        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', background: 'rgba(2,6,23,0.75)' }}>
        <div className="text-center px-6 py-10 max-w-md">
          {/* Lock icon */}
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Vision AI v2.0 Engine Upgrading
          </div>
          <h3 className="text-xl font-extrabold text-white mb-3 leading-tight">
            Vision AI v2.0 Engine<br />
            <span className="text-amber-400">Upgrading</span>
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            My multimodal pixel-analysis engine is undergoing scheduled model upgrades. Live speed audits and technical architecture estimators are fully active.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />Ad Bleed Auditor — Live
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />Scope Estimator — Live
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 pb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="p-2 bg-red-500/10 text-red-500 rounded-lg">👁️</span>
          Vision AI Mobile UX &amp; Conversion Auditor
        </h3>
        <p className="text-slate-400 text-sm mt-1">Upload any mobile website screenshot to receive an instant Vision AI UX critique and conversion barrier breakdown.</p>
      </div>

      {!imageBase64 ? (
        <div onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }} onDragLeave={() => setIsDragOver(false)} onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition duration-200 cursor-pointer ${isDragOver ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-slate-950 hover:border-white/40'}`}>
          <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            className="hidden" id="vision-image-upload" />
          <label htmlFor="vision-image-upload" className="cursor-pointer block">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-4 text-2xl">📸</div>
            <p className="text-white font-bold text-base mb-1">Drop mobile screenshot here or <span className="text-red-500 hover:underline">browse files</span></p>
            <p className="text-xs text-slate-400">Supports PNG, JPG, JPEG, WEBP</p>
          </label>
        </div>
      ) : (
        <div className="bg-slate-950 border border-white/15 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-48 h-64 rounded-xl overflow-hidden border border-white/20 shadow-2xl flex-shrink-0 bg-black">
            <img src={imageBase64} alt="Mobile Screenshot Preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow text-left space-y-4">
            <h4 className="text-white font-bold text-lg">Mobile Screenshot Ready for Analysis</h4>
            <p className="text-slate-400 text-sm">My Vision AI will inspect visual hierarchy, touch targets, value proposition clarity, and CTA friction points.</p>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={handleAnalyze} disabled={isLoading}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl transition duration-200 shadow-lg shadow-red-600/30 flex items-center gap-2 text-sm disabled:opacity-50">
                {isLoading ? (
                  <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>Analyzing Vision UI...</>
                ) : (
                  <><span>Analyze Mobile UX &amp; Conversion Barriers</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
              <button onClick={() => { setImageBase64(null); reset(); }}
                className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 px-4 py-3 rounded-xl border border-white/10">
                Remove / Change Image
              </button>
              {isLoading && (
                <button onClick={stop} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-3 rounded-xl border border-white/10">Stop</button>
              )}
            </div>
          </div>
        </div>
      )}

      <OutputCard
        isLoading={isLoading}
        completion={completion}
        error={error}
        loadingLabel="🤖 Groq Vision AI is reading your mobile UI..."
        badge="Vision AI Diagnostic Stream"
      />

      {completion && (
        <div className="bg-gradient-to-r from-red-950/40 via-slate-950 to-slate-950 border border-red-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-white font-bold text-base">Want me to re-engineer this layout into a 100/100 sub-second React UI?</h4>
            <p className="text-slate-400 text-xs mt-1">Get a custom bespoke prototype delivered in 3–5 business days.</p>
          </div>
          <button onClick={onOpenQuote}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl transition duration-200 text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex-shrink-0">
            Request Bespoke React Build →
          </button>
        </div>
      )}
    </div>
  );
};
