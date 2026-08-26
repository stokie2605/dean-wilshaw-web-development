import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, MapPin, Award, CheckCircle2, Flame, Zap, Home } from 'lucide-react';

export const SocialProofBanner: React.FC = () => {
  const [selectedTrade, setSelectedTrade] = useState<'gas' | 'electrician' | 'roofer'>('gas');

  const tradeData = {
    gas: {
      tradeName: 'Gas & Heating Specialist',
      accreditation: 'Gas Safe Registered (#629144)',
      location: 'Cheshire & Stoke-on-Trent (ST7)',
      reviews: 142,
      insurance: '£2M Public Liability Insured',
      guarantee: '10-Year Boiler Parts & Labour Warranty',
      icon: Flame
    },
    electrician: {
      tradeName: 'Approved Electrical Contractor',
      accreditation: 'NICEIC Approved Contractor (#04821)',
      location: 'South Cheshire & ST Postcodes',
      reviews: 186,
      insurance: '£5M Public Liability Insured',
      guarantee: '6-Year Platinum Workmanship Promise',
      icon: Zap
    },
    roofer: {
      tradeName: 'Roofing & Storm Specialist',
      accreditation: 'Checkatrade Verified & CORC Registered',
      location: 'Staffordshire & South Cheshire',
      reviews: 215,
      insurance: 'Fully Insured Workmanship',
      guarantee: '25-Year Roof Integrity Guarantee',
      icon: Home
    }
  };

  const current = tradeData[selectedTrade];
  const IconComponent = current.icon;

  return (
    <div className="w-full max-w-md mx-auto space-y-5 text-slate-900 dark:text-white">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Real-Time Trust Verification Strip
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 uppercase">
          Live Status
        </span>
      </div>

      {/* High-Contrast Open Metric Strip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTrade}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {/* Main 5-Star Reputation Bar */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-black/70 border border-slate-200 dark:border-white/[0.08] flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2.5">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                5.0 Rating
              </span>
            </div>
            <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">
              ({current.reviews} Verified Reviews)
            </span>
          </div>

          {/* 3 Metric Verification Cards */}
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{current.accreditation}</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Official Badge</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{current.insurance}</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Active Policy</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{current.guarantee}</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Written Cover</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Interactive Switcher */}
      <div className="space-y-1.5 pt-1">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 text-center">
          Switch Trade Perspective:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: 'gas', label: 'Gas Engineer' },
            { key: 'electrician', label: 'Electrician' },
            { key: 'roofer', label: 'Roofer' }
          ].map(({ key, label }) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setSelectedTrade(key as any)}
              className={`py-1.5 px-2 text-xs font-mono rounded-full transition-all ${
                selectedTrade === key
                  ? 'bg-[#D90429] text-white font-bold shadow-sm'
                  : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-zinc-400 dark:hover:text-white font-medium'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

    </div>
  );
};
