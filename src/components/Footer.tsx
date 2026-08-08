import React from 'react';

const AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuA8e_CVpDqlJmvVgwq8mfsfv1MN4Xh0R1At79k3YteVYCQD7jQasQqs7QuztqDYFk_FHxuFPxS1tPjfap95ATBzdxT9JWbXfcpAEcK4BEb1jdYnHB-ljlsDzdm7QW0mY6cCAarD6uzfOgFUWCsOvkJmtlFTFj9TickLiAZuczAGbXe4hL1hwoulVe6eJ0D-hqciw0CIPXvZnTTUytNQX2u2nynEleEJWs7d31mlWssjVI7reTt7yOWkMxmw5RDiDea0U9jVUAl0Y9E";

interface FooterProps {
  onOpenWhatsApp: () => void;
  onOpenQuote: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp, onOpenQuote, onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-slate-100 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 w-full border-t border-slate-200 dark:border-zinc-800 py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Contact Info & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex flex-col items-center md:items-start gap-1.5 text-sm text-slate-800 dark:text-zinc-300 font-medium">
            <span className="flex items-center gap-2"><span className="text-red-600 dark:text-red-500">📱</span> 07348 733365</span>
            <span className="flex items-center gap-2"><span className="text-red-600 dark:text-red-500">✉️</span> dean.wilshaw.web@gmail.com</span>
            <span className="flex items-center gap-2"><span className="text-red-600 dark:text-red-500">📍</span> Cheshire & Stoke-on-Trent</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400 text-center md:text-left font-normal mt-2">
            &copy; {new Date().getFullYear()} Design Systems Web. Made in Cheshire. All rights reserved.
          </p>
        </div>

        {/* Right Side: Social & Contact Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-400">
          <button
            onClick={onOpenWhatsApp}
            className="hover:text-red-700 dark:hover:text-red-500 underline transition-colors"
          >
            WhatsApp
          </button>

          <a
            href="https://www.linkedin.com/in/dean-wilshaw-239b4b379"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-700 dark:hover:text-red-500 underline transition-colors"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/stokie2605"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-700 dark:hover:text-red-500 underline transition-colors"
          >
            GitHub
          </a>

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

