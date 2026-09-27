import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenWhatsApp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#040507]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">

        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group shrink-0 min-h-[48px]">
          <img
            src="/logo.jpg"
            alt="DSW Atom Logo"
            width={40}
            height={40}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-contain drop-shadow-[0_0_8px_rgba(217,4,41,0.5)] transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col justify-center mt-0.5">
            <span className="font-geist font-bold text-sm sm:text-lg text-slate-900 dark:text-zinc-100 tracking-tight group-hover:text-[#D90429] dark:group-hover:text-[#D90429] transition-colors leading-none">
              Design Systems Web
            </span>
            <span className="text-[8px] sm:text-[10px] tracking-widest uppercase font-mono font-semibold text-slate-500 dark:text-zinc-400 mt-1 leading-none">
              Websites and web apps
            </span>
          </div>
        </Link>

        {/* Right-side Actions (Theme Toggle + Red Quote Button) */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 border border-slate-300 dark:border-white/[0.08] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.04] rounded-xl min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors"
            title="Switch between light and dark mode"
            aria-label="Switch between light and dark mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Desktop CTA */}
          <button
            type="button"
            onClick={() => onOpenQuote()}
            className="hidden sm:flex bg-[#D90429] hover:bg-[#b80322] text-white shadow-lg shadow-red-600/20 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all items-center gap-1.5 min-h-[48px]"
          >
            Get a Quote
          </button>

          {/* Mobile CTA */}
          <button
            type="button"
            onClick={() => onOpenQuote()}
            className="sm:hidden bg-[#D90429] hover:bg-[#b80322] text-white shadow-md shadow-red-600/20 px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all min-h-[48px] flex items-center justify-center"
          >
            Quote
          </button>
        </div>
      </div>
    </header>
  );
};

