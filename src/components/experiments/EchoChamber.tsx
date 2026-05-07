"use client";
import { useEffect, useRef } from "react";

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
interface Shape { x: number; y: number; vx: number; vy: number; type: "blue" | "red"; radius: number; alive: boolean; }

export default function EchoChamber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let W = canvas.clientWidth, H = canvas.clientHeight;
    canvas.width = W; canvas.height = H;
    let raf: number, time = 0;

    let bubbleR = 80, darkness = 0, flashWhite = 0;
    let shapes: Shape[] = [], spawnTimer = 0;
    let isFree = false, freedomFrames = 0, echoCount = 0;
    let mx = W / 2, my = H / 2, pmx = mx, pmy = my;
    let swipeSpeed = 0;

    canvas.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      const nx = e.clientX - r.left, ny = e.clientY - r.top;
      swipeSpeed = lerp(swipeSpeed, Math.hypot(nx - pmx, ny - pmy), 0.55);
      pmx = mx; pmy = my; mx = nx; my = ny;
    });
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault(); const r = canvas.getBoundingClientRect();
      mx = e.touches[0].clientX - r.left; my = e.touches[0].clientY - r.top;
    }, { passive: false });

    const ro = new ResizeObserver(() => { W = canvas.clientWidth; H = canvas.clientHeight; canvas.width = W; canvas.height = H; });
    ro.observe(canvas);

    function spawnShape() {
      const type: "blue" | "red" = Math.random() > 0.45 ? "blue" : "red";
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      if (side === 0) { x = Math.random() * W; y = -20; }
      else if (side === 1) { x = W + 20; y = Math.random() * H; }
      else if (side === 2) { x = Math.random() * W; y = H + 20; }
      else { x = -20; y = Math.random() * H; }
      const cx = W / 2, cy = H / 2, dx = cx - x, dy = cy - y, d = Math.hypot(dx, dy);
      const speed = 0.8 + Math.random() * 0.8;
      shapes.push({ x, y, vx: dx / d * speed, vy: dy / d * speed, type, radius: 9 + Math.random() * 5, alive: true });
    }

    function tick() {
      time++;
      const cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = `rgb(${Math.round(lerp(28, 0, Math.min(1, darkness)))},${Math.round(lerp(22, 0, Math.min(1, darkness)))},${Math.round(lerp(50, 0, Math.min(1, darkness)))})`;
      ctx.fillRect(0, 0, W, H);
      if (flashWhite > 0) { ctx.fillStyle = `rgba(255,255,255,${flashWhite * 0.25})`; ctx.fillRect(0, 0, W, H); flashWhite = Math.max(0, flashWhite - 0.05); }

      spawnTimer++;
      if (spawnTimer % Math.max(25, 80 - echoCount * 4) === 0 && !isFree) spawnShape();

      shapes.forEach(s => {
        if (!s.alive) return;
        s.x += s.vx; s.y += s.vy;
        const dx = s.x - cx, dy = s.y - cy, dist = Math.hypot(dx, dy);
        if (dist < bubbleR + s.radius) {
          if (s.type === "blue") { s.alive = false; echoCount++; bubbleR = Math.min(180, bubbleR + 5); darkness = Math.min(1, echoCount / 12); }
          else { const nx2 = dx / dist, ny2 = dy / dist; s.vx = nx2 * Math.abs(s.vx + s.vy); s.vy = ny2 * Math.abs(s.vx + s.vy); s.x = cx + nx2 * (bubbleR + s.radius + 2); s.y = cy + ny2 * (bubbleR + s.radius + 2); }
        }
      });
      shapes = shapes.filter(s => s.alive && Math.hypot(s.x - cx, s.y - cy) < W);

      shapes.forEach(s => {
        ctx.save();
        if (s.type === "blue") { ctx.fillStyle = "rgba(59,130,246,0.85)"; ctx.shadowColor = "rgba(59,130,246,0.6)"; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillStyle = "rgba(239,68,68,0.85)"; ctx.shadowColor = "rgba(239,68,68,0.6)"; ctx.shadowBlur = 12; const sz = s.radius * 1.6; ctx.translate(s.x, s.y); ctx.beginPath(); ctx.moveTo(0, -sz); ctx.lineTo(sz * 0.87, sz * 0.5); ctx.lineTo(-sz * 0.87, sz * 0.5); ctx.closePath(); ctx.fill(); }
        ctx.restore();
      });

      if (!isFree && swipeSpeed > 18 && Math.hypot(mx - cx, my - cy) < bubbleR + 40) {
        isFree = true; flashWhite = 1; echoCount = 0; bubbleR = 80; darkness = 0; shapes = []; freedomFrames = 0;
      }

      const bubbleAlpha = isFree ? 0.15 : Math.max(0.08, 0.4 - darkness * 0.35);
      ctx.save();
      ctx.strokeStyle = `rgba(165,122,220,${bubbleAlpha})`; ctx.lineWidth = Math.min(8, 1.5 + echoCount * 0.5);
      ctx.shadowBlur = isFree ? 30 : 10; ctx.shadowColor = `rgba(165,122,220,${bubbleAlpha})`;
      ctx.beginPath(); ctx.arc(cx, cy, bubbleR, 0, Math.PI * 2); ctx.stroke();
      const bg2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, bubbleR);
      bg2.addColorStop(0, `rgba(165,122,220,${0.03 + darkness * 0.04})`); bg2.addColorStop(1, `rgba(100,60,180,${0.02 + darkness * 0.05})`);
      ctx.fillStyle = bg2; ctx.beginPath(); ctx.arc(cx, cy, bubbleR, 0, Math.PI * 2); ctx.fill(); ctx.restore();

      if (isFree) {
        freedomFrames++;
        const pulse = 0.6 + Math.sin(time * 0.08) * 0.4;
        const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 130);
        fg.addColorStop(0, `rgba(200,180,255,${0.15 * pulse})`); fg.addColorStop(1, "transparent");
        ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(cx, cy, 130, 0, Math.PI * 2); ctx.fill();
        if (freedomFrames > 240) { isFree = false; freedomFrames = 0; }
      }

      swipeSpeed = lerp(swipeSpeed, 0, 0.1);
      raf = requestAnimationFrame(tick);
    }
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" style={{ touchAction: "none", background: "#1C1632" }} />;
}
