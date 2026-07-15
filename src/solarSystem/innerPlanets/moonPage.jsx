import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import StarsBackground from '../../components/StarsBackground';
import bgImg from '../../assets/images/moon-info-pixel.webp';
import iconImg from '../../assets/images/moon-without-bg.webp';
import { useMoon } from '../../hooks/useSpaceData';
import { useNavigate } from 'react-router-dom';

export default function MoonPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const { data, isPending, isError } = useMoon();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    tl.fromTo(contentRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.3');
  }, []);

  const buildStats = (d) => [
    { label: 'Diameter', value: d?.meanRadius ? d.meanRadius * 2 + ' km' : 'N/A' },
    { label: 'Distance from Earth', value: d?.semimajorAxis ? Number(d.semimajorAxis).toLocaleString() + ' km' : 'N/A' },
    { label: 'Orbital Period', value: d?.sideralOrbit ? d.sideralOrbit + ' days' : 'N/A' },
    { label: 'Avg Temp', value: d?.avgTemp ? d.avgTemp + ' K' : 'N/A' },
  ];

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto overflow-x-hidden md:overflow-hidden relative bg-black">
      <img src={bgImg} alt="THE MOON Background" aria-hidden="true" className="fixed md:absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
      <StarsBackground />
      {/* Mobile Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="md:hidden absolute top-20 left-6 z-50 text-white flex items-center justify-center p-2 px-4 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-sm font-bold tracking-wider hover:bg-black/70 transition-colors"
      >
        ← BACK
      </button>


      <div className="relative md:absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-24 pt-32 pb-20 md:pt-20 md:pb-0 min-h-screen md:min-h-0 pointer-events-none">
        <div ref={contentRef} className="max-w-2xl pointer-events-auto">
          <img src={iconImg} alt="The Moon" className="w-50 h-50 mb-4 md:hidden drop-shadow-[0_0_12px_rgba(156,163,175,0.5)] object-contain" />
          <h1 className="text-6xl md:text-8xl font-bold text-left mb-6 text-gray-300" style={{ textShadow: '0 0 8px #9ca3af, 0 0 24px #6b7280' }}>
            THE MOON
          </h1>

          <div>
            <p className="text-lg mb-6 text-gray-100">The Moon is Earth's only natural satellite and the largest natural satellite in the Solar System relative to the size of its planet.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {buildStats(data).map(({ label, value }) => (
                <div key={label} className="p-2">
                  <span className="text-gray-300 font-bold block mb-1">{label}</span>
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
