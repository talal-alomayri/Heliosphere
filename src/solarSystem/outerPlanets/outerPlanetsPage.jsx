import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import jupiterImg from '../../assets/images/planet-jupiter-alone-pixel.png';
import saturnImg from '../../assets/images/planet-saturn-alone-pixel.png';
import uranusImg from '../../assets/images/planet-uranus-alone-pixel.png';
import neptuneImg from '../../assets/images/planet-neptune-alone-pixel.png';

export default function OuterPlanetsPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const planetsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
    tl.fromTo(
      planetsRef.current,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "back.out(1.7)" 
      },
      "-=0.3"
    );
  }, []);

  const handlePlanetClick = (path) => {
    const tl = gsap.timeline({
      onComplete: () => navigate(path)
    });
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });
  };

  const planets = [
    { name: 'JUPITER', path: '/solarSystem/outerPlanetsPage/jupiter', img: jupiterImg, color: 'amber' },
    { name: 'SATURN', path: '/solarSystem/outerPlanetsPage/saturn', img: saturnImg, color: 'yellow' },
    { name: 'URANUS', path: '/solarSystem/outerPlanetsPage/uranus', img: uranusImg, color: 'cyan' },
    { name: 'NEPTUNE', path: '/solarSystem/outerPlanetsPage/neptune', img: neptuneImg, color: 'blue' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative py-12 px-4">
      <Navbar />
      <StarsBackground />
      <div className="relative z-10 max-w-5xl mx-auto pt-24">
        <h1 className="text-5xl font-bold text-center mb-12 text-purple-400 neon-text">OUTER PLANETS</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {planets.map((planet, index) => (
            <div
              key={index}
              ref={(el) => (planetsRef.current[index] = el)}
              onClick={() => handlePlanetClick(planet.path)}
              className={`pixel-border border-${planet.color}-400 bg-${planet.color}-950/80 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-${planet.color}-500/50 glow-box`}
            >
              <img 
                src={planet.img} 
                alt={planet.name} 
                className="w-full h-40 object-contain p-4"
              />
              <h3 className={`text-center py-3 text-lg font-bold text-${planet.color}-300`}>
                {planet.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}