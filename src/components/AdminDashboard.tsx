import React from 'react';
import { ProspectTable } from './ProspectTable';
import { LayoutDashboard } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#191c1e] text-white font-sans selection:bg-[#dc2626]/20 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-white/10 bg-[#2a2f32]/50 backdrop-blur-md sticky top-0 z-30 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-400 to-[#dc2626] flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="font-geist font-bold text-xl tracking-tight">Outreach CRM</h1>
          </div>
          
          <div className="flex items-center gap-2 bg-[#191c1e] p-1 rounded-lg border border-white/10">
            <button
              className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-colors bg-[#2a2f32] text-white shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              Lead Pipeline
            </button>
          </div>

          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-[#aeb1b4] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            Lock & Exit
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="mb-6">
            <h2 className="text-3xl font-bold font-geist tracking-tight mb-2">Lead Pipeline</h2>
            <p className="text-[#aeb1b4]">Manage your outbound video pitches and track conversions.</p>
          </div>
          <ProspectTable />
        </div>
      </main>
    </div>
  );
};
