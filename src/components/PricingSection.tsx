import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PRICING_TIERS = [
  {
    id: 'standalone-tools',
    title: 'Standalone Lead Tools',
    subtitle: 'Add a phone call or lead generator to your current site.',
    pricingNote: 'From £149 per tool',
    bullets: [
      { full: 'Missed-call auto-text & WhatsApp contact buttons', short: 'Missed-call & WhatsApp buttons' },
      { full: 'Visual job cost & price estimator widgets', short: 'Interactive price estimators' },
      { full: 'Simple deposit and booking forms', short: 'Simple booking & deposit forms' },
      { full: 'Plugs directly into your existing website (Wix, WordPress, or custom)', short: 'Plugs into Wix, WordPress & custom' },
    ],
  },
  {
    id: 'website-builds',
    title: 'Full Website Build',
    subtitle: 'A complete, fast single-page website designed to get calls.',
    pricingNote: 'From £299',
    bullets: [
      { full: 'Mobile-first layout built specifically for local UK trade customers', short: 'Mobile-first trade layout' },
      { full: 'Built from scratch for speed with zero clunky templates or page builders', short: 'Built from scratch for speed' },
      { full: 'Clear service breakdown, customer review display, and local contact setup', short: 'Services, reviews & contact setup' },
    ],
  },
  {
    id: 'custom-dev',
    title: 'Custom Builds',
    subtitle: 'For unique requirements or larger trade operations.',
    pricingNote: 'Custom Quote',
    bullets: [
      { full: 'Custom job booking or scheduling workflows', short: 'Custom booking & workflows' },
      { full: 'Connections to your existing payment or booking tools', short: 'Payment & software integration' },
      { full: 'Automated email or text updates for incoming jobs', short: 'Automated email & text alerts' },
      { full: 'Built 1-on-1 directly by Dean with no agency middlemen or junior devs', short: '1-on-1 direct with Dean' },
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
                    <span className="md:hidden">{f.short}</span>
                    <span className="hidden md:inline">{f.full}</span>
                  </li>
                ))}
              </ul>


            </div>
          ))}
        </div>

        {/* Optional Care Banner */}
        <div className="bg-slate-100 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex-1">
            <h3 className="font-geist font-bold text-slate-900 dark:text-zinc-100 text-lg sm:text-xl mb-1">Optional Monthly Site Care <span className="text-slate-500 dark:text-zinc-400 font-normal text-sm sm:text-base">(Zero Contract, Cancel Anytime)</span></h3>
            <p className="text-emerald-600 dark:text-emerald-500 font-semibold mb-4">£49 / month</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="md:hidden">Direct WhatsApp support for quick updates</span>
                <span className="hidden md:inline">Direct WhatsApp support for quick photo, text, or phone number changes</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="md:hidden">Fast hosting, security &amp; daily backups</span>
                <span className="hidden md:inline">High-speed hosting, security monitoring and daily backups</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="md:hidden">Google Business Profile updates</span>
                <span className="hidden md:inline">Google Business Profile updates to keep local callouts coming</span>
              </li>
            </ul>
            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-4 font-medium">
              (Optional - You still own your site 100% outright)
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
