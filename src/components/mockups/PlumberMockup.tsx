import React from 'react';
import { Phone, Droplet, Clock, Home, Wrench, Calendar, User } from 'lucide-react';

export const PlumberMockup = () => (
  <div className="w-full h-full bg-[#f4f7f9] flex flex-col font-sans select-none overflow-hidden relative">
    {/* Header */}
    <div className="bg-white px-4 py-3 border-b border-slate-200 flex justify-between items-center z-10 mt-6 shadow-sm">
      <div className="flex items-center gap-1.5">
        <Droplet className="w-4 h-4 text-blue-600" />
        <span className="font-bold text-slate-800 text-xs">RapidRepair 24/7</span>
      </div>
    </div>
    
    {/* Content */}
    <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden relative z-0">
      <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10">
          <Wrench className="w-24 h-24" />
        </div>
        <div className="bg-blue-500/50 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded inline-flex items-center gap-1 mb-2">
          <Clock className="w-3 h-3" /> Emergency Response
        </div>
        <h2 className="text-xl font-bold mb-1">Need a Fix Fast?</h2>
        <p className="text-[10px] text-blue-100 mb-4 max-w-[90%]">
          Sub-second emergency call routing. I're in your area right now.
        </p>
        <button className="w-full bg-red-600 text-white font-bold py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs hover:bg-red-500 transition-colors">
          <Phone className="w-3.5 h-3.5 animate-pulse" />
          CALL NOW
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex-1">
        <h3 className="font-bold text-slate-800 text-sm mb-3">My Services</h3>
        <div className="grid grid-cols-2 gap-3">
          {['Boiler Repair', 'Burst Pipes', 'Blocked Drains', 'Gas Safety'].map((svc, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg flex flex-col items-center justify-center text-center gap-1.5">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Wrench className="w-3 h-3" />
              </div>
              <span className="text-[9px] font-semibold text-slate-700">{svc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom Navigation */}
    <div className="h-14 bg-white border-t border-slate-200 flex justify-around items-center px-2 pb-1 z-10 relative mt-auto">
      <div className="flex flex-col items-center gap-1 text-blue-600">
        <Home className="w-4 h-4" />
        <span className="text-[8px] font-bold">Home</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-400">
        <Wrench className="w-4 h-4" />
        <span className="text-[8px] font-bold">Services</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-400">
        <Calendar className="w-4 h-4" />
        <span className="text-[8px] font-bold">Booking</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-400">
        <User className="w-4 h-4" />
        <span className="text-[8px] font-bold">Account</span>
      </div>
    </div>
  </div>
);
