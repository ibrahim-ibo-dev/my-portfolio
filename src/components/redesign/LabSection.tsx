"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import CollectionGateway from "./CollectionGateway";

const loading = () => <div className="nx-lab-loading" role="status">Preparing the experience…</div>;
const IllusionCanvas = dynamic(() => import("../experiments/IllusionOfOpportunity"), { ssr: false, loading });
const WeightCanvas = dynamic(() => import("../experiments/WeightOfThePast"), { ssr: false, loading });
const HorizonCanvas = dynamic(() => import("../experiments/EndlessHorizon"), { ssr: false, loading });
const FragilityCanvas = dynamic(() => import("../experiments/FragilityOfConnection"), { ssr: false, loading });
const EchoCanvas = dynamic(() => import("../experiments/EchoChamber"), { ssr: false, loading });
const ParadoxCanvas = dynamic(() => import("../experiments/ParadoxOfChoice"), { ssr: false, loading });
const BlindnessCanvas = dynamic(() => import("../experiments/SelectiveBlindness"), { ssr: false, loading });
const ButterflyCanvas = dynamic(() => import("../experiments/ButterflyEffect"), { ssr: false, loading });

const experiments = [
  { id: "illusion-opportunity", title: "The Illusion of Opportunity", description: "A psychological simulation where 10 open doors beautifully glow, but violently slam shut the moment you step towards them.", labUrl: "https://lab.ibrahim-eng.dev/illusion/", category: "Psychology", tags: ["Canvas", "Physics"], Canvas: IllusionCanvas, hint: "Move slowly toward the doors and watch them respond." },
  { id: "weight-of-past", title: "The Weight of the Past", description: "Moving too fast spawns heavy shadows that tether to your soul. Freedom comes only when you stop to accept them.", labUrl: "https://lab.ibrahim-eng.dev/weight/", category: "Philosophy", tags: ["Kinematics", "Philosophy"], Canvas: WeightCanvas, hint: "Move through the canvas, then pause and observe." },
  { id: "endless-horizon", title: "The Endless Horizon", description: "The goal mathematically repels you. But the faster you chase the unreachable, the more breathtaking the background becomes.", labUrl: "https://lab.ibrahim-eng.dev/horizon/", category: "Concept", tags: ["Trigonometry", "Canvas"], Canvas: HorizonCanvas, hint: "Move toward the horizon to explore the changing scene." },
  { id: "fragility-connection", title: "The Fragility of Connection", description: "Building a crystalline connection requires extremely slow movements. A single sudden jerk violently shatters the bond.", labUrl: "https://lab.ibrahim-eng.dev/fragility/", category: "Emotion", tags: ["Velocity Tracking", "Particles"], Canvas: FragilityCanvas, hint: "Move slowly to build a connection. Speed changes everything." },
  { id: "echo-chamber", title: "The Echo Chamber", description: "Accepting only familiar shapes makes your bubble thicker and darker. Rejecting opposing views isolates you completely.", labUrl: "https://lab.ibrahim-eng.dev/echo/", category: "Social", tags: ["Collision Math", "UI"], Canvas: EchoCanvas, hint: "Explore how your movement affects the shapes around you." },
  { id: "paradox-of-choice", title: "The Paradox of Choice", description: "Three calm choices fracture into hundreds the moment you approach one. The only peace is to stop choosing entirely.", labUrl: "https://lab.ibrahim-eng.dev/paradox/", category: "Cognitive", tags: ["Swarm Physics", "Spawn Logic"], Canvas: ParadoxCanvas, hint: "Approach a choice, then stop moving to let the scene settle." },
  { id: "selective-blindness", title: "Selective Blindness", description: "The truth is written in giant letters — but your spotlight reveals only addictive distractions. Sweep fast to see it.", labUrl: "https://lab.ibrahim-eng.dev/blindness/", category: "Attention", tags: ["Canvas Masking", "Particles"], Canvas: BlindnessCanvas, hint: "Sweep across the canvas to reveal what is hidden." },
  { id: "butterfly-effect", title: "The Butterfly Effect", description: "A silent grid of thousands of dots. One click sends a wave that warps the entire universe into breathtaking patterns.", labUrl: "https://lab.ibrahim-eng.dev/butterfly/", category: "Chaos Theory", tags: ["Wave Function", "10k Dots"], Canvas: ButterflyCanvas, hint: "Click or tap anywhere in the canvas to send a wave." },
];

function Arrow() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>; }

