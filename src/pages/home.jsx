import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import StarsBackground from "../components/StarsBackground";
import skyNightPixel from "../assets/images/sky-night-pixel.png";
import carSpacePixelVideo from "../assets/images/car-space-pixel.mp4";

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const descriptionRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title: fade in from left, scale up
      gsap.fromTo(
        titleRef.current,
        { x: "-100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Button: fade in from left after title
      gsap.fromTo(
        buttonRef.current,
        { x: "-100%", opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)", delay: 0.3 }
      );

      // Description: fade in from RIGHT!
      gsap.fromTo(
        descriptionRef.current,
        { x: "100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = () => {
    setIsTransitioning(true);
  };

  const handleVideoEnded = () => {
    navigate("/categories");
  };

  return (
    <>
      <div
        ref={containerRef}
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url(${skyNightPixel})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <Navbar />
        <StarsBackground />
        <div className="relative z-10 min-h-screen px-8 pt-24">
          {/* Top-Left Area */}
          <div className="flex flex-col items-start justify-start pt-4">
            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold text-cyan-600 mb-2"
              style={{
                textShadow: "0 0 10px #22d3ee, 0 0 10px #22d3ee"
              }}
            >
              HELIOSPHERE
            </h1>
            <button
              ref={buttonRef}
              onClick={handleExploreClick}
              className="px-10 py-1.5 text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-2 border-cyan-400 transition-all duration-300 hover:scale-105 hover:from-cyan-500 hover:to-blue-500"
            >
              EXPLORE
            </button>
          </div>

          {/* Bottom-Right Area */}
          <div
            ref={descriptionRef}
            className="absolute bottom-12 right-8 max-w-xl"
          >
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Journey into the deep unknowns of outer space. Navigate through the detailed constructs of our Solar System, stand at the event horizon of supermassive Black Holes, and witness the violent majesty of exploding Supernovas in a cinematic pixel art experience.
            </p>
          </div>
        </div>
      </div>

      {/* Video Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <video
            src={carSpacePixelVideo}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="max-w-full max-h-full w-full h-full object-cover"
          />
        </div>
      )}
    </>
  );
}