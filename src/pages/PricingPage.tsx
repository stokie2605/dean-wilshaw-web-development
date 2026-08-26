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
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  Gauge, 
  FileText, 
  Zap, 
  Sparkles, 
  Code2, 
  Lock,
  Phone
} from 'lucide-react';

const AUDIT_WHATSAPP_URL = "https://wa.me/447348733365?text=Hi%20Dean,%20I'd%20like%20a%20%C2%A349%20website%20speed%20audit";

const PRICING_TIERS = [
  {
    id: 'standalone-tools',
    title: 'Standalone Lead Tools',
    subtitle: 'Add an interactive phone or quote generator to your existing site.',
    pricingNote: 'From £149 per tool',
    badge: 'Fast Plug & Play',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
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
    badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
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
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white selection:bg-red-500/30 transition-colors duration-300 overflow-x-hidden">
      
      {/* Navigation */}
      <Header onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-24 sm:pt-28 pb-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase">
              Transparent Pricing
            </div>
            <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">
              Simple, Honest Trade Pricing
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400">
              No hidden fees, no agency markups, and zero vendor lock-in. You own 100% of your source code outright.
            </p>
          </div>

          {/* Low-Risk Entry Offer: £49 Mobile Speed & Lead Health Check Banner */}
          <div className="mb-16 bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-[#131B2A] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              
              {/* Left Column: Offer Details */}
              <div className="space-y-4 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-600/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Gauge className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Low-Risk Entry Offer
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  £49 Mobile Speed &amp; Lead Health Check
                </h2>

                <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                  Wondering why your site isn't generating calls? I will audit your live mobile page speeds, analyze mobile friction points, and deliver a personalized 3-minute video breakdown with 3 actionable fixes within 24 hours.
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
                    <span>Credited towards build if you hire me</span>
                  </div>
                </div>
              </div>

              {/* Right Column: CTA */}
              <div className="flex flex-col items-center lg:items-end justify-center shrink-0 w-full lg:w-auto space-y-3">
                <div className="text-center lg:text-right">
                  <div className="text-xs text-slate-500 dark:text-zinc-400 uppercase font-bold tracking-wider">One-Off Price</div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">£49</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">24-Hour Turnaround</div>
                </div>

                <a
                  href={AUDIT_WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Book £49 Audit on WhatsApp
                </a>
              </div>

            </div>
          </div>

          {/* 3 Clear Price Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 border ${
                  tier.popular
                    ? 'bg-white dark:bg-zinc-900 border-red-500 shadow-xl shadow-red-500/10 relative'
                    : 'bg-white dark:bg-zinc-900/60 border-slate-200 dark:border-zinc-800 shadow-sm hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {tier.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 mb-4 min-h-[32px]">
                    {tier.subtitle}
                  </p>

                  <div className="pb-5 mb-5 border-b border-slate-100 dark:border-zinc-800">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      {tier.pricingNote}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-zinc-300">
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
                  ) : tier.ctaLink ? (
                    <Link
                      to={tier.ctaLink}
                      className="w-full py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-900 dark:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
                      className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>{tier.ctaText}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Direct WhatsApp Quick Contact Strip */}
          <div className="bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 text-center max-w-3xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Have questions or want a bespoke quote?
            </h3>
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Message Dean directly on WhatsApp. I reply personally within a few hours to talk through your project.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/447348733365?text=Hi%20Dean,%20I%20have%20a%20question%20about%20your%20web%20packages."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                Message 07348 733365
              </a>
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
              >
                <span>Request Formal Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
            onClick={() => setStitchModalOpen(true)}
            className="bg-[#191c1e] hover:bg-[#2a2f32] text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 border border-white/10 relative pointer-events-auto"
            aria-label="Ask AI"
          >
            <svg className="w-5 h-5 text-[#dc2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <BottomTabBar />

    </div>
  );
};
