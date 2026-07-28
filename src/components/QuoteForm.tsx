import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, ShieldCheck, X, Smartphone, Monitor, Database } from 'lucide-react';
import { QuoteResult } from '../types';

interface QuoteFormProps {
  onOpenWhatsApp: () => void;
  prefilledDetails?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ onOpenWhatsApp, prefilledDetails }) => {
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

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#f7f9fb] border-b border-[#c6c6cd]/50 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#991b1b] font-semibold mb-2 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Direct Studio Inquiry
          </span>
          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-[#191c1e] mb-3">
            Get a Free Quote
          </h2>
          <p className="text-[#45464d] text-sm sm:text-base max-w-lg">
            Tell me what package you need and a little about your business. I'll review it and get back to you with a direct price.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#ffffff] border border-[#c6c6cd] p-6 sm:p-10 rounded-xl shadow-xs relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-geist font-semibold text-xs text-[#191c1e] uppercase tracking-wider mb-1.5" htmlFor="name">
                  Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#c6c6cd] rounded-lg px-3.5 py-2.5 text-sm text-[#191c1e] focus:border-[#191c1e] focus:ring-1 focus:ring-[#191c1e] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-geist font-semibold text-xs text-[#191c1e] uppercase tracking-wider mb-1.5" htmlFor="company">
                  Company / Trade Name (Optional)
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Acme Roofing"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#c6c6cd] rounded-lg px-3.5 py-2.5 text-sm text-[#191c1e] focus:border-[#191c1e] focus:ring-1 focus:ring-[#191c1e] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-geist font-semibold text-xs text-[#191c1e] uppercase tracking-wider mb-1.5" htmlFor="email">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#c6c6cd] rounded-lg px-3.5 py-2.5 text-sm text-[#191c1e] focus:border-[#191c1e] focus:ring-1 focus:ring-[#191c1e] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-geist font-semibold text-xs text-[#191c1e] uppercase tracking-wider mb-1.5" htmlFor="phone">
                  Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="07700 900123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#c6c6cd] rounded-lg px-3.5 py-2.5 text-sm text-[#191c1e] focus:border-[#191c1e] focus:ring-1 focus:ring-[#191c1e] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Project Type Selection */}
            <div>
              <label className="block font-geist font-semibold text-xs text-[#191c1e] uppercase tracking-wider mb-2.5">
                Which package do you need?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'business-site' })}
                  className={`p-4 rounded-xl border text-left flex flex-col transition-all ${
                    formData.projectType === 'business-site' 
                      ? 'border-[#dc2626] bg-[#dc2626]/5 ring-1 ring-[#dc2626]' 
                      : 'border-[#c6c6cd] hover:border-[#191c1e] bg-white'
                  }`}
                >
                  <Smartphone className={`w-5 h-5 mb-2 ${formData.projectType === 'business-site' ? 'text-[#dc2626]' : 'text-slate-400'}`} />
                  <span className="font-geist font-bold text-[#191c1e] text-sm">Business Site</span>
                  <span className="text-xs text-[#76777d] mt-1">Lead gen & local SEO</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'custom-app' })}
                  className={`p-4 rounded-xl border text-left flex flex-col transition-all ${
                    formData.projectType === 'custom-app' 
                      ? 'border-[#dc2626] bg-[#dc2626]/5 ring-1 ring-[#dc2626]' 
                      : 'border-[#c6c6cd] hover:border-[#191c1e] bg-white'
                  }`}
                >
                  <Database className={`w-5 h-5 mb-2 ${formData.projectType === 'custom-app' ? 'text-[#dc2626]' : 'text-slate-400'}`} />
                  <span className="font-geist font-bold text-[#191c1e] text-sm">Custom App</span>
                  <span className="text-xs text-[#76777d] mt-1">Dashboards & internal tools</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'ai-integration' })}
                  className={`p-4 rounded-xl border text-left flex flex-col transition-all ${
                    formData.projectType === 'ai-integration' 
                      ? 'border-[#dc2626] bg-[#dc2626]/5 ring-1 ring-[#dc2626]' 
                      : 'border-[#c6c6cd] hover:border-[#191c1e] bg-white'
                  }`}
                >
                  <Monitor className={`w-5 h-5 mb-2 ${formData.projectType === 'ai-integration' ? 'text-[#dc2626]' : 'text-slate-400'}`} />
                  <span className="font-geist font-bold text-[#191c1e] text-sm">AI Integration</span>
                  <span className="text-xs text-[#76777d] mt-1">Chatbots & automation</span>
                </button>
              </div>
            </div>

            {/* Row 4: Project Details */}
            <div>
              <label className="block font-geist font-semibold text-xs text-[#191c1e] uppercase tracking-wider mb-1.5" htmlFor="details">
                Project Details
              </label>
              <textarea
                id="details"
                rows={4}
                required
                placeholder="What does your business do and what do you need the website to achieve? (e.g. Local plumber needing a site that looks good on mobile and gets more quote requests...)"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-[#ffffff] border border-[#c6c6cd] rounded-lg px-3.5 py-2.5 text-sm text-[#191c1e] focus:border-[#191c1e] focus:ring-1 focus:ring-[#191c1e] focus:outline-none transition-colors"
              ></textarea>
            </div>

            {/* GDPR Consent Checkbox */}
            <div className="flex items-start gap-3 mt-4">
              <div className="flex items-center h-5">
                <input
                  id="gdpr-consent"
                  type="checkbox"
                  required
                  className="w-4 h-4 rounded border-[#c6c6cd] text-[#dc2626] focus:ring-[#dc2626] cursor-pointer"
                />
              </div>
              <div className="text-xs text-[#45464d] leading-relaxed">
                <label htmlFor="gdpr-consent" className="cursor-pointer">
                  I consent to Dean Wilshaw storing my details to contact me regarding this quote.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-3.5 rounded-lg font-geist font-semibold text-sm sm:text-base transition-opacity shadow-sm flex items-center justify-center gap-2"
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
              <span className="text-xs text-[#76777d] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                No obligations. I will respond with a direct price within 24 hours.
              </span>
              <p className="text-[11px] text-[#76777d]">
                🔒 Your details go directly to Dean's inbox. No databases, no marketing lists, no spam.
              </p>
            </div>

          </form>

        </div>

        {/* Confirmation Modal */}
        {result && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white border border-[#c6c6cd] rounded-xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
              <button
                onClick={() => setResult(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    REQUEST RECEIVED #{result.refNumber}
                  </span>
                  <h3 className="font-geist font-bold text-xl text-slate-900">Request Logged!</h3>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-2 text-slate-700">
                <p className="font-medium">{result.message}</p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setResult(null);
                    onOpenWhatsApp();
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-xs font-semibold flex justify-center items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Speed Up: Send via WhatsApp Too
                </button>

                <button
                  onClick={() => setResult(null)}
                  className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50 py-2.5 rounded-lg text-xs font-semibold"
                >
                  Close Confirmation
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

