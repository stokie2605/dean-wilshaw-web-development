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
    <footer className="bg-[#eceef0] text-[#191c1e] w-full border-t border-[#c6c6cd] py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Avatar & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2.5">
            <img
              src={AVATAR_URL}
              alt="Dean Wilshaw"
              className="w-6 h-6 rounded-full grayscale opacity-80 border border-[#c6c6cd]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-geist font-bold text-base text-[#191c1e]">
              Dean Wilshaw
            </span>
          </div>

          <p className="text-xs text-[#45464d] text-center md:text-left font-normal">
            &copy; 2026 Dean Wilshaw. Made in Cheshire. All rights reserved.
          </p>
        </div>

        {/* Right Side: Social & Contact Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-[#45464d]">
          <button
            onClick={onOpenWhatsApp}
            className="hover:text-[#991b1b] underline transition-colors"
          >
            WhatsApp
          </button>

          <a
            href="https://www.linkedin.com/in/dean-wilshaw-239b4b379"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#991b1b] underline transition-colors"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/stokie2605"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#991b1b] underline transition-colors"
          >
            GitHub
          </a>

          <button
            onClick={onOpenPrivacy}
            className="hover:text-[#991b1b] underline transition-colors"
          >
            Privacy Policy
          </button>

          <button
            onClick={onOpenTerms}
            className="hover:text-[#991b1b] underline transition-colors"
          >
            Terms & Conditions
          </button>
        </div>

      </div>
    </footer>
  );
};

