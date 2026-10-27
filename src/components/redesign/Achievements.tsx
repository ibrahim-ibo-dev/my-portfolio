"use client";

import {useEffect,useRef,useState} from "react";
import Image from "next/image";
import {AnimatePresence,motion,useReducedMotion} from "framer-motion";
import {credentials} from "./journey-data";
import "./achievements.css";
import useAutoAdvance from "./useAutoAdvance";

const priority=["ctf-competition.png","coding-competition.jpg","ai-training.jpg","nice-smart-home.png","cihan-handy-flyer.png","codex-leaderboard.jpg","ecs-signed-language.jpg","ecs-true-prence.jpg","nicer-home-system.jpg","smart-home-security.jpg","codesignal.jpg","nice-attendee.png"];
const rank=(image:string)=>{const index=priority.findIndex(name=>image.endsWith(name));return index<0?priority.length:index;};
const ranked=[...credentials].sort((a,b)=>rank(a.image)-rank(b.image));
const number=(value:number)=>String(value).padStart(2,"0");

function Arrow({previous=false}:{previous?:boolean}){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d={previous?"M20 12H4m6 6-6-6 6-6":"M4 12h16m-6-6 6 6-6 6"}/></svg>;}

export default function Achievements(){
  const [expanded,setExpanded]=useState(false),[selected,setSelected]=useState(0),[enlarged,setEnlarged]=useState(false);
  const list=useRef<HTMLDivElement>(null),tabs=useRef<(HTMLButtonElement|null)[]>([]),viewer=useRef<HTMLDialogElement>(null),rootRef=useRef<HTMLElement>(null),focusSelection=useRef(false);
  const reduced=useReducedMotion(),compactStart=Math.floor(selected/3)*3,indices=expanded?ranked.map((_,index)=>index):[0,1,2].map(offset=>compactStart+offset).filter(index=>index<ranked.length),item=ranked[selected];
  const auto=useAutoAdvance({rootRef,onAdvance:()=>setSelected(index=>(index+1)%ranked.length),paused:enlarged,resetKey:selected});
  const select=(index:number,focus=false)=>{auto.pause();const next=(index+ranked.length)%ranked.length;focusSelection.current=focus;setSelected(next);if(focus&&next===selected){tabs.current[next]?.focus();focusSelection.current=false;}};
  useEffect(()=>{
    if(focusSelection.current){tabs.current[selected]?.focus();focusSelection.current=false;}
    if(!window.matchMedia("(max-width: 760px)").matches)return;
    const node=tabs.current[selected],rail=list.current;
    if(node&&rail)rail.scrollTo({left:node.offsetLeft-rail.offsetLeft-(rail.clientWidth-node.offsetWidth)/2,behavior:reduced?"auto":"smooth"});
  },[selected,expanded,reduced]);
  const toggleAll=()=>{auto.pause();setExpanded(value=>!value);};

  return <section ref={rootRef} id="credentials" className="nx-achievements nx-container" aria-labelledby="credentials-heading">
    <div className="nx-achievements-heading"><div><span className="nx-section-label">05 / MILESTONES ALONG THE WAY</span><h2 id="credentials-heading" className="nx-section-heading">Earned through<br/><span>doing.</span></h2></div><p>Competitions, exhibitions and learning experiences.<br/>A few moments that mark the journey.</p></div>
    <div className="nx-award-exhibit">
      <div className="nx-award-index">
        <div className="nx-award-index-heading"><span>{expanded?"THE COMPLETE INDEX":"MILESTONE INDEX"}</span><span>{number(indices.length)} / {number(ranked.length)}</span></div>
        <div ref={list} id="milestone-index-list" className="nx-award-index-list" role="tablist" aria-label="Choose a milestone">
          {indices.map(index=>{const entry=ranked[index];return <button key={entry.image} type="button" role="tab" id={`milestone-tab-${index}`} aria-selected={selected===index} aria-controls="milestone-exhibit" tabIndex={selected===index?0:-1} ref={node=>{tabs.current[index]=node;}} onClick={()=>select(index)} onKeyDown={event=>{
            if(["ArrowDown","ArrowRight","ArrowUp","ArrowLeft","Home","End"].includes(event.key)){
              event.preventDefault();select(event.key==="Home"?0:event.key==="End"?ranked.length-1:selected+(["ArrowDown","ArrowRight"].includes(event.key)?1:-1),true);
            }
          }}><span className="nx-award-row-number">{number(index+1)}</span><Image src={entry.image} alt="" width={56} height={48} sizes="56px"/><span className="nx-award-row-copy"><small>{entry.badge.replace("// ","")}</small><strong>{entry.title}</strong></span><span className="nx-award-row-marker" aria-hidden="true">{selected===index?"↙":"+"}</span></button>;})}
        </div>
        <button className="nx-award-browse" type="button" aria-expanded={expanded} aria-controls="milestone-index-list" onClick={toggleAll}>{expanded?"Show compact index":`Browse all ${ranked.length} milestones`}<span aria-hidden="true">{expanded?"−":"+"}</span></button>
        <p id="milestone-index-note" className="nx-award-index-note">{expanded?"Select a milestone to explore its story.":"A few highlights. An ongoing journey."}</p>
      </div>

      <div className="nx-award-preview" role="tabpanel" id="milestone-exhibit" aria-labelledby={`milestone-tab-${selected}`}>
        <div className="nx-award-stage">
          <span className="nx-award-stage-rule" aria-hidden="true"/>
          <span className="nx-award-stage-label" aria-hidden="true">A MOMENT IN THE JOURNEY</span>
          <AnimatePresence mode="wait" initial={false}><motion.div key={item.image} className="nx-award-sheet" initial={{opacity:0,y:reduced?0:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-6}} transition={{duration:reduced?0:.22}}>
            <Image src={item.image} alt={item.title} fill sizes="(max-width:760px) calc(100vw - 36px), (max-width:1200px) 53vw, 720px"/>
          </motion.div></AnimatePresence>
          <button type="button" className="nx-award-zoom" onClick={()=>{if(viewer.current&&!viewer.current.open){viewer.current.showModal();setEnlarged(true);}}} aria-label={`Enlarge image: ${item.title}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6"/></svg><span>View image</span></button>
        </div>
        <div className="nx-award-viewer-controls"><span>IMAGE {number(selected+1)} <i>/ {number(ranked.length)}</i></span><div><button type="button" onClick={()=>select(selected-1)} aria-label="Previous milestone"><Arrow previous/></button><button type="button" onClick={()=>select(selected+1)} aria-label="Next milestone"><Arrow/></button><button type="button" data-autoplay-toggle aria-label={auto.playing?"Pause automatic milestone slides":"Play automatic milestone slides"} title={auto.playing?"Pause slideshow":"Play slideshow"} onClick={auto.toggle}><span aria-hidden="true">{auto.playing?"Ⅱ":"▷"}</span></button></div></div>
        <div className="nx-award-story" aria-live={auto.playing?"off":"polite"} aria-atomic="true"><span>{item.subtitle}</span><h3>{item.title}</h3><p>{item.text}</p></div>
      </div>
    </div>

    <dialog className="nx-award-lightbox" ref={viewer} aria-labelledby="nx-award-lightbox-title" data-lenis-prevent onClose={()=>setEnlarged(false)} onClick={event=>{if(event.target===event.currentTarget)viewer.current?.close();}}>
      <div className="nx-award-lightbox-inner"><header><h2 id="nx-award-lightbox-title">{item.title}</h2><button type="button" onClick={()=>viewer.current?.close()} aria-label="Close image viewer" autoFocus>Close <span aria-hidden="true">×</span></button></header><img src={item.image} alt={item.title}/><a href={item.image} target="_blank" rel="noopener noreferrer">Open original image <span aria-hidden="true">↗</span></a></div>
    </dialog>
  </section>;
}
