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
    if (topic === 'quote') return "Hi Dean, I would like to ask about getting a new website for my business.";
    if (topic === 'update') return "Hi Dean, I have an existing website that needs updating or redesigning.";
    if (topic === 'question') return "Hi Dean, I have a question about your web design services.";
    return "Hi Dean, I would like to discuss a website project.";
  };

  const handleOpenWhatsAppLink = () => {
    const text = encodeURIComponent(getPresetMessage());
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
          <div className="w-11 h-11 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-slate-900 dark:text-white">Message Dean Wilshaw</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">Direct response via WhatsApp</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
          I respond directly on WhatsApp during normal business hours (Mon-Sat, 8am-7pm).
        </p>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-900 dark:text-white">Select what you need:</label>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setTopic('quote')}
              className={`p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between ${
                topic === 'quote' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-400 font-semibold' : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-700 dark:text-zinc-300'
              }`}
            >
              <span>I need a new website</span>
              {topic === 'quote' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </button>

            <button
              type="button"
              onClick={() => setTopic('update')}
              className={`p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between ${
                topic === 'update' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-400 font-semibold' : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-700 dark:text-zinc-300'
              }`}
            >
              <span>I want to update an existing website</span>
              {topic === 'update' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </button>

            <button
              type="button"
              onClick={() => setTopic('question')}
              className={`p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between ${
                topic === 'question' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-400 font-semibold' : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-700 dark:text-zinc-300'
              }`}
            >
              <span>General enquiry</span>
              {topic === 'question' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1">Message Preview:</label>
          <textarea
            rows={2}
            value={customMsg || getPresetMessage()}
            onChange={(e) => setCustomMsg(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none"
          ></textarea>
        </div>

        <button
          onClick={handleOpenWhatsAppLink}
          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black py-3 rounded-lg font-bold text-sm flex justify-center items-center gap-2 shadow-sm transition-colors"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>Chat on WhatsApp</span>
        </button>

      </div>
    </div>
  );
};
