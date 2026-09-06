import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, Camera, Bot, Smartphone, Monitor } from 'lucide-react';
import { PhoneFrame, PhonePreviewHero, DesktopFrame, DesktopPreviewHero } from './frames';
import { VoiceToQuoteDemo } from './VoiceToQuoteDemo';
import { WhatsAppBar } from '../trade-tools/WhatsAppBar';

interface ToolProps {
  onSummaryChange: (summary: string) => void;
}

function chipClass(active: boolean): string {
  return `w-full text-left px-3.5 py-3 rounded-2xl border text-xs font-medium transition-colors ${
    active
      ? 'border-[#D90429] bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-400 font-semibold'
      : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
  }`;
}

function ChipButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button whileTap={{ scale: 0.97 }} type="button" onClick={onClick} className={chipClass(active)}>
      {children}
    </motion.button>
  );
}

function SegmentButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={onClick}
      className={`py-3 px-2 rounded-2xl text-[11px] font-bold font-mono text-center transition-all ${
        active
          ? 'bg-[#D90429] text-white shadow-sm'
          : 'bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
      }`}
    >
      {children}
    </motion.button>
  );
}

function PriceReadout({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="relative rounded-2xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-4 text-center overflow-hidden shadow-inner">
      <p className="text-[9px] uppercase tracking-widest font-mono font-semibold text-slate-500 dark:text-zinc-400">
        Ballpark Estimate
      </p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="font-mono text-lg font-black text-slate-900 dark:text-white"
      >
        {value}
      </motion.p>
      <p className="text-[9px] text-slate-500 dark:text-zinc-500 mt-0.5">{caption}</p>
    </div>
  );
}

const COMPLEXITY_LEVELS: { label: string; factor: number }[] = [
  { label: 'Minor Job', factor: 1.0 },
  { label: 'Standard Job', factor: 1.8 },
  { label: 'Major Job', factor: 3.2 },
  { label: 'Full Install', factor: 5.5 },
];

const SIZE_TIERS: { id: string; label: string; base: number }[] = [
  { id: 'small', label: 'Small', base: 140 },
  { id: 'medium', label: 'Medium', base: 220 },
  { id: 'large', label: 'Large', base: 340 },
];

function GenericEstimatorTool({ onSummaryChange }: ToolProps) {
  const [complexityIndex, setComplexityIndex] = useState(1);
  const [sizeId, setSizeId] = useState(SIZE_TIERS[1].id);

  const complexity = COMPLEXITY_LEVELS[complexityIndex];
  const size = SIZE_TIERS.find((s) => s.id === sizeId) ?? SIZE_TIERS[1];
  const low = Math.round(size.base * complexity.factor);
  const high = Math.round(low * 1.25);

  useEffect(() => {
    onSummaryChange(`${complexity.label}, ${size.label} job, ballpark £${low} to £${high}`);
  }, [complexity.label, size.label, low, high, onSummaryChange]);

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-zinc-300 mb-2">
          <span>Job Complexity</span>
          <span className="text-[#D90429] font-mono">{complexity.label}</span>
        </div>
        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={complexityIndex}
          onChange={(e) => setComplexityIndex(Number(e.target.value))}
          className="w-full accent-[#D90429] cursor-pointer"
        />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300 mb-2">Job Size</p>
        <div className="grid grid-cols-3 gap-2">
          {SIZE_TIERS.map((s) => (
            <SegmentButton key={s.id} active={sizeId === s.id} onClick={() => setSizeId(s.id)}>
              {s.label}
            </SegmentButton>
          ))}
        </div>
      </div>
      <PriceReadout value={`£${low} to £${high}`} caption="Includes standard parts and labour" />
    </div>
  );
}

const URGENCY_OPTIONS = ['Emergency', 'This Week', 'Flexible'] as const;

