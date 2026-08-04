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
      className={`portfolio-card group bg-white dark:bg-[#09090B] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden relative magnetic-border cursor-pointer flex flex-col h-full transition-colors shadow-sm dark:shadow-none ${className}`}
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
      industryLabel: 'Emergency & Trades',
      title: 'Roadside Tactical 24/7',
      subtitle: 'Rapid Emergency Dispatch & Transport Platform',
      uiFocus: 'Engineered for high-contrast safety UI, sub-second 4G rendering, and 24/7 urgent dispatch call routing.',
      desktopImage: '/mockups/vanguard-desktop.webp',
      mobileImage: '/mockups/vanguard-mobile.webp',
      modalOverview: 'A high-converting emergency response platform built with a bold dark industrial theme. Engineered for maximum speed with sub-second 4G rendering and live fleet tracking capabilities.',
      features: [
        'Sub-second 4G mobile rendering',
        '24/7 urgent dispatch call routing',
        'Live fleet data tracking',
        'High-contrast safety UI'
      ],
      badges: ['Mobile-First UI/UX', 'High-Conversion Design', 'Tailwind CSS', 'Emergency Dispatch UI']
    },
    {
      industryLabel: 'B2B Logistics & Corporate',
      title: 'Enterprise Logistics Portal',
      subtitle: 'Secure Client Portal & Enterprise Routing',
      uiFocus: 'Built for enterprise reliability, featuring optimized & secure B2B client login and data-driven dashboards.',
      desktopImage: '/mockups/apex-desktop.webp',
      mobileImage: '/mockups/apex-mobile.webp',
      modalOverview: 'A professional B2B portal designed for logistics corporations. Features a clean, data-first interface focusing on real-time fleet routing and secure enterprise access.',
      features: [
        'Optimized & secure B2B client login',
        'Real-time fleet routing overview',
        'Data-driven dashboards',
        'Corporate B2B lead capture'
      ],
      badges: ['Client Portal', 'Enterprise UX', 'Secure Routing', 'Responsive Layout']
    },
    {
      industryLabel: 'Local Retail & Hospitality',
      title: 'The Kiln & Craft Artisan Market',
      subtitle: 'Community Event Platform & Producer Showcase',
      uiFocus: 'Designed with a handcrafted community feel, highlighting featured stallholders and zero-mile branding.',
      desktopImage: '/mockups/kiln-desktop.webp',
      mobileImage: '/mockups/kiln-mobile.webp',
      modalOverview: 'A vibrant community-focused portal designed for local produce markets and artisan retail. Emphasizes a handcrafted aesthetic with deep roots in local zero-mile branding.',
      features: [
        'Handcrafted community feel',
        'Featured stallholder showcases',
        'Live event schedules',
        'Zero-mile branding'
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
                <div className="relative h-64 sm:h-72 w-full overflow-hidden flex items-center justify-center p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#09090B]">
                  {/* Ambient Glows */}
                  <div className={`absolute inset-0 blur-[80px] rounded-full w-48 h-48 top-1/2 transform -translate-y-1/2 mix-blend-screen opacity-50 group-hover:opacity-80 transition-opacity duration-700 ${idx === 0 ? 'bg-indigo-500/20 left-1/2 -translate-x-1/2' : idx === 1 ? 'bg-rose-500/20 left-1/2 -translate-x-1/2' : 'bg-amber-500/20 left-1/2 -translate-x-1/2'}`}></div>
                  
                  {/* Badges */}
                  <div className="absolute top-6 right-6 z-20 bg-white/90 dark:bg-[#09090B]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-lg group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-emerald-500 dark:text-emerald-400 text-xs">⚡</span>
                    <span className="font-mono text-slate-900 dark:text-zinc-100 text-xs font-medium">{idx === 0 ? '98+' : idx === 1 ? '92+' : '95+'} Score</span>
                  </div>
                  
                  {/* Device Mockups container */}
                  <div className="relative w-full max-w-sm h-full flex items-center justify-center z-10 floating perspective-1000">
                    {/* Main Device (MacBook / iPad) */}
                    {idx === 1 ? (
                      // iPad Pro for the 2nd card (Enterprise Logistics)
                      <div className="absolute w-48 h-64 bg-slate-200 dark:bg-[#1a1a1a] rounded-[24px] border border-slate-300 dark:border-[#444] shadow-2xl p-[4px] -ml-8 transform group-hover:rotate-2 group-hover:scale-105 transition-all duration-500 ease-out z-10 ring-1 ring-black/10 dark:ring-white/5">
                        <div className="w-full h-full bg-black rounded-[20px] relative overflow-hidden border border-black/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
                          {/* Webcam */}
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0a0a0a] border border-[#222] rounded-full z-20 flex items-center justify-center">
                            <div className="w-[1px] h-[1px] bg-blue-900/50 rounded-full"></div>
                          </div>
                          <img src={project.desktopImage} srcSet={`${project.desktopImage.replace('.webp', '-small.webp')} 600w, ${project.desktopImage} 1200w`} sizes="(max-width: 640px) 600px, 1200px" alt={`${project.title} iPad`} width={1200} height={800} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                          {/* Glass Glare */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
                        </div>
                      </div>
                    ) : (
                      // MacBook Pro
                      <div className={`absolute w-56 h-36 sm:w-64 sm:h-40 -ml-12 transform group-hover:-translate-y-2 group-hover:scale-105 group-hover:rotate-y-2 transition-all duration-500 ease-out z-10 flex flex-col items-center ${macbookClass}`}>
                        {/* Screen Section */}
                        <div className="w-full flex-grow bg-[#0a0a0a] rounded-t-xl rounded-b-sm border-t-2 border-l-2 border-r-2 border-slate-300 dark:border-[#333] p-[3px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col">
                          <div className="w-full flex-grow bg-[#111] rounded-t-lg relative overflow-hidden border border-black/60">
                            {/* Webcam */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0a0a0a] border border-[#222] rounded-full z-20 flex items-center justify-center">
                              <div className="w-0.5 h-0.5 bg-blue-900/50 rounded-full"></div>
                            </div>
                            <img src={project.desktopImage} srcSet={`${project.desktopImage.replace('.webp', '-small.webp')} 600w, ${project.desktopImage} 1200w`} sizes="(max-width: 640px) 600px, 1200px" alt={`${project.title} Desktop`} width={1200} height={800} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                            {/* Glass Glare */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                          </div>
                          {/* MacBook Chin */}
                          <div className="w-full h-2.5 sm:h-3 bg-[#0a0a0a] flex items-center justify-center relative">
                            <span className="text-[4px] text-zinc-500 font-semibold tracking-[0.2em] opacity-40">MacBook Pro</span>
                          </div>
                        </div>
                        {/* Keyboard Deck / Base */}
                        <div className="w-[110%] h-2.5 sm:h-3 bg-gradient-to-b from-slate-200 to-slate-400 dark:from-[#3a3a3a] dark:to-[#1a1a1a] rounded-t-[1px] rounded-b-xl border border-slate-300 dark:border-[#444] shadow-[0_15px_30px_rgba(0,0,0,0.6)] relative flex justify-center -mt-[1px]">
                          {/* Thumb Groove */}
                          <div className="w-12 h-1 bg-slate-300/50 dark:bg-black/30 rounded-b-md"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* iPhone Pro */}
                    <div className={`absolute w-20 h-40 sm:w-24 sm:h-48 ml-24 mt-12 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:scale-110 group-hover:-rotate-y-6 transition-all duration-500 ease-out z-20 floating-delayed ${iphoneClass}`}>
                      {/* Stainless Steel Frame */}
                      <div className="w-full h-full bg-slate-200 dark:bg-[#1a1a1a] rounded-[24px] border border-slate-300 dark:border-[#444] shadow-2xl p-[3px] relative flex flex-col ring-1 ring-black/10 dark:ring-white/5">
                        {/* Volume & Power Buttons */}
                        <div className="absolute -left-[2px] top-8 w-[2px] h-3 bg-slate-300 dark:bg-[#333] rounded-l-sm"></div>
                        <div className="absolute -left-[2px] top-12 w-[2px] h-5 bg-slate-300 dark:bg-[#333] rounded-l-sm"></div>
                        <div className="absolute -left-[2px] top-19 w-[2px] h-5 bg-slate-300 dark:bg-[#333] rounded-l-sm"></div>
                        <div className="absolute -right-[2px] top-14 w-[2px] h-7 bg-slate-300 dark:bg-[#333] rounded-r-sm"></div>
                        
                        {/* Screen Area */}
                        <div className="w-full h-full bg-black rounded-[20px] relative overflow-hidden border border-black/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
                          {/* Dynamic Island / Notch */}
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-black rounded-full z-20 flex items-center justify-end px-1 border border-white/5 shadow-sm">
                            <div className="w-1.5 h-1.5 bg-[#0f3b7d] rounded-full opacity-60"></div>
                          </div>
                          
                          <img src={project.mobileImage} srcSet={`${project.mobileImage.replace('.webp', '-small.webp')} 600w, ${project.mobileImage} 1200w`} sizes="(max-width: 640px) 600px, 1200px" alt={`${project.title} Mobile`} width={400} height={800} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                          
                          {/* Soft Glass Glare */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>
                        </div>
                      </div>
                    </div>
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
