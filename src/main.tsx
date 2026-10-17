import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import { ScrollToTop } from './components/ScrollToTop';
import { LegalPage } from './pages/LegalPage';
import { HealthCheckPage } from './pages/HealthCheckPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Global Scroll Restoration: Always scroll to top on page navigation */}
      <ScrollToTop />

      <Suspense fallback={null}>
        <Routes>
          {/* Core Architecture */}
          <Route path="/" element={<App />} />
          <Route path="/check" element={<HealthCheckPage />} />
          <Route path="/pricing" element={<Navigate to="/" replace />} />
          <Route path="/privacy" element={<LegalPage page="privacy" />} />
          <Route path="/terms" element={<LegalPage page="terms" />} />

          {/* Retired demo pages: send old links back to the homepage */}
          <Route path="/simulator" element={<Navigate to="/" replace />} />
          <Route path="/demos" element={<Navigate to="/" replace />} />
          <Route path="/demo" element={<Navigate to="/" replace />} />
          <Route path="/demo/*" element={<Navigate to="/" replace />} />
          <Route path="/tools/*" element={<Navigate to="/" replace />} />

          {/* Retired client mockups, tools and admin: send old links back to the homepage */}
          <Route path="/dunham-wealth" element={<Navigate to="/" replace />} />
          <Route path="/evans" element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/report/*" element={<Navigate to="/" replace />} />
          <Route path="/embed/*" element={<Navigate to="/" replace />} />
          <Route path="/concepts/*" element={<Navigate to="/" replace />} />

          {/* Anything else goes to the homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);

