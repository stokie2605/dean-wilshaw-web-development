import React, { useState, useEffect } from 'react';

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use an environment variable or default secure PIN
    const correctPin = import.meta.env.VITE_CRM_PIN || '260585';
    if (pin === correctPin) {
      sessionStorage.setItem('admin_token', 'authenticated');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin('');
      // After a short delay, I could optionally redirect to home,
      // but keeping them here lets them retry.
    }
  };

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#191c1e] text-white flex items-center justify-center font-sans selection:bg-[#dc2626]/20 p-4">
      <div className="bg-[#2a2f32] p-8 rounded-2xl border border-white/10 shadow-2xl max-w-sm w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-[#dc2626]" />
        <h2 className="text-2xl font-bold font-geist mb-2 tracking-tight">Security Check</h2>
        <p className="text-[#aeb1b4] text-sm mb-6">Enter your 6-digit passcode to access the CRM Dashboard.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className={`w-full bg-[#191c1e] border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-emerald-400 transition-colors`}
            placeholder=" /  /  /  /  /  / "
            autoFocus
          />
          {error && <span className="text-red-400 text-xs font-semibold">Incorrect Passcode. Try again.</span>}
          
          <button 
            type="submit"
            className="w-full bg-white text-[#191c1e] font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors mt-2"
          >
            Unlock Dashboard
          </button>
        </form>

        <button 
          onClick={handleReturnHome}
          className="mt-6 text-sm text-[#aeb1b4] hover:text-white transition-colors"
        >
          ← Return to Public Portfolio
        </button>
      </div>
    </div>
  );
};

