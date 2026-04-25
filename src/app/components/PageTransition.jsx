"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname          = usePathname();
  const [displayed, setDisplayed] = useState(children);
  const [bars, setBars]   = useState([]);
  const [flashing, setFlashing]  = useState(false);
  const [opacity, setOpacity]    = useState(1);

  useEffect(() => {
    let flashInterval;
    let barInterval;
    let step = 0;

    // 1. Flash the screen
    setFlashing(true);
    flashInterval = setInterval(() => {
      setOpacity(o => o === 1 ? 0.05 : 1);
      step++;
      if (step >= 6) {
        clearInterval(flashInterval);
        setOpacity(1);
      }
    }, 60);

    // 2. Glitch bars during flash
    barInterval = setInterval(() => {
      setBars(Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => ({
        id:     i,
        top:    `${Math.random() * 100}%`,
        height: `${Math.random() * 20 + 2}px`,
        opacity: Math.random() * 0.6 + 0.2,
        x:      `${(Math.random() - 0.5) * 40}px`,
      })));
    }, 50);

    // 3. Swap content at peak of glitch, clear bars
    const swapTimer = setTimeout(() => {
      setDisplayed(children);
      clearInterval(barInterval);
      setBars([]);
      setFlashing(false);
    }, 380);

    return () => {
      clearInterval(flashInterval);
      clearInterval(barInterval);
      clearTimeout(swapTimer);
    };
  }, [pathname]);

  return (
    <div style={{ position: "relative", opacity, transition: "opacity 0.06s linear" }}>
      {/* Glitch bars overlay */}
      {bars.map(b => (
        <div
          key={b.id}
          style={{
            position:   "fixed",
            width:      "100%",
            height:     b.height,
            top:        b.top,
            left:       0,
            opacity:    b.opacity,
            transform:  `translateX(${b.x})`,
            background: "#4ade80",
            mixBlendMode: "screen",
            pointerEvents: "none",
            zIndex:     9997,
          }}
        />
      ))}
      {displayed}
    </div>
  );
}