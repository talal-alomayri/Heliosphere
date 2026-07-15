import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import sunInfoImg from '../../assets/images/sun-info-pixel.png';
import { useSun } from '../../hooks/useSpaceData';

export default function SunPage() {
  const containerRef = useRef(null);
  const contentRef   = useRef(null);
  const { data, isPending, isError } = useSun();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    tl.fromTo(contentRef.current, { x: '-60px', opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.2');
  }, []);

  const mass = data?.mass ? `${data.mass.massValue} × 10^${data.mass.massExponent} kg` : 'N/A';
  const radius = data?.meanRadius ? `${Number(data.meanRadius).toLocaleString()} km` : 'N/A';
  const temp = data?.avgTemp ? `${data.avgTemp} K` : 'N/A';
  const rotation = data?.sideralRotation ? `${data.sideralRotation} h` : 'N/A';

  const stats = [
    { label: 'Type',        value: data?.bodyType           ?? (isError ? 'Unavailable' : '…') },
    { label: 'Mean Radius', value: isPending ? '…' : radius },
    { label: 'Mass',        value: isPending ? '…' : mass   },
    { label: 'Avg Temp',    value: isPending ? '…' : temp   },
    { label: 'Rotation',    value: isPending ? '…' : rotation },
    { label: 'Gravity',     value: isPending ? '…' : data?.gravity ? `${data.gravity} m/s²` : 'N/A' },
  ];

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden relative"
      style={{
        backgroundImage: `url(${sunInfoImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 42%, rgba(0,0,0,0.10) 72%, transparent 100%)',
        }}
      />
      <Navbar />
      <StarsBackground />

      <div className="relative z-10 h-full flex items-center" style={{ paddingTop: '64px' }}>
        <div ref={contentRef} className="w-full max-w-md px-8 md:px-12 flex flex-col gap-3">
          <h1
            className="text-4xl md:text-5xl font-bold text-yellow-400 leading-tight"
            style={{ textShadow: '0 0 8px #fbbf24, 0 0 24px #f59e0b' }}
          >
            THE SUN
          </h1>

          <p className="text-yellow-100 text-sm md:text-base leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
            The blazing heart of our Solar System — a nearly perfect sphere of hot plasma powered by nuclear fusion, sustaining all life on Earth.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="px-3 py-2 border border-yellow-400/40 bg-black/45 backdrop-blur-sm"
                style={{ boxShadow: '0 0 6px rgba(251,191,36,0.10)' }}
              >
                <span className="block text-xs font-bold text-yellow-400 tracking-wider uppercase mb-0.5" style={{ textShadow: '0 0 5px #fbbf24' }}>
                  {label}
                </span>
                <span className="text-yellow-100 text-xs md:text-sm">{value}</span>
              </div>
            ))}
          </div>

          {isError && (
            <p className="text-red-400/80 text-xs mt-1">⚠ Could not reach the API — check your token in .env</p>
          )}
        </div>
      </div>
    </div>
  );
}
