'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export default function AutoRail({ children, className = '', label = 'Product carousel', speed = 0.55 }: { children: ReactNode; className?: string; label?: string; speed?: number }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, scroll: 0 });

  const childrenArray = Array.isArray(children) ? children : [children];

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 32);
      last = now;
      if (!draggingRef.current) {
        viewport.scrollLeft += speed * dt;
        const half = (trackRef.current?.scrollWidth || 0) / 2;
        if (half > 0 && viewport.scrollLeft >= half) viewport.scrollLeft -= half;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    draggingRef.current = true;
    dragStartRef.current = { x: event.clientX, scroll: viewport.scrollLeft };
    viewport.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollLeft = dragStartRef.current.scroll - (event.clientX - dragStartRef.current.x);
  };

  const onPointerUp = () => { draggingRef.current = false; };

  return (
    <div className={`auto-rail-shell ${className}`} aria-label={label}>
      <div
        ref={viewportRef}
        className="auto-rail"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={trackRef} className="auto-track">
          <div className="auto-track-set">{childrenArray}</div>
          <div className="auto-track-set" aria-hidden="true">{childrenArray}</div>
        </div>
      </div>
    </div>
  );
}
