'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import styles from './ClarityStory.module.css';
import { StorySteps } from "./StorySteps";
import { ClarityCanvas } from "./ClarityCnavas";
import { useClarityTimeline } from './useClarityTimeline';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function ClarityStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useClarityTimeline({ containerRef, lineRef });

  useGSAP(
    () => {
      const stepEls = gsap.utils.toArray<HTMLElement>('.step');
      stepEls.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'tom center',
          end: 'bottom center',
          toggleClass: 'active'
        });
      });
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={styles.storyContainer}>
      <StorySteps />
      <ClarityCanvas ref={lineRef} />
    </div>
  )
}