import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { MissedCallDemo } from '../components/trade-tools/MissedCallDemo';
import { useToolParams } from '../hooks/useToolParams';

const STRIPE_LINK = 'https://buy.stripe.com/28E28r8zO6r23Bw6wPaAw00';
const WHATSAPP_URL = "https://wa.me/447348733365?text=Hi%20Dean,%20I'd%20like%20to%20add%20Missed-Call%20Auto-Text%20to%20my%20business.";

export function MissedCallDemoPage() {
  const navigate = useNavigate();
  const { biz } = useToolParams();
  const isGeneric = biz === 'Local Trade Specialist';
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = "Instant Missed-Call Auto-Text | Design Systems Web";

    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Automatically text back customers who hit your voicemail in under 5 seconds so they don't hire someone else.");
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', "Instant Missed-Call Auto-Text | Design Systems Web");
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', "Automatically text back customers who hit your voicemail in under 5 seconds so they don't hire someone else.");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-start p-4 py-10 transition-colors duration-300 overflow-x-hidden selection:bg-red-500/20 selection:text-red-600 dark:selection:text-red-400">

      {/* Top Bar with Back Link & Theme Toggle */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Design Systems Web
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
          title="Toggle light/dark mode"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      </div>

      {/* Header */}
      <div className="text-center max-w-md mb-6">
        <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs font-bold rounded-full mb-3 uppercase tracking-widest">
          {isGeneric ? 'LIVE DEMO' : '24-Hour Preview'}
        </span>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Instant Missed-Call Auto-Text{!isGeneric && ` for ${biz}`}
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Try the interactive demo below. When installed on your site, every tool is fully customized to match your trade services, brand colours, and pricing:
        </p>
      </div>

      {/* Live Tool Widget */}
      <div className="w-full max-w-md flex justify-center mb-8">
        <MissedCallDemo />
      </div>

      {/* Value Points Card */}
      <div className="bg-white dark:bg-[#131B2A] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 max-w-md w-full mb-6 space-y-3 shadow-md transition-colors">
        <p className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
          Why add this to your website?
        </p>
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <p>
            <strong className="text-slate-900 dark:text-white font-bold">Fully styled to your brand:</strong> Customised with your exact company colours, logos, fonts, and trade services so it blends seamlessly into your website.
          </p>
          <p>
            <strong className="text-slate-900 dark:text-white font-bold">Zero redesign needed:</strong> Plugs directly into Wix, WordPress, Squarespace, or custom HTML sites.
          </p>
          <p>
            <strong className="text-slate-900 dark:text-white font-bold">One flat fee with no surprises:</strong> £149 covers full design matching, setup, and testing. Zero monthly subscriptions.
          </p>
        </div>
      </div>

      {/* Stripe / Setup CTA */}
      <div className="w-full max-w-md text-center">
        <a
          href={STRIPE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#D90429] hover:bg-[#b80322] active:bg-[#9a021c] text-white font-black py-4 px-6 rounded-xl text-sm transition shadow-lg shadow-red-600/20 uppercase tracking-wide"
        >
          INSTALL ON YOUR WEBSITE FOR &pound;149
        </a>
        <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-2">
          Secure Setup | Installed within 24h | Powered by <span className="text-slate-700 dark:text-slate-400 font-semibold">Design Systems Web</span>
        </p>
        <div className="mt-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1 font-medium"
          >
            Prefer to chat first? <span className="underline font-semibold text-slate-900 dark:text-slate-300">Claim Setup on WhatsApp (07348 733365) →</span>
          </a>
        </div>
      </div>

    </div>
  );
}
