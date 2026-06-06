import { useGSAP } from "@gsap/react";
import { RefObject } from "react";

interface UseStarfieldOptions {
  containerRef: RefObject<HTMLElement | null>;
  count?: number;
}

/**
 * 在容器里生成一片静态星空。
 * 用全局class `.star`，卸载时清掉
 */
export function useStarfield({ containerRef, count = 140 }: UseStarfieldOptions) {
  useGSAP(
    () => {
      const wrap = containerRef.current;
      if (!wrap) return;

      const stars: HTMLElement[] = [];
      for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = (Math.random() * 1.8 + 0.4).toFixed(2);
        s.style.width = `${size}px`;
        s.style.height = `${size}px`;
        s.style.left = `${(Math.random() * 100).toFixed(2)}%`;
        s.style.top = `${(Math.random() * 100).toFixed(2)}%`;
        s.style.opacity = (Math.random() * 0.6 + 0.2).toFixed(2);
        wrap.appendChild(s);
        stars.push(s);
      }

      return () => stars.forEach((s) => s.remove());
    },
    { dependencies: [count] }
  );
}