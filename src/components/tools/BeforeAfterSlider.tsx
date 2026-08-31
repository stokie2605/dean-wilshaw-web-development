import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToolParams, getWhatsAppUrl } from '../../hooks/useToolParams';

const DEFAULT_BEFORE = 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80';
const DEFAULT_AFTER  = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80';

export function BeforeAfterSlider() {
  const [searchParams] = useSearchParams();
  const { phone, hasCustomPhone, biz, trade } = useToolParams();
  const [sliderPos, setSliderPos] = useState(50);
  const [userPhone, setUserPhone] = useState('');

  const beforeImg = searchParams.get('before') || DEFAULT_BEFORE;
  const afterImg  = searchParams.get('after')  || DEFAULT_AFTER;

  const handleSend = () => {
    const targetPhone = hasCustomPhone ? phone : userPhone;
    const msg = `Hi ${biz}, I saw your before & after showcase for ${trade}. Could I get a quote for a similar project?`;
    window.open(getWhatsAppUrl(targetPhone, msg), '_blank');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 text-slate-900 dark:text-white max-w-md w-full shadow-md space-y-4 transition-colors">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">{biz} Transformation</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Drag slider to compare</span>
      </div>

      <div className="relative w-full h-64 rounded-xl overflow-hidden select-none border border-slate-200 dark:border-zinc-800 shadow-inner">
        <img src={afterImg} alt="After work" className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImg}
            alt="Before work"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ minWidth: '100%' }}
          />
        </div>
        <div
          className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        />
        <input
          type="range" min="0" max="100" value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
        <span className="absolute top-2 left-2 bg-slate-900/80 text-white px-2.5 py-1 rounded-md text-[10px] font-bold pointer-events-none">BEFORE</span>
        <span className="absolute top-2 right-2 bg-emerald-700/80 text-white px-2.5 py-1 rounded-md text-[10px] font-bold pointer-events-none">AFTER</span>
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
        <span>Request Quote for This Quality</span>
      </button>
    </div>
  );
}

