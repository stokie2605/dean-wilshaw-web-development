import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Building2, Shield, Users, BarChart3 } from 'lucide-react';

export const CommercialPreview = () => {
  return (
    <div className="w-full h-[600px] bg-[#f8fafc] overflow-y-auto overflow-x-hidden font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Navbar */}
      <nav className="w-full bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-xl tracking-tight">ApexCommercial</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Solutions</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Enterprise</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Resources</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">About</span>
          </div>

          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
            Client Portal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full max-w-6xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Trusted by 500+ Enterprises
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Scalable Infrastructure For <span className="text-blue-600">Modern Business</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              We deliver corporate, authoritative, and sleek commercial contracting. Built for winning large-scale contracts and presenting serious operational scale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2">
                Start a Project <ChevronRight className="w-4 h-4" />
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-all text-center">
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-white bg-white/50 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent mix-blend-overlay" />
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="Commercial Building"
              className="w-full h-full object-cover rounded-2xl"
            />
            
            {/* Glassmorphic Floating Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-white rounded-xl p-5 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Project Efficiency</div>
                  <div className="text-xs text-slate-500">Delivered 24% faster than industry average</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="w-full bg-white border-y border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-sm font-medium text-slate-500 mb-8">ACCREDITED BY INDUSTRY LEADERS</div>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale">
            <div className="flex items-center gap-2 font-bold text-xl"><Shield className="w-6 h-6" /> ISO 9001</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Users className="w-6 h-6" /> CHAS Prime</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Building2 className="w-6 h-6" /> BIFM</div>
          </div>
        </div>
      </div>
    </div>
  );
};
