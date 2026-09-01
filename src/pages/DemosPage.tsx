import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomTabBar } from '../components/BottomTabBar';
import { Footer } from '../components/Footer';
import { QuoteForm } from '../components/QuoteForm';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { StitchBot } from '../components/StitchBot';
import { DemoViewer, EngineArchetype } from '../components/DemoViewer';
import { Zap } from 'lucide-react';

export const PORTFOLIO_ENGINES = [
  {
    id: "01",
    title: "Engine 01 / Emergency Dispatch Layout",
    badge: "Interactive Preview / Mobile First",
    accent: "#DC2626",
    defaultView: "mobile",
    description: "Built for emergency callouts and fast customer contact. Places direct phone calling and WhatsApp messaging right at the bottom of the screen.",
    tags: ["Direct Phone Link", "Instant Message Button", "Fixed Bottom Bar"],
    specs: {
      bestFor: "Emergency trades, breakdown recovery, and 24 hour repair services",
      keyFeatures: [
        "Fixed bottom calling bar for instant phone bookings",
        "Clear pricing breakdown with no hidden fees",
        "Live status notice showing active team availability"
      ],
      delivery: "Complete setup with your branding within 5 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  },
  {
    id: "02",
    title: "Engine 02 / Commercial Tender Layout",
    badge: "Interactive Preview / Desktop First",
    accent: "#F59E0B",
    defaultView: "desktop",
    description: "Built for commercial contractors and plant hire firms quoting on large contracts and site operations.",
    tags: ["Tonnage Slider", "Safety Accreditations", "Spec Sheet Downloads"],
    specs: {
      bestFor: "Commercial contractors, heavy plant hire, and logistics firms",
      keyFeatures: [
        "Interactive tonnage slider for fast job estimates",
        "Safety accreditation showcase for quick vetting",
        "Direct download buttons for equipment spec sheets"
      ],
      delivery: "Complete setup with your branding within 7 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  },
  {
    id: "03",
    title: "Engine 03 / Bespoke Portfolio Layout",
    badge: "Interactive Preview / Desktop First",
    accent: "#0F766E",
    defaultView: "desktop",
    description: "Built for bespoke craftsmen, architects, and high end interior studios who need a clean visual showcase of their work.",
    tags: ["Project Gallery", "Process Breakdown", "Direct Consultation Form"],
    specs: {
      bestFor: "Joinery studios, architects, bespoke builders, and designers",
      keyFeatures: [
        "Large project photo showcase with clean typography",
        "Step by step client process breakdown",
        "Simple consultation booking form"
      ],
      delivery: "Complete setup with your branding within 7 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  },
  {
    id: "04",
    title: "Engine 04 / Professional Advisory Layout",
    badge: "Interactive Preview / Mobile First",
    accent: "#38BDF8",
    defaultView: "mobile",
    description: "Built for chartered surveyors, valuers, and property consultants requiring a clear fee guide and trust markers.",
    tags: ["Fee Calculator", "Compliance Badges", "Direct Enquiry Form"],
    specs: {
      bestFor: "Surveyors, property consultants, and advisory firms",
      keyFeatures: [
        "Interactive survey fee and timeline estimator",
        "Industry accreditation and insurance badges",
        "Direct instruction button for new client briefs"
      ],
      delivery: "Complete setup with your branding within 5 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  },
  {
    id: "05",
    title: "Engine 05 / Systems & Lead Router Layout",
    badge: "Interactive Preview / Desktop First",
    accent: "#10B981",
    defaultView: "desktop",
    description: "Built for technology services, automation specialists, and businesses managing automated phone and lead capture pipelines.",
    tags: ["Live System Log", "Direct CRM Links", "Fast Lead Routing"],
    specs: {
      bestFor: "Automation consultants, tech providers, and system builders",
      keyFeatures: [
        "Interactive live simulation showing automated call routing",
        "Integration badges for standard CRM and payment tools",
        "Direct system booking and setup buttons"
      ],
      delivery: "Complete setup with your branding within 7 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  },
  {
    id: "06",
    title: "Engine 06 / Vehicle Studio & Package Layout",
    badge: "Interactive Preview / Mobile First",
    accent: "#2563EB",
    defaultView: "mobile",
    description: "Built for vehicle detailing studios, surface protection labs, and trade specialists offering tiered packages.",
    tags: ["Tiered Packages", "Bay Availability", "WhatsApp Booking"],
    specs: {
      bestFor: "Detailing studios, surface protection, and specialist workshops",
      keyFeatures: [
        "Three tiered package comparison for easy package selection",
        "Live bay availability status bar",
        "One tap WhatsApp booking button"
      ],
      delivery: "Complete setup with your branding within 5 working days",
      ownership: "100 percent code ownership with zero monthly software fees"
    }
  }
];

export const DemosPage: React.FC = () => {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [stitchModalOpen, setStitchModalOpen] = useState(false);
  
  // Interactive Viewport Demo Viewer State
  const [activeEngineIndex, setActiveEngineIndex] = useState<number | null>(null);
  const [activeViewport, setActiveViewport] = useState<'mobile' | 'desktop'>('desktop');

  const openViewer = (idx: number) => {
    setActiveEngineIndex(idx);
    setActiveViewport(PORTFOLIO_ENGINES[idx].defaultView);
  };

  const closeViewer = () => {
    setActiveEngineIndex(null);
  };

  // Lock body scroll when viewer is open
  useEffect(() => {
    document.body.style.overflow = activeEngineIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeEngineIndex]);

  const activeEngine = activeEngineIndex !== null ? PORTFOLIO_ENGINES[activeEngineIndex] : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#040507] text-slate-900 dark:text-white selection:bg-red-500/30 transition-colors duration-300 overflow-x-hidden">
      
      {/* Navigation */}
      <Header onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow pt-24 sm:pt-28 pb-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase">
              Live Layout Showcase
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-slate-900 dark:text-white">
              Six Trade Concepts
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
              Hand coded websites built for high conversion, instant loading speeds, and no template bloat across UK trades and contractors.
            </p>
          </div>

          {/* Six Engine Cardless Editorial Grid with Clean Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0 md:gap-y-12 pt-4">
            {PORTFOLIO_ENGINES.map((engine, idx) => (
              <div
                key={engine.id}
                onClick={() => openViewer(idx)}
                className={`flex flex-col justify-between group cursor-pointer py-8 md:py-0 ${idx > 0 ? 'border-t border-slate-200 dark:border-zinc-800 md:border-t-0' : ''}`}
              >
                <div>
                  {/* Mini Browser Header & Viewport Mockup */}
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-sm mb-5 relative bg-slate-900 group-hover:border-slate-400 dark:group-hover:border-zinc-700 transition-colors">
                    
                    {/* Browser Titlebar */}
                    <div className="bg-slate-100 dark:bg-zinc-900 px-3.5 py-2 flex items-center justify-between border-b border-slate-200 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400/80" />
                          <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 truncate">
                          {`engine-${engine.id}`}.trade
                        </span>
                      </div>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-semibold">
                        {engine.defaultView === 'mobile' ? '375px mobile' : 'desktop full'}
                      </span>
                    </div>

                    {/* Image Preview Canvas with 16:10 Aspect Ratio & Smooth Hover Scroll Physics */}
                    <div className="aspect-[16/10] w-full overflow-hidden relative group rounded-b-lg bg-slate-950">
                      <img
                        src={`/mockups/engine-${engine.id}-preview.png`}
                        alt={`${engine.title} preview`}
                        className="w-full object-cover object-top transition-transform duration-1000 ease-out group-hover:-translate-y-[35%]"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('/mockups/')) {
                            target.src = `/mockups/${engine.id}-preview.png`;
                          }
                        }}
                      />
                      {/* Subtle Overlay Badge on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 bg-black/85 text-white font-mono text-[11px] font-bold px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg tracking-wide">
                          <Zap className="w-3.5 h-3.5 text-[#D90429] fill-current" />
                          Click to Launch Live Demo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Engine Details */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold tracking-wide" style={{ color: engine.accent }}>
                        {engine.badge}
                      </span>
                      <span className="text-slate-400 dark:text-zinc-500 uppercase text-[10px] font-semibold">
                        Hand Coded
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#D90429] transition-colors leading-snug">
                      {engine.title}
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {engine.description}
                    </p>
                  </div>
                </div>

                {/* Tags & Action Button */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {engine.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openViewer(idx);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#D90429] dark:text-black" />
                    View Live Engine Demo &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Conversion Section */}
          <div className="pt-12 border-t border-slate-200 dark:border-white/[0.08] text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Want a custom combination of these engines?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Every system is modular. We can combine call buttons, instant quote estimators, and 24 hour missed call text alerts into your existing website.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Request a Custom Layout &rarr;
              </button>
              <button
                type="button"
                onClick={() => setWhatsappModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-800 font-semibold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
              >
                Discuss via WhatsApp
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Interactive Viewport Demo Viewer Modal */}
      <DemoViewer
        activeEngine={activeEngine}
        activeViewport={activeViewport}
        onViewportChange={setActiveViewport}
        onClose={closeViewer}
        onOpenQuote={() => setQuoteModalOpen(true)}
      />

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

