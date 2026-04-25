"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import projects from "../data/projects";

// Maps cube face index to project index
// Three.js BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z
const FACE_TO_PROJECT = [0, 1, 2, 3, 0, 1];

export default function ProjectCube() {
  const mountRef  = useRef(null);
  const stateRef  = useRef({});
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // ── Scene ──────────────────────────────────────────────────
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // ── Cube ───────────────────────────────────────────────────
    const loader    = new THREE.TextureLoader();
    const faceImages = [
      projects[0].image, projects[1].image,
      projects[2].image, projects[3].image,
      projects[0].image, projects[1].image,
    ];
    const materials = faceImages.map(src =>
      new THREE.MeshBasicMaterial({ map: loader.load(src) })
    );
    const cube = new THREE.Mesh(new THREE.BoxGeometry(), materials);
    scene.add(cube);

    // ── Wireframe overlay ──────────────────────────────────────
    const wireMat  = new THREE.MeshBasicMaterial({ color: 0x4ade80, wireframe: true, transparent: true, opacity: 0.15 });
    const wireframe = new THREE.Mesh(new THREE.BoxGeometry(1.002, 1.002, 1.002), wireMat);
    scene.add(wireframe);

    // ── Edge glow ──────────────────────────────────────────────
    const edges    = new THREE.EdgesGeometry(new THREE.BoxGeometry());
    const edgeMat  = new THREE.LineBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.6 });
    const edgeLines = new THREE.LineSegments(edges, edgeMat);
    scene.add(edgeLines);

    // ── Raycaster for click detection ──────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();

    // ── Drag state ─────────────────────────────────────────────
    const drag = { active: false, startX: 0, startY: 0, lastX: 0, lastY: 0, moved: false };
    const vel  = { x: 0, y: 0 };
    let autoRotate = true;

    function onPointerDown(e) {
      drag.active = true;
      drag.moved  = false;
      drag.startX = drag.lastX = e.clientX;
      drag.startY = drag.lastY = e.clientY;
      vel.x = vel.y = 0;
      autoRotate = false;
    }

    function onPointerMove(e) {
      if (!drag.active) return;
      const dx = e.clientX - drag.lastX;
      const dy = e.clientY - drag.lastY;
      cube.rotation.y     += dx * 0.01;
      wireframe.rotation.y += dx * 0.01;
      edgeLines.rotation.y += dx * 0.01;
      cube.rotation.x     += dy * 0.01;
      wireframe.rotation.x += dy * 0.01;
      edgeLines.rotation.x += dy * 0.01;
      vel.x = dy * 0.01;
      vel.y = dx * 0.01;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      if (Math.abs(e.clientX - drag.startX) > 4 || Math.abs(e.clientY - drag.startY) > 4) {
        drag.moved = true;
      }
    }

    function onPointerUp(e) {
      drag.active = false;
      if (!drag.moved) {
        // It's a click — raycast to find face
        const rect = mount.getBoundingClientRect();
        mouse.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
        mouse.y = -((e.clientY - rect.top)   / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObject(cube);
        if (hits.length > 0) {
          const faceIdx    = Math.floor(hits[0].faceIndex / 2);
          const projectIdx = FACE_TO_PROJECT[faceIdx];
          setModal(projects[projectIdx]);
        }
      }
      // Resume auto-rotate after 2s idle
      setTimeout(() => { autoRotate = true; }, 2000);
    }

    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup",   onPointerUp);

    // ── Animate ────────────────────────────────────────────────
    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      if (autoRotate) {
        cube.rotation.x      += 0.004;
        cube.rotation.y      += 0.006;
        wireframe.rotation.x += 0.004;
        wireframe.rotation.y += 0.006;
        edgeLines.rotation.x += 0.004;
        edgeLines.rotation.y += 0.006;
      } else if (!drag.active) {
        // Inertia
        cube.rotation.x      += vel.x *= 0.92;
        cube.rotation.y      += vel.y *= 0.92;
        wireframe.rotation.x += vel.x;
        wireframe.rotation.y += vel.y;
        edgeLines.rotation.x += vel.x;
        edgeLines.rotation.y += vel.y;
      }
      renderer.render(scene, camera);
    }
    animate();

    // ── Cleanup ────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup",   onPointerUp);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div className="w-full h-[400px] border border-green-400/40 rounded-lg overflow-hidden mb-10 cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-gray-900 text-white p-6 rounded-xl w-[400px] border border-green-500/30 shadow-lg shadow-green-500/10"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2 text-green-400">{modal.name}</h2>
            <img src={modal.image} alt={modal.name} className="rounded-lg mb-3 w-full" />
            <p className="mb-3 text-gray-300">{modal.description}</p>
            <p className="text-sm mb-3">
              <strong>Tech:</strong> {modal.tech.join(", ")}
            </p>
            {modal.github && (
              <a href={modal.github} target="_blank" rel="noopener noreferrer" className="text-green-400 block mt-2 hover:underline">
                View on GitHub
              </a>
            )}
            <button
              className="mt-4 px-3 py-1 bg-black border border-gray-600 text-white rounded hover:border-green-400 transition"
              onClick={() => setModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}