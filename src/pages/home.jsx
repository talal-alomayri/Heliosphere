import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import StarsBackground from "../components/StarsBackground";
import SolarSystemCard from "../component/solarSystemCard";
import BlackHoleCard from "../blackHole/blackHoleCard";
import SupernovaCard from "../supernove/supernoveCard";
import backgroundImg from "../assets/images/Background.png";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();

  // ─── Refs for hero entrance animations ────────────────────────────────────
  const containerRef   = useRef(null);
  const titleRef       = useRef(null);
  const buttonRef      = useRef(null);
  const descriptionRef = useRef(null);

  // ─── Refs for card scroll-trigger animations ───────────────────────────────
  const solarSystemRefs = useRef({ image: null, content: null });
  const blackHoleRefs   = useRef({ image: null, content: null });
  const supernovaRefs   = useRef({ image: null, content: null });


  // ─── Smooth-scroll helper ─────────────────────────────────────────────────
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // ─── Hero entrance animations (run once on mount) ─────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title: fades in + rises from slightly below
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Description: fades in after title
      gsap.fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.35 }
      );

      // Explore button: springy entrance
      gsap.fromTo(
        buttonRef.current,
        { y: 20, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.3)", delay: 0.65 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ─── Card scroll-trigger animations ───────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Solar System — animates when it first enters the viewport
      if (solarSystemRefs.current.image && solarSystemRefs.current.content) {
        gsap.fromTo(
          solarSystemRefs.current.image,
          { x: "100%", opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: solarSystemRefs.current.image,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          solarSystemRefs.current.content,
          { x: "-100%", opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: solarSystemRefs.current.content,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Black Hole — mirrored directions
      if (blackHoleRefs.current.image && blackHoleRefs.current.content) {
        gsap.fromTo(
          blackHoleRefs.current.image,
          { x: "-100%", opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: blackHoleRefs.current.image,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          blackHoleRefs.current.content,
          { x: "100%", opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: blackHoleRefs.current.content,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Supernova
      if (supernovaRefs.current.image && supernovaRefs.current.content) {
        gsap.fromTo(
          supernovaRefs.current.image,
          { x: "100%", opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: supernovaRefs.current.image,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          supernovaRefs.current.content,
          { x: "-100%", opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: supernovaRefs.current.content,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ─── Explore button: smooth scroll to first category ──────────────────────
  const handleExploreClick = () => {
    // Tactile zoom-snap, then smooth-scroll (no overlay/navigate)
    gsap.to(buttonRef.current, {
      scale: 1.25,
      duration: 0.12,
      ease: "power4.out",
      onComplete() {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.18,
          ease: "power2.inOut",
          onComplete() {
            scrollToSection("solar-system");
          },
        });
      },
    });
  };

  // ─── Card click: page fade-out → navigate ─────────────────────────────────
  const handleCardClick = (path) => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => navigate(path),
    });
  };

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Root container with full-page background ──────────────────────── */}
      <div
        ref={containerRef}
        className="relative overflow-x-hidden"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Fixed overlays */}
        <Navbar onNavClick={scrollToSection} />
        <StarsBackground />

        {/* ── HERO SECTION ───────────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center"
        >
          {/* Subtle radial glow behind the title */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 80%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
            {/* Title */}
            <h1
              ref={titleRef}
              className="text-7xl md:text-9xl font-bold text-white"
              style={{
                textShadow:
                  "0 0 10px #22d3ee, 0 0 30px #22d3ee, 0 0 60px #06b6d4",
              }}
            >
              HELIOSPHERE
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-white/85 text-lg md:text-xl leading-relaxed max-w-xl"
            >
              Journey into the deep unknowns of outer space. Navigate through
              the detailed constructs of our Solar System, stand at the event
              horizon of supermassive Black Holes, and witness the violent
              majesty of exploding Supernovas — in a cinematic pixel-art
              experience.
            </p>

            {/* Explore button */}
            {/*
              hover:scale-* deliberately omitted — GSAP is the sole owner
              of the CSS transform. Mixing CSS transitions + GSAP on the same
              property causes jitter. Colour hover works via transition-colors.
            */}
            <button
              ref={buttonRef}
              onClick={handleExploreClick}
              className="mt-2 px-12 py-2.5 text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-2 border-cyan-400 transition-colors duration-300 hover:from-cyan-500 hover:to-blue-500"
              style={{
                boxShadow: "0 0 16px rgba(34,211,238,0.4)",
              }}
            >
              EXPLORE
            </button>

            {/* Scroll hint */}
            <div className="mt-8 flex flex-col items-center gap-1 opacity-50 animate-bounce">
              <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </section>

        {/* ── CATEGORIES SECTION ─────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col">

          {/* Solar System */}
          <section id="solar-system" className="w-full">
            <div
              onClick={() => handleCardClick("/SolarSystemCategories")}
              className="w-full cursor-pointer"
            >
              <SolarSystemCard
                imageRef={(el) => (solarSystemRefs.current.image = el)}
                contentRef={(el) => (solarSystemRefs.current.content = el)}
              />
            </div>
          </section>

          {/* Black Hole */}
          <section id="black-hole" className="w-full">
            <div
              onClick={() => handleCardClick("/blackHoleInfoPage")}
              className="w-full cursor-pointer"
            >
              <BlackHoleCard
                imageRef={(el) => (blackHoleRefs.current.image = el)}
                contentRef={(el) => (blackHoleRefs.current.content = el)}
              />
            </div>
          </section>

          {/* Supernova */}
          <section id="supernova" className="w-full">
            <div
              onClick={() => handleCardClick("/supernovaInfoPage")}
              className="w-full cursor-pointer"
            >
              <SupernovaCard
                imageRef={(el) => (supernovaRefs.current.image = el)}
                contentRef={(el) => (supernovaRefs.current.content = el)}
              />
            </div>
          </section>
        </div>
      </div>

    </>
  );
}
