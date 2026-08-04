import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { QuoteForm } from './QuoteForm';

interface BottomTabBarProps {}

export const BottomTabBar: React.FC<BottomTabBarProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

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

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-[60] bg-[#111111] border-t border-black h-16 flex items-center md:hidden pb-safe w-full">
        <button 
          onClick={() => window.location.href = 'tel:07348733365'}
          className="flex-1 h-full bg-[#ff4d4d] text-white font-geist font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors hover:bg-[#ff3333]"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 1.01-.63 1.01-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
          CALL DEAN
        </button>
        
        <button 
          onClick={() => setIsQuoteModalOpen(true)}
          className="flex-1 h-full bg-[#111111] text-white font-geist font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors hover:bg-[#222222]"
        >
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          BOOK CHAT
        </button>
      </div>

      {/* Quote Form Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsQuoteModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-lg bg-[#191c1e] rounded-2xl shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-[#2a2f32] hover:bg-[#3f4549] rounded-full text-slate-300 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-1">
              <QuoteForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
