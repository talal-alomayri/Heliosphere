import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import earthAloneImg from '../../assets/images/planet-earth-alone-pixel.png';
import moonImg from '../../assets/images/moon-pixel.png';

export default function EarthMoonPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
    tl.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "back.out(1.7)" 
      },
      "-=0.3"
    );
  }, []);

  const handleClick = (path) => {
    const tl = gsap.timeline({
      onComplete: () => navigate(path)
    });
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen relative py-12 px-4">
      <Navbar />
      <StarsBackground />
      <div className="relative z-10 max-w-4xl mx-auto pt-24">
        <h1 className="text-5xl font-bold text-center mb-12 text-blue-400 neon-text">EARTH & MOON</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            onClick={() => handleClick('/solarSystem/innerPlanetsPage/earth')}
            className="pixel-border border-blue-400 bg-blue-950/80 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 glow-box p-6"
          >
            <img 
              src={earthAloneImg} 
              alt="earth" 
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-2xl font-bold text-center text-blue-300">EARTH</h2>
          </div>
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            onClick={() => handleClick('/solarSystem/innerPlanetsPage/moon')}
            className="pixel-border border-gray-400 bg-gray-950/80 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-gray-500/50 glow-box p-6"
          >
            <img 
              src={moonImg} 
              alt="moon" 
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-2xl font-bold text-center text-gray-300">MOON</h2>
          </div>
        </div>
      </div>
    </div>
  );
}