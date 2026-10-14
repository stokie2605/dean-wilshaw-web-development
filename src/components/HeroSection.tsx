import React from 'react';
import { MessageSquare, ArrowDown } from 'lucide-react';

const WHATSAPP_QUOTE_URL = `https://wa.me/447348733365?text=${encodeURIComponent(
  "Hi Dean, I'd like to get a quote for a website for my business."
)}`;

const LATEST_BUILD = {
  name: 'Norden Carpets & Flooring',
  place: 'Rochdale',
  url: 'https://nordencarpets.co.uk/',
  image: '/demos/norden.webp',
};

export const HeroSection: React.FC = () => (
  <section className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 md:pb-14 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#040507] overflow-hidden border-b border-slate-200 dark:border-white/[0.08] transition-colors duration-300">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">

      {/* Left: copy and actions */}
      <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 items-start text-left z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-zinc-100">
          Websites and web apps built for phones.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Fast websites and simple web apps for local businesses across Stoke on Trent and Cheshire. You deal directly with Dean from start to finish.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href={WHATSAPP_QUOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-base whitespace-nowrap transition-colors"
          >
            <MessageSquare className="w-4 h-4 fill-black" aria-hidden="true" />
            <span>Get a quote on WhatsApp</span>
          </a>
          <a
            href="#demos"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold text-base whitespace-nowrap hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <span>See my work</span>
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Right: latest real build in a phone frame */}
      <div className="lg:col-span-5 relative w-full flex flex-col justify-center items-center py-6">

        {/* Backdrop glass panes */}
        <div aria-hidden="true" className="absolute -inset-4 sm:-inset-6 pointer-events-none flex items-center justify-center overflow-visible">
          <div className="absolute w-64 h-80 -rotate-12 -translate-x-12 -translate-y-3 rounded-3xl bg-white/[0.02] dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute w-64 h-80 rotate-12 translate-x-12 translate-y-5 rounded-3xl bg-white/[0.02] dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"></div>
        </div>

        <a
          href={LATEST_BUILD.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the ${LATEST_BUILD.name} website in a new tab`}
          className="group w-full max-w-[280px] mx-auto relative z-10 block"
        >
          {/* Phone chassis */}
          <div className="rounded-[2.5rem] p-1.5 bg-black border-2 border-[#1c1c1c] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover:-translate-y-1">
            <div className="rounded-[2.15rem] overflow-hidden bg-white relative">
              <div className="h-6 bg-black flex items-center justify-center pt-1">
                <div className="w-20 h-3 rounded-full bg-zinc-900 border border-white/10"></div>
              </div>
              <img
                src={LATEST_BUILD.image}
                alt={`${LATEST_BUILD.name} website on a phone`}
                width={378}
                height={780}
                decoding="async"
                fetchPriority="high"
                className="block w-full h-auto"
              />
            </div>
          </div>
        </a>

        <p className="relative z-10 mt-4 text-sm font-semibold text-slate-600 dark:text-zinc-400 text-center">
          Latest build:{' '}
          <a
            href={LATEST_BUILD.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 dark:text-white underline underline-offset-2"
          >
            {LATEST_BUILD.name}
          </a>
          , {LATEST_BUILD.place}
        </p>
      </div>

    </div>
  </section>
);
