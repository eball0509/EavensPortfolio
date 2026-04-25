"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import IntroOverlay from "./components/IntroOverlay";
import TypewriterHeading from "./components/TypewriterHeading";

// ── Typing effect hook ──────────────────────────────────────────
function useTypingEffect(phrases, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const delay = deleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setPhraseIdx(i => (i + 1) % phrases.length);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return display;
}

// ── Fade-up variant ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

// ── Skill badge ─────────────────────────────────────────────────
function SkillBadge({ skill, i }) {
  return (
    <motion.span
      key={skill}
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{ scale: 1.12, backgroundColor: "#22c55e22", transition: { duration: 0.15 } }}
      className="bg-gray-900 border border-green-500/30 text-green-400 px-3 py-1 rounded cursor-default select-none"
    >
      {skill}
    </motion.span>
  );
}

// ── Skill group ─────────────────────────────────────────────────
function SkillGroup({ title, skills }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
    >
      <h3 className="text-green-400 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => <SkillBadge key={s} skill={s} i={i} />)}
      </div>
    </motion.div>
  );
}

// ── Glitch text ─────────────────────────────────────────────────
function GlitchText({ text, className = "" }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span aria-hidden="true" className="absolute inset-0 text-red-500 opacity-70 glitch-layer-1 pointer-events-none select-none">{text}</span>
      <span aria-hidden="true" className="absolute inset-0 text-blue-400 opacity-70 glitch-layer-2 pointer-events-none select-none">{text}</span>
      <span className="relative">{text}</span>
      <style jsx>{`
        @keyframes glitch1 {
          0%   { clip-path: inset(30% 0 50% 0); transform: translate(-3px, 0); }
          20%  { clip-path: inset(70% 0 10% 0); transform: translate(3px, 0); }
          40%  { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 0); }
          60%  { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); }
          80%  { clip-path: inset(20% 0 60% 0); transform: translate(-1px, 0); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(0, 0); }
        }
        @keyframes glitch2 {
          0%   { clip-path: inset(60% 0 20% 0); transform: translate(3px, 0); }
          25%  { clip-path: inset(10% 0 70% 0); transform: translate(-3px, 0); }
          50%  { clip-path: inset(40% 0 40% 0); transform: translate(2px, 0); }
          75%  { clip-path: inset(80% 0 5%  0); transform: translate(-2px, 0); }
          100% { clip-path: inset(60% 0 20% 0); transform: translate(0, 0); }
        }
        .glitch-layer-1 { animation: glitch1 3.5s infinite steps(1); }
        .glitch-layer-2 { animation: glitch2 3.5s infinite steps(1) 0.1s; }
      `}</style>
    </span>
  );
}

// ── CTA Button ──────────────────────────────────────────────────
function GlowButton({ href, children }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.06, boxShadow: "0 0 18px #22c55e88" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="inline-block px-6 py-3 border border-green-400 text-green-400 rounded hover:bg-green-400 hover:text-black transition-colors"
    >
      {children}
    </motion.a>
  );
}

// ── Stats Card ──────────────────────────────────────────────────
const stats = [
  { label: "Years Coding", value: "3"     },
  { label: "Hours Logged", value: "1,000+" },
  { label: "Languages",    value: "3"     },
];
const languages = ["C#", "Python", "C++"];

function StatsCard() {
  return (
    <motion.div
      className="bg-gray-900 border border-green-500/20 rounded-xl p-6 flex flex-col gap-6 sticky top-24"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-green-400 font-bold text-lg">At a Glance</h2>

      {stats.map(({ label, value }) => (
        <div key={label} className="flex justify-between items-center border-b border-gray-800 pb-3 last:border-0 last:pb-0">
          <span className="text-gray-400 text-sm">{label}</span>
          <span className="text-green-400 font-bold text-xl">{value}</span>
        </div>
      ))}

      <div>
        <p className="text-gray-400 text-sm mb-2">Primary Languages</p>
        <div className="flex flex-wrap gap-2">
          {languages.map((l, i) => (
            <motion.span
              key={l}
              className="bg-black border border-green-500/30 text-green-400 px-3 py-1 rounded text-sm"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileHover={{ scale: 1.08 }}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────
export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("introDone");
    if (!seen) setShowIntro(true);
  }, []);

  const typed = useTypingEffect([
    "Game Developer",
    "Software Engineer",
    "Tool Builder",
    "Always Shipping",
  ]);

  return (
    <main className="relative text-white min-h-screen p-10 overflow-hidden">
      {showIntro && (
        <IntroOverlay onDone={() => {
          sessionStorage.setItem("introDone", "1");
          setIntroFinished(true);
          setShowIntro(false);
        }} />
      )}

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

        {/* Left — main content */}
        <div>

          {/* Hero + typing tagline */}
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Hero />
            <p className="mt-3 text-green-400 text-lg font-mono min-h-[1.75rem]">
              {typed}<span className="animate-pulse">▌</span>
            </p>
          </motion.div>

          {/* About */}
          <motion.section
            className="mt-16 max-w-3xl"
            custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <TypewriterHeading text="About" tag="h2" className="text-2xl font-bold mb-4" />
            <p className="text-gray-400">
              Games. Tools. Engines. I build things that move, respond, and scale — and I'm always working on what's next.
            </p>
            <div className="mt-4">
              <GlowButton href="/about">Learn More →</GlowButton>
            </div>
          </motion.section>

          {/* What I'm Working On */}
          <motion.section
            className="mt-16 max-w-3xl"
            custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <TypewriterHeading text="What I'm Working On" tag="h2" className="text-2xl font-bold text-green-400 mb-4" />
            <p className="text-gray-400 leading-relaxed">
              I'm currently developing projects in both Unity and Unreal to strengthen my game development skills.
              At the same time, I'm building a strong foundation in web development and continuing to grow as a
              software engineer through hands-on projects and system design work.
            </p>
          </motion.section>

          {/* Skills */}
          <motion.section
            className="mt-16"
            custom={2} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <TypewriterHeading text="Skills & Focus" tag="h2" className="text-2xl font-bold text-green-400 mb-6" />
            <div className="space-y-6">
              <SkillGroup title="Core Development"     skills={["C#", "C++", "Unity", "Unreal Engine", "Blueprints", "GitHub"]} />
              <SkillGroup title="Software Development" skills={[".NET / .NET MAUI", "Application Development", "Systems Design", "Tool Development", "OOP", "Data Structures", "Algorithms"]} />
              <SkillGroup title="AI & Tooling"         skills={["AI Integration", "Python", "Java"]} />
              <SkillGroup title="Web Development (Expanding)" skills={["HTML", "React", "Next.js", "JavaScript", "Modern Web Development", "API Integration"]} />
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            className="mt-16 text-center"
            custom={3} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <TypewriterHeading text="Let's Connect" tag="h2" className="text-2xl font-bold text-green-400 mb-4" />
            <p className="text-gray-400 mb-6">Interested in collaborating or want to reach out?</p>
            <GlowButton href="/contact">Contact Me</GlowButton>
          </motion.section>

        </div>

        {/* Right — stats card */}
        <div className="hidden lg:block">
          <StatsCard />
        </div>

      </div>
    </main>
  );
}