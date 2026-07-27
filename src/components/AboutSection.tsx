import React from 'react';
import { ShieldCheck, Clock, MessageSquare, Target, Wrench } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#f2f4f6] border-b border-[#c6c6cd]/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Visual Card "25 Years Operational Discipline" */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative">
          <div className="bg-white border border-[#c6c6cd] rounded-xl overflow-hidden shadow-sm p-8 sm:p-12 flex flex-col justify-center items-center text-center relative group hover:border-[#dc2626] transition-all">
            
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#f1f5f9] rounded-2xl flex items-center justify-center text-[#c6c6cd] group-hover:text-[#dc2626] transition-colors mb-6 border border-[#c6c6cd]/50">
              <span className="material-symbols-outlined text-[64px]">engineering</span>
            </div>

            <h4 className="font-geist font-bold text-3xl sm:text-4xl text-[#191c1e] mb-2">
              25 Years
            </h4>
            <p className="text-base text-[#45464d] font-medium">
              Operational Discipline
            </p>
            <p className="text-xs text-[#76777d] mt-2 font-mono">
              Logistics Leadership &rarr; Software Engineering
            </p>
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-[#f1f5f9] border border-[#c6c6cd] px-4 py-3 rounded-lg shadow-md flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#991b1b]" />
            <span className="font-geist font-semibold text-xs sm:text-sm text-[#191c1e]">
              Reliable Execution
            </span>
          </div>
        </div>

        {/* Right Column: Copy & Principles */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
          
          <div className="inline-flex items-center gap-2 bg-[#ffffff] border border-[#c6c6cd] text-[#991b1b] px-3 py-1 rounded-full text-xs font-mono font-semibold w-fit">
            <Wrench className="w-3.5 h-3.5 text-[#dc2626]" />
            <span>Adaptable & Driven</span>
          </div>

          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-[#191c1e] leading-snug">
            Logistics Background. <br className="hidden sm:block"/> Technology Future.
          </h2>

          <p className="text-base sm:text-lg text-[#45464d] leading-relaxed">
            I spent 25 years in the trenches of logistics and warehousing. It taught me hard work and operational discipline, but my true passion has always been technology.
          </p>

          <p className="text-sm sm:text-base text-[#45464d] leading-relaxed">
            I completely pivoted my career to master modern web development and AI. I am constantly learning, highly adaptable, and willing to tackle any technical challenge. Whether you need a simple landing page or a complex custom web application, I will figure it out and build it right.
          </p>

          {/* Core Principles */}
          <ul className="space-y-4 pt-2">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-6 bg-[#dc2626] rounded-sm shrink-0 mt-0.5"></span>
              <div>
                <p className="font-geist font-semibold text-sm sm:text-base text-[#191c1e]">Hungry for Knowledge.</p>
                <p className="text-xs text-[#45464d]">Always expanding my skillset with the latest frameworks and AI integrations.</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-1.5 h-6 bg-[#dc2626] rounded-sm shrink-0 mt-0.5"></span>
              <div>
                <p className="font-geist font-semibold text-sm sm:text-base text-[#191c1e]">Highly Adaptable.</p>
                <p className="text-xs text-[#45464d]">No rigid agency rules. I assess your specific problem and build the exact tool you need.</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-1.5 h-6 bg-[#dc2626] rounded-sm shrink-0 mt-0.5"></span>
              <div>
                <p className="font-geist font-semibold text-sm sm:text-base text-[#191c1e]">Reliable Execution.</p>
                <p className="text-xs text-[#45464d]">I bring 25 years of operational discipline to every single line of code I write.</p>
              </div>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
};

