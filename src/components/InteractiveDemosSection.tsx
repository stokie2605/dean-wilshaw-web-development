import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WhatsAppBar } from './trade-tools/WhatsAppBar';
import { SocialProofBanner } from './trade-tools/SocialProofBanner';
import { IntakeDeposit } from './trade-tools/IntakeDeposit';
import { QuoteEstimator } from './tools/QuoteEstimator';
import { MissedCallDemo } from './trade-tools/MissedCallDemo';
import { Target, Zap, Smartphone, MessageSquare, PhoneMissed, ArrowRight } from 'lucide-react';

export const InteractiveDemosSection = () => {
  const navigate = useNavigate();

  return (
    <section id="conversion-tools" className="scroll-mt-24 py-24 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white border-y border-slate-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 text-sm font-bold tracking-wide uppercase">
            Stop Losing Mobile Leads
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">
            Turn Mobile Traffic Into Direct Jobs
          </h2>
          <p className="text-lg text-slate-600 dark:text-zinc-400">
            Most local business websites lose 90% of mobile visitors to standard, boring contact forms.
            Test my interactive lead-capture tools below to see how I turn casual browsers into warm phone calls and instant deposits.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          {/* Tool 1: Social Proof Trust Banner */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Target className="text-red-600 dark:text-red-500" />
                Live Trust Indicators
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                <span className="md:hidden">Instantly proves you are local, insured, and highly rated right at the top of your site.</span>
                <span className="hidden md:inline">If people don't trust you, they won't contact you. This dynamic banner sits at the very top of your site, instantly proving you are local, insured, and highly rated.</span>
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

          {/* Tool 2: Intake Deposit */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Zap className="text-red-600 dark:text-red-500" />
                Qualification &amp; Deposit Portal
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                <span className="md:hidden">Checks job urgency and secures upfront commitment before booking calendar slots.</span>
                <span className="hidden md:inline">Stop wasting hours on time-wasters. This quick form checks how urgent the job is and secures a small upfront deposit before you even confirm a calendar slot.</span>
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

          {/* Tool 3: Instant Guide Price */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Smartphone className="text-red-600 dark:text-red-500" />
                Instant Guide Price
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                <span className="md:hidden">Gives visitors an instant ballpark price range and captures their mobile number.</span>
                <span className="hidden md:inline">Customers want a ballpark before they commit to a call. This interactive estimator gives them an instant price range for common jobs, capturing their mobile number in the process.</span>
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

          {/* Tool 4: WhatsApp Bar */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <MessageSquare className="text-red-600 dark:text-red-500" />
                Mobile WhatsApp Bar
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                <span className="md:hidden">Lets mobile visitors tap once to call or message job photos directly on WhatsApp.</span>
                <span className="hidden md:inline">Typing long emails on a phone keyboard is annoying. My sticky WhatsApp bars make it incredibly easy for customers to snap a photo and message you in one tap.</span>
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

          {/* Tool 5: Missed-Call Auto-Text */}
          <div className="flex flex-col lg:col-span-2 max-w-2xl mx-auto w-full">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <PhoneMissed className="text-red-600 dark:text-red-500" />
                Instant Missed-Call Auto-Text
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm max-w-xl mx-auto">
                Automatically texts back customers who hit your voicemail in under 5 seconds so they don't hire someone else.
              </p>
            </div>
            <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 flex-grow flex items-center justify-center shadow-sm">
              <div className="w-full max-w-md">
                <MissedCallDemo />
              </div>
            </div>
            <button
              onClick={() => navigate('/demo/missed-call')}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-500 transition-colors self-center"
            >
              Open Full Demo Page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
