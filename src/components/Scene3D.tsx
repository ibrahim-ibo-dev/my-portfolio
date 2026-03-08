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

// Domain-warped FBM aurora fragment shader
const fragShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Gradient noise helpers
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
    float t = uTime * 0.08;

    // ── Deep base gradient ── warm dark charcoal
    vec3 col = mix(
      vec3(0.02, 0.02, 0.03),  // deep warm black (bottom)
      vec3(0.05, 0.04, 0.03),  // warm dark brown hint (top)
      uv.y
    );

    // ── Main cinematic warm light source (center-bottom) ──
    float lightX = aspect * 0.5 + 0.15 * sin(t * 0.4) + 0.05 * cos(t * 0.7);
    float lightY = 0.25 + 0.08 * sin(t * 0.35) + 0.03 * cos(t * 0.6);
    float lightDist = length(uvA - vec2(lightX, lightY));
    // Pulsing intensity
    float pulse = 0.9 + 0.1 * sin(t * 1.2);
    // Warm amber-gold core glow
    col += vec3(0.55, 0.35, 0.15) * 0.3 * exp(-lightDist * 1.8) * pulse;
    // Soft champagne mid halo
    col += vec3(0.5, 0.38, 0.2) * 0.18 * exp(-lightDist * 1.2) * pulse;
    // Wide warm atmospheric scatter
    col += vec3(0.2, 0.12, 0.06) * 0.15 * exp(-lightDist * 0.6);

    // ── Secondary cool light (upper-right) ── drifting
    float l2x = aspect * 0.7 + 0.1 * sin(t * 0.5 + 2.0);
    float l2y = 0.75 + 0.06 * cos(t * 0.4 + 1.0);
    float light2Dist = length(uvA - vec2(l2x, l2y));
    col += vec3(0.15, 0.1, 0.06) * 0.12 * exp(-light2Dist * 1.5);

    // ── Volumetric light rays ──
    float rayAngle = atan(uvA.y - lightY, uvA.x - lightX);
    float rays = 0.5 + 0.5 * sin(rayAngle * 8.0 + t * 2.0);
    rays *= exp(-lightDist * 2.5);
    col += vec3(0.45, 0.3, 0.12) * rays * 0.06;

    // ── Domain-warped fog / atmosphere ──
    vec2 q = vec2(
      fbm(uv * 2.0 + t),
      fbm(uv * 2.0 + vec2(5.2, 1.3) + t * 0.7)
    );
    vec2 r = vec2(
      fbm(uv * 2.0 + 3.0 * q + vec2(1.7, 9.2) + 0.12 * t),
      fbm(uv * 2.0 + 3.0 * q + vec2(8.3, 2.8) + 0.09 * t)
    );
    float fog = 0.5 + 0.5 * fbm(uv * 2.0 + 3.0 * r);

    // Fog with warm brown tint — breathing motion
    float breathe = 0.85 + 0.15 * sin(t * 0.7);
    col += vec3(0.08, 0.05, 0.02) * fog * 0.4 * breathe;
    col += vec3(0.06, 0.04, 0.02) * smoothstep(0.3, 0.8, fog) * 0.25 * breathe;

    // ── Neural network / constellation lines ──
    float lines = 0.0;
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float x1 = fract(fi * 0.37 + t * 0.05);
      float y1 = fract(fi * 0.53 + t * 0.03);
      float x2 = fract(fi * 0.71 + t * 0.04);
      float y2 = fract(fi * 0.29 + t * 0.06);
      vec2 p1 = vec2(x1 * aspect, y1);
      vec2 p2 = vec2(x2 * aspect, y2);
      // Line segment distance
      vec2 pa = uvA - p1, ba = p2 - p1;
      float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
      float d = length(pa - ba * h);
      lines += 0.001 / (d + 0.005) * 0.07;
      // Node glow at endpoints
      col += vec3(0.5, 0.35, 0.2) * 0.003 / (length(uvA - p1) + 0.01);
      col += vec3(0.45, 0.3, 0.15) * 0.002 / (length(uvA - p2) + 0.01);
    }
    col += vec3(0.35, 0.22, 0.1) * lines;

    // ── Subtle particles — drifting, orbiting, twinkling ──
    for (int i = 0; i < 20; i++) {
      float fi = float(i);
      float seed1 = fract(sin(fi * 127.1) * 43758.5);
      float seed2 = fract(cos(fi * 311.7) * 43758.5);
      // Orbital / drifting motion
      float orbitR = 0.05 + seed1 * 0.4;
      float orbitSpeed = 0.15 + seed2 * 0.25;
      float px = fract(seed1 + t * (0.03 + fi * 0.004) + orbitR * sin(t * orbitSpeed + fi * 1.3));
      float py = fract(seed2 + t * (0.015 + fi * 0.003) + orbitR * 0.5 * cos(t * orbitSpeed * 0.8 + fi * 2.1));
      vec2 pPos = vec2(px * aspect, py);
      float pBright = 0.0015 / (length(uvA - pPos) + 0.004);
      // Varied twinkle speeds
      pBright *= 0.4 + 0.6 * sin(t * (2.0 + fi * 0.5) + fi * 2.5);
      // Color variation — warm gold range
      vec3 pCol = mix(vec3(0.7, 0.5, 0.3), vec3(0.9, 0.7, 0.5), fract(fi * 0.61));
      col += pCol * pBright;
    }

    // ── Horizon glow line ──
    float horizonY = 0.28 + 0.02 * sin(t * 0.4);
    float horizonGlow = exp(-pow((uv.y - horizonY) * 12.0, 2.0));
    col += vec3(0.5, 0.35, 0.15) * horizonGlow * 0.15;
    // Thin bright edge
    float horizonEdge = exp(-pow((uv.y - horizonY) * 40.0, 2.0));
    col += vec3(0.7, 0.5, 0.25) * horizonEdge * 0.1;

    // ── Vignette ──
    float vig = 1.0 - 0.4 * pow(length(uv - 0.5) * 1.3, 2.0);
    col *= vig;

    // ── Keep elegant — clamp but allow bright touches ──
    col = clamp(col, 0.0, 0.6);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Full-screen quad — orthographic camera
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

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
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
