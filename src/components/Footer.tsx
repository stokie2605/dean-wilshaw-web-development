import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp: () => void;
  onOpenQuote: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp, onOpenQuote, onOpenPrivacy, onOpenTerms }) => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('dean.wilshaw.web@gmail.com');
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 3000);
    window.open(
      'https://mail.google.com/mail/?view=cm&fs=1&to=dean.wilshaw.web@gmail.com',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#07090E] text-slate-900 dark:text-zinc-100 w-full border-t border-slate-200 dark:border-white/[0.08] pt-10 pb-28 md:pb-12 px-4 sm:px-6 lg:px-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Left Side: Contact Info & Sole Trader Disclosure */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex flex-col items-center md:items-start gap-2 text-sm text-slate-800 dark:text-zinc-300 font-medium">
            <a 
              href="tel:07348733365" 
              className="hover:text-[#D90429] dark:hover:text-red-400 transition-colors inline-flex items-center min-h-[44px]"
            >
              Phone: 07348 733365
            </a>
            <div className="inline-flex items-center gap-2">
              <a 
                href="mailto:dean.wilshaw.web@gmail.com" 
                onClick={handleEmailClick}
                className="hover:text-[#D90429] dark:hover:text-red-400 transition-colors inline-flex items-center min-h-[44px]"
                title="Click to copy address and compose in Gmail"
              >
                Email: dean.wilshaw.web@gmail.com
              </a>
              {emailCopied ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                  <Check className="w-3 h-3" />
                  Copied!
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleEmailClick}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 px-2 py-1 rounded border border-slate-200 dark:border-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                  title="Copy email address to clipboard and open Gmail"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              )}
            </div>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              Based in Alsager, covering Stoke on Trent and Cheshire
            </span>
          </div>
          <div className="text-xs text-slate-600 dark:text-zinc-400 text-center md:text-left font-normal mt-2 leading-relaxed max-w-md">
            <p className="mb-1">Design Systems Web is a trading name of Dean Wilshaw, operating as a sole trader in Alsager, Cheshire, UK.</p>
            <p>&copy; {new Date().getFullYear()} Design Systems Web. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side: Direct Actions & Crawlable Legal Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-400">
          <button
            type="button"
            onClick={onOpenWhatsApp}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold underline transition-colors text-emerald-600 dark:text-emerald-500 inline-flex items-center min-h-[44px]"
          >
            WhatsApp Dean
          </button>

          <button
            type="button"
            onClick={onOpenQuote}
            className="hover:text-[#D90429] dark:hover:text-red-400 underline transition-colors inline-flex items-center min-h-[44px]"
          >
            Get a Quote
          </button>

          <a
            href="/privacy"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onOpenPrivacy();
              }
            }}
            className="hover:text-[#D90429] dark:hover:text-red-400 underline transition-colors inline-flex items-center min-h-[44px]"
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
            className="hover:text-[#D90429] dark:hover:text-red-400 underline transition-colors inline-flex items-center min-h-[44px]"
          >
            Terms &amp; Conditions
          </a>
        </div>

      </div>
    </footer>
  );
};
