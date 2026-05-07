"use client";
import { useEffect, useRef } from "react";

interface Node { x: number; y: number; vx: number; vy: number; w: number; h: number; label: string; gen: number; }
const LABELS = ["Choose","Decide","Pick","Select","Opt","Go","Take","Try","?","A","B","C","I","II","→","✓"];

export default function ParadoxOfChoice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mxRef = useRef(0), myRef = useRef(0), outsideRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let W = canvas.clientWidth, H = canvas.clientHeight;
    canvas.width = W; canvas.height = H;
    let raf: number, time = 0;

    function makeNode(x: number, y: number, gen: number, scale: number): Node {
      const w = 110 * scale, h = 48 * scale;
      return { x, y, vx: 0, vy: 0, w, h, label: LABELS[Math.floor(Math.random() * LABELS.length)], gen };
    }

    function initNodes() {
      nodesRef.current = [
        makeNode(W * 0.5, H * 0.28, 0, 1),
        makeNode(W * 0.28, H * 0.68, 0, 1),
        makeNode(W * 0.72, H * 0.68, 0, 1),
      ];
    }
    initNodes();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect(); mxRef.current = e.clientX - r.left; myRef.current = e.clientY - r.top; outsideRef.current = false;
    };
    const onLeave = () => { outsideRef.current = true; };
    canvas.addEventListener("mousemove", onMove); canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault(); const r = canvas.getBoundingClientRect();
      mxRef.current = e.touches[0].clientX - r.left; myRef.current = e.touches[0].clientY - r.top;
    }, { passive: false });

    const ro = new ResizeObserver(() => { W = canvas.clientWidth; H = canvas.clientHeight; canvas.width = W; canvas.height = H; initNodes(); });
    ro.observe(canvas);

    function tick() {
      time++;
      const mx = mxRef.current, my = myRef.current;
      const nodes = nodesRef.current;

      if (outsideRef.current && nodes.length > 3) {
        if (time % 4 === 0) {
          nodesRef.current = nodes.slice(0, Math.max(3, nodes.length - 1));
          if (nodesRef.current.length === 3) outsideRef.current = false;
        }
      }

      if (!outsideRef.current && nodes.length < 180) {
        for (let i = nodes.length - 1; i >= 0; i--) {
          const n = nodes[i];
          const dist = Math.hypot(mx - n.x, my - n.y);
          if (dist < Math.hypot(n.w, n.h) * 0.5 + 30) {
            const nextGen = n.gen + 1, scale = Math.max(0.25, 1 - nextGen * 0.18), spread = 90 * scale;
            const angle = Math.atan2(my - n.y, mx - n.x) + Math.PI;
            const children = [-1.1, 0, 1.1].map(j => makeNode(n.x + Math.cos(angle + j) * spread, n.y + Math.sin(angle + j) * spread, nextGen, scale));
            nodes.splice(i, 1, ...children); break;
          }
        }
      }

      nodes.forEach(n => {
        n.vx += (Math.random() - 0.5) * 0.5; n.vy += (Math.random() - 0.5) * 0.5;
        const dMx = n.x - mx, dMy = n.y - my, dM = Math.hypot(dMx, dMy);
        if (dM < 180 && dM > 0.1) { const f = (180 - dM) / 180 * 4; n.vx += dMx / dM * f; n.vy += dMy / dM * f; }
        if (n.x < n.w / 2) n.vx += 1.5; if (n.x > W - n.w / 2) n.vx -= 1.5;
        if (n.y < n.h / 2) n.vy += 1.5; if (n.y > H - n.h / 2) n.vy -= 1.5;
        n.vx *= 0.85; n.vy *= 0.85; n.x += n.vx; n.y += n.vy;
      });

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = nodes.length > 40 ? `rgba(8,5,15,${Math.min(1, nodes.length / 80)})` : "#0B0B14";
      ctx.fillRect(0, 0, W, H);

      nodes.forEach(n => {
        const a = Math.max(0.25, 1 - n.gen * 0.12);
        const r = Math.max(0, 6 * (1 - n.gen * 0.1));
        ctx.save(); ctx.globalAlpha = a;
        ctx.shadowBlur = n.gen === 0 ? 20 : 8; ctx.shadowColor = `rgba(165,122,220,${0.5 * a})`;
        ctx.fillStyle = `rgba(30,20,55,${0.8 - n.gen * 0.06})`; ctx.strokeStyle = `rgba(165,122,220,${0.3 * a})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(n.x - n.w / 2, n.y - n.h / 2, n.w, n.h, r); ctx.fill(); ctx.stroke();
        ctx.font = `${Math.max(9, 13 - n.gen * 2)}px monospace`; ctx.fillStyle = `rgba(200,180,255,${a})`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.shadowBlur = 0;
        ctx.fillText(n.label, n.x, n.y); ctx.restore();
      });
      raf = requestAnimationFrame(tick);
    }
    tick();
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" style={{ touchAction: "none", background: "#0B0B14" }} />;
}