export default function LabSection({ motionPaused = false }: { motionPaused?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const experiment = experiments[selected];
  const Canvas = experiment.Canvas;
  const select = (index: number) => { setPlaying(false); setSelected(index); };

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => setPlaying(false);
    const visibility = () => { if (document.hidden) stop(); };
    const observer = new IntersectionObserver(entries => { if (!entries[0]?.isIntersecting) stop(); }, { rootMargin: "80px" });
    if (panelRef.current) observer.observe(panelRef.current);
    motion.addEventListener("change", stop);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); motion.removeEventListener("change", stop); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  useEffect(() => { if (motionPaused) setPlaying(false); }, [motionPaused]);

  return <section id="philosophy" className="nx-lab nx-container" aria-labelledby="nx-lab-heading">
    <div className="nx-lab-heading-row">
      <div><span className="nx-section-label">07 / THE EXPERIMENTAL SIDE</span><h2 id="nx-lab-heading" className="nx-section-heading">Beyond the practical.<br /><span>Code with feeling.</span></h2></div>
      <p>Small worlds built with code. Eight interactive explorations of psychology, perception and the things that make us human.</p>
    </div>
    <div className="nx-lab-console">
      <div className="nx-lab-console-header"><span><i /> THE EXPERIMENT LAB</span><span>08 EXPLORATIONS / ONE CURIOUS MIND</span></div>
      <div className="nx-lab-layout">
        <div className="nx-lab-picker" role="group" aria-label="Choose an experiment">
          {experiments.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} aria-controls="nx-lab-preview" onClick={() => select(index)}><span>{String(index + 1).padStart(2, "0")}</span><span>{item.title.replace(/^The /, "")}</span><span aria-hidden="true">↗</span></button>)}
        </div>
        <label className="nx-lab-mobile-picker">Choose an experiment<select value={selected} onChange={e => select(Number(e.target.value))}>{experiments.map((item, index) => <option value={index} key={item.id}>{String(index + 1).padStart(2, "0")} — {item.title}</option>)}</select></label>
        <div id="nx-lab-preview" className="nx-lab-preview" ref={panelRef}>
          <div className="nx-lab-stage" aria-label={`${experiment.title} interactive preview`}>
            {playing ? <Canvas key={experiment.id} /> : <div className="nx-lab-invitation">
              <svg className="nx-lab-orbit" viewBox="0 0 440 330" fill="none" aria-hidden="true">
                <ellipse cx="220" cy="165" rx="185" ry="90" stroke="currentColor" strokeOpacity=".13" transform="rotate(-25 220 165)" />
                <ellipse cx="220" cy="165" rx="145" ry="145" stroke="currentColor" strokeOpacity=".12" />
                <circle cx="220" cy="165" r="95" stroke="currentColor" strokeOpacity=".17" strokeDasharray="2 9" />
                <ellipse cx="220" cy="165" rx="52" ry="145" stroke="currentColor" strokeOpacity=".1" transform="rotate(40 220 165)" />
                <circle cx="87" cy="227" r="5" fill="#c9a781" /><circle cx="321" cy="62" r="4" fill="#92b7b8" /><circle cx="317" cy="212" r="3" fill="#9e8ebf" />
              </svg>
              <span className="nx-lab-stage-index" aria-hidden="true">{String(selected + 1).padStart(2, "0")}</span>
              <span className="nx-lab-invitation-label">{experiment.category.toUpperCase()} / INTERACTIVE STUDY</span>
              <button type="button" className="nx-lab-play" onClick={() => setPlaying(true)} aria-label={`Try ${experiment.title} interactive preview`}><svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2 14 8 4 14Z" fill="currentColor" /></svg>Try interactive preview</button>
              <span className="nx-lab-preview-note">Starts on your cue. Explore with a cursor or touch.</span>
            </div>}
            {playing && <button type="button" className="nx-lab-stop" onClick={() => setPlaying(false)}>Stop preview <span aria-hidden="true">Ⅱ</span></button>}
          </div>
          <div className="nx-lab-caption" aria-live="polite">
            <div className="nx-lab-caption-top"><span>{experiment.category}</span><div>{experiment.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
            <h3>{experiment.title}</h3><p>{experiment.description}</p>
            <div className="nx-lab-caption-bottom"><span>{playing ? experiment.hint : "An experiment in code & psychology."}</span><a href={experiment.labUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${experiment.title} on the Lab website (opens in new tab)`}>Open this experiment <Arrow /></a></div>
          </div>
        </div>
      </div>
    </div>
    <CollectionGateway href="https://lab.ibrahim-eng.dev" title="Explore the full Experiment Lab" detail="Eight experiments. A dedicated website to explore them all."/>
  </section>;
}
