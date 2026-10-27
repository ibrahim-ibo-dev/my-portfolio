"use client";
import {useEffect,useRef,useState} from "react";
import {createPortal} from "react-dom";
import {AnimatePresence,motion,useReducedMotion} from "framer-motion";
import "./mobile-navigation.css";

const discover=[{id:"projects",label:"Selected work"},{id:"philosophy",label:"Playground"},{id:"words",label:"Words & Ideas"},{id:"motion",label:"Motion & Stories"}];
const profile=[{id:"about",label:"About me"},{id:"experience",label:"Journey"},{id:"skills",label:"Expertise"},{id:"credentials",label:"Achievements"}];
export default function MobileNavigation({open,onClose,active,returnFocus}:{open:boolean;onClose:()=>void;active:string;returnFocus:React.RefObject<HTMLButtonElement>}){
  const [mounted,setMounted]=useState(false),dialog=useRef<HTMLDivElement>(null),close=useRef<HTMLButtonElement>(null);
  const reduced=useReducedMotion();
  useEffect(()=>setMounted(true),[]);
  useEffect(()=>{
    if(!open)return;
    const previous=document.body.style.overflow;
    const page=document.querySelector<HTMLElement>('.nx-portfolio');
    const wasInert=page?.inert;
    document.body.style.overflow="hidden";
    if(page)page.inert=true;
    close.current?.focus();
    const key=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){event.preventDefault();onClose();return;}
      if(event.key!=="Tab")return;
      const nodes=Array.from(dialog.current?.querySelectorAll<HTMLElement>('a[href],button')||[]);
      const first=nodes[0],last=nodes[nodes.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
    };
    document.addEventListener('keydown',key);
    return()=>{document.body.style.overflow=previous;if(page)page.inert=!!wasInert;document.removeEventListener('keydown',key);returnFocus.current?.focus();};
  },[open,onClose,returnFocus]);
  if(!mounted)return null;
  return createPortal(<AnimatePresence>{open&&<motion.div className="nx-menu-overlay" key="navigation" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.22}} data-lenis-prevent>
    <button className="nx-menu-scrim" onClick={onClose} aria-label="Dismiss navigation" tabIndex={-1}/>
    <motion.div className="nx-menu-panel" ref={dialog} role="dialog" aria-modal="true" aria-label="Navigation" id="nx-mobile-navigation" initial={reduced?false:{y:18,scale:.98}} animate={{y:0,scale:1}} exit={reduced?{}:{y:12,scale:.99}} transition={{duration:.28,ease:[.22,1,.36,1]}}>
      <div className="nx-menu-head"><a href="#hero" onClick={onClose} aria-label="Back to top" className="nx-menu-brand">ih<span>.</span></a><button ref={close} className="nx-menu-close" onClick={onClose} aria-label="Close menu"><span>Close</span><i aria-hidden="true"/></button></div>
      <div className="nx-menu-body">
        <p className="nx-menu-label">DISCOVER</p>
        <motion.nav aria-label="Mobile navigation" initial="hidden" animate="visible" variants={{visible:{transition:{staggerChildren:reduced?0:.045,delayChildren:.06}}}}>
          {discover.map(item=><motion.a key={item.id} href={`#${item.id}`} onClick={onClose} aria-current={active===item.id?"location":undefined} variants={{hidden:{opacity:0,y:reduced?0:14},visible:{opacity:1,y:0}}} transition={{duration:.3}}>{item.label}<span aria-hidden="true">↗</span></motion.a>)}
        </motion.nav>
        <p className="nx-menu-label nx-menu-profile-label">THE PERSON BEHIND IT</p>
        <nav className="nx-menu-profile" aria-label="Profile navigation">{profile.map(item=><a key={item.id} href={`#${item.id}`} onClick={onClose} aria-current={active===item.id?"location":undefined}>{item.label}<span aria-hidden="true">→</span></a>)}</nav>
      </div>
      <div className="nx-menu-foot"><a href="#contact" onClick={onClose}>Let’s talk <span aria-hidden="true">↗</span></a><span>ERBIL, KURDISTAN</span></div>
    </motion.div>
  </motion.div>}</AnimatePresence>,document.body);
}
