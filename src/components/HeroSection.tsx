import React, { useState } from 'react';
import { Spotlight } from './ui/Spotlight';
import { ArrowRight, MessageSquare, Phone, Wrench, Star, PhoneCall, X, RotateCcw } from 'lucide-react';
import { DEMO_BUSINESS } from '../lib/demoBusiness';

const WHATSAPP_QUOTE_URL = `https://wa.me/447348733365?text=${encodeURIComponent(
  "Hi Dean, I'd like to get a quote for a website for my business."
)}`;

export const HeroSection: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [simState, setSimState] = useState<'idle' | 'calling' | 'chat'>('idle');
  const currentService = DEMO_BUSINESS.services[activeService];

  return (
    <section className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#040507] overflow-hidden border-b border-slate-200 dark:border-white/[0.08] transition-colors duration-300">

      {/* Ambient Radial Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#D90429"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">

        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 items-start text-left z-10">

          {/* Top Badge */}
          <div className="flex flex-wrap gap-2 justify-start mb-1 w-full">
            <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              <span>Solo Local Engineer &bull; Stoke on Trent &amp; Cheshire &bull; Websites &amp; Custom Web Apps</span>
            </div>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-zinc-100 transition-colors duration-300">
            Websites and Web Apps Built for Phones.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-normal transition-colors duration-300">
            Fast, clean websites and custom web tools for local businesses and trades across Stoke on Trent and Cheshire. Direct contact, no agency contracts, and zero monthly platform fees.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col gap-3 mt-2 w-full max-w-xl">
            <div>
              <a
                href={WHATSAPP_QUOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#D90429] hover:bg-[#b80322] active:bg-[#9a021c] text-white dark:bg-white dark:hover:bg-zinc-200 dark:active:bg-zinc-300 dark:text-black font-bold text-sm transition-all shadow-lg shadow-red-600/20 inline-flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Message for a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium leading-relaxed">
              Single page builds start from £350 for the first 5 founding clients. Message Dean on WhatsApp for an exact quote.
            </p>
          </div>

          {/* Visual Interactive Cards / Micro Proof Neutral Slate Pills */}
          <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-200 dark:border-zinc-800 w-full max-w-2xl">
            <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
              Custom Websites
            </div>
            <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
              Web Apps &amp; Tools
            </div>
            <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
              No Multi Year Contracts
            </div>
          </div>
        </div>

        {/* Right Column: 2026 Dark Obsidian Glass Showcase Simulator */}
        <div className="lg:col-span-5 relative w-full flex flex-col justify-center items-center py-6">

          {/* Ambient Frosted Glass Planes (Replicating Meta Ad Backdrop) */}
          <div className="absolute -inset-4 sm:-inset-6 pointer-events-none flex items-center justify-center overflow-visible">
            {/* Left Tilted Frosted Glass Pane with Red Refraction */}
            <div className="absolute w-64 h-80 -rotate-12 -translate-x-12 -translate-y-3 rounded-3xl bg-white/[0.02] dark:bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] dark:border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-[#D90429]/40 border-l-[#D90429]/30"></div>
            
            {/* Right Tilted Frosted Glass Pane with Emerald Refraction */}
            <div className="absolute w-64 h-80 rotate-12 translate-x-12 translate-y-5 rounded-3xl bg-white/[0.02] dark:bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] dark:border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b-emerald-500/40 border-r-emerald-500/30"></div>

            {/* Subtle Neon Line Accents */}
            <div className="absolute w-72 h-px bg-gradient-to-r from-transparent via-[#D90429]/60 to-transparent -rotate-6 -translate-y-16"></div>
            <div className="absolute w-72 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent rotate-6 translate-y-20"></div>
          </div>

          <div className="w-full max-w-xs mx-auto relative z-10">
            {/* Titanium Outer Chassis */}
            <div className="rounded-[2.5rem] p-1.5 bg-gradient-to-b from-slate-700 via-slate-900 to-black border-2 border-slate-600/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(217,4,41,0.18)]">
              
              {/* Inner Screen Display (Obsidian Dark Glass) */}
              <div className="rounded-[2.15rem] overflow-hidden bg-[#07090E] border border-white/[0.08] relative">

                {/* Top Glass Bezel / Speaker Notch */}
                <div className="h-6 bg-black flex items-center justify-center pt-1 relative z-20">
                  <div className="w-20 h-3 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-end px-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80"></div>
                  </div>
                </div>

                {/* Trade Site Header (Frosted Glass) */}
                <div className="bg-white/[0.04] backdrop-blur-md px-4 py-3 border-b border-white/[0.08] flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-[#D90429]/20 border border-[#D90429]/40 flex items-center justify-center shadow-[0_0_10px_rgba(217,4,41,0.3)]">
                      <Wrench className="w-3.5 h-3.5 text-[#D90429]" />
                    </div>
                    <span className="font-bold text-white text-xs tracking-tight">{DEMO_BUSINESS.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                    <span className="text-[9px] font-mono text-emerald-400">ONLINE</span>
                  </div>
                </div>

                {/* Screen Content */}
                <div className="p-4 flex flex-col gap-3 relative z-10 bg-gradient-to-b from-transparent via-transparent to-black/40 min-h-[310px] justify-between">
                  {simState === 'idle' && (
                    <>
                      {/* Services row (Interactive Glass Chips) */}
                      <div className="grid grid-cols-3 gap-1.5">
                        {DEMO_BUSINESS.services.map((service, idx) => {
                          const isSelected = activeService === idx;
                          return (
                            <button
                              key={service.name}
                              type="button"
                              onClick={() => setActiveService(idx)}
                              className={`rounded-xl py-2 px-1 text-center shadow-sm transition-all duration-150 border ${
                                isSelected
                                  ? 'bg-[#D90429]/25 border-[#D90429] text-white shadow-[0_0_12px_rgba(217,4,41,0.35)]'
                                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-300'
                              }`}
                            >
                              <span className="text-[9px] font-semibold leading-tight block truncate">{service.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Primary Call Card (Luminous Red Glass) */}
                      <div className="relative rounded-2xl p-4 text-white overflow-hidden bg-gradient-to-br from-[#D90429] via-[#b80322] to-[#7a0216] border border-red-400/30 shadow-[0_8px_30px_rgba(217,4,41,0.35)] backdrop-blur-lg">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-red-100">
                            Fast Response
                          </p>
                          <span className="text-[8px] text-white/80 bg-black/30 px-2 py-0.5 rounded-full font-medium">
                            Tap to test
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold mb-3 leading-tight tracking-tight text-white drop-shadow-sm">
                          {currentService.headline}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setSimState('calling')}
                          className="w-full bg-white text-slate-950 hover:bg-zinc-100 font-bold py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-transform active:scale-[0.98]"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#D90429]" />
                          <span>Tap to Call</span>
                        </button>
                      </div>

                      {/* Secondary WhatsApp Button (Frosted Emerald/Dark Glass) */}
                      <button
                        type="button"
                        onClick={() => setSimState('chat')}
                        className="w-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-bold py-2.5 rounded-xl shadow-sm backdrop-blur-md flex items-center justify-center gap-2 text-xs transition-transform active:scale-[0.98]"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current text-emerald-400" />
                        <span>Message on WhatsApp</span>
                      </button>

                      {/* Review snippet (Frosted Glass Card) */}
                      <div className="bg-white/[0.03] backdrop-blur-md rounded-xl p-3 border border-white/[0.08] flex items-start gap-2.5 shadow-sm">
                        <div className="flex text-amber-400 shrink-0 mt-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Star key={n} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <p className="text-[10px] text-zinc-300 leading-snug">
                          {DEMO_BUSINESS.review}
                        </p>
                      </div>
                    </>
                  )}

                  {simState === 'calling' && (
                    <div className="py-6 px-3 flex flex-col items-center justify-center text-center gap-3.5 rounded-2xl bg-gradient-to-b from-black/80 to-[#07090E] border border-white/[0.1] my-auto">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-pulse">
                        <PhoneCall className="w-6 h-6 text-emerald-400" />
                      </div>

                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-1">
                          Simulated Call in Progress
                        </p>
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          {DEMO_BUSINESS.name}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          Direct ring to your mobile handset
                        </p>
                      </div>

                      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-2.5 text-[10px] text-zinc-300 max-w-[210px] leading-relaxed">
                        Zero typing needed. Client taps once on your website and connects instantly to your phone.
                      </div>

                      <button
                        type="button"
                        onClick={() => setSimState('idle')}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-red-600/30"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>End Simulation</span>
                      </button>
                    </div>
                  )}

                  {simState === 'chat' && (
                    <div className="py-3 px-3 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-black/80 to-[#07090E] border border-white/[0.1] my-auto gap-3">
                      <div>
                        {/* WhatsApp Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] mb-2.5">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center">
                              <MessageSquare className="w-2.5 h-2.5 text-black fill-current" />
                            </div>
                            <span className="text-[10px] font-bold text-white">WhatsApp Chat</span>
                          </div>
                          <span className="text-[8px] font-mono text-emerald-400">ONLINE</span>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex flex-col gap-2">
                          <div className="self-end bg-emerald-700/80 border border-emerald-500/30 text-white text-[10px] rounded-xl rounded-tr-none px-3 py-2 max-w-[200px] shadow-sm">
                            {currentService.chatInquiry}
                            <span className="block text-[8px] text-emerald-200 text-right mt-0.5">Just now</span>
                          </div>

                          <div className="self-start bg-white/[0.08] border border-white/[0.1] text-zinc-200 text-[10px] rounded-xl rounded-tl-none px-3 py-2 max-w-[200px] shadow-sm">
                            {currentService.chatResponse}
                            <span className="block text-[8px] text-zinc-400 text-right mt-0.5">Just now</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                        <span className="text-[9px] text-zinc-400">Direct lead capture</span>
                        <button
                          type="button"
                          onClick={() => setSimState('idle')}
                          className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-[10px] flex items-center gap-1 transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Interactive prototype. Tap buttons on phone to test.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
