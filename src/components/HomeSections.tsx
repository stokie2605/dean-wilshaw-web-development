import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, Check, MessageSquare } from 'lucide-react';

const SECTION_CLASS =
  'px-4 sm:px-6 lg:px-8 py-14 sm:py-20 bg-slate-50 dark:bg-[#040507] border-b border-slate-200 dark:border-white/[0.08]';

const HEADING_CLASS =
  'text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white';

/* ------------------------------------------------------------------ */
/* What you get: hairline divider rows                                 */
/* ------------------------------------------------------------------ */

const DELIVERABLES = [
  { title: 'Top of Google Maps', text: 'I optimize your profile so you show up first when local customers search for your trade.' },
  { title: 'Mobile Speed Boost', text: 'I fix slow websites to ensure they load instantly on mobile phones and stop you losing impatient customers.' },
  { title: 'Instant Lead Alerts', text: 'I connect your site directly to your phone so you get a text the second a customer requests a quote.' },
  { title: 'Accessible Design', text: 'I ensure your site is legally compliant and completely easy to use for all visitors.' },
  { title: 'Website Care (Optional)', text: 'I offer an optional monthly plan to handle your hosting and security updates so you can run your business.' },
];

export const DeliverablesSection: React.FC = () => (
  <section aria-labelledby="deliverables-heading" className={SECTION_CLASS}>
    <div className="max-w-5xl mx-auto">
      <h2 id="deliverables-heading" className="sr-only">What you get</h2>
      <ul className="border-t border-slate-300 dark:border-white/[0.14]">
        {DELIVERABLES.map((item) => (
          <li
            key={item.title}
            className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-8 py-6 sm:py-8 border-b border-slate-300 dark:border-white/[0.14]"
          >
            <h3 className="md:col-span-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {item.title}
            </h3>
            <p className="md:col-span-7 text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed md:pt-1.5">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Demos: one stage with a segmented switcher                          */
/* ------------------------------------------------------------------ */

type DemoEntry = {
  id: string;
  tab: string;
  name: string;
  text: string;
  url: string;
  kind: 'client' | 'concept';
  /* Who the site is for, in one line */
  builtFor: string;
  /* Three things it does for the business */
  features: [string, string, string];
  /* Phone screenshot (378 x 780 webp) shown on mobile before the live site loads */
  preview?: string;
  /* False when the site blocks being shown in a frame: desktop shows the preview image instead */
  embed?: boolean;
  /* Desktop screenshot (1280 x 768 webp) used instead of the frame when embed is false */
  desktopPreview?: string;
};

const DEMOS: DemoEntry[] = [
  {
    id: 'norden',
    builtFor: 'For a family flooring business that wants more home measure bookings.',
    features: ['Free quote form that comes straight to the phone', 'WhatsApp and call buttons always on screen', 'Real reviews and a gallery of 42 job photos'],
    tab: 'Norden',
    name: 'Norden Carpets & Flooring',
    text: 'Carpets and flooring business in Rochdale. A live client website.',
    url: 'https://nordencarpets.co.uk/',
    kind: 'client',
    preview: '/demos/norden.webp',
    embed: false,
    desktopPreview: '/demos/norden-desktop.webp',
  },

];

type Demo = DemoEntry;

// Lets the demo's own call, WhatsApp and booking links work inside the frame
const DEMO_SANDBOX =
  'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation';

const MOBILE_QUERY = '(max-width: 767px)';
// Phones and tablets: no hover and a finger as the main pointer
const TOUCH_QUERY = '(hover: none) and (pointer: coarse)';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/* Fills the frame in the page background colour until the demo has loaded */
const DemoLoading: React.FC<{ name: string; visible: boolean }> = ({ name, visible }) => (
  <div
    aria-hidden="true"
    className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center bg-slate-50 dark:bg-[#040507] transition-opacity duration-300 ${
      visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
    <p className="text-lg font-bold text-slate-900 dark:text-white">{name}</p>
    <p className="text-base text-slate-600 dark:text-zinc-400">Loading</p>
  </div>
);

const TapToTry: React.FC<{ label?: string }> = ({ label = 'Tap to try it' }) => (
  <span className="absolute inset-x-0 bottom-0 flex justify-center pb-5 pt-16 bg-gradient-to-t from-black/70 to-transparent">
    <span className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl bg-white text-slate-900 font-bold text-base shadow-md">
      {label}
    </span>
  </span>
);

/* Desktop and tablets: the live demo loads in the stage once its tab is selected.
   On touch screens it stays inert under a Tap to try it layer so it cannot trap page scrolling. */
const FramedDemo: React.FC<{ demo: Demo; isTouch: boolean }> = ({ demo, isTouch }) => {
  const [loaded, setLoaded] = useState(false);
  const [activated, setActivated] = useState(false);
  const interactive = !isTouch || activated;

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-slate-300 dark:border-white/[0.14] bg-slate-50 dark:bg-[#040507]">
      <iframe
        src={demo.url}
        title={`${demo.name} website`}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox={DEMO_SANDBOX}
        onLoad={() => setLoaded(true)}
        tabIndex={interactive ? undefined : -1}
        className={`w-full h-full border-0 ${interactive ? '' : 'pointer-events-none'}`}
      />
      <DemoLoading name={demo.name} visible={!loaded} />
      {!interactive && (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label={`Try the ${demo.name} website`}
          className="absolute inset-0 z-20 w-full h-full"
        >
          <TapToTry />
        </button>
      )}
    </div>
  );
};

/* Desktop: for sites that cannot be framed, show the phone screenshot and link to the live site */
const StaticPreview: React.FC<{ demo: Demo }> = ({ demo }) => (
  <a
    href={demo.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Open the ${demo.name} website in a new tab`}
    className="group relative block w-full h-[600px] rounded-xl overflow-hidden border border-slate-300 dark:border-white/[0.14] bg-white"
  >
    <img
      src={demo.desktopPreview ?? demo.preview}
      alt={`${demo.name} homepage`}
      width={1280}
      height={768}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.01]"
    />
    <span className="absolute inset-x-0 bottom-0 flex justify-center pb-5 pt-16 bg-gradient-to-t from-black/50 to-transparent">
      <span className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl bg-white text-slate-900 font-bold text-base shadow-md">
        Visit the live site
      </span>
    </span>
  </a>
);

/* Mobile: full screen live demo, only mounted after a tap */
const MobileDemoViewer: React.FC<{ demo: Demo; onClose: () => void }> = ({ demo, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${demo.name} website`}
      className="fixed inset-0 z-[60] flex flex-col bg-slate-50 dark:bg-[#040507] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-between gap-2 px-3 py-1 border-b border-slate-200 dark:border-white/[0.1]">
        <p className="min-w-0 truncate text-base font-bold text-slate-900 dark:text-white">{demo.name}</p>
        <div className="flex items-center gap-1 shrink-0">
          <a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[48px] px-3 text-base font-semibold text-slate-700 dark:text-zinc-300 underline"
          >
            New tab
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close the website"
            className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] rounded-xl text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="relative flex-1">
        <iframe
          src={demo.url}
          title={`${demo.name} website`}
          referrerPolicy="no-referrer"
          sandbox={DEMO_SANDBOX}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full border-0"
        />
        <DemoLoading name={demo.name} visible={!loaded} />
      </div>
    </div>
  );
};

export const DemosSection: React.FC = () => {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isTouch = useMediaQuery(TOUCH_QUERY);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const previewRef = useRef<HTMLButtonElement>(null);
  const active = DEMOS[activeIndex];

  const closeViewer = useCallback(() => {
    setViewerOpen(false);
    previewRef.current?.focus();
  }, []);

  const selectTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = DEMOS.length - 1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      selectTab(activeIndex === last ? 0 : activeIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      selectTab(activeIndex === 0 ? last : activeIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      selectTab(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      selectTab(last);
    }
  };

  return (
    <section id="demos" aria-labelledby="demos-heading" className={`scroll-mt-20 sm:scroll-mt-24 ${SECTION_CLASS}`}>
      <div className="max-w-5xl mx-auto">
        <h2 id="demos-heading" className={HEADING_CLASS}>
          My work
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          A live client website built for local business.
        </p>

        {/* Segmented switcher */}
        {DEMOS.length > 1 && (
          <div
            role="tablist"
            aria-label="Choose an example"
            className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-6 sm:gap-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-slate-300 dark:border-white/[0.14]"
          >
            {DEMOS.map((demo, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={demo.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  type="button"
                  role="tab"
                  id={`demo-tab-${demo.id}`}
                  aria-selected={isActive}
                  aria-controls="demo-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={(e) => {
                    setActiveIndex(i);
                    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }}
                  onKeyDown={handleTabKeyDown}
                  className={`relative shrink-0 min-h-[48px] pb-1 text-lg font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-sm after:absolute after:left-0 after:right-0 after:-bottom-px after:h-[3px] after:rounded-full after:transition-colors ${
                    isActive
                      ? 'text-slate-900 dark:text-white after:bg-[#D90429]'
                      : 'text-slate-500 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-200 after:bg-transparent'
                  }`}
                >
                  {demo.tab}
                </button>
              );
            })}
          </div>
        )}

        {/* Stage */}
        <div
          id="demo-panel"
          role="region"
          aria-labelledby={DEMOS.length > 1 ? `demo-tab-${active.id}` : 'demos-heading'}
          className={DEMOS.length > 1 ? 'mt-4' : 'mt-8'}
        >
          {isMobile ? (
            <button
              ref={previewRef}
              type="button"
              onClick={() => {
                if (active.embed === false) {
                  window.open(active.url, '_blank', 'noopener,noreferrer');
                } else {
                  setViewerOpen(true);
                }
              }}
              aria-label={`Try the ${active.name} website full screen`}
              className="group relative block mx-auto w-full max-w-[360px] aspect-[378/780] max-h-[65dvh] rounded-xl overflow-hidden border border-slate-300 dark:border-white/[0.14] bg-slate-50 dark:bg-[#040507]"
            >
              {active.preview ? (
                <img
                  key={active.id}
                  src={active.preview}
                  alt=""
                  width={378}
                  height={780}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 pb-24 text-center">
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{active.name}</span>
                  <span className="text-base text-slate-600 dark:text-zinc-400">Live client website</span>
                </span>
              )}
              <TapToTry label={active.embed === false ? 'Tap to visit the site' : undefined} />
            </button>
          ) : (
            active.embed === false && (active.desktopPreview || active.preview) ? (
              <StaticPreview demo={active} />
            ) : (
              <FramedDemo key={active.id} demo={active} isTouch={isTouch} />
            )
          )}

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p
                className={`inline-flex items-center px-2.5 py-1 mb-2 rounded-md text-sm font-semibold ${
                  active.kind === 'client'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300'
                    : 'bg-slate-200 text-slate-700 dark:bg-white/[0.08] dark:text-zinc-300'
                }`}
              >
                {active.kind === 'client' ? 'Client site, live' : 'Concept design'}
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {active.name}
              </h3>
              <p className="mt-1 text-base text-slate-600 dark:text-zinc-400">{active.builtFor}</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {active.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-base text-slate-700 dark:text-zinc-300">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-[#D90429]" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${active.name} website in a new tab`}
              className="sm:self-start shrink-0 inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold text-base hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              {active.kind === 'client' ? 'Visit Site' : 'Open Concept'}
            </a>
          </div>

          {/* Invite: enquire about building a site */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-slate-300 dark:border-white/[0.14] bg-white dark:bg-white/[0.03] p-5 sm:p-6">
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">Want a website like this?</p>
              <p className="mt-1 text-base text-slate-600 dark:text-zinc-400">
                I will build it around your business, your photos and your area.
              </p>
            </div>
            <a
              href={`https://wa.me/447348733365?text=${encodeURIComponent(
                'Hi Dean, I saw your work for Norden Carpets on your website. Could you build something like it for my business?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-base whitespace-nowrap transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-black" aria-hidden="true" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {isMobile && viewerOpen && <MobileDemoViewer demo={active} onClose={closeViewer} />}
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Web apps: editorial split                                           */
/* ------------------------------------------------------------------ */

export const WebAppsTeaser: React.FC = () => (
  <section id="web-apps" aria-labelledby="web-apps-heading" className={`scroll-mt-20 sm:scroll-mt-24 ${SECTION_CLASS}`}>
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
      <h2 id="web-apps-heading" className={`md:col-span-5 ${HEADING_CLASS}`}>
        Need more than a standard website?
      </h2>
      <div className="md:col-span-7 md:border-l md:border-slate-300 md:dark:border-white/[0.14] md:pl-10 flex flex-col gap-5 text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed">
        <p>
          I also build simple web apps that customers can save to their phone home screen, with no app store needed.
        </p>
        <p>
          <strong className="font-bold text-slate-900 dark:text-white">Booking tools.</strong>{' '}
          Mobile forms that let customers book a time with you.
        </p>
        <p>
          <strong className="font-bold text-slate-900 dark:text-white">Quote calculators.</strong>{' '}
          Customers enter their job details and the request comes straight to your phone.
        </p>
        <p>Message me with your idea and I will give you a clear price.</p>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* How it works: continuous numbered timeline                          */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    title: 'Chat on WhatsApp',
    text: 'Tell me what your business does and what you need customers to do on their phone.',
  },
  {
    title: 'Test on your phone',
    text: 'I send you a private link to try before you pay the balance.',
  },
  {
    title: 'Go live',
    text: 'Most sites go live in 5 to 7 working days.',
  },
];

export const HowItWorksSection: React.FC = () => (
  <section id="how-it-works" aria-labelledby="how-it-works-heading" className={`scroll-mt-20 sm:scroll-mt-24 ${SECTION_CLASS}`}>
    <div className="max-w-5xl mx-auto">
      <h2 id="how-it-works-heading" className={HEADING_CLASS}>
        How it works
      </h2>
      <ol className="mt-10 max-w-2xl">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative pl-16 sm:pl-20 pb-10 last:pb-0">
            {i < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[23.5px] sm:left-[27.5px] top-12 sm:top-14 bottom-0 w-px bg-slate-300 dark:bg-white/[0.18]"
              />
            )}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#D90429] bg-slate-50 dark:bg-[#040507] flex items-center justify-center font-geist font-extrabold text-lg sm:text-xl text-[#D90429]"
            >
              {i + 1}
            </span>
            <h3 className="pt-2.5 sm:pt-3 text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-1.5 text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
