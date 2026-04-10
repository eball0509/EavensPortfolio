"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ProjectCube() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    const materials = [
      new THREE.MeshBasicMaterial({ map: loader.load("/images/Wilderlands.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("/images/zwave.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("/images/PIM.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("/images/Wilderlands.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("/images/zwave.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("/images/PIM.png") }),
    ];

    const geometry = new THREE.BoxGeometry();

    // Textured cube
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="w-full h-[400px] border border-green-400 rounded-lg overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}