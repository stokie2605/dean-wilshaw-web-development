import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Zap, Lock, ShieldCheck } from 'lucide-react';

export const AboutDeanSection: React.FC = () => {
  const navigate = useNavigate();
  const [clickTimes, setClickTimes] = useState<number[]>([]);

  const handleAvatarClick = () => {
    const now = Date.now();
    const newTimes = [...clickTimes, now].slice(-3);
    setClickTimes(newTimes);

    if (newTimes.length === 3 && now - newTimes[0] < 500) {
      navigate('/admin');
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#040507] border-b border-slate-200 dark:border-white/[0.08] scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Dean Cartoon Portrait Card */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative h-full">
          <div 
            onClick={handleAvatarClick}
            className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xl relative group hover:border-[#D90429] dark:hover:border-[#D90429] transition-all w-full aspect-square sm:aspect-auto sm:h-full min-h-[320px] cursor-pointer"
          >
            <img 
              src="/avatar-cartoon.webp" 
              alt="Dean Wilshaw - Design Systems Web" 
              width={600} 
              height={600} 
              loading="lazy" 
              decoding="async" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Right Column: Copy & Accountability Principles */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 text-xs font-semibold uppercase tracking-wide w-fit font-mono">
            Solo Local Engineer
          </div>

          <h2 className="font-geist font-bold text-3xl sm:text-5xl text-slate-900 dark:text-white leading-snug tracking-tight">
            Hi, I'm Dean.
          </h2>

          <h3 className="text-xl sm:text-2xl font-semibold text-[#D90429] leading-snug">
            A local digital systems engineer helping UK trades capture more direct jobs.
          </h3>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed">
            I build high-converting digital systems and web engines from scratch. Working with me means direct 1-on-1 contact with no middle management, no junior devs, and zero tech jargon.
          </p>

          {/* 3 Accountability Badges */}
          <ul className="space-y-3 pt-2">
            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-4 rounded-xl shadow-md">
              <MapPin className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-geist font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                Based in ST7 / Cheshire &amp; Stoke-on-Trent (Local &amp; Accountable)
              </span>
            </li>

            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-4 rounded-xl shadow-md">
              <Zap className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-geist font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                Direct 1-on-1 Access with Dean (Zero Junior Devs or Account Managers)
              </span>
            </li>

            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-4 rounded-xl shadow-md">
              <ShieldCheck className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-geist font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                100% Client Source Code Ownership &amp; Transparent Pricing
              </span>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
};
