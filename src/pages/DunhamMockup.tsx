import React, { useEffect } from 'react';
import { ArrowRight, Shield, Landmark, LineChart, Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DunhamMockup: React.FC = () => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0E2A1F] text-[#F8F8F6] selection:bg-[#A89270] selection:text-[#0E2A1F] font-sans overflow-x-hidden">
      {/* Background Image with heavy overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20 mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0E2A1F]/70 via-[#0E2A1F]/95 to-[#0E2A1F] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300 bg-[#0E2A1F]/60 backdrop-blur-md border-b border-[#A89270]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="w-8 h-8 text-[#A89270]" />
            <span className="text-2xl font-serif tracking-wide text-white">
              DUNHAM <span className="text-[#A89270]">WEALTH</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-[#F8F8F6]/70">
            <a href="#" className="hover:text-[#A89270] transition-colors">Strategy</a>
            <a href="#" className="hover:text-[#A89270] transition-colors">Concierge</a>
            <a href="#" className="hover:text-[#A89270] transition-colors">Legacy</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-xs uppercase tracking-widest text-[#F8F8F6]/70 hover:text-white transition-colors">
              Client Portal
            </button>
            <button className="bg-[#A89270] text-[#111815] px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(168,146,112,0.3)]">
              Consultation
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section - Pure Editorial Typography */}
          <div className="max-w-5xl mb-32">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-[1px] w-12 bg-[#A89270]"></div>
              <span className="text-[#A89270] uppercase tracking-[0.3em] text-xs font-semibold">Generational Office</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[1.05] tracking-tight mb-10 text-white drop-shadow-2xl">
              Uncompromising <br />
              <span className="italic text-[#A89270] font-light">Security.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#F8F8F6]/80 font-light max-w-2xl leading-relaxed mb-12">
              Bespoke wealth architecture designed exclusively for ultra-high-net-worth individuals requiring quiet authority and meticulous legacy preservation.
            </p>

            <button className="group flex items-center gap-4 text-[#A89270] border-b border-[#A89270]/30 pb-2 hover:border-[#A89270] transition-all duration-300">
              <span className="uppercase tracking-[0.2em] text-sm">Discover Our Strategy</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Trust Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-[#A89270]/20 mb-32">
            <div>
              <p className="text-[#A89270] font-serif text-4xl md:text-5xl mb-2">£2.4B</p>
              <p className="text-xs uppercase tracking-widest text-[#F8F8F6]/50">Assets Managed</p>
            </div>
            <div>
              <p className="text-[#A89270] font-serif text-4xl md:text-5xl mb-2">30+</p>
              <p className="text-xs uppercase tracking-widest text-[#F8F8F6]/50">Years Excellence</p>
            </div>
            <div>
              <p className="text-[#A89270] font-serif text-4xl md:text-5xl mb-2">FCA</p>
              <p className="text-xs uppercase tracking-widest text-[#F8F8F6]/50">Fully Regulated</p>
            </div>
            <div>
              <p className="text-[#A89270] font-serif text-4xl md:text-5xl mb-2">98%</p>
              <p className="text-xs uppercase tracking-widest text-[#F8F8F6]/50">Client Retention</p>
            </div>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Main Feature */}
            <div className="md:col-span-8 bg-[#111815]/90 backdrop-blur-md border border-[#A89270]/20 p-10 md:p-16 hover:border-[#A89270]/50 transition-colors duration-500 group shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#A89270]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <Shield className="w-12 h-12 text-[#A89270] mb-8 relative z-10" />
              <h3 className="text-4xl font-serif text-white mb-6 relative z-10">Inheritance Tax Mitigation</h3>
              <p className="text-[#F8F8F6]/70 text-lg leading-relaxed max-w-xl mb-12 relative z-10">
                Preserving family capital across generations through meticulous trust structuring and exposure mitigation. We ensure your legacy remains structurally impenetrable against aggressive taxation.
              </p>
              <div className="w-full h-[2px] bg-[#0E2A1F] overflow-hidden rounded-full relative z-10">
                <div className="w-1/3 h-full bg-[#A89270] group-hover:w-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,146,112,0.8)]" />
              </div>
            </div>

            {/* Side Feature 1 */}
            <div className="md:col-span-4 bg-[#111815]/90 backdrop-blur-md border border-[#A89270]/20 p-10 hover:border-[#A89270]/50 transition-colors duration-500 flex flex-col justify-between group shadow-xl">
              <div>
                <LineChart className="w-10 h-10 text-[#A89270] mb-8" />
                <h3 className="text-3xl font-serif text-white mb-4">Investment Portfolios</h3>
                <p className="text-[#F8F8F6]/70 leading-relaxed">
                  Precision forecasting and tax-efficient drawdown strategies tailored to your exact risk profile.
                </p>
              </div>
              <ChevronRight className="w-8 h-8 text-[#A89270] self-end opacity-30 group-hover:opacity-100 transition-opacity duration-300 mt-8" />
            </div>

            {/* Side Feature 2 */}
            <div className="md:col-span-4 bg-[#A89270] p-10 text-[#111815] group hover:bg-white transition-colors duration-500 flex flex-col justify-between shadow-xl">
              <div>
                <Briefcase className="w-10 h-10 mb-8" />
                <h3 className="text-3xl font-serif mb-4 font-bold">Business Owner Exit</h3>
                <p className="text-[#111815]/80 leading-relaxed font-medium">
                  Bespoke financial leadership and exit strategies for founders preparing for massive liquidity events.
                </p>
              </div>
              <ArrowRight className="w-8 h-8 self-end transform group-hover:translate-x-3 transition-transform duration-300 mt-8" />
            </div>

            {/* Bottom Wide Feature */}
            <div className="md:col-span-8 bg-[#111815]/90 backdrop-blur-md border border-[#A89270]/20 p-10 md:p-16 hover:border-[#A89270]/50 transition-colors duration-500 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Chartered Financial Planners</h3>
              <p className="text-[#A89270] uppercase tracking-widest text-sm mb-12 font-semibold">The Gold Standard in Advice</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="border-l border-[#A89270]/20 pl-6">
                  <div className="text-5xl font-serif text-white mb-4 opacity-50">01</div>
                  <p className="text-sm text-[#F8F8F6]/80 leading-relaxed">Initial deep-dive discovery & audit of your current exposure.</p>
                </div>
                <div className="border-l border-[#A89270]/20 pl-6">
                  <div className="text-5xl font-serif text-white mb-4 opacity-50">02</div>
                  <p className="text-sm text-[#F8F8F6]/80 leading-relaxed">Bespoke architectural strategy design and portfolio restructuring.</p>
                </div>
                <div className="border-l border-[#A89270]/20 pl-6">
                  <div className="text-5xl font-serif text-white mb-4 opacity-50">03</div>
                  <p className="text-sm text-[#F8F8F6]/80 leading-relaxed">Generational deployment and ongoing fiduciary management.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-[#A89270]/20 bg-[#0B2118] py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-8 md:mb-0 opacity-70">
            <Landmark className="w-8 h-8 text-[#A89270]" />
            <span className="text-xl font-serif tracking-widest text-white">DUNHAM WEALTH</span>
          </div>
          <div className="text-sm text-[#F8F8F6]/50">
            © {new Date().getFullYear()} Dunham Wealth Management. Authorized and Regulated by the FCA.
          </div>
          <div className="mt-8 md:mt-0 flex gap-8 text-xs text-[#A89270] uppercase tracking-[0.2em] font-semibold">
            <Link to="/" className="hover:text-white transition-colors border border-[#A89270] px-4 py-2">Return to CRM</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
