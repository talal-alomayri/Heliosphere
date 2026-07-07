import { useRef, useEffect } from "react";
import gsap from "gsap";
import Navbar from "../../components/Navbar";
import StarsBackground from "../../components/StarsBackground";
import asteroidBg from "../../assets/images/asteroid-belt-pixel.png";

export default function AsteroidBeltPage() {
  const containerRef = useRef(null);

  // Simple entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-x-hidden bg-black flex flex-col"
      style={{
        backgroundImage: `url(${asteroidBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      {/* Stars on top of the background image */}
      <StarsBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start text-left px-12 md:px-24 max-w-4xl">
        <h1
          className="text-6xl md:text-8xl font-bold text-white mb-8"
          style={{ textShadow: "0 0 10px #22d3ee, 0 0 30px #22d3ee" }}
        >
          ASTEROID BELT
        </h1>
        <p className="text-white/90 text-xl md:text-3xl leading-relaxed">
          The Asteroid Belt is a torus-shaped region in the Solar System, located
          roughly between the orbits of the planets Jupiter and Mars. It contains
          billions of irregularly shaped bodies called asteroids or minor planets,
          ranging in size from dust particles to the dwarf planet Ceres.
        </p>
      </div>
    </div>
  );
}
