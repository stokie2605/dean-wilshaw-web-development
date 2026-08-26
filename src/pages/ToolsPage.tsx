import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { BottomTabBar } from '../components/BottomTabBar';
import { Footer } from '../components/Footer';
import { WhatsAppBar } from '../components/trade-tools/WhatsAppBar';
import { SocialProofBanner } from '../components/trade-tools/SocialProofBanner';
import { IntakeDeposit } from '../components/trade-tools/IntakeDeposit';
import { QuoteEstimator } from '../components/tools/QuoteEstimator';
import { QuoteForm } from '../components/QuoteForm';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { StitchBot } from '../components/StitchBot';
import { BorderBeam } from '../components/ui/BorderBeam';
import { 
  Target, 
  Zap, 
  Smartphone, 
  MessageSquare, 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  Wrench,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const ToolsPage: React.FC = () => {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [stitchModalOpen, setStitchModalOpen] = useState(false);

  // AI Dispatcher Interactive Simulator State (Local state only)
  const [selectedScenario, setSelectedScenario] = useState<'boiler' | 'roof' | 'electrical'>('boiler');

  // Slider Stage State
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const scenarios = {
    boiler: {
      label: '🔥 Boiler Panic',
      trade: 'Heating & Gas Specialist',
      urgency: 'CRITICAL EMERGENCY',
      urgencyBadge: 'bg-red-500/10 text-[#D90429] border-red-500/30',
      chat: [
        { sender: 'customer', text: 'Our boiler just locked out with error code F28. No heating or hot water!' },
        { sender: 'bot', text: 'Sorry to hear that! Is your condensate pipe frozen, or are you smelling gas?' },
        { sender: 'customer', text: 'No gas smell, but it is freezing outside.' },
        { sender: 'bot', text: 'Diagnosing frozen pipe fault. Immediate dispatch request sent to Dean.' }
      ],
      whatsappSummary: `EMERGENCY DISPATCH SUMMARY\n- Issue: Boiler Lockout (F28 Error)\n- Urgency: High (Freezing temps)\n- Location: Postcode ST7 (Cheshire)\n- Status: Ready for 1-tap quote reply`
    },
    roof: {
      label: '🌧️ Storm Leak',
      trade: 'Roofing & Storm Specialist',
      urgency: 'SAME-DAY DISPATCH',
      urgencyBadge: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
      chat: [
        { sender: 'customer', text: 'Water is dripping through our bedroom ceiling after the storm.' },
        { sender: 'bot', text: 'Please place a bucket underneath. Is water near any lights or electricals?' },
        { sender: 'customer', text: 'No, just in the corner of the ceiling.' },
        { sender: 'bot', text: 'Got it. Requesting immediate roof triage. Engineer dispatching priority slot.' }
      ],
      whatsappSummary: `STORM DAMAGE LEAK DISPATCH\n- Issue: Bedroom ceiling leak (tile slip)\n- Urgency: High (Active Rain)\n- Location: Postcode CW1 (Crewe)\n- Status: Ready for 1-tap quote reply`
    },
    electrical: {
      label: '⚡ Fuse Board',
      trade: 'Approved Electrical Specialist',
      urgency: 'HIGH-TICKET QUALIFIED',
      urgencyBadge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      chat: [
        { sender: 'customer', text: 'Our main RCD tripped and the sockets on ground floor have no power.' },
        { sender: 'bot', text: 'Have you unplugged major appliances? How old is your current fuse board?' },
        { sender: 'customer', text: 'Unplugged kettle, still tripping. It is an old 1990s fuse board.' },
        { sender: 'bot', text: 'Tripping fault diagnosed. Logging consumer unit test & dispatching electrician.' }
      ],
      whatsappSummary: `QUALIFIED ELECTRICAL DISPATCH\n- Issue: Ground floor RCD fault (Old board)\n- Urgency: Same-Day Fault Finding\n- Scope: Diagnostic + Board Upgrade Quote\n- Status: Ready to confirm slot`
    }
  };

  const current = scenarios[selectedScenario];

  const STAGE_TOOLS = [
    {
      id: 'quote-calc',
      tabLabel: '01 Quote Calculator',
      title: 'Instant Quote Calculator',
      subtitle: 'Customers want a quick price guide before they commit to a call. This interactive estimator calculates an instant estimate for common jobs and captures their phone number in the process.',
      demoRoute: '/demo/quote-calculator',
      icon: Smartphone,
      component: <QuoteEstimator />,
    },
    {
      id: 'deposit-portal',
      tabLabel: '02 Deposit Portal',
      title: 'Deposit & Booking Portal',
      subtitle: 'Stop wasting hours on tyre-kickers. Checks job urgency and secures an upfront commitment before you confirm a calendar slot.',
      demoRoute: '/demo/booking-form',
      icon: Zap,
      component: <IntakeDeposit />,
    },
    {
      id: 'whatsapp-bar',
      tabLabel: '03 WhatsApp Bar',
      title: 'Mobile WhatsApp Fast Bar',
      subtitle: 'Typing long emails on a phone keyboard is annoying. Sticky WhatsApp bars let customers snap a job photo and message you in one tap.',
      demoRoute: '/demo/whatsapp-bar',
      icon: MessageSquare,
      component: (
        <div className="w-full">
          <WhatsAppBar />
        </div>
      ),
    },
    {
      id: 'trust-badges',
      tabLabel: '04 Trust Badges',
      title: 'Live Trust Indicators',
      subtitle: "If people don't trust you, they won't contact you. This dynamic banner sits at the very top of your site, instantly proving you are local, insured, and 5-star rated.",
      demoRoute: '/demo/trust-bar',
      icon: Target,
      component: <SocialProofBanner />,
    },
  ];

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveToolIndex((prev) => (prev + 1) % STAGE_TOOLS.length);
  }, [STAGE_TOOLS.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setActiveToolIndex((prev) => (prev - 1 + STAGE_TOOLS.length) % STAGE_TOOLS.length);
  }, [STAGE_TOOLS.length]);

  const selectTool = (index: number) => {
    setDirection(index > activeToolIndex ? 1 : -1);
    setActiveToolIndex(index);
  };

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const activeTool = STAGE_TOOLS[activeToolIndex];
  const ActiveIcon = activeTool.icon;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#040507] text-slate-900 dark:text-white selection:bg-red-500/30 transition-colors duration-300 overflow-x-hidden">
      
      {/* Top Navigation */}
      <Header onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-24 sm:pt-28 pb-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Showroom Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase">
              Interactive Sandbox
            </div>
            <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">
              Interactive Lead Tools Built for UK Trades
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400">
              Test the live simulators below to see how my standalone widgets capture high-value jobs from casual mobile traffic.
            </p>
          </div>

          {/* 1. TOP FULL-WIDTH SHOWCASE: 24/7 AI Trade Dispatcher */}
          <div className="mb-16">
            <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-6 relative overflow-hidden group">
              
              {/* Animated Border Beam */}
              <BorderBeam size={350} duration={14} colorFrom="#D90429" colorTo="#25D366" />

              {/* Header & Sub-copy */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/[0.08] pb-6 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase mb-2">
                    <Bot className="w-3.5 h-3.5" />
                    24/7 Emergency Triage &amp; Dispatch
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    24/7 AI Trade Dispatcher
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-1 font-medium">
                    Your website working as a full-time receptionist 24/7: qualifying emergencies, filtering out tyre-kickers, and capturing bookings while you sleep.
                  </p>
                </div>

                {/* 3 Preset Scenario Triggers */}
                <div className="flex flex-wrap items-center gap-2">
                  {(['boiler', 'roof', 'electrical'] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedScenario(key)}
                      className={`px-3.5 py-1.5 rounded-full text-xs transition-all ${
                        selectedScenario === key
                          ? 'bg-[#D90429] text-white font-medium shadow-sm'
                          : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900/80 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium'
                      }`}
                    >
                      {scenarios[key].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1-Click Interactive Triage Simulator */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
                
                {/* Simulator Chat Window */}
                <div className="lg:col-span-7 bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between shadow-inner">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08] text-xs">
                      <div className="flex items-center gap-2 font-mono text-slate-600 dark:text-zinc-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>{current.trade}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border font-mono ${current.urgencyBadge}`}>
                        {current.urgency}
                      </span>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-2.5 pt-2">
                      {current.chat.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] px-3.5 py-2 rounded-xl text-xs leading-relaxed ${
                              msg.sender === 'customer'
                                ? 'bg-[#D90429] text-white rounded-br-none shadow-sm'
                                : 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-200 border border-slate-200 dark:border-white/[0.08] rounded-bl-none shadow-sm'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-[#D90429]" />
                      Mock Simulation Sandbox (Local State)
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold uppercase">● Instant AI Triage Active</span>
                  </div>
                </div>

                {/* Live WhatsApp Alert Payload Output */}
                <div className="lg:col-span-5 bg-emerald-950/30 dark:bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      WhatsApp Dispatch Generated
                    </div>

                    <div className="p-3.5 bg-black/60 rounded-xl border border-emerald-500/30 text-emerald-300 font-mono text-xs whitespace-pre-line leading-relaxed">
                      {current.whatsappSummary}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-400 font-semibold font-mono">
                    <span>Ready for 1-Tap Reply</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Instant Alert</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* 2. HIGH-TECH INTERACTIVE SLIDER STAGE */}
          <div className="mb-16">
            
            {/* Stage Container */}
            <div className="relative max-w-4xl mx-auto bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden min-h-[560px] flex flex-col justify-between group">
              
              {/* Subtle Border Beam Around Showcase Stage */}
              <BorderBeam size={320} duration={12} colorFrom="#D90429" colorTo="#25D366" />

              {/* Top Controls: 4 Pill Tabs */}
              <div className="relative z-10 mb-8">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {STAGE_TOOLS.map((tool, idx) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => selectTool(idx)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold font-mono tracking-tight transition-all duration-200 ${
                        activeToolIndex === idx
                          ? 'bg-[#D90429] text-white shadow-md shadow-red-600/30'
                          : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-zinc-400 dark:hover:text-white'
                      }`}
                    >
                      {tool.tabLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Side Arrow Chevrons */}
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous Tool (Left Arrow)"
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-zinc-200 hover:text-[#D90429] dark:hover:text-[#D90429] hover:scale-110 flex items-center justify-center shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next Tool (Right Arrow)"
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-zinc-200 hover:text-[#D90429] dark:hover:text-[#D90429] hover:scale-110 flex items-center justify-center shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Cinematic Animated Slide Body */}
              <div className="relative z-10 my-auto px-4 md:px-12 py-4">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeToolIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 40 : -40, filter: 'blur(4px)' }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      filter: 'blur(0px)', 
                      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: direction > 0 ? -40 : 40, 
                      filter: 'blur(4px)', 
                      transition: { duration: 0.25 } 
                    }}
                    className="w-full flex flex-col justify-between space-y-6"
                  >
                    {/* Tool Title & Description Header */}
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-black flex items-center justify-center gap-2 text-slate-900 dark:text-white tracking-tight">
                        <ActiveIcon className="w-6 h-6 text-[#D90429]" />
                        <span>{activeTool.title}</span>
                      </h3>
                      <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        {activeTool.subtitle}
                      </p>
                    </div>

                    {/* Interactive Component Stage Box */}
                    <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/[0.08] flex items-center justify-center shadow-inner max-w-xl mx-auto w-full">
                      {activeTool.component}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Docked Bottom Action Bar */}
              <div className="relative z-10 pt-6 mt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-[#D90429] animate-pulse"></span>
                  <span>Active Tool: Step {activeToolIndex + 1} of {STAGE_TOOLS.length}</span>
                  <span className="hidden sm:inline text-slate-400 dark:text-zinc-600">• Use [←] [→] arrow keys</span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(activeTool.demoRoute)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-[#D90429] hover:text-white dark:hover:bg-[#D90429] text-slate-900 dark:text-white text-xs font-bold font-mono transition-all border border-slate-200 dark:border-white/[0.08] shadow-sm group/btn"
                >
                  <span>Launch Standalone Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>

          </div>

          {/* 3. BOTTOM CALL TO ACTION BANNER */}
          <div className="bg-[#0A0D14] border border-white/[0.08] rounded-2xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase mb-4">
              <Wrench className="w-3.5 h-3.5" />
              Standalone Add-on Plugins
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Want any of these tools wired into your current website?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Available as standalone plug-ins from £149. Plugs directly into Wix, WordPress, Squarespace, or custom builds with zero site redesign required.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/447348733365?text=Hi%20Dean,%20I'm%20interested%20in%20installing%20one%20of%20your%20interactive%20lead%20tools"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#25D366] text-black font-semibold hover:bg-[#20ba5a] text-sm transition-all shadow-lg shadow-[#25D366]/20 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                WhatsApp Dean to Install
              </a>

              <Link
                to="/pricing"
                className="px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-white/[0.06] border border-slate-700 dark:border-white/[0.1] text-white hover:bg-slate-800 dark:hover:bg-white/[0.1] font-bold text-sm transition-all shadow-md flex items-center gap-2"
              >
                <span>View Pricing &amp; Audits</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
            <svg className="w-5 h-5 text-[#D90429]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (<768px) */}
      <BottomTabBar />

    </div>
  );
};
