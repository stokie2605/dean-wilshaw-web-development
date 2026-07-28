import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { Portfolio } from './components/Portfolio';
import { MobileShowcase } from './components/MobileShowcase';
import { AboutSection } from './components/AboutSection';

import { Pricing } from './components/Pricing';
import { QuoteForm } from './components/QuoteForm';
import { Footer } from './components/Footer';
import { BottomTabBar } from './components/BottomTabBar';
import { StitchBot } from './components/StitchBot';
import { WhatsAppModal } from './components/WhatsAppModal';
import { SpeedTestTool } from './components/SpeedTestTool';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';

type Page = 'home' | 'privacy' | 'terms';

export default function App() {
  const navigate = useNavigate();
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [stitchModalOpen, setStitchModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [capturedDetails, setCapturedDetails] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        navigate('/outreach');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleBenchmarkComplete = (domain: string, industry: string) => {
    setCapturedDetails(`Speed Audit Request for: ${domain} (${industry}) - Looking to optimize speed and mobile performance.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleOpenPage = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWhatsApp = () => {
    setWhatsappModalOpen(true);
  };

  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={() => handleOpenPage('home')} />;
  }

  if (currentPage === 'terms') {
    return <TermsConditions onBack={() => handleOpenPage('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-[#191c1e] dark:text-white font-sans selection:bg-red-500/30 transition-colors duration-300">
      {/* Navigation */}
      <Header 
        onOpenQuote={handleOpenQuote} 
        onOpenWhatsApp={handleOpenWhatsApp} 
        onOpenStitch={() => setStitchModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-grow pb-20 md:pb-0 transition-colors duration-300">
        <div className="bg-slate-50 dark:bg-slate-950">
          <Hero onOpenQuote={handleOpenQuote} onOpenWhatsApp={handleOpenWhatsApp} />
        </div>
        <div className="bg-slate-50 dark:bg-slate-950">
          <MobileShowcase onOpenQuote={handleOpenQuote} />
        </div>
        <div className="bg-slate-50 dark:bg-slate-950">
          <AboutSection />
        </div>
        <div className="bg-slate-50 dark:bg-slate-950">
          <Portfolio onOpenQuote={handleOpenQuote} />
        </div>
        <div className="bg-slate-50 dark:bg-slate-950">
          <ServicesBento />
        </div>
        <div className="bg-slate-50 dark:bg-slate-950">
          <Pricing onOpenQuote={handleOpenQuote} onOpenWhatsApp={handleOpenWhatsApp} />
        </div>
        <div className="bg-slate-50 dark:bg-slate-950">
          <SpeedTestTool onBenchmarkComplete={handleBenchmarkComplete} />
        </div>
        <div className="bg-slate-50 dark:bg-slate-950">
          <QuoteForm onOpenWhatsApp={handleOpenWhatsApp} prefilledDetails={capturedDetails} />
        </div>
      </main>

      {/* Footer */}
      <Footer 
        onOpenWhatsApp={handleOpenWhatsApp} 
        onOpenQuote={handleOpenQuote}
        onOpenPrivacy={() => handleOpenPage('privacy')}
        onOpenTerms={() => handleOpenPage('terms')}
      />

      {/* Stitch AI Assistant Widget */}
      <StitchBot 
        isOpen={stitchModalOpen}
        onClose={() => setStitchModalOpen(false)}
        onOpenQuote={handleOpenQuote} 
        onOpenWhatsApp={handleOpenWhatsApp} 
      />

      {/* Floating Buttons Layer - Hidden on Mobile */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 hidden md:flex">
        <button 
          onClick={() => {
            document.getElementById('speed-test')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-[#0f1113] hover:bg-[#191c1e] text-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex items-center gap-3 border border-white/20 transition-transform hover:scale-105"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-geist font-semibold text-sm">Free Website Audit</span>
        </button>
      </div>

      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 hidden md:flex flex-col gap-3">
        <button 
          onClick={() => setWhatsappModalOpen(true)}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] flex items-center justify-center transition-transform hover:scale-105 border border-white/40"
          aria-label="WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </button>
        {!stitchModalOpen && (
          <button 
            onClick={() => setStitchModalOpen(true)}
            className="bg-[#191c1e] hover:bg-[#2a2f32] text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 border border-white/10 relative"
          >
            <svg className="w-6 h-6 text-[#dc2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </button>
        )}
      </div>

      {/* Mobile Bottom Tab Bar */}
      <BottomTabBar 
        onOpenStitch={() => setStitchModalOpen(true)}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* WhatsApp Modal */}
      <WhatsAppModal isOpen={whatsappModalOpen} onClose={() => setWhatsappModalOpen(false)} />

      {/* Global Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[150] animate-fadeIn">
          <div className="bg-[#191c1e] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#c6c6cd]/20 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <p className="text-sm font-semibold">
              Domain captured! Fill in your email to receive your full speed fix estimate.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


