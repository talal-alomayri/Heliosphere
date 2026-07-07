import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import uranusInfoImg from '../../assets/images/planet-uranus-pixel.png';

export default function UranusPage() {
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
        src={uranusInfoImg}
        alt="Uranus Background"
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
            className="text-6xl md:text-8xl font-bold text-left mb-6 text-cyan-300"
            style={{ textShadow: "0 0 8px #67e8f9, 0 0 24px #22d3ee" }}
          >
            URANUS
          </h1>

          {/* Info text box below the title */}
          <div>
            <p className="text-lg mb-6 text-cyan-100">
              Uranus is an ice giant that rotates on its side, with a faint ring system.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-2">
                <span className="text-cyan-300 font-bold block mb-1">Diameter</span> 
                <span className="text-white text-lg">50,724 km</span>
              </div>
              <div className="p-2">
                <span className="text-cyan-300 font-bold block mb-1">Distance from Sun</span> 
                <span className="text-white text-lg">2.87 billion km</span>
              </div>
              <div className="p-2">
                <span className="text-cyan-300 font-bold block mb-1">Orbital Period</span> 
                <span className="text-white text-lg">84 Earth years</span>
              </div>
              <div className="p-2">
                <span className="text-cyan-300 font-bold block mb-1">Moons</span> 
                <span className="text-white text-lg">27 (known)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}