"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Full-screen quad vertex shader
const vertShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Optimized Domain-warped FBM aurora fragment shader
const fragShader = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Extremely cheap hash
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // Cheap value noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // 2-octave FBM for performance
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 2; i++) {
      v += a * noise(p);
      p = p * 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 uvA = vec2(uv.x * aspect, uv.y);
    float t = uTime * 0.08;

    // Deep base gradient
    vec3 col = mix(
      vec3(0.02, 0.02, 0.03),
      vec3(0.05, 0.04, 0.03),
      uv.y
    );

    // Main cinematic warm light source
    float lightX = aspect * 0.5 + 0.15 * sin(t * 0.4);
    float lightY = 0.25 + 0.08 * sin(t * 0.35);
    vec2 lightDiff = uvA - vec2(lightX, lightY);
    float lightDistSq = dot(lightDiff, lightDiff);
    
    float pulse = 0.9 + 0.1 * sin(t * 1.2);
    // Core glow (fast approx)
    col += vec3(0.55, 0.35, 0.15) * 0.3 * (1.0 / (1.0 + lightDistSq * 5.0)) * pulse;
    // Atmospheric scatter
    col += vec3(0.2, 0.12, 0.06) * 0.15 * (1.0 / (1.0 + lightDistSq * 2.0));

    // Secondary cool light
    float l2x = aspect * 0.7 + 0.1 * sin(t * 0.5 + 2.0);
    float l2y = 0.75 + 0.06 * cos(t * 0.4 + 1.0);
    vec2 l2Diff = uvA - vec2(l2x, l2y);
    col += vec3(0.15, 0.1, 0.06) * 0.12 * (1.0 / (1.0 + dot(l2Diff, l2Diff) * 3.0));

    // Domain-warped fog - optimized to 3 FBM calls total instead of 5
    vec2 q = vec2(
      fbm(uv * 2.0 + t),
      fbm(uv * 2.0 + vec2(5.2, 1.3) + t * 0.7)
    );
    float fog = fbm(uv * 2.0 + q * 2.0);

    float breathe = 0.85 + 0.15 * sin(t * 0.7);
    col += vec3(0.08, 0.05, 0.02) * fog * 0.4 * breathe;

    // Subtle particles - optimized loop and no square roots
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float px = fract(sin(fi * 127.1) * 4375.5 + t * (0.02 + fi * 0.005));
      float py = fract(cos(fi * 311.7) * 4375.5 + t * (0.015 + fi * 0.004));
      vec2 pPos = vec2(px * aspect, py);
      vec2 diff = uvA - pPos;
      float distSq = dot(diff, diff);
      float pBright = 0.00003 / (distSq + 0.00001);
      col += vec3(0.8, 0.6, 0.4) * pBright * (0.5 + 0.5 * sin(t * 3.0 + fi));
    }

    // Horizon glow line
    float horizonY = 0.28 + 0.02 * sin(t * 0.4);
    float hDistSq = (uv.y - horizonY) * (uv.y - horizonY);
    col += vec3(0.5, 0.35, 0.15) * 0.15 * (1.0 / (1.0 + hDistSq * 100.0));

    // Vignette
    vec2 vCenter = uv - 0.5;
    float vig = 1.0 - 0.4 * dot(vCenter, vCenter) * 1.6;
    col *= vig;

    gl_FragColor = vec4(clamp(col, 0.0, 0.6), 1.0);
  }
`;

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip 3D rendering for users who prefer reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      container.style.background = "radial-gradient(ellipse at 50% 40%, #1a1510 0%, #0A0A0F 70%)";
      container.setAttribute("aria-hidden", "true");
      return;
    }

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      },
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(0.5);
    renderer.setClearColor(0x0A0A0F, 1);
    container.appendChild(renderer.domElement);

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      material.uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Pause when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let raf = 0;
    const clock = new THREE.Clock();
    let lastFrame = 0;
    const frameInterval = 1000 / 30;
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (!isVisible) return;
      if (time - lastFrame < frameInterval) return;
      lastFrame = time;
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" aria-hidden="true" />;
}
