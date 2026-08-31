import React from 'react';
import { CheckCircle2, MessageSquare, ArrowRight, Gauge, FileText } from 'lucide-react';

const AUDIT_WHATSAPP_URL = "https://wa.me/447348733365?text=Hi%20Dean,%20I'd%20like%20a%20%C2%A349%20website%20speed%20audit";

const PRICING_TIERS = [
  {
    id: 'standalone-tools',
    title: 'Standalone Trade Tools',
    subtitle: 'Ready to install Interactive Widgets',
    pricingNote: 'From £149',
    bullets: [
      { full: 'Interactive Quote Calculators & Dynamic Sliders', short: 'Quote Calculators & Sliders' },
      { full: '24 hour Web Triage & Emergency Intake Forms', short: '24 hour Triage Forms' },
      { full: '24 hour AI Voice to Quote & Missed Call Engine', short: 'AI Voice to Quote Engine' },
      { full: 'Plugs into existing Wix, WordPress, Squarespace, or mobile SIM', short: 'Plugs into existing sites' },
      { full: 'Zero ongoing subscriptions on web widgets', short: 'Zero subscriptions' },
    ],
  },
  {
    id: 'landing-page',
    title: 'Build My Landing Page',
    subtitle: '★ Most Popular for Trades',
    pricingNote: 'From £299',
    popular: true,
    bullets: [
      { full: 'Hand coded lightweight custom single page build', short: 'Hand coded React & Vite' },
      { full: 'Includes 1 integrated trade tool of your choice', short: 'Includes 1 trade tool' },
      { full: 'Complete service breakdown, customer reviews & local SEO setup', short: 'Services, reviews & SEO schema' },
      { full: 'Tap to call mobile bar & trust badges', short: 'Tap to call & trust badges' },
      { full: 'Optional £49/mo managed site care retainer (hosting, SSL, maintenance)', short: 'Optional £49/mo site care' },
    ],
  },
  {
    id: 'custom-mixed',
    title: 'Custom & Mixed Infrastructure',
    subtitle: 'Multi-Van & Commercial',
    pricingNote: 'From £449',
    bullets: [
      { full: 'Turnkey Bundles (Full Landing Page + 24 hour Voice to Quote Engine)', short: 'Turnkey Bundles' },
      { full: 'Multi-tool integrations (Calculators + Triage + Telephony)', short: 'Multi-tool integrations' },
      { full: 'Bespoke multi page commercial portals & tender showcases', short: 'Bespoke commercial portals' },
      { full: 'Live booking systems, payment flows, and CRM integrations on request', short: 'CRM & Payment flows' },
    ],
  },
];

interface PricingProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
  onOpenStitch: () => void;
}

export const PricingSection: React.FC<PricingProps> = () => {
  return (
    <section id="pricing" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold mb-3 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 mt-3 mb-2 tracking-tight">
            Simple, Honest Prices
          </h2>
          <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base max-w-lg">
            No hidden fees, no surprises. You own your site outright.
          </p>
        </div>

        {/* Entry Audit  /  open strip with left accent */}
        <div className="mb-12 pl-5 border-l-2 border-emerald-500">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 mb-3">
            <Gauge className="w-3.5 h-3.5" />
            Step 1: Entry Audit
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                Mobile Speed & Lead Health Check:{' '}
                <span className="text-emerald-600 dark:text-emerald-400">£49 Flat Fee</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                A complete diagnostic of your trade website. I test real mobile loading speeds, break-test buttons and quote forms, and pinpoint exactly where you are losing customer enquiries.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <FileText className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                <span>Delivered as a clear 1-page breakdown with zero tech jargon.</span>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={AUDIT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 rounded-xl text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Claim £49 Audit on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 3-Tier Open Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-zinc-800">
          {PRICING_TIERS.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col py-8 md:py-0 first:pt-0 last:pb-0 md:first:pr-8 md:last:pl-8 md:[&:not(:first-child):not(:last-child)]:px-8"
            >
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1">{pkg.subtitle}</p>
              <h3 className="font-extrabold text-slate-900 dark:text-zinc-100 text-lg mb-1 tracking-tight">{pkg.title}</h3>

              <div className="mb-5 mt-3">
                <span className={`text-2xl font-black tracking-tight ${(pkg as any).popular ? 'text-[#D90429]' : 'text-slate-900 dark:text-white'}`}>
                  {pkg.pricingNote}
                </span>
              </div>

              <ul className="space-y-2.5 flex-grow">
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


