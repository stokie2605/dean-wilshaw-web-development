import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { BottomTabBar } from './components/BottomTabBar';
import { HeroSection } from './components/HeroSection';
import { DeliverablesSection, DemosSection, WebAppsTeaser, HowItWorksSection } from './components/HomeSections';
import { PricingFaq } from './components/PricingFaq';
import { Footer } from './components/Footer';
import { MessageSquare } from 'lucide-react';

// Homepage sections load with the page so nothing flashes in while scrolling. Only the modals are lazy.
const WhatsAppModal = lazy(() => import('./components/WhatsAppModal').then(m => ({ default: m.WhatsAppModal })));
const QuoteForm = lazy(() => import('./components/QuoteForm').then(m => ({ default: m.QuoteForm })));

const WHATSAPP_QUOTE_URL = `https://wa.me/447348733365?text=${encodeURIComponent(
  "Hi Dean, I'd like to get a quote for a website for my business."
)}`;

export default function App() {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState<boolean>(false);
  const [capturedDetails, setCapturedDetails] = useState<any>(null);

  const handleOpenQuote = (details?: any) => {
    if (details) setCapturedDetails(details);
    setQuoteModalOpen(true);
  };

  const handleOpenWhatsApp = () => {
    setWhatsappModalOpen(true);
  };

  // Desktop: while the closing buttons are on screen, fade the header quote button and the round
  // WhatsApp button so no more than two contact buttons show at once. The closing buttons are
  // hidden on mobile, so this never triggers there.
  const closingButtonsRef = useRef<HTMLDivElement>(null);
  const [closingButtonsInView, setClosingButtonsInView] = useState(false);

  useEffect(() => {
    const el = closingButtonsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setClosingButtonsInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 dark:bg-[#040507] text-[#191c1e] dark:text-white font-sans selection:bg-red-500/30 transition-colors duration-300 overflow-x-hidden">
      {/* Top Navigation */}
      <Header
        onOpenQuote={handleOpenQuote}
        onOpenWhatsApp={handleOpenWhatsApp}
        hideQuote={closingButtonsInView}
      />

      {/* Main Page Content */}
      <main className="flex-grow">

        {/* 1. Hero */}
        <HeroSection />

        {/* 2. What you get */}
        <DeliverablesSection />

        {/* 3. Example websites */}
        <DemosSection />

        {/* 4. Web apps */}
        <WebAppsTeaser />

        {/* 5. How it works */}
        <HowItWorksSection />

        {/* 6. Questions */}
        <div id="questions" className="scroll-mt-20 sm:scroll-mt-24 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#040507] border-b border-slate-200 dark:border-white/[0.08]">
          <PricingFaq />
        </div>

        {/* 7. Closing call to action */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#040507] border-b border-slate-200 dark:border-white/[0.08]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              Ready to get started?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-md mx-auto md:mb-6">
              Message me on WhatsApp or fill in the quote form, whichever suits you.
            </p>
            {/* Desktop only: on mobile the bottom bar already shows these two */}
            <div ref={closingButtonsRef} className="hidden md:flex gap-3 max-w-xl mx-auto">
              <button
                type="button"
                onClick={() => handleOpenQuote()}
                className="flex-1 inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl bg-[#D90429] hover:bg-[#b80322] active:bg-[#9a021c] text-white font-bold text-base whitespace-nowrap transition-colors shadow-lg shadow-red-600/20"
              >
                Get a Quote
              </button>
              <a
                href={WHATSAPP_QUOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-base whitespace-nowrap transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-black" aria-hidden="true" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer
        onOpenPrivacy={() => navigate('/privacy')}
        onOpenTerms={() => navigate('/terms')}
      />

      {/* Modals */}
      <Suspense fallback={null}>
        <QuoteForm
          isOpen={quoteModalOpen} 
          onClose={() => setQuoteModalOpen(false)} 
          onOpenWhatsApp={handleOpenWhatsApp} 
          prefilledDetails={capturedDetails} 
        />
      </Suspense>

      {/* Mobile Bottom Navigation Bar (<768px) */}
      <BottomTabBar onOpenQuote={handleOpenQuote} />

      {/* Floating WhatsApp Button (Desktop / Tablet only to prevent mobile overlap) */}
      <div
        aria-hidden={closingButtonsInView}
        className={`hidden md:flex fixed bottom-6 right-6 z-[45] flex-col gap-3 transition-opacity duration-300 ${
          closingButtonsInView ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <button 
          onClick={() => setWhatsappModalOpen(true)}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] flex items-center justify-center transition-transform hover:scale-105 border border-white/40"
          aria-label="Message Dean on WhatsApp"
        >
          <svg className="w-7 h-7 fill-black" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </button>
      </div>

      {/* WhatsApp Modal */}
      <Suspense fallback={null}>
        <WhatsAppModal isOpen={whatsappModalOpen} onClose={() => setWhatsappModalOpen(false)} />
      </Suspense>

    </div>
  );
}

