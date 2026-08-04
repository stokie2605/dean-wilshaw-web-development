import React from 'react';
import { Leaf, Map, Grid, Scissors, Calendar, Menu, Search, User } from 'lucide-react';

export const LandscaperMockup = () => (
  <div className="w-full h-full bg-white flex flex-col font-serif select-none overflow-hidden relative">
    {/* Header */}
    <div className="bg-white px-4 py-3 border-b border-slate-100 flex justify-between items-center z-10 mt-6">
      <Menu className="w-4 h-4 text-slate-400" />
      <span className="font-bold text-[#204030] text-xs uppercase tracking-widest">Lumen Stone</span>
      <span className="text-[8px] font-sans font-bold text-[#204030] uppercase">Book</span>
    </div>
    
    {/* Content */}
    <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar bg-slate-50 z-0 relative">
      <div className="h-32 bg-[#e8efe9] relative flex flex-col justify-end p-4 border-b border-[#c8decb]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#204030]/80 to-transparent"></div>
        <h2 className="text-xl font-bold text-white relative z-10 leading-tight mb-1">Elevate Your<br/>Exterior.</h2>
        <button className="bg-[#204030] text-white font-sans font-bold text-[8px] uppercase tracking-wider px-3 py-1.5 rounded relative z-10 w-fit hover:bg-[#152e22] transition-colors">
          Book Consultation
        </button>
      </div>

      <div className="p-4 flex-1 bg-white rounded-t-2xl -mt-3 relative z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <h3 className="text-center font-bold text-[#204030] text-sm mb-4">My Expertise</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 aspect-square">
            <Grid className="w-6 h-6 text-[#204030]" />
            <span className="text-[8px] font-sans font-bold tracking-widest text-[#204030] uppercase">Driveways</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 aspect-square">
            <Map className="w-6 h-6 text-[#204030]" />
            <span className="text-[8px] font-sans font-bold tracking-widest text-[#204030] uppercase">Patios</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 aspect-square">
            <Grid className="w-6 h-6 text-[#204030]" />
            <span className="text-[8px] font-sans font-bold tracking-widest text-[#204030] uppercase">Fencing</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 aspect-square">
            <Scissors className="w-6 h-6 text-[#204030]" />
            <span className="text-[8px] font-sans font-bold tracking-widest text-[#204030] uppercase">Turfing</span>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Navigation */}
    <div className="h-14 bg-white border-t border-slate-100 flex justify-around items-center px-2 pb-1 z-10 relative mt-auto">
      <div className="flex flex-col items-center gap-1 text-[#204030]">
        <Leaf className="w-4 h-4" />
        <span className="text-[8px] font-sans font-bold">Discover</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-300">
        <Search className="w-4 h-4" />
        <span className="text-[8px] font-sans font-bold">Search</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-300">
        <Calendar className="w-4 h-4" />
        <span className="text-[8px] font-sans font-bold">Book</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-300">
        <User className="w-4 h-4" />
        <span className="text-[8px] font-sans font-bold">Profile</span>
      </div>
    </div>
  </div>
);
