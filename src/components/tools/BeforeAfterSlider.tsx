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
    <div className="bg-[#0f1218] border border-slate-800 rounded-xl p-5 text-white max-w-md w-full shadow-xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-sm text-white">{biz} Transformation</h3>
        <span className="text-[11px] text-slate-400">Drag to compare</span>
      </div>

      <div className="relative w-full h-64 rounded-lg overflow-hidden select-none">
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
          className="absolute inset-y-0 w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        />
        <input
          type="range" min="0" max="100" value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
        <span className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 pointer-events-none">BEFORE</span>
        <span className="absolute top-2 right-2 bg-red-950/80 border border-red-500/50 px-2 py-0.5 rounded text-[10px] font-bold text-red-300 pointer-events-none">AFTER</span>
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
        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition shadow-lg shadow-red-600/20"
      >
        Enquire on WhatsApp
      </button>
    </div>
  );
}
