import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PRICING_TIERS = [
  {
    id: 'standalone-tools',
    title: 'Standalone Lead Tools',
    subtitle: 'Add a phone-call or lead generator to your current site.',
    pricingNote: 'From £149 per tool',
    bullets: [
      'Missed-call auto-text & WhatsApp contact buttons',
      'Visual job cost & price estimator widgets',
      'Simple deposit and booking forms',
      'Plugs directly into your existing website (Wix, WordPress, or custom)',
    ],
  },
  {
    id: 'website-builds',
    title: 'Full Website Build',
    subtitle: 'A complete, fast single-page website designed to get calls.',
    pricingNote: 'From £299',
    bullets: [
      'Mobile-first layout built specifically for local UK trade customers',
      'Built from scratch for speed — zero clunky templates or page builders',
      'Clear service breakdown, customer review display, and local contact setup',
    ],
  },
  {
    id: 'custom-dev',
    title: 'Custom Builds',
    subtitle: 'For unique requirements or larger trade operations.',
    pricingNote: 'Custom Quote',
    bullets: [
      'Custom job booking or scheduling workflows',
      'Connections to your existing payment or booking tools',
      'Automated email or text updates for incoming jobs',
      'Built 1-on-1 directly by Dean — no agency middlemen or junior devs',
    ],
  },
];

interface PricingProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
  onOpenStitch: () => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onOpenQuote, onOpenWhatsApp, onOpenStitch }) => {
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
