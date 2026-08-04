import React, { useState } from 'react';
import { Mail, Search, Star, Archive, Inbox, Clock, CheckCircle2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'archived'>('inbox');
  
  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.href = '/';
  };

  // Mock data for the UI
  const enquiries = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      company: 'Jenkins Plumbing & Heating',
      email: 'sarah@jenkinsplumbing.co.uk',
      date: '2 hours ago',
      status: 'new',
      type: 'Business Site',
      subject: 'Need a new website for our plumbing business',
      preview: 'Hi Dean, we currently have a WordPress site that is very slow and we are losing customers. Looking for a quote for a new fast site.'
    },
    {
      id: 2,
      name: 'Mark Davies',
      company: 'Davies Roofing Solutions',
      email: 'mark@daviesroofing.com',
      date: 'Yesterday',
      status: 'read',
      type: 'Custom App / Dashboard',
      subject: 'Quote for a custom quoting dashboard',
      preview: 'I saw your work and would love to discuss building a custom portal for our roofers to generate quotes on the go.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#191c1e] text-white font-sans selection:bg-[#dc2626]/20 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-white/10 bg-[#2a2f32]/50 backdrop-blur-md sticky top-0 z-30 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-400 to-[#dc2626] flex items-center justify-center shadow-lg">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-geist font-bold text-xl tracking-tight">Owner Admin Panel</h1>
          </div>
          
          <div className="flex items-center gap-2 bg-[#191c1e] p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${activeTab === 'inbox' ? 'bg-[#2a2f32] text-white shadow-sm' : 'text-[#aeb1b4] hover:text-white hover:bg-white/5'}`}
            >
              <Inbox className="w-4 h-4" />
              Inbox (2)
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${activeTab === 'archived' ? 'bg-[#2a2f32] text-white shadow-sm' : 'text-[#aeb1b4] hover:text-white hover:bg-white/5'}`}
            >
              <Archive className="w-4 h-4" />
              Archived
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
      <main className="flex-grow max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        <div className="w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold font-geist tracking-tight mb-2">Contact Enquiries</h2>
              <p className="text-[#aeb1b4]">Review messages submitted through your portfolio quote form.</p>
            </div>
            
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search enquiries..." 
                className="w-full bg-[#2a2f32] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#dc2626] transition-colors text-white placeholder-slate-400"
              />
            </div>
          </div>
          
          {/* Inbox List */}
          <div className="bg-[#2a2f32]/30 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            {enquiries.length > 0 ? (
              <div className="divide-y divide-white/5">
                {enquiries.map((enquiry) => (
                  <div key={enquiry.id} className={`p-6 transition-colors hover:bg-white/5 flex gap-6 cursor-pointer group ${enquiry.status === 'new' ? 'bg-[#dc2626]/5' : ''}`}>
                    
                    {/* Status Indicator */}
                    <div className="flex-shrink-0 pt-1">
                      {enquiry.status === 'new' ? (
                        <div className="w-3 h-3 rounded-full bg-[#dc2626] shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[#aeb1b4]" />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-3">
                          <h3 className={`text-base truncate ${enquiry.status === 'new' ? 'font-bold text-white' : 'font-medium text-slate-200'}`}>
                            {enquiry.name} <span className="text-slate-400 font-normal">({enquiry.company})</span>
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-medium text-slate-300">
                            {enquiry.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          {enquiry.date}
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-medium text-slate-200 mb-2 truncate">{enquiry.subject}</h4>
                      <p className="text-sm text-[#aeb1b4] line-clamp-2 leading-relaxed">
                        {enquiry.preview}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex-shrink-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors tooltip" title="Star">
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors tooltip" title="Archive">
                        <Archive className="w-4 h-4" />
                      </button>
                    </div>
                    
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Inbox className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No new enquiries</h3>
                <p className="text-[#aeb1b4]">When visitors fill out your quote form, they'll appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
