import React, { useState } from 'react';
import { Rocket, ArrowRight, MessageCircle, ShieldCheck, Zap, Code2, Gauge, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenWhatsApp }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'audit'>('preview');

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 grid-bg overflow-hidden border-b border-[#c6c6cd]/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6 items-start text-left z-10">
          {/* Engineered Badge */}
          <div className="bg-[#f1f5f9] text-[#191c1e] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-2 border border-[#c6c6cd] shadow-2xs">
            <Rocket className="w-4 h-4 text-[#dc2626]" />
            <span>Built for Local Tradesmen</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-geist font-bold text-3xl sm:text-5xl lg:text-6xl text-[#191c1e] leading-[1.15] tracking-tight">
            Websites That Actually Make Your{' '}
            <span className="text-[#991b1b] bg-gradient-to-r from-[#991b1b] to-[#dc2626] bg-clip-text text-transparent">
              Phone Ring.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#45464d] leading-relaxed max-w-2xl font-normal">
            Simple, professional websites designed to get roofers, plumbers, and builders more quote requests in Cheshire & Stoke-on-Trent. No tech jargon, no hidden fees.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-2 w-full sm:w-auto">
            <button
              onClick={onOpenQuote}
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-3.5 rounded-lg font-semibold text-sm sm:text-base text-center transition-all shadow-sm hover:shadow-md flex justify-center items-center gap-2 group"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenWhatsApp}
              className="border border-[#191c1e] text-[#191c1e] bg-white hover:bg-[#eceef0] px-6 py-3.5 rounded-lg font-semibold text-sm sm:text-base text-center transition-all flex justify-center items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              Message on WhatsApp
            </button>
          </div>

          {/* Micro Proof Bar */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#c6c6cd]/50 w-full max-w-xl text-xs sm:text-sm text-[#45464d]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Looks Great on Mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Google Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>2-3 Wk Turnaround</span>
            </div>
          </div>
        </div>

        {/* Right Column: Real Project Showcase */}
        <div className="lg:col-span-5 relative w-full">
          <a
            href="https://github.com/stokie2605/school-it-support-refresh"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            title="View project on GitHub"
          >
          <div className="bg-white rounded-xl border border-[#c6c6cd] shadow-xl overflow-hidden transition-all transform hover:-translate-y-1 group-hover:border-[#dc2626] group-hover:shadow-2xl duration-300 p-6 flex flex-col gap-4 cursor-pointer">
            
            <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#dc2626]/10 rounded-lg flex items-center justify-center group-hover:bg-[#dc2626]/20 transition-colors">
                  <Code2 className="w-5 h-5 text-[#991b1b]" />
                </div>
                <div>
                  <h3 className="font-geist font-bold text-[#191c1e]">Recent Work</h3>
                  <p className="text-xs text-[#76777d]">School IT Refresh Project</p>
                </div>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded font-semibold">
                Completed
              </span>
            </div>

            <p className="text-sm text-[#45464d] leading-relaxed">
              A comprehensive technical refresh and modernization project for a local school's IT infrastructure, ensuring speed, security, and ease of use.
            </p>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-2">
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Key Deliverables:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Hardware & Software Auditing</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Performance Optimization</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Modernization Strategy</span>
                </li>
              </ul>
            </div>

            <p className="text-xs text-[#991b1b] font-medium flex items-center gap-1 mt-1">
              View on GitHub →
            </p>
          </div>
          </a>
        </div>

      </div>
    </section>
  );
};

