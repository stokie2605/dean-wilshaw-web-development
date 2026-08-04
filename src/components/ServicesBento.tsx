import React, { useState } from 'react';
import { Gauge, TrendingUp, Search, Layers, ArrowUpRight, Check, X } from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  bgIconName: string;
  description: string;
  tags: string[];
  features: string[];
  techStack: string;
  roiImpact: string;
}

const SERVICES: ServiceDetail[] = [
  {
    id: 'mobile-first',
    title: 'Looks Great on Mobile',
    badge: 'Mobile Optimized',
    icon: <Gauge className="w-6 h-6 text-slate-900 dark:text-zinc-100" />,
    bgIconName: 'smartphone',
    description: '',
    tags: ['MOBILE', 'FAST', 'EASY TO USE'],
    features: [
      'Sub-second mobile loading speeds',
      'Hand-crafted React responsive layout',
      'Flawless display across iOS & Android'
    ],
    techStack: '',
    roiImpact: ''
  },
  {
    id: 'more-calls',
    title: 'Gets Your Phone Ringing',
    badge: 'More Leads',
    icon: <TrendingUp className="w-6 h-6 text-slate-900 dark:text-zinc-100" />,
    bgIconName: 'trending_up',
    description: '',
    tags: ['CALLS', 'WHATSAPP', 'QUOTES'],
    features: [
      'Sticky tap-to-call action buttons',
      'Instant WhatsApp lead routing',
      'Frictionless mobile quote forms'
    ],
    techStack: '',
    roiImpact: ''
  },
  {
    id: 'google-ready',
    title: 'Findable on Google',
    badge: 'Local Search',
    icon: <Search className="w-6 h-6 text-slate-900 dark:text-zinc-100" />,
    bgIconName: 'search',
    description: '',
    tags: ['GOOGLE', 'LOCAL', 'SEO'],
    features: [
      'Built for local SEO & search ranking',
      'Clean semantic HTML architecture',
      'Structured local Schema markup'
    ],
    techStack: '',
    roiImpact: ''
  },
  {
    id: 'zero-stress',
    title: '100% Code Ownership',
    badge: 'Honest Pricing',
    icon: <Layers className="w-6 h-6 text-slate-900 dark:text-zinc-100" />,
    bgIconName: 'handshake',
    description: '',
    tags: ['HONEST', 'LOCAL', 'NO TRAPS'],
    features: [
      'Zero proprietary template lock-ins',
      'Direct, 1-on-1 developer support',
      'Optional £40/mo maintenance & care'
    ],
    techStack: '',
    roiImpact: ''
  }
];

export const ServicesBento: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-red-700 dark:text-red-500 font-semibold mb-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            A Genuine Investment
          </span>
          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-slate-900 dark:text-zinc-100 mb-3">
            Honest, High-Performance Web Design.
          </h2>
          <div className="w-16 h-1 bg-[#dc2626] rounded-full"></div>
          <p className="mt-4 text-slate-600 dark:text-zinc-300 max-w-2xl text-sm sm:text-base">
            I build websites focused on speed and mobile usability. A clean, fast website is a simple investment that helps local people find you on Google, trust your business, and easily contact you for a quote.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-zinc-900/60/90 border border-slate-200 dark:border-zinc-800 hover:border-red-600 dark:hover:border-red-500 rounded-2xl p-6 shadow-xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Background Icon Watermark */}
              <div className="absolute top-2 right-2 p-2 pointer-events-none">
                <span className="material-symbols-outlined text-[80px] text-slate-200/60 dark:text-slate-800/40 pointer-events-none transition-colors duration-300">
                  {service.bgIconName}
                </span>
              </div>

              <div>
                {/* Icon Box */}
                <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 inline-flex items-center justify-center mb-5 group-hover:border-red-600 dark:group-hover:border-red-500 group-hover:bg-red-500/10 transition-colors shadow-sm">
                  {service.icon}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-geist font-bold text-lg text-slate-900 dark:text-zinc-100 transition-colors">
                    {service.title}
                  </h3>
                </div>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Tags */}
              <div className="flex gap-1.5 flex-wrap pt-2 border-t border-slate-200 dark:border-zinc-800">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-950 text-slate-700 dark:text-zinc-300 text-[10px] font-mono font-semibold rounded border border-slate-200 dark:border-zinc-800 group-hover:border-red-600/40 dark:group-hover:border-red-500/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
};

