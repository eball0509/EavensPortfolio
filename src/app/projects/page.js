"use client";

import { useState } from "react";
import projects from "../data/projects";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <main className="bg-black text-white min-h-screen p-10">
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        Projects
      </h1>

      {/* PROJECT GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="border border-gray-700 rounded-xl p-4 hover:scale-105 transition cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <img
              src={project.image}
              alt={project.name}
              className="rounded-lg mb-3 w-full"
            />

            <h3 className="text-xl font-semibold">
              {project.name}
            </h3>

            <p className="text-gray-400 text-sm">
              {project.description}
            </p>

            <div className="mt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-gray-800 px-2 py-1 rounded mr-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white text-black p-6 rounded-xl w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">
              {selectedProject.name}
            </h2>

            <img
              src={selectedProject.image}
              alt={selectedProject.name}
              className="rounded-lg mb-3 w-full"
            />

            <p className="mb-3">
              {selectedProject.description}
            </p>

            <p className="text-sm mb-3">
              <strong>Tech:</strong>{" "}
              {selectedProject.tech.join(", ")}
            </p>

            <a
              href={selectedProject.github}
              target="_blank"
              className="text-blue-500"
            >
              View on GitHub
            </a>

            <br />

            <button
              className="mt-4 px-3 py-1 bg-black text-white rounded"
              onClick={() => setSelectedProject(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}