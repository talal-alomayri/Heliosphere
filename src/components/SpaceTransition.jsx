import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import carSpacePixel from '../assets/images/car-space-pixel.webp';

export default function SpaceTransition({ isActive, onComplete }) {
  const containerRef = useRef(null);
  const shipRef = useRef(null);
  const starsContainerRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    const ship = shipRef.current;
    const starsContainer = starsContainerRef.current;
    if (!container || !ship || !starsContainer) return;

    // Clear any existing stars first
    starsContainer.innerHTML = '';
    starsRef.current = [];

    // Create 200 stars for warp effect
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'transition-star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 4 + 1}px`;
      star.style.height = `${Math.random() * 4 + 1}px`;
      star.style.opacity = Math.random() * 0.8 + 0.2;
      starsContainer.appendChild(star);
      starsRef.current.push(star);
    }

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 0.0s - 0.5s: Fade in transition screen
    tl.fromTo(
      container,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      0
    );

    // 0.5s - 2.5s: Spaceship shake and scale up, stars warp
    const shakeTl = gsap.timeline();
    for (let i = 0; i < 40; i++) {
      shakeTl.to(ship, {
        x: Math.random() * 8 - 4,
        y: Math.random() * 8 - 4,
        duration: 0.05,
        ease: 'none'
      });
    }
    tl.add(shakeTl, 0.5);

    tl.to(ship, {
      scale: 1.5,
      duration: 2,
      ease: 'power2.in'
    }, 0.5);

    // Stars warp effect
    starsRef.current.forEach((star, index) => {
      tl.to(star, {
        y: '+=1000',
        x: `+=${(Math.random() - 0.5) * 200}`,
        opacity: 0,
        scale: 3,
        duration: Math.random() * 0.5 + 0.5,
        ease: 'power2.in',
        repeat: 3,
        repeatRefresh: true
      }, 0.5 + (index % 20) * 0.05);
    });

    // 2.5s - 3.0s: Fade out
    tl.to(container, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    }, 2.5);

    return () => {
      tl.kill();
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-gradient-to-b from-[#000000] via-[#0a0a2e] to-[#000000] flex items-center justify-center overflow-hidden"
    >
      {/* Stars container for warp effect */}
      <div
        ref={starsContainerRef}
        className="absolute inset-0 overflow-hidden"
      />

      {/* Spaceship */}
      <img
        ref={shipRef}
        src={carSpacePixel}
        alt="Pixel spaceship"
        className="relative z-10 max-h-[40vh] max-w-[80vw] object-contain"
      />
    </div>
  );
}
