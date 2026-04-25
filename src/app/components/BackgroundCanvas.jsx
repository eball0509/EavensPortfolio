"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 55;
const SHAPE_COUNT    = 8;
const CONNECT_DIST   = 140;
const GREEN          = "rgba(74,222,128,";

function randBetween(a, b) { return a + Math.random() * (b - a); }

function initParticles(w, h) {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x:  Math.random() * w,
    y:  Math.random() * h,
    vx: randBetween(-0.3, 0.3),
    vy: randBetween(-0.3, 0.3),
    r:  randBetween(1.2, 2.5),
  }));
}

function initShapes(w, h) {
  const types = ["circle", "triangle", "square"];
  return Array.from({ length: SHAPE_COUNT }, () => ({
    type:  types[Math.floor(Math.random() * types.length)],
    x:     Math.random() * w,
    y:     Math.random() * h,
    size:  randBetween(18, 48),
    vx:    randBetween(-0.12, 0.12),
    vy:    randBetween(-0.12, 0.12),
    angle: Math.random() * Math.PI * 2,
    vr:    randBetween(-0.003, 0.003),
    alpha: randBetween(0.04, 0.12),
  }));
}

function drawTriangle(ctx, x, y, size, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
    i === 0
      ? ctx.moveTo(Math.cos(a) * size, Math.sin(a) * size)
      : ctx.lineTo(Math.cos(a) * size, Math.sin(a) * size);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawSquare(ctx, x, y, size, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeRect(-size / 2, -size / 2, size, size);
  ctx.restore();
}

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let particles = initParticles(canvas.width, canvas.height);
    let shapes    = initShapes(canvas.width, canvas.height);

    function tick() {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // ── Shapes ──────────────────────────────────────────────
      shapes.forEach(s => {
        s.x     += s.vx;
        s.y     += s.vy;
        s.angle += s.vr;
        if (s.x < -60)  s.x = w + 60;
        if (s.x > w+60) s.x = -60;
        if (s.y < -60)  s.y = h + 60;
        if (s.y > h+60) s.y = -60;

        ctx.strokeStyle = `${GREEN}${s.alpha})`;
        ctx.lineWidth   = 1;

        if (s.type === "circle") {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.stroke();
        } else if (s.type === "triangle") {
          drawTriangle(ctx, s.x, s.y, s.size, s.angle);
        } else {
          drawSquare(ctx, s.x, s.y, s.size, s.angle);
        }
      });

      // ── Particles ────────────────────────────────────────────
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${GREEN}0.5)`;
        ctx.fill();
      });

      // ── Connection lines ─────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${GREEN}${alpha})`;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(tick);
    }

    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset:    0,
        zIndex:   0,
        pointerEvents: "none",
      }}
    />
  );
}