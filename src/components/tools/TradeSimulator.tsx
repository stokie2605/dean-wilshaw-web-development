import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplets,
  Flame,
  Zap,
  Home,
  HardHat,
  Hammer,
  Paintbrush,
  Trees,
  Lock,
  Sparkles,
  MessageSquare,
  Camera,
  Plus,
  Minus,
  Bot,
  Smartphone,
  Monitor,
  Loader2,
} from 'lucide-react';
import { PhoneFrame, PhonePreviewHero, DesktopFrame, DesktopPreviewHero, type IconType } from './frames';
import { VoiceToQuoteDemo } from './VoiceToQuoteDemo';
import { WhatsAppBar } from '../trade-tools/WhatsAppBar';

interface ToolProps {
  onSummaryChange: (summary: string) => void;
}

type TradeCategory = 'heating_plumbing' | 'electrical' | 'joinery' | 'painting' | 'landscaping' | 'triage';

interface TradeConfig {
  key: string;
  label: string;
  icon: IconType;
  category: TradeCategory;
  toolTagline: string;
  triageOptions: string[];
  allowFreeText?: boolean;
}

const TRADE_CONFIGS: TradeConfig[] = [
  {
    key: 'plumbing_drainage',
    label: 'Plumbers & Emergency Drainage',
    icon: Droplets,
    category: 'heating_plumbing',
    toolTagline: 'Emergency Fault Triage & Price Guide',
    triageOptions: ['Burst Pipe / Leak', 'No Heating / Hot Water', 'Blocked Drain', 'Boiler Breakdown'],
  },
  {
    key: 'gas_heating',
    label: 'Gas & Heating Engineers',
    icon: Flame,
    category: 'heating_plumbing',
    toolTagline: 'Emergency Fault Triage & Price Guide',
    triageOptions: ['No Heating / Hot Water', 'Boiler Fault Code', 'Annual Service Due', 'New Boiler Quote'],
  },
  {
    key: 'electrical',
    label: 'Electricians, EV Specialists & Solar',
    icon: Zap,
    category: 'electrical',
    toolTagline: 'EV Charger & Consumer Unit Selector',
    triageOptions: ['No Power / Trip', 'EV Charger Enquiry', 'Rewire / Consumer Unit', 'Safety Certificate'],
  },
  {
    key: 'roofing',
    label: 'Roofers, Fascias & Guttering',
    icon: Home,
    category: 'triage',
    toolTagline: 'Quick Roofing Job Triage',
    triageOptions: ['Leak / Storm Damage', 'New Roof / Re Roof', 'Guttering / Fascias', 'Roof Inspection'],
  },
  {
    key: 'building',
    label: 'Builders & Groundworkers',
    icon: HardHat,
    category: 'triage',
    toolTagline: 'Quick Build & Groundworks Triage',
    triageOptions: ['Extension / New Build', 'Renovation', 'Groundworks / Drainage', 'Structural Work'],
  },
  {
    key: 'joinery',
    label: 'Joiners, Carpenters & Kitchen Fitters',
    icon: Hammer,
    category: 'joinery',
    toolTagline: 'Room Dimension & Fitting Estimator',
    triageOptions: ['Kitchen Fit', 'Bespoke Furniture', 'Doors & Skirting', 'Staircase Work'],
  },
  {
    key: 'decorating',
    label: 'Painters & Decorators',
    icon: Paintbrush,
    category: 'painting',
    toolTagline: 'Room Count & Scope Selector',
    triageOptions: ['Interior Repaint', 'Exterior Repaint', 'Wallpaper', 'Commercial Job'],
  },
  {
    key: 'landscaping',
    label: 'Landscapers, Paving & Tree Surgeons',
    icon: Trees,
    category: 'landscaping',
    toolTagline: 'Paving & Turf Area Estimator',
    triageOptions: ['New Patio / Paving', 'Turf / Lawn', 'Fencing', 'Tree Work'],
  },
  {
    key: 'locksmith',
    label: 'Locksmiths & Security',
    icon: Lock,
    category: 'triage',
    toolTagline: 'Quick Security Job Triage',
    triageOptions: ['Lockout Emergency', 'Lock Upgrade / UPVC', 'Alarm / CCTV Install', 'Key Cutting'],
  },
  {
    key: 'custom',
    label: 'Custom / Other Trade',
    icon: Sparkles,
    category: 'triage',
    toolTagline: 'Universal Voice & Photo Job Triage',
    triageOptions: [],
    allowFreeText: true,
  },
];

