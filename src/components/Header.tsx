import React, { useState } from 'react';
import { Menu, X, ArrowRight, MessageSquare, Phone, Bot } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
  onOpenStitch: () => void;
}

const AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuA8e_CVpDqlJmvVgwq8mfsfv1MN4Xh0R1At79k3YteVYCQD7jQasQqs7QuztqDYFk_FHxuFPxS1tPjfap95ATBzdxT9JWbXfcpAEcK4BEb1jdYnHB-ljlsDzdm7QW0mY6cCAarD6uzfOgFUWCsOvkJmtlFTFj9TickLiAZuczAGbXe4hL1hwoulVe6eJ0D-hqciw0CIPXvZnTTUytNQX2u2nynEleEJWs7d31mlWssjVI7reTt7yOWkMxmw5RDiDea0U9jVUAl0Y9E";

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onOpenWhatsApp, onOpenStitch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f9fb]/90 backdrop-blur-md border-b border-[#c6c6cd]/50 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            {/* SVG Logo matching the image: <DW> icon mark */}
            <div className="h-10 px-2 py-1 bg-[#111111] text-white rounded font-geist font-extrabold text-sm sm:text-base flex items-center tracking-tighter shadow-sm group-hover:bg-[#dc2626] transition-colors">
              <span className="text-[#dc2626] group-hover:text-white mr-0.5">&lt;</span>
              <span className="font-bold tracking-tight">DW</span>
              <span className="text-[#dc2626] group-hover:text-white ml-0.5">&gt;</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <img
                src={AVATAR_URL}
                alt="Dean Wilshaw"
                className="w-7 h-7 rounded-full object-cover border border-[#c6c6cd]"
                onError={(e) => {
                  // Fallback avatar if URL blocked
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-geist font-bold text-lg text-[#191c1e] tracking-tight group-hover:text-[#991b1b] transition-colors">
                Dean Wilshaw
              </span>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#45464d] hidden sm:inline-block">
              Web Development
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#45464d]">
          <a href="#about" className="hover:text-[#991b1b] transition-colors">
            About Me
          </a>
          <a href="#portfolio" className="hover:text-[#991b1b] transition-colors">
            My Work
          </a>
          <a href="#services" className="hover:text-[#991b1b] transition-colors">
            Services
          </a>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenStitch}
            className="border border-[#191c1e] text-[#191c1e] hover:bg-[#eceef0] px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5"
            title="Ask Client Support AI"
          >
            <Bot className="w-3.5 h-3.5 text-[#991b1b]" />
            Ask AI
          </button>
          <button
            onClick={onOpenWhatsApp}
            className="border border-[#191c1e] text-[#191c1e] hover:bg-[#eceef0] px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5"
            title="Chat directly on WhatsApp"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            WhatsApp
          </button>
          
          <button
            onClick={onOpenQuote}
            className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center gap-1.5"
          >
            Get a Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#191c1e] hover:bg-[#eceef0] rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f7f9fb] border-b border-[#c6c6cd] px-4 pt-2 pb-6 flex flex-col gap-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col gap-3 font-medium text-[#191c1e] pt-2">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#e0e3e5] hover:text-[#991b1b]"
            >
              About Me
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#e0e3e5] hover:text-[#991b1b]"
            >
              My Work
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#991b1b]"
            >
              Services
            </a>
          </nav>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStitch();
              }}
              className="w-full border border-[#191c1e] text-[#191c1e] bg-white hover:bg-[#eceef0] py-3 rounded-lg font-semibold text-sm flex justify-center items-center gap-2 shadow-sm"
            >
              <Bot className="w-4 h-4 text-[#991b1b]" />
              Ask AI Support
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-3 rounded-lg font-semibold text-sm flex justify-center items-center gap-2 shadow-sm"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full border border-[#191c1e] text-[#191c1e] hover:bg-[#eceef0] py-3 rounded-lg font-semibold text-sm flex justify-center items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Message on WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

