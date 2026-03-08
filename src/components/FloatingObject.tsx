"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  shape: "ring" | "cube" | "octahedron" | "icosahedron" | "torus" | "tetrahedron";
  color?: number;
  secondaryColor?: number;
  size?: number;
  className?: string;
}

export default function FloatingObject({
  shape,
  color = 0xd4a574,
  secondaryColor = 0xe8c9a0,
  size = 1,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0x111122, 0.4));
    const pl = new THREE.PointLight(color, 2.5, 15);
    pl.position.set(2, 2, 3);
    scene.add(pl);
    const bl = new THREE.PointLight(secondaryColor, 1.2, 10);
    bl.position.set(-2, -1, -2);
    scene.add(bl);

    // Geometry
    let geometry: THREE.BufferGeometry;
    switch (shape) {
      case "ring":
        geometry = new THREE.TorusGeometry(size * 0.8, size * 0.04, 24, 64);
        break;
      case "cube":
        geometry = new THREE.BoxGeometry(size * 0.85, size * 0.85, size * 0.85);
        break;
      case "octahedron":
        geometry = new THREE.OctahedronGeometry(size * 0.7);
        break;
      case "icosahedron":
        geometry = new THREE.IcosahedronGeometry(size * 0.6, 1);
        break;
      case "torus":
        geometry = new THREE.TorusKnotGeometry(size * 0.45, size * 0.12, 64, 12);
        break;
      case "tetrahedron":
        geometry = new THREE.TetrahedronGeometry(size * 0.7);
        break;
    }

    // Wireframe mesh
    const wireframe = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      })
    );
    scene.add(wireframe);

    // Solid inner mesh (subtle)
    const solid = new THREE.Mesh(
      geometry.clone(),
      new THREE.MeshPhysicalMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.15,
        roughness: 0.3,
        metalness: 0.9,
        transparent: true,
        opacity: 0.12,
      })
    );
    solid.scale.setScalar(0.98);
    scene.add(solid);

    // Visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => { visible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Mouse
    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // Animate
    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible.current) return;
      const t = clock.getElapsedTime();

      wireframe.rotation.x = t * 0.3 + mouse.y * 0.3;
      wireframe.rotation.y = t * 0.5 + mouse.x * 0.3;
      wireframe.rotation.z = t * 0.1;
      wireframe.position.y = Math.sin(t * 0.8) * 0.12;

      solid.rotation.copy(wireframe.rotation);
      solid.position.copy(wireframe.position);

      renderer.render(scene, camera);
    };
    loop();

    // Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [shape, color, secondaryColor, size]);

  return <div ref={containerRef} className={className} />;
}
