import React from 'react';
import { CheckCircle2, MessageSquare, ArrowRight, ExternalLink, Zap, Phone, Search, Globe, Shield, Wrench } from 'lucide-react';

const WHATSAPP_QUOTE_URL = `https://wa.me/447348733365?text=${encodeURIComponent(
  "Hi Dean, I'd like to get a quote for a website for my business."
)}`;

const DELIVERABLES = [
  {
    icon: Zap,
    title: 'Mobile First Speed',
    description: 'Hand-coded in React to load in under a second on mobile data. Visitors never bounce away from slow loading pages.',
  },
  {
    icon: Phone,
    title: 'Tap to Call & WhatsApp',
    description: 'Prominent, thumb-friendly contact actions that send customer quote requests directly to your phone while you are working.',
  },
  {
    icon: Search,
    title: 'Google & Local SEO Schema',
    description: 'Full structured business data and Google Business Profile setup targeting local homeowners in Stoke on Trent and Cheshire.',
  },
  {
    icon: Globe,
    title: 'Custom Domain & Fast Hosting',
    description: 'Your own custom .co.uk domain setup with SSL security and global edge hosting so your site stays fast and online 24/7.',
  },
  {
    icon: Shield,
    title: '100% Code Ownership',
    description: 'You own your code and assets outright. Zero platform lock-in, no hidden software licenses, and no ongoing subscription required.',
  },
  {
    icon: Wrench,
    title: 'Optional Site Care (£35/mo)',
    description: 'If you prefer not thinking about your site, an optional monthly plan covers hosting, security checks, and monthly text or photo updates.',
  },
];

const SHOWCASE_PROJECTS = [
  {
    title: 'Etruria Roofing',
    niche: 'Roofing Contractor',
    location: 'Etruria, Stoke on Trent',
    headline: 'Roofs fixed properly, first time.',
    description: 'Tailored for roofing specialists. Highlights emergency leak triage, rapid damage assessment forms, and guaranteed workmanship indicators.',
    url: 'https://etruria-roofing-demo.netlify.app',
    features: ['Emergency leak triage flow', 'Service & repair breakdown', 'Verified trade badges'],
  },
  {
    title: 'Kiln Plumbing',
    niche: 'Plumbing & Heating',
    location: 'Stoke on Trent',
    headline: 'Leak, no heating or a new boiler? We will sort it.',
    description: 'Built for domestic heating and plumbing engineers. Features prominent emergency breakdown callout routing and transparent boiler replacement pricing.',
    url: 'https://kiln-plumbing-demo.netlify.app',
    features: ['24/7 emergency dispatch trigger', 'Boiler quote intake flow', 'Gas Safe accreditation display'],
  },
  {
    title: 'Longport Motors',
    niche: 'Auto Garage & MOT',
    location: 'Longport, Stoke on Trent',
    headline: 'Your car, looked after properly.',
    description: 'Crafted for independent vehicle garages. Delivers fast MOT booking enquiries, tap-to-call mechanic dispatch, and upfront servicing tariffs.',
    url: 'https://longport-motors-demo.netlify.app',
    features: ['MOT & servicing booking cards', 'Direct phone mechanic dispatcher', 'Customer review showcase'],
  },
  {
    title: 'Platform Hair Crewe',
    niche: 'Barber & Salon Studio',
    location: 'Crewe, Cheshire',
    headline: 'Cuts, colour and fades in the middle of Crewe.',
    description: 'Designed for modern styling salons and barbershops. Displays complete pricing menus, stylist portfolios, opening hours, and instant seat booking.',
    url: 'https://platform-hair-crewe-demo.netlify.app',
    features: ['Categorised treatment pricing', 'Live opening hours tracker', 'Direct chair booking action'],
  },
];

export const WebsitesSection: React.FC = () => {
  return (
    <section id="websites" className="scroll-mt-20 sm:scroll-mt-24 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#040507] border-b border-slate-200 dark:border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase">
            Custom Websites
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Websites Built for Trades &amp; Local Businesses
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to turn Google searches and social media clicks into direct phone calls and WhatsApp enquiries.
          </p>
        </div>

        {/* 6 Core Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 sm:mb-20">
          {DELIVERABLES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between transition-all hover:border-[#D90429]/40"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#D90429]/10 border border-[#D90429]/20 flex items-center justify-center mb-4 text-[#D90429]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Work Showcase Grid */}
        <div className="mb-16 sm:mb-20">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/50 font-mono text-[11px] font-semibold tracking-wider uppercase">
              Working Demos
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              Recent Work &amp; Live Concepts
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Every build is optimized for fast phone loading, clean typography, and instant enquiry capture. Tap any site below to test the live demonstration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {SHOWCASE_PROJECTS.map((project) => (
              <div
                key={project.title}
                className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-zinc-700"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-mono text-[11px] font-semibold">
                        {project.niche}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                        {project.location}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Demo
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
                    {project.title}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 mb-3 italic">
                    &ldquo;{project.headline}&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="rounded-xl p-3.5 bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 mb-6 space-y-1.5">
                    {project.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center justify-center gap-2 group min-h-[44px]"
                >
                  <span>Test {project.title} Live</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Guide Row */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              Trade Starter Build
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-mono text-[11px] font-bold">
              Founding Rate: £350
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">£350</span>
            <span className="text-sm text-slate-400 line-through">£450 standard</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mb-5 leading-relaxed">
            Founding rate for the first 5 local clients. Split 50/50: £175 deposit to start, £175 upon live launch.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              'Single page custom mobile-first build',
              'Tap to call & WhatsApp enquiry buttons',
              'Google Business & local SEO setup',
              'Delivery within 5 to 7 working days',
              'Zero ongoing platform subscriptions',
            ].map((pt) => (
              <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_QUOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-[#D90429] hover:bg-[#b80322] active:bg-[#9a021c] text-white dark:bg-white dark:hover:bg-zinc-200 dark:active:bg-zinc-300 dark:text-black font-bold text-xs sm:text-sm transition-all shadow-lg shadow-red-600/20 inline-flex items-center justify-center gap-2 group min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Claim £350 Rate on WhatsApp</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
