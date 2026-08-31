import React from 'react';
import { motion } from 'motion/react';

export const CustomPreview = () => {
  return (
    <div className="w-full h-[600px] bg-[#f5f2eb] overflow-y-auto overflow-x-hidden font-serif text-[#1a1a1a] selection:bg-[#c8664d] selection:text-white">
      {/* Navbar */}
      <nav className="w-full px-8 py-10 flex items-center justify-between z-50 relative">
        <div className="text-sm tracking-[0.2em] uppercase font-sans">
          Maison Bespoke
        </div>
        <div className="hidden md:flex gap-12 text-xs tracking-[0.15em] uppercase font-sans">
          <span className="hover:text-[#c8664d] cursor-pointer transition-colors">Atelier</span>
          <span className="hover:text-[#c8664d] cursor-pointer transition-colors">Journal</span>
          <span className="hover:text-[#c8664d] cursor-pointer transition-colors">Contact</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-8 pb-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10">
          
          {/* Main Title Area */}
          <div className="md:col-span-8 lg:col-span-7 pt-12 lg:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.85] mb-8">
                Crafted <br/>
                <span className="italic text-[#c8664d]">Legacy.</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <div className="w-16 h-[1px] bg-[#1a1a1a]" />
              <p className="font-sans text-sm tracking-wide max-w-sm leading-relaxed">
                We believe in the beauty of raw materials, patience, and uncompromising bespoke joinery. No templates, just tailored perfection.
              </p>
            </motion.div>
          </div>

          {/* Featured Image */}
          <div className="md:col-span-4 lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] overflow-hidden bg-[#e8e4db]"
            >
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                alt="Bespoke Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
            
            {/* Floating Tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-6 -left-12 bg-white px-6 py-4 shadow-xl flex flex-col gap-1 font-sans"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">Featured Project</span>
              <span className="text-sm font-medium tracking-widest uppercase">The Kensington Residence</span>
            </motion.div>
          </div>
          
        </div>
        
        {/* Background Decorative Type */}
        <div className="absolute top-0 right-0 -translate-y-20 translate-x-10 text-[20vw] leading-none text-[#e8e4db] -z-10 select-none opacity-50">
          MB
        </div>
      </div>
    </div>
  );
};

