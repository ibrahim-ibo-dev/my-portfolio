"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    float a = dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
    float b = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
    float c = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
    float d = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      v += a * gnoise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 uvA = vec2(uv.x * aspect, uv.y);
    float t = uTime * 0.05;

    // Deep warm dark base
    vec3 col = mix(
      vec3(0.02, 0.018, 0.015),
      vec3(0.04, 0.03, 0.025),
      uv.y * 0.7 + 0.15
    );

    // ── Flowing nebula cloud layer 1 — warm amber ──
    vec2 q1 = vec2(
      fbm(uv * 1.8 + t * 0.3),
      fbm(uv * 1.8 + vec2(3.7, 8.2) + t * 0.25)
    );
    vec2 r1 = vec2(
      fbm(uv * 1.8 + 4.0 * q1 + vec2(2.3, 6.5) + 0.1 * t),
      fbm(uv * 1.8 + 4.0 * q1 + vec2(9.1, 3.4) + 0.08 * t)
    );
    float nebula1 = fbm(uv * 1.8 + 4.0 * r1);
    col += vec3(0.08, 0.05, 0.02) * smoothstep(0.0, 0.8, nebula1) * 0.5;

    // ── Flowing nebula cloud layer 2 — warm gold ──
    vec2 q2 = vec2(
      fbm(uv * 2.5 + vec2(5.0, 2.0) + t * 0.2),
      fbm(uv * 2.5 + vec2(1.3, 7.7) + t * 0.15)
    );
    float nebula2 = fbm(uv * 2.5 + 3.0 * q2 + t * 0.05);
    col += vec3(0.06, 0.04, 0.02) * smoothstep(0.1, 0.7, nebula2) * 0.4;

    // ── Drifting central glow — warm amber ──
    float cx = aspect * 0.5 + 0.15 * sin(t * 0.3);
    float cy = 0.45 + 0.1 * cos(t * 0.25);
    float cd = length(uvA - vec2(cx, cy));
    col += vec3(0.08, 0.05, 0.02) * 0.3 * exp(-cd * 1.0);
    col += vec3(0.06, 0.04, 0.02) * 0.2 * exp(-cd * 0.5);

    // ── Accent glow — subtle warm ──
    float ax = aspect * 0.2 + 0.08 * sin(t * 0.4 + 1.5);
    float ay = 0.75 + 0.05 * cos(t * 0.35);
    float ad = length(uvA - vec2(ax, ay));
    col += vec3(0.07, 0.045, 0.02) * 0.15 * exp(-ad * 1.3);

    // ── Scattered twinkling stars ──
    for (int i = 0; i < 25; i++) {
      float fi = float(i);
      float sx = fract(sin(fi * 157.3) * 43758.5);
      float sy = fract(cos(fi * 297.1) * 43758.5);
      vec2 starPos = vec2(sx * aspect, sy);
      float starDist = length(uvA - starPos);
      float starBright = 0.0004 / (starDist + 0.002);
      starBright *= 0.5 + 0.5 * sin(t * (3.0 + fi * 0.3) + fi * 5.0);
      vec3 starCol = mix(vec3(0.8, 0.65, 0.45), vec3(0.95, 0.8, 0.6), fract(fi * 0.37));
      col += starCol * starBright;
    }

    // ── Soft vignette ──
    float vig = 1.0 - 0.3 * pow(length(uv - 0.5) * 1.2, 2.0);
    col *= vig;

    col = clamp(col, 0.0, 0.4);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function AboutBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0));
    renderer.setClearColor(0x0A0A0F, 1);
    container.appendChild(renderer.domElement);

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      material.uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Only animate when visible
    let raf = 0;
    const clock = new THREE.Clock();
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!isVisible) return;
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    loop();

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

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
}
