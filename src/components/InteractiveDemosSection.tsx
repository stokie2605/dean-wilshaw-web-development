import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WhatsAppBar } from './trade-tools/WhatsAppBar';
import { SocialProofBanner } from './trade-tools/SocialProofBanner';
import { IntakeDeposit } from './trade-tools/IntakeDeposit';
import { QuoteEstimator } from './tools/QuoteEstimator';
import { 
  Target, 
  Zap, 
  Smartphone, 
  MessageSquare, 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  Flame, 
  AlertTriangle
} from 'lucide-react';

export const InteractiveDemosSection: React.FC = () => {
  const navigate = useNavigate();

  // AI Dispatcher Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState<'boiler' | 'roof' | 'electrical'>('boiler');

  const scenarios = {
    boiler: {
      label: '🔥 Emergency Boiler F28',
      trade: 'Heating & Gas Specialist',
      urgency: 'CRITICAL EMERGENCY',
      urgencyBadge: 'bg-red-500/10 text-red-500 border-red-500/30',
      chat: [
        { sender: 'customer', text: 'Our boiler just locked out with error code F28. No heating or hot water!' },
        { sender: 'bot', text: 'Error F28 is an ignition lockout. Is there any active water leak from the unit?' },
        { sender: 'customer', text: 'No leaks, just completely cold radiators.' },
        { sender: 'bot', text: 'Understood. Dispatching an emergency triage alert to the on-call engineer now.' }
      ],
      whatsappSummary: `EMERGENCY HEATING DISPATCH\n- Issue: Boiler F28 ignition lockout (no leak)\n- Urgency: Priority Morning Callout\n- Location: Postcode ST4 (Stoke-on-Trent)\n- Status: Ready for 1-tap quote reply`
    },
    roof: {
      label: '🌧️ Active Ceiling Leak',
      trade: 'Roofing & Storm Contractor',
      urgency: 'HIGH URGENCY',
      urgencyBadge: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
      chat: [
        { sender: 'customer', text: 'Water is dripping through our bedroom ceiling after the storm.' },
        { sender: 'bot', text: 'Please place a bucket underneath. Is water near any lights or electricals?' },
        { sender: 'customer', text: 'No, just in the corner of the ceiling.' },
        { sender: 'bot', text: 'Got it. Requesting immediate roof triage. Engineer dispatching priority slot.' }
      ],
      whatsappSummary: `STORM DAMAGE LEAK DISPATCH\n- Issue: Bedroom ceiling leak (tile slip)\n- Urgency: High (Active Rain)\n- Location: Postcode CW1 (Crewe)\n- Status: Ready for 1-tap quote reply`
    },
    electrical: {
      label: '⚡ Tripped Fuse Board',
      trade: 'Approved Electrical Specialist',
      urgency: 'HIGH-TICKET QUALIFIED',
      urgencyBadge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
      chat: [
        { sender: 'customer', text: 'Our main RCD tripped and the sockets on ground floor have no power.' },
        { sender: 'bot', text: 'Have you unplugged major appliances? How old is your current fuse board?' },
        { sender: 'customer', text: 'Unplugged kettle, still tripping. It is an old 1990s fuse board.' },
        { sender: 'bot', text: 'Tripping fault diagnosed. Logging consumer unit test & dispatching electrician.' }
      ],
      whatsappSummary: `QUALIFIED ELECTRICAL DISPATCH\n- Issue: Ground floor RCD fault (Old board)\n- Urgency: Same-Day Fault Finding\n- Scope: Diagnostic + Board Upgrade Quote\n- Status: Ready to confirm slot`
    }
  };

  const current = scenarios[selectedScenario];

  return (
    <section id="conversion-tools" className="scroll-mt-24 py-24 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white border-y border-slate-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase">
            Stop Losing Mobile Leads
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">
            Turn Mobile Traffic Into Direct Jobs
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400">
            Most local business websites lose 90% of mobile visitors to standard, boring contact forms.
            Test my interactive lead-capture tools below to see how I turn casual browsers into warm phone calls and instant deposits.
          </p>
        </div>

        {/* 1. TOP FULL-WIDTH SHOWCASE: 24/7 AI Trade Dispatcher (#ai-bot) */}
        <div id="ai-bot" className="scroll-mt-28 mb-16">
          <div className="bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-6">
            
            {/* Header & Sub-copy (No literal quotes) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-zinc-800 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold uppercase tracking-wider mb-2">
                  <Bot className="w-3.5 h-3.5" />
                  24/7 Emergency Triage &amp; Dispatch
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  24/7 AI Trade Dispatcher
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-1 font-medium">
                  Your website working as a full-time receptionist 24/7: qualifying emergencies, filtering out time wasters, and capturing bookings while you sleep.
                </p>
              </div>

              {/* 3 Preset Scenario Triggers */}
              <div className="flex flex-wrap items-center gap-2">
                {(['boiler', 'roof', 'electrical'] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedScenario(key)}
                    className={`px-3.5 py-2 text-xs rounded-xl border transition-all ${
                      selectedScenario === key
                        ? 'bg-red-600 text-white border-red-600 font-bold shadow-sm shadow-red-600/20'
                        : 'bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700/60 font-medium'
                    }`}
                  >
                    {scenarios[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* 1-Click Interactive Triage Simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Terminal Auto-Triage Exchange */}
              <div className="lg:col-span-7 bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-5 border border-zinc-300 dark:border-zinc-800 flex flex-col justify-between shadow-inner">
                <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-800 pb-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></div>
                    <span className="font-bold text-zinc-900 dark:text-white font-mono">Live Triage Engine ({current.trade})</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase border ${current.urgencyBadge}`}>
                    {current.urgency}
                  </span>
                </div>

                <div className="space-y-3 py-4 font-sans text-xs">
                  {current.chat.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[90%] p-3 rounded-2xl leading-relaxed ${
                          msg.sender === 'customer'
                            ? 'bg-red-600 text-white rounded-br-none'
                            : 'bg-white text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700/60 rounded-bl-none shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-zinc-500 font-mono pt-2 border-t border-zinc-300 dark:border-zinc-800 flex items-center justify-between">
                  <span>Fully automated triage. No manual input needed.</span>
                  <span>100% Automated</span>
                </div>
              </div>

              {/* Instant WhatsApp Dispatch Generated Card */}
              <div className="lg:col-span-5 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    WhatsApp Dispatch Generated
                  </div>

                  <div className="p-3.5 bg-zinc-800 dark:bg-black/60 rounded-xl border border-emerald-500/30 text-emerald-200 dark:text-emerald-300 font-mono text-xs whitespace-pre-line leading-relaxed">
                    {current.whatsappSummary}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>Ready for 1-Tap Reply</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">Instant Alert</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 2. BOTTOM BALANCED 4-CARD GRID (2x2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          {/* Card 1: Instant Quote Calculator (#quote-calculator) */}
          <div id="quote-calculator" className="scroll-mt-28 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Smartphone className="text-red-600 dark:text-red-500" />
                Instant Quote Calculator
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                Customers want a quick price guide before they commit to a call. This interactive estimator calculates an instant estimate for common jobs and captures their phone number in the process.
              </p>
            </div>
            <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 flex-grow flex items-center justify-center shadow-sm">
              <QuoteEstimator />
            </div>
            <button
              onClick={() => navigate('/demo/quote-calculator')}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-500 transition-colors self-end"
            >
              Open Full Demo Page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Qualification & Deposit Portal (#deposit-portal) */}
          <div id="deposit-portal" className="scroll-mt-28 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Zap className="text-red-600 dark:text-red-500" />
                Deposit &amp; Booking Portal
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                Stop spending hours on unqualified enquiries. Checks job urgency and secures an upfront commitment before you confirm a calendar slot.
              </p>
            </div>
            <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 flex-grow flex items-center justify-center shadow-sm">
              <IntakeDeposit />
            </div>
            <button
              onClick={() => navigate('/demo/booking-form')}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-500 transition-colors self-end"
            >
              Open Full Demo Page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Mobile WhatsApp Fast Bar (#whatsapp-bar) */}
          <div id="whatsapp-bar" className="scroll-mt-28 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <MessageSquare className="text-red-600 dark:text-red-500" />
                Mobile WhatsApp Fast Bar
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                Typing long emails on a phone keyboard is annoying. Sticky WhatsApp bars let customers snap a job photo and message you in one tap.
              </p>
            </div>
            <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 flex-grow flex items-center justify-center shadow-sm">
              <div className="w-full">
                <WhatsAppBar />
              </div>
            </div>
            <button
              onClick={() => navigate('/demo/whatsapp-bar')}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-500 transition-colors self-end"
            >
              Open Full Demo Page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Live Trust & Credibility Bar (#trust-bar) */}
          <div id="trust-bar" className="scroll-mt-28 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Target className="text-red-600 dark:text-red-500" />
                Live Trust Indicators
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                If people don't trust you, they won't contact you. This dynamic banner sits at the very top of your site, instantly proving you are local, insured, and 5-star rated.
              </p>
            </div>
            <div className="p-4 sm:p-8 rounded-3xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 flex-grow flex items-center justify-center shadow-inner">
              <SocialProofBanner />
            </div>
            <button
              onClick={() => navigate('/demo/trust-bar')}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-500 transition-colors self-end"
            >
              Open Full Demo Page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
