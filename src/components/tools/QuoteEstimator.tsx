import React, { useState } from 'react';
import { useToolParams, getWhatsAppUrl } from '../../hooks/useToolParams';

export function QuoteEstimator() {
  const { phone, hasCustomPhone, biz, trade } = useToolParams();
  const [serviceType, setServiceType] = useState('Standard Repair');
  const [size, setSize] = useState('Medium');
  const [userPhone, setUserPhone] = useState('');

  const pricingMap: Record<string, Record<string, number>> = {
    'Small Job / Minor Repair': { Small: 120, Medium: 180, Large: 250 },
    'Standard Repair': { Small: 250, Medium: 450, Large: 750 },
    'Full Installation / Replacement': { Small: 850, Medium: 1500, Large: 2800 },
  };

  const estimatedPrice = pricingMap[serviceType]?.[size] || 350;

  const handleSendWhatsApp = () => {
    const targetPhone = hasCustomPhone ? phone : userPhone;
    const message = `Hi ${biz}, I got an online estimate for ${trade} (${serviceType} - ${size} size) for approx £${estimatedPrice}. Can you provide a formal quote?`;
    window.open(getWhatsAppUrl(targetPhone, message), '_blank');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 text-slate-900 dark:text-white max-w-md w-full shadow-md transition-colors">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3 mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">{biz}</h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Instant {trade} Estimate</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
          >
            <option>Small Job / Minor Repair</option>
            <option>Standard Repair</option>
            <option>Full Installation / Replacement</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Property / Project Size</label>
          <div className="grid grid-cols-3 gap-2">
            {['Small', 'Medium', 'Large'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`py-2 text-xs font-semibold rounded-xl border transition ${
                  size === s
                    ? 'bg-red-50 dark:bg-red-950/30 border-red-500 text-red-600 dark:text-red-400 font-bold'
                    : 'bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 text-center shadow-inner">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Guide Price Range</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            &pound;{estimatedPrice} - &pound;{Math.round(estimatedPrice * 1.25)}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-zinc-500 mt-1">Guideline only | Final price confirmed on inspection</p>
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

        <button
          onClick={handleSendWhatsApp}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition shadow-lg shadow-emerald-600/20"
        >
          <span>Send Estimate on WhatsApp</span>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
