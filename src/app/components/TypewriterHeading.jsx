"use client";

import { useEffect, useState, useRef } from "react";

export default function TypewriterHeading({ text, className = "", speed = 60, delay = 0, tag: Tag = "h2" }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);
  const ref                       = useRef(null);
  const started                   = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function startTyping() {
      if (started.current) return;
      started.current = true;
      setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          setDisplayed(text.slice(0, i + 1));
          i++;
          if (i === text.length) { clearInterval(interval); setDone(true); }
        }, speed);
      }, delay);
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startTyping(); },
      { threshold: 0 }
    );

    observer.observe(el);

    // Start immediately if already visible
    if (el.getBoundingClientRect().top < window.innerHeight) startTyping();

    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <Tag ref={ref} className={className}>
      {displayed}
      {!done && <span className="animate-pulse">▌</span>}
    </Tag>
  );
}