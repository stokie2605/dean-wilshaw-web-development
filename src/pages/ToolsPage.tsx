import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Header } from '../components/Header';
import { BottomTabBar } from '../components/BottomTabBar';
import { Footer } from '../components/Footer';
import { WhatsAppBar } from '../components/trade-tools/WhatsAppBar';
import { IntakeDeposit } from '../components/trade-tools/IntakeDeposit';
import { QuoteEstimator } from '../components/tools/QuoteEstimator';
import { VoiceToQuoteDemo } from '../components/tools/VoiceToQuoteDemo';
import { QuoteForm } from '../components/QuoteForm';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { StitchBot } from '../components/StitchBot';
import { BorderBeam } from '../components/ui/BorderBeam';
import { 
  Zap, 
  Smartphone, 
  MessageSquare, 
  ArrowRight, 
  Wrench,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  PhoneMissed
} from 'lucide-react';

const STAGE_TOOLS = [
  {
    id: 'quote-calc',
    fullTabLabel: '01 Cost Estimator',
    shortTabLabel: '01 Estimator',
    title: 'Interactive Cost Estimator (Dynamic Slider)',
    subtitle: 'Visual self serve price estimator for standard jobs.',
    demoRoute: '/demo/quote-calculator',
    icon: Smartphone,
    component: <QuoteEstimator />,
  },
  {
    id: 'deposit-portal',
    fullTabLabel: '02 Web Triage',
    shortTabLabel: '02 Triage',
    title: '24 hour Emergency Web Triage (Smart Intake Form)',
    subtitle: 'Emergency intake capturing urgency level, property type, and dispatch location.',
    demoRoute: '/demo/booking-form',
    icon: Zap,
    component: <IntakeDeposit />,
  },
  {
    id: 'whatsapp-bar',
    fullTabLabel: '03 WhatsApp Bar',
    shortTabLabel: '03 WhatsApp',
    title: 'Direct Trade WhatsApp Bar (Sticky Launcher)',
    subtitle: 'Zero friction floating mobile bar for 1 tap messaging and photo attachments.',
    demoRoute: '/demo/whatsapp-bar',
    icon: MessageSquare,
    component: (
      <div className="w-full">
        <WhatsAppBar />
      </div>
    ),
  },
  {
    id: 'voice-to-quote',
    fullTabLabel: '04 Voice Engine',
    shortTabLabel: '04 Voice',
    title: '24 hour AI Phone to Quote Engine (Telephony Voice Interceptor)',
    subtitle: 'Catches missed mobile calls and automatically texts instant price estimates.',
    demoRoute: '/demo/voice-to-quote',
    icon: PhoneMissed,
    component: <VoiceToQuoteDemo />,
  },
];

export const ToolsPage: React.FC = () => {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [stitchModalOpen, setStitchModalOpen] = useState(false);

  // Slider Stage State
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [direction, setDirection] = useState(1);


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
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase">
              Live Test Mode
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-slate-900 dark:text-white">
              Interactive Lead Tools Built for UK Trades
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400">
              Test the live simulators below to see how my standalone widgets capture high-value jobs from casual mobile traffic.
            </p>
          </div>

          {/* OPEN ARCHITECTURAL SHOWCASE STAGE (4-TOOL INTERACTIVE SUITE) */}
          <div className="mb-20">

            {/* Open stage — no card border or shadow */}
            <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-6">

              {/* Subtle Border Beam accent line (keep for visual interest) */}
              <BorderBeam size={340} duration={12} colorFrom="#D90429" colorTo="#25D366" />

              {/* Top Controls: 4 Pill Tabs */}
              <div className="flex overflow-x-auto whitespace-nowrap gap-2 hide-scrollbar py-1 px-1 justify-start md:justify-center w-full">
                {STAGE_TOOLS.map((tool, idx) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => selectTool(idx)}
                    className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold font-mono tracking-tight shrink-0 transition-all duration-200 ${
                      activeToolIndex === idx
                        ? 'bg-[#D90429] text-white shadow-md shadow-red-600/30'
                        : 'bg-zinc-100 text-zinc-700 border border-zinc-200 hover:text-zinc-900 hover:bg-zinc-200 dark:bg-white/[0.04] dark:text-zinc-400 dark:border-white/[0.08] dark:hover:text-white'
                    }`}
                  >
                    <span className="md:hidden">{tool.shortTabLabel}</span>
                    <span className="hidden md:inline">{tool.fullTabLabel}</span>
                  </button>
                ))}
              </div>

              {/* Desktop Side Arrow Chevrons */}
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous Tool (Left Arrow)"
                className="hidden md:flex absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-zinc-200 hover:text-[#D90429] dark:hover:text-[#D90429] hover:scale-110 items-center justify-center shadow-md transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next Tool (Right Arrow)"
                className="hidden md:flex absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-zinc-200 hover:text-[#D90429] dark:hover:text-[#D90429] hover:scale-110 items-center justify-center shadow-md transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Animated Slide Body with Touch Drag/Swipe */}
              <div className="relative touch-pan-y px-1 sm:px-4 md:px-16">
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
                    className="w-full flex flex-col space-y-6 cursor-grab active:cursor-grabbing"
                  >
                    {/* Tool Title & Description */}
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black flex items-center justify-center gap-2 text-slate-900 dark:text-white tracking-tight">
                        <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#D90429]" />
                        <span>{activeTool.title}</span>
                      </h3>
                      <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed px-2">
                        {activeTool.subtitle}
                      </p>
                    </div>

                    {/* Interactive Component */}
                    <div className="w-full max-w-xl mx-auto pt-2">
                      {activeTool.component}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Row: Pagination Dots + Launch CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full pt-4 border-t border-slate-200 dark:border-white/[0.06]">
                <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    {STAGE_TOOLS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectTool(i)}
                        aria-label={`Go to Tool ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeToolIndex === i
                            ? 'w-5 bg-[#D90429]'
                            : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-zinc-300">Tool {activeToolIndex + 1} of {STAGE_TOOLS.length}</span>
                  <span className="hidden md:inline text-slate-400 dark:text-zinc-600">• Use [←] [→] arrow keys or swipe</span>
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


          {/* BOTTOM CALL TO ACTION BANNER (CARDLESS) */}
          <div className="pt-12 pb-8 sm:py-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase mb-4">
              <Wrench className="w-3.5 h-3.5" />
              STANDALONE ADD-ON TOOLS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
              Want any of these tools wired into your current website?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Available as standalone add-on tools from £149. Plugs directly into Wix, WordPress, Squarespace, or custom builds with zero site redesign required.
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
                className="px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 font-bold text-sm transition-all shadow-md flex items-center gap-2"
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
