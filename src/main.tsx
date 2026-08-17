import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { AuthGate } from './components/AuthGate';
import { AdminDashboard } from './components/AdminDashboard';
import { DunhamMockup } from './pages/DunhamMockup';
import { ReportPreview } from './pages/ReportPreview';
import EvansElectricalLanding from './components/EvansElectricalLanding';
import { EmbedPage } from './pages/EmbedPage';
import { ToolDemoPage } from './pages/ToolDemoPage';
import { MissedCallDemoPage } from './pages/MissedCallDemoPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dunham-wealth" element={<DunhamMockup />} />
        <Route path="/evans" element={<EvansElectricalLanding />} />
        <Route path="/report/preview/:slug" element={<ReportPreview />} />
        <Route path="/admin" element={
          <AuthGate>
            <AdminDashboard />
          </AuthGate>
        } />

        {/* Dedicated Missed-Call Demo Route */}
        <Route path="/demo/missed-call" element={<MissedCallDemoPage />} />
        <Route path="/tools/missed-call" element={<MissedCallDemoPage />} />

        {/* Embed route - bare widget for client iframes */}
        <Route path="/embed/:toolId" element={<EmbedPage />} />

        {/* Demo routes - outreach landing pages with Stripe CTA */}
        <Route path="/demo/:toolId" element={<ToolDemoPage />} />
        <Route path="/tools/:toolId" element={<ToolDemoPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
