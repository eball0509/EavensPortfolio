"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../data/projects";
import ProjectCube from "../components/ProjectCube";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <main className="bg-black text-white min-h-screen p-10">

      {/* TITLE */}
      <motion.h1
        className="text-3xl font-bold text-green-400 mb-4"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Projects
      </motion.h1>

      {/* INTRO */}
      <motion.p
        className="text-gray-400 max-w-2xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        A collection of my work in game development, systems programming, and tools built with Unity and Unreal. Each project represents problem-solving, design thinking, and hands-on development.
      </motion.p>

      <ProjectCube />

      {/* PROJECT GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="border border-gray-700 rounded-xl p-4 bg-gray-900 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20 cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            {/* IMAGE WITH HOVER OVERLAY */}
            <div className="relative">
              <img
                src={project.image}
                alt={project.name}
                className="rounded-lg mb-3 w-full"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition flex items-center justify-center text-green-400 font-semibold rounded-lg">
                View Project
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-semibold">{project.name}</h3>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-sm mt-1">{project.description}</p>

            {/* TECH TAGS */}
            <div className="mt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-green-900/40 text-green-400 px-2 py-1 rounded mr-1 border border-green-500/30"
                >
                  {t}
                </span>
              ))}
            </div>

            {project.role && (
              <p className="text-xs text-gray-500 mt-2">{project.role}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gray-900 text-white p-6 rounded-xl w-[400px] border border-green-500/30 shadow-lg shadow-green-500/10"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-2 text-green-400">
                {selectedProject.name}
              </h2>

              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="rounded-lg mb-3 w-full"
              />

              <p className="mb-3 text-gray-300">{selectedProject.description}</p>

              <p className="text-sm mb-3">
                <strong>Tech:</strong> {selectedProject.tech.join(", ")}
              </p>

              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 block mt-2 hover:underline"
                >
                  View on GitHub
                </a>
              )}

              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 block mt-2 hover:underline"
                >
                  Live Demo
                </a>
              )}

              <button
                className="mt-4 px-3 py-1 bg-black border border-gray-600 text-white rounded hover:border-green-400 transition"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}