import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomTabBar } from '../components/BottomTabBar';
import { Footer } from '../components/Footer';
import { QuoteForm } from '../components/QuoteForm';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { StitchBot } from '../components/StitchBot';
import { 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  Gauge, 
  Zap, 
} from 'lucide-react';

const AUDIT_WHATSAPP_URL = "https://wa.me/447348733365?text=Hi%20Dean,%20I'd%20like%20a%20%C2%A349%20website%20speed%20audit";

type PricingTier = {
  id: string;
  title: string;
  subtitle: string;
  pricingNote: string;
  pricingSubtext?: string;
  pricingSubtextBadge?: string;
  splitTerms?: string;
  popular?: boolean;
  isHighTech?: boolean;
  badge: string;
  badgeColor: string;
  bullets: { full: string; short: string }[];
  ctaText: string;
  isQuoteTrigger?: boolean;
  stripeLink?: string;
};

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'standalone-tools',
    title: 'Standalone Trade Tools',
    subtitle: 'Add an interactive phone or quote generator to your existing site.',
    pricingNote: 'From £149',
    pricingSubtext: 'Ready to install',
    badge: 'Fast Integration',
    badgeColor: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800',
    bullets: [
      { full: 'Interactive Quote Calculators & visual pricing sliders', short: '' },
      { full: '24 hour Web Triage & Emergency Intake Forms', short: '' },
      { full: '24 hour AI Voice to Quote & Missed Call Engine', short: '' },
      { full: 'Plugs into existing Wix, WordPress, Squarespace, or mobile SIM', short: '' },
      { full: 'Zero ongoing subscriptions on tools', short: '' },
    ],
    ctaText: 'Select a Tool (From £149)',
    isQuoteTrigger: true,
  },
  {
    id: 'landing-page',
    title: 'Complete Trade Build',
    subtitle: 'A complete, clean single page web engine engineered for calls.',
    pricingNote: 'From £299',
    pricingSubtext: '100% Client Code Ownership',
    popular: true,
    badge: '★ RECOMMENDED',
    badgeColor: 'bg-red-50 text-[#D90429] border-red-200/80 dark:bg-red-500/10 dark:text-[#D90429] dark:border-red-500/30',
    bullets: [
      { full: 'Hand coded lightweight custom single page build', short: '' },
      { full: 'Includes 1 integrated trade tool of your choice', short: '' },
      { full: 'Complete service breakdown, customer reviews & local SEO setup', short: '' },
      { full: 'Tap to call mobile bar & trust badges', short: '' },
      { full: 'Optional £49 per month managed site care retainer (hosting, SSL, maintenance)', short: '' },
    ],
    ctaText: 'Build My Landing Page (£299)',
    isQuoteTrigger: true,
  },
  {
    id: 'custom-mixed',
    title: 'Custom & Mixed Infrastructure',
    subtitle: 'Bespoke portals and turnkey multi tool infrastructure.',
    pricingNote: 'From £449',
    pricingSubtext: 'Built to your specification',
    badge: 'Custom Solutions',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50',
    isHighTech: true,
    bullets: [
      { full: 'Complete packages (Full Landing Page + 24 hour Voice to Quote Engine)', short: '' },
      { full: 'Multi tool integrations (Calculators + Triage + Telephony)', short: '' },
      { full: 'Bespoke custom commercial portals & tender showcases', short: '' },
      { full: 'Live booking systems and payment setups on request', short: '' },
    ],
    ctaText: 'Discuss a Custom Mix',
    isQuoteTrigger: false,
  },
];

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [stitchModalOpen, setStitchModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#040507] text-slate-900 dark:text-white selection:bg-red-500/30 transition-colors duration-300 overflow-x-hidden">
      
      {/* Navigation */}
      <Header onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-24 sm:pt-28 pb-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">

          {/* DIRECTIONAL LINK TO DEMOS */}
          <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">Looking for complete site architectures?</h2>
              <p className="text-sm text-slate-600 dark:text-zinc-400">View our bespoke layout engines and performance prototypes.</p>
            </div>
            <Link 
              to="/demos"
              className="w-full sm:w-auto shrink-0 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 font-bold py-3 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#D90429]" />
              View Our Layout Showcases &rarr;
            </Link>
          </div>

          {/* 1. SECTION: £49 MOBILE SPEED & LEAD HEALTH CHECK BANNER */}
          <div className="bg-white dark:bg-[#0A0D14] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              
              {/* Left Column: Offer Details */}
              <div className="space-y-4 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase">
                  <Gauge className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  Low Risk Entry Offer
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  £49 Mobile Speed &amp; Lead Health Check
                </h2>

                <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                  Wondering why your current site isn't generating calls? I will audit your live mobile speeds, find the problems stopping customers from calling, and deliver a personalised short video walkthrough with 3 actionable fixes within 24 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-medium text-slate-700 dark:text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Honest mobile speed review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Personalised video walkthrough</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>3 direct conversion fixes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>£49 credited back if you build with me</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing & WhatsApp CTA */}
              <div className="bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-emerald-500/30 rounded-xl p-6 sm:p-8 text-center flex flex-col items-center justify-between min-w-[280px] sm:min-w-[320px] shadow-lg shrink-0">
                <div className="space-y-1 mb-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono">
                    24 Hour Turnaround
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                    £49
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                    One off payment  /  Zero obligation
                  </div>
                </div>

                <a
                  href={AUDIT_WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] text-black font-semibold hover:bg-[#20ba5a] text-sm transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Book Audit via WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

          {/* 2. SECTION: 3 PRICING CARDS */}
          <div>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase">
                Transparent Pricing
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-slate-900 dark:text-white">
                Simple, Honest Trade Pricing
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400">
                No hidden fees, no agency markups, and zero platform lock-in contracts. You own 100% of your source code outright.
              </p>
            </div>

            {/* 3 Structured Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {PRICING_TIERS.map((tier) => {
                const isCustomMixed = tier.id === 'custom-mixed';
                const isRecommended = tier.popular;

                const handleCardClick = () => {
                  if (tier.stripeLink) {
                    window.open(tier.stripeLink, '_blank', 'noopener,noreferrer');
                  } else if (tier.isQuoteTrigger) {
                    setQuoteModalOpen(true);
                  } else {
                    window.open("https://wa.me/447348733365?text=Hi%20Dean,%20I'd%20like%20to%20discuss%20a%20custom%20trade%20portal.", '_blank', 'noopener,noreferrer');
                  }
                };

                return (
                  <div
                    key={tier.id}
                    className={`bg-white dark:bg-[#0A0D14] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                      isRecommended
                        ? 'border-2 border-[#D90429] shadow-xl dark:shadow-2xl'
                        : 'border border-slate-200 dark:border-white/[0.08] shadow-lg'
                    }`}
                  >
                    {isRecommended && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#D90429] text-white font-mono text-[11px] font-bold uppercase tracking-wider shadow-md">
                        {tier.badge}
                      </div>
                    )}

                    <div>
                      {/* Badge for non-recommended cards */}
                      {!isRecommended && (
                        <span className={`inline-block self-start px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase font-mono border mb-4 ${tier.badgeColor}`}>
                          {tier.badge}
                        </span>
                      )}

                      <h3 className={`text-xl sm:text-2xl font-extrabold mb-2 tracking-tight text-slate-900 dark:text-white ${isRecommended ? 'mt-2' : ''}`}>
                        {tier.title}
                      </h3>
                      <p className="text-xs sm:text-sm mb-6 text-slate-500 dark:text-zinc-400">
                        {tier.subtitle}
                      </p>

                      {/* Price */}
                      <div className="mb-6">
                        <div className={`text-3xl sm:text-4xl font-black tracking-tight ${tier.popular ? 'text-[#D90429] dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                          {tier.pricingNote}
                        </div>
                        {tier.pricingSubtextBadge ? (
                          <div className="mt-2 inline-block px-2.5 py-1.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-mono text-[10px] sm:text-[11px] font-bold leading-tight">
                            {tier.pricingSubtextBadge}
                          </div>
                        ) : (
                          <div className="text-[11px] mt-1 font-mono text-slate-500 dark:text-zinc-400">
                            {tier.pricingSubtext}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                        {tier.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{bullet.full}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button
                      type="button"
                      onClick={handleCardClick}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 mt-4 ${
                        isCustomMixed
                          ? 'bg-[#25D366] text-black hover:bg-[#20ba5a] shadow-lg shadow-[#25D366]/20'
                          : isRecommended
                          ? 'bg-[#D90429] hover:bg-[#b80322] text-white shadow-lg shadow-red-600/20'
                          : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 shadow-md'
                      }`}
                    >
                      {isCustomMixed && <MessageSquare className="w-4 h-4 fill-current" />}
                      <span>{tier.ctaText}</span>
                      {!isCustomMixed && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                );
              })}
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

      {/* Global Modals & Floating Tools */}
      <QuoteForm 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        onOpenWhatsApp={() => setWhatsappModalOpen(true)} 
      />
      <WhatsAppModal 
        isOpen={whatsappModalOpen} 
        onClose={() => setWhatsappModalOpen(false)} 
      />
      <StitchBot 
        isOpen={stitchModalOpen} 
        onClose={() => setStitchModalOpen(false)} 
        onOpenQuote={() => setQuoteModalOpen(true)} 
        onOpenWhatsApp={() => setWhatsappModalOpen(true)} 
      />

      {/* Floating Ask AI Button - Bottom Right */}
      {!stitchModalOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
          <button 
            type="button"
            onClick={() => setStitchModalOpen(true)}
            className="bg-[#191c1e] hover:bg-[#2a2f32] text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 border border-white/10 relative pointer-events-auto cursor-pointer"
            aria-label="Ask AI"
          >
            <svg className="w-5 h-5 text-[#D90429]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (<768px) */}
      <BottomTabBar />

    </div>
  );
};

