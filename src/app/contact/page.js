"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut", delay },
});

export default function ContactPage() {
  return (
    <main className="bg-black text-white min-h-screen p-10 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Title */}
        <motion.h1
          className="text-4xl font-bold text-green-400 mb-6"
          {...fadeUp(0)}
        >
          Contact Me
        </motion.h1>

        {/* Intro */}
        <motion.p
          className="text-gray-300 mb-10 max-w-md"
          {...fadeUp(0.1)}
        >
          Feel free to reach out through any of the platforms below. I'm always open to discussing projects, opportunities, or collaborations.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Links */}
          <div className="space-y-4">
            {[
              { label: "Email Me",  href: "mailto:eavenba3@gmail.com" },
              { label: "GitHub",    href: "https://github.com/eball0509",                          target: "_blank" },
              { label: "LinkedIn",  href: "https://www.linkedin.com/in/eaven-ball-40a572295/",     target: "_blank" },
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
          </div>

          {/* Card */}
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

        </div>
      </div>
    </main>
  );
}