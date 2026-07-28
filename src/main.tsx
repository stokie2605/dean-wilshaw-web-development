import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { AuthGate } from './components/AuthGate';
import { AdminDashboard } from './components/AdminDashboard';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/outreach" element={
          <AuthGate>
            <AdminDashboard />
          </AuthGate>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
