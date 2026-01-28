'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

export default function TimelineOrchestrationPage() {
  const masterTimelineRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);
  const childTimelinesRef = useRef<ReturnType<typeof gsap.timeline>[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const scrubberHandleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentLabel, setCurrentLabel] = useState<string>('');

  useGSAP(() => {
    const container = containerRef.current;
    const scrubber = scrubberRef.current;
    const scrubberHandle = scrubberHandleRef.current;
    const progressDisplay = progressRef.current;

    if (!container || !scrubber || !scrubberHandle || !progressDisplay) return;

    // Create child timelines
    const introTl = gsap.timeline({ paused: true });
    const spinTl = gsap.timeline({ paused: true });
    const bounceTl = gsap.timeline({ paused: true });
    const scaleTl = gsap.timeline({ paused: true });
    const colorTl = gsap.timeline({ paused: true });
    const finaleTl = gsap.timeline({ paused: true });

    // INTRO section - fade in and slide
    const introBox = container.querySelector('.intro-box') as HTMLElement;
    introTl
      .set(introBox, { opacity: 0, x: -100 })
      .to(introBox, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' })
      .to(introBox, { scale: 1.1, duration: 0.3, ease: 'back.out(1.7)' });

    // SPIN section - rotation animations
    const spinBox = container.querySelector('.spin-box') as HTMLElement;
    spinTl
      .set(spinBox, { rotation: 0, borderColor: '#f97316' })
      .to(spinBox, { rotation: 360, duration: 1, ease: 'power2.inOut' })
      .to(spinBox, { rotation: 720, duration: 0.8, ease: 'back.out(1.5)' });

    // BOUNCE section - y-axis bouncing
    const bounceBox = container.querySelector('.bounce-box') as HTMLElement;
    bounceTl
      .set(bounceBox, { y: 0 })
      .to(bounceBox, { y: -50, duration: 0.3, ease: 'power2.out' })
      .to(bounceBox, { y: 0, duration: 0.3, ease: 'bounce.out' })
      .to(bounceBox, { y: -80, duration: 0.4, ease: 'power2.out' })
      .to(bounceBox, { y: 0, duration: 0.4, ease: 'bounce.out' });

    // SCALE section - scale pulsing
    const scaleBox = container.querySelector('.scale-box') as HTMLElement;
    scaleTl
      .set(scaleBox, { scale: 1 })
      .to(scaleBox, { scale: 1.5, duration: 0.4, ease: 'back.out(2)' })
      .to(scaleBox, { scale: 0.8, duration: 0.3, ease: 'power2.inOut' })
      .to(scaleBox, { scale: 1.2, duration: 0.3, ease: 'elastic.out(1, 0.5)' })
      .to(scaleBox, { scale: 1, duration: 0.2 });

    // COLOR section - color shifting
    const colorBox = container.querySelector('.color-box') as HTMLElement;
    colorTl
      .set(colorBox, { backgroundColor: '#f97316' })
      .to(colorBox, { backgroundColor: '#ef4444', duration: 0.5 })
      .to(colorBox, { backgroundColor: '#eab308', duration: 0.5 })
      .to(colorBox, { backgroundColor: '#22c55e', duration: 0.5 })
      .to(colorBox, { backgroundColor: '#3b82f6', duration: 0.5 })
      .to(colorBox, { backgroundColor: '#f97316', duration: 0.5 });

    // FINALE section - all elements animate
    const allBoxes = container.querySelectorAll('.finale-box');
    finaleTl
      .set(allBoxes, { opacity: 0, scale: 0 })
      .to(allBoxes, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: { each: 0.1, from: 'center' },
        ease: 'back.out(1.5)',
      })
      .to(allBoxes, {
        rotation: '+=180',
        scale: 1.2,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.inOut',
      })
      .to(allBoxes, {
        scale: 1,
        rotation: '+=180',
        duration: 0.3,
        stagger: 0.05,
        ease: 'elastic.out(1, 0.4)',
      });

    childTimelinesRef.current = [introTl, spinTl, bounceTl, scaleTl, colorTl, finaleTl];

    // Create master timeline with labels
    const masterTl = gsap.timeline({
      paused: false,
      repeat: 0,
      onStart: () => {
        console.log('Master timeline started');
        setIsPlaying(true);
      },
      onUpdate: () => {
        const progress = masterTl.progress();
        if (progressDisplay) {
          progressDisplay.textContent = `${(progress * 100).toFixed(0)}%`;
        }
        if (scrubberHandle) {
          scrubberHandle.style.left = `${progress * 100}%`;
        }

        // Find current label
        const labels = masterTl.getLabelsArray();
        const currentLabelObj = labels.find((label: { label: string; time: number }) => {
          const labelTime = label.time / masterTl.duration();
          return progress >= labelTime && progress < labelTime + 0.15;
        });
        if (currentLabelObj) {
          setCurrentLabel(currentLabelObj.label);
        } else {
          setCurrentLabel('');
        }
      },
      onComplete: () => {
        console.log('Master timeline completed');
        setIsPlaying(false);
      },
      onReverseComplete: () => {
        console.log('Master timeline reverse completed');
        setIsPlaying(false);
      },
    });

    // Add labels and child timelines with position parameters
    masterTl
      .addLabel('intro')
      .add(introTl.play(), 'intro')
      .addLabel('spin', '>')
      .add(spinTl.play(), 'spin')
      .addLabel('bounce', '>')
      .add(bounceTl.play(), 'bounce')
      .addLabel('scale', '>')
      .add(scaleTl.play(), 'scale')
      .addLabel('color', '>')
      .add(colorTl.play(), 'color')
      .addLabel('finale', '>')
      .add(finaleTl.play(), 'finale')
      .addLabel('end', '>0.5');

    masterTimelineRef.current = masterTl;

    // Scrubber drag functionality
    let isDragging = false;

    const onScrubberDown = (e: MouseEvent) => {
      isDragging = true;
      e.preventDefault();
      masterTl.pause();
      setIsPlaying(false);
    };

    const onScrubberMove = (e: MouseEvent) => {
      if (!isDragging || !scrubber) return;

      const rect = scrubber.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const progress = x / rect.width;

      masterTl.progress(progress);
    };

    const onScrubberUp = () => {
      isDragging = false;
    };

    scrubberHandle.addEventListener('mousedown', onScrubberDown);
    window.addEventListener('mousemove', onScrubberMove);
    window.addEventListener('mouseup', onScrubberUp);

    // Cleanup
    return () => {
      scrubberHandle.removeEventListener('mousedown', onScrubberDown);
      window.removeEventListener('mousemove', onScrubberMove);
      window.removeEventListener('mouseup', onScrubberUp);

      masterTl.kill();
      childTimelinesRef.current.forEach((tl) => tl.kill());
      childTimelinesRef.current = [];
      masterTimelineRef.current = null;
    };
  }, []);

  const handlePlay = () => {
    if (masterTimelineRef.current) {
      masterTimelineRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (masterTimelineRef.current) {
      masterTimelineRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleReverse = () => {
    if (masterTimelineRef.current) {
      masterTimelineRef.current.reverse();
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    if (masterTimelineRef.current) {
      masterTimelineRef.current.restart();
      setIsPlaying(true);
    }
  };

  const handlePlayFromLabel = (label: string) => {
    if (masterTimelineRef.current) {
      masterTimelineRef.current.play(label);
      setIsPlaying(true);
    }
  };

  const handleChildPlay = (index: number) => {
    const childTl = childTimelinesRef.current[index];
    if (childTl) {
      childTl.restart();
    }
  };

  const handleChildPause = (index: number) => {
    const childTl = childTimelinesRef.current[index];
    if (childTl) {
      childTl.pause();
    }
  };

  const handleChildReverse = (index: number) => {
    const childTl = childTimelinesRef.current[index];
    if (childTl) {
      childTl.reverse();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-orange-500"></div>
            <h1 className="text-4xl font-bold uppercase tracking-tight text-zinc-100">
              Timeline Orchestration
            </h1>
          </div>
          <p className="text-zinc-400 text-sm uppercase tracking-wide">
            Complex Timeline Composition with Labels, Callbacks, and Independent Controls
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-orange-500 text-xs font-mono">MASTER TL</span>
            <span className="text-zinc-100 text-sm font-mono">{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
            {currentLabel && (
              <>
                <span className="text-zinc-700">|</span>
                <span className="text-zinc-400 text-xs font-mono">LABEL:</span>
                <span className="text-orange-500 text-sm font-mono uppercase">{currentLabel}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 text-xs font-mono">PROGRESS:</span>
            <span ref={progressRef} className="text-zinc-100 text-sm font-mono">0%</span>
          </div>
        </div>

        {/* Master Controls */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 mb-8">
          <h2 className="text-zinc-100 text-sm uppercase tracking-wide mb-4">Master Timeline Controls</h2>

          {/* Scrubber */}
          <div className="mb-6">
            <div
              ref={scrubberRef}
              className="relative h-2 bg-zinc-800 rounded cursor-pointer"
            >
              <div
                ref={scrubberHandleRef}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full cursor-grab active:cursor-grabbing hover:scale-125 transition-transform"
                style={{ left: '0%' }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={handlePlay}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 text-xs font-mono uppercase transition-colors"
            >
              Play
            </button>
            <button
              onClick={handlePause}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 text-xs font-mono uppercase transition-colors"
            >
              Pause
            </button>
            <button
              onClick={handleReverse}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 text-xs font-mono uppercase transition-colors"
            >
              Reverse
            </button>
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-500 border border-orange-500 text-white text-xs font-mono uppercase transition-colors"
            >
              Restart
            </button>
          </div>

          {/* Label Jump Buttons */}
          <div>
            <span className="text-zinc-400 text-xs font-mono block mb-2">JUMP TO LABEL:</span>
            <div className="flex flex-wrap gap-2">
              {['intro', 'spin', 'bounce', 'scale', 'color', 'finale', 'end'].map((label) => (
                <button
                  key={label}
                  onClick={() => handlePlayFromLabel(label)}
                  className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs font-mono uppercase transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Container */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* INTRO Section */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-orange-500 text-xs font-mono uppercase">1. INTRO</h3>
              <div className="flex gap-1">
                <button
                  onClick={() => handleChildPlay(0)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Play"
                >
                  ▶
                </button>
                <button
                  onClick={() => handleChildPause(0)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Pause"
                >
                  ⏸
                </button>
                <button
                  onClick={() => handleChildReverse(0)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Reverse"
                >
                  ◀
                </button>
              </div>
            </div>
            <div className="aspect-square bg-zinc-950 flex items-center justify-center">
              <div className="intro-box w-24 h-24 bg-orange-500 rounded-lg"></div>
            </div>
            <p className="text-zinc-500 text-xs mt-3 font-mono">fade in + scale</p>
          </div>

          {/* SPIN Section */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-orange-500 text-xs font-mono uppercase">2. SPIN</h3>
              <div className="flex gap-1">
                <button
                  onClick={() => handleChildPlay(1)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Play"
                >
                  ▶
                </button>
                <button
                  onClick={() => handleChildPause(1)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Pause"
                >
                  ⏸
                </button>
                <button
                  onClick={() => handleChildReverse(1)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Reverse"
                >
                  ◀
                </button>
              </div>
            </div>
            <div className="aspect-square bg-zinc-950 flex items-center justify-center">
              <div className="spin-box w-24 h-24 border-4 border-orange-500 rounded-lg"></div>
            </div>
            <p className="text-zinc-500 text-xs mt-3 font-mono">360° + 360° rotation</p>
          </div>

          {/* BOUNCE Section */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-orange-500 text-xs font-mono uppercase">3. BOUNCE</h3>
              <div className="flex gap-1">
                <button
                  onClick={() => handleChildPlay(2)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Play"
                >
                  ▶
                </button>
                <button
                  onClick={() => handleChildPause(2)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Pause"
                >
                  ⏸
                </button>
                <button
                  onClick={() => handleChildReverse(2)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Reverse"
                >
                  ◀
                </button>
              </div>
            </div>
            <div className="aspect-square bg-zinc-950 flex items-center justify-center">
              <div className="bounce-box w-24 h-24 bg-orange-500 rounded-full"></div>
            </div>
            <p className="text-zinc-500 text-xs mt-3 font-mono">double bounce</p>
          </div>

          {/* SCALE Section */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-orange-500 text-xs font-mono uppercase">4. SCALE</h3>
              <div className="flex gap-1">
                <button
                  onClick={() => handleChildPlay(3)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Play"
                >
                  ▶
                </button>
                <button
                  onClick={() => handleChildPause(3)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Pause"
                >
                  ⏸
                </button>
                <button
                  onClick={() => handleChildReverse(3)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Reverse"
                >
                  ◀
                </button>
              </div>
            </div>
            <div className="aspect-square bg-zinc-950 flex items-center justify-center">
              <div className="scale-box w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg"></div>
            </div>
            <p className="text-zinc-500 text-xs mt-3 font-mono">scale pulse</p>
          </div>

          {/* COLOR Section */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-orange-500 text-xs font-mono uppercase">5. COLOR</h3>
              <div className="flex gap-1">
                <button
                  onClick={() => handleChildPlay(4)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Play"
                >
                  ▶
                </button>
                <button
                  onClick={() => handleChildPause(4)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Pause"
                >
                  ⏸
                </button>
                <button
                  onClick={() => handleChildReverse(4)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Reverse"
                >
                  ◀
                </button>
              </div>
            </div>
            <div className="aspect-square bg-zinc-950 flex items-center justify-center">
              <div className="color-box w-24 h-24 bg-orange-500 rounded-lg"></div>
            </div>
            <p className="text-zinc-500 text-xs mt-3 font-mono">color cycle</p>
          </div>

          {/* FINALE Section */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-orange-500 text-xs font-mono uppercase">6. FINALE</h3>
              <div className="flex gap-1">
                <button
                  onClick={() => handleChildPlay(5)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Play"
                >
                  ▶
                </button>
                <button
                  onClick={() => handleChildPause(5)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Pause"
                >
                  ⏸
                </button>
                <button
                  onClick={() => handleChildReverse(5)}
                  className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors"
                  title="Reverse"
                >
                  ◀
                </button>
              </div>
            </div>
            <div className="aspect-square bg-zinc-950 flex items-center justify-center gap-2">
              <div className="finale-box w-8 h-8 bg-orange-500 rounded"></div>
              <div className="finale-box w-8 h-8 bg-orange-400 rounded"></div>
              <div className="finale-box w-8 h-8 bg-orange-600 rounded"></div>
              <div className="finale-box w-8 h-8 bg-orange-300 rounded"></div>
              <div className="finale-box w-8 h-8 bg-orange-700 rounded"></div>
            </div>
            <p className="text-zinc-500 text-xs mt-3 font-mono">staggered burst</p>
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <h3 className="text-zinc-100 text-sm uppercase tracking-wide mb-4">Timeline Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="flex items-start gap-3">
              <span className="text-orange-500">›</span>
              <div>
                <span className="text-zinc-400">Position Parameters:</span>
                <span className="text-zinc-500"> {"'>'"} places next anim immediately after prev</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">›</span>
              <div>
                <span className="text-zinc-400">Labels:</span>
                <span className="text-zinc-500"> Add named points for precise sequencing</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">›</span>
              <div>
                <span className="text-zinc-400">Callbacks:</span>
                <span className="text-zinc-500"> onStart, onUpdate, onComplete events</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">›</span>
              <div>
                <span className="text-zinc-400">Control:</span>
                <span className="text-zinc-500"> play(), pause(), reverse(), restart()</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">›</span>
              <div>
                <span className="text-zinc-400">Nested:</span>
                <span className="text-zinc-500"> Child timelines with independent controls</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">›</span>
              <div>
                <span className="text-zinc-400">Scrubber:</span>
                <span className="text-zinc-500"> Drag to scrub timeline manually</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">›</span>
              <div>
                <span className="text-zinc-400">Label Jump:</span>
                <span className="text-zinc-500"> play('label') starts from specific label</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">›</span>
              <div>
                <span className="text-zinc-400">getLabelsArray():</span>
                <span className="text-zinc-500"> Returns all labels with their times</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
