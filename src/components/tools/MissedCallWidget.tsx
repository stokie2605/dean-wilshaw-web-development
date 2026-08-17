import React, { useState } from 'react';
import { useToolParams, getWhatsAppUrl } from '../../hooks/useToolParams';

const QUICK_OPTIONS = ['Emergency Repair / Callout', 'Ballpark Quote Request', 'Book an Inspection'];

export function MissedCallWidget() {
  const { phone, hasCustomPhone, biz, trade } = useToolParams();
  const [userPhone, setUserPhone] = useState('');

  const handleQuickChat = (reason: string) => {
    const targetPhone = hasCustomPhone ? phone : userPhone;
    const text = `Hi ${biz}, I need a quick quote for ${trade}: ${reason}. Are you available?`;
    window.open(getWhatsAppUrl(targetPhone, text), '_blank');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 text-slate-900 dark:text-white max-w-md w-full shadow-md space-y-4 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Owner currently on a job | Instant WhatsApp Reply</p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Need a fast quote from {biz}?</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Tap a quick option below to text the contractor directly:</p>
      </div>

      {!hasCustomPhone && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Enter your mobile to test on your phone:
          </label>
          <input
            type="tel"
            placeholder="e.g. 07123 456789"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        {QUICK_OPTIONS.map((item) => (
          <button
            key={item}
            onClick={() => handleQuickChat(item)}
            className="w-full text-left bg-slate-50 hover:bg-slate-100 dark:bg-zinc-950 dark:hover:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/60 p-3.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 flex justify-between items-center transition shadow-sm"
          >
            <span>{item}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">&gt;</span>
          </button>
        ))}
      </div>
    </div>
  );
}
