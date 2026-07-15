import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import StarsBackground from "../../components/StarsBackground";
import earthAloneImg from "../../assets/images/planet-earth-alone-pixel.webp";
import moonImg from "../../assets/images/moon-pixel.webp";
import innerPlanetsBg from "../../assets/images/inner-planets-background-pixel.webp";

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
const CELESTIAL_BODIES = [
  {
    name: "EARTH",
    path: "/solarSystem/innerPlanetsPage/earth",
    img: earthAloneImg,
    labelColor: "#60a5fa", // blue-400
    glowColor: "rgba(96, 165, 250, 0.7)",
    size: "750px",
    left: "35%",
    top: "55%",
    clipRadius: "35%",
    hoverTextClass: "text-5xl md:text-7xl",
    labelOffset: { x: "50px", y: "0px" },
  },
  {
    name: "MOON",
    path: "/solarSystem/innerPlanetsPage/moon",
    img: moonImg,
    labelColor: "#9ca3af", // gray-400
    glowColor: "rgba(156, 163, 175, 0.7)",
    size: "350px",
    left: "65%",
    top: "45%",
    clipRadius: "40%",
    hoverTextClass: "text-4xl md:text-5xl",
    labelOffset: { x: "-15px", y: "0px" },
  },
];

export default function EarthMoonPage() {
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
      className="h-screen overflow-y-auto md:overflow-hidden relative"
      style={{
        backgroundImage: `url(${innerPlanetsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >


      {/* Animated star field */}
      <StarsBackground />

      {/* Dark overlay to deepen the background */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none z-[1]" />

      {/* Page title */}
      <div className="relative md:absolute top-0 left-0 right-0 z-20 flex justify-center pt-12 md:pt-20 pb-16 md:pb-0 pointer-events-none">
        <h1
          className="text-5xl md:text-8xl font-bold text-white text-center"
          style={{ textShadow: "0 0 8px #93c5fd, 0 0 24px #3b82f6" }}
        >
          EARTH & MOON
        </h1>
      </div>

      {/* ── MOBILE VIEW: Vertical Flex Column ── */}
      <div className="md:hidden relative z-10 flex flex-col items-center gap-4">
        {CELESTIAL_BODIES.map((body, i) => {
          const isHovered = hoveredIdx === i;
          // Scale down the size slightly for mobile to fit better
          const mobileSize = parseInt(body.size) * 0.7 + 'px';

          return (
            <div
              key={body.name}
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
                  onClick={() => handleClick(body.path)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    clipPath: `circle(${body.clipRadius} at 50% 50%)`,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={body.img}
                    alt={body.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      filter: isHovered
                        ? `drop-shadow(0 0 28px ${body.glowColor}) drop-shadow(0 0 56px ${body.glowColor})`
                        : `drop-shadow(0 0 6px ${body.glowColor})`,
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
                        0 0 12px ${body.labelColor},
                        0 0 30px ${body.labelColor},
                        0 2px 4px rgba(0,0,0,0.9)
                      `,
                    }}
                  >
                    {body.name}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DESKTOP VIEW: Absolute Orbital Positioning ── */}
      <div className="hidden md:block absolute inset-0 z-10">
        {CELESTIAL_BODIES.map((body, i) => {
          const isHovered = hoveredIdx === i;

          return (
            // ── LAYER 1: Zero-size coordinate anchor ─────────────────────────
            // width:0 height:0 + pointer-events:none means this div has
            // ZERO footprint — it can never intercept any mouse events.
            // left/top pin the anchor at the body's centre point.
            <div
              key={body.name}
              style={{
                position: "absolute",
                left: body.left,
                top: body.top,
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
                  width: body.size,
                  height: body.size,
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
                  onClick={() => handleClick(body.path)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    clipPath: `circle(${body.clipRadius} at 50% 50%)`,
                    pointerEvents: "auto",
                    overflow: "hidden",
                  }}
                >
                  {/* Body image */}
                  <img
                    src={body.img}
                    alt={body.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      filter: isHovered
                        ? `drop-shadow(0 0 28px ${body.glowColor}) drop-shadow(0 0 56px ${body.glowColor})`
                        : `drop-shadow(0 0 6px ${body.glowColor})`,
                      transition: "filter 300ms ease",
                    }}
                  />
                </div>

                {/*
                 * ── Name label — sibling of Layer 3, inside Layer 2 ──────
                 * Lives OUTSIDE the clip-path so no text is ever cropped.
                 * inset:0 + flex + items-center + justify-center centres it
                 * perfectly over the body regardless of font size.
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
                      ? `translate(${body.labelOffset.x}, ${body.labelOffset.y}) scale(1)`
                      : `translate(${body.labelOffset.x}, ${body.labelOffset.y}) scale(0.85)`,
                    transition: "opacity 300ms ease, transform 300ms ease",
                  }}
                >
                  <span
                    className={`${body.hoverTextClass} font-black uppercase tracking-wider whitespace-nowrap`}
                    style={{
                      color: "white",
                      textShadow: `
                        0 0 12px ${body.labelColor},
                        0 0 30px ${body.labelColor},
                        0 2px 4px rgba(0,0,0,0.9)
                      `,
                    }}
                  >
                    {body.name}
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