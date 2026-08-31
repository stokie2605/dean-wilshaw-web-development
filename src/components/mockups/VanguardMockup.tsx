import React from 'react';
import { Phone, Shield, MapPin } from 'lucide-react';

export const VanguardMockup = () => (
  <div className="w-full h-full bg-[#111111] text-white flex flex-col font-sans select-none overflow-hidden relative">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-[#222]">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-amber-500" />
        <span className="font-black tracking-tight text-xs uppercase">Vanguard Recovery</span>
      </div>
      <div className="flex gap-3 text-[9px] font-semibold text-slate-400">
        <span>FLEET</span>
        <span>SERVICES</span>
        <span>CONTACT</span>
      </div>
    </div>
    {/* Hero */}
    <div className="flex-1 flex flex-col items-start justify-center px-6 relative bg-gradient-to-br from-[#111] to-[#222]">
      <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-500 text-[8px] font-bold px-2 py-1 rounded border border-amber-500/20 flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
        LIVE DISPATCH
      </div>
      <h2 className="text-xl font-bold leading-tight mb-2 max-w-[80%]">
        Rapid Emergency Dispatch & Transport.
      </h2>
      <p className="text-[10px] text-slate-400 max-w-[70%] mb-4 leading-relaxed">
        Engineered for high-contrast visibility and instant 1-tap emergency routing.
      </p>
      <button className="bg-amber-500 text-black px-4 py-2 rounded font-bold text-[10px] flex items-center gap-2 hover:bg-amber-400 transition-colors">
        <Phone className="w-3 h-3 animate-pulse" />
        24/7 CALL OUT
      </button>
      
      {/* Service Grid below hero */}
      <div className="grid grid-cols-2 gap-2 mt-6 w-full max-w-[80%]">
        <div className="bg-[#1a1a1a] border border-[#333] p-2 rounded flex flex-col gap-1">
          <MapPin className="w-3 h-3 text-amber-500" />
          <span className="text-[9px] font-semibold">Roadside Recovery</span>
        </div>
        <div className="bg-[#1a1a1a] border border-[#333] p-2 rounded flex flex-col gap-1">
          <Shield className="w-3 h-3 text-amber-500" />
          <span className="text-[9px] font-semibold">Fleet Transfer</span>
        </div>
      </div>
    </div>
  </div>
);

