import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import sunInfoImg from '../../assets/images/sun-info-pixel.png';

export default function SunPage() {
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
    <div ref={containerRef} className="min-h-screen relative py-12">
      <Navbar />
      <StarsBackground />
      <div className="relative z-10 max-w-4xl mx-auto pt-24">
        <div ref={contentRef} className="pixel-border border-yellow-400 bg-yellow-950/80 p-8 glow-box">
          <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400 neon-text">THE SUN</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src={sunInfoImg} 
              alt="sun" 
              className="w-full md:w-1/2 object-cover"
            />
            <div className="flex-1">
              <p className="text-lg mb-4 text-yellow-100">
                The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-yellow-900/50 pixel-border border-yellow-500">
                  <span className="text-yellow-300 font-bold">Type:</span> G-type main-sequence star
                </div>
                <div className="p-4 bg-yellow-900/50 pixel-border border-yellow-500">
                  <span className="text-yellow-300 font-bold">Diameter:</span> 1.39 million km
                </div>
                <div className="p-4 bg-yellow-900/50 pixel-border border-yellow-500">
                  <span className="text-yellow-300 font-bold">Temperature:</span> 5,500°C (surface)
                </div>
                <div className="p-4 bg-yellow-900/50 pixel-border border-yellow-500">
                  <span className="text-yellow-300 font-bold">Age:</span> 4.6 billion years
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}