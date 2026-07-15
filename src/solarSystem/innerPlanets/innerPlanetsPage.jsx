import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../../components/Navbar";
import StarsBackground from "../../components/StarsBackground";
import innerPlanetsBg from "../../assets/images/inner-planets-background-pixel.png";
import mercuryImg from "../../assets/images/planet-mercury-alone-pixel.png";
import venusImg from "../../assets/images/planet-venus-alone-pixel.png";
import earthImg from "../../assets/images/planet-earth-alone-pixel.png";
import marsImg from "../../assets/images/planet-mars-alone-pixel.png";

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
    name: "MERCURY",
    path: "/solarSystem/innerPlanetsPage/mercury",
    img: mercuryImg,
    labelColor: "#d6d3d1",
    glowColor: "rgba(168,162,158,0.7)",
    size: "350px",
    left: "14%",
    top: "75%",
    clipRadius: "40%",
    hoverTextClass: "text-4xl md:text-6xl",
    labelOffset: { x: "0px", y: "0px" }, // ← nudge label position
  },
  {
    name: "VENUS",
    path: "/solarSystem/innerPlanetsPage/venus",
    img: venusImg,
    labelColor: "#fdba74",
    glowColor: "rgba(249,115,22,0.7)",
    size: "750px",
    left: "32%",
    top: "45%",
    clipRadius: "25%",
    hoverTextClass: "text-5xl md:text-7xl",
    labelOffset: { x: "2px", y: "0px" }, // ← nudge label position
  },
  {
    name: "EARTH",
    path: "/solarSystem/innerPlanetsPage/earthMoon",
    img: earthImg,
    labelColor: "#67e8f9",
    glowColor: "rgba(34,211,238,0.7)",
    size: "750px",
    left: "60%",
    top: "68%",
    clipRadius: "30%",
    hoverTextClass: "text-5xl md:text-7xl",
    labelOffset: { x: "50px", y: "0px" }, // ← nudge label position
  },
  {
    name: "MARS",
    path: "/solarSystem/innerPlanetsPage/mars",
    img: marsImg,
    labelColor: "#fca5a5",
    glowColor: "rgba(239,68,68,0.7)",
    size: "600px",
    left: "88%",
    top: "50%",
    clipRadius: "25%",
    hoverTextClass: "text-5xl md:text-7xl",
    labelOffset: { x: "10px", y: "0px" }, // ← nudge label position
  },
];

export default function InnerPlanetsPage() {
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
      className="h-screen overflow-y-auto md:overflow-hidden relative bg-black"
    >
      <Navbar />

      {/* Background image — sits below the stars layer */}
      <img
        src={innerPlanetsBg}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Animated star field on top of the background image */}
      <StarsBackground />

      {/* Page title */}
      <div className="relative md:absolute top-0 left-0 right-0 z-20 flex justify-center pt-12 md:pt-20 pb-8 md:pb-0 pointer-events-none">
        <h1
          className="text-5xl md:text-8xl font-bold text-white text-center"
          style={{ textShadow: "0 0 8px #22d3ee, 0 0 24px #0891b2" }}
        >
          INNER PLANETS
        </h1>
      </div>

      {/* ── MOBILE VIEW: Vertical Flex Column ── */}
      <div className="md:hidden relative z-10 flex flex-col items-center gap-16 pb-32">
        {PLANETS.map((planet, i) => {
          const isHovered = hoveredIdx === i;
          // Scale down the size slightly for mobile to fit better
          const mobileSize = parseInt(planet.size) * 0.7 + 'px';
          
          return (
            <div
              key={planet.name}
              className="relative flex flex-col items-center w-full"
              style={{ zIndex: isHovered ? 20 : 10 }}
            >
              <div
                style={{
                  width: mobileSize,
                  height: mobileSize,
                  position: "relative",
                  transform: isHovered ? "scale(1.06)" : "scale(1)",
                  transition: "transform 300ms ease",
                }}
              >
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
                    overflow: "hidden",
                  }}
                >
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

                {/* Mobile Label */}
                <span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center z-[100]"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "scale(1)" : "scale(0.85)",
                    transition: "opacity 300ms ease, transform 300ms ease",
                  }}
                >
                  <span
                    className="text-4xl font-black uppercase tracking-wider whitespace-nowrap"
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

      {/* ── DESKTOP VIEW: Absolute Orbital Positioning ── */}
      <div className="hidden md:block absolute inset-0 z-10 min-w-[1200px] md:min-w-full">
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
               * ── LAYER 2: Transform layer (scale & centering ONLY) ──────────
               * Handles translate(-50%,-50%) to centre the planet on Layer 1's
               * anchor, plus the hover scale. NO clip-path here.
               *
               * Keeping clip-path and transform on separate elements eliminates
               * a known browser bug where hit-test coordinates desync from the
               * visual position when both are on the same element.
               */}
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
                {/*
                 * Label outer span: inset-0 flex centres the block.
                 * translate(labelOffset.x, labelOffset.y) nudges the
                 * entire centred block without breaking the alignment.
                 * The scale(0.85→1) entrance stays as a separate layer.
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
