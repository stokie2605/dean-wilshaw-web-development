import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WhatsAppBar } from './trade-tools/WhatsAppBar';
import { SocialProofBanner } from './trade-tools/SocialProofBanner';
import { IntakeDeposit } from './trade-tools/IntakeDeposit';
import { QuoteEstimator } from './tools/QuoteEstimator';
import { MissedCallDemo } from './trade-tools/MissedCallDemo';
import { 
  Target, 
  Zap, 
  Smartphone, 
  MessageSquare, 
  ArrowRight, 
  PhoneMissed, 
  Bot, 
  Clock, 
  CheckCircle2, 
  Flame, 
  AlertTriangle, 
  Send,
  Sparkles
} from 'lucide-react';

interface InteractiveDemosSectionProps {
  onOpenStitch?: () => void;
}

export const InteractiveDemosSection: React.FC<InteractiveDemosSectionProps> = ({ onOpenStitch }) => {
  const navigate = useNavigate();

  // AI Dispatcher Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState<'boiler' | 'roof' | 'electrical'>('boiler');
  const [simStep, setSimStep] = useState<number>(3); // fully resolved preview

  const scenarios = {
    boiler: {
      title: 'Boiler Breakdown (10:45 PM Sunday)',
      trade: 'Heating & Gas Engineer',
      urgency: 'CRITICAL EMERGENCY',
      urgencyColor: 'bg-red-500/10 text-red-500 border-red-500/30',
      chat: [
        { sender: 'customer', text: 'Hi, our boiler just started banging and error code F28 is flashing. No heating or hot water!' },
        { sender: 'bot', text: 'Hi there! I can help triage this for Dean. Is there any visible water leaking from the boiler or pipes right now?' },
        { sender: 'customer', text: 'No water leaking, just cold radiators and no hot water for the kids in the morning.' },
        { sender: 'bot', text: 'Got it. Error F28 is an ignition lockout. What is your postcode and best contact number? I will dispatch a priority emergency notification to Dean now.' },
        { sender: 'customer', text: 'ST4 5AA, phone 07890 123456.' }
      ],
      whatsappSummary: `EMERGENCY HEATING DISPATCH\n- Customer: 07890 123456\n- Postcode: ST4 5AA\n- Issue: Boiler F28 ignition lockout (no leak)\n- Urgency: Priority Morning Callout\n- Status: Ready for 1-tap quote reply`
    },
    roof: {
      title: 'Ceiling Water Leak (Storm Gale)',
      trade: 'Roofing & Storm Specialist',
      urgency: 'HIGH URGENCY',
      urgencyColor: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
      chat: [
        { sender: 'customer', text: 'Water is dripping through our upstairs ceiling after the heavy rain and wind.' },
        { sender: 'bot', text: 'Sorry to hear that! Please place a bucket underneath immediately. Is the water coming through a light fitting or near electricals?' },
        { sender: 'customer', text: 'No, it is in the corner of the bedroom ceiling.' },
        { sender: 'bot', text: 'Understood. Please upload a quick photo if possible and provide your address. Dean will review the damage on WhatsApp for an immediate priority slot.' },
        { sender: 'customer', text: 'Address: CW1 3XY, mobile: 07700 900123.' }
      ],
      whatsappSummary: `STORM ROOF LEAK DISPATCH\n- Customer: 07700 900123\n- Location: CW1 3XY (Crewe)\n- Issue: Bedroom ceiling leak from roof tile slip\n- Urgency: High (Weather Active)\n- Status: Ready for 1-tap quote reply`
    },
    electrical: {
      title: 'Commercial Consumer Unit Upgrade',
      trade: 'Approved Electrician',
      urgency: 'HIGH-TICKET QUALIFIED',
      urgencyColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
      chat: [
        { sender: 'customer', text: 'Hi, we need an old fuse box replaced with a modern RCBO consumer unit for insurance compliance.' },
        { sender: 'bot', text: 'Hello! Dean specializes in 18th Edition metal board upgrades. How many circuits or fuse ways are in your existing board?' },
        { sender: 'customer', text: 'It is an 8-way wooden-backed fuse box.' },
        { sender: 'bot', text: 'Perfect. Standard 8-10 way metal RCBO upgrades include full EICR certification. What is your property location and preferred installation week?' },
        { sender: 'customer', text: 'Newcastle-under-Lyme (ST5), 07321 654987. Next Tuesday suits.' }
      ],
      whatsappSummary: `QUALIFIED ELECTRICAL LEAD\n- Customer: 07321 654987\n- Area: ST5 (Newcastle-under-Lyme)\n- Scope: 8-Way Metal Board Upgrade + EICR\n- Value Tier: £450 - £650\n- Status: Ready to confirm date`
    }
  };

  const current = scenarios[selectedScenario];

  return (
    <section id="conversion-tools" className="scroll-mt-24 py-24 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white border-y border-slate-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-bold tracking-wide uppercase">
            Stop Losing Mobile Leads
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">
            Turn Mobile Traffic Into Direct Jobs
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400">
            Most local business websites lose 90% of mobile visitors to standard, boring contact forms.
            Test my 6 interactive lead-capture tools below to see how I turn casual browsers into warm phone calls and instant deposits.
          </p>
        </div>

        {/* 6 Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          {/* 1. Missed-Call Auto-Text (#missed-call) */}
          <div id="missed-call" className="scroll-mt-28 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <PhoneMissed className="text-red-600 dark:text-red-500" />
                Missed-Call Auto-Text
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                Automatically texts back customers who hit your voicemail in under 5 seconds so they don't call your competitor while you are on a job.
              </p>
            </div>
            <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 flex-grow flex items-center justify-center shadow-sm">
              <MissedCallDemo />
            </div>
            <button
              onClick={() => navigate('/demo/missed-call')}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-500 transition-colors self-end"
            >
              Open Full Demo Page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Deposit & Booking Portal (#deposit-portal) */}
          <div id="deposit-portal" className="scroll-mt-28 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Zap className="text-red-600 dark:text-red-500" />
                Deposit &amp; Booking Portal
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                Stop wasting hours on tyre-kickers. Checks job urgency and secures an upfront commitment before you confirm a calendar slot.
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

          {/* 3. WhatsApp Fast Bar (#whatsapp-bar) */}
          <div id="whatsapp-bar" className="scroll-mt-28 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <MessageSquare className="text-red-600 dark:text-red-500" />
                WhatsApp Fast Bar
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

          {/* 4. Live Trust Indicators (#trust-bar) */}
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

          {/* 5. Instant Quote Calculator (#quote-calculator) */}
          <div id="quote-calculator" className="scroll-mt-28 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Smartphone className="text-red-600 dark:text-red-500" />
                Instant Quote Calculator
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                Customers want a ballpark before they commit to a call. This interactive estimator gives them an instant price range for common jobs, capturing their mobile number in the process.
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

          {/* 6. 24/7 AI Lead Assistant & Emergency Dispatcher (#ai-bot) */}
          <div id="ai-bot" className="scroll-mt-28 flex flex-col lg:col-span-2">
            <div className="mb-6 max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/30">
                  24/7 Emergency Triage &amp; Dispatch
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Bot className="text-red-600 dark:text-red-500 w-7 h-7" />
                24/7 AI Trade Dispatcher
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-medium">
                &ldquo;Your website working as a full-time receptionist 24/7 - qualifying emergencies, filtering out tyre-kickers, and capturing bookings while you sleep.&rdquo;
              </p>
            </div>

            {/* AI Dispatcher Feature Pillars + Interactive Simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 shadow-xl">
              
              {/* Left Column: 3 Core Pillars */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5 mb-1.5 font-bold text-slate-900 dark:text-white text-sm">
                      <Clock className="w-4 h-4 text-amber-500" />
                      1. Answers FAQs Instantly
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-400">
                      Explains service areas, callout charges, and typical lead times at 11 PM on a Sunday without you touching your phone.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5 mb-1.5 font-bold text-slate-900 dark:text-white text-sm">
                      <Sparkles className="w-4 h-4 text-sky-500" />
                      2. Diagnoses the Issue
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-400">
                      Asks 3 smart questions (e.g., &ldquo;Is water currently leaking through the ceiling?&rdquo; or &ldquo;What boiler model do you have?&rdquo;).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5 mb-1.5 font-bold text-slate-900 dark:text-white text-sm">
                      <Send className="w-4 h-4 text-emerald-500" />
                      3. Routes the Lead
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-400">
                      Pushes the chat summary, customer phone number, and urgency tier directly to your WhatsApp with a 1-tap quote reply.
                    </p>
                  </div>
                </div>

                {onOpenStitch && (
                  <button
                    onClick={onOpenStitch}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
                  >
                    <Bot className="w-4 h-4" />
                    Test Live AI Assistant Now
                  </button>
                )}
              </div>

              {/* Right Column: Live Interactive Triage Simulator */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                
                {/* Scenario Selector Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
                  <button
                    onClick={() => setSelectedScenario('boiler')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                      selectedScenario === 'boiler' 
                        ? 'bg-red-600 text-white shadow-md' 
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    Boiler Panic (10:45 PM)
                  </button>

                  <button
                    onClick={() => setSelectedScenario('roof')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                      selectedScenario === 'roof' 
                        ? 'bg-amber-600 text-white shadow-md' 
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Storm Leak
                  </button>

                  <button
                    onClick={() => setSelectedScenario('electrical')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                      selectedScenario === 'electrical' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Fuse Board Upgrade
                  </button>
                </div>

                {/* Simulated Chat Interface */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 dark:bg-black border border-slate-800 dark:border-zinc-800 flex flex-col space-y-3 font-sans shadow-inner">
                  
                  {/* Chat Top Bar */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="font-bold text-white">24/7 Triage Engine ({current.trade})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase border ${current.urgencyColor}`}>
                      {current.urgency}
                    </span>
                  </div>

                  {/* Chat Stream Messages */}
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {current.chat.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === 'customer'
                              ? 'bg-red-600 text-white rounded-br-none'
                              : 'bg-zinc-800 text-zinc-200 border border-zinc-700/60 rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp Hand-off Alert Preview */}
                  <div className="mt-2 p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-mono whitespace-pre-line leading-snug">
                    <div className="flex items-center gap-1.5 font-sans font-bold text-emerald-400 mb-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Automatic WhatsApp Hand-off Dispatched:
                    </div>
                    {current.whatsappSummary}
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
