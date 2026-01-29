'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { STATS_DATA, NEON_COLORS } from '../_data';
import type { StatItem } from '../_data';

/**
 * Stats Section - Animated Data Visualizations
 * Features: Real-time graphs, counting animations, holographic displays
 */
export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const container = statsContainerRef.current;
    if (!section || !container) return;

    const statCards = container.querySelectorAll('.stat-card');

    // Staggered card entrance
    gsap.set(statCards, {
      opacity: 0,
      scale: 0.8,
      rotationY: -30,
    });

    gsap.to(statCards, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stats-section relative w-full py-32 px-4 md:px-12 bg-black"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0">
        <div className="grid-animation absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(123, 0, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 0, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridMove 20s linear infinite',
        }} />
      </div>

      {/* Section header */}
      <div className="relative z-10 text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{
          fontFamily: "'Courier New', monospace",
          textShadow: `0 0 20px ${NEON_COLORS.electric}`,
        }}>
          <span className="text-fuchsia-500">[</span>
          NETWORK_METRICS
          <span className="text-fuchsia-500">]</span>
        </h2>
        <p className="text-gray-400 text-lg">Real-time protocol performance data</p>
      </div>

      {/* Stats grid */}
      <div
        ref={statsContainerRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        style={{ perspective: '1000px' }}
      >
        {STATS_DATA.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}</style>
    </section>
  );
}

// ============================================================================
// STAT CARD COMPONENT
// ============================================================================

interface StatCardProps extends StatItem {}

function StatCard({ value, label, unit, trend, graphData }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const counter = counterRef.current;
    const canvas = canvasRef.current;
    if (!counter || !canvas) return;

    // Counting animation
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
    const suffix = value.replace(/[\d.]/g, '');

    gsap.to({ val: 0 }, {
      val: numericValue,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
      },
      onUpdate: function () {
        const currentVal = (this as any).targets()[0].val;
        let displayValue: string;
        if (numericValue > 1000000) {
          displayValue = (currentVal / 1000000).toFixed(1) + 'M';
        } else if (numericValue > 1000) {
          displayValue = (currentVal / 1000).toFixed(1) + 'K';
        } else {
          displayValue = Math.floor(currentVal).toString();
        }
        counter.textContent = displayValue + suffix;
      },
    });

    // Draw animated graph
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = 300;
    const height = canvas.height = 80;

    // Animate graph drawing
    let progress = 0;
    const animateGraph = () => {
      if (progress > 1) return;

      ctx.clearRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * height / 4);
        ctx.lineTo(width, i * height / 4);
        ctx.stroke();
      }

      // Draw line graph
      const points = graphData.slice(0, Math.floor(graphData.length * progress));
      const maxVal = Math.max(...graphData);
      const minVal = Math.min(...graphData);
      const range = maxVal - minVal;

      ctx.beginPath();
      ctx.strokeStyle = trend === 'up' ? NEON_COLORS.cyan : trend === 'down' ? '#ff0080' : NEON_COLORS.lime;
      ctx.lineWidth = 2;
      ctx.shadowColor = trend === 'up' ? NEON_COLORS.cyan : trend === 'down' ? '#ff0080' : NEON_COLORS.lime;
      ctx.shadowBlur = 10;

      points.forEach((val, i) => {
        const x = (i / (graphData.length - 1)) * width;
        const normalizedVal = (val - minVal) / range;
        const y = height - (normalizedVal * height * 0.8 + height * 0.1);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Fill area under graph
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = `${trend === 'up' ? 'rgba(0, 255, 255,' : trend === 'down' ? 'rgba(255, 0, 128,' : 'rgba(0, 255, 0,'}0.1)`;
      ctx.fill();

      progress += 0.02;
      requestAnimationFrame(animateGraph);
    };

    animateGraph();
  }, [graphData, trend, value]);

  const trendIcons = {
    up: '▲',
    down: '▼',
    stable: '■',
  };

  const trendColors = {
    up: 'text-cyan-400',
    down: 'text-pink-500',
    stable: 'text-green-400',
  };

  return (
    <div
      ref={cardRef}
      className="stat-card relative p-6 border border-cyan-500/30 bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden group"
      style={{
        boxShadow: `0 0 30px rgba(123, 0, 255, 0.2)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Scanning effect */}
      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="scan-beam absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{ animation: 'scanBeam 3s linear infinite' }}
        />
      </div>

      {/* Holographic shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)',
          animation: 'shimmer 2s infinite',
        }}
      />

      {/* Trend indicator */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-2xl ${trendColors[trend]}`} style={{ textShadow: `0 0 10px ${trend === 'up' ? NEON_COLORS.cyan : trend === 'down' ? '#ff0080' : NEON_COLORS.lime}` }}>
          {trendIcons[trend]}
        </span>
        <span className="text-xs text-gray-500 font-mono">LIVE_FEED</span>
      </div>

      {/* Counter */}
      <div className="mb-4">
        <span ref={counterRef} className="text-4xl md:text-5xl font-bold text-white" style={{
          fontFamily: "'Courier New', monospace",
          textShadow: `0 0 20px ${NEON_COLORS.cyan}`,
        }}>
          {value}
        </span>
        <span className="text-sm text-gray-500 ml-2">{unit}</span>
      </div>

      {/* Label */}
      <p className="text-xs text-gray-400 mb-4 font-mono tracking-wider">{label}</p>

      {/* Graph canvas */}
      <canvas ref={canvasRef} className="w-full h-20 rounded" />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-cyan-400" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-fuchsia-500" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-fuchsia-500" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-cyan-400" />

      {/* Data points */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>

      <style jsx>{`
        @keyframes scanBeam {
          0% { top: 0; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}
