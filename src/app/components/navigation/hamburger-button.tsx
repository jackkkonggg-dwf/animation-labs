'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function HamburgerButton({ isOpen, onToggle }: HamburgerButtonProps) {
  const topLineRef = useRef<HTMLSpanElement>(null);
  const middleLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (isOpen) {
      // Animate to X with aggressive motion
      gsap.to(topLineRef.current, {
        rotate: 45,
        y: 9,
        width: 28,
        duration: 0.25,
        ease: 'power4.inOut',
      });
      gsap.to(middleLineRef.current, {
        scaleX: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      });
      gsap.to(bottomLineRef.current, {
        rotate: -45,
        y: -9,
        width: 28,
        duration: 0.25,
        ease: 'power4.inOut',
      });
      gsap.to(containerRef.current, {
        rotation: 90,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    } else {
      // Animate back to hamburger
      gsap.to(topLineRef.current, {
        rotate: 0,
        y: 0,
        width: 24,
        duration: 0.25,
        ease: 'power4.inOut',
      });
      gsap.to(middleLineRef.current, {
        scaleX: 1,
        duration: 0.2,
        ease: 'power2.inOut',
      });
      gsap.to(bottomLineRef.current, {
        rotate: 0,
        y: 0,
        width: 20,
        duration: 0.25,
        ease: 'power4.inOut',
      });
      gsap.to(containerRef.current, {
        rotation: 0,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    }
  }, [isOpen]);

  return (
    <button
      ref={containerRef}
      onClick={onToggle}
      className="relative w-14 h-12 flex flex-col items-center justify-center gap-1.5 z-50 group"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {/* Industrial corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-orange-500/50" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-orange-500/50" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-orange-500/50" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-orange-500/50" />

      {/* Menu lines - different widths for asymmetrical look */}
      <span
        ref={topLineRef}
        className="w-6 h-[3px] bg-orange-500 origin-center block"
      />
      <span
        ref={middleLineRef}
        className="w-6 h-[3px] bg-orange-500 origin-center block"
      />
      <span
        ref={bottomLineRef}
        className="w-5 h-[3px] bg-orange-500 origin-center block"
      />
    </button>
  );
}
