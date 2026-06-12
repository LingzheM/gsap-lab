'use client';

import { useRef, useState } from 'react';
import { useFlip } from './useFlip';
import { CARD_COUNT, COPY, type FlipActionCopy } from './flipData';
import styles from './FlipLayout.module.css';

const initialOrder = Array.from({ length: CARD_COUNT }, (_, i) => i + 1);

export function FlipLayout() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<number[]>(initialOrder);
  const [featured, setFeatured] = useState<number | null>(null);
  const [copy, setCopy] = useState<FlipActionCopy>(COPY.feature);

  // deps:order / featured 一变就播 Flip。capture 要在改 state 前调用。
  const capture = useFlip({ scopeRef: stageRef, deps: [order, featured] });

  // 点卡片:切换主角(占 2×2),其它自动重排让位
  const toggleFeature = (id: number) => {
    capture();
    setFeatured((cur) => (cur === id ? null : id));
    setCopy(COPY.feature);
  };

  // 打乱:改 order 数组,React 按 key 重排 DOM,Flip 补位移
  const shuffle = () => {
    capture();
    setOrder((cur) => [...cur].sort(() => Math.random() - 0.5));
    setCopy(COPY.shuffle);
  };

  // 复位:回到 1–8 且无主角
  const reset = () => {
    capture();
    setOrder(initialOrder);
    setFeatured(null);
    setCopy(COPY.reset);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.kicker}>GSAP · Flip</div>
        <h1 className={styles.title}>只改 DOM，位移交给 Flip</h1>
        <p className={styles.subtitle}>
          点任意卡片放大成主角，或打乱顺序。你只改 DOM，位移全由 Flip 自动补出来。
        </p>
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
              {id}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.button} onClick={shuffle}>
          🔀 打乱顺序
        </button>
        <button className={styles.button} onClick={reset}>
          ↺ 复位
        </button>
      </div>

      <div className={styles.readout}>
        <pre className={styles.code}>{copy.code}</pre>
        <div className={styles.explain}>{copy.explain}</div>
      </div>
    </div>
  );
}
