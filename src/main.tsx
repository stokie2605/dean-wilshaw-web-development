import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { AuthGate } from './components/AuthGate';
import { AdminDashboard } from './components/AdminDashboard';
import { DunhamMockup } from './pages/DunhamMockup';
import { ReportPreview } from './pages/ReportPreview';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dunham-wealth" element={<DunhamMockup />} />
        <Route path="/report/preview/:slug" element={<ReportPreview />} />
        <Route path="/admin" element={
          <AuthGate>
            <AdminDashboard />
          </AuthGate>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
