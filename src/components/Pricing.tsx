import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PRICING_TIERS = [
  {
    id: 'standalone-tools',
    title: 'Standalone Digital Tools',
    subtitle: 'Add a powerful lead-gen engine to your existing website.',
    pricingNote: 'From £149 per tool',
    bullets: [
      'AI Support Bots, Missed Call Auto-Text, and WhatsApp Integrations',
      'Interactive Visual Estimators and Quote Calculators',
      'Secure Priority Booking and Deposit Portals',
      'Seamlessly embedded into any existing website platform (WordPress, Wix, etc)',
    ],
  },
  {
    id: 'website-builds',
    title: 'Full Website Builds',
    subtitle: 'High-converting sites focused purely on lead generation.',
    pricingNote: 'From £299',
    bullets: [
      'Mobile-first layout optimized for speed and local search visibility',
      'Includes integration of up to 2 standalone digital tools',
      'Built from scratch in React - lightning fast, no clunky WordPress templates',
      'Fully structured for service highlights, customer reviews, and SEO',
    ],
  },
  {
    id: 'custom-dev',
    title: 'Bespoke Custom Development',
    subtitle: 'Got a unique problem? I can build a custom digital solution.',
    pricingNote: 'Custom Quote',
    bullets: [
      'Custom web applications, dashboards, and secure client portals',
      'Automated business workflows to eliminate manual admin tasks',
      'Direct API integrations with your CRM, payment tools, and scheduling software',
      'If it can be coded, I can build it to streamline your operations',
    ],
  },
];

interface PricingProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
  onOpenStitch: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenQuote }) => {
  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-red-700 dark:text-red-500 font-semibold mb-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 inline-block">
            Transparent Pricing
          </span>
          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-slate-900 dark:text-zinc-100 mt-3 mb-3">
            Simple, Honest Prices
          </h2>
          <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base max-w-lg mx-auto">
            No hidden fees, no surprises. You own your site outright.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {PRICING_TIERS.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-red-600 dark:hover:border-red-500 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="font-geist font-bold text-slate-900 dark:text-zinc-100 text-lg mb-1">{pkg.title}</h3>
              <p className="text-slate-600 dark:text-zinc-300 text-sm mb-2">{pkg.subtitle}</p>
              
              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-2.5 mb-4 border border-slate-200 dark:border-zinc-700/50">
                <p className="text-xs font-semibold text-slate-700 dark:text-zinc-300 text-center">{pkg.pricingNote}</p>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                {pkg.bullets.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>


            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
