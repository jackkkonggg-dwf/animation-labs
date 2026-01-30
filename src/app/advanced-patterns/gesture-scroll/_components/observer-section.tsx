'use client';

import { useRef, useState, useEffect, useTransition } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, Observer } from '@/lib/gsap-config';

export function ObserverSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const scrollDirectionDisplayRef = useRef<HTMLSpanElement>(null);
  const hoveredBoxRef = useRef<number | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    hoveredBoxRef.current = hoveredBox;
  }, [hoveredBox]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const boxes = boxRefs.current.filter(Boolean) as HTMLDivElement[];

    const boxBounds = new Map<HTMLDivElement, DOMRect>();
    const updateBounds = () => {
      boxes.forEach(box => {
        boxBounds.set(box, box.getBoundingClientRect());
      });
    };
    updateBounds();

    const scrollObserver = Observer.create({
      target: window,
      type: 'scroll',
      onUp: () => {
        if (scrollDirectionDisplayRef.current) {
          scrollDirectionDisplayRef.current.textContent = 'UP';
        }
        startTransition(() => setScrollDirection('up'));
      },
      onDown: () => {
        if (scrollDirectionDisplayRef.current) {
          scrollDirectionDisplayRef.current.textContent = 'DOWN';
        }
        startTransition(() => setScrollDirection('down'));
      },
    });

    const boxObservers: Array<ReturnType<typeof Observer.create>> = [];
    boxes.forEach((box, i) => {
      const observer = Observer.create({
        target: box,
        type: 'pointer',
        onMove: (self) => {
          if (hoveredBoxRef.current !== i) return;
          if (self.x === undefined || self.y === undefined) return;

          const bounds = boxBounds.get(box);
          if (!bounds) return;

          const x = ((self.x - bounds.left) / bounds.width - 0.5) * 50;
          const y = ((self.y - bounds.top) / bounds.height - 0.5) * 50;

          gsap.to(box, {
            rotationX: -y,
            rotationY: x,
            duration: 0.3,
            ease: 'power1.out',
          });
        },
      });
      boxObservers.push(observer);

      gsap.from(box, {
        y: 100,
        opacity: 0,
        delay: i * 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    const resizeObserver = new ResizeObserver(updateBounds);
    boxes.forEach(box => resizeObserver.observe(box));

    return () => {
      scrollObserver.kill();
      boxObservers.forEach(obs => obs.kill());
      resizeObserver.disconnect();
      gsap.killTweensOf(boxes);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-zinc-950">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-4">
          GSAP Observer Plugin
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-12">
          Observer
          <span className="block text-orange-500">Detection</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              ref={(el) => { boxRefs.current[i] = el; }}
              className="observer-box aspect-square bg-zinc-800 border-2 border-zinc-700 rounded-xl flex items-center justify-center cursor-pointer"
              style={{ perspective: '500px', willChange: 'transform, background-color' }}
              onMouseEnter={() => {
                setHoveredBox(i);
                const box = boxRefs.current[i];
                if (box) {
                  gsap.to(box, {
                    scale: 1.05,
                    backgroundColor: '#f97316',
                    duration: 0.3,
                    ease: 'power2.out',
                  });
                }
              }}
              onMouseLeave={() => {
                setHoveredBox(null);
                const box = boxRefs.current[i];
                if (box) {
                  gsap.to(box, {
                    scale: 1,
                    rotationX: 0,
                    rotationY: 0,
                    backgroundColor: '#27272a',
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)',
                  });
                }
              }}
            >
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">0{i + 1}</div>
                <div className={`text-xs uppercase ${hoveredBox === i ? 'text-white' : 'text-zinc-500'}`}>
                  {hoveredBox === i ? '3D Tilt!' : 'Hover me'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-zinc-400">
            Scrolling: <span ref={scrollDirectionDisplayRef} className="font-mono text-orange-500">{scrollDirection?.toUpperCase() || 'NONE'}</span>
          </p>
          <p className="text-zinc-400 mt-2">
            Hovered box: <span className="font-mono text-orange-500">{hoveredBox !== null ? `0${hoveredBox + 1}` : 'None'}</span>
          </p>
          <p className="text-zinc-500 text-sm mt-2">
            Observer tracks scroll direction and 3D tilt on hover
          </p>
        </div>
      </div>
    </section>
  );
}
