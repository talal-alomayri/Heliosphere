import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import moonInfoImg from '../../assets/images/moon-info-pixel.png';

export default function MoonPage() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
    tl.fromTo(
      contentRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden relative bg-black">
      <Navbar />

      {/* Background Image */}
      <img
        src={moonInfoImg}
        alt="Moon Background"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Animated Star Field */}
      <StarsBackground />

      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-24 pt-20 pointer-events-none">
        <div ref={contentRef} className="max-w-2xl pointer-events-auto">
          {/* Title on the left */}
          <h1 
            className="text-6xl md:text-8xl font-bold text-left mb-6 text-gray-300"
            style={{ textShadow: "0 0 8px #9ca3af, 0 0 24px #6b7280" }}
          >
            THE MOON
          </h1>

          {/* Info text box below the title */}
          <div>
            <p className="text-lg mb-6 text-gray-100">
              The Moon is Earth's only natural satellite and the largest natural satellite in the Solar System relative to the size of its planet.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-2">
                <span className="text-gray-300 font-bold block mb-1">Diameter</span> 
                <span className="text-white text-lg">3,474 km</span>
              </div>
              <div className="p-2">
                <span className="text-gray-300 font-bold block mb-1">Distance from Earth</span> 
                <span className="text-white text-lg">384,400 km</span>
              </div>
              <div className="p-2">
                <span className="text-gray-300 font-bold block mb-1">Orbital Period</span> 
                <span className="text-white text-lg">27.3 days</span>
              </div>
              <div className="p-2">
                <span className="text-gray-300 font-bold block mb-1">Temperature</span> 
                <span className="text-white text-lg">-173°C to 127°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}