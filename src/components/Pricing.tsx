import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const packages = [
  {
    name: 'Landing Page',
    description: 'High-converting single-page engine built for maximum lead generation.',
    features: ['Mobile-first design', 'Sub-second load speeds', 'Contact & quote form', 'WhatsApp integration', 'Delivered in 1–2 weeks'],
  },
  {
    name: 'Business Site',
    description: 'Comprehensive 4-6 page web platform for established businesses.',
    features: ['Service breakdown pages', 'Google-ready local SEO schema', 'Custom trust badges', 'Fresh modern layout', 'Delivered in 1–2 weeks'],
  },
  {
    name: 'Custom Platform',
    description: 'Bespoke web applications, AI integrations, or complex multi-page systems.',
    features: ['Custom interactive tools', 'Client portals / dashboards', 'Trained AI assistants', 'Complex routing & logic', 'Custom delivery timeline'],
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
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-red-600 dark:hover:border-red-500 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="font-geist font-bold text-slate-900 dark:text-zinc-100 text-lg mb-1">{pkg.name}</h3>
              <p className="text-slate-600 dark:text-zinc-300 text-sm mb-4">{pkg.description}</p>



              <ul className="space-y-2 mb-6 flex-grow">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-red-700 dark:text-red-500 shrink-0 mt-0.5" />
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
