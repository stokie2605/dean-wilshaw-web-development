import React, { useState, useEffect } from 'react';
import { PhoneMissed, MessageSquare, Loader2 } from 'lucide-react';

export const MissedCallDemo: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'calling' | 'missed' | 'texting' | 'done'>('idle');

  useEffect(() => {
    let timer1: NodeJS.Timeout, timer2: NodeJS.Timeout, timer3: NodeJS.Timeout;
    
    if (status === 'calling') {
      timer1 = setTimeout(() => setStatus('missed'), 3000);
    } else if (status === 'missed') {
      timer2 = setTimeout(() => setStatus('texting'), 1500);
    } else if (status === 'texting') {
      timer3 = setTimeout(() => setStatus('done'), 2000);
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [status]);

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-md relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 border border-orange-200 dark:border-orange-500/20">
          <PhoneMissed className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Instant Missed-Call Auto-Text</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">Automatically text back customers who hit your voicemail so they don't hire someone else.</p>
        </div>
      </div>
      
      <div className="p-4 rounded-xl bg-slate-900 dark:bg-black border border-slate-800 dark:border-zinc-800 font-mono text-xs mb-6 h-32 flex flex-col justify-end relative shadow-inner">
        <div className="absolute top-2 left-2 flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
        </div>
        
        <div className="space-y-2 pt-6 text-slate-300">
          <div className="text-slate-500">[{new Date().toLocaleTimeString()}] Listening for missed calls...</div>
          
          {status !== 'idle' && (
            <div className="text-sky-400">» INCOMING CALL: 07700 900077</div>
          )}
          
          {(status === 'missed' || status === 'texting' || status === 'done') && (
            <div className="text-orange-400">» CALL STATUS: no-answer (Voicemail)</div>
          )}
          
          {status === 'texting' && (
            <div className="text-amber-400 flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              Dispatching automatic SMS...
            </div>
          )}
          
          {status === 'done' && (
            <div className="text-emerald-400">» SMS DELIVERED SUCCESSFULLY</div>
          )}
        </div>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${status === 'done' ? 'max-h-32 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl rounded-tl-none ml-2 max-w-[85%] relative">
          <MessageSquare className="w-3 h-3 absolute -top-2 -left-2 text-emerald-500 fill-white dark:fill-zinc-900" />
          <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
            "Hey! Thanks for calling. I'm currently with a client and couldn't answer. Reply to this text with a quick message about what you need and I'll get right back to you!"
          </p>
        </div>
      </div>

      <button
        onClick={() => setStatus('calling')}
        disabled={status !== 'idle' && status !== 'done'}
        className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {status === 'idle' || status === 'done' ? 'Simulate Missed Call' : 'Simulation Running...'}
      </button>
    </div>
  );
};
