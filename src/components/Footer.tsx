import React from 'react';

interface FooterProps {
  onOpenWhatsApp: () => void;
  onOpenQuote: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp, onOpenQuote, onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-slate-100 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 w-full border-t border-slate-200 dark:border-zinc-800 pt-10 pb-28 md:pb-10 px-4 sm:px-6 lg:px-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Contact Info & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex flex-col items-center md:items-start gap-1.5 text-sm text-slate-800 dark:text-zinc-300 font-medium">
            <span className="flex items-center gap-2">Phone: 07348 733365</span>
            <span className="flex items-center gap-2">Email: dean.wilshaw.web@gmail.com</span>
            <span className="flex items-center gap-2">Based in Cheshire & Stoke-on-Trent</span>
          </div>
          <div className="text-xs text-slate-600 dark:text-zinc-400 text-center md:text-left font-normal mt-2">
            <p className="mb-1">Design Systems Web is a trading name of Dean Wilshaw, operating as a sole trader in Cheshire, UK.</p>
            <p>&copy; {new Date().getFullYear()} Design Systems Web. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side: Direct Contact & Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-400">
          <button
            onClick={onOpenWhatsApp}
            className="hover:text-red-700 dark:hover:text-red-500 font-semibold underline transition-colors text-emerald-600 dark:text-emerald-400"
          >
            WhatsApp Dean
          </button>

          <button
            onClick={onOpenQuote}
            className="hover:text-red-700 dark:hover:text-red-500 underline transition-colors"
          >
            Get a Quote
          </button>

          <button
            onClick={onOpenPrivacy}
            className="hover:text-red-700 dark:hover:text-red-500 underline transition-colors"
          >
            Privacy Policy
          </button>

          <button
            onClick={onOpenTerms}
            className="hover:text-red-700 dark:hover:text-red-500 underline transition-colors"
          >
            Terms & Conditions
          </button>
        </div>

      </div>
    </footer>
  );
};

