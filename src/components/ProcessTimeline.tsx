import React from 'react';
import { Search, Compass, Code, Flag, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Discovery & Local Strategy',
    icon: <Search className="w-5 h-5 text-[#991b1b]" />,
    duration: '1 - 2 Days',
    description: 'We review your target market across Cheshire, Stoke-on-Trent, or nationwide. We map out your key services, ideal lead profiles, and competitor gaps.'
  },
  {
    step: '02',
    title: 'Bespoke UX & Conversion Path',
    icon: <Compass className="w-5 h-5 text-[#991b1b]" />,
    duration: '3 - 5 Days',
    description: 'Crafting high-converting visual page layouts with frictionless quote forms, phone tap-to-call CTAs, and trust badges.'
  },
  {
    step: '03',
    title: 'High-Performance React Build',
    icon: <Code className="w-5 h-5 text-[#991b1b]" />,
    duration: '7 - 10 Days',
    description: 'Writing clean, ultralight React 19 + Vite code with 100/100 Lighthouse performance, zero plugin bloat, and full Schema JSON-LD markup.'
  },
  {
    step: '04',
    title: 'SEO Audit & Live Handoff',
    icon: <Flag className="w-5 h-5 text-[#991b1b]" />,
    duration: '1 - 2 Days',
    description: 'Final Core Web Vitals speed tests, Google Search Console indexing, domain configuration, and testing lead notifications.'
  }
];

export const ProcessTimeline: React.FC = () => {
  return (
    <section id="process" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#ffffff] border-b border-[#c6c6cd]/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#991b1b] font-semibold mb-2 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Predictable Execution
          </span>
          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-[#191c1e] mb-3">
            The 4-Step Engineering Roadmap
          </h2>
          <div className="w-16 h-1 bg-[#dc2626] rounded-full"></div>
          <p className="mt-4 text-[#45464d] max-w-xl text-sm sm:text-base">
            From initial strategy call to live deployment in 2-3 weeks. No endless revisions, no missed launch dates.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((stepItem, idx) => (
            <div
              key={stepItem.step}
              className="bg-[#f7f9fb] border border-[#c6c6cd] rounded-xl p-6 relative flex flex-col justify-between hover:border-[#dc2626] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-geist font-extrabold text-3xl text-[#c6c6cd] group-hover:text-[#dc2626] transition-colors">
                    {stepItem.step}
                  </span>
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#c6c6cd] shadow-2xs">
                    {stepItem.icon}
                  </div>
                </div>

                <div className="inline-block bg-red-100 text-[#991b1b] text-[10px] font-mono font-bold px-2 py-0.5 rounded mb-2">
                  {stepItem.duration}
                </div>

                <h3 className="font-geist font-bold text-lg text-[#191c1e] mb-2">
                  {stepItem.title}
                </h3>

                <p className="text-xs text-[#45464d] leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#c6c6cd] p-1 rounded-full text-[#76777d]">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

