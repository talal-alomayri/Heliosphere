import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import StarsBackground from '../components/StarsBackground';
import supernovaImg from "../assets/images/super-nove-pixel.png";
import { useSupernova } from '../hooks/useSpaceData';

// ─── SKELETON LOADER ─────────────────────────────────────────────────────────
function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded bg-red-900/40 ${className}`}
      aria-hidden="true"
    />
  );
}

// ─── STAT CARD — no border ────────────────────────────────────────────────────
function StatCard({ label, value }) {
  return (
    <div className="flex flex-col gap-1 py-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-red-400">{label}</span>
      <span className="text-white text-base font-medium leading-snug">{value}</span>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function SupernovaInfoPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const { data, isPending, isError } = useSupernova();

  const apod = data?.apod;
  const wiki = data?.wiki;

  // ── GSAP entrance animation (slides in from left)
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    tl.fromTo(heroRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'back.out(1.7)' }, '-=0.2');
    tl.fromTo(statsRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
  }, []);

  // ── Truncate Wikipedia extract
  const extract = wiki?.extract
    ? wiki.extract.slice(0, 480).trim() + (wiki.extract.length > 480 ? '…' : '')
    : null;

  // ── Key facts
  const facts = [
    { label: 'Type', value: 'Stellar Explosion' },
    { label: 'Peak Luminosity', value: 'Up to 10¹⁰ × Sun' },
    { label: 'Notable Event', value: 'SN 1987A' },
    { label: 'Distance', value: '~168,000 light-years' },
    { label: 'Wikipedia', value: wiki?.titles?.normalized ?? 'Supernova' },
    { label: 'APOD Date', value: apod?.date ?? '—' },
  ];

  return (
    <div ref={containerRef} className="h-screen overflow-hidden relative">
      <StarsBackground />

      {/* ── BACKGROUND IMAGE — full page cover */}
      <img
        src={supernovaImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* ── Dark gradient overlay on the left for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 80%)' }}
      />

      {/* ── LEFT-SIDE CONTENT PANEL */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-20 pt-20 pointer-events-none">
        <div className="w-full max-w-xl pointer-events-auto text-left">

          {/* Title */}
          <div ref={heroRef}>
            <h1
              className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text mb-3"
              style={{ backgroundImage: 'linear-gradient(135deg, #fca5a5, #ef4444, #f97316)' }}
            >
              SUPERNOVA
            </h1>
            <p className="text-red-300/80 text-lg font-light tracking-wide mb-8">
              The most powerful explosion in the universe — a star's final act.
            </p>
          </div>

          {/* Description + facts */}
          <div ref={statsRef} className="space-y-5">

            {/* Wikipedia extract */}
            {isPending ? (
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-5/6" />
                <SkeletonBlock className="h-4 w-4/6" />
                <SkeletonBlock className="h-4 w-full" />
              </div>
            ) : (
              <p className="text-red-100/90 text-sm leading-relaxed">
                {extract ?? "A supernova is a powerful and luminous stellar explosion that occurs at the end of a massive star's life, briefly outshining entire galaxies."}
              </p>
            )}

            {wiki?.content_urls?.desktop?.page && (
              <a
                href={wiki.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-red-400/70 hover:text-red-300 text-xs underline transition-colors"
              >
                Read full Wikipedia article ↗
              </a>
            )}

            {/* Facts grid — no borders */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 pt-2">
              {facts.map(({ label, value }) =>
                isPending
                  ? <SkeletonBlock key={label} className="h-10 rounded" />
                  : <StatCard key={label} label={label} value={value} />
              )}
            </div>

            {/* NASA APOD caption */}
            {!isPending && apod?.explanation && (
              <div className="pt-2">
                <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">
                  NASA APOD — {apod.title}
                </p>
                <p className="text-red-100/70 text-xs leading-relaxed">
                  {apod.explanation.length > 400
                    ? apod.explanation.slice(0, 400).trim() + '…'
                    : apod.explanation}
                </p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <p className="text-red-400/80 text-sm">
                ⚠ Could not load live data. Check your network or <code>.env</code>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
