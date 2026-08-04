import React, { useState } from 'react';
import { Settings, Save, Shield, Globe, Bell, Power, Server } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [isAcceptingClients, setIsAcceptingClients] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.href = '/';
  };

  const handleSave = () => {
    // In a real app, this would hit an API endpoint
    alert("Configuration saved successfully.");
  };

  return (
    <div className="min-h-screen bg-[#191c1e] text-white font-sans selection:bg-[#dc2626]/20 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-white/10 bg-[#2a2f32]/50 backdrop-blur-md sticky top-0 z-30 flex-shrink-0">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-400 to-[#dc2626] flex items-center justify-center shadow-lg">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-geist font-bold text-xl tracking-tight">Site Configuration</h1>
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
      <main className="flex-grow max-w-[800px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col">
        <div className="w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold font-geist tracking-tight mb-2">Portfolio Settings</h2>
              <p className="text-[#aeb1b4]">Manage your site status and system preferences.</p>
            </div>
            <button 
              onClick={handleSave}
              className="bg-[#dc2626] hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-red-500/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
          
          {/* Configuration Grid */}
          <div className="space-y-6">
            
            {/* Status Card */}
            <div className="bg-[#2a2f32]/30 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <Globe className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold">Public Status</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white mb-1">Accepting New Clients</h4>
                    <p className="text-sm text-[#aeb1b4]">Toggle the visibility of your Quote Form and WhatsApp CTAs.</p>
                  </div>
                  <button 
                    onClick={() => setIsAcceptingClients(!isAcceptingClients)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${isAcceptingClients ? 'bg-emerald-500' : 'bg-[#191c1e] border border-white/20'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${isAcceptingClients ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white mb-1">Maintenance Mode</h4>
                    <p className="text-sm text-[#aeb1b4]">Temporarily hide the portfolio behind a "Coming Soon" screen.</p>
                  </div>
                  <button 
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${maintenanceMode ? 'bg-[#dc2626]' : 'bg-[#191c1e] border border-white/20'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${maintenanceMode ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            {/* System Card */}
            <div className="bg-[#2a2f32]/30 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <Server className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold">System Configuration</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white mb-1">Email Forwarding</h4>
                    <p className="text-sm text-[#aeb1b4]">Route all Resend quote submissions to your primary inbox.</p>
                  </div>
                  <button 
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifications ? 'bg-blue-500' : 'bg-[#191c1e] border border-white/20'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${emailNotifications ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
