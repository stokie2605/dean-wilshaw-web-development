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
    <div className="bg-[#0f1218] border border-slate-800 rounded-xl p-5 text-white max-w-md w-full shadow-xl">
      <h3 className="font-bold text-lg text-white">{biz}</h3>
      <p className="text-xs text-red-400 font-medium mb-4">{trade} Area &amp; Cost Calculator</p>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Length (metres)</span>
            <span className="text-white font-bold">{length}m</span>
          </div>
          <input
            type="range" min="2" max="25" value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Width (metres)</span>
            <span className="text-white font-bold">{width}m</span>
          </div>
          <input
            type="range" min="2" max="15" value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Material / Finish Tier</label>
          <select
            value={materialRate}
            onChange={(e) => setMaterialRate(Number(e.target.value))}
            className="w-full bg-[#0a0d14] border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
          >
            <option value={45}>Standard / Budget Grade (~£45/m²)</option>
            <option value={65}>Premium Grade (~£65/m²)</option>
            <option value={95}>Deluxe / Heavy Duty (~£95/m²)</option>
          </select>
        </div>

        <div className="bg-[#0a0d14] border border-slate-800/80 rounded-lg p-3 flex justify-between items-center">
          <div>
            <p className="text-[11px] text-slate-400">Total Area</p>
            <p className="text-base font-bold text-white">{area} m²</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400">Estimated Cost</p>
            <p className="text-xl font-extrabold text-red-400">&pound;{estimatedTotal}</p>
          </div>
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

        <button
          onClick={handleSend}
          className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm transition shadow-lg shadow-red-600/20"
        >
          <span>Send Specs on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
