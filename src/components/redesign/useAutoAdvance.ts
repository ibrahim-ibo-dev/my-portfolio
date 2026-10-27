"use client";

import {useCallback,useEffect,useRef,useState,type RefObject} from "react";

type Options={
  rootRef:RefObject<HTMLElement>;
  onAdvance:()=>void;
  intervalMs?:number;
  paused?:boolean;
  resetKey?:string|number;
};

export default function useAutoAdvance({rootRef,onAdvance,intervalMs=3000,paused=false,resetKey}:Options){
  // Keep the server and the first client render identical. Preferences are read after mount.
  const [playing,setPlaying]=useState(true);
  const playingRef=useRef(true),advanceRef=useRef(onAdvance);
  const [environment,setEnvironment]=useState({visible:false,tabVisible:false,hovered:false,touchHeld:false});
  const pause=useCallback(()=>{playingRef.current=false;setPlaying(false);},[]);
  const toggle=useCallback(()=>{const next=!playingRef.current;playingRef.current=next;setPlaying(next);},[]);

  useEffect(()=>{advanceRef.current=onAdvance;},[onAdvance]);

  useEffect(()=>{
    const root=rootRef.current;
    if(!root)return;
    const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverCapable=window.matchMedia("(hover: hover) and (pointer: fine)");
    const touches=new Set<number>();
    let alive=true;
    const patch=(value:Partial<typeof environment>)=>{
      if(alive)setEnvironment(current=>({...current,...value}));
    };
    const visibility=()=>patch({tabVisible:document.visibilityState==="visible"});
    const preferenceChanged=()=>{if(preference.matches)pause();};
    const entered=(event:PointerEvent)=>{if(event.pointerType==="mouse")patch({hovered:true});};
    const left=(event:PointerEvent)=>{if(event.pointerType==="mouse")patch({hovered:false});};
    const touchDown=(event:PointerEvent)=>{
      if(event.pointerType!=="touch")return;
      touches.add(event.pointerId);patch({touchHeld:true});
    };
    const touchReleased=(event:PointerEvent)=>{
      if(!touches.delete(event.pointerId))return;
      patch({touchHeld:touches.size>0});
    };
    const blurred=()=>{touches.clear();patch({touchHeld:false,hovered:false});};
    const focusEntered=(event:FocusEvent)=>{
      const target=event.target;
      // A deliberate Play action must work even while its button retains keyboard focus.
      if(target instanceof Element&&target.closest("[data-autoplay-toggle]"))return;
      pause();
    };
    const measure=()=>{
      const rect=root.getBoundingClientRect();
      patch({visible:rect.bottom>0&&rect.right>0&&rect.top<window.innerHeight&&rect.left<window.innerWidth});
    };
    let observer:IntersectionObserver|undefined;
    if(typeof IntersectionObserver!=="undefined"){
      observer=new IntersectionObserver(entries=>patch({visible:!!entries[0]?.isIntersecting&&entries[0].intersectionRatio>=.1}),{threshold:[0,.1]});
      observer.observe(root);
    }else{
      measure();window.addEventListener("scroll",measure,{passive:true});window.addEventListener("resize",measure);
    }
    visibility();preferenceChanged();
    patch({hovered:hoverCapable.matches&&root.matches(":hover")});
    if(root.contains(document.activeElement)&&!(document.activeElement instanceof Element&&document.activeElement.closest("[data-autoplay-toggle]")))pause();
    document.addEventListener("visibilitychange",visibility);
    preference.addEventListener("change",preferenceChanged);
    root.addEventListener("pointerenter",entered);
    root.addEventListener("pointerleave",left);
    root.addEventListener("pointerdown",touchDown,{passive:true});
    root.addEventListener("focusin",focusEntered);
    window.addEventListener("pointerup",touchReleased,true);
    window.addEventListener("pointercancel",touchReleased,true);
    window.addEventListener("blur",blurred);
    return()=>{
      alive=false;observer?.disconnect();
      window.removeEventListener("scroll",measure);window.removeEventListener("resize",measure);
      document.removeEventListener("visibilitychange",visibility);
      preference.removeEventListener("change",preferenceChanged);
      root.removeEventListener("pointerenter",entered);root.removeEventListener("pointerleave",left);
      root.removeEventListener("pointerdown",touchDown);root.removeEventListener("focusin",focusEntered);
      window.removeEventListener("pointerup",touchReleased,true);window.removeEventListener("pointercancel",touchReleased,true);
      window.removeEventListener("blur",blurred);
    };
  },[rootRef,pause]);

  useEffect(()=>{
    if(!playing||paused||!environment.visible||!environment.tabVisible||environment.hovered||environment.touchHeld)return;
    const timer=window.setInterval(()=>{
      if(playingRef.current&&document.visibilityState==="visible")advanceRef.current();
    },Math.max(1000,intervalMs));
    return()=>window.clearInterval(timer);
  },[playing,paused,environment.visible,environment.tabVisible,environment.hovered,environment.touchHeld,intervalMs,resetKey]);

  return {playing,toggle,pause};
}
