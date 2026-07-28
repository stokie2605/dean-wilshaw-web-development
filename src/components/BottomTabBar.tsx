import React from 'react';
import { Briefcase, Zap, Tag, Bot, MessageCircle } from 'lucide-react';

interface BottomTabBarProps {
  onOpenStitch: () => void;
  onOpenWhatsApp: () => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ onOpenStitch, onOpenWhatsApp }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-slate-900/90 border-t border-slate-800 backdrop-blur-xl h-16 px-2 py-1 flex justify-around items-center md:hidden pb-safe">
      <button 
        onClick={() => scrollTo('portfolio')}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors p-2"
      >
        <Briefcase className="w-5 h-5" />
        <span className="text-[10px] font-medium font-sans">Work</span>
      </button>

      <button 
        onClick={() => scrollTo('services')}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors p-2"
      >
        <Zap className="w-5 h-5" />
        <span className="text-[10px] font-medium font-sans">Services</span>
      </button>

      <button 
        onClick={() => scrollTo('pricing')}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors p-2"
      >
        <Tag className="w-5 h-5" />
        <span className="text-[10px] font-medium font-sans">Pricing</span>
      </button>

      <button 
        onClick={onOpenStitch}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-red-500 transition-colors p-2"
      >
        <Bot className="w-5 h-5" />
        <span className="text-[10px] font-medium font-sans">Ask AI</span>
      </button>

      <button 
        onClick={onOpenWhatsApp}
        className="flex flex-col items-center gap-1 text-emerald-500 hover:text-emerald-400 transition-colors p-2"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[10px] font-medium font-sans">WhatsApp</span>
      </button>
    </div>
  );
};
