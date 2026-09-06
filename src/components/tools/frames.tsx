import React from 'react';
import { Lock, MapPin, Star, Sparkles } from 'lucide-react';

export type IconType = React.ComponentType<{ className?: string }>;

export function PhoneFrame({ children, overlay }: { children: React.ReactNode; overlay?: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <div className="relative bg-[#111] rounded-[2.5rem] border-[8px] border-[#222] shadow-2xl overflow-hidden aspect-[9/19]">
        <div className="absolute top-0 inset-x-0 h-6 bg-[#222] rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-center gap-2">
          <div className="w-12 h-1.5 bg-black/60 rounded-full shadow-inner" />
          <div className="w-1.5 h-1.5 bg-blue-900/50 rounded-full shadow-inner" />
        </div>
        <div className="absolute inset-0 bg-white dark:bg-zinc-900 overflow-y-auto hide-scrollbar pt-7 pb-5 px-3.5">
          {children}
        </div>
        {overlay && <div className="absolute inset-0 z-30 pointer-events-none">{overlay}</div>}
      </div>
    </div>
  );
}

export function PhonePreviewHero({ businessName, town }: { businessName: string; town: string }) {
  const displayName = businessName.trim() || 'Your Business Name';
  const displayTown = town.trim() || 'Your Area';

  return (
    <div className="mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-[#111] to-[#1c1c1c] text-white p-4">
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#D90429] flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <p className="font-geist font-bold text-sm leading-tight truncate min-w-0">{displayName}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
        <MapPin className="w-2.5 h-2.5" /> Serving {displayTown}
      </span>
      <div className="flex items-center gap-1.5 mt-2.5">
        <div className="flex text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-current" />
          ))}
        </div>
        <span className="text-[10px] text-zinc-400 font-mono">5.0 Google Reviews, 128 total</span>
      </div>
    </div>
  );
}

function slugifyBusinessName(businessName: string): string {
  const trimmed = businessName.trim();
  if (!trimmed) return 'yourbusiness.co.uk';
  return `${trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '')}.co.uk`;
}

export function DesktopFrame({
  businessName,
  children,
  overlay,
}: {
  businessName: string;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}) {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Browser chrome bar */}
      <div className="bg-[#222] rounded-t-2xl h-11 flex items-center px-4 gap-4">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#111] rounded-full px-4 py-1.5 text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 max-w-xs w-full justify-center">
            <Lock className="w-3 h-3 shrink-0" />
            <span className="truncate">{slugifyBusinessName(businessName)}</span>
          </div>
        </div>
        <div className="w-14 shrink-0" />
      </div>

      {/* Body */}
      <div className="relative bg-white dark:bg-zinc-900 border-x-[8px] border-b-[8px] border-[#222] rounded-b-2xl shadow-2xl overflow-hidden">
        <div className="h-[600px] overflow-y-auto hide-scrollbar">{children}</div>
        {overlay && <div className="absolute inset-0 z-30 pointer-events-none">{overlay}</div>}
      </div>

      {/* Laptop base */}
      <div className="mx-10 h-2.5 bg-gradient-to-b from-[#2a2a2a] to-[#111] rounded-b-2xl" />
      <div className="h-[3px] w-1/4 mx-auto bg-[#333] rounded-full" />
    </div>
  );
}

export function DesktopPreviewHero({ businessName, town }: { businessName: string; town: string }) {
  const displayName = businessName.trim() || 'Your Business Name';
  const displayTown = town.trim() || 'Your Area';

  return (
    <div className="border-b border-slate-200 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-6 px-8 py-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#D90429] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <p className="font-geist font-bold text-lg text-slate-900 dark:text-white leading-tight truncate min-w-0">{displayName}</p>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-400 dark:text-zinc-500 shrink-0">
          <span>Services</span>
          <span>About</span>
          <span>Contact</span>
        </nav>

        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-zinc-300 shrink-0">
          <MapPin className="w-3.5 h-3.5" /> Serving {displayTown}
        </span>
      </div>

      <div className="px-8 py-10 bg-gradient-to-br from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">5.0, 128 Google Reviews</span>
        </div>
        <h2 className="text-2xl xl:text-3xl font-black text-slate-900 dark:text-white tracking-tight max-w-xl leading-tight">
          {displayName}, serving {displayTown}
        </h2>
      </div>
    </div>
  );
}
