import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToolParams, getWhatsAppUrl } from '../../hooks/useToolParams';
import { Sparkles, MessageSquare, Sliders } from 'lucide-react';

const COMPLEXITY_LEVELS = [
  { level: 1, label: 'Minor Repair', factor: 1.0, desc: 'Quick fix, single component' },
  { level: 2, label: 'Standard Fix', factor: 1.8, desc: 'Standard diagnostic & parts replacement' },
  { level: 3, label: 'Major Overhaul', factor: 3.2, desc: 'Extensive system overhaul' },
  { level: 4, label: 'Full Installation', factor: 5.5, desc: 'Complete high-spec system upgrade' },
];

const SIZE_TIERS = [
  { id: 'Small', label: '1-2 Bed / Small', base: 140 },
  { id: 'Medium', label: '3-4 Bed / Standard', base: 220 },
  { id: 'Large', label: '5+ Bed / Heavy', base: 340 },
];

export function QuoteEstimator() {
  const { phone, hasCustomPhone, biz, trade } = useToolParams();
  const [complexityIndex, setComplexityIndex] = useState(1); // 0 to 3
  const [size, setSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [userPhone, setUserPhone] = useState('');

  const currentComplexity = COMPLEXITY_LEVELS[complexityIndex];
  const currentSize = SIZE_TIERS.find((s) => s.id === size) || SIZE_TIERS[1];

  const basePrice = Math.round(currentSize.base * currentComplexity.factor);
  const maxPrice = Math.round(basePrice * 1.25);

  const handleSendWhatsApp = () => {
    if (!hasCustomPhone && !userPhone.trim()) return;
    const targetPhone = hasCustomPhone ? phone : userPhone;
    const message = `Hi ${biz}, I configured an online estimate for ${trade} (${currentComplexity.label}, ${size} property): £${basePrice} - £${maxPrice}. Can you provide a formal booking quote?`;
    window.open(getWhatsAppUrl(targetPhone, message), '_blank');
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5 text-slate-900 dark:text-white">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D90429] animate-pulse"></div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            {trade} Cost Gauge
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 uppercase">
          Live Dynamic Rate
        </span>
      </div>

      {/* 1. Job Complexity Tactile Slider Track */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#D90429]" />
            Job Scope &amp; Complexity
          </span>
          <span className="font-mono font-bold text-[#D90429]">
            {currentComplexity.label}
          </span>
        </div>

        {/* Custom Range Slider Track */}
        <div className="relative py-1">
          <input
            type="range"
            min={0}
            max={3}
            step={1}
            value={complexityIndex}
            onChange={(e) => setComplexityIndex(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#D90429] focus:outline-none"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-zinc-500 mt-1 px-1">
            <span>Minor</span>
            <span>Standard</span>
            <span>Major</span>
            <span>Full Install</span>
          </div>
        </div>
      </div>

      {/* 2. Property Size Segmented Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
          Property / Project Scale
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SIZE_TIERS.map((s) => (
            <motion.button
              key={s.id}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setSize(s.id as any)}
              className={`py-2.5 px-3 text-xs rounded-xl font-medium transition-all ${
                size === s.id
                  ? 'bg-[#D90429] text-white shadow-md shadow-red-600/20 font-bold'
                  : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {s.id}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 3. Illuminated Readout Display */}
      <div className="relative p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center overflow-hidden shadow-xl transition-colors duration-300">
        {/* Subtle Ambient Glow in dark mode */}
        <div className="hidden dark:block absolute inset-0 bg-radial from-[#D90429]/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
            Estimated Cost Range
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${basePrice}-${maxPrice}`}
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_20px_rgba(217,4,41,0.35)]"
            >
              £{basePrice} <span className="text-zinc-400 dark:text-zinc-500 font-light text-2xl">-</span> £{maxPrice}
            </motion.div>
          </AnimatePresence>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono pt-1">
            Includes standard parts &amp; certified trade labour
          </div>
        </div>
      </div>

      {/* 4. Phone Input & WhatsApp Send Action */}
      {!hasCustomPhone && (
        <div className="space-y-1">
          <input
            type="tel"
            placeholder="Enter your phone number (e.g. 07123 456789)"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="w-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl p-2.5 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#D90429]"
          />
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleSendWhatsApp}
        className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm transition shadow-lg shadow-[#25D366]/20 font-mono"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span>Send Instant Estimate via WhatsApp</span>
      </motion.button>

    </div>
  );
}

