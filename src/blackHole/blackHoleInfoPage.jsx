import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import StarsBackground from '../components/StarsBackground';
import blackHoleImg from "../assets/images/black-hole-pixel.png";
import { useBlackHole } from '../hooks/useSpaceData';

// ─── SKELETON LOADER ─────────────────────────────────────────────────────────
function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded bg-purple-900/40 ${className}`}
      aria-hidden="true"
    />
  );
}

// ─── STAT CARD — no border, transparent bg ───────────────────────────────────
function StatCard({ label, value }) {
  return (
    <div className="flex flex-col gap-1 py-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">{label}</span>
      <span className="text-white text-base font-medium leading-snug">{value}</span>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function BlackHoleInfoPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const { data, isPending, isError } = useBlackHole();

  const apod = data?.apod;
  const wiki = data?.wiki;

  // ── GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    tl.fromTo(heroRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'back.out(1.7)' }, '-=0.2');
    tl.fromTo(statsRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
  }, []);

  // ── Truncate the Wikipedia extract to a readable length
  const extract = wiki?.extract
    ? wiki.extract.slice(0, 480).trim() + (wiki.extract.length > 480 ? '…' : '')
    : null;

  // ── Key facts
  const facts = [
    { label: 'Type', value: 'Gravitational Singularity' },
    { label: 'Escape Velocity', value: '> Speed of Light' },
    { label: 'M87★ Mass', value: '6.5 billion M☉' },
    { label: 'First Image', value: 'April 10, 2019 (EHT)' },
    { label: 'Wikipedia', value: wiki?.titles?.normalized ?? 'Black hole' },
    { label: 'APOD Date', value: apod?.date ?? '—' },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative bg-black"
    >
      <StarsBackground />

      {/* ── BACKGROUND IMAGE (full screen, left-dominant) */}
      <img
        src={blackHoleImg}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, black 40%, transparent 75%)',
          WebkitMaskImage: 'linear-gradient(to right, black 40%, transparent 75%)',
        }}
      />

      {/* ── RIGHT-SIDE CONTENT PANEL */}
      <div className="relative w-full min-h-screen z-10 flex flex-col justify-center items-end px-8 md:px-20 pt-28 pb-12 pointer-events-none">
        <div className="w-full max-w-xl pointer-events-auto text-right">

          {/* Title */}
          <div ref={heroRef}>
            <h1
              className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text mb-3"
              style={{ backgroundImage: 'linear-gradient(135deg, #e879f9, #a855f7, #7c3aed)' }}
            >
              BLACK HOLE
            </h1>
            <p className="text-purple-300/80 text-lg font-light tracking-wide mb-8">
              Where gravity swallows everything — even light itself.
            </p>
          </div>

          {/* Description + facts */}
          <div ref={statsRef} className="space-y-5">

            {/* Wikipedia extract */}
            {isPending ? (
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-5/6 ml-auto" />
                <SkeletonBlock className="h-4 w-4/6 ml-auto" />
                <SkeletonBlock className="h-4 w-full" />
              </div>
            ) : (
              <p className="text-purple-100/90 text-sm leading-relaxed">
                {extract ?? 'A black hole is a region of spacetime where gravity is so strong that nothing — not even light — can escape once past the event horizon.'}
              </p>
            )}

            {wiki?.content_urls?.desktop?.page && (
              <a
                href={wiki.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-purple-400/70 hover:text-purple-300 text-xs underline transition-colors"
              >
                Read full Wikipedia article ↗
              </a>
            )}

            {/* Facts grid */}
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
                <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">
                  NASA APOD — {apod.title}
                </p>
                <p className="text-purple-100/70 text-xs leading-relaxed">
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
