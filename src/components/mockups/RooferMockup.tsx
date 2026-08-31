import React from 'react';
import { Hammer, Image as ImageIcon, Shield, Home, Camera, CheckSquare, Phone } from 'lucide-react';

export const RooferMockup = () => (
  <div className="w-full h-full bg-[#1e2329] flex flex-col font-sans select-none overflow-hidden relative">
    {/* Header */}
    <div className="bg-[#181d22] px-4 py-3 border-b border-[#2d333b] flex justify-center items-center z-10 mt-6 shadow-md">
      <div className="flex items-center gap-1.5">
        <Hammer className="w-4 h-4 text-yellow-400" />
        <span className="font-bold text-white text-xs tracking-wide uppercase">Armor Roofing</span>
      </div>
    </div>
    
    {/* Content */}
    <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar z-0 relative">
      <div className="px-4 py-5 bg-gradient-to-b from-[#181d22] to-[#1e2329]">
        <h2 className="text-xl font-bold text-white mb-2 leading-tight">Premium Roofing & Scaffolding.</h2>
        <p className="text-[10px] text-slate-400 mb-4">
          Engineered for durability. Built with precision. Secure your structure today.
        </p>
        <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2.5 rounded-md shadow-md text-[10px] uppercase tracking-widest transition-colors">
          Request Free Survey
        </button>
      </div>

      <div className="px-4 pb-4 flex-1">
        <div className="flex items-center gap-2 mb-3 mt-2">
          <div className="w-1 h-3 bg-yellow-400 rounded-sm"></div>
          <h3 className="font-bold text-white text-[11px] uppercase tracking-wider">Recent Projects</h3>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="bg-[#262c33] border border-[#363e48] rounded-lg overflow-hidden">
            <div className="h-20 bg-[#363e48] flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-slate-500" />
            </div>
            <div className="p-3">
              <h4 className="text-[11px] font-bold text-white mb-1">Residential Slate</h4>
              <p className="text-[8px] text-slate-400 mb-2">Complete roof replacement with premium Welsh slate.</p>
              <button className="text-[8px] font-bold text-yellow-400 uppercase border border-yellow-400/30 px-2 py-1 rounded hover:bg-yellow-400/10 transition-colors">
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Navigation */}
    <div className="h-14 bg-[#181d22] border-t border-[#2d333b] flex justify-around items-center px-2 pb-1 z-10 relative mt-auto">
      <div className="flex flex-col items-center gap-1 text-yellow-400">
        <Home className="w-4 h-4" />
        <span className="text-[8px] font-bold">Projects</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-500">
        <Shield className="w-4 h-4" />
        <span className="text-[8px] font-bold">Safety</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-500">
        <Camera className="w-4 h-4" />
        <span className="text-[8px] font-bold">Gallery</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-500">
        <Phone className="w-4 h-4" />
        <span className="text-[8px] font-bold">Contact</span>
      </div>
    </div>
  </div>
);

