import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { VanguardMockup } from './mockups/VanguardMockup';
import { ApexMockup } from './mockups/ApexMockup';
import { KilnMockup } from './mockups/KilnMockup';

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
      title: 'Vanguard Roadside Recovery',
      subtitle: 'Rapid Emergency Dispatch & Transport Platform',
      uiFocus: 'Engineered for high-contrast visibility, sub-second 4G mobile rendering, and instant 1-tap emergency call routing.',
      component: <VanguardMockup />,
      modalOverview: 'A high-converting emergency response platform built with a bold dark industrial theme and vibrant safety-amber accents. Engineered for 24/7 roadside recovery dispatch and fleet transport scheduling.',
      features: [
        'Emergency dispatch call routing',
        'Mobile roadside request flow',
        'Fleet transfer booking',
        'Clear service breakdowns'
      ],
      badges: ['Mobile-First UI/UX', 'High-Conversion Design', 'Tailwind CSS', 'Emergency Dispatch UI']
    },
    {
      industryLabel: 'B2B Logistics & Corporate',
      title: 'Cheshire Apex Logistics',
      subtitle: 'Secure Client Portal & Enterprise Routing',
      uiFocus: 'Built for enterprise reliability, featuring secure client portal routing and structured data-driven UX.',
      component: <ApexMockup />,
      modalOverview: 'A professional B2B portal designed for logistics and transport corporations. Features a clean, data-first interface for tracking fleet schedules and managing corporate accounts.',
      features: [
        'Secure client login portal',
        'Fleet routing overview',
        'Data-driven dashboards',
        'Corporate B2B lead capture'
      ],
      badges: ['Client Portal', 'Enterprise UX', 'Secure Routing', 'Responsive Layout']
    },
    {
      industryLabel: 'Local Retail & Hospitality',
      title: 'The Kiln & Craft Artisan Market',
      subtitle: 'Community Event Platform & Producer Showcase',
      uiFocus: 'Designed for high-traffic weekend browsing with warm, inviting typography and frictionless event navigation.',
      component: <KilnMockup />,
      modalOverview: 'A vibrant community-focused portal designed for local produce markets and artisan retail. Highlights independent producers, seasonal events, and frictionless weekend navigation.',
      features: [
        'Stallholder showcases',
        'Live event schedule',
        'Interactive weekend maps',
        'Clean mobile navigation'
      ],
      badges: ['Community Platform', 'Event Scheduling', 'Clean Typography', 'Zero-Mile Branding']
    }
  ];

  return (
    <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-500 font-semibold mb-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            What I Can Do
          </span>
          <h2 className="font-geist font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Websites for Every Stage of Business.
          </h2>
          <div className="w-16 h-1 bg-[#dc2626] rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-base sm:text-lg">
            Whether you're a one-man band just starting out, or an established company looking to dominate local searches, I build exactly what you need to get the job done.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group flex flex-col bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl hover:border-red-600 dark:hover:border-red-500 transition-all duration-300">
              {/* 3D MacBook Container */}
              <div 
                className="relative bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-8 sm:p-10 pb-0 flex justify-center items-end [perspective:1200px] cursor-pointer"
                onClick={() => setActiveModal(idx)}
              >
                {/* Floating Performance Badge */}
                <div className="absolute top-4 right-4 md:right-8 z-30 bg-[#191c1e]/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0 flex items-center gap-1.5 pointer-events-none">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  100/100 Core Vitals
                </div>

                {/* Ambient Neon Glow */}
                <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-t-2xl"></div>

                {/* MacBook Mockup */}
                <div className="relative w-full max-w-lg aspect-[16/10] bg-[#111] rounded-t-xl border-[4px] border-[#2a2f32] border-b-0 shadow-2xl overflow-visible transition-all duration-700 ease-out transform-gpu group-hover:[transform:rotateX(6deg)_rotateY(-6deg)_scale(1.05)_translateY(-10px)] group-hover:shadow-[20px_30px_50px_rgba(0,0,0,0.6)] z-10">
                  
                  {/* MacBook Camera */}
                  <div className="absolute top-1 inset-x-0 h-1.5 flex justify-center z-20 pointer-events-none">
                    <div className="w-1.5 h-1.5 bg-black rounded-full border border-gray-800 shadow-inner"></div>
                  </div>
                  
                  {/* Screen Content */}
                  <div className="absolute top-3 inset-x-1 bottom-0 bg-white dark:bg-slate-900 overflow-hidden rounded-t-sm pointer-events-none">
                     {project.component}
                     {/* Glass Reflection overlay */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>

                  {/* MacBook Bottom Lip (Simulated via positioning) */}
                  <div className="absolute top-full -inset-x-6 h-4 bg-gradient-to-b from-[#3a3f42] to-[#111] rounded-b-2xl shadow-xl flex justify-center items-start pointer-events-none">
                    {/* Trackpad notch */}
                    <div className="w-20 h-1 bg-[#1a1c1e] rounded-b-md mx-auto shadow-inner"></div>
                  </div>
                </div>
              </div>
              
              {/* Content Box */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 dark:text-red-500 font-semibold mb-1">
                  {project.industryLabel}
                </span>
                <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-white mb-1">{project.title}</h3>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">{project.subtitle}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed mb-6 flex-grow">
                  {project.uiFocus}
                </p>
                <button 
                  onClick={() => setActiveModal(idx)}
                  className="block w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 py-3 rounded-lg text-sm font-semibold text-center transition-colors cursor-pointer"
                >
                  View Case Study
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {activeModal !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setActiveModal(null)}>
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-white">{projects[activeModal].title}</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {projects[activeModal].modalOverview}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Key Features:</p>
                <ul className="space-y-3">
                  {projects[activeModal].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Tech Stack & Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {projects[activeModal].badges.map((badge, i) => (
                    <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-3 justify-end items-center">
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

