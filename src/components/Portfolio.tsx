import React from 'react';
import { Smartphone, Monitor, Database, Check } from 'lucide-react';

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#ffffff] border-b border-[#c6c6cd]/50">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#991b1b] font-semibold mb-2 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            What I Can Do
          </span>
          <h2 className="font-geist font-bold text-3xl sm:text-4xl text-[#191c1e] mb-4">
            Websites for Every Stage of Business.
          </h2>
          <div className="w-16 h-1 bg-[#dc2626] rounded-full mb-6"></div>
          <p className="text-[#45464d] max-w-2xl text-base sm:text-lg">
            Whether you're a one-man band just starting out, or an established company looking to dominate local searches, I build exactly what you need to get the job done.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Modern Business Websites */}
          <div className="bg-[#f7f9fb] border border-[#c6c6cd]/80 hover:border-[#dc2626] rounded-xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col relative">
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-[#c6c6cd] flex items-center justify-center mb-6">
              <Smartphone className="w-7 h-7 text-[#991b1b]" />
            </div>
            <h3 className="font-geist font-bold text-2xl text-[#191c1e] mb-2">Modern Business Websites</h3>
            <p className="text-sm text-[#45464d] leading-relaxed mb-6 flex-grow">
              Fast, responsive websites designed to get local tradesmen and businesses more phone calls and quote requests. Built from scratch, no bloated templates.
            </p>
            
            <div className="bg-white rounded-lg p-4 border border-[#e0e3e5] mb-6">
              <p className="text-xs font-bold uppercase text-[#191c1e] mb-3 font-mono">My Approach:</p>
              <ul className="space-y-2 text-sm text-[#45464d]">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Mobile-first responsive design</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Built-in lead capture forms</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Local Google SEO setup</li>
              </ul>
            </div>
            
            <a href="#contact" className="block w-full bg-white hover:bg-[#eceef0] border border-[#191c1e] text-[#191c1e] py-3 rounded-lg text-sm font-semibold text-center transition-colors">
              Discuss a Project
            </a>
          </div>

          {/* Custom Web Applications */}
          <div className="bg-[#191c1e] border border-[#191c1e] rounded-xl p-8 shadow-xl transform md:-translate-y-4 transition-all duration-300 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#991b1b] to-[#dc2626]"></div>
            
            <div className="w-14 h-14 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center mb-6">
              <Database className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-geist font-bold text-2xl text-white mb-2">Custom Web Applications</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-grow">
              Complex software solutions to help you run your business. From staff rota systems to custom booking dashboards and secure internal tools.
            </p>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
              <p className="text-xs font-bold uppercase text-white mb-3 font-mono">My Approach:</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Secure authentication systems</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Custom database architecture</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Operational admin dashboards</li>
              </ul>
            </div>
            
            <a href="#contact" className="block w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-3 rounded-lg text-sm font-semibold text-center transition-colors">
              Discuss a Project
            </a>
          </div>

          {/* AI & Tech Integrations */}
          <div className="bg-[#f7f9fb] border border-[#c6c6cd]/80 hover:border-[#dc2626] rounded-xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col relative">
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-[#c6c6cd] flex items-center justify-center mb-6">
              <Monitor className="w-7 h-7 text-[#991b1b]" />
            </div>
            <h3 className="font-geist font-bold text-2xl text-[#191c1e] mb-2">AI & Tech Integrations</h3>
            <p className="text-sm text-[#45464d] leading-relaxed mb-6 flex-grow">
              I constantly learn new technologies to give businesses an edge. Need an intelligent AI chatbot like the one on this site? I can build and integrate it.
            </p>
            
            <div className="bg-white rounded-lg p-4 border border-[#e0e3e5] mb-6">
              <p className="text-xs font-bold uppercase text-[#191c1e] mb-3 font-mono">My Approach:</p>
              <ul className="space-y-2 text-sm text-[#45464d]">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Custom AI chatbot assistants</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Automated email & SMS workflows</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> 3rd-party API integrations</li>
              </ul>
            </div>
            
            <a href="#contact" className="block w-full bg-white hover:bg-[#eceef0] border border-[#191c1e] text-[#191c1e] py-3 rounded-lg text-sm font-semibold text-center transition-colors">
              Discuss a Project
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

