'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import { BRUTALIST_COLORS, BRUTALIST_FONTS, BRUTALIST_ANIMATION_CONFIG } from '../_data';

interface GaugeSegment {
  label: string;
  value: number;
  color: string;
}

interface GaugeChartProps {
  data: GaugeSegment[];
  title?: string;
  size?: number;
  className?: string;
}

/**
 * Gauge/Donut Chart Component - Brutalist Style (Redesigned)
 * Thick aggressive segments with harsh animations
 */
export function GaugeChart({ data, title, size = 320, className = '' }: GaugeChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; segment: GaugeSegment } | null>(null);

  const strokeWidth = 35;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate segment paths with hard edges
  const segments = data.reduce((acc, segment, index) => {
    const previousValue = acc.reduce((sum, s) => sum + s.value, 0);
    const startAngle = (previousValue / 100) * 360 - 90;
    const endAngle = ((previousValue + segment.value) / 100) * 360 - 90;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startAngleRad);
    const y1 = center + radius * Math.sin(startAngleRad);
    const x2 = center + radius * Math.cos(endAngleRad);
    const y2 = center + radius * Math.sin(endAngleRad);

    const largeArcFlag = segment.value > 50 ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    ].join(' ');

    acc.push({
      ...segment,
      pathData,
      startAngle,
      endAngle,
    });

    return acc;
  }, [] as Array<GaugeSegment & { pathData: string; startAngle: number; endAngle: number }>);

  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const segmentPaths = svg.querySelectorAll('.gauge-segment');
    const centerText = svg.querySelector('.center-text');
    if (segmentPaths.length === 0) return;

    // Set initial state
    segmentPaths.forEach((path) => {
      const el = path as SVGPathElement;
      gsap.set(el, { strokeDashoffset: circumference });
    });
    gsap.set(centerText, { scale: 0, opacity: 0 });

    // Animate segments filling clockwise with harsh snap
    gsap.to(segmentPaths, {
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: svg,
        start: 'top 85%',
        toggleActions: BRUTALIST_ANIMATION_CONFIG.scrollTrigger.toggleActions,
      },
    });

    // Animate center text with bounce
    gsap.to(centerText, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.4,
      scrollTrigger: {
        trigger: svg,
        start: 'top 85%',
      },
    });

    return () => {
      gsap.killTweensOf(segmentPaths);
      gsap.killTweensOf(centerText);
    };
  }, [circumference]);

  const handleSegmentHover = (
    index: number,
    segment: GaugeSegment,
    event: React.MouseEvent<SVGPathElement>
  ) => {
    const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
    setHoveredSegment(index);
    setTooltipData({
      x: rect.left + rect.width / 2,
      y: rect.top,
      segment,
    });
  };

  const handleSegmentLeave = () => {
    setHoveredSegment(null);
    setTooltipData(null);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Title */}
      {title && (
        <h3
          className="mb-8 text-center uppercase"
          style={{
            fontFamily: BRUTALIST_FONTS.display,
            fontWeight: 700,
            fontSize: 'clamp(20px, 3vw, 28px)',
            letterSpacing: '0.05em',
            color: BRUTALIST_COLORS.foreground,
          }}
        >
          {title}
        </h3>
      )}

      {/* SVG Chart */}
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ fontFamily: BRUTALIST_FONTS.mono }}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`${BRUTALIST_COLORS.foreground}20`}
          strokeWidth={strokeWidth}
        />

        {/* Gauge segments */}
        {segments.map((segment, index) => {
          const isHovered = hoveredSegment === index;

          return (
            <path
              key={index}
              className="gauge-segment"
              d={segment.pathData}
              fill="none"
              stroke={isHovered ? BRUTALIST_COLORS.accent : segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              style={{
                cursor: 'pointer',
                transition: 'stroke 0.1s',
              }}
              onMouseEnter={(e) => handleSegmentHover(index, segment, e)}
              onMouseLeave={handleSegmentLeave}
            />
          );
        })}

        {/* Center text - total */}
        <g className="center-text">
          <text
            x={center}
            y={center - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={BRUTALIST_COLORS.foreground}
            fontSize="42"
            fontWeight="700"
            style={{ fontFamily: BRUTALIST_FONTS.display }}
          >
            100%
          </text>
          <text
            x={center}
            y={center + 22}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={BRUTALIST_COLORS.secondary}
            fontSize="10"
            fontWeight="700"
            style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            TOTAL
          </text>
        </g>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {data.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3"
              style={{
                background: segment.color,
                border: `2px solid ${BRUTALIST_COLORS.foreground}`,
              }}
            />
            <span
              className="text-xs font-bold uppercase"
              style={{
                fontFamily: BRUTALIST_FONTS.mono,
                color: BRUTALIST_COLORS.foreground,
                letterSpacing: '0.05em',
              }}
            >
              {segment.label}
            </span>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltipData && (
        <div
          className="fixed pointer-events-none z-50 p-4"
          style={{
            left: tooltipData.x,
            top: tooltipData.y,
            transform: 'translate(-50%, -100%)',
            background: BRUTALIST_COLORS.foreground,
            border: `3px solid ${BRUTALIST_COLORS.accent}`,
            minWidth: '140px',
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)',
          }}
        >
          <div
            className="text-xs font-bold mb-2 uppercase border-b pb-2"
            style={{
              fontFamily: BRUTALIST_FONTS.mono,
              color: BRUTALIST_COLORS.background,
              borderColor: `${BRUTALIST_COLORS.background}30`,
            }}
          >
            {tooltipData.segment.label}
          </div>
          <div
            className="text-4xl font-black"
            style={{
              fontFamily: BRUTALIST_FONTS.display,
              color: BRUTALIST_COLORS.background,
              lineHeight: '1',
            }}
          >
            {tooltipData.segment.value}%
          </div>
        </div>
      )}
    </div>
  );
}
