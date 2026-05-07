"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic neural-network background.
 *
 * Renders animated nodes + connections on a canvas with:
 *  - subtle parallax response to mouse movement
 *  - soft glow per node
 *  - dynamic edges that fade with distance
 *  - graceful fallback on prefers-reduced-motion
 */
export function NeuralNetwork({
  className,
  density = 0.000095,
  maxNodes = 120,
  linkDistance = 160,
  speed = 0.18,
}: {
  className?: string;
  density?: number;
  maxNodes?: number;
  linkDistance?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let bgGrad: CanvasGradient | null = null;

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hue: number;
      pulse: number;
      pulseSpeed: number;
    };

    const HUES = [212, 230, 192, 250]; // blue, indigo, cyan, violet

    const glowCanvases = HUES.map((hue) => {
      const c = document.createElement("canvas");
      const size = 64;
      c.width = size;
      c.height = size;
      const cctx = c.getContext("2d");
      if (cctx) {
        const grad = cctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
        grad.addColorStop(0, `hsla(${hue}, 95%, 70%, 1)`);
        grad.addColorStop(1, "hsla(0,0%,0%,0)");
        cctx.fillStyle = grad;
        cctx.fillRect(0, 0, size, size);
      }
      return c;
    });

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(maxNodes, Math.floor(width * height * density));
      nodes = new Array(target).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: 1.2 + Math.random() * 1.6,
        hue: HUES[Math.floor(Math.random() * HUES.length)]!,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.015,
      }));

      bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.7
      );
      bgGrad.addColorStop(0, "rgba(59,130,246,0.05)");
      bgGrad.addColorStop(1, "rgba(0,0,0,0)");
    };

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      init();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (bgGrad) {
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      const m = mouseRef.current;

      // Update + draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        a.x += a.vx;
        a.y += a.vy;
        a.pulse += a.pulseSpeed;

        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        // Mouse parallax pull
        if (m.active) {
          const dx = m.x - a.x;
          const dy = m.y - a.y;
          const d2 = dx * dx + dy * dy;
          const radius = 180;
          if (d2 < radius * radius) {
            const f = (1 - Math.sqrt(d2) / radius) * 0.04;
            a.vx += (dx / Math.sqrt(d2 + 0.001)) * f * -1;
            a.vy += (dy / Math.sqrt(d2 + 0.001)) * f * -1;
          }
        }

        // Friction
        a.vx *= 0.995;
        a.vy *= 0.995;

        // Bounded velocity
        const sp = Math.hypot(a.vx, a.vy);
        const max = speed * 1.6;
        if (sp > max) {
          a.vx = (a.vx / sp) * max;
          a.vy = (a.vy / sp) * max;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistance * linkDistance) {
            const d = Math.sqrt(d2);
            const t = 1 - d / linkDistance;
            ctx.strokeStyle = `hsla(${a.hue}, 90%, 70%, ${0.07 * t})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes (glow + core)
      for (const n of nodes) {
        const pulse = (Math.sin(n.pulse) + 1) * 0.5; // 0..1
        const r = n.r + pulse * 0.6;

        const glowRadius = r * 8;
        ctx.globalAlpha = 0.35 + pulse * 0.25;
        const img = glowCanvases[HUES.indexOf(n.hue)];
        if (img) {
          ctx.drawImage(img, n.x - glowRadius, n.y - glowRadius, glowRadius * 2, glowRadius * 2);
        }
        ctx.globalAlpha = 1;

        ctx.fillStyle = `hsla(${n.hue}, 100%, 88%, 0.95)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    init();
    if (!reduceMotion) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Single static frame for reduced-motion users
      draw();
      cancelAnimationFrame(rafRef.current);
    }

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [density, linkDistance, maxNodes, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={
        "absolute inset-0 h-full w-full pointer-events-auto " + (className ?? "")
      }
    />
  );
}
