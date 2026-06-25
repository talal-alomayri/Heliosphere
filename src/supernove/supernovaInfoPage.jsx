import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import StarsBackground from '../components/StarsBackground';
import supernovaInfoImg from '../assets/images/super-nove-info-pixel.png';

export default function SupernovaInfoPage() {
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
        <div ref={contentRef} className="pixel-border border-red-400 bg-red-950/80 p-8 glow-box">
          <h1 className="text-4xl font-bold text-center mb-8 text-red-400 neon-text">SUPERNOVA</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src={supernovaInfoImg} 
              alt="supernova" 
              className="w-full md:w-1/2 object-contain"
            />
            <div className="flex-1">
              <p className="text-lg mb-4 text-red-100">
                A supernova is a powerful and luminous stellar explosion that occurs during the last evolutionary stages of a massive star or when a white dwarf is triggered into runaway nuclear fusion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
