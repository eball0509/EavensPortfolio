"use client";

import { motion } from "framer-motion";
import TypewriterHeading from "../components/TypewriterHeading";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut", delay },
});

export default function ContactPage() {
  return (
    <main className="relative text-white p-10 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Title + availability badge */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <TypewriterHeading text="Contact Me" tag="h1" className="text-4xl font-bold text-green-400" />

          {/* ── Change "Open to Work" text or color to reflect your status ── */}
          <motion.span
            className="flex items-center gap-2 bg-green-900/30 border border-green-500/40 text-green-400 text-sm px-3 py-1 rounded-full"
            {...fadeUp(0.1)}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Open to Work
          </motion.span>
        </div>

        {/* Intro */}
        <motion.p
          className="text-gray-300 mb-10 max-w-md"
          {...fadeUp(0.15)}
        >
          Feel free to reach out through any of the platforms below. I'm always open to discussing projects, opportunities, or collaborations.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Links */}
          <div className="space-y-4">
            {[
              { label: "Email Me", href: "mailto:eavenba3@gmail.com" },
              { label: "GitHub",   href: "https://github.com/eball0509",                       target: "_blank" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/eaven-ball-40a572295/",  target: "_blank" },
            ].map(({ label, href, target }, i) => (
              <motion.a
                key={label}
                href={href}
                target={target}
                rel={target ? "noopener noreferrer" : undefined}
                className="block text-center bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-green-400 hover:bg-gray-800 transition"
                {...fadeUp(0.2 + i * 0.1)}
                whileHover={{ scale: 1.04, boxShadow: "0 0 14px rgba(74,222,128,0.2)" }}
                whileTap={{ scale: 0.97 }}
              >
                {label}
              </motion.a>
            ))}

            {/* Response time note */}
            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-sm"
              {...fadeUp(0.5)}
            >
              <p className="text-gray-400">
                <span className="text-green-400 font-semibold">Response time: </span>
                Usually within 24–48 hours. Email is the fastest way to reach me.
              </p>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            {/* What I'm Open To */}
            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
              {...fadeUp(0.35)}
            >
              <h2 className="text-green-400 text-xl mb-3">What I'm Open To</h2>
              <p className="text-gray-300 mb-4">
                I'm currently open to opportunities involving game development, software engineering, and collaborative projects.
              </p>
              <div className="border-t border-gray-800 my-4" />
              <p className="text-gray-400 text-sm">Interests:</p>
              <p className="text-blue-400">
                Game Development • Systems Programming • Development Tools and Systems
              </p>
            </motion.div>

            {/* Extra info card */}
            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
              {...fadeUp(0.45)}
            >
              <h2 className="text-green-400 text-xl mb-3">Good to Know</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><span className="text-green-400">→ </span>Available for freelance and full-time roles</li>
                <li><span className="text-green-400">→ </span>Open to remote or in-person opportunities</li>
                <li><span className="text-green-400">→ </span>Happy to collaborate on indie game projects</li>
                {/* ── Add or remove bullet points to match your situation ── */}
              </ul>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}