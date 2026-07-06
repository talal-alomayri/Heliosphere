import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/Navbar';
import StarsBackground from '../../components/StarsBackground';
import sunImg from '../../assets/images/sun-pixel.png';
import innerPlanetsImg from '../../assets/images/inner-planets-pixel.png';
import outerPlanetsImg from '../../assets/images/outer-planets-pixel.png';

gsap.registerPlugin(ScrollTrigger);

export default function SolarSystemCategories() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // ── Individual element refs for directional ScrollTrigger animations ────────
  // Each card is split into two halves: image + content.
  // Sun:          image slides from RIGHT, content slides from LEFT  (mirrored below)
  // Inner Planets: image slides from LEFT,  content slides from RIGHT
  // Outer Planets: image slides from RIGHT, content slides from LEFT  (same as Sun)
  const sunImageRef       = useRef(null);
  const sunContentRef     = useRef(null);
  const innerImageRef     = useRef(null);
  const innerContentRef   = useRef(null);
  const outerImageRef     = useRef(null);
  const outerContentRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Helper: register one slide-in pair ──────────────────────────────────
      const slide = (el, fromX, trigger) => {
        gsap.fromTo(
          el,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trigger ?? el,
              start: 'top 80%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      };

      // ── Sun card (image from RIGHT, content from LEFT) ─────────────────────
      if (sunImageRef.current && sunContentRef.current) {
        slide(sunImageRef.current,   '100%', sunImageRef.current);
        slide(sunContentRef.current, '-100%', sunContentRef.current);
      }

      // ── Inner Planets card (image from LEFT, content from RIGHT) ───────────
      if (innerImageRef.current && innerContentRef.current) {
        slide(innerImageRef.current,   '-100%', innerImageRef.current);
        slide(innerContentRef.current, '100%',  innerContentRef.current);
      }

      // ── Outer Planets card (image from RIGHT, content from LEFT) ───────────
      if (outerImageRef.current && outerContentRef.current) {
        slide(outerImageRef.current,   '100%', outerImageRef.current);
        slide(outerContentRef.current, '-100%', outerContentRef.current);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── Card click: page fade-out → navigate ────────────────────────────────────
  const handleClick = (path) => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => navigate(path),
    });
  };

  // ── Reusable full-width card layout (image + content side-by-side) ──────────
  // `imageRight` = true  → image on right, content on left  (Sun / Outer Planets)
  // `imageRight` = false → image on left,  content on right (Inner Planets)
  const SectionCard = ({
    imageRef,
    contentRef,
    imageRight,
    imageSrc,
    imageAlt,
    title,
    description,
    accentClass,     // Tailwind color token, e.g. "yellow-400"
    bgClass,         // e.g. "bg-yellow-950/60"
    gradientFrom,    // CSS color string for the mask gradient start
    onClick,
  }) => {
    const imageNode = (
      <div
        ref={imageRef}
        className="relative w-full md:w-1/2 h-64 md:h-80 overflow-hidden"
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{
            maskImage: imageRight
              ? 'linear-gradient(to left, black 30%, transparent 100%)'
              : 'linear-gradient(to right, black 30%, transparent 100%)',
            WebkitMaskImage: imageRight
              ? 'linear-gradient(to left, black 30%, transparent 100%)'
              : 'linear-gradient(to right, black 30%, transparent 100%)',
          }}
        />
      </div>
    );

    const textNode = (
      <div
        ref={contentRef}
        className={`flex-1 flex flex-col justify-center px-10 py-8 ${imageRight ? 'text-left' : 'text-right'}`}
      >
        <h2
          className={`text-4xl md:text-6xl font-bold text-${accentClass} mb-4 transition-all duration-500 ease-out neon-text`}
        >
          {title}
        </h2>
        <p className="text-white/70 text-lg md:text-xl leading-relaxed">
          {description}
        </p>
      </div>
    );

    return (
      <div
        onClick={onClick}
        className={`group relative w-full flex flex-col md:flex-row items-stretch ${bgClass} overflow-hidden cursor-pointer border-b border-white/10`}
        style={{ minHeight: '20rem' }}
      >
        {/* Dark gradient overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none z-10" />

        {imageRight ? (
          <>
            {textNode}
            {imageNode}
          </>
        ) : (
          <>
            {imageNode}
            {textNode}
          </>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <StarsBackground />

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 neon-text text-center px-4">
          SOLAR SYSTEM
        </h1>
      </div>

      {/* ── Section cards ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col">

        {/* The Sun — image from RIGHT */}
        <SectionCard
          imageRef={sunImageRef}
          contentRef={sunContentRef}
          imageRight={true}
          imageSrc={sunImg}
          imageAlt="The Sun"
          title="THE SUN"
          description="The blazing heart of our Solar System — a nearly perfect sphere of hot plasma powered by nuclear fusion, radiating light and heat that sustains all life on Earth."
          accentClass="yellow-400"
          bgClass="bg-yellow-950/60"
          onClick={() => handleClick('/solarSystem/sunPage')}
        />

        {/* Inner Planets — image from LEFT */}
        <SectionCard
          imageRef={innerImageRef}
          contentRef={innerContentRef}
          imageRight={false}
          imageSrc={innerPlanetsImg}
          imageAlt="Inner Planets"
          title="INNER PLANETS"
          description="Mercury, Venus, Earth, and Mars — the four rocky worlds closest to the Sun, each with their own extreme climates, geological histories, and cosmic secrets."
          accentClass="blue-400"
          bgClass="bg-blue-950/60"
          onClick={() => handleClick('/solarSystem/innerPlanetsPage')}
        />

        {/* Outer Planets — image from RIGHT */}
        <SectionCard
          imageRef={outerImageRef}
          contentRef={outerContentRef}
          imageRight={true}
          imageSrc={outerPlanetsImg}
          imageAlt="Outer Planets"
          title="OUTER PLANETS"
          description="Jupiter, Saturn, Uranus, and Neptune — the colossal gas and ice giants of the outer Solar System, each crowned with rings, dozens of moons, and violent storms."
          accentClass="purple-400"
          bgClass="bg-purple-950/60"
          onClick={() => handleClick('/solarSystem/outerPlanetsPage')}
        />

      </div>
    </div>
  );
}