function chipClass(active: boolean): string {
  return `w-full text-left px-3 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
    active
      ? 'border-[#D90429] bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-400 font-semibold'
      : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
  }`;
}

function SegmentButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={onClick}
      className={`py-2.5 px-2 rounded-xl text-[11px] font-bold font-mono text-center transition-all ${
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
    <div className="relative rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-3.5 text-center overflow-hidden shadow-inner">
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
      <p className="text-[9px] text-slate-500 dark:text-zinc-500">{caption}</p>
    </div>
  );
}

function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1.5 font-medium">
        <span>{label}</span>
        <span className="text-slate-900 dark:text-white font-bold">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#D90429] cursor-pointer"
      />
    </div>
  );
}

const FAULT_OPTIONS: { id: string; label: string; emergency: [number, number]; standard: [number, number] }[] = [
  { id: 'no-heat', label: 'No Heating / Hot Water', emergency: [120, 180], standard: [80, 120] },
  { id: 'leak', label: 'Leak / Burst Pipe', emergency: [140, 220], standard: [90, 140] },
  { id: 'boiler-fault', label: 'Boiler Fault Code', emergency: [110, 160], standard: [75, 110] },
  { id: 'blocked-drain', label: 'Blocked Drain', emergency: [90, 150], standard: [60, 90] },
  { id: 'service', label: 'Annual Service / MOT', emergency: [75, 95], standard: [65, 85] },
];

function HeatingPlumbingTool({ onSummaryChange }: ToolProps) {
  const [faultId, setFaultId] = useState(FAULT_OPTIONS[0].id);
  const [emergency, setEmergency] = useState(true);

  const fault = FAULT_OPTIONS.find((f) => f.id === faultId) ?? FAULT_OPTIONS[0];
  const [low, high] = emergency ? fault.emergency : fault.standard;

  useEffect(() => {
    onSummaryChange(`${fault.label}, ${emergency ? 'Emergency Same Day' : 'Standard Booked'}, ballpark £${low} to £${high}`);
  }, [fault.label, emergency, low, high, onSummaryChange]);

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300">What is the fault?</p>
      <div className="space-y-2">
        {FAULT_OPTIONS.map((f) => (
          <button key={f.id} type="button" onClick={() => setFaultId(f.id)} className={chipClass(faultId === f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <SegmentButton active={emergency} onClick={() => setEmergency(true)}>
          Emergency Same Day
        </SegmentButton>
        <SegmentButton active={!emergency} onClick={() => setEmergency(false)}>
          Standard Booked
        </SegmentButton>
      </div>

      <PriceReadout value={`£${low} to £${high}`} caption="Includes parts and certified labour" />
    </div>
  );
}

const ELECTRICAL_OPTIONS: { id: string; label: string; price: string; note: string }[] = [
  { id: 'ev', label: 'EV Charger Install', price: '£750 to £950', note: 'Includes OZEV grant guidance' },
  { id: 'cu', label: 'Consumer Unit / Fuse Box Upgrade', price: '£350 to £450', note: 'Full board replacement' },
  { id: 'rewire', label: 'Full House Rewire', price: '£3,500 to £6,000', note: '3 to 4 bed property guide price' },
  { id: 'eicr', label: 'EICR / Safety Check', price: '£120 to £180', note: 'Landlord and homebuyer reports' },
  { id: 'solar', label: 'Solar PV Consultation', price: 'Free Survey', note: 'Custom quote after site visit' },
];

function ElectricalTool({ onSummaryChange }: ToolProps) {
  const [serviceId, setServiceId] = useState(ELECTRICAL_OPTIONS[0].id);
  const service = ELECTRICAL_OPTIONS.find((s) => s.id === serviceId) ?? ELECTRICAL_OPTIONS[0];

  useEffect(() => {
    onSummaryChange(`${service.label}, ballpark ${service.price}`);
  }, [service.label, service.price, onSummaryChange]);

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Select a service</p>
      <div className="space-y-2">
        {ELECTRICAL_OPTIONS.map((s) => (
          <button key={s.id} type="button" onClick={() => setServiceId(s.id)} className={chipClass(serviceId === s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <PriceReadout value={service.price} caption={service.note} />
    </div>
  );
}

const FIT_TIERS: { id: string; label: string; rate: number }[] = [
  { id: 'flatpack', label: 'Flat Pack Fit', rate: 45 },
  { id: 'bespoke', label: 'Bespoke Fitted', rate: 120 },
  { id: 'full', label: 'Full Strip and Refit', rate: 220 },
];

function JoineryTool({ onSummaryChange }: ToolProps) {
  const [length, setLength] = useState(3);
  const [width, setWidth] = useState(3);
  const [tierId, setTierId] = useState(FIT_TIERS[1].id);

  const tier = FIT_TIERS.find((t) => t.id === tierId) ?? FIT_TIERS[1];
  const sqm = length * width;
  const low = Math.round(sqm * tier.rate);
  const high = Math.round(sqm * tier.rate * 1.2);

  useEffect(() => {
    onSummaryChange(`${tier.label}, ${sqm}m² room, ballpark £${low} to £${high}`);
  }, [tier.label, sqm, low, high, onSummaryChange]);

  return (
    <div className="space-y-3">
      <SliderRow label="Room Length" value={length} onChange={setLength} min={2} max={8} unit="m" />
      <SliderRow label="Room Width" value={width} onChange={setWidth} min={2} max={6} unit="m" />
      <div>
        <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300 mb-2">Fitting Tier</p>
        <div className="grid grid-cols-3 gap-2">
          {FIT_TIERS.map((t) => (
            <SegmentButton key={t.id} active={tierId === t.id} onClick={() => setTierId(t.id)}>
              {t.label}
            </SegmentButton>
          ))}
        </div>
      </div>
      <PriceReadout value={`£${low.toLocaleString()} to £${high.toLocaleString()}`} caption={`${sqm}m² total coverage`} />
    </div>
  );
}

const EXTERIOR_TIERS: { id: string; label: string; low: number; high: number }[] = [
  { id: 'terrace', label: 'Terrace / Small', low: 450, high: 650 },
  { id: 'semi', label: 'Semi Detached', low: 650, high: 950 },
  { id: 'detached', label: 'Detached / Large', low: 950, high: 1500 },
];

function PainterDecoratorTool({ onSummaryChange }: ToolProps) {
  const [scope, setScope] = useState<'interior' | 'exterior'>('interior');
  const [rooms, setRooms] = useState(2);
  const [tierId, setTierId] = useState(EXTERIOR_TIERS[0].id);

  const tier = EXTERIOR_TIERS.find((t) => t.id === tierId) ?? EXTERIOR_TIERS[0];
  const low = scope === 'interior' ? rooms * 120 : tier.low;
  const high = scope === 'interior' ? rooms * 180 : tier.high;

  useEffect(() => {
    const desc = scope === 'interior' ? `${rooms} room${rooms === 1 ? '' : 's'} interior` : `${tier.label} exterior`;
    onSummaryChange(`${desc}, ballpark £${low} to £${high}`);
  }, [scope, rooms, tier.label, low, high, onSummaryChange]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <SegmentButton active={scope === 'interior'} onClick={() => setScope('interior')}>
          Interior
        </SegmentButton>
        <SegmentButton active={scope === 'exterior'} onClick={() => setScope('exterior')}>
          Exterior
        </SegmentButton>
      </div>

      {scope === 'interior' ? (
        <div>
          <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300 mb-2">How many rooms?</p>
          <div className="flex items-center justify-center gap-5 py-1">
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={() => setRooms((r) => Math.max(1, r - 1))}
              className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-[#D90429] transition-colors"
              aria-label="Fewer rooms"
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <span className="font-mono text-xl font-black w-8 text-center">{rooms}</span>
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={() => setRooms((r) => Math.min(8, r + 1))}
              className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-[#D90429] transition-colors"
              aria-label="More rooms"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {EXTERIOR_TIERS.map((t) => (
            <button key={t.id} type="button" onClick={() => setTierId(t.id)} className={chipClass(tierId === t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      <PriceReadout
        value={`£${low.toLocaleString()} to £${high.toLocaleString()}`}
        caption={scope === 'interior' ? 'Two coats, standard preparation' : 'Full exterior repaint'}
      />
    </div>
  );
}

const LANDSCAPE_MATERIALS: { id: string; label: string; rate: number }[] = [
  { id: 'turf', label: 'Turf Lawn', rate: 25 },
  { id: 'paving', label: 'Block Paving', rate: 70 },
  { id: 'resin', label: 'Resin Bound', rate: 90 },
  { id: 'decking', label: 'Decking', rate: 110 },
];

function LandscaperTool({ onSummaryChange }: ToolProps) {
  const [length, setLength] = useState(6);
  const [width, setWidth] = useState(4);
  const [materialId, setMaterialId] = useState(LANDSCAPE_MATERIALS[1].id);

  const material = LANDSCAPE_MATERIALS.find((m) => m.id === materialId) ?? LANDSCAPE_MATERIALS[1];
  const sqm = length * width;
  const low = Math.round(sqm * material.rate);
  const high = Math.round(sqm * material.rate * 1.15);

  useEffect(() => {
    onSummaryChange(`${material.label}, ${sqm}m², ballpark £${low} to £${high}`);
  }, [material.label, sqm, low, high, onSummaryChange]);

  return (
    <div className="space-y-3">
      <SliderRow label="Length" value={length} onChange={setLength} min={2} max={20} unit="m" />
      <SliderRow label="Width" value={width} onChange={setWidth} min={2} max={15} unit="m" />
      <div>
        <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300 mb-2">Material</p>
        <div className="grid grid-cols-2 gap-2">
          {LANDSCAPE_MATERIALS.map((m) => (
            <SegmentButton key={m.id} active={materialId === m.id} onClick={() => setMaterialId(m.id)}>
              {m.label}
            </SegmentButton>
          ))}
        </div>
      </div>
      <PriceReadout value={`£${low.toLocaleString()} to £${high.toLocaleString()}`} caption={`${sqm}m² total area`} />
    </div>
  );
}

const URGENCY_OPTIONS = ['Emergency', 'This Week', 'Flexible'] as const;

interface GenericTriageToolProps extends ToolProps {
  jobOptions: string[];
  allowFreeText?: boolean;
  variant?: 'estimator' | 'intake';
}

function GenericTriageTool({ jobOptions, allowFreeText, onSummaryChange, variant = 'intake' }: GenericTriageToolProps) {
  const [step, setStep] = useState(1);
  const [jobType, setJobType] = useState('');
  const [customJob, setCustomJob] = useState('');
  const [urgency, setUrgency] = useState<(typeof URGENCY_OPTIONS)[number]>('This Week');
  const [mediaAdded, setMediaAdded] = useState(false);

  const resolvedJob = (allowFreeText ? customJob : jobType).trim();
  const heading = variant === 'estimator' ? 'Quick Price Triage' : '24/7 Emergency Intake';

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
          {heading}
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
            {allowFreeText ? (
              <textarea
                rows={3}
                value={customJob}
                onChange={(e) => setCustomJob(e.target.value)}
                placeholder="Briefly describe the job, for example a fence panel came down in the storm"
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500 resize-none"
              />
            ) : (
              <div className="space-y-2">
                {jobOptions.map((opt) => (
                  <button key={opt} type="button" onClick={() => setJobType(opt)} className={chipClass(jobType === opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
            <motion.button
              whileTap={resolvedJob ? { scale: 0.98 } : undefined}
              type="button"
              disabled={!resolvedJob}
              onClick={() => setStep(2)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#D90429] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
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
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300"
              >
                Back
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#D90429] text-white"
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
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold border transition-colors ${
                mediaAdded
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                  : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <Camera className="w-4 h-4" />
              {mediaAdded ? 'Photo and voice note attached' : 'Simulate photo and voice note'}
            </motion.button>

            <div className="rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-3">
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
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300"
            >
              Start Over
            </motion.button>
          </motion.div>
        )}
      </>
    </div>
  );
}

function resolveEstimator(trade: TradeConfig, onSummaryChange: (summary: string) => void) {
  switch (trade.category) {
    case 'heating_plumbing':
      return <HeatingPlumbingTool onSummaryChange={onSummaryChange} />;
    case 'electrical':
      return <ElectricalTool onSummaryChange={onSummaryChange} />;
    case 'joinery':
      return <JoineryTool onSummaryChange={onSummaryChange} />;
    case 'painting':
      return <PainterDecoratorTool onSummaryChange={onSummaryChange} />;
    case 'landscaping':
      return <LandscaperTool onSummaryChange={onSummaryChange} />;
    case 'triage':
      return (
        <GenericTriageTool
          jobOptions={trade.triageOptions}
          allowFreeText={trade.allowFreeText}
          onSummaryChange={onSummaryChange}
          variant="estimator"
        />
      );
    default:
      return null;
  }
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
            <div className="bg-slate-100 dark:bg-zinc-800 rounded-xl rounded-bl-none p-2.5 text-[11px] text-slate-700 dark:text-zinc-300 leading-relaxed">
              Hi, I can help you book a job or get a quick price. What do you need today?
            </div>
            {conversation.map((line, i) => (
              <div
                key={i}
                className="bg-slate-100 dark:bg-zinc-800 rounded-xl rounded-bl-none p-2.5 text-[11px] text-slate-700 dark:text-zinc-300 leading-relaxed"
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

/* Voice-to-quote wrapped in a scale container so its wide layout fits the phone column */
function ScaledVoiceToQuote() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 300 }}>
      <div className="absolute top-0 left-0 w-[420px] origin-top-left" style={{ transform: 'scale(0.6)' }}>
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
  icon: IconType;
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
}: {
  feature: FeatureConfig;
  checked: boolean;
  onToggle: () => void;
}) {
  const Icon = feature.icon;
  return (
    <label
      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-colors ${
        checked
          ? 'border-[#D90429] bg-red-50 dark:bg-red-950/30'
          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onToggle} className="sr-only" />
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

interface RenderCtx {
  trade: TradeConfig;
  resolvedTradeLabel: string;
  businessName: string;
}

function renderFeature(key: FeatureKey, ctx: RenderCtx, viewport: 'mobile' | 'desktop', onSummaryChange: (s: string) => void) {
  switch (key) {
    case 'estimator':
      return resolveEstimator(ctx.trade, onSummaryChange);
    case 'triage':
      return (
        <GenericTriageTool
          jobOptions={ctx.trade.triageOptions}
          allowFreeText={ctx.trade.allowFreeText}
          onSummaryChange={onSummaryChange}
          variant="intake"
        />
      );
    case 'voice_quote':
      return viewport === 'mobile' ? <ScaledVoiceToQuote /> : <VoiceToQuoteDemo />;
    case 'whatsapp_bar':
      return <WhatsAppBar tradeName={ctx.businessName.trim() || ctx.resolvedTradeLabel} />;
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
          Tick at least one tool on the left to bring this preview to life.
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
        <div className={viewport === 'mobile' ? 'sticky bottom-0 pt-2 pb-1 bg-gradient-to-t from-white dark:from-zinc-900 via-white/95 dark:via-zinc-900/95' : 'sticky bottom-0 px-6 pb-4 pt-2 bg-gradient-to-t from-white dark:from-zinc-900 via-white/95 dark:via-zinc-900/95'}>
          {renderFeature('whatsapp_bar', ctx, viewport, (summary) => onSummaryChange('whatsapp_bar', summary))}
        </div>
      )}
    </div>
  );
}

function CompilingState() {
  const lines = ['Compiling layout...', 'Wiring up your tools...', 'Publishing preview...'];
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, lines.length - 1));
    }, 330);
    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Loader2 className="w-8 h-8 text-[#D90429] animate-spin mb-4" />
      </motion.div>
      <motion.p
        key={lineIndex}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-xs font-mono font-semibold text-slate-500 dark:text-zinc-400"
      >
        {lines[lineIndex]}
      </motion.p>
    </div>
  );
}

interface GeneratedSnapshot {
  businessName: string;
  town: string;
  tradeKey: string;
  customTradeLabel: string;
  features: FeatureKey[];
}

function snapshotKey(s: GeneratedSnapshot): string {
  return JSON.stringify(s);
}

export const TradeSimulator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tradeParam = searchParams.get('trade') || '';
  const matchedInitialTrade = TRADE_CONFIGS.find((t) => t.key === tradeParam);

  const [businessName, setBusinessName] = useState(searchParams.get('biz') || '');
  const [town, setTown] = useState(searchParams.get('town') || '');
  const [tradeKey, setTradeKey] = useState(matchedInitialTrade?.key ?? TRADE_CONFIGS[0].key);
  const [customTradeLabel, setCustomTradeLabel] = useState(!matchedInitialTrade && tradeParam ? tradeParam : '');
  const [selectedFeatures, setSelectedFeatures] = useState<Set<FeatureKey>>(new Set(['estimator', 'whatsapp_bar']));
  const [viewport, setViewport] = useState<'mobile' | 'desktop'>('mobile');

  const [generationStatus, setGenerationStatus] = useState<'idle' | 'compiling' | 'ready'>('idle');
  const [lastGenerated, setLastGenerated] = useState<GeneratedSnapshot | null>(null);
  const compileTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (compileTimer.current) clearTimeout(compileTimer.current);
    };
  }, []);

  const activeTrade = TRADE_CONFIGS.find((t) => t.key === tradeKey) ?? TRADE_CONFIGS[0];
  const isCustom = activeTrade.key === 'custom';
  const resolvedTradeLabel = isCustom && customTradeLabel.trim() ? customTradeLabel.trim() : activeTrade.label;
  const canGenerate = businessName.trim().length > 0;

  const currentDraft: GeneratedSnapshot = {
    businessName: businessName.trim(),
    town: town.trim(),
    tradeKey,
    customTradeLabel: customTradeLabel.trim(),
    features: [...selectedFeatures].sort(),
  };
  const hasPendingChanges = lastGenerated !== null && snapshotKey(currentDraft) !== snapshotKey({ ...lastGenerated, features: [...lastGenerated.features].sort() });

  const toggleFeature = (key: FeatureKey) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleGenerate = () => {
    if (!canGenerate) return;
    setGenerationStatus('compiling');
    if (compileTimer.current) clearTimeout(compileTimer.current);
    compileTimer.current = setTimeout(() => {
      setLastGenerated({
        businessName: businessName.trim(),
        town: town.trim(),
        tradeKey,
        customTradeLabel: customTradeLabel.trim(),
        features: [...selectedFeatures].sort(),
      });
      setGenerationStatus('ready');
    }, 1000);
  };

  const generatedTrade = lastGenerated ? TRADE_CONFIGS.find((t) => t.key === lastGenerated.tradeKey) ?? TRADE_CONFIGS[0] : activeTrade;
  const generatedTradeLabel =
    lastGenerated && generatedTrade.key === 'custom' && lastGenerated.customTradeLabel
      ? lastGenerated.customTradeLabel
      : generatedTrade.label;

  const canClaim = generationStatus === 'ready' && lastGenerated !== null;

  const handleClaim = () => {
    if (!canClaim || !lastGenerated) return;
    const featureLabels = FEATURE_CONFIGS.filter((f) => lastGenerated.features.includes(f.key)).map((f) => f.label);
    const lines = [
      `Hi Dean, I want to claim this exact website and setup for ${lastGenerated.businessName}.`,
      `Trade: ${generatedTradeLabel}.`,
      lastGenerated.town ? `Serving ${lastGenerated.town}.` : '',
      featureLabels.length ? `Tools selected: ${featureLabels.join(', ')}.` : '',
      "I'm ready to go, let's get it set up.",
    ].filter(Boolean);
    const message = lines.join(' ');
    window.open(`https://wa.me/447348733365?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const ctx: RenderCtx = {
    trade: generatedTrade,
    resolvedTradeLabel: generatedTradeLabel,
    businessName: lastGenerated?.businessName ?? '',
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-slate-900 dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-10 items-start">
        {/* Left column: inputs, trade, checklist, generate */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="For example, Wilshaw Plumbing and Heating"
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Town / Area</label>
              <input
                type="text"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="For example, Stoke on Trent"
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Trade Category</label>
            <div className="grid grid-cols-2 gap-2">
              {TRADE_CONFIGS.map((t) => {
                const Icon = t.icon;
                const active = t.key === tradeKey;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTradeKey(t.key)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left text-[11px] font-semibold transition-colors ${
                      active
                        ? 'border-[#D90429] bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-400'
                        : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="leading-tight">{t.label}</span>
                  </button>
                );
              })}
            </div>

            {isCustom && (
              <input
                type="text"
                value={customTradeLabel}
                onChange={(e) => setCustomTradeLabel(e.target.value)}
                placeholder="Tell us your trade, for example pest control or window cleaning"
                className="mt-2 w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Tools and Features</label>
            <div className="space-y-2.5">
              {FEATURE_CONFIGS.map((feature) => (
                <FeatureCheckbox
                  key={feature.key}
                  feature={feature}
                  checked={selectedFeatures.has(feature.key)}
                  onToggle={() => toggleFeature(feature.key)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <motion.button
              whileTap={canGenerate ? { scale: 0.98 } : undefined}
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate || generationStatus === 'compiling'}
              className={`w-full font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition shadow-lg ${
                canGenerate
                  ? 'bg-[#D90429] hover:bg-[#b80322] text-white shadow-red-600/20'
                  : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 shadow-none cursor-not-allowed'
              }`}
            >
              {generationStatus === 'compiling' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{generationStatus === 'ready' ? 'Regenerate My Website' : 'Generate My Website'}</span>
                </>
              )}
            </motion.button>
            {!canGenerate && (
              <p className="text-[11px] text-center text-slate-500 dark:text-zinc-500">
                Enter your business name above to generate your website
              </p>
            )}
          </div>
        </div>

        {/* Right column: viewport toggle, preview, claim CTA */}
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

          {hasPendingChanges && generationStatus === 'ready' && (
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-400">
                Changes pending, regenerate to update the preview
              </span>
            </div>
          )}

          {viewport === 'mobile' ? (
            <PhoneFrame
              overlay={
                generationStatus === 'ready' && lastGenerated?.features.includes('ai_chatbot') ? (
                  <PreviewChatBubble businessName={ctx.businessName} />
                ) : undefined
              }
            >
              {generationStatus === 'idle' && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-6">
                  <Sparkles className="w-6 h-6 text-slate-300 dark:text-zinc-700 mb-2" />
                  <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Your preview will appear here</p>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-600 mt-1">Fill in the details and generate your website.</p>
                </div>
              )}
              {generationStatus === 'compiling' && <CompilingState />}
              {generationStatus === 'ready' && lastGenerated && (
                <motion.div key={snapshotKey(lastGenerated)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="relative">
                  <PhonePreviewHero businessName={lastGenerated.businessName} town={lastGenerated.town} tradeLabel={generatedTradeLabel} TradeIcon={generatedTrade.icon} />
                  <SelectedFeaturesPanel
                    features={lastGenerated.features}
                    ctx={ctx}
                    viewport="mobile"
                    onSummaryChange={() => {}}
                  />
                </motion.div>
              )}
            </PhoneFrame>
          ) : (
            <DesktopFrame
              businessName={lastGenerated?.businessName ?? businessName}
              overlay={
                generationStatus === 'ready' && lastGenerated?.features.includes('ai_chatbot') ? (
                  <PreviewChatBubble businessName={ctx.businessName} />
                ) : undefined
              }
            >
              {generationStatus === 'idle' && (
                <div className="flex flex-col items-center justify-center text-center py-24 px-6">
                  <Sparkles className="w-8 h-8 text-slate-300 dark:text-zinc-700 mb-3" />
                  <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Your preview will appear here</p>
                  <p className="text-xs text-slate-400 dark:text-zinc-600 mt-1">Fill in the details and generate your website.</p>
                </div>
              )}
              {generationStatus === 'compiling' && <CompilingState />}
              {generationStatus === 'ready' && lastGenerated && (
                <motion.div key={snapshotKey(lastGenerated)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="relative">
                  <DesktopPreviewHero businessName={lastGenerated.businessName} town={lastGenerated.town} tradeLabel={generatedTradeLabel} TradeIcon={generatedTrade.icon} />
                  <SelectedFeaturesPanel
                    features={lastGenerated.features}
                    ctx={ctx}
                    viewport="desktop"
                    onSummaryChange={() => {}}
                  />
                </motion.div>
              )}
            </DesktopFrame>
          )}

          <motion.button
            whileTap={canClaim ? { scale: 0.98 } : undefined}
            type="button"
            onClick={handleClaim}
            disabled={!canClaim}
            className={`w-full max-w-[300px] lg:max-w-none mx-auto font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition shadow-lg font-mono ${
              canClaim
                ? 'bg-[#25D366] hover:bg-[#20ba5a] text-black shadow-[#25D366]/20'
                : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 shadow-none cursor-not-allowed'
            }`}
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Claim This Exact Website and Setup on WhatsApp</span>
          </motion.button>
          {!canClaim && (
            <p className="text-[11px] text-center text-slate-500 dark:text-zinc-500 -mt-2">
              {canGenerate ? 'Generate your website above first' : 'Enter your business name above to continue'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
