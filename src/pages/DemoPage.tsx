import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MessageSquare, Phone, Star, Wrench, X } from 'lucide-react';
import { DEMO_BUSINESS } from '../lib/demoBusiness';

const WHATSAPP_NUMBER = '447348733365';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi Dean, I looked at your example build and would like a site like it for my business.',
)}`;

export const DemoPage: React.FC = () => {
  const [noteDismissed, setNoteDismissed] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [callHintShown, setCallHintShown] = useState(false);
  const service = DEMO_BUSINESS.services[activeService];

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-slate-800 pb-28 overflow-x-hidden">

      {/* Dismissible example note */}
      {!noteDismissed && (
        <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between gap-3">
          <p className="text-xs sm:text-sm font-medium">Example build. Not a real business.</p>
          <button
            type="button"
            onClick={() => setNoteDismissed(true)}
            aria-label="Dismiss note"
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Trade site header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#D90429]/10 flex items-center justify-center shrink-0">
            <Wrench className="w-4.5 h-4.5 text-[#D90429]" />
          </div>
          <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">{DEMO_BUSINESS.name}</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-5">

        {/* Service tabs */}
        <section aria-label="Services">
          <div role="tablist" className="grid grid-cols-3 gap-2">
            {DEMO_BUSINESS.services.map((s, i) => {
              const isActive = i === activeService;
              return (
                <button
                  key={s.name}
                  type="button"
                  role="tab"
                  id={`demo-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="demo-service-panel"
                  onClick={() => setActiveService(i)}
                  className={`min-w-0 rounded-xl py-3 px-1.5 text-center text-xs sm:text-sm font-semibold leading-tight border transition-colors ${
                    isActive
                      ? 'bg-[#D90429] border-[#D90429] text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-700 shadow-sm active:bg-slate-50'
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
          <div
            id="demo-service-panel"
            role="tabpanel"
            aria-labelledby={`demo-tab-${activeService}`}
            className="mt-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm"
          >
            <h2 className="font-bold text-slate-900 text-sm sm:text-base mb-1">{service.name}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{service.description}</p>
          </div>
        </section>

        {/* Quote card */}
        <section className="bg-[#D90429] rounded-2xl p-5 sm:p-6 text-white shadow-lg">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/80 mb-1">Fast Response</p>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight">Need a Quote Today?</h2>
          <button
            type="button"
            onClick={() => setCallHintShown(true)}
            className="w-full bg-white text-[#D90429] font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <Phone className="w-4 h-4" />
            Tap to Call
          </button>
          {callHintShown && (
            <p className="mt-2 text-xs text-white/90 text-center">On a real site this dials the business straight away.</p>
          )}
        </section>

        {/* WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#D90429] hover:bg-[#b80322] active:bg-[#9a021c] text-white font-bold py-3 rounded-xl shadow-sm flex items-center justify-center gap-2 text-sm transition-colors"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          Message on WhatsApp
        </a>

        {/* Review */}
        <section className="bg-white rounded-xl p-4 border border-slate-100 flex items-start gap-3">
          <div className="flex text-amber-400 shrink-0 mt-0.5" aria-label="5 out of 5 stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-snug">{DEMO_BUSINESS.review}</p>
        </section>

        {/* Back to the real site */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dean Wilshaw Web Development</span>
          </Link>
          <Link to="/pricing" className="inline-flex items-center gap-2 font-semibold text-[#D90429] hover:text-[#b80322]">
            <span>See fixed packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Tap to call bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() => setCallHintShown(true)}
          className="max-w-2xl mx-auto w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm active:bg-slate-700 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Tap to Call {DEMO_BUSINESS.name}
        </button>
      </div>
    </div>
  );
};
