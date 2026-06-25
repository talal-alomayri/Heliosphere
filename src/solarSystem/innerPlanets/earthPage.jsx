import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import earthInfoImg from '../../assets/images/planet-earth-info-pixel.png';

export default function EarthPage() {
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
        <div ref={contentRef} className="pixel-border border-blue-400 bg-blue-950/80 p-8 glow-box">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-400 neon-text">EARTH</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src={earthInfoImg} 
              alt="earth" 
              className="w-full md:w-1/2 object-contain"
            />
            <div className="flex-1">
              <p className="text-lg mb-4 text-blue-100">
                Earth is the third planet from the Sun and the only known to support life, with liquid water on its surface.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-blue-900/50 pixel-border border-blue-500">
                  <span className="text-blue-300 font-bold">Diameter:</span> 12,742 km
                </div>
                <div className="p-4 bg-blue-900/50 pixel-border border-blue-500">
                  <span className="text-blue-300 font-bold">Distance from Sun:</span> 149.6 million km
                </div>
                <div className="p-4 bg-blue-900/50 pixel-border border-blue-500">
                  <span className="text-blue-300 font-bold">Orbital Period:</span> 365.25 days
                </div>
                <div className="p-4 bg-blue-900/50 pixel-border border-blue-500">
                  <span className="text-blue-300 font-bold">Moons:</span> 1 (The Moon)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}