function GenericTriageTool({ onSummaryChange }: ToolProps) {
  const [step, setStep] = useState(1);
  const [jobDescription, setJobDescription] = useState('');
  const [urgency, setUrgency] = useState<(typeof URGENCY_OPTIONS)[number]>('This Week');
  const [mediaAdded, setMediaAdded] = useState(false);

  const resolvedJob = jobDescription.trim();

  useEffect(() => {
    if (!resolvedJob) {
      onSummaryChange('');
      return;
    }
    onSummaryChange(`${resolvedJob}, ${urgency} priority${mediaAdded ? ', photo attached' : ''}`);
  }, [resolvedJob, urgency, mediaAdded, onSummaryChange]);

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          24/7 Emergency Intake
        </p>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 w-5 rounded-full transition-colors ${step >= s ? 'bg-[#D90429]' : 'bg-slate-200 dark:bg-zinc-700'}`}
            />
          ))}
        </div>
      </div>

      <>
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Step 1. What is the job?</p>
            <textarea
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Briefly describe the job, for example a burst pipe under the kitchen sink"
              className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-2xl p-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500 resize-none"
            />
            <motion.button
              whileTap={resolvedJob ? { scale: 0.98 } : undefined}
              type="button"
              disabled={!resolvedJob}
              onClick={() => setStep(2)}
              className="w-full py-2.5 rounded-2xl text-xs font-bold bg-[#D90429] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              Next
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Step 2. How urgent?</p>
            <div className="grid grid-cols-3 gap-2">
              {URGENCY_OPTIONS.map((u) => (
                <SegmentButton key={u} active={urgency === u} onClick={() => setUrgency(u)}>
                  {u}
                </SegmentButton>
              ))}
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 rounded-2xl text-xs font-bold bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300"
              >
                Back
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-2.5 rounded-2xl text-xs font-bold bg-[#D90429] text-white"
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Step 3. Add context</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setMediaAdded((v) => !v)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-semibold border transition-colors ${
                mediaAdded
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                  : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <Camera className="w-4 h-4" />
              {mediaAdded ? 'Photo and voice note attached' : 'Simulate photo and voice note'}
            </motion.button>

            <div className="rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-3">
              <p className="text-[9px] uppercase tracking-widest font-mono font-semibold text-slate-500 dark:text-zinc-400 mb-1.5">
                Triage Summary
              </p>
              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                {resolvedJob || 'No job details yet'}, {urgency}
                {mediaAdded ? ', photo attached' : ''}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setStep(1)}
              className="w-full py-2.5 rounded-2xl text-xs font-bold bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300"
            >
              Start Over
            </motion.button>
          </motion.div>
        )}
      </>
    </div>
  );
}

const VOICE_QUOTE_SCALE = 0.62;

function ScaledVoiceToQuote() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scaledHeight, setScaledHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => setScaledHeight(el.scrollHeight * VOICE_QUOTE_SCALE);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full" style={{ height: scaledHeight || undefined }}>
      <div
        ref={contentRef}
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: `${100 / VOICE_QUOTE_SCALE}%`, transform: `scale(${VOICE_QUOTE_SCALE})` }}
      >
        <VoiceToQuoteDemo />
      </div>
    </div>
  );
}

type FeatureKey = 'estimator' | 'triage' | 'whatsapp_bar' | 'voice_quote' | 'ai_chatbot';

interface FeatureConfig {
  key: FeatureKey;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FEATURE_CONFIGS: FeatureConfig[] = [
  {
    key: 'estimator',
    label: 'Interactive Price Estimator',
    description: 'A dynamic slider or chip based calculator giving instant ballpark pricing.',
    icon: Sparkles,
  },
  {
    key: 'triage',
    label: '24/7 Emergency Triage and Photo Intake Form',
    description: 'A guided three step form that captures the job, urgency and a photo.',
    icon: Camera,
  },
  {
    key: 'whatsapp_bar',
    label: '1 Tap Sticky WhatsApp Mobile Bar',
    description: 'A floating bar that lets visitors call or message you in one tap.',
    icon: MessageSquare,
  },
  {
    key: 'voice_quote',
    label: 'AI Voice to Quote and Missed Call Engine',
    description: 'Catches missed calls and sends an instant text with pricing.',
    icon: Bot,
  },
  {
    key: 'ai_chatbot',
    label: '24/7 AI Chatbot Assistant',
    description: 'A floating chat bubble that answers common questions instantly.',
    icon: Bot,
  },
];

function FeatureCheckbox({
  feature,
  checked,
  onToggle,
  disabled,
}: {
  feature: FeatureConfig;
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  const Icon = feature.icon;
  return (
    <label
      className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-colors ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      } ${
        checked
          ? 'border-[#D90429] bg-red-50 dark:bg-red-950/30'
          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onToggle} disabled={disabled} className="sr-only" />
      <span
        className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
          checked ? 'bg-[#D90429] border-[#D90429]' : 'border-slate-300 dark:border-zinc-600'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 16 16" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8.5l3 3 7-7" />
          </svg>
        )}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-[#D90429] shrink-0" />
          <span className={`text-sm font-semibold ${checked ? 'text-red-900 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
            {feature.label}
          </span>
        </span>
        <span className="block text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">{feature.description}</span>
      </span>
    </label>
  );
}

