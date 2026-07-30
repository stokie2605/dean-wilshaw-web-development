import React, { useRef } from 'react';
import { Rocket, ArrowRight, MessageCircle, ShieldCheck, Zap, Code2, Gauge, CheckCircle2 } from 'lucide-react';

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

interface HeroProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenWhatsApp }) => {

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6 items-start text-left z-10">
          {/* Engineered Badge */}
          <div className="bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-2 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span>⚡ Blazing-Fast Web Development</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-geist font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.15] tracking-tight transition-colors duration-300">
            Websites That Actually Make Your{' '}
            <span className="text-red-600 dark:text-red-500 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Phone Ring.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-normal transition-colors duration-300">
            Custom, mobile-first websites built to turn visitors into paying customers for ambitious businesses across Cheshire & Stoke-on-Trent.
          </p>



          {/* Micro Proof Pills */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 w-full max-w-2xl">
            <div className="bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span>📱 Looks Great on Mobile</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
            </div>
            <div className="bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span>🔍 Google Friendly</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
            </div>
            <div className="bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span>⏱️ 1-2 Wk Turnaround</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
            </div>
          </div>
        </div>

        {/* Right Column: Real Project Showcase */}
        <div className="lg:col-span-5 relative w-full flex flex-col justify-center">
          <MagneticCard onClick={() => {
              const portfolio = document.getElementById('portfolio');
              if (portfolio) portfolio.scrollIntoView({ behavior: 'smooth' });
            }}>
            <div className="relative h-64 sm:h-72 w-full overflow-hidden flex items-center justify-center p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#09090B]">
              {/* Ambient Glows */}
              <div className="absolute inset-0 blur-[80px] rounded-full w-48 h-48 top-1/2 transform -translate-y-1/2 mix-blend-screen opacity-50 group-hover:opacity-80 transition-opacity duration-700 bg-emerald-500/20 left-1/2 -translate-x-1/2"></div>
              
              {/* Badges */}
              <div className="absolute top-6 right-6 z-20 bg-white/90 dark:bg-[#09090B]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-lg group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-emerald-500 dark:text-emerald-400 text-xs">⚡</span>
                <span className="font-mono text-slate-900 dark:text-white text-xs font-medium">95+ Score</span>
              </div>
              
              {/* Device Mockups container */}
              <div className="relative w-full max-w-sm h-full flex items-center justify-center z-10 floating">
                {/* MacBook */}
                <div className="absolute w-56 h-36 sm:w-64 sm:h-40 bg-[#1a1a1a] rounded-t-lg rounded-b-md border border-[#333] shadow-2xl flex flex-col overflow-hidden -ml-12 transform group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500 ease-out z-10">
                  <div className="w-full h-2 bg-[#222] border-b border-[#333] flex justify-center items-center">
                    <div className="w-1 h-1 bg-[#444] rounded-full"></div>
                  </div>
                  <div className="flex-grow bg-[#0a0a0a] relative overflow-hidden">
                    <img src="/mockups/con-ed-mockup.png" alt="CE Con Ed Desktop" className="w-full h-full object-cover object-top opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-b-md border-t border-[#444]"></div>
                </div>
                
                {/* iPhone */}
                <div className="absolute w-20 h-40 bg-[#111] rounded-2xl border-[3px] border-[#333] shadow-2xl overflow-hidden ml-24 mt-12 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-500 ease-out z-20 floating-delayed">
                  <div className="absolute top-0 w-full h-4 flex justify-center z-20">
                    <div className="w-8 h-3 bg-[#111] rounded-b-lg border-b border-l border-r border-[#333]"></div>
                  </div>
                  <div className="w-full h-full bg-[#050505] relative overflow-hidden">
                    <img src="/mockups/con-ed-mockup.png" alt="CE Con Ed Mobile" className="w-full h-full object-cover object-top opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow z-10 bg-white dark:bg-[#09090B]">
              <span className="font-mono text-[10px] text-red-600 dark:text-red-500 tracking-wider uppercase mb-3">EDUTECH & COMPETITOR AUDIT</span>
              <h2 className="font-geist font-bold text-2xl text-slate-900 dark:text-white mb-2">CE Con Ed — School IT Support</h2>
              <h3 className="text-slate-600 dark:text-slate-300 font-medium text-sm mb-4">A modern UX rebuild and competitor market audit for a Hertfordshire school IT provider.</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 flex-grow leading-relaxed">Engineered with live SLA tracking widgets, plain-English service packages, and sub-second performance.</p>
              
              <button className="self-start px-6 py-2.5 rounded-full border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white text-sm font-semibold transition-colors duration-300 flex items-center gap-2">
                View Case Study
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </MagneticCard>
        </div>

      </div>
    </section>
  );
};

