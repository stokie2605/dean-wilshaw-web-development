import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PhoneCall, Zap, CheckCircle2, ShieldCheck, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { MissedCallDemo } from '../components/trade-tools/MissedCallDemo';

const WHATSAPP_URL = "https://wa.me/447348733365?text=Hi%20Dean,%20I'd%20like%20to%20add%20Missed-Call%20Auto-Text%20to%20my%20business.";
const STRIPE_LINK = 'https://buy.stripe.com/28E28r8zO6r23Bw6wPaAw00';

export function MissedCallDemoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = "Instant Missed-Call Auto-Text | Design Systems Web";

    // Set Open Graph and Description tags dynamically
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Automatically text back customers who hit your voicemail in under 5 seconds so they don't hire someone else. Built for UK trades.");
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
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col items-center justify-start p-4 py-10 selection:bg-red-500/20 selection:text-red-400">
      
      {/* Container */}
      <div className="w-full max-w-3xl flex flex-col gap-10">

        {/* Back link */}
        <div className="w-full">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group px-3 py-1.5 rounded-lg bg-[#131B2A] border border-[#1B263B] hover:border-slate-700"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-red-500" />
            ← Back to Design Systems Web
          </button>
        </div>

        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold rounded-full uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Trade Lead Recovery System
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Instant Missed-Call <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-400">Auto-Text</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Automatically text back customers who hit your voicemail in under 5 seconds so they don't hire someone else.
          </p>
        </div>

        {/* Section 1: The Problem / Why */}
        <section className="bg-[#131B2A] border border-[#1B263B] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex-shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">The Problem</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                When you miss a call on the tools or driving between sites, 90% of customers hang up and ring your competitor.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                Homeowners with leaks, electrical faults, boiler breakdowns, or urgent renovations won't leave a voicemail and wait 4 hours. If you don't answer, they tap the next contractor on Google or Checkatrade.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The Solution / What For */}
        <section className="bg-[#131B2A] border border-[#1B263B] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">The Solution</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                Instant auto-text replies within 5 seconds to lock in the lead before they search elsewhere.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                As soon as an unanswered call hits voicemail, our system fires a personalized SMS acknowledgement: acknowledging their call, letting them know you're currently working with a client, and prompting them to reply with their job details or WhatsApp photos.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Live Interactive Simulator */}
        <section className="bg-[#131B2A] border border-[#1B263B] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2 max-w-md mx-auto">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Interactive Sandbox</span>
            <h2 className="text-2xl font-bold text-white">Test The Live Simulator</h2>
            <p className="text-xs text-slate-400">
              Click below to simulate an incoming missed call and watch the automatic SMS engine dispatch in real time:
            </p>
          </div>

          <div className="flex justify-center">
            <MissedCallDemo />
          </div>
        </section>

        {/* Section 4: Why Trades Need It */}
        <section className="space-y-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white">Why Trade Businesses Need This</h2>
            <p className="text-xs text-slate-400 mt-1">Engineered specifically for active tradespeople who can't answer the phone 24/7.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Benefit 1 */}
            <div className="bg-[#131B2A] border border-[#1B263B] hover:border-slate-700 transition-colors rounded-2xl p-5 space-y-3">
              <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Recovers 3-5 Lost Jobs Per Month</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Capturing just one extra £800 boiler repair, plastering job, or rewiring job per month pays for the system dozens of times over.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#131B2A] border border-[#1B263B] hover:border-slate-700 transition-colors rounded-2xl p-5 space-y-3">
              <div className="p-2.5 w-fit rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Runs 100% Automatically 24/7</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero manual intervention. Works silently in the background while you are on a roof, under floorboards, or enjoying family dinner.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#131B2A] border border-[#1B263B] hover:border-slate-700 transition-colors rounded-2xl p-5 space-y-3">
              <div className="p-2.5 w-fit rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Zero Apps or Maintenance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No complex apps or battery-draining software to keep open on your phone. Connects directly to your existing UK mobile number.
              </p>
            </div>

          </div>
        </section>

        {/* Section 5: Direct CTA */}
        <section className="bg-gradient-to-br from-[#131B2A] to-[#1B263B] border border-red-500/30 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Ready to stop losing leads?</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Add Missed-Call Auto-Text To Your Business Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Installed and configured for your trade business within 24 hours. Connects to your phone and WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            {/* Primary WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20 hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Add Missed-Call Auto-Text
            </a>

            {/* Stripe Flat-Fee Checkout */}
            <a
              href={STRIPE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-xl text-sm transition-all shadow-lg shadow-red-600/20 hover:scale-[1.02]"
            >
              Order Setup (£149)
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 space-y-1">
            <p>Direct WhatsApp: <strong className="text-slate-200">07348 733365</strong> • Fast 24h Setup • No Long Contracts</p>
            <p className="text-slate-500">Design Systems Web — High Performance Trade Engineering</p>
          </div>
        </section>

      </div>

    </div>
  );
}
