import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Spotlight } from './ui/Spotlight';
import { ArrowRight, MessageSquare, Phone } from 'lucide-react';

interface HeroSectionProps {
  onOpenWhatsApp?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWhatsApp }) => {
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
              <span>Dean Wilshaw &bull; Web Developer &bull; Stoke-on-Trent &amp; Cheshire</span>
            </div>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-zinc-100 transition-colors duration-300">
            Clean, Fast Websites for Local Businesses.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-normal transition-colors duration-300">
            Modern, mobile-friendly websites for independent businesses across Stoke-on-Trent and Cheshire. Straightforward pricing, direct contact buttons, and zero monthly contracts.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-3.5 mt-2 w-full max-w-xl">
            <button
              onClick={onOpenWhatsApp}
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1ba851] text-black font-bold text-sm transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 group"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Message on WhatsApp</span>
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 font-bold text-sm transition-all flex items-center justify-center gap-2 group"
            >
              <span>View Packages &amp; Pricing</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Visual Interactive Cards / Micro Proof Neutral Slate Pills */}
          <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-200 dark:border-zinc-800 w-full max-w-2xl">
            <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
              Mobile-Friendly Design
            </div>
            <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
              Direct Contact Buttons
            </div>
            <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
              No Long-Term Contracts
            </div>
          </div>
        </div>

        {/* Right Column: Clean Business Preview Card */}
        <div className="lg:col-span-5 relative w-full flex flex-col justify-center items-center">
          <div className="w-full max-w-xs mx-auto">
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#0A0D14] shadow-xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-slate-100 dark:bg-zinc-900 px-4 py-3 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700"></div>
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Mobile View</span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                    Independent Business
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 leading-tight">
                    Your Business Name
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                    Clear service description, genuine customer reviews, and direct contact buttons so local customers can reach you immediately.
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="w-full bg-[#D90429] text-white font-bold py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 text-xs">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Direct: 01782 000000</span>
                  </div>
                  <div className="w-full bg-[#25D366] text-black font-bold py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 text-xs">
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>Chat on WhatsApp</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                  <span>Stoke &amp; Cheshire</span>
                  <span className="font-semibold text-slate-700 dark:text-zinc-300">Fast Loading</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
