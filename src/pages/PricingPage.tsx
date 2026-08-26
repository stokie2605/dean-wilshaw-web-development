import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomTabBar } from '../components/BottomTabBar';
import { Footer } from '../components/Footer';
import { QuoteForm } from '../components/QuoteForm';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { StitchBot } from '../components/StitchBot';
import { 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  Gauge, 
  FileText, 
  Zap, 
  Sparkles, 
  Code2, 
  Lock,
  Phone,
  Maximize2,
  X
} from 'lucide-react';

const AUDIT_WHATSAPP_URL = "https://wa.me/447348733365?text=Hi%20Dean,%20I'd%20like%20a%20%C2%A349%20website%20speed%20audit";

const PORTFOLIO_ENGINES = [
  {
    id: 'engine-01',
    engineLabel: 'Engine 01',
    title: 'Emergency & Domestic Trades',
    description: 'High-contrast, urgency-driven layout built for fast conversions. Features sticky tap-to-call bars and automated missed-call text triggers.',
    tags: ['Tap-To-Call Bar', 'Auto-Text Follow-Up', 'Sub-0.4s Speed'],
    accentColor: '#2563EB',
    image: '/mockups/rapidtrade-emergency.png',
  },
  {
    id: 'engine-02',
    engineLabel: 'Engine 02',
    title: 'Heavy Commercial & Industrial',
    description: 'Structured, credibility-heavy framework designed for high-ticket contracts. Emphasizes accreditations, case studies, and corporate compliance.',
    tags: ['Accreditation Badges', 'Case Study Grids', 'PDF Spec Sheets'],
    accentColor: '#EA580C',
    image: '/mockups/infra-engine-commercial.png',
  },
  {
    id: 'engine-03',
    engineLabel: 'Engine 03',
    title: 'Bespoke Craft & Architectural',
    description: 'Minimalist, visual-first presentation focused on premium craftsmanship. Full-bleed gallery layouts with subtle motion to command higher margins.',
    tags: ['Full-Bleed Galleries', 'Before / After Sliders', 'Editorial Layout'],
    accentColor: '#10B981',
    image: '/mockups/bespoke-craft.png',
  }
];

