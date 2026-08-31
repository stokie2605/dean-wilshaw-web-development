import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenWhatsApp?: () => void;
  onOpenStitch?: () => void;
}

// Clean 4-Page Navigation Structure (Desktop)
const NAV_LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'Tools',   href: '/tools' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Demos',   href: '/demos' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

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
        <Link to="/" className="flex items-center gap-3 group shrink-0">
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
              DIGITAL INFRASTRUCTURE
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links (Clean 3-Page Nav) */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`px-4 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'bg-red-50 dark:bg-red-950/40 text-[#D90429] dark:text-red-400 border border-red-200 dark:border-red-800/50'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.04]'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right-side Actions (Theme Toggle + Red Quote Button) */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 border border-slate-300 dark:border-white/[0.08] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.04] rounded-lg min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors"
            title="Toggle Dark/Light Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Desktop CTA */}
          <button
            onClick={onOpenQuote}
            className="hidden sm:flex bg-[#D90429] hover:bg-[#b80322] text-white shadow-lg shadow-red-600/20 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all items-center gap-1.5"
          >
            Get a Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile CTA (Compact, No Hamburger Needed) */}
          <button
            onClick={onOpenQuote}
            className="sm:hidden bg-[#D90429] hover:bg-[#b80322] text-white shadow-md shadow-red-600/20 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all"
          >
            Quote
          </button>
        </div>
      </div>
    </header>
  );
};
