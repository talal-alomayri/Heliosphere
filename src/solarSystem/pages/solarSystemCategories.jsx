import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import sunImg from '../../assets/images/sun-pixel.png';
import innerPlanetsImg from '../../assets/images/inner-planets-pixel.png';
import outerPlanetsImg from '../../assets/images/inner-planets-pixel.png';

export default function SolarSystemCategories() {
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
      { opacity: 0, y: 50 },
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
    <div ref={containerRef} className="min-h-screen relative py-12">
      <Navbar />
      <StarsBackground />
      <div className="relative z-10 max-w-4xl mx-auto pt-24">
        <h1 className="text-5xl font-bold text-center mb-12 text-yellow-400 neon-text">
          SOLAR SYSTEM
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            onClick={() => handleClick('/solarSystem/sunPage')}
            className="pixel-border border-yellow-400 bg-yellow-950/80 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/50 glow-box overflow-hidden"
          >
            <div className="relative">
              <img 
                src={sunImg} 
                alt="sun" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 via-yellow-900/50 to-transparent flex items-end p-4">
                <h2 className="text-2xl font-bold text-yellow-300 neon-text">THE SUN</h2>
              </div>
            </div>
          </div>
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            onClick={() => handleClick('/solarSystem/innerPlanetsPage')}
            className="pixel-border border-blue-400 bg-blue-950/80 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 glow-box overflow-hidden"
          >
            <div className="relative">
              <img 
                src={innerPlanetsImg} 
                alt="inner-planets" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent flex items-end p-4">
                <h2 className="text-2xl font-bold text-blue-300 neon-text">INNER PLANETS</h2>
              </div>
            </div>
          </div>
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            onClick={() => handleClick('/solarSystem/outerPlanetsPage')}
            className="pixel-border border-purple-400 bg-purple-950/80 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 glow-box overflow-hidden"
          >
            <div className="relative">
              <img 
                src={outerPlanetsImg} 
                alt="outer-planets" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent flex items-end p-4">
                <h2 className="text-2xl font-bold text-purple-300 neon-text">OUTER PLANETS</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}