const PRICING_TIERS = [
  {
    id: 'standalone-tools',
    title: 'Standalone Lead Tools',
    subtitle: 'Add an interactive phone or quote generator to your existing site.',
    pricingNote: 'From £149 per tool',
    badge: 'Fast Plug & Play',
    badgeColor: 'bg-emerald-950/50 text-emerald-400 border-emerald-800/50',
    bullets: [
      { full: 'Instant Missed-Call Auto-Text & SMS dispatchers', short: 'Missed-Call Auto-Text' },
      { full: 'Interactive Quote Calculators & price guide widgets', short: 'Instant Quote Calculator' },
      { full: 'Urgency qualification & upfront deposit booking portals', short: 'Deposit & Booking Portal' },
      { full: 'Sticky WhatsApp mobile bars & live 5-star trust indicators', short: 'WhatsApp Bar & Trust Indicators' },
      { full: '100% Client Source Code Ownership with zero recurring tool subscriptions', short: 'Zero monthly subscriptions' },
      { full: 'Plugs seamlessly into Wix, WordPress, Squarespace, or custom HTML', short: 'Plugs into any website' },
    ],
    ctaText: 'Instant Purchase (£149)',
    stripeLink: 'https://buy.stripe.com/28E28r8zO6r23Bw6wPaAw00',
  },
  {
    id: 'website-builds',
    title: 'Full Website Build',
    subtitle: 'A complete, blazing-fast single-page web engine engineered for calls.',
    pricingNote: 'From £299',
    popular: true,
    badge: 'Most Popular for Trades',
    badgeColor: 'bg-red-500/10 text-[#D90429] border-red-500/30',
    bullets: [
      { full: 'Mobile-first layout engineered specifically for UK trade enquiries', short: 'Mobile-first trade layout' },
      { full: 'Sub-1.5s load speeds (hand-coded React + Vite, zero clunky WordPress bloat)', short: 'Sub-1.5s load speeds' },
      { full: 'Complete service breakdown, customer review showcase, and local SEO structure', short: 'Local SEO & reviews setup' },
      { full: 'Includes 1 integrated lead tool of your choice (Quote Calculator or WhatsApp bar)', short: '1 Free Lead Tool Included' },
      { full: 'Optional £49/month site care retainer (hosting, SSL, security, backups, ongoing tweaks)', short: 'Optional £49/mo care' },
      { full: 'You own 100% of your source code and domain outright from day one', short: '100% Code Ownership' },
    ],
    ctaText: 'Get a Website Quote',
    isQuoteTrigger: true,
  },
  {
    id: 'custom-dev',
    title: 'Custom Trade Portals',
    subtitle: 'For multi-van outfits, bespoke booking systems, and commercial contractors.',
    pricingNote: 'From £449 to £599 / Custom Quote',
    badge: 'Bespoke Architecture',
    badgeColor: 'bg-emerald-950/50 text-emerald-400 border-emerald-800/50',
    bullets: [
      { full: 'Multi-page custom systems with bespoke customer triage flows', short: 'Multi-page trade portals' },
      { full: 'Direct payment & CRM integrations (Stripe, ServiceM8, Tradify, Zapier)', short: 'Stripe & CRM integration' },
      { full: '24/7 AI Emergency Trade Dispatcher with live WhatsApp hand-off alerts', short: '24/7 AI Dispatcher' },
      { full: 'Direct 1-on-1 development with Dean (zero agency overhead, zero junior devs)', short: 'Direct 1-on-1 with Dean' },
    ],
    ctaText: 'Discuss Custom Scope',
    isWhatsAppTrigger: true,
  },
];

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [stitchModalOpen, setStitchModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#040507] text-slate-900 dark:text-white selection:bg-red-500/30 transition-colors duration-300 overflow-x-hidden">
      
      {/* Navigation */}
      <Header onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-24 sm:pt-28 pb-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* 1. SECTION: 3 PORTFOLIO CONCEPTS */}
          <div>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 text-xs font-semibold uppercase tracking-wide font-mono">
                Portfolio Examples
              </div>
              <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">
                Three Proven Trade Layout Archetypes
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400">
                Engineered specifically for UK trades. Hand-coded for sub-second mobile speed with zero bloated templates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PORTFOLIO_ENGINES.map((engine, idx) => (
                <div
                  key={engine.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xl hover:border-[#D90429] dark:hover:border-[#D90429] transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Mock Browser Frame */}
                    <div className="bg-slate-100 dark:bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.08]">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 truncate">
                        {engine.engineLabel.toLowerCase()}.trade
                      </span>
                    </div>

                    <div className="relative h-48 sm:h-56 overflow-hidden bg-black/40">
                      <img
                        src={engine.image}
                        alt={`${engine.title} preview`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[#D90429]">{engine.engineLabel}</span>
                        <span className="text-zinc-500 uppercase">Hand-Coded</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {engine.title}
                      </h3>
                      <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        {engine.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex flex-wrap gap-1.5">
                    {engine.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. SECTION: £49 MOBILE SPEED & LEAD HEALTH CHECK BANNER */}
          <div className="bg-white dark:bg-[#0A0D14] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              
              {/* Left Column: Offer Details */}
              <div className="space-y-4 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 text-xs font-semibold uppercase tracking-wide font-mono">
                  <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                  Low-Risk Entry Offer
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  £49 Mobile Speed &amp; Lead Health Check
                </h2>

                <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                  Wondering why your current site isn't generating calls? I will audit your live mobile speeds, analyze friction points, and deliver a personalized 3-minute video breakdown with 3 actionable fixes within 24 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-medium text-slate-700 dark:text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Real mobile speed benchmarks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Personalized video walk-through</span>
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
                    24h Turnaround
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                    £49
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                    One-off payment • Zero obligation
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

          {/* 3. SECTION: 3 PRICING TIERS */}
          <div>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 text-xs font-semibold uppercase tracking-wide font-mono">
                Transparent Pricing
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight text-slate-900 dark:text-white">
                Simple, Honest Trade Pricing
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400">
                No hidden fees, no agency markups, and zero vendor lock-in. You own 100% of your source code outright.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    tier.popular
                      ? 'bg-white dark:bg-[#0A0D14] border-2 border-[#D90429] shadow-2xl relative shadow-red-600/10'
                      : 'bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] shadow-xl'
                  }`}
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase font-mono border ${tier.badgeColor}`}>
                        {tier.badge}
                      </span>
                      {tier.popular && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D90429] font-mono">
                          ★ Recommended
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                      {tier.title}
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm mb-6 min-h-[40px]">
                      {tier.subtitle}
                    </p>

                    {/* Price Tag */}
                    <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/[0.08]">
                      <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        {tier.pricingNote}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5 font-mono">
                        100% Client Code Ownership
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {tier.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{bullet.full}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {tier.stripeLink ? (
                      <a
                        href={tier.stripeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 rounded-xl bg-[#D90429] hover:bg-[#b80322] text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                      >
                        <span>{tier.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    ) : tier.isQuoteTrigger ? (
                      <button
                        onClick={() => setQuoteModalOpen(true)}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#D90429] hover:bg-[#b80322] text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                      >
                        <span>{tier.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <a
                        href="https://wa.me/447348733365?text=Hi%20Dean,%20I'd%20like%20to%20discuss%20a%20custom%20trade%20portal."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-black font-semibold hover:bg-[#20ba5a] text-xs sm:text-sm transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>{tier.ctaText}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. SECTION: DIRECT WHATSAPP CONTACT STRIP */}
          <div className="bg-[#0A0D14] border border-white/[0.08] rounded-2xl p-8 text-center max-w-3xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Have questions or want a bespoke quote?
            </h3>
            <p className="text-sm text-zinc-400">
              Message Dean directly on WhatsApp. I reply personally within a few hours to talk through your project.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/447348733365?text=Hi%20Dean,%20I%20have%20a%20question%20about%20your%20web%20packages."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-[#25D366] text-black font-semibold hover:bg-[#20ba5a] text-sm transition-all shadow-md flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                Message 07348 733365
              </a>
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#D90429] hover:bg-[#b80322] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
              >
                <span>Request Formal Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-400 p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={PORTFOLIO_ENGINES[lightboxIndex].image}
              alt={PORTFOLIO_ENGINES[lightboxIndex].title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl border border-white/[0.08]"
            />
          </div>
        </div>
      )}

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
            onClick={() => setStitchModalOpen(true)}
            className="bg-[#191c1e] hover:bg-[#2a2f32] text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 border border-white/10 relative pointer-events-auto"
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
