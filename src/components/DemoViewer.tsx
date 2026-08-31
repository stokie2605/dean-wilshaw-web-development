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

  const mobileImageSrc = `/mockups/engine-${activeEngine.id}-mobile.png`;
  const desktopImageSrc = `/mockups/engine-${activeEngine.id}-preview.png`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      {/* 12-Column Split Modal Chassis */}
      <div 
        className="w-full max-w-7xl h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right (Absolute) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-white/10 shadow-lg cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-zinc-950 relative">
          
          {/* Left Column (5 Cols) - Specs & Architecture */}
          <div className="lg:col-span-5 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between overflow-y-auto scrollbar-none bg-zinc-950/80">
            
            {/* Header Area */}
            <div className="space-y-4 mb-8">
              <span 
                className="inline-flex font-mono text-[11px] font-bold px-2.5 py-1 rounded"
                style={{ backgroundColor: `${activeEngine.accent}18`, color: activeEngine.accent }}
              >
                {activeEngine.badge}
              </span>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                  {activeEngine.title}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mt-2">
                  {activeEngine.description}
                </p>
              </div>
            </div>

            {/* Architecture Specs Bento */}
            <div className="space-y-4 mb-8 flex-1">
              {/* Best Suited For Row */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <h4 className="text-[10px] uppercase font-mono text-zinc-500 mb-1.5 tracking-wider">Best Suited For</h4>
                <div className="flex items-center gap-2 text-zinc-200 text-sm font-semibold">
                  <Zap className="w-4 h-4 text-amber-400" />
                  {activeEngine.specs.bestFor}
                </div>
              </div>

              {/* Included Features Row */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <h4 className="text-[10px] uppercase font-mono text-zinc-500 mb-2.5 tracking-wider">Included Features</h4>
                <ul className="space-y-2">
                  {activeEngine.specs.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grid Row: Delivery & Ownership */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                  <h4 className="text-[10px] uppercase font-mono text-zinc-500 mb-1.5 tracking-wider">Delivery Timeframe</h4>
                  <p className="text-zinc-200 text-sm font-mono leading-tight">{activeEngine.specs.delivery}</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                  <h4 className="text-[10px] uppercase font-mono text-zinc-500 mb-1.5 tracking-wider">Ownership</h4>
                  <p className="text-zinc-200 text-sm font-mono leading-tight">{activeEngine.specs.ownership}</p>
                </div>
              </div>
            </div>

            {/* Commercial Action Anchor */}
            <div className="pt-4 border-t border-zinc-800/80 mt-auto">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-lg shadow-red-900/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Commission This Layout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column (7 Cols) - Hardware Viewport */}
          <div className="lg:col-span-7 flex flex-col relative bg-zinc-900/30 overflow-hidden">
            
            {/* Viewport Toggles (Floating Pill) */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-zinc-950/80 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-xl">
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

            {/* Viewport Canvas Container */}
            <div className="flex-1 w-full flex items-center justify-center p-4 pt-24 pb-8 overflow-hidden">
              {activeViewport === 'mobile' ? (
                /* Clean 375px Mobile Frame */
                <div className="w-[360px] max-w-full h-[65vh] md:h-[75vh] rounded-[36px] border-[5px] border-zinc-800 bg-zinc-950 shadow-2xl overflow-y-auto overflow-x-hidden scrollbar-none flex flex-col relative">
                  <img
                    src={mobileImageSrc}
                    alt={activeEngine.title}
                    className="w-full h-auto block select-none [image-rendering:-webkit-optimize-contrast] transform-gpu"
                  />
                </div>
              ) : (
                /* Clean Desktop Frame */
                <div className="w-full max-w-4xl h-[65vh] md:h-[75vh] rounded-xl border-2 border-zinc-800 bg-zinc-950 shadow-2xl overflow-y-auto overflow-x-hidden scrollbar-none flex flex-col">
                  <img
                    src={desktopImageSrc}
                    alt={activeEngine.title}
                    className="w-full h-auto block select-none [image-rendering:-webkit-optimize-contrast] transform-gpu"
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

