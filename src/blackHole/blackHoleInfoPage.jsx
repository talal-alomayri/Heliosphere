import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import StarsBackground from '../components/StarsBackground';
import blackHoleInfoImg from '../assets/images/black-hole-info-pixel.png';

export default function BlackHoleInfoPage() {
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
        <div ref={contentRef} className="pixel-border border-purple-400 bg-purple-950/80 p-8 glow-box">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-400 neon-text">BLACK HOLE</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src={blackHoleInfoImg} 
              alt="black hole" 
              className="w-full md:w-1/2 object-contain"
            />
            <div className="flex-1">
              <p className="text-lg mb-4 text-purple-100">
                Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape from them once inside the event horizon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
