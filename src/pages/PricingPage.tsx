import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomTabBar } from '../components/BottomTabBar';
import { Footer } from '../components/Footer';
import { QuoteForm } from '../components/QuoteForm';
import { WhatsAppModal } from '../components/WhatsAppModal';
import {
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const WHATSAPP_NUMBER = '447348733365';

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type PricingTier = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceBadge?: string;
  termLines: string[];
  bullets: string[];
  ctaText: string;
  whatsappMessage: string;
  mobileTabLabel: string;
  mobileTabPrice: string;
};

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'trade-starter',
    title: 'Trade Starter',
    subtitle: 'A complete mobile friendly site built to get the phone ringing.',
    price: '£450',
    priceBadge: '£350 Founding Rate for First 5 Local Trades',
    termLines: [
      'Founding Rate: £175 deposit to start, £175 final balance upon sign off.',
      'Standard Rate: £225 deposit to start, £225 final balance upon sign off.',
    ],
    bullets: [
      'Mobile friendly custom build',
      'Tap to call bar',
      'WhatsApp integration',
      'Google Business setup',
      'Full code ownership',
      'Zero lock in',
    ],
    ctaText: 'Claim £350 Founding Rate on WhatsApp',
    whatsappMessage: 'Hi Dean, I would like to claim the £350 Founding Rate for the Trade Starter website package.',
    mobileTabLabel: 'Trade Starter',
    mobileTabPrice: '£350',
  },
  {
    id: 'pro-multi-section',
    title: 'Pro Multi Section Platform',
    subtitle: 'A bigger, richer site for trades running multiple services.',
    price: '£700',
    termLines: [
      '50% deposit to start, 50% final balance upon sign off.',
    ],
    bullets: [
      'Multi service breakdown',
      'Before and after work galleries',
      'Customer review integration',
      'Interactive quote scope calculator',
    ],
    ctaText: 'Discuss a Multi Section Build',
    whatsappMessage: 'Hi Dean, I would like to discuss the Pro Multi Section Platform package.',
    mobileTabLabel: 'Pro Platform',
    mobileTabPrice: '£700',
  },
];

function PricingCard({ tier, compact = false }: { tier: PricingTier; compact?: boolean }) {
  return (
    <div className={`bg-white dark:bg-[#0A0D14] rounded-2xl ${compact ? 'p-4' : 'p-6 sm:p-8'} flex flex-col justify-between transition-all border border-slate-200 dark:border-white/[0.08] shadow-lg`}>
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold mb-2 tracking-tight text-slate-900 dark:text-white">
          {tier.title}
        </h3>
        <p className={`text-xs sm:text-sm ${compact ? 'mb-4' : 'mb-6'} text-slate-500 dark:text-zinc-400`}>
          {tier.subtitle}
        </p>

        {/* Price */}
        <div className={compact ? 'mb-4' : 'mb-6'}>
          <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {tier.price}
          </div>
          {tier.priceBadge && (
            <div className="mt-2 inline-block px-2.5 py-1.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-mono text-[10px] sm:text-[11px] font-bold leading-tight">
              {tier.priceBadge}
            </div>
          )}
          <div className="mt-3 space-y-1">
            {tier.termLines.map((line) => (
              <p key={line} className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 leading-snug">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Features */}
        <ul className={compact ? 'space-y-2 mb-5' : 'space-y-3 mb-8'}>
          {tier.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <a
        href={whatsappLink(tier.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 mt-4 bg-[#D90429] hover:bg-[#b80322] active:bg-[#9a021c] text-white shadow-lg shadow-red-600/20"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span>{tier.ctaText}</span>
      </a>
    </div>
  );
}

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [activeMobileTier, setActiveMobileTier] = useState(PRICING_TIERS[0].id);
  const activeTier = PRICING_TIERS.find((t) => t.id === activeMobileTier) ?? PRICING_TIERS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#040507] text-slate-900 dark:text-white selection:bg-red-500/30 transition-colors duration-300 overflow-x-hidden">

      {/* Navigation */}
      <Header onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-24 sm:pt-28 pb-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">

          {/* Pricing Header */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase">
              Transparent Pricing
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-slate-900 dark:text-white">
              Simple, Honest Trade Pricing
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400">
              Two fixed packages, no hidden fees, and zero platform lock in. You own 100% of your website outright.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div>
            {/* Mobile: tab switcher showing one active tier */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] mb-6">
                {PRICING_TIERS.map((tier) => {
                  const isActive = tier.id === activeMobileTier;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveMobileTier(tier.id)}
                      className={`min-w-0 flex flex-col items-center justify-center gap-0.5 px-2 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-[#D90429] text-white shadow-sm'
                          : 'text-slate-600 dark:text-zinc-400 active:bg-white dark:active:bg-white/[0.06]'
                      }`}
                    >
                      <span className="text-[11px] font-semibold leading-tight">{tier.mobileTabLabel}</span>
                      <span className="text-xs font-mono font-bold leading-tight">{tier.mobileTabPrice}</span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-3">
                <PricingCard tier={activeTier} compact />
              </div>
            </div>

            {/* Desktop: 2 Structured Pricing Cards side by side */}
            <div className="hidden md:grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
              {PRICING_TIERS.map((tier) => (
                <PricingCard key={tier.id} tier={tier} />
              ))}
            </div>
          </div>

          {/* Add On Retainer: Mobile Care Plan */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase font-mono border bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800">
                    Add On Retainer
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Mobile Care Plan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    Rolling 30 day agreement. Cancel anytime with a WhatsApp message. No 12 month lock in. 100% client code ownership.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      'Fast edge hosting',
                      'SSL management',
                      'Uptime monitoring',
                      'Up to 30 minutes of monthly text and photo updates',
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 text-center lg:text-right">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">
                    £35 <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">/ month</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-end gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold mb-4">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>No 12 month lock in</span>
                  </div>
                  <a
                    href={whatsappLink('Hi Dean, I would like to add the £35 per month Mobile Care Plan to my website.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 font-bold text-sm transition-all shadow-sm"
                  >
                    <span>Add Mobile Care Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenWhatsApp={() => setWhatsappModalOpen(true)}
        onOpenQuote={() => setQuoteModalOpen(true)}
        onOpenPrivacy={() => navigate('/privacy')}
        onOpenTerms={() => navigate('/terms')}
      />

      {/* Global Modals */}
      <QuoteForm
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        onOpenWhatsApp={() => setWhatsappModalOpen(true)}
      />
      <WhatsAppModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
      />

      {/* Mobile Bottom Navigation Bar (<768px) */}
      <BottomTabBar />

    </div>
  );
};
