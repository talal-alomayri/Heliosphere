import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SolarSystemCard from "../component/solarSystemCard";
import BlackHoleCard from "../blackHole/blackHoleCard";
import SupernovaCard from "../supernove/supernoveCard";
import StarsBackground from "../components/StarsBackground";

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Refs for each card
  const solarSystemRefs = useRef({ image: null, content: null });
  const blackHoleRefs = useRef({ image: null, content: null });
  const supernovaRefs = useRef({ image: null, content: null });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Solar System Card - Load immediately
      if (solarSystemRefs.current.image && solarSystemRefs.current.content) {
        gsap.fromTo(
          solarSystemRefs.current.image,
          { x: "100%", opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );
        gsap.fromTo(
          solarSystemRefs.current.content,
          { x: "-100%", opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );
      }

      // 2. Black Hole Card - Scroll Trigger (MIRRORED!)
      if (blackHoleRefs.current.image && blackHoleRefs.current.content) {
        // Image flies in from LEFT (mirrored)
        gsap.fromTo(
          blackHoleRefs.current.image,
          { x: "-100%", opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: blackHoleRefs.current.image,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Content flies in from RIGHT (mirrored)
        gsap.fromTo(
          blackHoleRefs.current.content,
          { x: "100%", opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: blackHoleRefs.current.content,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // 3. Supernova Card - Scroll Trigger
      if (supernovaRefs.current.image && supernovaRefs.current.content) {
        // Image from RIGHT
        gsap.fromTo(
          supernovaRefs.current.image,
          { x: "100%", opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: supernovaRefs.current.image,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Content from LEFT
        gsap.fromTo(
          supernovaRefs.current.content,
          { x: "-100%", opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: supernovaRefs.current.content,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (path) => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => navigate(path),
    });
  };

  return (
    <div ref={containerRef} className="min-h-[200vh] relative overflow-hidden">
      <StarsBackground />
      <div className="relative z-10 flex flex-col pt-24">
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 neon-text text-center px-4">
            EXPLORE THE COSMOS
          </h1>
        </div>
        <div className="flex flex-col gap-0">
          <div
            onClick={() => handleCardClick("/SolarSystemCategories")}
            className="w-full"
          >
            <SolarSystemCard
              imageRef={(el) => (solarSystemRefs.current.image = el)}
              contentRef={(el) => (solarSystemRefs.current.content = el)}
            />
          </div>
          <div
            onClick={() => handleCardClick("/blackHoleInfoPage")}
            className="w-full"
          >
            <BlackHoleCard
              imageRef={(el) => (blackHoleRefs.current.image = el)}
              contentRef={(el) => (blackHoleRefs.current.content = el)}
            />
          </div>
          <div
            onClick={() => handleCardClick("/supernovaInfoPage")}
            className="w-full"
          >
            <SupernovaCard
              imageRef={(el) => (supernovaRefs.current.image = el)}
              contentRef={(el) => (supernovaRefs.current.content = el)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}