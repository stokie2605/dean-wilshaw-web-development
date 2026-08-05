import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Zap, Lock, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const navigate = useNavigate();
  const [clickTimes, setClickTimes] = useState<number[]>([]);

  const handleAvatarClick = () => {
    const now = Date.now();
    const newTimes = [...clickTimes, now].slice(-3);
    setClickTimes(newTimes);

    if (newTimes.length === 3 && now - newTimes[0] < 500) {
      navigate('/outreach');
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Visual Card */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative h-full">
          <div 
            onClick={handleAvatarClick}
            className="bg-slate-50 dark:bg-zinc-900/60/50 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm relative group hover:border-red-600 dark:hover:border-red-500 transition-all w-full aspect-square sm:aspect-auto sm:h-full min-h-[300px] cursor-pointer"
          >
            <img src="/avatar-cartoon.webp" alt="Dean Wilshaw" width={600} height={600} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Column: Copy & Principles */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
          
          <h2 className="font-geist font-bold text-3xl sm:text-5xl text-slate-900 dark:text-zinc-100 leading-snug tracking-tight">
            Hi, I'm Dean.
          </h2>

          <h3 className="text-xl sm:text-2xl font-semibold text-red-700 dark:text-red-500 leading-snug">
            A local freelance web developer helping local businesses grow online.
          </h3>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed">
            I build clean, fast websites from scratch that look great on phones and make it easy for customers to get in touch. Working with me means direct 1-on-1 contact - no middle management, no junior devs, and zero tech jargon.
          </p>

          {/* Core Principles */}
          <ul className="space-y-4 pt-4">
            <li className="flex items-center gap-3 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
              <MapPin className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
              <span className="font-geist font-semibold text-sm sm:text-base text-slate-900 dark:text-zinc-100">Based in Cheshire & Stoke-on-Trent (Local & Accountable)</span>
            </li>

            <li className="flex items-center gap-3 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
              <Zap className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
              <span className="font-geist font-semibold text-sm sm:text-base text-slate-900 dark:text-zinc-100">Direct 1-on-1 Access (No Middlemen)</span>
            </li>

            <li className="flex items-center gap-3 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
              <Lock className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
              <span className="font-geist font-semibold text-sm sm:text-base text-slate-900 dark:text-zinc-100">Clear Pricing & Zero Technical Homework</span>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
};
