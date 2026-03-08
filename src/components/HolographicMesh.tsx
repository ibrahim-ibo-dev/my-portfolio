"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  className?: string;
}

export default function HolographicMesh({ className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 1.2, 3.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Holographic shader - warm gold iridescent grid with waves
    const holoVert = `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normal;
        
        vec3 pos = position;
        // Wave ripples
        float wave1 = sin(pos.x * 2.5 + uTime * 1.5) * 0.08;
        float wave2 = cos(pos.y * 2.0 + uTime * 1.2) * 0.06;
        float wave3 = sin((pos.x + pos.y) * 1.8 + uTime * 0.9) * 0.05;
        pos.z += wave1 + wave2 + wave3;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const holoFrag = `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      // HSV to RGB conversion
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
      
      void main() {
        // Dynamic hue shift across the mesh
        float hue = vUv.x * 0.15 + vUv.y * 0.12 + uTime * 0.08;
        hue = mod(hue, 1.0);
        
        // Map to warm gold → amber → champagne range
        hue = 0.06 + hue * 0.1;
        
        vec3 color = hsv2rgb(vec3(hue, 0.5, 0.85));
        
        // Grid lines
        float gridX = abs(fract(vUv.x * 20.0) - 0.5) * 2.0;
        float gridY = abs(fract(vUv.y * 20.0) - 0.5) * 2.0;
        float grid = min(gridX, gridY);
        float gridLine = smoothstep(0.88, 0.95, grid);
        
        // Wave-based brightness
        float brightness = 1.0 + sin(vPosition.x * 3.0 + uTime * 1.5) * 0.15;
        
        // Edge fade
        float edgeFade = smoothstep(0.0, 0.15, vUv.x) * 
                         smoothstep(1.0, 0.85, vUv.x) *
                         smoothstep(0.0, 0.15, vUv.y) * 
                         smoothstep(1.0, 0.85, vUv.y);
        
        vec3 finalColor = color * brightness * gridLine;
        float alpha = gridLine * edgeFade * 0.7;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // Create mesh plane
    const geometry = new THREE.PlaneGeometry(4, 3, 40, 30);
    const material = new THREE.ShaderMaterial({
      vertexShader: holoVert,
      fragmentShader: holoFrag,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.3;
    scene.add(mesh);

    // Add subtle point lights for ambiance — warm gold tones
    const light1 = new THREE.PointLight(0xd4a574, 0.8, 10);
    light1.position.set(2, 2, 2);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xe8c9a0, 0.6, 10);
    light2.position.set(-2, 1, 1);
    scene.add(light2);

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

      material.uniforms.uTime.value = t;

      // Subtle rotation based on mouse + auto-drift
      mesh.rotation.x = -Math.PI * 0.3 + mouse.y * 0.15 + Math.sin(t * 0.3) * 0.05;
      mesh.rotation.z = mouse.x * 0.1 + Math.cos(t * 0.25) * 0.03;
      mesh.position.y = Math.sin(t * 0.6) * 0.08;

      // Light animation
      light1.position.x = Math.cos(t * 0.7) * 2;
      light1.position.z = Math.sin(t * 0.5) * 2;

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
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
