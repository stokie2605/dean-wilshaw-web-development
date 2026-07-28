import React from 'react';
import { Calendar, Map, Leaf } from 'lucide-react';

export const KilnMockup = () => (
  <div className="w-full h-full bg-[#faf9f6] text-[#2c2a26] flex flex-col font-serif select-none overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-3 border-b border-[#e8e6e1]">
      <div className="flex items-center gap-2">
        <Leaf className="w-4 h-4 text-orange-800" />
        <span className="font-semibold text-sm tracking-widest uppercase">Kiln & Craft</span>
      </div>
      <div className="flex gap-4 text-[9px] font-sans font-semibold tracking-wider text-[#5c5a56] uppercase">
        <span>Artisans</span>
        <span>Events</span>
        <span>Visit</span>
      </div>
    </div>
    {/* Content */}
    <div className="flex-1 p-6 flex flex-col gap-4 relative">
      <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-medium mb-1 text-[#3d3a36]">Weekend Artisan Market</h2>
        <p className="text-[10px] font-sans text-[#7a7873] max-w-[80%]">
          Discover local independent producers, seasonal harvests, and frictionless event navigation.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="bg-white rounded-lg shadow-sm border border-[#e8e6e1] overflow-hidden flex flex-col group hover:border-orange-800 transition-colors">
          <div className="h-16 bg-[#e6dcd3] flex items-center justify-center">
            <span className="text-orange-900/50 font-bold text-[10px] font-sans">IMAGE PLACEHOLDER</span>
          </div>
          <div className="p-2.5 font-sans">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-[10px] font-bold text-[#3d3a36]">Ceramics Fair</h3>
              <Calendar className="w-3 h-3 text-[#999]" />
            </div>
            <p className="text-[8px] text-[#7a7873]">Saturday, 10am - 4pm</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-[#e8e6e1] overflow-hidden flex flex-col group hover:border-orange-800 transition-colors">
          <div className="h-16 bg-[#d6e0d9] flex items-center justify-center">
            <span className="text-green-900/50 font-bold text-[10px] font-sans">IMAGE PLACEHOLDER</span>
          </div>
          <div className="p-2.5 font-sans">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-[10px] font-bold text-[#3d3a36]">Organic Produce</h3>
              <Map className="w-3 h-3 text-[#999]" />
            </div>
            <p className="text-[8px] text-[#7a7873]">Main Hall & Courtyard</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
