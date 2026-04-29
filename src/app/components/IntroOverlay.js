"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "> initializing portfolio.exe",
  "> loading assets...",
  "> mounting components...",
  "> checking render pipeline...",
  "> all systems nominal.",
  "> welcome",
];

export default function IntroOverlay({ onDone }) {
  const [gone, setGone]     = useState(false);
  const [fading, setFading] = useState(false);
  const [lines, setLines]   = useState([]);
  const [bars, setBars]     = useState([]);

  // Exit timers
  useEffect(() => {
    const fade   = setTimeout(() => setFading(true), 2200);
    const remove = setTimeout(() => { setGone(true); onDone?.(); }, 2600);
    return () => { clearTimeout(fade); clearTimeout(remove); };
  }, []);

  // Boot lines
  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setLines(prev => [...prev, line]), i * 320 + 100)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Glitch bars
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => ({
        id:     i,
        top:    `${Math.random() * 100}%`,
        height: `${Math.random() * 16 + 2}px`,
        opacity: Math.random() * 0.4 + 0.1,
        x:      `${(Math.random() - 0.5) * 24}px`,
      })));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  if (gone) return null;

  return (
    <div style={{
      position:   "fixed",
      inset:      0,
      zIndex:     9999,
      background: "#000",
      display:    "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow:   "hidden",
      opacity:    fading ? 0 : 1,
      transition: "opacity 0.4s ease-in-out",
    }}>

      {/* Glitch bars */}
      {bars.map(b => (
        <div key={b.id} style={{
          position:   "absolute",
          width:      "100%",
          height:     b.height,
          top:        b.top,
          opacity:    b.opacity,
          transform:  `translateX(${b.x})`,
          background: "#4ade80",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }} />
      ))}

      {/* Scanlines */}
      <div style={{
        position:   "absolute",
        inset:      0,
        pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,80,0.03) 2px, rgba(0,255,80,0.03) 4px)",
      }} />

      {/* Boot text */}
      <div style={{
        position:   "relative",
        zIndex:     10,
        fontFamily: "monospace",
        color:      "#4ade80",
        fontSize:   "0.9rem",
        lineHeight: "1.8",
        padding:    "0 2rem",
        maxWidth:   "30rem",
        width:      "100%",
      }}>
        {lines.map((l, i) => <p key={i} style={{ margin: 0 }}>{l}</p>)}
        <span style={{ display: "inline-block", animation: "blink 1s step-end infinite" }}>▌</span>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}