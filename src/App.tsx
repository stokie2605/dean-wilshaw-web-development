import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ArrowRight, Bot, MessageSquare, Smartphone, Zap, Target, Gauge } from 'lucide-react';

const AboutDeanSection = lazy(() => import('./components/AboutDeanSection').then(m => ({ default: m.AboutDeanSection })));
const PortfolioShowcaseSection = lazy(() => import('./components/PortfolioShowcaseSection').then(m => ({ default: m.PortfolioShowcaseSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const WhatsAppModal = lazy(() => import('./components/WhatsAppModal').then(m => ({ default: m.WhatsAppModal })));
const QuoteForm = lazy(() => import('./components/QuoteForm').then(m => ({ default: m.QuoteForm })));
const StitchBot = lazy(() => import('./components/StitchBot').then(m => ({ default: m.StitchBot })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsConditions = lazy(() => import('./components/TermsConditions').then(m => ({ default: m.TermsConditions })));

export default function App() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState<boolean>(false);
  const [stitchModalOpen, setStitchModalOpen] = useState<boolean>(false);
  const [capturedDetails, setCapturedDetails] = useState<any>(null);
  const [showBubble, setShowBubble] = useState<boolean>(false);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/privacy') setCurrentPage('privacy');
      else if (path === '/terms') setCurrentPage('terms');
      else setCurrentPage('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenPage = (page: 'home' | 'privacy' | 'terms') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'home') window.history.pushState({}, '', '/');
    else window.history.pushState({}, '', `/${page}`);
  };

  const handleOpenQuote = (details?: any) => {
    if (details) setCapturedDetails(details);
    setQuoteModalOpen(true);
  };

  const handleOpenWhatsApp = () => {
    setWhatsappModalOpen(true);
  };

  const openStitchModal = () => {
    setShowBubble(false);
    setStitchModalOpen(true);
  };

  const dismissBubble = () => {
    setShowBubble(false);
  };

  if (currentPage === 'privacy') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <PrivacyPolicy onBack={() => handleOpenPage('home')} />
      </Suspense>
    );
  }

  if (currentPage === 'terms') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <TermsConditions onBack={() => handleOpenPage('home')} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-[#191c1e] dark:text-white font-sans selection:bg-red-500/30 transition-colors duration-300 overflow-x-hidden">
      {/* Navigation */}
      <Header 
        onOpenQuote={handleOpenQuote} 
        onOpenWhatsApp={handleOpenWhatsApp} 
        onOpenStitch={openStitchModal}
      />

      {/* Main Page Content */}
      <main className="flex-grow pb-20 md:pb-0 transition-colors duration-300">
        
        {/* 1. Hero Section */}
        <div className="bg-slate-50 dark:bg-zinc-950">
          <HeroSection onOpenQuote={handleOpenQuote} onOpenWhatsApp={handleOpenWhatsApp} />
        </div>

        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>}>
          
          {/* 2. Who You Are */}
          <div className="bg-slate-50 dark:bg-zinc-950">
            <AboutDeanSection />
          </div>

          {/* 3. The 3 Layout Archetypes */}
          <div className="bg-slate-50 dark:bg-zinc-950">
            <PortfolioShowcaseSection onOpenQuote={handleOpenQuote} />
          </div>

          {/* 4. Lead Tools Showroom Teaser Banner */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-zinc-900 border-y border-slate-200 dark:border-zinc-800 transition-colors">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Bot className="w-3.5 h-3.5" />
                    Interactive Sandbox
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    Want to test our lead-capture tools live?
                  </h2>
                  <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                    Explore our 24/7 AI trade triage bot, instant quote calculators, deposit portals, and WhatsApp fast bars in our dedicated interactive showroom.
                  </p>
                  
                  {/* Tool Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-700 dark:text-zinc-300">
                    <div className="flex items-center gap-1.5"><Bot className="w-4 h-4 text-red-500" /> 24/7 AI Triage</div>
                    <div className="flex items-center gap-1.5"><Smartphone className="w-4 h-4 text-amber-500" /> Instant Calculator</div>
                    <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-sky-500" /> Booking Portal</div>
                    <div className="flex items-center gap-1.5"><Target className="w-4 h-4 text-emerald-500" /> Trust Indicators</div>
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    to="/tools"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-red-600/30 transition-all hover:scale-105"
                  >
                    <span>Enter Lead Tools Showroom</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Pricing & Audits Teaser Banner */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold uppercase tracking-wider">
                <Gauge className="w-3.5 h-3.5" />
                Transparent Pricing
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Simple Pricing. 100% Code Ownership.
              </h2>
              <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                Standalone lead tools from £149, full mobile websites from £299, or low-risk £49 site speed audits.
              </p>
              <div className="pt-2">
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-zinc-800 hover:bg-black dark:hover:bg-zinc-700 text-white font-bold text-sm transition-all shadow-md"
                >
                  <span>View Full Pricing &amp; Audits</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </Suspense>
      </main>

      {/* Footer & Modals */}
      <Suspense fallback={null}>
        <Footer 
          onOpenWhatsApp={handleOpenWhatsApp} 
          onOpenQuote={handleOpenQuote}
          onOpenPrivacy={() => handleOpenPage('privacy')}
          onOpenTerms={() => handleOpenPage('terms')}
        />
        <StitchBot 
          isOpen={stitchModalOpen} 
          onClose={() => setStitchModalOpen(false)} 
          onOpenQuote={handleOpenQuote} 
          onOpenWhatsApp={handleOpenWhatsApp} 
        />
        <QuoteForm 
          isOpen={quoteModalOpen} 
          onClose={() => setQuoteModalOpen(false)} 
          onOpenWhatsApp={handleOpenWhatsApp} 
          prefilledDetails={capturedDetails} 
        />
      </Suspense>

      {/* Floating WhatsApp Button - Bottom Left */}
      <div className="fixed bottom-20 md:bottom-6 left-4 sm:left-6 z-[45] flex flex-col gap-3">
        <button 
          onClick={() => setWhatsappModalOpen(true)}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] flex items-center justify-center transition-transform hover:scale-105 border border-white/40"
          aria-label="WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </button>
      </div>

      {/* Floating Ask AI Button - Bottom Right */}
      {!stitchModalOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
          {showBubble && (
            <div 
              className="hidden md:flex bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 dark:text-zinc-200 relative items-center gap-2 pr-7 cursor-pointer pointer-events-auto transition-all" 
              onClick={openStitchModal}
            >
              Not sure where to start? Ask me.
              <button 
                onClick={(e) => { e.stopPropagation(); dismissBubble(); }} 
                className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-full flex items-center justify-center" 
                aria-label="Close"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          )}
          <button 
            onClick={openStitchModal}
            className="bg-[#191c1e] hover:bg-[#2a2f32] text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 border border-white/10 relative pointer-events-auto"
            aria-label="Ask AI"
          >
            <svg className="w-5 h-5 text-[#dc2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </button>
        </div>
      )}

      {/* WhatsApp Modal */}
      <Suspense fallback={null}>
        <WhatsAppModal isOpen={whatsappModalOpen} onClose={() => setWhatsappModalOpen(false)} />
      </Suspense>

    </div>
  );
}
