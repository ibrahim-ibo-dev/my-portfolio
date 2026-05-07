"use client";
import { useEffect, useRef } from "react";

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
interface Particle { x: number; y: number; vx: number; vy: number; hue: number; radius: number; }
const SPOTLIGHT_R = 90, NUM_P = 7;

export default function SelectiveBlindness() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current, overlay = overlayRef.current;
    if (!container || !overlay) return;
    const ctx = overlay.getContext("2d") as CanvasRenderingContext2D;
    let W = container.clientWidth, H = container.clientHeight;
    overlay.width = W; overlay.height = H;
    let raf: number, time = 0;
    let mx = W / 2, my = H / 2, pmx = mx, pmy = my, speed = 0;
    let fadeRate = 0.012;

    const particles: Particle[] = Array.from({ length: NUM_P }, (_, i) => ({
      x: mx + (Math.random() - 0.5) * SPOTLIGHT_R * 0.8,
      y: my + (Math.random() - 0.5) * SPOTLIGHT_R * 0.8,
      vx: (Math.random() - 0.5) * 2.5, vy: (Math.random() - 0.5) * 2.5,
      hue: (i / NUM_P) * 360, radius: 5 + Math.random() * 5,
    }));

    const onMove = (e: MouseEvent) => {
      const r = overlay.getBoundingClientRect();
      const nx = e.clientX - r.left, ny = e.clientY - r.top;
      speed = lerp(speed, Math.hypot(nx - pmx, ny - pmy), 0.4);
      pmx = mx; pmy = my; mx = nx; my = ny;
    };
    overlay.addEventListener("mousemove", onMove);
    overlay.addEventListener("touchmove", (e) => {
      e.preventDefault(); const r = overlay.getBoundingClientRect();
      mx = e.touches[0].clientX - r.left; my = e.touches[0].clientY - r.top;
    }, { passive: false });

    const ro = new ResizeObserver(() => { W = container.clientWidth; H = container.clientHeight; overlay.width = W; overlay.height = H; });
    ro.observe(container);

    ctx.fillStyle = "#000000"; ctx.fillRect(0, 0, W, H);

    function tick() {
      time++;
      fadeRate = speed > 20 ? 0.003 : 0.014;
      ctx.fillStyle = `rgba(0,0,0,${fadeRate})`; ctx.fillRect(0, 0, W, H);

      ctx.save(); ctx.globalCompositeOperation = "destination-out";
      if (speed > 8) {
        const tg = ctx.createRadialGradient(mx, my, 0, mx, my, SPOTLIGHT_R + Math.min(speed * 0.8, 120) * 0.4);
        tg.addColorStop(0, `rgba(0,0,0,${Math.min(0.95, speed * 0.04)})`); tg.addColorStop(1, "transparent");
        ctx.fillStyle = tg; ctx.beginPath(); ctx.arc(mx, my, SPOTLIGHT_R + Math.min(speed * 0.8, 120) * 0.4, 0, Math.PI * 2); ctx.fill();
      }
      const sg = ctx.createRadialGradient(mx, my, 0, mx, my, SPOTLIGHT_R);
      sg.addColorStop(0, "rgba(0,0,0,1)"); sg.addColorStop(0.7, "rgba(0,0,0,0.9)"); sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(mx, my, SPOTLIGHT_R, 0, Math.PI * 2); ctx.fill(); ctx.restore();

      particles.forEach(p => {
        const dx = mx - p.x, dy = my - p.y, d = Math.hypot(dx, dy);
        if (d > SPOTLIGHT_R * 0.7) { p.vx += dx * 0.003; p.vy += dy * 0.003; }
        const dist = Math.hypot(p.x - mx, p.y - my);
        if (dist > SPOTLIGHT_R - p.radius) {
          const nx2 = (p.x - mx) / dist, ny2 = (p.y - my) / dist;
          p.vx = lerp(p.vx, -nx2 * 2.5, 0.3); p.vy = lerp(p.vy, -ny2 * 2.5, 0.3);
        }
        particles.forEach(q => { if (q === p) return; const qd = Math.hypot(p.x - q.x, p.y - q.y); if (qd < 22 && qd > 0.1) { p.vx += (p.x - q.x) / qd * 0.4; p.vy += (p.y - q.y) / qd * 0.4; } });
        p.vx *= 0.90; p.vy *= 0.90; p.x += p.vx; p.y += p.vy; p.hue = (p.hue + 0.8) % 360;
        ctx.save(); ctx.globalCompositeOperation = "source-over";
        ctx.shadowBlur = 20; ctx.shadowColor = `hsl(${p.hue},100%,65%)`;
        ctx.fillStyle = `hsl(${p.hue},100%,65%)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      });
      speed = lerp(speed, 0, 0.1);
      raf = requestAnimationFrame(tick);
    }
    tick();
    return () => { cancelAnimationFrame(raf); overlay.removeEventListener("mousemove", onMove); ro.disconnect(); };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
        <p className="font-serif font-black text-center text-white/90 leading-none"
          style={{ fontSize: "clamp(1.4rem,5vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
          YOU ARE<br />MISSING<br />THE BIG<br />PICTURE
        </p>
      </div>
      <canvas ref={overlayRef} className="absolute inset-0 w-full h-full block" style={{ touchAction: "none" }} />
    </div>
  );
}
