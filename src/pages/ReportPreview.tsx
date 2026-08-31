import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Zap, Smartphone, ArrowRight } from 'lucide-react';

export function ReportPreview() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the report data
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [slug]);

  const businessName = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Your Business';
  
  // Use a simulated score since it's a preview shell
  const score = 32;
  
  const calculateEnquiryLoss = (auditScore: number) => {
    if (auditScore >= 90) return { status: 'Optimized', range: null };
    if (auditScore >= 50) return { status: 'At Risk', range: '4-7' };
    return { status: 'Critical', range: '8-12' };
  };
  const { range } = calculateEnquiryLoss(score);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-rose-500/30 relative pb-24">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0B0F17] p-6 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Speed Fix Report</h1>
              <p className="text-xs text-slate-400">Dean Wilshaw Web Studio</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto p-6 pt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-6">
            <div className="w-16 h-16 border-4 border-slate-800 border-t-rose-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-medium animate-pulse">Running live mobile audit for {businessName}...</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-10 text-center">
              <h2 className="text-sm font-bold text-rose-500 uppercase tracking-widest mb-3">Live Audit Results</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-4">{businessName}</h3>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                We detected severe mobile load bottlenecks that are causing potential customers to bounce back to Google.
              </p>
            </div>

            {/* Simulated Score Card */}
            <div className="bg-[#0B0F17] rounded-3xl border border-slate-800 p-8 shadow-2xl mb-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
               
               <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                 {/* Score */}
                 <div className="relative w-40 h-40 flex flex-col items-center justify-center bg-[#161B22] rounded-full border-2 border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.2)] flex-shrink-0 mx-auto md:mx-0">
                   <div className="text-5xl font-black text-rose-500 mb-1">{score}</div>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">/100</div>
                 </div>

                 {/* Stats */}
                 <div className="flex-1 space-y-4">
                   {range && (
                     <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl flex items-center justify-between shadow-sm mb-4">
                       <div>
                         <div className="text-rose-400 font-bold mb-1">Enquiry Loss Volume</div>
                         <div className="text-slate-400 text-xs font-medium">Due to mobile drop-off rates</div>
                       </div>
                       <div className="text-xl font-black text-rose-500 drop-shadow-sm">Est. {range} Missed Enquiries/mo</div>
                     </div>
                   )}
                   <div className="flex items-start gap-4 bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                     <Clock className="w-6 h-6 text-rose-400 flex-shrink-0 mt-1" />
                     <div>
                       <h4 className="font-bold text-slate-200">First Contentful Paint: 4.2s</h4>
                       <p className="text-sm text-slate-400 mt-1">Visitors stare at a blank screen for over 4 seconds before your site loads.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-4 bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                     <Smartphone className="w-6 h-6 text-rose-400 flex-shrink-0 mt-1" />
                     <div>
                       <h4 className="font-bold text-slate-200">Heavy Layout Shifts</h4>
                       <p className="text-sm text-slate-400 mt-1">Elements jump around as they load, causing accidental clicks and frustration.</p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            {/* The Pitch */}
            <div className="bg-[#0B0F17] rounded-3xl border border-slate-800 p-8 text-center relative overflow-hidden mt-8">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-white">Stop Losing Leads to Competitors</h3>
                <p className="text-slate-400 mb-0 leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
                  A 1-second delay in mobile load times can drop conversions by up to 20%. I build ultra-fast, independent React applications tailored for local tradesmen. They load instantly, rank higher, and turn bounces into booked jobs.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 z-50 animate-in slide-in-from-bottom-full duration-500">
        <div className="max-w-3xl mx-auto flex justify-center">
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(244,63,94,0.2)] hover:shadow-[0_0_50px_rgba(244,63,94,0.4)] flex items-center justify-center gap-3 hover:-translate-y-1"
          >
            Book a 10-Min Speed Fix <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

