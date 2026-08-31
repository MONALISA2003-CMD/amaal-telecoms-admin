'use client';

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, ReactNode, WheelEvent as ReactWheelEvent } from 'react';

export default function AutoRail({ children, className = '' }: { children: ReactNode; className?: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const dragRef = useRef({ active: false, x: 0, scroll: 0 });
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dragging, setDragging] = useState(false);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = null;
  }, []);

  const pauseTemporarily = useCallback((delay = 1800) => {
    clearResumeTimer();
    setPaused(true);
    resumeTimerRef.current = setTimeout(() => setPaused(false), delay);
  }, [clearResumeTimer]);

  const move = useCallback((direction: 1 | -1) => {
    const el = viewportRef.current;
    if (!el) return;
    pauseTemporarily(2200);
    el.scrollBy({ left: direction * Math.max(260, el.clientWidth * 0.72), behavior: 'smooth' });
  }, [pauseTemporarily]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const tick = (now: number) => {
      const previous = lastRef.current ?? now;
      const delta = Math.min(40, now - previous);
      lastRef.current = now;

      if (!paused && !reducedMotion && !dragRef.current.active && document.visibilityState === 'visible') {
        const half = el.scrollWidth / 2;
        el.scrollLeft += (delta / 1000) * 22;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
        if (el.scrollLeft < 0) el.scrollLeft += half;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearResumeTimer();
    };
  }, [clearResumeTimer, paused, reducedMotion]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el) return;
    dragRef.current = { active: true, x: e.clientX, scroll: el.scrollLeft };
    setDragging(true);
    clearResumeTimer();
    setPaused(true);
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const el = viewportRef.current;
    if (!el) return;
    el.scrollLeft = dragRef.current.scroll - (e.clientX - dragRef.current.x);
  };

  const finishDrag = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setDragging(false);
    pauseTemporarily(1500);
  };

  const onWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el) return;
    const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(horizontal) < 1) return;
    e.preventDefault();
    pauseTemporarily(1600);
    el.scrollLeft += horizontal;
  };

  return (
    <div className={`auto-rail ${className}`}>
      <button type="button" className="rail-control rail-control-left" aria-label="Scroll left" onClick={() => move(-1)}>
        <ChevronLeft size={17} />
      </button>
      <div
        ref={viewportRef}
        className={`auto-viewport${dragging ? ' is-dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onWheel={onWheel}
      >
        <div className="auto-track">
          <div className="auto-set">{children}</div>
          <div className="auto-set" aria-hidden="true">{children}</div>
        </div>
      </div>
      <button type="button" className="rail-control rail-control-right" aria-label="Scroll right" onClick={() => move(1)}>
        <ChevronRight size={17} />
      </button>
      <button
        type="button"
        className="rail-pause"
        aria-label={paused ? 'Resume automatic scrolling' : 'Pause automatic scrolling'}
        aria-pressed={paused}
        onClick={() => {
          clearResumeTimer();
          setPaused(v => !v);
        }}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
        <span>{paused ? 'Resume' : 'Pause'}</span>
      </button>
      <span className="rail-hint">Drag or swipe · scroll both ways</span>
    </div>
  );
}
