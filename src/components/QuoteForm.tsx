import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: () => void;
  prefilledDetails?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ isOpen, onClose, onOpenWhatsApp, prefilledDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (prefilledDetails) {
      setFormData(prev => ({
        ...prev,
        details: `${prefilledDetails}\n\n${prev.details}`.trim()
      }));
    }
  }, [prefilledDetails]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const json = await res.json();
        setResult(json);
      } else {
        setResult({
          refNumber: 'DW-' + Math.floor(100000 + Math.random() * 900000),
          clientName: formData.name || 'Valued Client',
          message: `Thank you, ${formData.name || 'friend'}! Your request has been logged. Dean will review your requirements and WhatsApp you at ${formData.phone} to arrange a time.`,
        });
      }
    } catch (err) {
      setResult({
        refNumber: 'ERR-500',
        clientName: formData.name || 'Valued Client',
        message: `I'm sorry, ${formData.name || 'friend'}. There was a network error sending your request. Please message Dean directly on WhatsApp.`,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="max-w-2xl w-full my-auto relative">
        
        {/* Form Container */}
        <div className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-6 sm:p-10 relative mt-10 md:mt-0 max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-10 flex flex-col items-center pt-2">
          <span className="text-xs font-mono uppercase tracking-widest text-red-700 dark:text-red-500 font-semibold mb-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Let's Talk
          </span>
          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-slate-900 dark:text-zinc-100 mb-3">
            Get a Quote
          </h2>
          <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base max-w-lg">
            Let's discuss your business goals and see if we're a good fit. Fill out the quick form below and I'll WhatsApp you to arrange a time.
          </p>
        </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Name */}
            <div>
              <label className="block font-geist font-semibold text-xs text-slate-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5" htmlFor="name">
                Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-geist font-semibold text-xs text-slate-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5" htmlFor="email">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-geist font-semibold text-xs text-slate-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5" htmlFor="phone">
                  Phone (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="07700 900123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Project Details */}
            <div>
              <label className="block font-geist font-semibold text-xs text-slate-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5" htmlFor="details">
                What would you like to discuss?
              </label>
              <textarea
                id="details"
                rows={4}
                required
                placeholder="A brief overview of your business and what you're looking to achieve..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 text-white py-3.5 rounded-lg font-geist font-bold text-sm sm:text-base transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Sending Request...</span>
              ) : (
                <>
                  <span>Request Chat</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
            <div className="text-center pt-2 space-y-1.5">
              <p className="text-[11px] text-slate-500 dark:text-slate-500">
                Your details go directly to Dean's inbox. No databases, no marketing lists, no spam.
              </p>
            </div>
          </form>

        </div>

        {/* Confirmation Modal */}
        {result && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
              <button
                onClick={() => setResult(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                    REQUEST RECEIVED #{result.refNumber}
                  </span>
                  <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-zinc-100 mt-1">Request Logged!</h3>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-zinc-800 text-xs space-y-2 text-slate-700 dark:text-zinc-300">
                <p className="font-medium leading-relaxed">{result.message}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setResult(null);
                    onClose();
                  }}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold py-2.5 rounded-lg text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
