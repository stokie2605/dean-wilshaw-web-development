import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { Portfolio } from './components/Portfolio';
import { AboutSection } from './components/AboutSection';

import { Pricing } from './components/Pricing';
import { QuoteForm } from './components/QuoteForm';
import { Footer } from './components/Footer';
import { StitchBot } from './components/StitchBot';
import { WhatsAppModal } from './components/WhatsAppModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';

type Page = 'home' | 'privacy' | 'terms';

export default function App() {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [stitchModalOpen, setStitchModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

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
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-[#dc2626]/20">
      {/* Navigation */}
      <Header 
        onOpenQuote={handleOpenQuote} 
        onOpenWhatsApp={handleOpenWhatsApp} 
        onOpenStitch={() => setStitchModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        <div className="bg-white">
          <Hero onOpenQuote={handleOpenQuote} onOpenWhatsApp={handleOpenWhatsApp} />
        </div>
        <div className="bg-[#f7f9fb]">
          <AboutSection />
        </div>
        <div className="bg-white">
          <Portfolio />
        </div>
        <div className="bg-[#f7f9fb]">
          <ServicesBento />
        </div>
        <div className="bg-white">
          <Pricing onOpenQuote={handleOpenQuote} onOpenWhatsApp={handleOpenWhatsApp} />
        </div>
        <div className="bg-[#f7f9fb]">
          <QuoteForm onOpenWhatsApp={handleOpenWhatsApp} />
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

      {/* WhatsApp Modal */}
      <WhatsAppModal isOpen={whatsappModalOpen} onClose={() => setWhatsappModalOpen(false)} />
    </div>
  );
}


