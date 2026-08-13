import React, { useRef, useState } from 'react';
import { Rocket, ArrowRight, MessageCircle, ShieldCheck, Zap, Code2, Gauge, CheckCircle2 } from 'lucide-react';
import { MissedCallDemo } from './trade-tools/MissedCallDemo';

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

interface HeroProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onOpenQuote, onOpenWhatsApp }) => {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 overflow-hidden border-b border-slate-200 dark:border-zinc-800 transition-colors duration-300">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6 items-start text-left z-10">
          {/* Pill Badges */}
          <div className="flex flex-wrap gap-2 mb-2">
            <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span>📍 Cheshire & Stoke-on-Trent</span>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide inline-flex items-center gap-2 border border-red-200 dark:border-red-900/30 shadow-sm">
              <span>⏱ Sub-Second Load Speeds</span>
            </div>
          </div>

          {/* Main Display Headline (7 words max) */}
          <h1 className="font-geist font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-zinc-100 leading-[1.15] tracking-tight transition-colors duration-300">
            High-Converting Web Engines For{' '}
            <span className="text-red-700 dark:text-red-500 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              UK Trades.
            </span>
          </h1>

          {/* Subtitle (15 words max) */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-normal transition-colors duration-300">
            I build clean, fast websites for local UK trades that get you direct phone calls.
          </p>



          {/* Visual Interactive Cards / Micro Proof Pills */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800 w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-2 border border-slate-200 dark:border-zinc-800 shadow-sm">
              <span className="text-emerald-500">✓</span> Instant Price Estimators
            </div>
            <div className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-2 border border-slate-200 dark:border-zinc-800 shadow-sm">
              <span className="text-emerald-500">✓</span> Tap-to-Call Systems
            </div>
            <div className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-2 border border-slate-200 dark:border-zinc-800 shadow-sm">
              <span className="text-emerald-500">✓</span> No Hidden Fees
            </div>
          </div>


          
        </div>

        {/* Right Column: Interactive Hero Tool */}
        <div className="lg:col-span-5 relative w-full flex flex-col justify-center items-center">
          <div className="w-full relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 bg-red-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-red-600/30 flex items-center gap-2 border border-red-500 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Live Demo: Example Client Tool
            </div>
            <div className="w-full p-2 rounded-[2rem] bg-slate-100 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800/50 shadow-2xl">
              <MissedCallDemo />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

