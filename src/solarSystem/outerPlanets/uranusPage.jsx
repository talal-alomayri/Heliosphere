import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import StarsBackground from '../../components/StarsBackground';
import bgImg from '../../assets/images/planet-uranus-pixel.png';
import iconImg from '../../assets/images/planet-uranus-alone-pixel.png';
import { useUranus } from '../../hooks/useSpaceData';

export default function UranusPage() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const { data, isPending, isError } = useUranus();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    tl.fromTo(contentRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.3');
  }, []);

  const buildStats = (d) => [
    { label: 'Diameter', value: d?.meanRadius ? d.meanRadius * 2 + ' km' : 'N/A' },
    { label: 'Distance from Sun', value: d?.semimajorAxis ? Number(d.semimajorAxis).toLocaleString() + ' km' : 'N/A' },
    { label: 'Orbital Period', value: d?.sideralOrbit ? d.sideralOrbit + ' days' : 'N/A' },
    { label: 'Moons', value: d?.moons?.length ?? 0 },
  ];

  return (
    <div ref={containerRef} className="h-screen overflow-hidden relative bg-black">
      <img src={bgImg} alt="URANUS Background" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
      <StarsBackground />

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-24 pt-20 pointer-events-none">
        <div ref={contentRef} className="max-w-2xl pointer-events-auto">
          <img src={iconImg} alt="Uranus" className="w-100 h-100 mb-4 md:hidden drop-shadow-[0_0_12px_rgba(34,211,238,0.5)] object-contain" />
          <h1 className="text-6xl md:text-8xl font-bold text-left mb-6 text-cyan-300" style={{ textShadow: '0 0 8px #67e8f9, 0 0 24px #06b6d4' }}>
            URANUS
          </h1>

          <div>
            <p className="text-lg mb-6 text-cyan-100">Uranus is the seventh planet from the Sun, an ice giant that rotates on its side with an axial tilt of 98 degrees.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {buildStats(data).map(({ label, value }) => (
                <div key={label} className="p-2">
                  <span className="text-cyan-300 font-bold block mb-1">{label}</span>
                  <span className="text-white text-lg">{isPending ? '…' : (isError ? 'Unavailable' : value)}</span>
                </div>
              ))}
            </div>

            {isError && (
              <p className="text-red-400/70 text-sm mt-4">⚠ API error — verify your token in .env</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
