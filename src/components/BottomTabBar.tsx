import React, { useEffect, useState } from 'react';
import { Briefcase, Zap, Tag } from 'lucide-react';

interface BottomTabBarProps {}

export const BottomTabBar: React.FC<BottomTabBarProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['portfolio', 'services', 'pricing'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveTab(id);
  };

  const tabs = [
    { id: 'portfolio', label: 'Work', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Zap },
    { id: 'pricing', label: 'Rates', icon: Tag },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] bg-slate-900/95 border-t border-slate-800 backdrop-blur-xl h-16 px-4 py-1 flex justify-around items-center md:hidden pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button 
            key={tab.id}
            onClick={() => scrollTo(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 p-2 w-16 ${isActive ? 'text-red-500 scale-110' : 'text-slate-400 hover:text-white'}`}
          >
            <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'translate-y-[-2px]' : ''}`} />
            <span className={`text-[10px] font-sans transition-all duration-300 ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
