import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomTabBar } from '../components/BottomTabBar';
import { WebsiteHealthCheck } from '../components/WebsiteHealthCheck';
import { Footer } from '../components/Footer';

const WhatsAppModal = lazy(() =>
  import('../components/WhatsAppModal').then((m) => ({ default: m.WhatsAppModal }))
);
const QuoteForm = lazy(() =>
  import('../components/QuoteForm').then((m) => ({ default: m.QuoteForm }))
);

export const HealthCheckPage: React.FC = () => {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [capturedDetails, setCapturedDetails] = useState<any>(null);

  useEffect(() => {
    document.title = 'Free Website Health Check for Trades | Design Systems Web';
  }, []);

  const handleOpenQuote = (details?: any) => {
    if (details) setCapturedDetails(details);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 dark:bg-[#040507] text-[#191c1e] dark:text-white font-sans selection:bg-red-500/30 transition-colors duration-300 overflow-x-hidden">
      <Header
        onOpenQuote={handleOpenQuote}
        onOpenWhatsApp={() => setWhatsappModalOpen(true)}
      />

      <main className="flex-grow pt-16 sm:pt-20">
        <WebsiteHealthCheck standalone />
      </main>

      <Footer
        onOpenPrivacy={() => navigate('/privacy')}
        onOpenTerms={() => navigate('/terms')}
      />

      <Suspense fallback={null}>
        <QuoteForm
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          onOpenWhatsApp={() => setWhatsappModalOpen(true)}
          prefilledDetails={capturedDetails}
        />
      </Suspense>

      <BottomTabBar onOpenQuote={handleOpenQuote} />

      <Suspense fallback={null}>
        <WhatsAppModal
          isOpen={whatsappModalOpen}
          onClose={() => setWhatsappModalOpen(false)}
        />
      </Suspense>
    </div>
  );
};
