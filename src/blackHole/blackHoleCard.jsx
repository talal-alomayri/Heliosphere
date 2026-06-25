import { useState } from "react";
import blackHoleImg from "../assets/images/black-hole-pixel.png";

export default function BlackHoleCard({ imageRef, contentRef }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-96 overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image on Left, Fades to Right */}
      <div ref={imageRef} className="absolute left-0 top-0 w-1/2 h-full">
        <img 
          src={blackHoleImg} 
          alt="black-hole" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{
            maskImage: "linear-gradient(to right, black 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 30%, transparent 100%)"
          }}
        />
      </div>

      {/* Right-Aligned Content */}
      <div 
        ref={contentRef}
        className="absolute right-0 top-0 w-1/2 h-full flex flex-col justify-center px-8 text-right"
      >
        <h2 
          className="text-4xl md:text-6xl font-bold text-purple-300 mb-4 transition-all duration-500 ease-out"
          style={{
            opacity: isHovered ? 1 : 0.5,
            transform: isHovered ? "translateX(0)" : "translateX(8px)",
            textShadow: isHovered
              ? "0 0 5px #9333ea, 0 0 10px #9333ea, 0 0 20px #9333ea, 0 0 40px #9333ea"
              : "0 0 2px #9333ea"
          }}
        >
          BLACK HOLE
        </h2>
        <p 
          className="text-purple-100 text-lg md:text-xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.9 : 0.3
          }}
        >
          Discover the infinite density of black holes and how they warp space and time.
        </p>
      </div>
    </div>
  );
}