import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

interface UseClarityTimelineOptions {
  /** 滚动容器（整个story） */
  containerRef: RefObject<HTMLElement | null>;
  /** 被动画的主线条 path */
  lineRef: RefObject<SVGPathElement | null>;
}

export function useClarityTimeline({ containerRef, lineRef }: UseClarityTimelineOptions) {
  useGSAP(
    () => {
      const line = lineRef.current;
      if(!line) return;

      // 初始：把线“擦掉”，准备用DrawSVG 一笔笔画画出来
      gsap.set(line, { drawSVG: '0%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // 阶段1：混沌——DrawSVG把复杂线团画出来
      tl.to(line, { drawSVG: '100%', duration: 1, ease: 'power2.inOut' })
        .to(line, {
          morphSVG: '#shape-leaf',
          stroke: '#27AE60',
          strokeWidth: 4,
          fill: 'rgba(39, 174, 96, 0.1)',
          duration: 1.5,
          ease: 'sine.inOut',
        })
        .to(line, {
          morphSVG: '#shape-bottom',
          stroke: '#E74C3C',
          fill: 'rgba(231, 76, 60, 0.2)',
          scale: 1.1,
          transformOrigin: 'center center',
          duration: 1.5,
          ease: 'power1.inOut',
        });
    },
    { scope: containerRef }
  );
}