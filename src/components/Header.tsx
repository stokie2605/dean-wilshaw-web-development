import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Phone, Bot, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
  onOpenStitch: () => void;
}

const AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuA8e_CVpDqlJmvVgwq8mfsfv1MN4Xh0R1At79k3YteVYCQD7jQasQqs7QuztqDYFk_FHxuFPxS1tPjfap95ATBzdxT9JWbXfcpAEcK4BEb1jdYnHB-ljlsDzdm7QW0mY6cCAarD6uzfOgFUWCsOvkJmtlFTFj9TickLiAZuczAGbXe4hL1hwoulVe6eJ0D-hqciw0CIPXvZnTTUytNQX2u2nynEleEJWs7d31mlWssjVI7reTt7yOWkMxmw5RDiDea0U9jVUAl0Y9E";

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onOpenWhatsApp, onOpenStitch }) => {
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/dsw-logo.svg"
            alt="DSW Atom Logo"
            className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col justify-center mt-1">
            <span className="font-geist font-bold text-lg text-slate-900 dark:text-white tracking-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors leading-none">
              Dean Wilshaw
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500 dark:text-slate-400 mt-1 leading-none">
              Web Development
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#about" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
            About Me
          </a>
          <a href="#portfolio" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
            My Work
          </a>
          <a href="#services" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
            Services
          </a>
        </nav>

        {/* Action Buttons Container */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuote}
            className="md:hidden bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5"
            title="Get a Quote"
          >
            Quote
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors"
            title="Toggle Dark/Light Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
          
          <button
            onClick={onOpenQuote}
            className="bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5"
          >
            Get a Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          </div>
        </div>

      </div>
    </header>
  );
};

