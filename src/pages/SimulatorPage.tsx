import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomTabBar } from '../components/BottomTabBar';
import { Footer } from '../components/Footer';
import { TradeSimulator } from '../components/tools/TradeSimulator';
import { QuoteForm } from '../components/QuoteForm';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { StitchBot } from '../components/StitchBot';

export const SimulatorPage: React.FC = () => {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [stitchModalOpen, setStitchModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#040507] text-slate-900 dark:text-white selection:bg-red-500/30 transition-colors duration-300 overflow-x-hidden">
      <Header onOpenQuote={() => setQuoteModalOpen(true)} />

      <main className="flex-grow pt-24 sm:pt-28 pb-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-1.5 justify-center px-3 py-1 mb-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Live Trade Tools Sandbox
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-slate-900 dark:text-white">
              Test Lead Tools Built for UK Trades.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400">
              Type your business name, select up to 2 tools to test on mobile or desktop, and see how they
              capture quotes and emergency jobs for your business.
            </p>
          </div>

          <TradeSimulator />
        </div>
      </main>

      <Footer
        onOpenWhatsApp={() => setWhatsappModalOpen(true)}
        onOpenQuote={() => setQuoteModalOpen(true)}
        onOpenPrivacy={() => navigate('/privacy')}
        onOpenTerms={() => navigate('/terms')}
      />

      <QuoteForm
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        onOpenWhatsApp={() => setWhatsappModalOpen(true)}
      />
      <WhatsAppModal isOpen={whatsappModalOpen} onClose={() => setWhatsappModalOpen(false)} />
      <StitchBot
        isOpen={stitchModalOpen}
        onClose={() => setStitchModalOpen(false)}
        onOpenQuote={() => setQuoteModalOpen(true)}
        onOpenWhatsApp={() => setWhatsappModalOpen(true)}
      />

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

      <BottomTabBar />
    </div>
  );
};
