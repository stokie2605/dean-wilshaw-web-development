import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PRICING_TIERS = [
  {
    id: 'lead-engine',
    title: 'Single-Page Lead Engine',
    subtitle: 'High-converting single-page site focused on fast lead generation.',
    pricingNote: 'From £449',
    bullets: [
      'Built for fast customer contact with tap-to-call and WhatsApp links',
      'Mobile-first layout optimized for speed and local search visibility',
      'Structured layout for service highlights, customer reviews, and FAQs',
      'Simple online contact form routed directly to your email or phone',
    ],
  },
  {
    id: 'business-site',
    title: 'Multi-Page Business Site',
    subtitle: 'Comprehensive 4–6 page web presence built to scale.',
    pricingNote: 'From £749',
    bullets: [
      'Dedicated pages for individual service breakdowns and project galleries',
      'Integrated scheduling tools and custom multi-step inquiry forms',
      'Expanded site structure optimized for local search engine coverage',
      'Scalable setup allowing easy future page and content updates',
    ],
  },
  {
    id: 'custom-platform',
    title: 'Custom Web Platform',
    subtitle: 'Bespoke web applications, interactive tools, or client portals.',
    pricingNote: 'Custom Quote (Typically £1,200+)',
    bullets: [
      'Bespoke interactive features (calculators, quote estimators, visualizers)',
      'Secure client portals, user accounts, and custom dashboards',
      'Direct integrations with CRMs, payment tools, and live external data',
      'Custom web logic built to streamline your daily business operations',
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
