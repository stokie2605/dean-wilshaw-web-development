import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
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
  ExternalLink,
  Layers,
  Sparkles
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
      fullTabLabel: '01 Quote Calculator',
      shortTabLabel: '01 Quote',
      title: 'Instant Quote Calculator',
      subtitle: 'Tactile range slider and project scale estimator with real-time illuminated price guidance.',
      demoRoute: '/demo/quote-calculator',
      icon: Smartphone,
      component: <QuoteEstimator />,
    },
    {
      id: 'deposit-portal',
      fullTabLabel: '02 Deposit Portal',
      shortTabLabel: '02 Deposit',
      title: 'Deposit & Booking Portal',
      subtitle: 'Connected 3-step pipeline qualifying urgency, locking arrival windows, and holding priority deposits.',
      demoRoute: '/demo/booking-form',
      icon: Zap,
      component: <IntakeDeposit />,
    },
    {
      id: 'whatsapp-bar',
      fullTabLabel: '03 WhatsApp Bar',
      shortTabLabel: '03 WhatsApp',
      title: 'Mobile WhatsApp Fast Bar',
      subtitle: 'Floating Dynamic Island widget with 1-tap job photo snap and instant chat handoff.',
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
      fullTabLabel: '04 Trust Badges',
      shortTabLabel: '04 Trust',
      title: 'Live Trust Indicators',
      subtitle: 'Real-time verified metric strip with pulsing status badges and multi-trade perspective switching.',
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

  // Touch Swipe Handler (prevents vertical scroll conflict via touch-pan-y)
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 40;
    const velocityThreshold = 300;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      goToNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      goToPrev();
    }
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
          <div className="max-w-3xl mx-auto text-center mb-14">
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

          {/* 1. TOP SHOWCASE: 24/7 AI Trade Dispatcher (Open Engineering Canvas) */}
          <div className="mb-16 border-t border-b border-slate-200 dark:border-white/[0.08] py-8 sm:py-12 relative">
            <div className="space-y-8">
              
              {/* Header & Sub-copy */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase mb-2">
                    <Bot className="w-3.5 h-3.5" />
                    24/7 Emergency Triage &amp; Dispatch
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    24/7 AI Trade Dispatcher
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-1 font-medium max-w-2xl">
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
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                        selectedScenario === key
                          ? 'bg-[#D90429] text-white font-bold shadow-sm'
                          : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-zinc-400 dark:hover:text-white font-medium'
                      }`}
                    >
                      {scenarios[key].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1-Click Interactive Triage Simulator (Architectural Divider Grid) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Simulator Chat Window */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
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
                    <div className="space-y-3 pt-2">
                      {current.chat.map((msg, i) => (
                        <motion.div
                          key={`${selectedScenario}-${i}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: i * 0.05 }}
                          className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                              msg.sender === 'customer'
                                ? 'bg-[#D90429] text-white rounded-br-none shadow-sm'
                                : 'bg-white dark:bg-[#0A0D14] text-slate-900 dark:text-zinc-200 border border-slate-200 dark:border-white/[0.08] rounded-bl-none shadow-sm'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5 font-mono">
                      <Bot className="w-3.5 h-3.5 text-[#D90429]" />
                      Mock Simulation Sandbox (Local State)
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold uppercase">● Instant AI Triage Active</span>
                  </div>
                </div>

                {/* Live WhatsApp Alert Payload Output */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      WhatsApp Dispatch Generated
                    </div>

                    <div className="p-4 bg-black/80 rounded-xl border border-emerald-500/20 text-emerald-300 font-mono text-xs whitespace-pre-line leading-relaxed">
                      {current.whatsappSummary}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-400 font-semibold font-mono">
                    <span>Ready for 1-Tap Reply</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Instant Alert</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* 2. OPEN ARCHITECTURAL SHOWCASE STAGE (4-TOOL INTERACTIVE SUITE) */}
          <div className="mb-20">
            
            {/* Stage Container with Open Hairline Grid */}
            <div className="relative w-full max-w-4xl mx-auto bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl overflow-hidden min-h-[520px] md:min-h-[560px] flex flex-col justify-between group">
              
              {/* Subtle Border Beam Accent */}
              <BorderBeam size={340} duration={12} colorFrom="#D90429" colorTo="#25D366" />

              {/* Top Controls: 4 Pill Tabs (Scrollable single row on mobile) */}
              <div className="relative z-10 mb-6 md:mb-8">
                <div className="flex overflow-x-auto whitespace-nowrap gap-2 hide-scrollbar py-1 px-1 justify-start md:justify-center w-full">
                  {STAGE_TOOLS.map((tool, idx) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => selectTool(idx)}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold font-mono tracking-tight shrink-0 transition-all duration-200 ${
                        activeToolIndex === idx
                          ? 'bg-[#D90429] text-white shadow-md shadow-red-600/30'
                          : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-zinc-400 dark:hover:text-white'
                      }`}
                    >
                      <span className="md:hidden">{tool.shortTabLabel}</span>
                      <span className="hidden md:inline">{tool.fullTabLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Floating Side Arrow Chevrons (>= 768px only) */}
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous Tool (Left Arrow)"
                className="hidden md:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-zinc-200 hover:text-[#D90429] dark:hover:text-[#D90429] hover:scale-110 items-center justify-center shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next Tool (Right Arrow)"
                className="hidden md:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-zinc-200 hover:text-[#D90429] dark:hover:text-[#D90429] hover:scale-110 items-center justify-center shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Cinematic Animated Slide Body with Touch Drag/Swipe */}
              <div className="relative z-10 my-auto px-1 sm:px-4 md:px-10 py-2 sm:py-4 touch-pan-y">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeToolIndex}
                    custom={direction}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
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
                    className="w-full flex flex-col justify-between space-y-6 cursor-grab active:cursor-grabbing"
                  >
                    {/* Tool Title & Description Header */}
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black flex items-center justify-center gap-2 text-slate-900 dark:text-white tracking-tight">
                        <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#D90429]" />
                        <span>{activeTool.title}</span>
                      </h3>
                      <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed px-2">
                        {activeTool.subtitle}
                      </p>
                    </div>

                    {/* Interactive Component Stage (Open architectural display) */}
                    <div className="w-full max-w-xl mx-auto pt-2">
                      {activeTool.component}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Docked Bottom Controls & Action Bar */}
              <div className="relative z-10 pt-4 md:pt-6 mt-4 md:mt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-4">
                
                {/* Mobile Navigation Row (< 768px) */}
                <div className="flex md:hidden items-center justify-between w-full">
                  <button
                    type="button"
                    onClick={goToPrev}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.06] text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1 border border-zinc-200 dark:border-white/[0.08]"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Prev
                  </button>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5">
                    {STAGE_TOOLS.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => selectTool(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeToolIndex === idx
                            ? 'w-6 bg-[#D90429]'
                            : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={goToNext}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.06] text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1 border border-zinc-200 dark:border-white/[0.08]"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Row: Step Counter + Standalone Launch CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                  <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-[#D90429] animate-pulse"></span>
                    <span>Active Tool: Step {activeToolIndex + 1} of {STAGE_TOOLS.length}</span>
                    <span className="text-slate-400 dark:text-zinc-600">• Use [←] [→] arrow keys or swipe</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(activeTool.demoRoute)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-[#D90429] hover:text-white dark:hover:bg-[#D90429] text-slate-900 dark:text-white text-xs font-bold font-mono transition-all border border-slate-200 dark:border-white/[0.08] shadow-sm group/btn"
                  >
                    <span>Launch Standalone Demo</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

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
