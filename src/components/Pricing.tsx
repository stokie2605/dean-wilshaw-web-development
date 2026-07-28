import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';

// ⚙️ UPDATE THIS NUMBER as you take on clients (starts at 10, count down)
const SPOTS_REMAINING = 10;
const TOTAL_SPOTS = 10;

const packages = [
  {
    name: 'Business Site',
    description: 'Mobile-first, fast-loading website to get your phone ringing.',
    normalPrice: 499,
    earlyPrice: 449,
    features: ['Mobile-first design', 'Google-ready local SEO', 'Contact & quote form', 'WhatsApp integration', 'Delivered in 1–2 weeks'],
  },
  {
    name: 'Website Redesign',
    description: 'Take your existing site and rebuild it to be faster, cleaner, and more modern.',
    normalPrice: 349,
    earlyPrice: 314,
    features: ['Keep your branding', 'Massively faster load times', 'Mobile-friendly rebuild', 'Fresh modern layout', 'Delivered in 1–2 weeks'],
  },
  {
    name: 'AI Integration',
    description: 'Add a smart chatbot or automation tool to your existing website.',
    normalPrice: 599,
    earlyPrice: 539,
    features: ['Custom AI assistant', 'Automated enquiry handling', 'Trained on your business', 'WhatsApp or chat delivery', 'Delivered in 1–2 weeks'],
  },
];

interface PricingProps {
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenQuote, onOpenWhatsApp }) => {
  const spotsGone = SPOTS_REMAINING <= 0;

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#e0e3e5]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#991b1b] font-semibold mb-2 bg-red-50 px-3 py-1 rounded-full border border-red-100 inline-block">
            Transparent Pricing
          </span>
          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-[#191c1e] mt-3 mb-3">
            Simple, Honest Prices
          </h2>
          <p className="text-[#45464d] text-sm sm:text-base max-w-lg mx-auto">
            No hidden fees, no monthly retainers, no surprises. You own your site outright.
          </p>
        </div>

        {/* Early Adopter Banner */}
        {!spotsGone && (
          <div className="bg-[#dc2626] text-white rounded-xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-300 shrink-0" />
              <div>
                <p className="font-geist font-bold text-sm sm:text-base">Early Adopter Bonus: Get 10% off your custom project quote.</p>
                <p className="text-red-100 text-xs sm:text-sm">Discount applied to the final estimated scope of work.</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2 text-center shrink-0">
              <p className="font-geist font-bold text-xl">{SPOTS_REMAINING}</p>
              <p className="text-xs text-red-100">spots left</p>
            </div>
          </div>
        )}

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-[#f7f9fb] border border-[#e0e3e5] rounded-xl p-6 flex flex-col hover:border-[#dc2626] hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-geist font-bold text-[#191c1e] text-lg mb-1">{pkg.name}</h3>
              <p className="text-[#76777d] text-sm mb-4">{pkg.description}</p>

              {/* Pricing values removed per user request */}

              <ul className="space-y-2 mb-6 flex-grow">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#45464d]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenQuote}
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-2.5 rounded-lg font-geist font-semibold text-sm transition-colors mt-auto"
              >
                Request Scope / Estimate
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
