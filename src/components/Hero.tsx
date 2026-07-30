import React, { useState } from 'react';
import { Rocket, ArrowRight, MessageCircle, ShieldCheck, Zap, Code2, Gauge, CheckCircle2 } from 'lucide-react';

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
        <div className="lg:col-span-5 relative w-full">
          <div 
            onClick={() => {
              const portfolio = document.getElementById('portfolio');
              if (portfolio) portfolio.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-600/50 dark:hover:border-red-500/50 rounded-[2rem] shadow-xl hover:shadow-2xl overflow-hidden transition-all transform hover:-translate-y-1 duration-300 flex flex-col cursor-pointer group"
          >
            {/* Image Container */}
            <div className="w-full bg-[#f8f9fa] dark:bg-slate-800/40 p-8 sm:p-10 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-200/30 dark:to-slate-900/50"></div>
              <img 
                src="/mockups/con-ed-mockup.png" 
                alt="CE Con Ed Case Study" 
                className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out relative z-10 drop-shadow-2xl"
              />
            </div>

            {/* Content Container */}
            <div className="p-8 flex flex-col bg-white dark:bg-slate-900">
              <span className="font-mono text-[10px] text-red-500 dark:text-red-400 tracking-wider uppercase mb-4 font-bold">
                EDUTECH & COMPETITOR AUDIT
              </span>
              
              <h3 className="font-geist font-bold text-2xl text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                CE Con Ed — School IT Support
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-sm font-medium">
                A modern UX rebuild and competitor market audit for a Hertfordshire school IT provider.
              </p>
              
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 text-sm">
                Engineered with live SLA tracking widgets, plain-English service packages, and sub-second performance.
              </p>

              <div className="mt-auto">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-300 font-semibold text-sm group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-colors">
                  View Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

