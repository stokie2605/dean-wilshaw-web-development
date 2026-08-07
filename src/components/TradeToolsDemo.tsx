import React from 'react';
import { WhatsAppBar } from './trade-tools/WhatsAppBar';
import { SocialProofBanner } from './trade-tools/SocialProofBanner';
import { IntakeDeposit } from './trade-tools/IntakeDeposit';
import { MissedCallDemo } from './trade-tools/MissedCallDemo';
import { Target, Zap, Smartphone, MessageSquare } from 'lucide-react';

export const TradeToolsDemo = () => {
  return (
    <section id="conversion-tools" className="py-24 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white border-y border-slate-200 dark:border-zinc-800 transition-colors duration-300">
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
            Test our interactive lead-capture tools below to see how we turn casual browsers into warm phone calls and instant deposits.
          </p>
        </div>

        {/* Tools Grid - Tidy 4 Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Tool 1: Social Proof Trust Banner */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Target className="text-red-600 dark:text-red-500" />
                Live Trust Indicators
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                If people don't trust you, they won't contact you. This dynamic banner sits at the very top of your site, instantly proving you are local, insured, and highly rated.
              </p>
            </div>
            <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 flex-grow flex items-center justify-center shadow-sm">
              <SocialProofBanner />
            </div>
          </div>

          {/* Tool 2: Intake Deposit */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Zap className="text-red-600 dark:text-red-500" />
                Qualification & Deposit Portal
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                Stop wasting hours on time-wasters. This quick form checks how urgent the job is and secures a small upfront deposit before you even confirm a calendar slot.
              </p>
            </div>
            <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 flex-grow flex items-center justify-center shadow-sm">
              <IntakeDeposit />
            </div>
          </div>

          {/* Tool 3: Missed Call Auto Text */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <Smartphone className="text-red-600 dark:text-red-500" />
                Missed-Call Auto-Text
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                Over 80% of customers who reach a voicemail instantly tap back to Google and call a competitor. 
                Our background system detects missed calls and fires an instant text to save the lead.
              </p>
            </div>
            <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 flex-grow flex items-center justify-center shadow-sm">
              <MissedCallDemo />
            </div>
          </div>

          {/* Tool 4: WhatsApp Bar */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-zinc-100">
                <MessageSquare className="text-red-600 dark:text-red-500" />
                Mobile WhatsApp Bar
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm">
                Typing long emails on a phone keyboard is annoying. 
                Our sticky WhatsApp bars make it incredibly easy for customers to snap a photo and message you in one tap.
              </p>
            </div>
            <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 flex-grow flex items-center justify-center shadow-sm">
              <div className="w-full">
                <WhatsAppBar />
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
};
