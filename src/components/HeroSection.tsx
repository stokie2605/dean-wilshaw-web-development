import React, { useState } from 'react';
import { MessageSquare, ArrowDown } from 'lucide-react';

const WHATSAPP_QUOTE_URL = `https://wa.me/447348733365?text=${encodeURIComponent(
  "Hi Dean, I'd like to get a quote for a website for my business."
)}`;

const LATEST_BUILD = {
  name: 'Norden Carpets & Flooring',
  place: 'Rochdale',
  url: 'https://nordencarpets.co.uk/',
};

const SCREENS = [
  { src: '/demos/norden-hero.webp', label: 'homepage' },
  { src: '/demos/norden.webp', label: 'reviews' },
  { src: '/demos/norden-jobs.webp', label: 'recent jobs gallery' },
];

/* Position of each slot: 0 front, 1 back right, 2 back left */
const SLOT_CLASS = [
  'z-30 translate-x-0 rotate-0 scale-100 opacity-100',
  'z-10 translate-x-[38%] translate-y-4 rotate-[8deg] scale-[0.82] opacity-70 hover:opacity-100',
  'z-10 -translate-x-[38%] translate-y-4 -rotate-[8deg] scale-[0.82] opacity-70 hover:opacity-100',
];

const PhoneStack: React.FC = () => {
  const [front, setFront] = useState(0);

  return (
    <div className="relative w-full max-w-[420px] mx-auto h-[500px] sm:h-[560px] flex items-center justify-center">
      {SCREENS.map((screen, i) => {
        const slot = (i - front + SCREENS.length) % SCREENS.length;
        const isFront = slot === 0;
        const phone = (
          <div className="rounded-[2.2rem] p-1.5 bg-black border-2 border-[#1c1c1c] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
            <div className="rounded-[1.9rem] overflow-hidden bg-white relative">
              <div className="h-5 bg-black flex items-center justify-center pt-0.5">
                <div className="w-16 h-2.5 rounded-full bg-zinc-900 border border-white/10"></div>
              </div>
              <img
                src={screen.src}
                alt={`${LATEST_BUILD.name} ${screen.label} on a phone`}
                width={378}
                height={780}
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'low'}
                className="block w-full h-auto"
                draggable={false}
              />
            </div>
          </div>
        );

        const base = `absolute w-[210px] sm:w-[240px] transition-all duration-500 ease-out ${SLOT_CLASS[slot]}`;

        return isFront ? (
          <a
            key={screen.src}
            href={LATEST_BUILD.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${LATEST_BUILD.name} website in a new tab`}
            className={base}
          >
            {phone}
          </a>
        ) : (
          <button
            key={screen.src}
            type="button"
            onMouseEnter={() => setFront(i)}
            onFocus={() => setFront(i)}
            onClick={() => setFront(i)}
            aria-label={`Show the ${screen.label} screen`}
            className={`${base} cursor-pointer`}
          >
            {phone}
          </button>
        );
      })}
    </div>
  );
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

      {/* Right: latest real build on three phones. Hover or tap a side phone to bring it to the front */}
      <div className="lg:col-span-5 relative w-full flex flex-col justify-center items-center py-6">
        <PhoneStack />

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