function FeatureCard({
  feature,
  variant,
  children,
}: {
  feature: FeatureConfig;
  variant: 'mobile' | 'desktop';
  children: React.ReactNode;
}) {
  const Icon = feature.icon;
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm ${
        variant === 'desktop' ? 'p-5' : 'p-3.5'
      }`}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Icon className="w-3.5 h-3.5 text-[#D90429]" />
        <span className="text-[9px] uppercase tracking-widest font-mono font-semibold text-slate-500 dark:text-zinc-400">
          {feature.label}
        </span>
      </div>
      {children}
    </div>
  );
}

/* Decorative floating AI chat bubble, preview only, no network calls */
const CHATBOT_REPLIES: Record<string, string> = {
  'Get a price': "Happy to help. Tell me a bit about the job and I will point you to the right estimator on this page.",
  'Book a callout': "I can flag this for a callout. Tap the WhatsApp button below and mention what you need booking in.",
  'Opening hours': "This business is typically available 8am to 6pm, Monday to Saturday, with emergency cover on top.",
};

function PreviewChatBubble({ businessName }: { businessName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);
  const displayName = businessName.trim() || 'Your Business';

  const handleReply = (chip: string) => {
    setConversation((prev) => [...prev, CHATBOT_REPLIES[chip]]);
  };

  return (
    <div className="absolute bottom-3 right-3 z-20 pointer-events-auto">
      {isOpen && (
        <motion.div
          key="chat-panel"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="absolute bottom-14 right-0 w-64 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between gap-2 px-3.5 py-3 bg-slate-900 dark:bg-black text-white">
            <div className="flex items-center gap-2 min-w-0">
              <Bot className="w-4 h-4 text-[#D90429] shrink-0" />
              <span className="text-xs font-bold truncate">{displayName} Assistant</span>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 shrink-0">
              Preview Only
            </span>
          </div>
          <div className="p-3 space-y-2 max-h-48 overflow-y-auto hide-scrollbar">
            <div className="bg-slate-100 dark:bg-zinc-800 rounded-2xl rounded-bl-none p-2.5 text-[11px] text-slate-700 dark:text-zinc-300 leading-relaxed">
              Hi, I can help you book a job or get a quick price. What do you need today?
            </div>
            {conversation.map((line, i) => (
              <div
                key={i}
                className="bg-slate-100 dark:bg-zinc-800 rounded-2xl rounded-bl-none p-2.5 text-[11px] text-slate-700 dark:text-zinc-300 leading-relaxed"
              >
                {line}
              </div>
            ))}
          </div>
          <div className="p-3 pt-0 flex flex-wrap gap-1.5">
            {Object.keys(CHATBOT_REPLIES).map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleReply(chip)}
                className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="bg-[#191c1e] hover:bg-[#2a2f32] text-white w-11 h-11 rounded-full shadow-xl flex items-center justify-center border border-white/10"
        aria-label="Open assistant preview"
      >
        {isOpen ? <MessageSquare className="w-4 h-4 text-[#D90429]" /> : <Bot className="w-4 h-4 text-[#D90429]" />}
      </motion.button>
    </div>
  );
}

interface RenderCtx {
  businessName: string;
}

function renderFeature(key: FeatureKey, ctx: RenderCtx, viewport: 'mobile' | 'desktop', onSummaryChange: (s: string) => void) {
  switch (key) {
    case 'estimator':
      return <GenericEstimatorTool onSummaryChange={onSummaryChange} />;
    case 'triage':
      return <GenericTriageTool onSummaryChange={onSummaryChange} />;
    case 'voice_quote':
      return viewport === 'mobile' ? <ScaledVoiceToQuote /> : <VoiceToQuoteDemo />;
    case 'whatsapp_bar':
      return <WhatsAppBar tradeName={ctx.businessName || 'This Business'} compact />;
    case 'ai_chatbot':
      return null;
    default:
      return null;
  }
}

function SelectedFeaturesPanel({
  features,
  ctx,
  viewport,
  onSummaryChange,
}: {
  features: FeatureKey[];
  ctx: RenderCtx;
  viewport: 'mobile' | 'desktop';
  onSummaryChange: (key: FeatureKey, summary: string) => void;
}) {
  const bodyFeatures = features.filter((f) => f !== 'whatsapp_bar');
  const hasWhatsAppBar = features.includes('whatsapp_bar');

  if (features.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 px-4">
        <Sparkles className="w-6 h-6 text-slate-300 dark:text-zinc-700 mb-2" />
        <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">No tools selected yet</p>
        <p className="text-[11px] text-slate-400 dark:text-zinc-600 mt-1 max-w-[220px]">
          Tick up to 2 tools on the left to bring this preview to life.
        </p>
      </div>
    );
  }

  return (
    <div className={viewport === 'mobile' ? 'space-y-3' : ''}>
      <div className={viewport === 'mobile' ? 'space-y-3' : 'grid grid-cols-2 gap-5 p-6'}>
        {bodyFeatures.map((key, i) => {
          const feature = FEATURE_CONFIGS.find((f) => f.key === key)!;
          const isLastOdd = viewport === 'desktop' && bodyFeatures.length % 2 === 1 && i === bodyFeatures.length - 1;
          return (
            <div key={key} className={isLastOdd ? 'col-span-2' : ''}>
              <FeatureCard feature={feature} variant={viewport}>
                {key === 'ai_chatbot' ? (
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Shown as a floating bubble in the corner of this preview. Tap it to try a sample conversation.
                  </p>
                ) : (
                  renderFeature(key, ctx, viewport, (summary) => onSummaryChange(key, summary))
                )}
              </FeatureCard>
            </div>
          );
        })}
      </div>

      {hasWhatsAppBar && (
        <div className={viewport === 'mobile' ? 'sticky bottom-0 pt-3 pb-2 bg-gradient-to-t from-white dark:from-zinc-900 via-white/95 dark:via-zinc-900/95' : 'sticky bottom-0 px-6 pb-4 pt-3 bg-gradient-to-t from-white dark:from-zinc-900 via-white/95 dark:via-zinc-900/95'}>
          {renderFeature('whatsapp_bar', ctx, viewport, (summary) => onSummaryChange('whatsapp_bar', summary))}
        </div>
      )}
    </div>
  );
}

export const TradeSimulator: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [businessName, setBusinessName] = useState(searchParams.get('biz') || '');
  const [town, setTown] = useState(searchParams.get('town') || '');
  const [selectedFeatures, setSelectedFeatures] = useState<Set<FeatureKey>>(new Set(['estimator', 'whatsapp_bar']));
  const [viewport, setViewport] = useState<'mobile' | 'desktop'>('mobile');

  const canClaim = businessName.trim().length > 0;
  const featuresForRender = FEATURE_CONFIGS.filter((f) => selectedFeatures.has(f.key)).map((f) => f.key);

  const toggleFeature = (key: FeatureKey) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else if (next.size < 2) {
        next.add(key);
      }
      return next;
    });
  };

  const ctx: RenderCtx = { businessName: businessName.trim() };

  const handleClaim = () => {
    if (!canClaim) return;
    const featureLabels = FEATURE_CONFIGS.filter((f) => selectedFeatures.has(f.key)).map((f) => f.label);
    const lines = [
      `Hi Dean, I want to enquire about adding these tools to ${businessName.trim()}'s website.`,
      town.trim() ? `Serving ${town.trim()}.` : '',
      featureLabels.length ? `Tools: ${featureLabels.join(', ')}.` : '',
      'Could we discuss getting this set up?',
    ].filter(Boolean);
    const message = lines.join(' ');
    window.open(`https://wa.me/447348733365?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const chatBubble = selectedFeatures.has('ai_chatbot') ? <PreviewChatBubble businessName={ctx.businessName} /> : undefined;

  return (
    <div className="w-full max-w-6xl mx-auto text-slate-900 dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-10 items-start">
        {/* Left column: business inputs and checklist */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="For example, Wilshaw Plumbing and Heating"
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-2xl p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Town / Area</label>
              <input
                type="text"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="For example, Stoke on Trent"
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-2xl p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Tools and Features</label>
              <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-zinc-400">
                {selectedFeatures.size} of 2 selected
              </span>
            </div>
            <div className="space-y-2.5">
              {FEATURE_CONFIGS.map((feature) => (
                <FeatureCheckbox
                  key={feature.key}
                  feature={feature}
                  checked={selectedFeatures.has(feature.key)}
                  onToggle={() => toggleFeature(feature.key)}
                  disabled={!selectedFeatures.has(feature.key) && selectedFeatures.size >= 2}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: live preview and claim CTA */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <SegmentButton active={viewport === 'mobile'} onClick={() => setViewport('mobile')}>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> Mobile View
              </span>
            </SegmentButton>
            <SegmentButton active={viewport === 'desktop'} onClick={() => setViewport('desktop')}>
              <span className="flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5" /> Desktop Website View
              </span>
            </SegmentButton>
          </div>

          {viewport === 'mobile' ? (
            <PhoneFrame overlay={chatBubble}>
              <PhonePreviewHero businessName={businessName} town={town} />
              <SelectedFeaturesPanel
                features={featuresForRender}
                ctx={ctx}
                viewport="mobile"
                onSummaryChange={() => {}}
              />
            </PhoneFrame>
          ) : (
            <DesktopFrame businessName={businessName} overlay={chatBubble}>
              <DesktopPreviewHero businessName={businessName} town={town} />
              <SelectedFeaturesPanel
                features={featuresForRender}
                ctx={ctx}
                viewport="desktop"
                onSummaryChange={() => {}}
              />
            </DesktopFrame>
          )}

          <motion.button
            whileTap={canClaim ? { scale: 0.98 } : undefined}
            type="button"
            onClick={handleClaim}
            disabled={!canClaim}
            className={`w-full max-w-[300px] lg:max-w-none mx-auto font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm transition shadow-lg font-mono ${
              canClaim
                ? 'bg-[#25D366] hover:bg-[#20ba5a] text-black shadow-[#25D366]/20'
                : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 shadow-none cursor-not-allowed'
            }`}
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Inquire About Adding These Tools to Your Business on WhatsApp</span>
          </motion.button>
          {!canClaim && (
            <p className="text-[11px] text-center text-slate-500 dark:text-zinc-500 -mt-2">
              Enter your business name above to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
