'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export default function AutoRail({ children, className = '', label = 'Product carousel', speed = 0.55 }: { children: ReactNode; className?: string; label?: string; speed?: number }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, scroll: 0 });
  const [paused, setPaused] = useState(false);

  const childrenArray = Array.isArray(children) ? children : [children];

  const pauseTemporarily = () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    setPaused(true);
    resumeRef.current = setTimeout(() => setPaused(false), 3800);
  };

  const togglePause = () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    setPaused((value) => !value);
  };

  const move = (direction: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    pauseTemporarily();
    viewport.scrollBy({ left: direction * Math.min(viewport.clientWidth * 0.72, 620), behavior: 'smooth' });
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 32);
      last = now;
      if (!paused && !draggingRef.current) {
        viewport.scrollLeft += speed * dt;
        const half = (trackRef.current?.scrollWidth || 0) / 2;
        if (half > 0 && viewport.scrollLeft >= half) viewport.scrollLeft -= half;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, [paused, speed]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    draggingRef.current = true;
    dragStartRef.current = { x: event.clientX, scroll: viewport.scrollLeft };
    viewport.setPointerCapture(event.pointerId);
    pauseTemporarily();
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollLeft = dragStartRef.current.scroll - (event.clientX - dragStartRef.current.x);
  };

  const onPointerUp = () => { draggingRef.current = false; };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 1) return;
    event.preventDefault();
    pauseTemporarily();
    viewport.scrollLeft += delta;
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a')) pauseTemporarily();
  };

  return (
    <div className={`auto-rail-shell ${className}`} aria-label={label}>
      <div className="rail-controls">
        <button type="button" className="rail-control pause" onClick={togglePause} aria-label={paused ? `Play ${label}` : `Pause ${label}`} title={paused ? 'Play motion' : 'Pause motion'}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
        <button type="button" className="rail-control" onClick={() => move(-1)} aria-label={`Scroll ${label} left`}><ChevronLeft size={17} /></button>
        <button type="button" className="rail-control" onClick={() => move(1)} aria-label={`Scroll ${label} right`}><ChevronRight size={17} /></button>
      </div>
      <div
        ref={viewportRef}
        className="auto-rail"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onClickCapture={handleClickCapture}
      >
        <div ref={trackRef} className="auto-track">
          <div className="auto-track-set">{childrenArray}</div>
          <div className="auto-track-set" aria-hidden="true">{childrenArray}</div>
        </div>
      </div>
    </div>
  );
}
