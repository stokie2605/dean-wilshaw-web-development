import React, { useState } from 'react';
import { Zap, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export function EngineScopeCalculator() {
  const [pages, setPages] = useState(5);
  const [leadInput, setLeadInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Derive scope tier from page count
  let tierLabel = 'Standard Business Site';
  let price: number | string = 2500;
  let delivery = '1-2 Week Delivery';

  if (pages === 1) {
    tierLabel = 'Landing Engine';
    price = 1250;
  } else if (pages >= 6) {
    tierLabel = 'Custom Web Platform';
    price = 'Custom';
    delivery = 'Custom Timeline';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadInput.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-900 overflow-hidden relative font-sans transition-colors duration-300">
      {/* Background glow (only visible in dark mode, or subtle in light) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 dark:bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl transition-colors">
            <span className="text-amber-500 animate-pulse">⚡</span>
            <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-widest">Demo: Custom Interactive React Tool</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-zinc-100 tracking-tight mb-6 transition-colors">
            Scope Your <span className="text-red-600 dark:text-red-500">React Build</span> Instantly
          </h2>
          <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium transition-colors">
            Drag the slider to define the size of your new high-performance engine.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800 p-6 md:p-10 rounded-2xl shadow-2xl transition-colors">
          
          {/* Slider */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-6">
              <label className="text-sm font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Number of Pages</label>
              <span className="text-3xl font-black text-slate-900 dark:text-zinc-100 transition-colors">
                {pages} {pages === 1 ? 'Page' : 'Pages'}
              </span>
            </div>
            <input 
              type="range" min="1" max="10" step="1"
              value={pages} onChange={(e) => setPages(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-zinc-400 mt-3 font-bold uppercase">
              <span>1 (Landing)</span>
              <span>10 (Full Platform)</span>
            </div>
          </div>

          <div className="w-full h-px bg-slate-200 dark:bg-zinc-800 my-8 transition-colors" />

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            
            {/* Left: Investment */}
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Build Investment</p>
              <p className="text-4xl md:text-5xl font-black text-slate-900 dark:text-zinc-100 mb-2 transition-colors">
                {typeof price === 'number' ? `£${price.toLocaleString()}` : price}
              </p>
              <p className="text-lg font-bold text-red-600 dark:text-emerald-400 transition-colors">{tierLabel}</p>
            </div>

            {/* Right: Guarantees */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl border border-slate-200 dark:border-zinc-800/50 transition-colors">
                <Clock className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Timeline</p>
                  <p className="font-bold text-slate-900 dark:text-zinc-100 text-lg transition-colors">{delivery}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl border border-slate-200 dark:border-zinc-800/50 transition-colors">
                <Zap className="w-6 h-6 text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Target Performance</p>
                  <p className="font-bold text-slate-900 dark:text-zinc-100 text-lg transition-colors">Sub-Second Mobile Speeds</p>
                </div>
              </div>
            </div>

          </div>

          {/* Lead Capture */}
          <div className="bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 transition-colors">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-2 text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-500 mb-2" />
                <h4 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Slot Requested</h4>
                <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">I'll be in touch shortly to confirm availability.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  required
                  placeholder="Email or WhatsApp Number" 
                  className="flex-grow bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-600 dark:focus:border-red-500 transition-colors"
                  value={leadInput}
                  onChange={(e) => setLeadInput(e.target.value)}
                />
                <button 
                  type="submit"
                  className="sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                >
                  Claim Your Build Slot <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
