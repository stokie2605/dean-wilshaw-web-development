import React from 'react';
import { CheckCircle2, ShieldCheck, MessageSquare, ArrowRight, Gauge, Zap } from 'lucide-react';

const AUDIT_WHATSAPP_URL = "https://wa.me/447348733365?text=Hi%20Dean,%20I'd%20like%20a%20%C2%A349%20website%20speed%20audit";

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
        <div className="text-center mb-12">
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

        {/* Featured Step 1 Entry Audit Card (Full Width) */}
        <div className="mb-12 bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider border border-red-200 dark:border-red-500/30">
                <Gauge className="w-3.5 h-3.5" />
                STEP 1: ENTRY AUDIT
              </div>

              <h3 className="font-geist font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                Mobile Speed &amp; Lead Health Check — <span className="text-red-600 dark:text-red-400">£49 Flat Fee</span>
              </h3>

              <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                I test your real mobile load speeds, break-test your forms and buttons, and show you exactly where you are losing customer calls.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3.5 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span><strong>100% Risk-Free:</strong> The full £49 is credited straight off the final bill if you hire me to fix or rebuild your website.</span>
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              <a
                href={AUDIT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20 hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Claim £49 Audit on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 3-Tier Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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

      </div>
    </section>
  );
};
