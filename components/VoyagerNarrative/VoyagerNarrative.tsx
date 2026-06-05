"use client";
import { useRef } from "react"
import styles from './VoyagerNarrative.module.css';

export function VoyagerNarrative() {
  
  const rootRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={rootRef} className={styles.root}>
        <div ref={starsRef} className={styles.stars} aria-hidden />
    </div>
  )
}