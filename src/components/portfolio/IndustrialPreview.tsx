import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Settings, ShieldCheck, Factory } from 'lucide-react';

export const IndustrialPreview = () => {
  return (
    <div className="w-full h-[600px] bg-[#111] overflow-y-auto overflow-x-hidden font-mono relative scrollbar-hide text-white selection:bg-amber-500 selection:text-black">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full">
        {/* Nav */}
        <nav className="w-full border-b border-white/10 flex items-center justify-between px-8 py-6 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0">
          <div className="flex items-center gap-3">
            <Factory className="text-amber-500 w-6 h-6" />
            <span className="font-bold tracking-widest text-lg uppercase">HeavyDuty.</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-white/50">
            <span className="hover:text-amber-500 cursor-pointer transition-colors">Services</span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">Projects</span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">Safety</span>
          </div>
          <button className="bg-amber-500 text-black px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center gap-2">
            Get Quote <ArrowRight className="w-3 h-3" />
          </button>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 border-r border-white/10 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block border border-amber-500/30 bg-amber-500/10 text-amber-500 px-3 py-1 text-xs mb-6 tracking-widest uppercase">
                Structural Engineering
              </div>
              <h1 className="text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
                Uncompromising<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Stability</span>
              </h1>
              <p className="text-white/60 max-w-md text-sm leading-relaxed mb-10">
                Delivering high-contrast utility and heavy B2B weight for modern industrial infrastructure. Built for winning serious commercial contracts.
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                <div>
                  <div className="text-amber-500 text-3xl font-bold mb-1">500T</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Max Capacity</div>
                </div>
                <div>
                  <div className="text-amber-500 text-3xl font-bold mb-1">24/7</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Operation</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative overflow-hidden bg-[#1a1a1a] flex items-center justify-center p-12">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1541888086225-ee53158c5f59?q=80&w=2070&auto=format&fit=crop" 
              alt="Industrial" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-20 w-full max-w-sm border border-white/10 bg-black/60 backdrop-blur-md p-6"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <Settings className="text-amber-500 w-5 h-5 animate-spin-slow" />
                <span className="text-xs uppercase tracking-widest text-white/70">Live Status</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/50">Unit Alpha</span>
                  <span className="text-green-500">ONLINE</span>
                </div>
                <div className="w-full bg-white/10 h-1">
                  <div className="bg-amber-500 h-full w-[85%]" />
                </div>
                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-white/50">Unit Beta</span>
                  <span className="text-amber-500">MAINTENANCE</span>
                </div>
                <div className="w-full bg-white/10 h-1">
                  <div className="bg-amber-500 h-full w-[45%]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-white/10 bg-[#0a0a0a]">
          {[
            { title: "Heavy Plant", subtitle: "Machinery & Equipment" },
            { title: "Groundworks", subtitle: "Foundations & Excavation" },
            { title: "Scaffolding", subtitle: "Structural Support" }
          ].map((item, i) => (
            <div key={i} className={`p-8 ${i !== 2 ? 'border-r border-white/10' : ''} hover:bg-white/5 transition-colors cursor-pointer group`}>
              <ShieldCheck className="w-6 h-6 text-white/20 mb-4 group-hover:text-amber-500 transition-colors" />
              <div className="text-sm font-bold uppercase tracking-wider mb-1">{item.title}</div>
              <div className="text-xs text-white/40">{item.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

