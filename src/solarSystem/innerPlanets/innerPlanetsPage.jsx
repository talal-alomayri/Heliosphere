import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../../components/Navbar";
import StarsBackground from "../../components/StarsBackground";
import mercuryImg from "../../assets/images/planet-mercury-alone-pixel.png";
import venusImg from "../../assets/images/planet-venus-alone-pixel.png";
import earthImg from "../../assets/images/planet-earth-alone-pixel.png";
import marsImg from "../../assets/images/planet-mars-alone-pixel.png";

const PLANETS = [
  {
    name: "MERCURY",
    path: "/solarSystem/innerPlanetsPage/mercury",
    img: mercuryImg,
    labelColor: "#d6d3d1",
    glowColor: "rgba(168,162,158,0.7)",
    size: "100px",
  },
  {
    name: "VENUS",
    path: "/solarSystem/innerPlanetsPage/venus",
    img: venusImg,
    labelColor: "#fdba74",
    glowColor: "rgba(249,115,22,0.7)",
    size: "200px",
  },
  {
    name: "EARTH",
    path: "/solarSystem/innerPlanetsPage/earthMoon",
    img: earthImg,
    labelColor: "#67e8f9",
    glowColor: "rgba(34,211,238,0.7)",
    size: "500px",
  },
  {
    name: "MARS",
    path: "/solarSystem/innerPlanetsPage/mars",
    img: marsImg,
    labelColor: "#fca5a5",
    glowColor: "rgba(239,68,68,0.7)",
    size: "200px",
  },
];

export default function InnerPlanetsPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  // Page entrance fade only — no planet animations
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
    );
  }, []);

  const handleClick = (path) => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => navigate(path),
    });
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden relative bg-black"
    >
      <Navbar />
      <StarsBackground />

      {/* Page title */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-20 pointer-events-none">
        <h1
          className="text-4xl md:text-6xl font-bold text-blue-400"
          style={{ textShadow: "0 0 8px #22d3ee, 0 0 24px #0891b2" }}
        >
          INNER PLANETS
        </h1>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:gap-x-12 md:gap-y-12">
          {PLANETS.map((planet, i) => (
            <div
              key={planet.name}
              className="relative flex items-center justify-center cursor-pointer select-none"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(-1)}
              onClick={() => handleClick(planet.path)}
            >
              {/* Planet image — static, massive */}
              <img
                src={planet.img}
                alt={planet.name}
                className="object-contain transition-all duration-300"
                style={{
                  width: planet.size,
                  height: planet.size,
                  filter:
                    hoveredIdx === i
                      ? `drop-shadow(0 0 28px ${planet.glowColor}) drop-shadow(0 0 56px ${planet.glowColor})`
                      : `drop-shadow(0 0 6px ${planet.glowColor})`,
                  transform: hoveredIdx === i ? "scale(1.06)" : "scale(1)",
                }}
              />

              {/* Giant name label — floats centered over the planet, z-[100] */}
              <span
                className="absolute inset-0 flex items-center justify-center z-[100] pointer-events-none transition-all duration-300"
                style={{
                  opacity: hoveredIdx === i ? 1 : 0,
                  transform: hoveredIdx === i ? "scale(1)" : "scale(0.85)",
                }}
              >
                <span
                  className="text-7xl font-black uppercase tracking-wider whitespace-nowrap"
                  style={{
                    color: planet.labelColor,
                    textShadow: `
                      0 0 12px ${planet.labelColor},
                      0 0 30px ${planet.labelColor},
                      0 2px 4px rgba(0,0,0,0.9)
                    `,
                  }}
                >
                  {planet.name}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
