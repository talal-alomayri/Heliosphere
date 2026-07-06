import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import sunInfoImg from '../../assets/images/sun-info-pixel.png';

export default function SunPage() {
  const containerRef = useRef(null);
  const contentRef   = useRef(null);

  // ── Entrance animation ──────────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
    tl.fromTo(
      contentRef.current,
      { x: '-60px', opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '-=0.2'
    );
  }, []);

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
      {/* Dark vignette — left readable, right open */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 42%, rgba(0,0,0,0.10) 72%, transparent 100%)',
        }}
      />

      <Navbar />
      <StarsBackground />

      {/* ── Left-aligned content panel — fits within h-screen ─────────────── */}
      <div className="relative z-10 h-full flex items-center" style={{ paddingTop: '64px' }}>
        <div
          ref={contentRef}
          className="w-full max-w-md px-8 md:px-12 flex flex-col gap-3"
        >
          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-bold text-yellow-400 leading-tight"
            style={{
              textShadow: '0 0 8px #fbbf24, 0 0 24px #f59e0b',
            }}
          >
            THE SUN
          </h1>

          {/* Description */}
          <p
            className="text-yellow-100 text-sm md:text-base leading-relaxed"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
          >
            The blazing heart of our Solar System — a nearly perfect sphere of
            hot plasma powered by nuclear fusion, sustaining all life on Earth.
          </p>

          {/* Stats grid — always 2 columns */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Type',        value: 'G-type main-sequence' },
              { label: 'Diameter',    value: '1.39 million km'      },
              { label: 'Mass',        value: '1.989 × 10³⁰ kg'     },
              { label: 'Surface Temp',value: '5,500 °C'             },
              { label: 'Core Temp',   value: '~15 million °C'       },
              { label: 'Age',         value: '4.6 billion years'    },
              { label: 'Rotation',    value: '~25 days (equator)'   },
              { label: 'Distance',    value: '149.6 million km'     },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="px-3 py-2 border border-yellow-400/40 bg-black/45 backdrop-blur-sm"
                style={{ boxShadow: '0 0 6px rgba(251,191,36,0.10)' }}
              >
                <span
                  className="block text-xs font-bold text-yellow-400 tracking-wider uppercase mb-0.5"
                  style={{ textShadow: '0 0 5px #fbbf24' }}
                >
                  {label}
                </span>
                <span className="text-yellow-100 text-xs md:text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}