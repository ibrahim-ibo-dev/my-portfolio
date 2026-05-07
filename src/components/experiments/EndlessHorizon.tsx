"use client";
import { useEffect, useRef } from "react";

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function EndlessHorizon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let W = canvas.clientWidth, H = canvas.clientHeight;
    canvas.width = W; canvas.height = H;

    let raf: number, time = 0;
    let mx = W / 2, my = H / 2;
    let pmx = mx, pmy = my;
    let gx = W / 2, gy = H * 0.32;
    let gvx = 0, gvy = 0;
    let aurora = 0;
    let traveled = 0;
    const REPEL_R = 200, MAX_AURORA = 12000;

    canvas.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      const nx = e.clientX - r.left, ny = e.clientY - r.top;
      const d = Math.hypot(nx - pmx, ny - pmy);
      pmx = mx; pmy = my; mx = nx; my = ny;
      if (Math.hypot(mx - gx, my - gy) < 350) { traveled = Math.min(traveled + d, MAX_AURORA); }
      aurora = traveled / MAX_AURORA;
    });
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      mx = e.touches[0].clientX - r.left; my = e.touches[0].clientY - r.top;
    }, { passive: false });

    const ro = new ResizeObserver(() => {
      W = canvas.clientWidth; H = canvas.clientHeight; canvas.width = W; canvas.height = H;
    });
    ro.observe(canvas);

    function tick() {
      time++;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000000"; ctx.fillRect(0, 0, W, H);

      if (aurora > 0.01) {
        const t2 = time * 0.006;
        [{ h: 250 + Math.sin(t2) * 30, ox: 0.28, oy: 0.45 },
         { h: 310 + Math.cos(t2 * 0.9) * 40, ox: 0.72, oy: 0.6 },
         { h: 185 + Math.sin(t2 * 1.1) * 20, ox: 0.5, oy: 0.25 }].forEach(b => {
          const g = ctx.createRadialGradient(W * b.ox, H * b.oy, 0, W * b.ox, H * b.oy, W * 0.6);
          g.addColorStop(0, `hsla(${b.h},90%,58%,${0.28 * aurora})`); g.addColorStop(1, "transparent");
          ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        });
      }

      const dx = gx - mx, dy = gy - my, dist = Math.hypot(dx, dy);
      if (dist < REPEL_R && dist > 0.1) {
        const a = Math.atan2(dy, dx);
        const tgx = Math.max(70, Math.min(W - 70, mx + Math.cos(a) * REPEL_R));
        const tgy = Math.max(70, Math.min(H - 70, my + Math.sin(a) * REPEL_R));
        gvx = lerp(gvx, (tgx - gx) * 0.14, 0.25); gvy = lerp(gvy, (tgy - gy) * 0.14, 0.25);
      } else {
        gvx += (W / 2 - gx) * 0.0008; gvy += (H / 2 - gy) * 0.0008; gvx *= 0.94; gvy *= 0.94;
      }
      gx += gvx; gy += gvy;
      if (gx < 70) { gx = 70; gvx = Math.abs(gvx) * 0.4; }
      if (gx > W - 70) { gx = W - 70; gvx = -Math.abs(gvx) * 0.4; }
      if (gy < 70) { gy = 70; gvy = Math.abs(gvy) * 0.4; }
      if (gy > H - 70) { gy = H - 70; gvy = -Math.abs(gvy) * 0.4; }

      const hue = (200 + time * 0.4) % 360;
      ctx.save(); ctx.translate(gx, gy); ctx.rotate(time * 0.016);
      ctx.shadowBlur = 40 + Math.sin(time * 0.04) * 10; ctx.shadowColor = `hsl(${hue},85%,65%)`;
      const s = 20;
      ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s * 0.7, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.7, 0); ctx.closePath();
      const dg = ctx.createLinearGradient(-s, -s, s, s);
      dg.addColorStop(0, `hsl(${hue},90%,85%)`); dg.addColorStop(1, `hsl(${(hue + 60) % 360},80%,65%)`);
      ctx.fillStyle = dg; ctx.fill(); ctx.restore();

      const ring = ctx.createRadialGradient(gx, gy, s * 0.8, gx, gy, s * 4.5);
      ring.addColorStop(0, `hsla(${hue},80%,60%,${0.12 + Math.sin(time * 0.05) * 0.05})`); ring.addColorStop(1, "transparent");
      ctx.fillStyle = ring; ctx.beginPath(); ctx.arc(gx, gy, s * 4.5, 0, Math.PI * 2); ctx.fill();

      ctx.save(); ctx.shadowBlur = 18; ctx.shadowColor = "rgba(255,255,255,0.9)";
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2); ctx.fill(); ctx.restore();

      traveled = Math.max(0, traveled - 2); aurora = traveled / MAX_AURORA;
      raf = requestAnimationFrame(tick);
    }
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" style={{ cursor: "none", touchAction: "none", background: "#000000" }} />;
}
