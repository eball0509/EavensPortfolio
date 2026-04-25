"use client";

import { motion } from "framer-motion";
import TypewriterHeading from "../components/TypewriterHeading";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut", delay },
});

export default function AboutPage() {
  return (
    <main className="relative text-white p-10 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Title */}
        <TypewriterHeading text="About Me" tag="h1" className="text-4xl font-bold text-green-400 mb-6" delay={300} />

        {/* Profile card + intro split */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          {/* Avatar card */}
          <motion.div
            className="bg-gray-900 border border-green-500/20 rounded-xl p-6 flex flex-col items-center gap-3"
            {...fadeUp(0.05)}
          >
            {/* ── Swap the placeholder below for your photo ──
                Replace the entire <div> block with:
                <img src="/images/your-photo.jpg" alt="Eaven Ball"
                     className="w-28 h-28 rounded-full object-cover border-2 border-green-400" />
            */}
            <div className="w-28 h-28 rounded-full border-2 border-green-400 flex items-center justify-center bg-black">
              <span className="text-3xl font-bold text-green-400">EB</span>
            </div>

            <div className="text-center">
              <p className="text-white font-semibold">Eaven Ball</p>
              <p className="text-green-400 text-sm">Game & Software Developer</p>
            </div>

            <div className="w-full border-t border-gray-800 pt-3 text-center">
              <p className="text-gray-500 text-xs">Based in Utah, USA</p>
            </div>
          </motion.div>

          {/* Text — spans 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-8">

            {/* Intro + skills */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* Left */}
              <motion.div {...fadeUp(0.1)}>
                <p className="text-gray-300 mb-4">
                  Hi, I'm <span className="text-green-400">Eaven Ball</span>, a software and game developer focused on building efficient systems.
                </p>
                <p className="text-gray-300">
                  I work primarily with <span className="text-blue-400">C#</span> and <span className="text-blue-400">Unity</span>, building systems, tools, and interactive experiences.
                </p>
              </motion.div>

              {/* Skills card */}
              <motion.div
                className="bg-gray-900 border border-gray-800 rounded-xl p-4"
                {...fadeUp(0.2)}
              >
                <h2 className="text-green-400 mb-2">Core Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {["C#", "Unity", "C++", "Game Systems", "Gameplay Programming", "Problem Solving"].map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="bg-black border border-gray-700 text-blue-400 px-2 py-1 rounded"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.25 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800 my-8"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        />

        {/* In-Depth */}
        <motion.div
          className="bg-gray-900 border border-gray-800 rounded-xl p-4"
          {...fadeUp(0.5)}
        >
          <h2 className="text-green-400 mb-2">In-Depth</h2>
          <p className="text-gray-300">
            Working toward building games that are as solid under the hood as they feel to play.
            That means spending a lot of time in gameplay systems, AI behaviors, and the kind of tooling that makes development faster and less painful.
            I care as much about how code is structured as I do about what it does, clean, modular systems that are easy to iterate on matter to me.
            Web development is the newest layer, and I'm approaching it the same way, building real things instead of just following tutorials.
            The goal is to be the kind of developer who can own a system end to end, whether that's a game mechanic or a full-stack feature.
          </p>
        </motion.div>

      </div>
    </main>
  );
}