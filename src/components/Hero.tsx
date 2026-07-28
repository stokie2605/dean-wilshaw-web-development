import React, { useState } from 'react';
import { Rocket, ArrowRight, MessageCircle, ShieldCheck, Zap, Code2, Gauge, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenWhatsApp }) => {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

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
            Custom, mobile-first websites built to turn visitors into paying customers for ambitious businesses across Cheshire & Stoke-on-Trent. No tech jargon, no hidden fees.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-2 w-full sm:w-auto">
            <button
              onClick={onOpenQuote}
              className="bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 px-6 py-3.5 rounded-lg font-semibold text-sm sm:text-base text-center transition-all flex justify-center items-center gap-2 group"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenWhatsApp}
              className="border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-3.5 rounded-lg font-semibold text-sm sm:text-base text-center transition-all flex justify-center items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              Message on WhatsApp
            </button>
          </div>

          {/* Micro Proof Bar */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 w-full max-w-xl text-xs sm:text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Looks Great on Mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Google Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>2-3 Wk Turnaround</span>
            </div>
          </div>
        </div>

        {/* Right Column: Real Project Showcase */}
        <div className="lg:col-span-5 relative w-full">
          <div 
            onClick={() => setIsCaseStudyOpen(true)}
            className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-red-600 dark:hover:border-red-500/50 text-slate-900 dark:text-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all transform hover:-translate-y-1 duration-300 p-6 flex flex-col gap-4 cursor-pointer group"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-red-500/10 transition-colors border border-slate-200 dark:border-slate-700">
                  <Code2 className="w-5 h-5 text-red-600 dark:text-red-400 group-hover:text-red-500 transition-colors" />
                </div>
                <div>
                  <h3 className="font-geist font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Custom React Booking & Quote Engine
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A high-performance, mobile-first web app built with React and TypeScript, delivering instant quote calculations and seamless WhatsApp lead routing.
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-[10px] font-mono border border-slate-200 dark:border-slate-700">React</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-[10px] font-mono border border-slate-200 dark:border-slate-700">Vite</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-[10px] font-mono border border-slate-200 dark:border-slate-700">Tailwind CSS</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-[10px] font-mono border border-slate-200 dark:border-slate-700">TypeScript</span>
            </div>

            <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-3 group-hover:text-red-300 transition-colors">
              Click to explore technical case study →
            </p>
          </div>
        </div>

      </div>
      {/* Case Study Modal */}
      {isCaseStudyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsCaseStudyOpen(false)}>
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-white">Project Case Study</h3>
              <button 
                onClick={() => setIsCaseStudyOpen(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Custom React Booking & Quote Engine</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  A high-performance, mobile-first web app built with React and TypeScript, delivering instant quote calculations and seamless WhatsApp lead routing.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Project Highlights:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Frontend Modernization:</strong> Replaced outdated processes with a clean React interface.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Performance Optimization:</strong> Built with Vite and Tailwind for lightning-fast load times.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Operational Reliability:</strong> Leveraged 25 years of strict operational discipline in logistics to deliver highly reliable software systems.</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Tech Stack Used:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700">React</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700">Vite</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700">Tailwind CSS</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700">TypeScript</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700">Vercel</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-3 justify-end items-center">
              <a 
                href="https://github.com/stokie2605/school-it-support-refresh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg text-sm font-semibold transition-colors text-center"
              >
                View Code on GitHub
              </a>
              <button 
                onClick={() => {
                  setIsCaseStudyOpen(false);
                  onOpenQuote();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 rounded-lg text-sm font-semibold transition-colors text-center"
              >
                Request Similar Scope
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

