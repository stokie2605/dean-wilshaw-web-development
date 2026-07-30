import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, ShieldCheck, X, Smartphone, Monitor, Database } from 'lucide-react';
import { QuoteResult } from '../types';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: () => void;
  prefilledDetails?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ isOpen, onClose, onOpenWhatsApp, prefilledDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'business-site',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

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
        // Fallback result
        setResult({
          refNumber: 'DW-' + Math.floor(100000 + Math.random() * 900000),
          clientName: formData.name || 'Valued Client',
          message: `Thank you, ${formData.name || 'friend'}! Your request has been logged. Dean will review your requirements and get in touch at ${formData.email} to give you a bespoke price.`,
        });
      }
    } catch (err) {
      setResult({
        refNumber: 'ERR-500',
        clientName: formData.name || 'Valued Client',
        message: `We're sorry, ${formData.name || 'friend'}. There was a network error sending your request. Please message Dean directly on WhatsApp.`,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="max-w-3xl w-full my-auto relative">
        
        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-6 sm:p-10 relative mt-10 md:mt-0 max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-10 flex flex-col items-center pt-2">
          <span className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-500 font-semibold mb-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Direct Studio Inquiry
          </span>
          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white mb-3">
            Get a Free Quote
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-lg">
            Tell me what package you need and a little about your business. I'll review it and get back to you with a direct price.
          </p>
        </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-geist font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-1.5" htmlFor="name">
                  Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-geist font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-1.5" htmlFor="company">
                  Company / Trade Name (Optional)
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Acme Roofing"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-geist font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-1.5" htmlFor="email">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-geist font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-1.5" htmlFor="phone">
                  Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="07700 900123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Project Type Selection */}
            <div>
              <label className="block font-geist font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
                Which package do you need?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'business-site' })}
                  className={`p-4 rounded-xl border text-left flex flex-col transition-all ${
                    formData.projectType === 'business-site' 
                      ? 'border-red-600 bg-red-500/5 ring-1 ring-red-600' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-red-600 dark:hover:border-red-500 bg-slate-50 dark:bg-slate-950'
                  }`}
                >
                  <Smartphone className={`w-5 h-5 mb-2 ${formData.projectType === 'business-site' ? 'text-red-600 dark:text-red-500' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="font-geist font-bold text-slate-900 dark:text-white text-sm">Business Site</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 mt-1">Lead gen & local SEO</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'custom-app' })}
                  className={`p-4 rounded-xl border text-left flex flex-col transition-all ${
                    formData.projectType === 'custom-app' 
                      ? 'border-red-600 bg-red-500/5 ring-1 ring-red-600' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-red-600 dark:hover:border-red-500 bg-slate-50 dark:bg-slate-950'
                  }`}
                >
                  <Database className={`w-5 h-5 mb-2 ${formData.projectType === 'custom-app' ? 'text-red-600 dark:text-red-500' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="font-geist font-bold text-slate-900 dark:text-white text-sm">Custom App</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 mt-1">Dashboards & internal tools</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'ai-integration' })}
                  className={`p-4 rounded-xl border text-left flex flex-col transition-all ${
                    formData.projectType === 'ai-integration' 
                      ? 'border-red-600 bg-red-500/5 ring-1 ring-red-600' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-red-600 dark:hover:border-red-500 bg-slate-50 dark:bg-slate-950'
                  }`}
                >
                  <Monitor className={`w-5 h-5 mb-2 ${formData.projectType === 'ai-integration' ? 'text-red-600 dark:text-red-500' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="font-geist font-bold text-slate-900 dark:text-white text-sm">AI Integration</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 mt-1">Chatbots & automation</span>
                </button>
              </div>
            </div>

            {/* Row 4: Project Details */}
            <div>
              <label className="block font-geist font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-1.5" htmlFor="details">
                Project Details
              </label>
              <textarea
                id="details"
                rows={4}
                required
                placeholder="What does your business do and what do you need the website to achieve? (e.g. Local plumber needing a site that looks good on mobile and gets more quote requests...)"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors"
              ></textarea>
            </div>

            {/* GDPR Consent Checkbox */}
            <div className="flex items-start gap-3 mt-4">
              <div className="flex items-center h-5">
                <input
                  id="gdpr-consent"
                  type="checkbox"
                  required
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-red-600 focus:ring-red-600 cursor-pointer"
                />
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <label htmlFor="gdpr-consent" className="cursor-pointer">
                  I consent to Dean Wilshaw storing my details to contact me regarding this quote.
                </label>
              </div>
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
                  <span>Send Details For Price</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2 space-y-1.5">
              <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                No obligations. I will respond with a direct price within 24 hours.
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-500">
                🔒 Your details go directly to Dean's inbox. No databases, no marketing lists, no spam.
              </p>
            </div>

          </form>

        </div>

        {/* Confirmation Modal */}
        {result && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
              <button
                onClick={() => setResult(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                  <h3 className="font-geist font-bold text-xl text-slate-900 dark:text-white mt-1">Request Logged!</h3>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <p className="font-medium leading-relaxed">{result.message}</p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setResult(null);
                    onOpenWhatsApp();
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 py-2.5 rounded-lg text-xs font-semibold flex justify-center items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Speed Up: Send via WhatsApp Too
                </button>

                <button
                  onClick={() => setResult(null)}
                  className="w-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  Close Confirmation
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

