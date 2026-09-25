import React from 'react';
import { MapPin, Zap, ShieldCheck, Check } from 'lucide-react';

export const AboutDeanSection: React.FC = () => {
  return (
    <section id="about" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#040507] border-b border-slate-200 dark:border-white/[0.08] scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">
        
        {/* Left Column: 3-Step Process Menu Card */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div id="how-it-works" className="scroll-mt-20 sm:scroll-mt-24 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
              How it works
            </h2>

            <div className="relative mt-6">
              <div className="absolute left-5 top-5 bottom-5 w-px bg-slate-200 dark:bg-white/10"></div>

              <ul className="space-y-7">
                <li className="relative flex gap-4">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#D90429] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                    1
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        Direct WhatsApp Consultation
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      Quick message exchange to discuss your business, services, and what you want your website to do.
                    </p>
                  </div>
                </li>

                <li className="relative flex gap-4">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#D90429] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                    2
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        Private Mobile Preview
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      I build your site on a private link. You review and tap through the layout on your phone before paying the final balance.
                    </p>
                  </div>
                </li>

                <li className="relative flex gap-4">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#D90429] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                    3
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        Launch and Full Ownership
                      </span>
                      <span className="bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-[11px] px-2.5 py-1 rounded-full font-medium shadow-sm">
                        5 to 7 working days
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      We connect your custom domain, test all phone and WhatsApp links, and the finished website is yours once it is paid for.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Copy & Accountability Principles */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-5 sm:gap-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase w-fit">
            Local web developer
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            Hi, I'm Dean.
          </h2>

          <p className="text-lg sm:text-xl font-semibold text-[#D90429] leading-snug">
            Based in Alsager, helping businesses and trades across Stoke and Cheshire get more enquiries online.
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            I engineer fast websites and custom tools that convert visitors into calls and messages. Working with me means direct communication with the person writing your code.
          </p>

          {/* 3 Accountability Badges: compact checkmark list on mobile, full cards on desktop */}
          <ul className="md:hidden space-y-2 pt-1">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 leading-snug">
                Based in Alsager, covering Stoke on Trent and Cheshire
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 leading-snug">
                Direct phone and WhatsApp contact throughout your project
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 leading-snug">
                100 percent code ownership upon completion with zero platform lock in
              </span>
            </li>
          </ul>

          <ul className="hidden md:block space-y-3 pt-1">
            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-3.5 sm:p-4 rounded-xl shadow-sm">
              <MapPin className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                Based in Alsager, covering Stoke on Trent and Cheshire
              </span>
            </li>

            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-3.5 sm:p-4 rounded-xl shadow-sm">
              <Zap className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                Direct one to one access with Dean
              </span>
            </li>

            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-3.5 sm:p-4 rounded-xl shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                You own your website once it is paid for, with a clear, fixed quote upfront
              </span>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
};

