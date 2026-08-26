import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MissedCallDemo } from './trade-tools/MissedCallDemo';
import { ArrowRight, CheckCircle2, Phone, MessageSquare } from 'lucide-react';

interface InteractiveCardProps {
  title: string;
  description: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ title, description, onClick, children }) => {
  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Interactive Case Study: ${title}`}
      className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 group flex flex-col justify-between"
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
  const navigate = useNavigate();

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 overflow-hidden border-b border-slate-200 dark:border-zinc-800 transition-colors duration-300">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6 items-start text-left z-10">
          
          {/* Neutral Slate Pill Badges */}
          <div className="flex flex-wrap gap-2 mb-2">
            <div className="bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              <span>Cheshire &amp; Stoke-on-Trent</span>
            </div>
            <div className="bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              <span>Built for Speed on Mobile</span>
            </div>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-geist font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-zinc-100 leading-[1.15] tracking-tight transition-colors duration-300">
            High-Converting Web Engines For{' '}
            <span className="text-[#D90429] dark:text-[#D90429]">
              UK Trades.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-normal transition-colors duration-300">
            I build clean, fast websites for local UK trades that get you direct phone calls.
          </p>

          {/* Visual Interactive Cards / Micro Proof Neutral Slate Pills */}
          <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-200 dark:border-zinc-800 w-full max-w-2xl">
            <div className="bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 px-3.5 py-1.5 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700/60 shadow-sm">
              Instant Price Estimators
            </div>
            <div className="bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 px-3.5 py-1.5 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700/60 shadow-sm">
              Tap-to-Call Systems
            </div>
            <div className="bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 px-3.5 py-1.5 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700/60 shadow-sm">
              No Hidden Fees
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Hero Tool */}
        <div className="lg:col-span-5 relative w-full flex flex-col justify-center items-center">
          <div className="w-full relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 bg-emerald-950/80 dark:bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-xs font-semibold tracking-wide uppercase px-3.5 py-1 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Demo: Example Client Tool
            </div>
            <div className="w-full p-2 rounded-[2rem] bg-slate-100 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800/50 shadow-2xl">
              <MissedCallDemo />
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/demo/missed-call')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
              >
                <span>View full tool breakdown</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
