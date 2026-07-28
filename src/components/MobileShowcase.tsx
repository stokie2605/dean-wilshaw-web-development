import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';
import { PlumberMockup } from './mockups/PlumberMockup';
import { RooferMockup } from './mockups/RooferMockup';
import { LandscaperMockup } from './mockups/LandscaperMockup';

interface MobileShowcaseProps {
  onOpenQuote: () => void;
}

export const MobileShowcase: React.FC<MobileShowcaseProps> = ({ onOpenQuote }) => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const trades = [
    {
      title: 'Emergency Plumbing',
      name: 'RapidRepair 24/7',
      component: <PlumberMockup />,
      modalOverview: 'A high-converting mobile interface designed specifically for emergency plumbing services. Features sub-second loading and instant tap-to-call routing to capture desperate leads instantly.',
      features: [
        'Prominent click-to-call buttons',
        'Fixed app-style bottom navigation',
        'Clear emergency response indicators',
        'Fast-loading service grid'
      ],
      badges: ['Mobile-First UI', 'Tap-To-Call', 'High Conversion', 'Tailwind CSS']
    },
    {
      title: 'Premium Roofing',
      name: 'Armor Roofing',
      component: <RooferMockup />,
      modalOverview: 'A premium, trust-building mobile showcase designed for high-ticket trades. Features a sleek dark mode aesthetic with vibrant trust indicators and a built-in project gallery.',
      features: [
        'Trust-building dark mode UI',
        'Built-in project gallery grid',
        'Clear "Request Survey" CTA',
        'App-like bottom navigation'
      ],
      badges: ['Dark Mode', 'Trust Signals', 'Project Gallery', 'Responsive UX']
    },
    {
      title: 'Bespoke Landscaping',
      name: 'Lumen Stone',
      component: <LandscaperMockup />,
      modalOverview: 'An elegant, earthy mobile interface designed for bespoke landscaping and driveway specialists. Uses clean typography and a visual service selector to guide users to book a consultation.',
      features: [
        'Visual service selector grid',
        'Clean, elegant typography',
        'Prominent booking CTA',
        'Frictionless mobile navigation'
      ],
      badges: ['Elegant UI', 'Visual Navigation', 'Lead Generation', 'Modern Serif']
    }
  ];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-800 dark:text-slate-200 font-semibold mb-2 bg-slate-200 dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-300 dark:border-slate-800 inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-500" /> Mobile-First Engineering
          </span>
          <h2 className="font-geist font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white mb-4">
            Built for the 4G World.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-base sm:text-lg">
            Your customers are searching for tradesmen on their phones while standing in the rain, not sitting at a desk. We build sub-second loading mobile experiences that convert instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-12">
          {trades.map((trade, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              
              {/* iPhone Frame */}
              <div 
                className="relative w-full max-w-[280px] aspect-[9/19] bg-black rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden transform group-hover:-translate-y-2 group-hover:scale-[1.02] cursor-pointer transition-transform duration-500"
                onClick={() => setActiveModal(idx)}
              >
                {/* iPhone Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-xl w-32 mx-auto z-20"></div>
                
                {/* Scrollable / Clipped Screen */}
                <div className="absolute inset-0 bg-white overflow-hidden pointer-events-none">
                  {trade.component}
                </div>
              </div>

              {/* Trade Label */}
              <div className="mt-8 text-center">
                <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-white mb-1">{trade.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{trade.name}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeModal !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setActiveModal(null)}>
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-white">{trades[activeModal].title}</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {trades[activeModal].modalOverview}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Key Features:</p>
                <ul className="space-y-3">
                  {trades[activeModal].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Tech Stack & Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {trades[activeModal].badges.map((badge, i) => (
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
                className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold transition-colors text-center"
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
