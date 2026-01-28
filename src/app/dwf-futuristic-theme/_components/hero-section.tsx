'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { HERO_DATA, NEON_COLORS } from '../_data';

/**
 * Hero Section - Futuristic Cyberpunk Interface
 * Features: Glitch text, Matrix rain, Particle systems, Holographic effects
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingText, setTypingText] = useState('');

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Random cyan highlights
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#00ffff';
        } else if (Math.random() > 0.95) {
          ctx.fillStyle = '#ff00ff';
        } else {
          ctx.fillStyle = '#00ff00';
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(drawMatrix, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    const fullText = HERO_DATA.typingText[typingIndex];
    let i = 0;

    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypingText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setTypingIndex((prev) => (prev + 1) % HERO_DATA.typingText.length);
          setTypingText('');
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [typingIndex]);

  // Particle system
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: ${Math.random() > 0.5 ? NEON_COLORS.cyan : NEON_COLORS.magenta};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
      `;
      container.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  // GSAP animations
  useGSAP(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const grid = gridRef.current;

    if (!section) return;

    // Perspective grid animation
    if (grid) {
      gsap.to(grid, {
        backgroundPosition: '0px 100px',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }

    // Glitch title animation
    if (title) {
      const chars = title.querySelectorAll('.glitch-char');
      gsap.set(chars, { opacity: 0, y: -50, rotationX: 90 });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        delay: 0.5,
      });

      // Continuous glitch effect
      setInterval(() => {
        const randomChars = Array.from(chars).sort(() => Math.random() - 0.5).slice(0, 3);
        randomChars.forEach(char => {
          gsap.to(char, {
            x: Math.random() * 10 - 5,
            y: Math.random() * 10 - 5,
            skewX: Math.random() * 20 - 10,
            color: Math.random() > 0.5 ? NEON_COLORS.magenta : NEON_COLORS.cyan,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
          });
        });
      }, 2000);
    }

    // Subtitle fade in
    if (subtitle) {
      gsap.set(subtitle, { opacity: 0, y: 30 });
      gsap.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out',
      });
    }

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Perspective grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
        }}
      />

      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Glowing orbs */}
      <div className="glowing-orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'pulse 4s ease-in-out infinite',
      }} />
      <div className="glowing-orb absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(255, 0, 255, 0.3) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'pulse 4s ease-in-out infinite 2s',
      }} />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Glitch title */}
        <h1
          ref={titleRef}
          className="glitch-title text-7xl md:text-9xl font-bold mb-8 leading-none"
          style={{
            fontFamily: "'Courier New', monospace",
            color: '#ffffff',
            textShadow: `
              0 0 10px ${NEON_COLORS.cyan},
              0 0 20px ${NEON_COLORS.cyan},
              0 0 40px ${NEON_COLORS.cyan},
              0 0 80px ${NEON_COLORS.cyan}
            `,
          }}
        >
          {'DWF LABS'.split('').map((char, i) => (
            <span key={i} className="glitch-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-8">
          <p className="text-cyan-400 text-lg md:text-xl tracking-[0.3em] uppercase mb-4">
            {HERO_DATA.subtitle}
          </p>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {HERO_DATA.description}
          </p>
        </div>

        {/* Typing status */}
        <div className="mb-12 h-8">
          <span className="text-green-400 font-mono text-sm">{typingText}</span>
          <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all duration-300 group">
            <span className="relative z-10">{HERO_DATA.ctaText}</span>
            <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
          </button>
          <button className="relative px-8 py-4 bg-transparent border-2 border-fuchsia-500 text-fuchsia-500 font-bold uppercase tracking-wider hover:bg-fuchsia-500 hover:text-black transition-all duration-300 group">
            <span className="relative z-10">{HERO_DATA.secondaryCta}</span>
            <div className="absolute inset-0 bg-fuchsia-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
          </button>
        </div>
      </div>

      {/* Scanning line */}
      <div className="scanning-line absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scan-line absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
          style={{
            animation: 'scan 3s linear infinite',
          }}
        />
      </div>

      {/* Corner decorations */}
      <div className="corner-decoration absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-cyan-400" />
      <div className="corner-decoration absolute top-8 right-8 w-32 h-32 border-r-2 border-t-2 border-fuchsia-500" />
      <div className="corner-decoration absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-fuchsia-500" />
      <div className="corner-decoration absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-cyan-400" />

      {/* Data streams */}
      <div className="data-stream absolute left-8 top-1/2 transform -translate-y-1/2 text-xs font-mono text-cyan-600 opacity-50">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="mb-1">{Math.random().toString(2).substring(2, 20)}</div>
        ))}
      </div>
      <div className="data-stream absolute right-8 top-1/2 transform -translate-y-1/2 text-xs font-mono text-fuchsia-600 opacity-50 text-right">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="mb-1">{Math.random().toString(16).substring(2, 18)}</div>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
}
