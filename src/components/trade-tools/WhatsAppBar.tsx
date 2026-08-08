import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';

interface WhatsAppBarProps {
  phoneNumber?: string;
  tradeName?: string;
}

export const WhatsAppBar: React.FC<WhatsAppBarProps> = ({ 
  phoneNumber = "447348733365", 
  tradeName = "Local Service" 
}) => {
  const encodedText = encodeURIComponent(`Hi, I'm looking for a quote for some local work. Can we chat?`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl relative shadow-md">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 text-slate-500 dark:text-zinc-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-700 shadow-sm">Mobile View Simulation</div>
      
      <div className="pt-4 space-y-4">
        <div className="h-32 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-zinc-600 text-sm shadow-inner">Mobile Website Content...</div>
        
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${phoneNumber}`}
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all cursor-pointer shadow-sm"
          >
            <Phone className="w-4 h-4 text-emerald-500" />
            <span>Call Direct</span>
          </a>
          <a
            href={whatsappUrl}
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-all cursor-pointer shadow-sm shadow-[#25D366]/20"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp Me</span>
          </a>
        </div>
      </div>
    </div>
  );
};
