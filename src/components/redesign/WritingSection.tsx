"use client";
import {useRef,useState} from "react";
import {AnimatePresence,motion,useReducedMotion} from "framer-motion";
import type {FeaturedWriting} from "@/data/featured-expression";
import "./expression.css";
import CollectionGateway from "./CollectionGateway";
import "./writing-spotlight.css";
import useAutoAdvance from "./useAutoAdvance";

export default function WritingSection({pieces}:{pieces:FeaturedWriting[]}){
  const [selected,setSelected]=useState(0),tabs=useRef<(HTMLButtonElement|null)[]>([]),rootRef=useRef<HTMLElement>(null);
  const reduced=useReducedMotion();
  const choices=pieces.slice(0,3),piece=choices[selected]||choices[0];
  const auto=useAutoAdvance({rootRef,onAdvance:()=>setSelected(index=>(index+1)%choices.length),paused:choices.length<2,resetKey:selected});
  const choose=(index:number,focus=false)=>{auto.pause();const next=(index+choices.length)%choices.length;setSelected(next);if(focus)tabs.current[next]?.focus();};
  return <section ref={rootRef} className="nx-writing nx-container" id="words" aria-labelledby="words-heading">
    <div className="nx-section-heading nx-collection-heading"><div><span className="nx-section-label">06 / WRITINGS</span><h2 id="words-heading">Words & Ideas.</h2></div></div>
    {piece?<div className="nx-reading-window">
      <div className="nx-reading-tabs" role="tablist" aria-label="Choose a writing">{choices.map((item,index)=><button role="tab" type="button" id={`writing-tab-${item.slug}`} key={item.slug} ref={node=>{tabs.current[index]=node;}} aria-selected={selected===index} aria-controls="writing-preview-panel" tabIndex={selected===index?0:-1} onClick={()=>choose(index)} onKeyDown={event=>{if(["ArrowLeft","ArrowRight","Home","End"].includes(event.key)){event.preventDefault();choose(event.key==="Home"?0:event.key==="End"?choices.length-1:selected+(event.key==="ArrowRight"?1:-1),true);}}}>
        {item.cover&&<img src={item.cover} alt="" loading="lazy"/>}<span><small>{String(index+1).padStart(2,"0")} / {item.kind||"WRITING"}</small><strong lang="ckb" dir="rtl">{item.title}</strong></span><i aria-hidden="true">{selected===index?"●":"○"}</i>
      </button>)}</div>
      <div className="nx-reading-stage" role="tabpanel" id="writing-preview-panel" aria-labelledby={`writing-tab-${piece.slug}`}>
        <AnimatePresence mode="wait" initial={false}><motion.article key={piece.slug} className="nx-reading-feature" initial={{opacity:0,y:reduced?0:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-8}} transition={{duration:reduced?0:.23}}>
          <div className="nx-reading-art">{piece.cover&&<img src={piece.cover} alt="" loading="lazy" decoding="async"/>}<span aria-hidden="true" className="nx-reading-art-rule"/></div>
          <div className="nx-reading-content">
            <span className="nx-reading-kind">{String(selected+1).padStart(2,"0")} / {piece.kind||"WRITING"}</span>
            <blockquote lang="ckb" dir="rtl"><span aria-hidden="true">“</span>{piece.quote||piece.title}</blockquote>
            <h3 lang="ckb" dir="rtl">{piece.title}</h3>
            <a className="nx-reading-open" href={`https://words.ibrahim-eng.dev/${piece.slug}`}>Read this writing <span aria-hidden="true">↗</span></a>
          </div>
        </motion.article></AnimatePresence>
        <div className="nx-reading-pager" aria-label="Writing preview controls"><button onClick={()=>choose(selected-1)} aria-label="Preview previous writing">←</button><span aria-live={auto.playing?"off":"polite"}>{String(selected+1).padStart(2,"0")} <i>/ {String(choices.length).padStart(2,"0")}</i></span><button onClick={()=>choose(selected+1)} aria-label="Preview next writing">→</button><button type="button" data-autoplay-toggle aria-label={auto.playing?"Pause automatic writing slides":"Play automatic writing slides"} title={auto.playing?"Pause slideshow":"Play slideshow"} onClick={auto.toggle}><span aria-hidden="true">{auto.playing?"Ⅱ":"▷"}</span></button></div>
      </div>
    </div>:<p className="nx-collection-empty">No writings published yet.</p>}
  <CollectionGateway href="https://words.ibrahim-eng.dev" title="Read more on Words &amp; Ideas" detail="Visit the dedicated writing website"/></section>;
}
