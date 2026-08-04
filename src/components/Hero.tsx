import React, { useRef, useState } from 'react';
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
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 overflow-hidden border-b border-slate-200 dark:border-zinc-800 transition-colors duration-300">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6 items-start text-left z-10">
          {/* Engineered Badge */}
          <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <span>⚡ Blazing-Fast Web Development</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-geist font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-zinc-100 leading-[1.15] tracking-tight transition-colors duration-300">
            Websites That Actually Make Your{' '}
            <span className="text-red-700 dark:text-red-500 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Phone Ring.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-normal transition-colors duration-300">
            Custom, mobile-first websites built to turn visitors into paying customers for ambitious businesses across Cheshire & Stoke-on-Trent.
          </p>



          {/* Micro Proof Pills */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800 w-full max-w-2xl">
            <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span>📱 Looks Great on Mobile</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span>🔍 Google Friendly</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span>⚡ 1-2 Wk Turnaround</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-6 py-3.5 rounded-xl font-geist font-bold text-sm shadow-lg shadow-red-600/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Book 15-Min Chat
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
        </div>

        {/* Right Column: Real Project Showcase */}
        <div className="lg:col-span-5 relative w-full flex flex-col justify-center">
          <MagneticCard onClick={() => setIsCaseStudyOpen(true)}>
            <div className="relative h-64 sm:h-72 w-full overflow-hidden flex items-center justify-center p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#09090B]">
              {/* Ambient Glows */}
              <div className="absolute inset-0 blur-[80px] rounded-full w-48 h-48 top-1/2 transform -translate-y-1/2 mix-blend-screen opacity-50 group-hover:opacity-80 transition-opacity duration-700 bg-emerald-500/20 left-1/2 -translate-x-1/2"></div>
              
              {/* Badges */}
              <div className="absolute top-6 right-6 z-20 bg-white/90 dark:bg-[#09090B]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-lg group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-emerald-500 dark:text-emerald-400 text-xs">⚡</span>
                <span className="font-mono text-slate-900 dark:text-zinc-100 text-xs font-medium">95+ Score</span>
              </div>
              
                {/* Device Mockups container */}
                <div className="relative w-full max-w-sm h-full flex items-center justify-center z-10 floating perspective-1000">
                  {/* MacBook Pro */}
                  <div className="absolute w-56 h-36 sm:w-64 sm:h-40 -ml-12 transform group-hover:-translate-y-2 group-hover:scale-105 group-hover:rotate-y-2 transition-all duration-500 ease-out z-10 flex flex-col items-center">
                    {/* Screen Section */}
                    <div className="w-full flex-grow bg-[#0a0a0a] rounded-t-xl rounded-b-sm border-t-2 border-l-2 border-r-2 border-slate-300 dark:border-[#333] p-[3px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col">
                      <div className="w-full flex-grow bg-[#111] rounded-t-lg relative overflow-hidden border border-black/60">
                        {/* Webcam */}
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0a0a0a] border border-[#222] rounded-full z-20 flex items-center justify-center">
                          <div className="w-0.5 h-0.5 bg-blue-900/50 rounded-full"></div>
                        </div>
                        <img src="/mockups/con-ed-mockup.webp" srcSet="/mockups/con-ed-mockup-small.webp 600w, /mockups/con-ed-mockup.webp 1200w" sizes="(max-width: 640px) 600px, 1200px" alt="CE Con Ed Desktop" width={1200} height={800} fetchPriority="high" decoding="async" className="w-full h-full object-cover object-top" />
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
                  
                  {/* iPhone Pro */}
                  <div className="absolute w-20 h-40 sm:w-24 sm:h-48 ml-24 mt-12 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:scale-110 group-hover:-rotate-y-6 transition-all duration-500 ease-out z-20 floating-delayed">
                    {/* Stainless Steel Frame */}
                    <div className="w-full h-full bg-slate-200 dark:bg-[#1a1a1a] rounded-[24px] border border-slate-300 dark:border-[#444] shadow-2xl p-[3px] relative flex flex-col ring-1 ring-black/10 dark:ring-white/5">
                      {/* Volume & Power Buttons (visual hack using absolute borders) */}
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
                        
                        <img src="/mockups/con-ed-mockup.webp" srcSet="/mockups/con-ed-mockup-small.webp 600w, /mockups/con-ed-mockup.webp 1200w" sizes="(max-width: 640px) 600px, 1200px" alt="CE Con Ed Mobile" width={1200} height={800} fetchPriority="high" decoding="async" className="w-full h-full object-cover object-top" />
                        
                        {/* Soft Glass Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow z-10 bg-white dark:bg-[#09090B]">
              <span className="font-mono text-[10px] text-red-700 dark:text-red-500 tracking-wider uppercase mb-3">EDUTECH & COMPETITOR AUDIT</span>
              <h2 className="font-geist font-bold text-2xl text-slate-900 dark:text-zinc-100 mb-2">CE Con Ed — School IT Support</h2>
              <h3 className="text-slate-600 dark:text-zinc-300 font-medium text-sm mb-4">A modern UX rebuild and competitor market audit for a Hertfordshire school IT provider.</h3>
              <p className="text-slate-500 dark:text-zinc-400 text-sm mb-2 flex-grow leading-relaxed">Engineered with live SLA tracking widgets, plain-English service packages, and sub-second performance.</p>
            </div>
          </MagneticCard>
        </div>

      </div>

      {/* Case Study Modal */}
      {isCaseStudyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsCaseStudyOpen(false)}>
          <div 
            className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-zinc-800">
              <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-zinc-100">CE Con Ed — Hertfordshire School IT Engine</h3>
              <button 
                onClick={() => setIsCaseStudyOpen(false)}
                className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  A complete strategic refresh translating complex school IT SLAs into high-trust, plain-English support portals for headteachers and school governors across Watford and Hertfordshire.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-zinc-800/50">
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Key Features:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Comprehensive competitor & market audit across regional school IT providers</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Interactive live support status widget (99.9% uptime & SLA tracking)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Plain-English service packages tailored specifically for KS1 & KS2 leadership</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Sub-second React & Tailwind frontend architecture built for speed</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Tech Stack & Tags:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-zinc-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-zinc-800">EduTech UX</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-zinc-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-zinc-800">Competitor Audit</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-zinc-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-zinc-800">React Architecture</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-zinc-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-zinc-800">Tailwind CSS</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/60/50 flex flex-col sm:flex-row gap-3 justify-end items-center">
              <button 
                onClick={() => {
                  setIsCaseStudyOpen(false);
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

