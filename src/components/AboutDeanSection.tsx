import React from 'react';
import { MapPin, Zap, ShieldCheck, Check, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export const AboutDeanSection: React.FC = () => {
  return (
    <section id="about" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#040507] border-b border-slate-200 dark:border-white/[0.08] scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">
        
        {/* Left Column: 3-Step Process Menu Card */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase w-fit">
              Simple 3-Step Delivery
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mt-3">
              How It Works
            </h3>

            <ul className="mt-5 divide-y divide-slate-100 dark:divide-white/[0.06]">
              <li className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    01 / Direct WhatsApp Consultation
                  </span>
                </div>
                <span className="w-fit ml-[26px] bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-[11px] px-2.5 py-1 rounded-full font-medium shadow-sm">
                  Same Day (15 mins)
                </span>
                <p className="ml-[26px] text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Quick message exchange to discuss your business, services, contact buttons, and photo assets.
                </p>
              </li>

              <li className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    02 / Private Mobile Preview
                  </span>
                </div>
                <span className="w-fit ml-[26px] bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-[11px] px-2.5 py-1 rounded-full font-medium shadow-sm">
                  Within 5 Working Days
                </span>
                <p className="ml-[26px] text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  I build your site on a private link. You review and tap through the layout on your phone before paying the final balance.
                </p>
              </li>

              <li className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    03 / Launch &amp; Full Ownership
                  </span>
                </div>
                <span className="w-fit ml-[26px] bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800 text-[11px] px-2.5 py-1 rounded-full font-medium shadow-sm">
                  Day 5 to 7
                </span>
                <p className="ml-[26px] text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  We connect your custom domain, test all phone and WhatsApp links, and hand over 100% of your website files.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Copy & Accountability Principles */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-5 sm:gap-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase w-fit">
            Solo Web Developer
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            Hi, I'm Dean.
          </h2>

          <h3 className="text-lg sm:text-xl font-semibold text-[#D90429] leading-snug">
            A local web developer building clean, modern websites for independent businesses.
          </h3>

          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            I build websites from scratch with clean, modern layouts. Working with me means direct one to one contact with zero agency overhead and zero technical jargon.
          </p>

          {/* 3 Accountability Badges: compact checkmark list on mobile, full cards on desktop */}
          <ul className="md:hidden space-y-2 pt-1">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 leading-snug">
                Local to Stoke-on-Trent &amp; Cheshire
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 leading-snug">
                Direct one to one contact with Dean
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 leading-snug">
                Full website ownership
              </span>
            </li>
          </ul>

          <ul className="hidden md:block space-y-3 pt-1">
            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-3.5 sm:p-4 rounded-xl shadow-sm">
              <MapPin className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                Based in Stoke-on-Trent &amp; Cheshire, local and accountable
              </span>
            </li>

            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-3.5 sm:p-4 rounded-xl shadow-sm">
              <Zap className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                Direct One to One Contact with Dean (No Account Managers or Middlemen)
              </span>
            </li>

            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-3.5 sm:p-4 rounded-xl shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                Full Client Website Ownership and Clear Pricing
              </span>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
};

