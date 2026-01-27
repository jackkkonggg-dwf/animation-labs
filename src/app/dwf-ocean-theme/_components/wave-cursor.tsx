'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/lib/gsap-config';

interface WaveParticle {
  element: HTMLDivElement;
  x: number;
  y: number;
  life: number;
  maxLife: number;
}

/**
 * Cursor trail wave effect
 * Creates wave-like particles that follow the cursor motion
 */
export function WaveCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<WaveParticle[]>([]);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track mouse position and velocity
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      // Calculate velocity
      mouseVelocityRef.current = {
        x: currentX - lastMousePosRef.current.x,
        y: currentY - lastMousePosRef.current.y,
      };

      lastMousePosRef.current = { x: currentX, y: currentY };

      // Create particle based on velocity magnitude
      const velocity = Math.sqrt(
        mouseVelocityRef.current.x ** 2 + mouseVelocityRef.current.y ** 2
      );

      // Only create particles if moving fast enough
      if (velocity > 2) {
        createParticle(currentX, currentY, velocity);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop for updating particles
    const animateParticles = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Clean up particles
      particlesRef.current.forEach((p) => p.element.remove());
      particlesRef.current = [];
    };
  }, []);

  const createParticle = (x: number, y: number, velocity: number) => {
    const container = containerRef.current;
    if (!container) return;

    const particle = document.createElement('div');
    particle.className = 'wave-cursor-particle';
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${Math.min(velocity * 0.5 + 4, 12)}px;
      height: ${Math.min(velocity * 0.5 + 4, 12)}px;
      background: radial-gradient(circle, rgba(255, 107, 0, 0.6) 0%, rgba(255, 107, 0, 0) 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;

    container.appendChild(particle);

    const waveParticle: WaveParticle = {
      element: particle,
      x,
      y,
      life: 0,
      maxLife: 30 + Math.random() * 20,
    };

    particlesRef.current.push(waveParticle);

    // Animate particle with GSAP
    gsap.fromTo(
      particle,
      {
        scale: 0,
        opacity: 0.8,
      },
      {
        scale: 1.5,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }
    );
  };

  const updateParticles = () => {
    const particles = particlesRef.current;

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.life++;

      // Remove dead particles
      if (particle.life >= particle.maxLife) {
        particle.element.remove();
        particles.splice(i, 1);
        continue;
      }

      // Wave motion - particles follow a sine wave pattern
      const progress = particle.life / particle.maxLife;
      const waveOffset = Math.sin(progress * Math.PI * 2) * 5;

      particle.element.style.transform = `translate(${waveOffset}px, ${waveOffset}px) scale(${1 + progress * 0.5})`;
      particle.element.style.opacity = (0.8 * (1 - progress)).toString();
    }
  };

  return <div ref={containerRef} className="wave-cursor-container pointer-events-none fixed inset-0 z-50" />;
}
