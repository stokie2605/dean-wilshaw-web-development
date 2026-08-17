import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToolParams } from '../hooks/useToolParams';
import { QuoteEstimator } from '../components/tools/QuoteEstimator';
import { AreaCalculator } from '../components/tools/AreaCalculator';
import { MissedCallWidget } from '../components/tools/MissedCallWidget';
import { BeforeAfterSlider } from '../components/tools/BeforeAfterSlider';
import { BookingForm } from '../components/tools/BookingForm';
import { WhatsAppBar } from '../components/trade-tools/WhatsAppBar';
import { SocialProofBanner } from '../components/trade-tools/SocialProofBanner';

const STRIPE_LINK = 'https://buy.stripe.com/28E28r8zO6r23Bw6wPaAw00';

function renderTool(toolId: string | undefined) {
  switch (toolId) {
    case 'quote-calculator': return <QuoteEstimator />;
    case 'booking-form':     return <BookingForm />;
    case 'whatsapp-bar':     return <WhatsAppBar />;
    case 'trust-bar':        return <SocialProofBanner />;
    // Legacy routes - kept for backward compatibility
    case 'area-calculator':  return <AreaCalculator />;
    case 'missed-call':      return <MissedCallWidget />;
    case 'before-after':     return <BeforeAfterSlider />;
    default:                 return <QuoteEstimator />;
  }
}

const TOOL_LABELS: Record<string, string> = {
  'quote-calculator': 'Instant Guide Price',
  'booking-form':     'Qualification & Deposit Portal',
  'whatsapp-bar':     'Mobile WhatsApp Bar',
  'trust-bar':        'Live Trust Indicators',
  'area-calculator':  'Area and Material Calculator',
  'missed-call':      'Missed Call WhatsApp Widget',
  'before-after':     'Before and After Showcase',
};

type Bullet = { heading: string; body: string };

const TOOL_BULLETS: Record<string, Bullet[]> = {
  'quote-calculator': [
    { heading: 'Captures leads instantly:', body: 'Homeowners get an instant ballpark price and message you directly on WhatsApp with job details pre-filled.' },
    { heading: 'Zero redesign needed:', body: 'Plugs straight into Wix, WordPress, Squarespace, or custom sites in 24 hours.' },
    { heading: 'One flat fee with no surprises:', body: '\u00a3149 covers installation, custom pricing logic, and testing. No monthly fees.' },
  ],
  'booking-form': [
    { heading: 'Filters out time-wasters:', body: 'Requires urgent leads to specify job timeframe and commit to a slot before you travel out.' },
    { heading: 'Secures upfront commitment:', body: 'Collects job details, preferred dates, and optional deposit payments directly.' },
    { heading: 'One flat fee with no surprises:', body: '\u00a3149 one-off installation. Connected to your calendar and WhatsApp.' },
  ],
  'whatsapp-bar': [
    { heading: 'Eliminates friction:', body: 'Gives mobile visitors instant 1-tap buttons to call or message photos of their job on WhatsApp.' },
    { heading: 'Sticks to mobile screens:', body: 'Stays visible as users scroll through your site without blocking content.' },
    { heading: 'One flat fee with no surprises:', body: '\u00a3149 one-off installation with direct routing to your business number.' },
  ],
  'trust-bar': [
    { heading: 'Builds immediate trust:', body: 'Floats your Google review score, verified status, and local insurance badges right at the top.' },
    { heading: 'Reduces bounce rates:', body: 'Proves credibility in under 3 seconds before the visitor clicks away.' },
    { heading: 'One flat fee with no surprises:', body: '\u00a3149 one-off installation styled to match your branding.' },
  ],
};

const DEFAULT_BULLETS: Bullet[] = [
  { heading: 'Captures leads instantly:', body: 'Homeowners get a price in seconds and message you directly on WhatsApp with no voicemail and no lost jobs.' },
  { heading: 'Zero redesign needed:', body: 'Plugs straight into your existing Wix, WordPress, Squarespace, or custom site in 24 hours.' },
  { heading: 'One flat fee with no surprises:', body: '\u00a3149 covers full installation, testing, and handover. No monthly fees and no contracts.' },
];

export function ToolDemoPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const { biz, trade } = useToolParams();
  const toolLabel = TOOL_LABELS[toolId || ''] || 'Lead Capture Tool';
  const isGeneric = biz === 'Local Trade Specialist';
  const bullets = TOOL_BULLETS[toolId || ''] ?? DEFAULT_BULLETS;

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col items-center justify-start p-4 py-10">

      {/* Back link */}
      <div className="w-full max-w-md mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Design Systems Web
        </button>
      </div>

      {/* Header */}
      <div className="text-center max-w-md mb-6">
        <span className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold rounded-full mb-3 uppercase tracking-widest">
          {isGeneric ? 'Live Demo' : '24-Hour Preview'}
        </span>
        <h1 className="text-2xl font-black text-white tracking-tight">
          {toolLabel}{!isGeneric && ` for ${biz}`}
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Try the live demo below, exactly how it appears on your website:
        </p>
      </div>

      {/* Live Tool */}
      <div className="w-full max-w-md flex justify-center mb-8">
        {renderTool(toolId)}
      </div>

      {/* Value Points */}
      <div className="bg-[#0f1218] border border-slate-800 rounded-xl p-5 max-w-md w-full mb-6 space-y-3">
        <p className="font-bold text-sm text-white border-b border-slate-800 pb-2">
          Why add this to your website?
        </p>
        <div className="space-y-2 text-xs text-slate-300">
          {bullets.map(({ heading, body }) => (
            <p key={heading}>
              <strong className="text-white">{heading}</strong> {body}
            </p>
          ))}
        </div>
      </div>

      {/* Stripe CTA */}
      <div className="w-full max-w-md text-center">
        <a
          href={STRIPE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-black py-4 px-6 rounded-xl text-sm transition shadow-lg shadow-red-600/20 uppercase tracking-wide"
        >
          Install on your website for &pound;149
        </a>
        <p className="text-[11px] text-slate-500 mt-2">
          Secure Stripe Checkout | Instant receipt | Installed within 24h
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          Powered by <span className="text-slate-400 font-semibold">Design Systems Web</span>
        </p>
      </div>

    </div>
  );
}
