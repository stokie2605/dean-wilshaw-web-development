import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

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
      className={`portfolio-card group bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden relative magnetic-border cursor-pointer flex flex-col h-full transition-colors shadow-sm dark:shadow-none ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {children}
    </article>
  );
};

interface PortfolioProps {
  onOpenQuote: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenQuote }) => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const projects = [
    {
      id: 'vanguard-plumbing',
      title: 'Vanguard Plumbing & Heating',
      industryLabel: 'Emergency & Trades',
      sceneImage: '/mockups/vanguard-alive.webp',
      sceneImageSmall: null,
      modalOverview: 'High-converting trade booking engine built with 24/7 emergency dispatch forms and local SEO schema.',
      features: [
        '24/7 emergency dispatch forms',
        'Local SEO schema integration',
        'Mobile-first performance',
        'High-contrast safety UI'
      ],
      badges: ['Mobile-First UI/UX', 'High-Conversion Design', 'Tailwind CSS', 'Emergency Dispatch UI']
    },
    {
      id: 'apex-scaffolding',
      title: 'Apex Industrial Scaffolding',
      industryLabel: 'Commercial & Construction',
      sceneImage: '/mockups/apex-alive.webp',
      sceneImageSmall: null,
      modalOverview: 'Heavy-duty commercial site portal with quote calculators and compliance documentation vaults.',
      features: [
        'Interactive quote calculators',
        'Compliance documentation vaults',
        'Data-driven dashboards',
        'Corporate B2B lead capture'
      ],
      badges: ['Client Portal', 'Enterprise UX', 'Secure Routing', 'Responsive Layout']
    },
    {
      id: 'kiln-joinery',
      title: 'Kiln Architectural Joinery',
      industryLabel: 'Bespoke Craft & Retail',
      sceneImage: '/mockups/kiln-joinery-alive.webp',
      sceneImageSmall: null,
      modalOverview: 'High-end portfolio showcase for luxury timber craftsman, highlighting bespoke projects and client testimonials.',
      features: [
        'Bespoke project galleries',
        'Client testimonial integration',
        'High-end visual aesthetic',
        'Handcrafted community feel'
      ],
      badges: ['Community Platform', 'Event Scheduling', 'Clean Typography', 'Zero-Mile Branding']
    }
  ];

  return (
    <section id="portfolio" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-red-700 dark:text-red-500 font-semibold mb-3 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20">
            BUILT FROM THE GROUND UP
          </span>
          <h2 className="font-geist font-bold text-4xl sm:text-5xl text-slate-900 dark:text-zinc-100 mb-6 tracking-tight">
            A showcase of custom web engines built for real business growth.
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed">
            Designed and coded directly by a performance web specialist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const macbookClass = idx === 1 ? "ml-12" : "-ml-12";
            const iphoneClass = idx === 1 ? "-ml-24 mt-8 group-hover:-translate-x-2 group-hover:-translate-y-1" : idx === 2 ? "ml-24 mt-16 group-hover:translate-x-4 group-hover:-translate-y-1" : "ml-24 mt-12 group-hover:translate-x-2 group-hover:-translate-y-1";
            
            return (
              <MagneticCard key={idx} onClick={() => setActiveModal(idx)}>
                <div className="relative h-64 sm:h-72 w-full bg-zinc-950 rounded-t-xl overflow-hidden flex items-center justify-center p-6 border-b border-slate-200 dark:border-zinc-800">
                  {/* Ambient Glows */}
                  <div className={`absolute inset-0 blur-[80px] rounded-full w-48 h-48 top-1/2 transform -translate-y-1/2 mix-blend-screen opacity-50 group-hover:opacity-80 transition-opacity duration-700 ${idx === 0 ? 'bg-indigo-500/20 left-1/2 -translate-x-1/2' : idx === 1 ? 'bg-rose-500/20 left-1/2 -translate-x-1/2' : 'bg-amber-500/20 left-1/2 -translate-x-1/2'}`}></div>
                  
                  {/* Badges */}
                  <div className="absolute top-6 right-6 z-20 bg-white/90 dark:bg-[#09090B]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-lg group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-emerald-500 dark:text-emerald-400 text-xs">⚡</span>
                    <span className="font-mono text-slate-900 dark:text-zinc-100 text-xs font-medium">{idx === 0 ? '98+' : idx === 1 ? '92+' : '95+'} Score</span>
                  </div>
                  
                  {/* Pre-Rendered 3D Master Scene */}
                  <div className="relative aspect-[16/10] w-full bg-transparent overflow-hidden p-4 flex items-center justify-center z-10 floating">
                    <picture className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1.5">
                      {project.sceneImageSmall && (
                        <source
                          media="(max-width: 640px)"
                          srcSet={project.sceneImageSmall}
                          type="image/webp"
                        />
                      )}
                      <img
                        src={project.sceneImage}
                        alt={`${project.title} Master Scene`}
                        className="w-full h-full object-contain drop-shadow-2xl"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow z-10">
                  <span className="font-mono text-[10px] text-red-700 dark:text-red-500 tracking-wider uppercase mb-3">{project.industryLabel}</span>
                  <h2 className="font-geist font-bold text-2xl text-slate-900 dark:text-zinc-100 mb-2">{project.title}</h2>
                  <h3 className="text-slate-600 dark:text-zinc-300 font-medium text-sm mb-4">{project.subtitle}</h3>
                  <p className="text-slate-500 dark:text-zinc-400 text-sm mb-8 flex-grow leading-relaxed">{project.uiFocus}</p>
                  
                  <button className="self-start px-6 py-2.5 rounded-full border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-100 text-sm font-semibold transition-colors duration-300 flex items-center gap-2">
                    View Case Study
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </MagneticCard>
            );
          })}
        </div>



      </div>

      {/* Case Study Modal */}
      {activeModal !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setActiveModal(null)}>
          <div 
            className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-zinc-800">
              <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-zinc-100">{projects[activeModal].modalTitle || projects[activeModal].title}</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {projects[activeModal].modalOverview}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-zinc-800/50">
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Key Features:</p>
                <ul className="space-y-3">
                  {projects[activeModal].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Tech Stack & Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {projects[activeModal].badges.map((badge, i) => (
                    <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-zinc-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-zinc-800">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/60/50 flex flex-col sm:flex-row gap-3 justify-end items-center">
              <button 
                onClick={() => {
                  setActiveModal(null);
                  onOpenQuote();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 rounded-lg text-sm font-semibold transition-colors text-center"
              >
                Request Similar Build
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
