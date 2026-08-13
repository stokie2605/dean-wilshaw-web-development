import React from 'react';
import { Star, ShieldCheck, MapPin } from 'lucide-react';

interface SocialProofProps {
  location?: string;
  rating?: string;
  reviewCount?: number;
}

export const SocialProofBanner: React.FC<SocialProofProps> = ({
  location = "Staffordshire",
  rating = "5.0",
  reviewCount = 128
}) => {
  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-3 py-2 px-4 rounded-full bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-xs font-medium text-slate-600 dark:text-zinc-300 backdrop-blur-sm shadow-md mx-auto w-fit">
      <div className="flex items-center gap-1 text-[#F59E0B] dark:text-[#FBBF24]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-current" />
        ))}
        <span className="font-bold text-slate-900 dark:text-white ml-1">{rating}</span>
      </div>
      <span className="text-slate-300 dark:text-zinc-700 hidden sm:inline">|</span>
      <span className="text-slate-800 dark:text-zinc-300 font-semibold">{reviewCount}+ Verified Reviews</span>
      <span className="text-slate-300 dark:text-zinc-700 hidden sm:inline">|</span>
      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Fully Insured</span>
      </div>
      <span className="text-slate-300 dark:text-zinc-700 hidden sm:inline">|</span>
      <div className="flex items-center gap-1 text-slate-500 dark:text-zinc-400">
        <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
        <span>Serving {location}</span>
      </div>
    </div>
  );
};
