import React, { useState, useEffect } from 'react';
import { ArrowRight, Sun, Moon, Menu, X, Bot } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
  onOpenStitch: () => void;
}

// Unified navigation links matching the 6 interactive trade widgets
const NAV_LINKS = [
  { label: 'Missed-Call Auto-Text',     href: '#missed-call' },
  { label: 'Deposit & Booking Portal', href: '#deposit-portal' },
  { label: 'WhatsApp Fast Bar',        href: '#whatsapp-bar' },
  { label: 'Live Trust Indicators',    href: '#trust-bar' },
  { label: 'Instant Quote Calculator', href: '#quote-calculator' },
  { label: '24/7 AI Lead Assistant',   href: '#ai-bot' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onOpenWhatsApp, onOpenStitch }) => {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (href === '#ai-bot') {
      const el = document.getElementById('ai-bot');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        onOpenStitch();
      }
      return;
    }

    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">

        {/* Brand Logo & Name */}
        <a href="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/logo.jpg"
            alt="DSW Atom Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-contain drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col justify-center mt-1">
            <span className="font-geist font-bold text-base sm:text-lg text-slate-900 dark:text-zinc-100 tracking-tight group-hover:text-red-700 dark:group-hover:text-red-500 transition-colors leading-none">
              Design Systems Web
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-slate-500 dark:text-zinc-400 mt-1 leading-none">
              DIGITAL INFRASTRUCTURE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150 whitespace-nowrap"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right-side Actions */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg min-w-[38px] min-h-[38px] flex items-center justify-center transition-colors"
            title="Toggle Dark/Light Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Desktop CTA */}
          <button
            onClick={onOpenQuote}
            className="hidden sm:flex bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all items-center gap-1.5"
          >
            Get a Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile CTA */}
          <button
            onClick={onOpenQuote}
            className="sm:hidden bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all"
          >
            Get Quote
          </button>

          {/* Mobile/Tablet Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="lg:hidden p-2 rounded-lg border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Nav */}
      {menuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1 shadow-xl animate-in fade-in slide-in-from-top-2">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150 flex items-center justify-between"
            >
              <span>{label}</span>
              {href === '#ai-bot' && (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-red-500/10 text-red-500 rounded-full border border-red-500/20">
                  24/7 AI
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
