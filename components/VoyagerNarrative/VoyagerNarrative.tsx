"use client";
import { useRef } from "react"
import styles from './VoyagerNarrative.module.css';

export function VoyagerNarrative() {
  
  const rootRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={rootRef} className={styles.root}>
        <div ref={starsRef} className={styles.stars} aria-hidden />
    
        {/** 1. 序幕 亲密 */}
        <section className={`${styles.scene} sc-prologue`}>
          <p className={`${styles.narr} prologue-line`}>{}</p>
          <p className={`${styles.sub} prologue-sub`}>{}</p>
          <div className={`${styles.scrollHint} scroll-hint`}>向下滚动 ↓</div>
        </section>
    </div>
  )
}