import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Zap, ShieldCheck } from 'lucide-react';

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
    <section id="about" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#040507] border-b border-slate-200 dark:border-white/[0.08] scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">
        
        {/* Left Column: Dean Cartoon Portrait Card */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative h-full flex justify-center items-center">
          <div 
            onClick={handleAvatarClick}
            className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xl relative group hover:border-[#D90429] dark:hover:border-[#D90429] transition-all w-full max-w-[240px] md:max-w-md mx-auto aspect-square sm:aspect-auto sm:h-full min-h-[240px] md:min-h-[320px] cursor-pointer"
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
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-5 sm:gap-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase w-fit">
            Solo Local Engineer
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            Hi, I'm Dean.
          </h2>

          <h3 className="text-lg sm:text-xl font-semibold text-[#D90429] leading-snug">
            A local digital systems engineer helping UK trades capture more direct jobs.
          </h3>

          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            I build websites and digital lead tools from scratch. Working with me means direct one to one contact with no middle management, no junior developers, and zero tech jargon.
          </p>

          {/* 3 Accountability Badges */}
          <ul className="space-y-3 pt-1">
            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-3.5 sm:p-4 rounded-xl shadow-sm">
              <MapPin className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                Based in Cheshire & Stoke on Trent  /  local and accountable
              </span>
            </li>

            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-3.5 sm:p-4 rounded-xl shadow-sm">
              <Zap className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                Direct One to One Access with Dean (Zero Junior Developers or Account Managers)
              </span>
            </li>

            <li className="flex items-center gap-3 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] p-3.5 sm:p-4 rounded-xl shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#D90429] shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                100% Client Website Ownership and Transparent Pricing
              </span>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
};

