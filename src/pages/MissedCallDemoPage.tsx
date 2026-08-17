import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MissedCallDemo } from '../components/trade-tools/MissedCallDemo';
import { useToolParams } from '../hooks/useToolParams';

const STRIPE_LINK = 'https://buy.stripe.com/28E28r8zO6r23Bw6wPaAw00';
const WHATSAPP_URL = "https://wa.me/447348733365?text=Hi%20Dean,%20I'd%20like%20to%20add%20Missed-Call%20Auto-Text%20to%20my%20business.";

export function MissedCallDemoPage() {
  const navigate = useNavigate();
  const { biz } = useToolParams();
  const isGeneric = biz === 'Local Trade Specialist';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = "Instant Missed-Call Auto-Text | Design Systems Web";

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

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col items-center justify-start p-4 py-10 selection:bg-red-500/20 selection:text-red-400">

      {/* Back link */}
      <div className="w-full max-w-md mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Design Systems Web
        </button>
      </div>

      {/* Header */}
      <div className="text-center max-w-md mb-6">
        <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full mb-3 uppercase tracking-widest">
          {isGeneric ? 'LIVE DEMO' : '24-Hour Preview'}
        </span>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Instant Missed-Call Auto-Text{!isGeneric && ` for ${biz}`}
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Try the live demo below, exactly how it appears for your trade business:
        </p>
      </div>

      {/* Live Tool Widget */}
      <div className="w-full max-w-md flex justify-center mb-8">
        <MissedCallDemo />
      </div>

      {/* Value Points Card */}
      <div className="bg-[#0f1218] border border-slate-800 rounded-xl p-5 max-w-md w-full mb-6 space-y-3">
        <p className="font-bold text-sm text-white border-b border-slate-800 pb-2">
          Why add this to your website?
        </p>
        <div className="space-y-2 text-xs text-slate-300">
          <p>
            <strong className="text-white">Captures leads instantly:</strong> Homeowners who hit voicemail get a text in 5 seconds before calling another trade.
          </p>
          <p>
            <strong className="text-white">Zero apps needed:</strong> Works 100% in the background, directly connected to your UK mobile number.
          </p>
          <p>
            <strong className="text-white">One flat fee with no surprises:</strong> £149 covers complete setup and testing. No monthly subscriptions.
          </p>
        </div>
      </div>

      {/* Stripe / Setup CTA */}
      <div className="w-full max-w-md text-center">
        <a
          href={STRIPE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-black py-4 px-6 rounded-xl text-sm transition shadow-lg shadow-red-600/20 uppercase tracking-wide"
        >
          INSTALL ON YOUR WEBSITE FOR &pound;149
        </a>
        <p className="text-[11px] text-slate-500 mt-2">
          Secure Setup | Installed within 24h | Powered by <span className="text-slate-400 font-semibold">Design Systems Web</span>
        </p>
        <div className="mt-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
          >
            Prefer to chat first? <span className="underline font-semibold text-slate-300">Claim Setup on WhatsApp (07348 733365) →</span>
          </a>
        </div>
      </div>

    </div>
  );
}
