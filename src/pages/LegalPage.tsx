import React, { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = lazy(() => import('../components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsConditions = lazy(() => import('../components/TermsConditions').then(m => ({ default: m.TermsConditions })));

interface LegalPageProps {
  page: 'privacy' | 'terms';
}

// Sits inside the Suspense boundary, so it mounts with the lazy page and resets scroll once content exists
const ScrollToTopOnMount: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);
  return null;
};

// Routed wrapper so /privacy and /terms load directly from the address bar
export const LegalPage: React.FC<LegalPageProps> = ({ page }) => {
  const navigate = useNavigate();
  const handleBack = () => navigate('/');

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-[#040507] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#D90429] border-t-transparent rounded-full animate-spin"></div></div>}>
      <ScrollToTopOnMount key={page} />
      {page === 'privacy' ? <PrivacyPolicy onBack={handleBack} /> : <TermsConditions onBack={handleBack} />}
    </Suspense>
  );
};
