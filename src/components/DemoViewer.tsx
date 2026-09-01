import React, { useEffect } from 'react';
import { X, Smartphone, Monitor, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export type EngineArchetype = {
  id: string;
  title: string;
  badge: string;
  accent: string;
  defaultView: 'mobile' | 'desktop';
  description: string;
  tags: string[];
  specs: {
    bestFor: string;
    keyFeatures: string[];
    delivery: string;
    ownership: string;
  };
};

interface DemoViewerProps {
  activeEngine: EngineArchetype | null;
  activeViewport: 'mobile' | 'desktop';
  onViewportChange: (viewport: 'mobile' | 'desktop') => void;
  onClose: () => void;
  onOpenQuote: () => void;
}

const MOCKUP_IMAGES: Record<string, { mobile: string; desktop: string }> = {
  "1": { mobile: "/mockups/engine-01-mobile.png", desktop: "/mockups/engine-01-preview.png" },
  "01": { mobile: "/mockups/engine-01-mobile.png", desktop: "/mockups/engine-01-preview.png" },
  "2": { mobile: "/mockups/engine-02-mobile.png", desktop: "/mockups/engine-02-preview.png" },
  "02": { mobile: "/mockups/engine-02-mobile.png", desktop: "/mockups/engine-02-preview.png" },
  "3": { mobile: "/mockups/engine-03-mobile.png", desktop: "/mockups/engine-03-preview.png" },
  "03": { mobile: "/mockups/engine-03-mobile.png", desktop: "/mockups/engine-03-preview.png" },
  "4": { mobile: "/mockups/engine-04-mobile.png", desktop: "/mockups/engine-04-preview.png" },
  "04": { mobile: "/mockups/engine-04-mobile.png", desktop: "/mockups/engine-04-preview.png" },
  "5": { mobile: "/mockups/engine-05-mobile.png", desktop: "/mockups/engine-05-preview.png" },
  "05": { mobile: "/mockups/engine-05-mobile.png", desktop: "/mockups/engine-05-preview.png" },
  "6": { mobile: "/mockups/engine-06-mobile.png", desktop: "/mockups/engine-06-preview.png" },
  "06": { mobile: "/mockups/engine-06-mobile.png", desktop: "/mockups/engine-06-preview.png" },
};

export const DemoViewer: React.FC<DemoViewerProps> = ({
  activeEngine,
  activeViewport,
  onViewportChange,
  onClose,
  onOpenQuote,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!activeEngine) return null;

  const imagePaths = MOCKUP_IMAGES[String(activeEngine.id)] || {
    mobile: '/mockups/engine-01-mobile.png',
    desktop: '/mockups/engine-01-preview.png'
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string) => {
    const target = e.currentTarget;
    if (target.src !== fallbackUrl) {
      target.src = fallbackUrl;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-3 sm:p-6 flex justify-center items-start lg:items-center transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Card Shell: h-auto on mobile, max-h-[90vh] with split grid on desktop (lg+) */}
      <div 
        className="relative w-full max-w-6xl bg-zinc-950 border border-zinc-800 rounded-2xl my-auto lg:my-0 flex flex-col h-auto lg:max-h-[90vh] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-50 p-2 rounded-full bg-black/70 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-white/10 shadow-lg cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 bg-zinc-950 overflow-y-visible lg:overflow-hidden">
          
          {/* Left Column (5 Cols on desktop) - Specs & Architecture */}
          <div className="lg:col-span-5 p-5 sm:p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between lg:overflow-y-auto scrollbar-none bg-zinc-950/80">
            
            {/* Header Area */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 pr-8 lg:pr-0">
              <span 
                className="inline-flex font-mono text-[11px] font-bold px-2.5 py-1 rounded"
                style={{ backgroundColor: `${activeEngine.accent}18`, color: activeEngine.accent }}
              >
                {activeEngine.badge}
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                  {activeEngine.title}
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-2">
                  {activeEngine.description}
                </p>
              </div>
            </div>

            {/* Architecture Specs Bento */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
              {/* Best Suited For Row */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3.5 sm:p-4">
                <h4 className="text-[10px] uppercase font-mono text-zinc-500 mb-1.5 tracking-wider">Best Suited For</h4>
                <div className="flex items-center gap-2 text-zinc-200 text-xs sm:text-sm font-semibold">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{activeEngine.specs.bestFor}</span>
                </div>
              </div>

              {/* Included Features Row */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3.5 sm:p-4">
                <h4 className="text-[10px] uppercase font-mono text-zinc-500 mb-2 tracking-wider">Included Features</h4>
                <ul className="space-y-2">
                  {activeEngine.specs.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-zinc-300 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grid Row: Delivery & Ownership */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3.5 sm:p-4">
                  <h4 className="text-[10px] uppercase font-mono text-zinc-500 mb-1 tracking-wider">Delivery Timeframe</h4>
                  <p className="text-zinc-200 text-xs sm:text-sm font-mono leading-tight">{activeEngine.specs.delivery}</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3.5 sm:p-4">
                  <h4 className="text-[10px] uppercase font-mono text-zinc-500 mb-1 tracking-wider">Ownership</h4>
                  <p className="text-zinc-200 text-xs sm:text-sm font-mono leading-tight">{activeEngine.specs.ownership}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols on desktop) - Hardware Viewport & Mobile Preview */}
          <div className="lg:col-span-7 flex flex-col relative bg-zinc-900/30 p-4 sm:p-6 lg:p-6 lg:overflow-hidden">
            
            {/* Viewport Toggles (Floating Pill - only on tablet/desktop) */}
            <div className="hidden md:inline-flex absolute top-6 left-1/2 -translate-x-1/2 z-20 items-center gap-1 bg-zinc-950/80 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-xl">
              <button
                type="button"
                onClick={() => onViewportChange('mobile')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeViewport === 'mobile'
                    ? 'bg-zinc-800 text-white shadow-inner'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile View</span>
              </button>
              <button
                type="button"
                onClick={() => onViewportChange('desktop')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeViewport === 'desktop'
                    ? 'bg-zinc-800 text-white shadow-inner'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop View</span>
              </button>
            </div>

            {/* Viewport Canvas Container: natural height on mobile, flex-1 centered on desktop */}
            <div className="w-full flex items-center justify-center lg:pt-16 lg:pb-4">
              {/* Mobile View: Natural full height mockup inside clean frame on phones, scrollable chassis on desktop */}
              <div className="w-full flex justify-center py-2 sm:py-4">
                {/* On mobile (<md), ALWAYS show phone frame regardless of activeViewport.
                    On md+, allow vertical scrolling inside phone chassis and hide when desktop view is active. */}
                <div className={`w-full max-w-[320px] sm:max-w-[360px] md:h-[65vh] lg:h-[72vh] rounded-2xl sm:rounded-3xl overflow-y-auto overflow-x-hidden scrollbar-none border-2 border-zinc-800 shadow-2xl bg-black flex flex-col antialiased transform-gpu ${activeViewport === 'desktop' ? 'block md:hidden' : 'block'}`}>
                  <img
                    src={imagePaths.mobile}
                    alt={activeEngine.title}
                    onError={(e) => handleImageError(e, `/images/engine-${String(activeEngine.id).padStart(2, '0')}-mobile.png`)}
                    className="w-full h-auto object-top block select-none [image-rendering:-webkit-optimize-contrast] [image-rendering:crisp-edges]"
                    style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
                  />
                </div>

                {/* Desktop Spec Frame (visible on md+ when activeViewport === 'desktop') */}
                {activeViewport === 'desktop' && (
                  <div className="hidden md:flex w-full max-w-4xl h-[65vh] lg:h-[72vh] rounded-xl border-2 border-zinc-800 bg-zinc-950 shadow-2xl overflow-y-auto overflow-x-hidden scrollbar-none flex-col antialiased transform-gpu [backface-visibility:hidden] [perspective:1000px]">
                    <img
                      src={imagePaths.desktop}
                      alt={activeEngine.title}
                      onError={(e) => handleImageError(e, `/images/engine-${String(activeEngine.id).padStart(2, '0')}-preview.png`)}
                      className="w-full h-auto block select-none [image-rendering:-webkit-optimize-contrast] [image-rendering:crisp-edges] antialiased transform-gpu [backface-visibility:hidden]"
                      style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

