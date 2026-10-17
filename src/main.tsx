import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import { ScrollToTop } from './components/ScrollToTop';
import { LegalPage } from './pages/LegalPage';
import { HealthCheckPage } from './pages/HealthCheckPage';
import './index.css';

const AuthGate = lazy(() => import('./components/AuthGate').then(m => ({ default: m.AuthGate })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const DunhamMockup = lazy(() => import('./pages/DunhamMockup').then(m => ({ default: m.DunhamMockup })));
const ReportPreview = lazy(() => import('./pages/ReportPreview').then(m => ({ default: m.ReportPreview })));
const EvansElectricalLanding = lazy(() => import('./components/EvansElectricalLanding'));
const EmbedPage = lazy(() => import('./pages/EmbedPage').then(m => ({ default: m.EmbedPage })));

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

          {/* Client Mockups & Special Routes */}
          <Route path="/dunham-wealth" element={<DunhamMockup />} />
          <Route path="/evans" element={<EvansElectricalLanding />} />
          <Route path="/report/preview/:slug" element={<ReportPreview />} />
          <Route path="/admin" element={
            <AuthGate>
              <AdminDashboard />
            </AuthGate>
          } />

          {/* Embed route - bare widget for client iframes */}
          <Route path="/embed/:toolId" element={<EmbedPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);

