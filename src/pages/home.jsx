import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import StarsBackground from "../components/StarsBackground";
import skyNightPixel from "../assets/images/sky-night-pixel.png";
import carSpacePixelImg from "../assets/images/car-space-pixel.png";

export default function Home() {
  const navigate = useNavigate();

  // ─── Refs for entrance animations ─────────────────────────────────────────
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const descriptionRef = useRef(null);

  // ─── Refs for the cinematic transition overlay ─────────────────────────────
  // overlayRef → the solid-black full-screen backdrop (GSAP fades this out)
  // imageRef   → the centered spaceship image (GSAP fades this IN first)
  const overlayRef = useRef(null);
  const imageRef = useRef(null);

  // Controls whether the transition overlay is mounted in the DOM at all.
  // The GSAP timeline inside the click handler drives everything once it is.
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ─── Entrance Animations (run once on mount) ───────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title: sweeps in from the left
      gsap.fromTo(
        titleRef.current,
        { x: "-100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Explore button: slides in from the left with a springy feel
      gsap.fromTo(
        buttonRef.current,
        { x: "-100%", opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)", delay: 0.3 }
      );

      // Description: sweeps in from the right
      gsap.fromTo(
        descriptionRef.current,
        { x: "100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ─── Explore Button Click Handler ──────────────────────────────────────────
  const handleExploreClick = () => {
    // Guard: prevent re-triggering while a transition is already in progress
    if (isTransitioning) return;

    // ── Step 1 · Tactile button zoom-snap (GSAP owns the transform) ──────────
    //
    // hover:scale-105 is stripped from the button's Tailwind classes so that
    // GSAP is the sole owner of the CSS transform property on this element.
    // Mixing CSS transitions and GSAP on the same transform property causes
    // jitter. The gradient colour hover still works fine via transition-colors.
    //
    // Snap sequence: scale → 1.3 in 0.12 s → release back to 1 in 0.18 s →
    //                mount the black overlay → kick off cinematic timeline.
    gsap.to(buttonRef.current, {
      scale: 1.3,
      duration: 0.12,
      ease: "power4.out",
      onComplete() {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.18,
          ease: "power2.inOut",
          onComplete() {
            // ── Step 2 · Mount the black overlay so the <img> exists in the DOM
            setIsTransitioning(true);

            // Double requestAnimationFrame guarantees React has flushed its
            // commit phase and the overlay DOM nodes are fully painted before
            // we attempt to read the refs and start the GSAP timeline.
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                const overlay = overlayRef.current;
                const image = imageRef.current;
                if (!overlay || !image) return;

                // The image starts completely invisible — GSAP will fade it in.
                // The overlay's bg-black is always visible behind it, so there
                // is never a "flash" of page content at any opacity level.
                gsap.set(image, { opacity: 0 });

                // ── Build the master cinematic GSAP timeline ─────────────────
                //
                // Total screen time budget: exactly 4 seconds
                //   0.6 s  — image fades IN  (opacity 0 → 1, power2.inOut)
                //   2.8 s  — image holds static at the centre of the screen
                //   0.6 s  — entire overlay fades OUT (opacity 1 → 0) → navigate
                //
                const tl = gsap.timeline();

                // Step 2 · Smooth fade-in of the centered spaceship image
                tl.to(image, {
                  opacity: 1,
                  duration: 0.6,
                  ease: "power2.inOut",
                });

                // Step 3 · Hold — image remains completely static, no movement
                tl.to(image, {
                  duration: 2.8,
                  // No properties change here; this segment is pure wait time.
                  // The image must NOT animate from any direction — it is
                  // already in its final centred position from the CSS layout.
                });

                // Step 4 · Fade out the entire overlay (image + black bg together)
                //          then programmatically navigate to /categories.
                tl.to(overlay, {
                  opacity: 0,
                  duration: 0.6,
                  ease: "power2.inOut",
                  onComplete() {
                    // navigate() fires inside GSAP's onComplete callback —
                    // only after the fade-out has fully finished.
                    navigate("/categories");
                  },
                });
              });
            });
          },
        });
      },
    });
  };

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Main Home Page ──────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url(${skyNightPixel})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Navbar />
        <StarsBackground />

        <div className="relative z-10 min-h-screen px-8 pt-24">
          {/* Top-Left: Title + Explore Button */}
          <div className="flex flex-col items-start justify-start pt-4">
            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold text-cyan-600 mb-2"
              style={{ textShadow: "0 0 10px #22d3ee, 0 0 10px #22d3ee" }}
            >
              HELIOSPHERE
            </h1>

            {/*
              hover:scale-105 deliberately omitted — GSAP is the sole owner
              of the CSS transform on this button. Mixing CSS transitions and
              GSAP transforms on the same property causes jitter.
              The gradient colour hover still works via transition-colors.
            */}
            <button
              ref={buttonRef}
              onClick={handleExploreClick}
              className="px-10 py-1.5 text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-2 border-cyan-400 transition-colors duration-300 hover:from-cyan-500 hover:to-blue-500"
            >
              EXPLORE
            </button>
          </div>

          {/* Bottom-Right: Description */}
          <div
            ref={descriptionRef}
            className="absolute bottom-12 right-8 max-w-xl"
          >
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Journey into the deep unknowns of outer space. Navigate through
              the detailed constructs of our Solar System, stand at the event
              horizon of supermassive Black Holes, and witness the violent
              majesty of exploding Supernovas in a cinematic pixel art
              experience.
            </p>
          </div>
        </div>
      </div>

      {/* ── Cinematic Transition Overlay ─────────────────────────────────────── */}
      {/*
        Mounted only when the user clicks Explore.

        Layer structure:
        ┌─ overlayRef  (fixed inset-0 · bg-black · z-[9999]) ───────────────────┐
        │  GSAP fades this element OUT at the very end of the sequence.         │
        │  The solid black background is always visible while image opacity     │
        │  is 0, preventing any flash of the underlying page.                   │
        │                                                                       │
        │  ┌─ imageRef  (the centered spaceship <img>) ─────────────────────┐  │
        │  │  • Starts at opacity: 0 (set by GSAP before the timeline runs) │  │
        │  │  • GSAP fades it IN during Step 2                              │  │
        │  │  • Remains perfectly STATIC — no positional animation at all   │  │
        │  │  • Sizing: w-[90vw] max-w-2xl / h-auto max-h-[85vh]           │  │
        │  │    → fills the screen on mobile, caps at ~672 px on desktop    │  │
        │  │    → object-contain ensures no cropping or stretching          │  │
        │  └────────────────────────────────────────────────────────────────┘  │
        └───────────────────────────────────────────────────────────────────────┘
      */}
      {isTransitioning && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <img
            ref={imageRef}
            src={carSpacePixelImg}
            alt="Spaceship travelling through space"
            /*
              Sizing is deliberately NOT full-bleed:
                w-[90vw]    – fills 90% of viewport width on small screens
                max-w-2xl   – caps at ~672 px on medium/large screens
                h-auto      – preserves the image's native aspect ratio
                max-h-[85vh]– prevents overflow on very wide landscape images
                object-contain – never crops or stretches the image
            */
            className="w-[90vw] max-w-2xl h-auto max-h-[85vh] object-contain"
          />
        </div>
      )}
    </>
  );
}
