import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, Award, CheckCircle, Flame, Zap, Home } from 'lucide-react';

export const SocialProofBanner: React.FC = () => {
  const [selectedTrade, setSelectedTrade] = useState<'gas' | 'electrician' | 'roofer'>('gas');

  const tradeData = {
    gas: {
      title: 'Gas & Heating Specialists',
      accreditation: 'Gas Safe Registered (#629144)',
      accredColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      location: 'Cheshire & Stoke',
      reviews: 142,
      insurance: '£2m Public Liability Insured',
      guarantee: '10-Year Boiler Warranty',
      icon: Flame
    },
    electrician: {
      title: 'Approved Electrical Contractors',
      accreditation: 'NICEIC Approved Contractor',
      accredColor: 'text-sky-500 bg-sky-500/10 border-sky-500/30',
      location: 'South Cheshire & ST Postcodes',
      reviews: 186,
      insurance: '£5m Public Liability Insured',
      guarantee: '6-Year Platinum Promise',
      icon: Zap
    },
    roofer: {
      title: 'Roofing & Storm Specialists',
      accreditation: 'Checkatrade Verified & Confederation of Roofing',
      accredColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      location: 'Staffordshire & Cheshire',
      reviews: 215,
      insurance: 'Fully Insured Workmanship',
      guarantee: '25-Year Roof Guarantee',
      icon: Home
    }
  };

  const current = tradeData[selectedTrade];
  const IconComponent = current.icon;

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      
      {/* Mobile Browser Frame Preview */}
      <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-4 shadow-sm space-y-3 overflow-hidden">
        
        {/* Browser Top Chrome Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800/80 text-[10px] text-slate-400 font-mono">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <span>mobile-preview.co.uk</span>
        </div>

        {/* 1. Dynamic Sticky Top Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs shadow-inner">
          
          {/* Rating Pill */}
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-slate-900 dark:text-white text-[11px]">5.0</span>
            <span className="text-slate-400 text-[10px]">({current.reviews} reviews)</span>
          </div>

          <span className="text-slate-300 dark:text-zinc-700">|</span>

          {/* Location Tag */}
          <div className="flex items-center gap-1 text-slate-600 dark:text-zinc-400 text-[11px]">
            <MapPin className="w-3 h-3 text-red-500" />
            <span>{current.location}</span>
          </div>
        </div>

        {/* 2. Trade Accreditation & Trust Badges Strip */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className={`p-2.5 rounded-xl border text-[11px] font-bold flex items-center gap-2 ${current.accredColor}`}>
            <Award className="w-4 h-4 shrink-0" />
            <span className="truncate">{current.accreditation}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
            <span className="truncate">{current.insurance}</span>
          </div>
        </div>

        {/* 3. Workmanship Guarantee Banner */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="font-bold text-slate-800 dark:text-zinc-200">{current.guarantee}</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified</span>
        </div>

      </div>

      {/* Interactive Switcher */}
      <div className="space-y-1.5 pt-1">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 text-center">
          Test Live Trade Switcher:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: 'gas', label: 'Gas Engineer' },
            { key: 'electrician', label: 'Electrician' },
            { key: 'roofer', label: 'Roofer' }
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedTrade(key as any)}
              className={`py-1.5 px-2 text-xs rounded-xl border transition-all ${
                selectedTrade === key
                  ? 'bg-red-600 text-white border-red-600 font-bold shadow-sm shadow-red-600/20'
                  : 'bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700/60 font-medium'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
