import React, { useState, useEffect, useRef } from 'react';
import { X, Maximize2 } from 'lucide-react';

const MagneticCard = ({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    let angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    angle = angle + 90;
    cardRef.current.style.setProperty('--mouse-angle', `${angle}deg`);
  };

  return (
    <article
      ref={cardRef}
      className={`portfolio-card group bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden relative magnetic-border cursor-pointer flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {children}
    </article>
  );
};

const BrowserFrame = ({ src, alt, accentColor }: { src: string; alt: string; accentColor: string }) => (
  <div className="w-full overflow-hidden border-b border-slate-200 dark:border-zinc-800">
    <div className="bg-slate-100 dark:bg-zinc-800 px-4 py-2.5 flex items-center gap-3 border-b border-slate-200 dark:border-zinc-700">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
      </div>
      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-md px-3 py-1 text-[10px] font-mono text-slate-400 dark:text-zinc-500 truncate border border-slate-200 dark:border-zinc-700">
        designsystemsweb.co.uk
      </div>
    </div>
    <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-50 dark:bg-zinc-900">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{ background: `linear-gradient(to bottom, transparent 60%, ${accentColor}22)` }}
      />
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm border border-slate-200 dark:border-zinc-700 rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        <Maximize2 className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
      </div>
    </div>
  </div>
);

interface PortfolioProps {
  onOpenQuote: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenQuote }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const engines = [
    {
      id: 'engine-01',
      engineLabel: 'Engine 01',
      title: 'Emergency Response Engine',
      description: 'High-contrast, urgency-driven layout built for fast conversions. Tap-to-call focus, trust badges, and rapid deployment framing.',
      tags: ['Plumbers', 'Electricians', 'Gas Engineers', 'Locksmiths', 'Roofers'],
      accentColor: '#CC1A1A',
      accentLabel: 'text-red-600 dark:text-red-500',
      image: '/mockups/engine-01-football.png',
    },
    {
      id: 'engine-02',
      engineLabel: 'Engine 02',
      title: 'Commercial Authority Engine',
      description: 'Dark, industrial, heavy B2B weight. Built for winning larger commercial contracts and presenting serious operational scale.',
      tags: ['Scaffolders', 'Groundworkers', 'Plant Hire', 'Structural Engineers'],
      accentColor: '#F59E0B',
      accentLabel: 'text-amber-500 dark:text-amber-500',
      image: '/mockups/engine-02-gaming.png',
    },
    {
      id: 'engine-03',
      engineLabel: 'Engine 03',
      title: 'Craft & Heritage Engine',
      description: 'Warm, portfolio-driven, quality-focused layout. Built to showcase premium craftsmanship, fine details, and material honesty.',
      tags: ['Joiners', 'Landscapers', 'Plasterers', 'Painters & Decorators'],
      accentColor: '#B5541B',
      accentLabel: 'text-orange-600 dark:text-orange-500',
      image: '/mockups/engine-03-editorial.png',
    },
  ];

  return (
    <section
      id="portfolio"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 scroll-mt-20 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16 md:mb-24 flex flex-col items-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-red-700 dark:text-red-500 font-semibold mb-3 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20">
            DESIGN SYSTEM ENGINES
          </span>
          <h2 className="font-geist font-bold text-4xl sm:text-5xl text-slate-900 dark:text-zinc-100 mb-6 tracking-tight">
            Three distinct systems. Zero compromises.
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed">
            Each engine is a fully unique design system — different layout architecture, colour world, and conversion psychology. Click any card to view the full design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {engines.map((engine, idx) => (
            <MagneticCard key={engine.id} onClick={() => setLightboxIndex(idx)}>
              <BrowserFrame
                src={engine.image}
                alt={`${engine.title} preview`}
                accentColor={engine.accentColor}
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${engine.accentLabel}`}>
                    {engine.engineLabel}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                    Concept Template
                  </span>
                </div>
                <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-zinc-100 mb-3">
                  {engine.title}
                </h3>
                <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed mb-5 flex-grow">
                  {engine.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {engine.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </MagneticCard>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 dark:text-zinc-500 mt-10 max-w-2xl mx-auto leading-relaxed">
          These are concept template examples only. Every project is built completely bespoke to your brand, industry, and requirements —{' '}
          <span className="text-slate-600 dark:text-zinc-400 font-medium">no two sites are ever the same.</span>
        </p>

      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex flex-col items-center justify-start overflow-y-auto p-4 pt-16 animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="fixed top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-2.5 text-white transition-colors duration-200"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] text-center">
            <span className="font-mono text-xs text-white/60 uppercase tracking-widest whitespace-nowrap">
              {engines[lightboxIndex].engineLabel} — {engines[lightboxIndex].title}
            </span>
          </div>

          <div
            className="w-full max-w-5xl rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-zinc-800 px-4 py-2.5 flex items-center gap-3 border-b border-zinc-700">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 bg-zinc-900 rounded-md px-3 py-1 text-[10px] font-mono text-zinc-500 truncate border border-zinc-700">
                designsystemsweb.co.uk — {engines[lightboxIndex].title}
              </div>
            </div>
            <img
              src={engines[lightboxIndex].image}
              alt={`${engines[lightboxIndex].title} full preview`}
              className="w-full h-auto block"
            />
          </div>

          <div className="mt-8 mb-8 flex flex-col items-center gap-3">
            <p className="text-white/50 text-sm font-mono">Like what you see?</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
                onOpenQuote();
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold transition-colors duration-200 shadow-lg shadow-red-600/30"
            >
              Request a Bespoke Build
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
