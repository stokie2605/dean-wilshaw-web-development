import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthGate } from './components/AuthGate';
import { AdminDashboard } from './components/AdminDashboard';
import { DunhamMockup } from './pages/DunhamMockup';
import { ReportPreview } from './pages/ReportPreview';
import EvansElectricalLanding from './components/EvansElectricalLanding';
import { EmbedPage } from './pages/EmbedPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Global Scroll Restoration: Always scroll to top on page navigation */}
      <ScrollToTop />

      <Routes>
        {/* Core Architecture */}
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<Navigate to="/" replace />} />

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
    </BrowserRouter>
  </StrictMode>,
);

