import React, { useState } from 'react';
import { Settings, Save, Shield, Globe, Bell, Power, Server, Phone, Copy, Check, PhoneMissed, MessageSquare } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [isAcceptingClients, setIsAcceptingClients] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  // Voice-to-Quote State
  const [calloutFee, setCalloutFee] = useState("80.00");
  const [hourlyRate, setHourlyRate] = useState("65.00");
  const [minCharge, setMinCharge] = useState("1.0");
  const [partsMarkup, setPartsMarkup] = useState("20");
  const [outOfHours, setOutOfHours] = useState(true);
  
  const [copied, setCopied] = useState(false);
  const gsmCode = "**61*+447348733365**20#";

  const handleCopyGSM = () => {
    navigator.clipboard.writeText(gsmCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.href = '/';
  };

  const handleSave = () => {
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

            {/* Voice-to-Quote Infrastructure Card */}
            <div className="bg-[#2a2f32]/30 border border-[#D90429]/30 rounded-2xl p-6 shadow-[0_0_15px_rgba(217,4,41,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="px-2 py-1 rounded bg-[#D90429]/10 text-[#D90429] border border-[#D90429]/20 font-mono text-[10px] font-bold uppercase tracking-widest">
                  AI Active
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <PhoneMissed className="w-5 h-5 text-[#D90429]" />
                <h3 className="text-lg font-bold">Automated Call Quoting &amp; Lead Matrix</h3>
              </div>
              
              <div className="space-y-8">
                
                {/* Calibration Inputs */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Pricing Calibration Engine</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#aeb1b4] font-medium">Base Callout (£)</label>
                      <input 
                        type="number" 
                        value={calloutFee}
                        onChange={(e) => setCalloutFee(e.target.value)}
                        className="w-full bg-[#191c1e] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D90429] transition-colors font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#aeb1b4] font-medium">Hourly Rate (£)</label>
                      <input 
                        type="number" 
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        className="w-full bg-[#191c1e] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D90429] transition-colors font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#aeb1b4] font-medium">Min Charge (Hrs)</label>
                      <input 
                        type="number" 
                        value={minCharge}
                        step="0.5"
                        onChange={(e) => setMinCharge(e.target.value)}
                        className="w-full bg-[#191c1e] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D90429] transition-colors font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#aeb1b4] font-medium">Parts Markup (%)</label>
                      <input 
                        type="number" 
                        value={partsMarkup}
                        onChange={(e) => setPartsMarkup(e.target.value)}
                        className="w-full bg-[#191c1e] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D90429] transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-y border-white/5">
                  <div>
                    <h4 className="font-medium text-white text-sm mb-0.5">Out of Hours Multiplier (+50%)</h4>
                    <p className="text-xs text-[#aeb1b4]">Automatically apply surge pricing for weekend/evening transcripts.</p>
                  </div>
                  <button 
                    onClick={() => setOutOfHours(!outOfHours)}
                    className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ${outOfHours ? 'bg-[#D90429]' : 'bg-[#191c1e] border border-white/20'}`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[2px] transition-transform ${outOfHours ? 'left-[22px]' : 'left-[3px]'}`}></div>
                  </button>
                </div>

                {/* Carrier Routing Helper */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">Carrier Forwarding</h4>
                  <p className="text-xs text-[#aeb1b4] mb-3">Dial this GSM code to forward missed calls (after 20s) to the AI interceptor.</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow bg-[#191c1e] border border-white/10 rounded-lg px-4 py-2.5 font-mono text-emerald-400 text-sm tracking-wide">
                      {gsmCode}
                    </div>
                    <button 
                      onClick={handleCopyGSM}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Lead Stream Table */}
                <div className="pt-2">
                  <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Incoming Voice Lead Stream (Recent)</h4>
                  <div className="bg-[#191c1e] border border-white/5 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 text-[#aeb1b4] font-medium border-b border-white/10">
                        <tr>
                          <th className="px-4 py-3">Time</th>
                          <th className="px-4 py-3">Transcription Snapshot</th>
                          <th className="px-4 py-3">Quote Bracket</th>
                          <th className="px-4 py-3 text-right">SMS Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-zinc-300">
                        <tr className="hover:bg-white/[0.02]">
                          <td className="px-4 py-3 font-mono text-zinc-500 whitespace-nowrap">10:42 AM</td>
                          <td className="px-4 py-3 max-w-[200px] truncate">"Hi mate, got a leak under the kitchen sink..."</td>
                          <td className="px-4 py-3 font-mono text-emerald-400">£145 - £175</td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex items-center justify-end gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-medium">
                              <Check className="w-3 h-3" /> Delivered
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-white/[0.02]">
                          <td className="px-4 py-3 font-mono text-zinc-500 whitespace-nowrap">09:15 AM</td>
                          <td className="px-4 py-3 max-w-[200px] truncate">"Need a radiator swapped in the living room..."</td>
                          <td className="px-4 py-3 font-mono text-emerald-400">£80 - £120</td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex items-center justify-end gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-medium">
                              <Check className="w-3 h-3" /> Delivered
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-white/[0.02]">
                          <td className="px-4 py-3 font-mono text-zinc-500 whitespace-nowrap">Yesterday</td>
                          <td className="px-4 py-3 max-w-[200px] truncate">"Just enquiring about a full rewire for a..."</td>
                          <td className="px-4 py-3 font-mono text-zinc-400">Requires Survey</td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex items-center justify-end gap-1 text-zinc-400 bg-zinc-500/10 px-2 py-0.5 rounded font-medium">
                              <MessageSquare className="w-3 h-3" /> Triage Link
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
