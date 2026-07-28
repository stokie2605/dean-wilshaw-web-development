import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Clock, MessageSquare, Target, Wrench } from 'lucide-react';

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
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Visual Card "25 Years Operational Discipline" */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative h-full">
          <div 
            onClick={handleAvatarClick}
            className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm relative group hover:border-red-600 dark:hover:border-red-500 transition-all w-full aspect-square sm:aspect-auto sm:h-full min-h-[300px] cursor-pointer"
          >
            <img src="/avatar-cartoon.webp" alt="Dean Wilshaw" className="w-full h-full object-cover" />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3 rounded-lg shadow-md flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-red-600 dark:text-red-500" />
            <span className="font-geist font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
              Reliable Execution
            </span>
          </div>
        </div>

        {/* Right Column: Copy & Principles */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
          
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-red-600 dark:text-red-500 px-3 py-1 rounded-full text-xs font-mono font-semibold w-fit">
            <Wrench className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
            <span>Adaptable & Driven</span>
          </div>

          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white leading-snug">
            Logistics Background. <br className="hidden sm:block"/> Technology Future.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            I spent 25 years in the trenches of logistics and warehousing. It taught me hard work and operational discipline, but my true passion has always been technology.
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            I completely pivoted my career to master modern web development and AI. I am constantly learning, highly adaptable, and willing to tackle any technical challenge. Whether you need a simple landing page or a complex custom web application, I will figure it out and build it right.
          </p>

          {/* Core Principles */}
          <ul className="space-y-4 pt-2">
            <li className="flex items-start gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
              <span className="w-1.5 h-6 bg-red-600 dark:bg-red-500 rounded-sm shrink-0 mt-0.5"></span>
              <div>
                <p className="font-geist font-semibold text-sm sm:text-base text-slate-900 dark:text-white">Hungry for Knowledge.</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">Always expanding my skillset with the latest frameworks and AI integrations.</p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
              <span className="w-1.5 h-6 bg-red-600 dark:bg-red-500 rounded-sm shrink-0 mt-0.5"></span>
              <div>
                <p className="font-geist font-semibold text-sm sm:text-base text-slate-900 dark:text-white">Highly Adaptable.</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">No rigid agency rules. I assess your specific problem and build the exact tool you need.</p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
              <span className="w-1.5 h-6 bg-red-600 dark:bg-red-500 rounded-sm shrink-0 mt-0.5"></span>
              <div>
                <p className="font-geist font-semibold text-sm sm:text-base text-slate-900 dark:text-white">Reliable Execution.</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">I bring 25 years of operational discipline to every single line of code I write.</p>
              </div>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
};

