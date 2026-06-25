import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import mercuryInfoImg from '../../assets/images/planet-mercury-info-pixel.png';

export default function MercuryPage() {
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
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative py-12 px-4">
      <Navbar />
      <StarsBackground />
      <div className="relative z-10 max-w-4xl mx-auto pt-24">
        <div ref={contentRef} className="pixel-border border-gray-400 bg-gray-950/80 p-8 glow-box">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-400 neon-text">MERCURY</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src={mercuryInfoImg} 
              alt="mercury" 
              className="w-full md:w-1/2 object-contain"
            />
            <div className="flex-1">
              <p className="text-lg mb-4 text-gray-100">
                Mercury is the smallest planet in our Solar System and the closest to the Sun. It has no atmosphere to retain heat, causing extreme temperature variations.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-900/50 pixel-border border-gray-500">
                  <span className="text-gray-300 font-bold">Diameter:</span> 4,879 km
                </div>
                <div className="p-4 bg-gray-900/50 pixel-border border-gray-500">
                  <span className="text-gray-300 font-bold">Distance from Sun:</span> 57.9 million km
                </div>
                <div className="p-4 bg-gray-900/50 pixel-border border-gray-500">
                  <span className="text-gray-300 font-bold">Orbital Period:</span> 88 Earth days
                </div>
                <div className="p-4 bg-gray-900/50 pixel-border border-gray-500">
                  <span className="text-gray-300 font-bold">Moons:</span> 0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}