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
        <div ref={contentRef} className="pixel-border border-cyan-400 bg-cyan-950/80 p-8 glow-box">
          <h1 className="text-4xl font-bold text-center mb-8 text-cyan-400 neon-text">URANUS</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src={uranusInfoImg} 
              alt="uranus" 
              className="w-full md:w-1/2 object-contain"
            />
            <div className="flex-1">
              <p className="text-lg mb-4 text-cyan-100">
                Uranus is an ice giant that rotates on its side, with a faint ring system.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-cyan-900/50 pixel-border border-cyan-500">
                  <span className="text-cyan-300 font-bold">Diameter:</span> 50,724 km
                </div>
                <div className="p-4 bg-cyan-900/50 pixel-border border-cyan-500">
                  <span className="text-cyan-300 font-bold">Distance from Sun:</span> 2.87 billion km
                </div>
                <div className="p-4 bg-cyan-900/50 pixel-border border-cyan-500">
                  <span className="text-cyan-300 font-bold">Orbital Period:</span> 84 Earth years
                </div>
                <div className="p-4 bg-cyan-900/50 pixel-border border-cyan-500">
                  <span className="text-cyan-300 font-bold">Moons:</span> 27 (known)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}