import React from 'react';
import { MessageSquare } from 'lucide-react';

const WHATSAPP_QUOTE_URL = `https://wa.me/447348733365?text=${encodeURIComponent(
  "Hi Dean, I'd like to get a quote for a website for my business."
)}`;

interface BottomTabBarProps {
  onOpenQuote: () => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ onOpenQuote }) => {
  return (
    <nav 
      aria-label="Mobile Contact Bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#07090E]/95 backdrop-blur-md border-t border-slate-200 dark:border-white/[0.08] px-2.5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] flex gap-2 items-center md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
    >
      <button
        type="button"
        onClick={() => onOpenQuote()}
        className="flex-1 min-h-[48px] px-3 rounded-xl bg-[#D90429] hover:bg-[#b80322] text-white font-bold text-base flex items-center justify-center transition-colors shadow-sm"
      >
        Get a Quote
      </button>

      <a
        href={WHATSAPP_QUOTE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[48px] px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-base flex items-center justify-center gap-1.5 transition-colors shadow-sm"
      >
        <MessageSquare className="w-4 h-4 fill-black" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </nav>
  );
};
