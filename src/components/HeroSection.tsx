import React from 'react';
import { Link } from 'react-router-dom';
import { Spotlight } from './ui/Spotlight';
import { ArrowRight, MessageSquare, Phone, Wrench, Star } from 'lucide-react';
import { DEMO_BUSINESS } from '../lib/demoBusiness';

const WHATSAPP_QUOTE_URL = `https://wa.me/447348733365?text=${encodeURIComponent(
  "Hi Dean, I'd like to get a quote for a website for my business."
)}`;

export const HeroSection: React.FC = () => {
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
              <span>Solo Local Engineer &bull; Stoke on Trent &amp; Cheshire &bull; 100% Website Ownership</span>
            </div>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-zinc-100 transition-colors duration-300">
            Mobile First Websites for UK Trades.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-normal transition-colors duration-300">
            Fast, mobile friendly websites for local trades, with tap to call built in and no agency overhead.
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
              Single page trade builds start from £350 for the first 5 founding clients. Message Dean on WhatsApp for an exact quote.
            </p>
          </div>

          {/* Visual Interactive Cards / Micro Proof Neutral Slate Pills */}
          <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-200 dark:border-zinc-800 w-full max-w-2xl">
            <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
              Mobile Friendly by Design
            </div>
            <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
              Tap to Call Built In
            </div>
            <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
              No Multi Year Contracts
            </div>
          </div>
        </div>

        {/* Right Column: 2026 Dark Obsidian Glass Showcase */}
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
            <Link
              to="/demo"
              aria-label="View live example website"
              className="block rounded-[2.5rem] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D90429] group"
            >
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
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
                  </div>

                  {/* Screen Content */}
                  <div className="p-4 flex flex-col gap-3 relative z-10 bg-gradient-to-b from-transparent via-transparent to-black/40">
                    {/* Services row (Glass Chips) */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {DEMO_BUSINESS.services.map((service) => (
                        <div key={service.name} className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] backdrop-blur-md rounded-xl py-2 px-1 text-center shadow-sm transition-colors">
                          <span className="text-[9px] font-semibold text-zinc-300 leading-tight">{service.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Primary Call Card (Luminous Red Glass) */}
                    <div className="relative rounded-2xl p-4 text-white overflow-hidden bg-gradient-to-br from-[#D90429] via-[#b80322] to-[#7a0216] border border-red-400/30 shadow-[0_8px_30px_rgba(217,4,41,0.35)] backdrop-blur-lg">
                      {/* Specular sheen reflection */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-100 mb-1">
                        Fast Response
                      </p>
                      <h3 className="text-lg font-extrabold mb-3 leading-tight tracking-tight text-white drop-shadow-sm">
                        Need a Quote Today?
                      </h3>
                      <div className="w-full bg-white text-slate-950 font-bold py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-transform group-hover:scale-[1.02]">
                        <Phone className="w-3.5 h-3.5 text-[#D90429]" />
                        <span>Tap to Call</span>
                      </div>
                    </div>

                    {/* Secondary WhatsApp Button (Frosted Emerald/Dark Glass) */}
                    <div className="w-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-bold py-2.5 rounded-xl shadow-sm backdrop-blur-md flex items-center justify-center gap-2 text-xs transition-colors">
                      <MessageSquare className="w-3.5 h-3.5 fill-current text-emerald-400" />
                      <span>Message on WhatsApp</span>
                    </div>

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
                  </div>

                </div>
              </div>
            </Link>

            <Link
              to="/demo"
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300 hover:text-[#D90429] dark:hover:text-white transition-colors group"
            >
              <span>View Live Example</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
