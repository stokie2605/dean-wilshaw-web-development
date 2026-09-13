import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Spotlight } from './ui/Spotlight';
import { ArrowRight, MessageSquare, Phone, Wrench, BadgeCheck, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

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
            Fast, custom mobile websites engineered for local plumbers, electricians, roofers, and builders. Built mobile friendly from the ground up, with instant tap to call buttons and zero agency middle management.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-3.5 mt-2 w-full max-w-xl">
            <button
              onClick={() => navigate('/pricing')}
              className="px-6 py-3.5 rounded-xl bg-[#D90429] hover:bg-[#b80322] active:bg-[#9a021c] text-white dark:bg-white dark:hover:bg-zinc-200 dark:active:bg-zinc-300 dark:text-black font-bold text-sm transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 group"
            >
              <span>View Fixed Packages (£350 Founding Rate)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
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

        {/* Right Column: Mobile Showcase Card */}
        <div className="lg:col-span-5 relative w-full flex flex-col justify-center items-center">
          <div className="w-full max-w-xs mx-auto">
            <div className="rounded-[2.25rem] border-4 border-slate-900 dark:border-zinc-800 bg-slate-900 dark:bg-black shadow-2xl overflow-hidden">
              <div className="rounded-[1.75rem] overflow-hidden bg-[#f4f7f9]">

                {/* Mock status bar */}
                <div className="h-7 bg-slate-900 dark:bg-black flex items-center justify-center">
                  <div className="w-16 h-1.5 rounded-full bg-slate-700"></div>
                </div>

                {/* Trade site header */}
                <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#D90429]/10 flex items-center justify-center">
                    <Wrench className="w-3.5 h-3.5 text-[#D90429]" />
                  </div>
                  <span className="font-bold text-slate-800 text-xs">Local Trade Co.</span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-3">
                  {/* Services row */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Boiler Repair', 'Bathroom Fitting', 'Emergency Callout'].map((service) => (
                      <div key={service} className="bg-white border border-slate-100 rounded-lg py-2 px-1 text-center shadow-sm">
                        <span className="text-[9px] font-semibold text-slate-700 leading-tight">{service}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#D90429] rounded-2xl p-4 text-white shadow-lg">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1">
                      Fast Response
                    </p>
                    <h3 className="text-lg font-bold mb-3 leading-tight">
                      Need a Quote Today?
                    </h3>
                    <button className="w-full bg-white text-[#D90429] font-bold py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs">
                      <Phone className="w-3.5 h-3.5" />
                      Tap to Call
                    </button>
                  </div>

                  <button className="w-full bg-[#D90429] text-white font-bold py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 text-xs">
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    Message on WhatsApp
                  </button>

                  {/* Review snippet */}
                  <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-start gap-2.5">
                    <div className="flex text-amber-400 shrink-0 mt-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-600 leading-snug">
                      Called and had a reply in minutes. Job sorted the same day.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-2.5">
                    <BadgeCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                      Mobile Friendly by Design
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-zinc-400">
              <BadgeCheck className="w-4 h-4 text-emerald-500" />
              <span>Live trade site mockup, built mobile first</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
