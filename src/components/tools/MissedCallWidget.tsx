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
    <div className="bg-[#0f1218] border border-slate-800 rounded-xl p-5 text-white max-w-md w-full shadow-xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
        <p className="text-xs font-bold text-emerald-400">Owner currently on a job | Instant WhatsApp Reply</p>
      </div>

      <div>
        <h3 className="font-bold text-base text-white mb-1">Need a fast quote from {biz}?</h3>
        <p className="text-xs text-slate-400">Tap a quick option below to text the contractor directly:</p>
      </div>

      {!hasCustomPhone && (
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Enter your mobile to test on your phone:
          </label>
          <input
            type="tel"
            placeholder="e.g. 07123 456789"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="w-full bg-[#0a0d14] border border-slate-700 rounded-lg p-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        {QUICK_OPTIONS.map((item) => (
          <button
            key={item}
            onClick={() => handleQuickChat(item)}
            className="w-full text-left bg-[#0a0d14] hover:bg-slate-800 border border-slate-700 p-3 rounded-lg text-xs font-medium text-slate-200 flex justify-between items-center transition"
          >
            <span>{item}</span>
            <span className="text-red-400 font-bold">&gt;</span>
          </button>
        ))}
      </div>
    </div>
  );
}
