import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import saturnInfoImg from '../../assets/images/planet-saturn-pixel.png';

export default function SaturnPage() {
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
        src={saturnInfoImg}
        alt="Saturn Background"
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
            className="text-6xl md:text-8xl font-bold text-left mb-6 text-yellow-300"
            style={{ textShadow: "0 0 8px #fde047, 0 0 24px #eab308" }}
          >
            SATURN
          </h1>

          {/* Info text box below the title */}
          <div>
            <p className="text-lg mb-6 text-yellow-100">
              Saturn is famous for its spectacular ring system, made of ice and rock particles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-2">
                <span className="text-yellow-300 font-bold block mb-1">Diameter</span> 
                <span className="text-white text-lg">116,460 km</span>
              </div>
              <div className="p-2">
                <span className="text-yellow-300 font-bold block mb-1">Distance from Sun</span> 
                <span className="text-white text-lg">1.43 billion km</span>
              </div>
              <div className="p-2">
                <span className="text-yellow-300 font-bold block mb-1">Orbital Period</span> 
                <span className="text-white text-lg">29.5 Earth years</span>
              </div>
              <div className="p-2">
                <span className="text-yellow-300 font-bold block mb-1">Moons</span> 
                <span className="text-white text-lg">146+ (known)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}