import React from 'react';
import { Box, Lock, Activity, Users } from 'lucide-react';

export const ApexMockup = () => (
  <div className="w-full h-full bg-slate-50 text-slate-900 flex flex-col font-sans select-none overflow-hidden">
    {/* Header */}
    <div className="bg-[#0b1f38] text-white flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <Box className="w-4 h-4 text-sky-400" />
        <span className="font-bold tracking-tight text-xs uppercase">Apex Logistics</span>
      </div>
      <button className="bg-sky-500 hover:bg-sky-400 text-white text-[9px] font-bold px-3 py-1 rounded flex items-center gap-1">
        <Lock className="w-3 h-3" /> CLIENT PORTAL
      </button>
    </div>
    {/* Dashboard Content */}
    <div className="flex-1 p-4 flex flex-col gap-3">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-sm font-bold text-slate-800">Global Fleet Overview</h2>
          <p className="text-[9px] text-slate-500">Live routing and structural data analytics.</p>
        </div>
        <div className="text-[9px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
          Last Updated: Just now
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
          <Activity className="w-4 h-4 text-emerald-500 mb-1" />
          <div className="text-[10px] text-slate-500 font-medium">Active Routes</div>
          <div className="text-lg font-bold">1,248</div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
          <Users className="w-4 h-4 text-sky-500 mb-1" />
          <div className="text-[10px] text-slate-500 font-medium">Drivers</div>
          <div className="text-lg font-bold">392</div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
          <Box className="w-4 h-4 text-indigo-500 mb-1" />
          <div className="text-[10px] text-slate-500 font-medium">Deliveries</div>
          <div className="text-lg font-bold">14.2k</div>
        </div>
      </div>
      <div className="flex-1 bg-white border border-slate-200 rounded mt-1 overflow-hidden relative flex flex-col">
        <div className="h-6 bg-slate-100 border-b border-slate-200 px-3 flex items-center text-[9px] font-bold text-slate-600">
          Recent Shipments
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2">
          {[1,2,3].map(i => (
            <div key={i} className="flex justify-between items-center text-[9px] border-b border-slate-100 pb-2">
              <span className="font-mono text-slate-500">APX-00{i}</span>
              <span className="font-semibold text-slate-700">Manchester to London</span>
              <span className="text-emerald-500 font-semibold bg-emerald-50 px-1 rounded">In Transit</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

