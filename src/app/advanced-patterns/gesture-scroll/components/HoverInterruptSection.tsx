'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

export function HoverInterruptSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = {
      circle: container.querySelector('.interrupt-circle') as HTMLElement,
      text: container.querySelector('.interrupt-text') as HTMLElement,
    };

    const rotationTween = gsap.to(elements.circle, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: 'none',
    });

    const pulseTween = gsap.to(elements.circle, {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    const colorTween = gsap.to(elements.circle, {
      backgroundColor: '#3b82f6',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    const handleMouseEnter = () => {
      setIsHovering(true);

      rotationTween.pause();
      pulseTween.pause();
      colorTween.pause();

      gsap.to(elements.circle, {
        scale: 1.3,
        rotation: '+=45',
        backgroundColor: '#f97316',
        duration: 0.3,
        ease: 'back.out(1.7)',
      });

      gsap.to(elements.text, {
        scale: 1.1,
        color: '#f97316',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);

      rotationTween.resume();
      pulseTween.resume();
      colorTween.resume();

      gsap.to(elements.circle, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });

      gsap.to(elements.text, {
        scale: 1,
        color: '#ffffff',
        duration: 0.3,
      });
    };

    elements.circle.addEventListener('mouseenter', handleMouseEnter);
    elements.circle.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      elements.circle.removeEventListener('mouseenter', handleMouseEnter);
      elements.circle.removeEventListener('mouseleave', handleMouseLeave);
      rotationTween.kill();
      pulseTween.kill();
      colorTween.kill();
      gsap.killTweensOf([elements.circle, elements.text]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-br from-zinc-950 via-zinc-900 to-purple-950">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-purple-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          Animation Interruption
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Hover to
          <span className="block text-purple-500">Interrupt</span>
        </h2>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="interrupt-circle w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all" style={{ willChange: 'transform' }}>
            <div className="interrupt-text text-white text-center">
              <div className="text-4xl mb-2">{isHovering ? '⏸️' : '▶️'}</div>
              <div className="text-sm font-mono uppercase">
                {isHovering ? 'Paused' : 'Animating'}
              </div>
            </div>
          </div>

          <p className="mt-12 text-zinc-400 text-center max-w-md">
            Hover over the circle to interrupt the continuous rotation, pulse, and color cycle animations.
            The animations will resume when you mouse out.
          </p>
        </div>
      </div>
    </section>
  );
}
