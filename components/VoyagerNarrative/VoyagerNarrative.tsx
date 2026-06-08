'use client';

import { useRef } from 'react';
import { MissionHud } from './MissionHud';
import { useStarfield } from './useStarfield';
import { useVoyagerTimeline } from './useVoyagerTimeline';
import { NARRATION, GREETINGS } from './scenes';
import styles from './VoyagerNarrative.module.css';

// 探测器图标（边界场景 + 永恒场景共用同一段 SVG）
function ProbeIcon({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" stroke={stroke} strokeWidth={2} className={styles.probeSvg}>
      <circle cx="42" cy="40" r="26" />
      <circle cx="42" cy="40" r="3" fill={stroke} />
      <line x1="42" y1="40" x2="42" y2="6" />
      <line x1="64" y1="40" x2="112" y2="40" />
      <rect x="60" y="32" width="16" height="16" fill="#0c1118" />
    </svg>
  );
}

export function VoyagerNarrative() {
  const rootRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLElement>(null);
  const distRef = useRef<HTMLElement>(null);

  useStarfield({ containerRef: starsRef });
  useVoyagerTimeline({ rootRef, yearRef, distRef });

  return (
    <div ref={rootRef} className={styles.root}>
      <div ref={starsRef} className={styles.stars} aria-hidden />

      <MissionHud yearRef={yearRef} distRef={distRef} />

      {/* ① 序幕 · 亲密 */}
      <section className={`${styles.scene} sc-prologue`}>
        <p className={`${styles.narr} prologue-line`}>{NARRATION.prologue}</p>
        <p className={`${styles.sub} prologue-sub`}>{NARRATION.prologueSub}</p>
        <div className={`${styles.scrollHint} scroll-hint`}>向下滚动 ↓</div>
      </section>

      {/* ② 发射 · 紧张 */}
      <section className={`${styles.scene} ${styles.launch} sc-launch`}>
        <div className={`${styles.earth} earth`}>
          <div className={`${styles.streak} streak`} />
        </div>
        <div className={`${styles.lCaption} launch-cap`}>{NARRATION.launchCaption}</div>
      </section>

      {/* ③ 飞掠 · 惊叹 */}
      <section className={`${styles.scene} sc-flyby`}>
        <div className={styles.eyebrow}>{NARRATION.flybyEyebrow}</div>
        <div className={styles.planets}>
          <div className={`${styles.planet} planet`}>
            <div className={styles.jupiter} />
          </div>
          <div className={`${styles.planet} planet`}>
            <div className={styles.saturn} />
            <div className={`${styles.ring} ring`} />
          </div>
        </div>
        <p className={`${styles.narr} ${styles.fCaption} f-caption`}>
          我们路过了<span className={styles.em}>巨人</span>。
        </p>
      </section>

      {/* ④ 暗淡蓝点 · 谦卑 */}
      <section className={`${styles.scene} ${styles.dot} sc-dot`}>
        <div className={styles.dotStage}>
          <div className={`${styles.sunbeam} sunbeam`} />
          <div className={`${styles.bluedot} bluedot`} />
          <p className={`${styles.dotNarr} dot-narr`}>{NARRATION.dotNarr}</p>
        </div>
      </section>

      {/* ⑤ 星际边界 · 孤独 */}
      <section className={`${styles.scene} sc-interstellar`}>
        <div className={styles.eyebrow}>{NARRATION.interstellarEyebrow}</div>
        <div className={`${styles.boundStage} bound-stage`}>
          <div className={`${styles.boundary} boundary`} />
          <div className={`${styles.probe} ${styles.probe4} probe4`}>
            <ProbeIcon stroke="#cdd6df" />
          </div>
        </div>
        <p className={`${styles.iCaption} i-caption`}>
          从此，<span className={styles.em}>只剩它自己</span>。
        </p>
      </section>

      {/* ⑥ 黄金唱片 · 希望 */}
      <section className={`${styles.scene} sc-record`}>
        <div className={styles.eyebrow}>{NARRATION.recordEyebrow}</div>
        <div className={styles.discStage}>
          <div className={`${styles.disc} disc`} />
          {GREETINGS.map((g, i) => (
            <span key={i} className={`${styles.greeting} greeting`} style={g.style}>
              {g.text}
            </span>
          ))}
        </div>
        <p className={`${styles.rCaption} record-cap`}>
          我们说：<span className={styles.em}>你好。</span>
        </p>
      </section>

      {/* ⑦ 永恒 · 苦涩 */}
      <section className={`${styles.scene} ${styles.eternity} sc-eternity`}>
        <div className={styles.probeWrap}>
          <div className={`${styles.probe} probe6`}>
            <ProbeIcon stroke="#9aa3ac" />
          </div>
        </div>
        <p className={`${styles.endNarr} end-line`}>{NARRATION.endLine}</p>
        <div className={styles.colophon}>
          Voyager 1 · 1977 — 仍在飞行
          <br />
        </div>
      </section>
    </div>
  );
}
