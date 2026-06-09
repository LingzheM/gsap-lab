'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import styles from './ClarityStory.module.css';
import { StorySteps } from "./StorySteps";
import { ClarityCanvas } from "./ClarityCnavas";

gsap.registerPlugin(ScrollTrigger);

export function ClarityStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  return (
    <div ref={containerRef} className={styles.storyContainer}>
      <StorySteps />
      <ClarityCanvas ref={lineRef} />
    </div>
  )
}