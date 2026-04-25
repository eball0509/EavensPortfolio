"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot  = dotRef.current;
    const ringEl = ringRef.current;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onDown = () => ringEl.style.transform += " scale(0.75)";
    const onUp   = () => ringEl.style.transform = ringEl.style.transform.replace(" scale(0.75)", "");

    // Hover on clickable elements — expand ring
    const onEnter = () => { ringEl.style.width = "48px"; ringEl.style.height = "48px"; ringEl.style.opacity = "0.5"; };
    const onLeave = () => { ringEl.style.width = "32px"; ringEl.style.height = "32px"; ringEl.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    const clickables = document.querySelectorAll("a, button, [role='button'], input, textarea");
    clickables.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    // Smooth ring follow
    let animId;
    function followRing() {
      ring.current.x += (pos.current.x - ring.current.x) * .4;
      ring.current.y += (pos.current.y - ring.current.y) * .4;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      animId = requestAnimationFrame(followRing);
    }
    followRing();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      clickables.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         "6px",
          height:        "6px",
          borderRadius:  "50%",
          background:    "#4ade80",
          pointerEvents: "none",
          zIndex:        9999,
          marginLeft:    "-3px",
          marginTop:     "-3px",
          mixBlendMode:  "difference",
        }}
      />
      {/* Ring — lags behind for feel */}
      <div
        ref={ringRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         "32px",
          height:        "32px",
          borderRadius:  "50%",
          border:        "1.5px solid #4ade80",
          pointerEvents: "none",
          zIndex:        9998,
          marginLeft:    "-16px",
          marginTop:     "-16px",
          transition:    "width 0.2s, height 0.2s, opacity 0.2s",
          opacity:       1,
        }}
      />
    </>
  );
}