import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneMissed, MessageSquare, Loader2, ExternalLink } from 'lucide-react';

export const MissedCallDemo: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'calling' | 'missed' | 'texting' | 'done'>('idle');

  useEffect(() => {
    let timer1: NodeJS.Timeout, timer2: NodeJS.Timeout, timer3: NodeJS.Timeout;
    
    if (status === 'calling') {
      timer1 = setTimeout(() => setStatus('missed'), 2500);
    } else if (status === 'missed') {
      timer2 = setTimeout(() => setStatus('texting'), 1200);
    } else if (status === 'texting') {
      timer3 = setTimeout(() => setStatus('done'), 1800);
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [status]);

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-[#0A0D14] border border-zinc-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-500 border border-orange-200 dark:border-orange-500/20 shrink-0">
          <PhoneMissed className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
            Instant Missed-Call Auto-Text
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-snug">
            Automatically text back customers who hit your voicemail so they don't hire someone else.
          </p>
        </div>
      </div>
      
      {/* Terminal Window Simulation */}
      <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.08] font-mono text-xs mb-4 min-h-[140px] flex flex-col justify-between shadow-inner">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-zinc-500 font-mono">status: live listener</span>
        </div>
        
        {/* Terminal Logs */}
        <div className="space-y-1.5 pt-2 text-zinc-300">
          <div className="text-zinc-600 text-[11px]">
            [{new Date().toLocaleTimeString()}] listening on direct trade SIM...
          </div>
          
          {status !== 'idle' && (
            <div className="text-sky-400 text-[11px]">» INCOMING CALL: 07700 900077</div>
          )}
          
          {(status === 'missed' || status === 'texting' || status === 'done') && (
            <div className="text-orange-400 text-[11px]">» CALL STATUS: no-answer (Voicemail)</div>
          )}
          
          {status === 'texting' && (
            <div className="text-amber-400 flex items-center gap-2 text-[11px]">
              <Loader2 className="w-3 h-3 animate-spin" />
              [SMS Dispatching in 3s -&gt; Customer Mobile]...
            </div>
          )}
          
          {status === 'done' && (
            <div className="text-emerald-400 font-semibold text-[11px]">
              » [SMS Delivered]: &ldquo;Hi, sorry I missed your call, I'm currently on a job. How can I help?&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* Pop-in SMS Preview */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${status === 'done' ? 'max-h-24 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl rounded-tl-none ml-2 relative shadow-sm">
          <MessageSquare className="w-3.5 h-3.5 absolute -top-2 -left-2 text-emerald-500 fill-white dark:fill-zinc-900" />
          <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
            &ldquo;Hi, sorry I missed your call, I'm currently on a job. How can I help?&rdquo;
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => setStatus('calling')}
        disabled={status !== 'idle' && status !== 'done'}
        className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-[0.98]"
      >
        {status === 'idle' || status === 'done' ? 'Simulate Missed Call' : 'Simulation Running...'}
      </button>

      {/* Integrated Docked Footer Link */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
        <span className="text-[11px]">Capture 100% of missed leads</span>
        <button
          type="button"
          onClick={() => navigate('/simulator')}
          className="inline-flex items-center gap-1 font-bold text-slate-900 dark:text-white hover:text-[#D90429] dark:hover:text-[#D90429] transition-colors uppercase tracking-wider text-[11px]"
        >
          <span>EXPLORE THE GENERATOR</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
};

