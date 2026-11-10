"use client";

import { useEffect, useRef } from "react";

// A soft glow that eases after the pointer on devices with a fine pointer.
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let x = window.innerWidth * 0.15;
    let y = window.innerHeight * 0.1;
    let tx = x;
    let ty = y;
    let frame = 0;

    const paint = () => {
      ref.current?.style.setProperty("--x", `${x}px`);
      ref.current?.style.setProperty("--y", `${y}px`);
    };
    const step = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      paint();
      frame =
        Math.abs(tx - x) + Math.abs(ty - y) > 0.5
          ? requestAnimationFrame(step)
          : 0;
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (reduce) {
        x = tx;
        y = ty;
        paint();
      } else if (!frame) frame = requestAnimationFrame(step);
    };

    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 [--x:15%] [--y:10%]"
      style={{
        background:
          "radial-gradient(600px circle at var(--x) var(--y), var(--color-glow), transparent 80%)",
      }}
    />
  );
}
