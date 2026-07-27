import React, { useState } from 'react';
import { Gauge, TrendingUp, Search, Layers, ArrowUpRight, Check, X } from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  bgIconName: string;
  description: string;
  tags: string[];
  features: string[];
  techStack: string;
  roiImpact: string;
}

const SERVICES: ServiceDetail[] = [
  {
    id: 'mobile-first',
    title: 'Looks Great on Mobile',
    badge: 'Mobile Optimized',
    icon: <Gauge className="w-6 h-6 text-[#191c1e]" />,
    bgIconName: 'smartphone',
    description: 'Over 80% of your customers will look you up on their phone. I build sites that look perfect on all iPhones and Androids.',
    tags: ['MOBILE', 'FAST', 'EASY TO USE'],
    features: [
      'Looks perfect on iPhones & Androids',
      'Loads instantly so people don\'t click away',
      'Big, clear phone numbers that are easy to tap',
      'Simple navigation for all your customers'
    ],
    techStack: 'Professional responsive design that automatically adapts to any screen size.',
    roiImpact: 'Stops you losing customers who click away from slow, broken mobile sites.'
  },
  {
    id: 'more-calls',
    title: 'Gets Your Phone Ringing',
    badge: 'More Leads',
    icon: <TrendingUp className="w-6 h-6 text-[#191c1e]" />,
    bgIconName: 'trending_up',
    description: 'A website should be your best salesperson. I design layouts that convince local people to stop browsing and call you for a quote.',
    tags: ['CALLS', 'WHATSAPP', 'QUOTES'],
    features: [
      'Clear "Call Now" and "Get Quote" buttons',
      'WhatsApp integration built straight in',
      'Clean contact forms that actually send to your email',
      'Highlights your local coverage area (Cheshire/Stoke)'
    ],
    techStack: 'Simple, direct contact methods built right into the design.',
    roiImpact: 'Turns your website from a digital business card into a machine that gets you jobs.'
  },
  {
    id: 'google-ready',
    title: 'Findable on Google',
    badge: 'Local Search',
    icon: <Search className="w-6 h-6 text-[#191c1e]" />,
    bgIconName: 'search',
    description: 'I build websites the way Google likes them, helping you show up when local people search for "Roofer near me" or "Plumber in Stoke".',
    tags: ['GOOGLE', 'LOCAL', 'SEO'],
    features: [
      'Properly set up to rank in local Google searches',
      'Helps people find you when they search your trade locally',
      'Connected to your Google Business Profile',
      'Fast, clean code that Google loves to reward'
    ],
    techStack: 'Built from scratch to meet all of Google\'s modern requirements.',
    roiImpact: 'Gets you in front of people actively looking to hire a tradesman today.'
  },
  {
    id: 'zero-stress',
    title: 'Zero Stress, Zero Hidden Fees',
    badge: 'Honest Pricing',
    icon: <Layers className="w-6 h-6 text-[#191c1e]" />,
    bgIconName: 'handshake',
    description: 'I am a local freelancer, not a massive agency. I give you one clear price, talk in plain English, and don\'t trap you in monthly contracts.',
    tags: ['HONEST', 'LOCAL', 'NO TRAPS'],
    features: [
      'One clear price upfront, no surprise monthly bills',
      'You own the website forever',
      'Includes professional domain and email setup if needed',
      'Direct communication with me on WhatsApp anytime'
    ],
    techStack: 'No expensive recurring software subscriptions required.',
    roiImpact: 'Saves you money and stops the headache of dealing with faceless agencies.'
  }
];

export const ServicesBento: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#ffffff] border-b border-[#c6c6cd]/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#991b1b] font-semibold mb-2 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            A Genuine Investment
          </span>
          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-[#191c1e] mb-3">
            Honest, High-Performance Web Design.
          </h2>
          <div className="w-16 h-1 bg-[#dc2626] rounded-full"></div>
          <p className="mt-4 text-[#45464d] max-w-2xl text-sm sm:text-base">
            I build websites focused on speed and mobile usability. A clean, fast website is a simple investment that helps local people find you on Google, trust your business, and easily contact you for a quote.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="bg-[#f7f9fb] border border-[#c6c6cd]/80 hover:border-[#dc2626] rounded-xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between relative overflow-hidden cursor-pointer"
            >
              {/* Background Icon Watermark */}
              <div className="absolute top-2 right-2 p-2 opacity-[0.07] group-hover:opacity-15 transition-opacity pointer-events-none">
                <span className="material-symbols-outlined text-[80px] text-[#191c1e]">
                  {service.bgIconName}
                </span>
              </div>

              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 bg-[#ffffff] rounded-lg flex items-center justify-center text-[#191c1e] mb-5 border border-[#c6c6cd] group-hover:border-[#dc2626] group-hover:bg-[#dc2626]/10 transition-colors shadow-2xs">
                  {service.icon}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-geist font-bold text-lg text-[#191c1e] group-hover:text-[#991b1b] transition-colors">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#76777d] group-hover:text-[#dc2626] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <p className="text-sm text-[#45464d] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Footer Tags */}
              <div className="flex gap-1.5 flex-wrap pt-2 border-t border-[#e0e3e5]">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#ffffff] text-[#191c1e] text-[10px] font-mono font-semibold rounded border border-[#c6c6cd] group-hover:border-[#dc2626]/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white border border-[#c6c6cd] rounded-xl max-w-lg w-full p-6 shadow-2xl relative space-y-5">
              
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 text-[#991b1b] rounded-lg flex items-center justify-center border border-red-200">
                  {selectedService.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase bg-red-100 text-[#991b1b] px-2 py-0.5 rounded font-bold">
                    {selectedService.badge}
                  </span>
                  <h3 className="font-geist font-bold text-xl text-slate-900">{selectedService.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{selectedService.description}</p>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-slate-900 tracking-wider font-mono">Key Features Included:</p>
                <ul className="space-y-2">
                  {selectedService.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <p className="font-semibold text-slate-900">Tech Stack &amp; Implementation:</p>
                <p className="text-slate-600 font-mono">{selectedService.techStack}</p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 space-y-1">
                <p className="font-bold">Business ROI &amp; Conversion Impact:</p>
                <p>{selectedService.roiImpact}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    const form = document.getElementById('contact');
                    if (form) form.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-2.5 rounded-lg text-xs font-semibold text-center transition-colors"
                >
                  Request This Solution
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

