import { forwardRef } from "react";
import styles from './ClarityStory.module.css';

export const ClarityCanvas = forwardRef<SVGPathElement>((_, ref) => {
  return (
    <div className={styles.svgStage}>
      <svg viewBox="0 0 200 200" className={styles.mainSvg}>
        <path 
          ref={ref}
          className="story-line"
          fill="none"
          stroke="#2C3E50"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 50 100 C 20 20, 180 20, 150 100 C 120 180, 20 180, 50 100 C 80 20, 180 180, 100 100 C 10 90, 190 110, 100 100"
        />
      </svg>

      <svg className={styles.hiddenPaths} viewBox="0 0 200 200">
        <path
          id="shape-leaf"
          d="M 100 30 C 140 70, 150 140, 100 170 C 50 140, 60 70, 100 30 Z"
        />
        <path
          id="shape-bloom"
          d="M 100 20 C 120 60, 170 90, 140 130 C 160 170, 100 150, 100 150 C 100 150, 40 170, 60 130 C 30 90, 80 60, 100 20 Z"
        />
      </svg>
    </div>
  );
});

ClarityCanvas.displayName = 'ClarityCanvas';