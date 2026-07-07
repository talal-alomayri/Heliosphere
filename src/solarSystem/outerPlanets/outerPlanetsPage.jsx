import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../../components/Navbar";
import StarsBackground from "../../components/StarsBackground";
import jupiterImg from "../../assets/images/planet-jupiter-alone-pixel.png";
import saturnImg from "../../assets/images/planet-saturn-alone-pixel.png";
import uranusImg from "../../assets/images/planet-uranus-alone-pixel.png";
import neptuneImg from "../../assets/images/planet-neptune-alone-pixel.png";
import innerPlanetsBg from "../../assets/images/inner-planets-background-pixel.png";

// ─── PLANET CONFIGURATION ────────────────────────────────────────────────────
// size          → diameter of the planet image in px
// left / top    → anchor point as % of the viewport  (ONLY left, never right)
// clipRadius    → radius of the circular hitbox as a % of the element size.
//                 50% = full inscribed circle. Lower = tighter around the sphere.
// hoverTextClass→ Tailwind text-size classes for the hover label.
// labelOffset   → nudge the label from dead-center.  { x: "0px", y: "0px" }
//                 Positive x  → right   Negative x → left
//                 Positive y  → down    Negative y → up
//                 Accepts any CSS length: px, %, em, rem …
// ─────────────────────────────────────────────────────────────────────────────
const PLANETS = [
  {
    name: "JUPITER",
    path: "/solarSystem/outerPlanetsPage/jupiter",
    img: jupiterImg,
    labelColor: "#fbbf24", // amber-400
    glowColor: "rgba(251, 191, 36, 0.7)",
    size: "800px",
    left: "15%",
    top: "55%",
    clipRadius: "35%",
    hoverTextClass: "text-6xl md:text-8xl",
    labelOffset: { x: "0px", y: "0px" }, // ← nudge label position
  },
  {
    name: "SATURN",
    path: "/solarSystem/outerPlanetsPage/saturn",
    img: saturnImg,
    labelColor: "#fef08a", // yellow-300
    glowColor: "rgba(253, 224, 71, 0.7)",
    size: "950px",
    left: "45%",
    top: "45%",
    clipRadius: "35%",
    hoverTextClass: "text-6xl md:text-8xl",
    labelOffset: { x: "0px", y: "-30px" }, // ← nudge label position (up a bit to avoid rings)
  },
  {
    name: "URANUS",
    path: "/solarSystem/outerPlanetsPage/uranus",
    img: uranusImg,
    labelColor: "#22d3ee", // cyan-400
    glowColor: "rgba(34, 211, 238, 0.7)",
    size: "600px",
    left: "75%",
    top: "65%",
    clipRadius: "35%",
    hoverTextClass: "text-5xl md:text-7xl",
    labelOffset: { x: "0px", y: "0px" }, // ← nudge label position
  },
  {
    name: "NEPTUNE",
    path: "/solarSystem/outerPlanetsPage/neptune",
    img: neptuneImg,
    labelColor: "#60a5fa", // blue-400
    glowColor: "rgba(96, 165, 250, 0.7)",
    size: "550px",
    left: "92%",
    top: "35%",
    clipRadius: "35%",
    hoverTextClass: "text-5xl md:text-7xl",
    labelOffset: { x: "0px", y: "0px" }, // ← nudge label position
  },
];

export default function OuterPlanetsPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(-1);

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

      {/* Background image — sits below the stars layer */}
      <img
        src={innerPlanetsBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Animated star field */}
      <StarsBackground />

      {/* Page title */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-20 pointer-events-none">
        <h1
          className="text-6xl md:text-8xl font-bold text-white"
          style={{ textShadow: "0 0 8px #c084fc, 0 0 24px #9333ea" }}
        >
          OUTER PLANETS
        </h1>
      </div>

      {/* Full-viewport arena */}
      <div className="absolute inset-0 z-10">
        {PLANETS.map((planet, i) => {
          const isHovered = hoveredIdx === i;

          return (
            // ── LAYER 1: Zero-size coordinate anchor ─────────────────────────
            // width:0 height:0 + pointer-events:none means this div has
            // ZERO footprint — it can never intercept any mouse events.
            // left/top pin the anchor at the planet's centre point.
            <div
              key={planet.name}
              style={{
                position: "absolute",
                left: planet.left,
                top: planet.top,
                width: 0,
                height: 0,
                pointerEvents: "none",
                zIndex: isHovered ? 20 : 10,
              }}
            >
              {/*
               * ── LAYER 2: Transform layer ────────────────────────────────
               * Handles centering (translate -50%) and hover scale.
               * Both the clip layer AND the label live here as siblings so
               * the label is NEVER constrained by the circular clip mask.
               */}
              <div
                style={{
                  width: planet.size,
                  height: planet.size,
                  position: "relative",
                  pointerEvents: "none",
                  transform: isHovered
                    ? "translate(-50%, -50%) scale(1.06)"
                    : "translate(-50%, -50%) scale(1)",
                  transition: "transform 300ms ease",
                }}
              >
                {/*
                 * ── LAYER 3: Clipped interactive surface ─────────────────
                 * clip-path here, NO transform — keeps hit-test coordinates
                 * perfectly stable. Only the image lives inside the clip.
                 */}
                <div
                  className="cursor-pointer select-none"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(-1)}
                  onClick={() => handleClick(planet.path)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    clipPath: `circle(${planet.clipRadius} at 50% 50%)`,
                    pointerEvents: "auto",
                    overflow: "hidden",
                  }}
                >
                  {/* Planet image */}
                  <img
                    src={planet.img}
                    alt={planet.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      filter: isHovered
                        ? `drop-shadow(0 0 28px ${planet.glowColor}) drop-shadow(0 0 56px ${planet.glowColor})`
                        : `drop-shadow(0 0 6px ${planet.glowColor})`,
                      transition: "filter 300ms ease",
                    }}
                  />
                </div>

                {/*
                 * ── Name label — sibling of Layer 3, inside Layer 2 ──────
                 * Lives OUTSIDE the clip-path so no text is ever cropped.
                 * inset:0 + flex + items-center + justify-center centres it
                 * perfectly over the planet regardless of font size.
                 * pointer-events:none keeps it invisible to the mouse.
                 */}
                <span
                  className="pointer-events-none"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 100,
                    opacity: isHovered ? 1 : 0,
                    // Offset nudge + entrance scale in one compound transform
                    transform: isHovered
                      ? `translate(${planet.labelOffset.x}, ${planet.labelOffset.y}) scale(1)`
                      : `translate(${planet.labelOffset.x}, ${planet.labelOffset.y}) scale(0.85)`,
                    transition: "opacity 300ms ease, transform 300ms ease",
                  }}
                >
                  <span
                    className={`${planet.hoverTextClass} font-black uppercase tracking-wider whitespace-nowrap`}
                    style={{
                      color: "white",
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
            </div>
          );
        })}
      </div>
    </div>
  );
}