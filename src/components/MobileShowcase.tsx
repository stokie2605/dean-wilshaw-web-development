import React from 'react';
import { Zap } from 'lucide-react';
import { PlumberMockup } from './mockups/PlumberMockup';
import { RooferMockup } from './mockups/RooferMockup';
import { LandscaperMockup } from './mockups/LandscaperMockup';

export const MobileShowcase: React.FC = () => {
  const trades = [
    {
      title: 'Emergency Plumbing',
      name: 'RapidRepair 24/7',
      component: <PlumberMockup />,
    },
    {
      title: 'Premium Roofing',
      name: 'Armor Roofing',
      component: <RooferMockup />,
    },
    {
      title: 'Bespoke Landscaping',
      name: 'Lumen Stone',
      component: <LandscaperMockup />,
    }
  ];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#111111] border-b border-[#222]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Mobile-First Engineering
          </span>
          <h2 className="font-geist font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Built for the 4G World.
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Your customers are searching for tradesmen on their phones while standing in the rain, not sitting at a desk. We build sub-second loading mobile experiences that convert instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-12">
          {trades.map((trade, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              
              {/* iPhone Frame */}
              <div className="relative w-full max-w-[280px] aspect-[9/19] bg-black rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500">
                {/* iPhone Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-xl w-32 mx-auto z-20"></div>
                
                {/* Scrollable / Clipped Screen */}
                <div className="absolute inset-0 bg-white overflow-hidden pointer-events-none">
                  {trade.component}
                </div>
              </div>

              {/* Trade Label */}
              <div className="mt-8 text-center">
                <h3 className="font-geist font-bold text-xl text-white mb-1">{trade.title}</h3>
                <p className="text-sm text-slate-400 font-medium">{trade.name}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
