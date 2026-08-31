import React, { useState } from 'react';
import { useToolParams, getWhatsAppUrl } from '../../hooks/useToolParams';

export function AreaCalculator() {
  const { phone, hasCustomPhone, biz, trade } = useToolParams();
  const [length, setLength] = useState(6);
  const [width, setWidth] = useState(4);
  const [materialRate, setMaterialRate] = useState(65);
  const [userPhone, setUserPhone] = useState('');

  const area = length * width;
  const estimatedTotal = area * materialRate;

  const handleSend = () => {
    const targetPhone = hasCustomPhone ? phone : userPhone;
    const message = `Hi ${biz}, I used your ${trade} calculator for an area of ${area}m² (${length}m x ${width}m). Ballpark estimate: £${estimatedTotal}. Could you provide a formal quote?`;
    window.open(getWhatsAppUrl(targetPhone, message), '_blank');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 text-slate-900 dark:text-white max-w-md w-full shadow-md transition-colors">
      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{biz}</h3>
      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-4">{trade} Area &amp; Cost Calculator</p>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium">
            <span>Length (metres)</span>
            <span className="text-slate-900 dark:text-white font-bold">{length}m</span>
          </div>
          <input
            type="range" min="2" max="25" value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium">
            <span>Width (metres)</span>
            <span className="text-slate-900 dark:text-white font-bold">{width}m</span>
          </div>
          <input
            type="range" min="2" max="15" value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Material / Finish Tier</label>
          <select
            value={materialRate}
            onChange={(e) => setMaterialRate(Number(e.target.value))}
            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
          >
            <option value={45}>Standard / Budget Grade (~£45/m²)</option>
            <option value={65}>Premium Grade (~£65/m²)</option>
            <option value={95}>Deluxe / Heavy Duty (~£95/m²)</option>
          </select>
        </div>

        <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 text-center shadow-inner">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Calculated Area &amp; Estimate</p>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">{area} m&sup2; Total Coverage</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            &pound;{estimatedTotal.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-zinc-500 mt-1">Guideline only | Materials &amp; labour included</p>
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
          onClick={handleSend}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition shadow-lg shadow-emerald-600/20"
        >
          <span>Request Quote for {area}m&sup2;</span>
        </button>
      </div>
    </div>
  );
}

