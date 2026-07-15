import { useState } from "react";
import supernovaImg from "../assets/images/super-nove-pixel.webp";

export default function SupernovaCard({ imageRef, contentRef }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full min-h-[400px] md:h-96 flex flex-col md:block overflow-hidden cursor-pointer group bg-black/40 md:bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image on Right, Fades to Left */}
      <div ref={imageRef} className="relative md:absolute md:right-0 md:top-0 w-full h-64 md:h-full md:w-1/2 order-1 md:order-none">
        <img 
          src={supernovaImg} 
          alt="supernova" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{
            maskImage: "linear-gradient(to left, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black 70%, transparent 100%)"
          }}
        />
      </div>

      {/* Left-Aligned Content */}
      <div 
        ref={contentRef}
        className="relative md:absolute md:left-0 md:top-0 w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center px-6 py-8 md:px-8 order-2 md:order-none"
      >
        <h2 
          className="text-4xl md:text-7xl font-bold text-white mb-4 transition-all duration-500 ease-out"
          style={{
            opacity: isHovered ? 1 : 0.5,
            transform: isHovered ? "translateX(0)" : "translateX(-8px)",
            textShadow: isHovered
              ? "0 0 5px #ef4444, 0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 40px #ef4444"
              : "0 0 2px #ef4444"
          }}
        >
          SUPERNOVA
        </h2>
        <p 
          className="text-red-100 text-lg md:text-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.9 : 0.3
          }}
        >
          Witness the explosive death of stars that forge the heaviest elements in the universe.
        </p>
      </div>
    </div>
  );
}