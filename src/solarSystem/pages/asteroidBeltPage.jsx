import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import StarsBackground from '../../components/StarsBackground';
import asteroidBg from '../../assets/images/asteroid-belt-pixel.png';
import { useAsteroidBelt } from '../../hooks/useSpaceData';

export default function AsteroidBeltPage() {
  const containerRef = useRef(null);
  const { data, isPending, isError } = useAsteroidBelt();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const { ceres, asteroids = [] } = data ?? {};

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-x-hidden bg-black flex flex-col"
      style={{
        backgroundImage: `url(${asteroidBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
     
      <StarsBackground />

      <div className="relative z-10 flex flex-col items-start text-left px-12 md:px-24 max-w-4xl pt-28">
        <h1
          className="text-6xl md:text-8xl font-bold text-white mb-8"
          style={{ textShadow: '0 0 10px #22d3ee, 0 0 30px #22d3ee' }}
        >
          ASTEROID BELT
        </h1>

        <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-10">
          The Asteroid Belt is a torus-shaped region in the Solar System, located
          roughly between the orbits of Mars and Jupiter
          {isPending
            ? '…'
            : ceres?.semimajorAxis
            ? ` at ~${Number(ceres.semimajorAxis).toLocaleString()} km from the Sun`
            : ''
          }.
          It contains billions of irregularly shaped bodies —
          {isPending
            ? ' loading…'
            : asteroids.length > 0
            ? ` including ${asteroids.length} notable tracked objects such as ${asteroids.map(a => a.englishName || a.id).join(', ')}`
            : ' including countless minor planets'
          }.
          {ceres && !isPending && (
            <> Its largest member, <strong className="text-cyan-300">Ceres</strong>, is a dwarf planet with a radius of {ceres.meanRadius ? `${ceres.meanRadius} km` : 'N/A'} and an orbital period of {ceres.sideralOrbit ? `${ceres.sideralOrbit} days` : 'N/A'}.</>
          )}
        </p>

        {/* Ceres card */}
        {ceres && (
          <div className="w-full mb-8">
            <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-3">Largest Body — Ceres (Dwarf Planet)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Radius',   value: ceres.meanRadius ? ceres.meanRadius + ' km' : 'N/A' },
                { label: 'Gravity',  value: ceres.gravity    ? ceres.gravity + ' m/s²'  : 'N/A' },
                { label: 'Avg Temp', value: ceres.avgTemp    ? ceres.avgTemp + ' K'     : 'N/A' },
                { label: 'Orbit',    value: ceres.sideralOrbit ? ceres.sideralOrbit + ' days' : 'N/A' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-black/50 border border-cyan-400/30 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <span className="block text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</span>
                  <span className="text-white text-sm">{isPending ? '…' : value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notable asteroids */}
        {asteroids.length > 0 && (
          <div className="w-full">
            <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-3">Notable Asteroids (sorted by orbit)</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {asteroids.map((a) => (
                <div key={a.id} className="bg-black/50 border border-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <span className="block text-white font-semibold text-sm mb-1">{a.englishName || a.id}</span>
                  <span className="text-white/60 text-xs">{a.meanRadius ? a.meanRadius + ' km radius' : 'radius N/A'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isPending && (
          <p className="text-white/50 text-sm mt-4">Loading asteroid data…</p>
        )}
        {isError && (
          <p className="text-red-400/70 text-sm mt-4">⚠ API error — verify your token in .env</p>
        )}
      </div>
    </div>
  );
}
