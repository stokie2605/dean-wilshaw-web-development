import React, { useState } from 'react';
import { X, Send, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('quote');
  const [customMsg, setCustomMsg] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const getPresetMessage = () => {
    if (customMsg.trim()) return customMsg;
    if (topic === 'webapp') return "Hi Dean, I'd like to discuss a custom web app or customer tool for my business.";
    return "Hi Dean, I'd like to get a quote for a website for my business.";
  };

  const handleOpenWhatsAppLink = () => {
    const text = encodeURIComponent(getPresetMessage());
    // UK WhatsApp standard format
    const whatsappUrl = `https://wa.me/447348733365?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-zinc-800 rounded-xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
              DIRECT WHATSAPP CHANNEL
            </span>
            <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-white">Message Dean Wilshaw</h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
          Dean replies directly on WhatsApp, Mon to Sat, 8am to 7pm.
        </p>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-900 dark:text-white font-mono">Select Conversation Topic:</label>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setTopic('quote')}
              className={`p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between ${
                topic === 'quote' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-400 font-semibold' : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-700 dark:text-zinc-300'
              }`}
            >
              <span>Request a Website Quote</span>
              {topic === 'quote' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </button>

            <button
              type="button"
              onClick={() => setTopic('webapp')}
              className={`p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between ${
                topic === 'webapp' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-400 font-semibold' : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-700 dark:text-zinc-300'
              }`}
            >
              <span>Discuss a Web App</span>
              {topic === 'webapp' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-900 dark:text-white font-mono mb-1">Optional Message Preview:</label>
          <textarea
            rows={2}
            value={customMsg || getPresetMessage()}
            onChange={(e) => setCustomMsg(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none"
          ></textarea>
        </div>

        <button
          onClick={handleOpenWhatsAppLink}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold text-sm flex justify-center items-center gap-2 shadow-sm"
        >
          <Send className="w-4 h-4" />
          Open WhatsApp and Start Chat
        </button>

      </div>
    </div>
  );
};


