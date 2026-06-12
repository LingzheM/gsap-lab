"use client";

import { useRef, useState } from 'react';
import styles from './FlipLayout.module.css';
import { CARD_COUNT, FlipActionCopy, COPY } from './flipData';
import { useFlip } from './useFlip';

const initialOrder = Array.from({ length: CARD_COUNT }, (_, i) => i + 1);

export function FlipLayout() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<number[]>(initialOrder);
  const [featured, setFeatured] = useState<number | null>(null);
  const [copy, setCopy] = useState<FlipActionCopy>(COPY.feature);

  const capture = useFlip({ scopeRef: stageRef, deps: [order, featured] });

  const toggleFeature = (id: number) => {
    capture();
    setFeatured((cur) => (cur === id ? null : id));
    setCopy(COPY.feature);
  } 

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.kicker}>
          GSAP Flip
        </div>
        <h1 className={styles.title}>只改DOM，位移交给Flip</h1>
        <p className={styles.subtitle}>点任意卡片放大成主角，或打乱顺序。</p>
      </header>

      <div ref={stageRef} className={styles.stage}>
        <div className={styles.grid}>
          {order.map((id) => (
            <div
              key={id}
              className={`${styles.card} ${featured === id ? styles.featured : ''} flip-card`}
              onClick={() => toggleFeature(id)}
            >
              <span className={styles.dot} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
          <button>

          </button>
      </div>

      <div className={styles.readout}>
        <pre className={styles.code}>{copy.code}</pre>
        <div className={styles.explain}>{copy.explain}</div>
      </div>
    </div>
  )
}