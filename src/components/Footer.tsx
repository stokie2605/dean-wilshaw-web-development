import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-slate-100 dark:bg-[#07090E] text-slate-900 dark:text-zinc-100 w-full border-t border-slate-200 dark:border-white/[0.08] pt-10 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-12 px-4 sm:px-6 lg:px-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Left Side: Contact Info & Sole Trader Disclosure */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex flex-col items-center md:items-start gap-2 text-base text-slate-800 dark:text-zinc-300 font-medium">
            <a 
              href="tel:07348733365" 
              className="hover:text-[#D90429] dark:hover:text-red-400 transition-colors inline-flex items-center min-h-[48px]"
            >
              Phone: 07348 733365
            </a>
            <a 
              href="mailto:dean.wilshaw.web@gmail.com" 
              className="hover:text-[#D90429] dark:hover:text-red-400 transition-colors inline-flex items-center min-h-[48px]"
            >
              Email: dean.wilshaw.web@gmail.com
            </a>
            <span className="text-base text-slate-600 dark:text-zinc-400">
              Based in Alsager, covering Stoke on Trent and Cheshire
            </span>
          </div>
          <div className="text-base text-slate-600 dark:text-zinc-400 text-center md:text-left font-normal mt-2 leading-relaxed max-w-md">
            <p className="mb-1">Design Systems Web is a trading name of Dean Wilshaw, operating as a sole trader in Alsager, Cheshire, UK.</p>
            <p>&copy; {new Date().getFullYear()} Design Systems Web. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side: Crawlable Legal Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-1 text-base font-medium text-slate-600 dark:text-zinc-400">
          <Link
            to="/check"
            className="hover:text-[#D90429] dark:hover:text-red-400 underline transition-colors inline-flex items-center min-h-[48px]"
          >
            Free Website Check
          </Link>

          <a
            href="/privacy"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onOpenPrivacy();
              }
            }}
            className="hover:text-[#D90429] dark:hover:text-red-400 underline transition-colors inline-flex items-center min-h-[48px]"
          >
            Privacy Policy
          </a>

          <a
            href="/terms"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onOpenTerms();
              }
            }}
            className="hover:text-[#D90429] dark:hover:text-red-400 underline transition-colors inline-flex items-center min-h-[48px]"
          >
            Terms and Conditions
          </a>
        </div>

      </div>
    </footer>
  );
};
