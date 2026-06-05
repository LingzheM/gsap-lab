"use client";
import { useRef } from "react"
import styles from './VoyagerNarrative.module.css';
import { NARRATION } from "./scene";
import { UseVoyagerTimeline } from "./useVoyagerTimeline";

export function VoyagerNarrative() {
  
  const rootRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLElement>(null);
  const distRef = useRef<HTMLElement>(null);

  UseVoyagerTimeline({ rootRef, yearRef, distRef });
  
  return (
    <div ref={rootRef} className={styles.root}>
        <div ref={starsRef} className={styles.stars} aria-hidden />
    
        {/** 1. 序幕 亲密 */}
        <section className={`${styles.scene} sc-prologue`}>
          <p className={`${styles.narr} prologue-line`}>{NARRATION.prologue}</p>
          <p className={`${styles.sub} prologue-sub`}>{NARRATION.prologueSub}</p>
          <div className={`${styles.scrollHint} scroll-hint`}>向下滚动 ↓</div>
        </section>

        {/** 2. 发射 紧张 */}
        <section className={`${styles.scene} ${styles.launch} sc-launch`}>
          <div className={`${styles.earch} earth`}>
            <div className={`${styles.streak} streak`} />
          </div>
          <div className={`${styles.lcaption} launch-cap`}>{NARRATION.launchCaption}</div>
        </section>
    </div>
  )
}