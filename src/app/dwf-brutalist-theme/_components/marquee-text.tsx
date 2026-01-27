'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/lib/gsap-config';
import { BRUTALIST_MARQUEE_TEXT, BRUTALIST_COLORS, BRUTALIST_FONTS, BRUTALIST_ANIMATION_CONFIG } from '../_data';

interface MarqueeTextProps {
  className?: string;
}

/**
 * Marquee Text Component (Redesigned)
 * Aggressive horizontal scrolling with mono font aesthetic
 */
export function MarqueeText({ className = '' }: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    // Duplicate content for seamless looping
    const content = wrapper.innerHTML;
    wrapper.innerHTML = content + content + content; // Triple for smooth looping

    // Calculate animation duration based on content width
    const calculateDuration = () => {
      const contentWidth = wrapper.scrollWidth / 3; // Width of one set
      return contentWidth / BRUTALIST_ANIMATION_CONFIG.marquee.speed;
    };

    const duration = calculateDuration();

    // Animate the marquee - harsh constant motion
    gsap.to(wrapper, {
      x: `-33.333%`, // Move one-third (one complete set)
      duration: duration,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      gsap.killTweensOf(wrapper);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{
        background: BRUTALIST_COLORS.background,
        borderTop: `2px solid ${BRUTALIST_COLORS.accent}`,
        borderBottom: `2px solid ${BRUTALIST_COLORS.accent}`,
      }}
    >
      <div
        ref={wrapperRef}
        className="inline-block py-3"
        style={{
          fontFamily: BRUTALIST_FONTS.mono,
          fontWeight: 500,
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: BRUTALIST_COLORS.foreground,
        }}
      >
        {BRUTALIST_MARQUEE_TEXT.map((text, index) => (
          <span
            key={index}
            className="inline-block px-6"
            style={{
              borderRight: index < BRUTALIST_MARQUEE_TEXT.length - 1 ? `1px solid ${BRUTALIST_COLORS.foreground}40` : 'none',
            }}
          >
            {index % 2 === 0 ? (
              <span style={{ color: BRUTALIST_COLORS.accent }}>{text}</span>
            ) : (
              <span>{text}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
