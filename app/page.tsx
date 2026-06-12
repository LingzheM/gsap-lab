'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { demos } from '@/lib/demos';
import { demoSpans, DEFAULT_SPAN } from '@/lib/bento';
import { LabClock } from '@/components/LabWidgets/LabClock';
import { LabStats } from '@/components/LabWidgets/LabStats';
import { LabEasterEgg } from '@/components/LabWidgets/LabEasterEgg';
import styles from './page.module.css';

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  // 入场:所有 bento 砖块错落浮现
  useGSAP(
    () => {
      gsap.from('.bento-tile', {
        y: 28,
        opacity: 0,
        scale: 0.98,
        duration: 0.7,
        stagger: { each: 0.05, from: 'start' },
        ease: 'power3.out',
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={styles.page}>
      <div className={styles.grain} aria-hidden />

      <div className={styles.bento}>
        {/* 标题砖:占满整行的活字招牌 */}
        <section className={`${styles.tile} ${styles.tileWordmark} bento-tile`}>
          <div className={styles.kicker}>GSAP · Motion Lab</div>
          <h1 className={styles.wordmark}>
            动效<em>练习集</em>
          </h1>
          <p className={styles.intro}>
            六个由浅入深的 GSAP demo，从最基础的补间，一路走到滚动驱动的叙事合奏。
            每一个都拆成了 React 组件 —— 数据、Hook、展示分层。
          </p>
        </section>

        {/* 小部件:时钟 */}
        <section className={`${styles.tile} ${styles.tileWidget} bento-tile`}>
          <LabClock />
        </section>

        {/* demo 卡片们 */}
        {demos.map((demo) => {
          const span = demoSpans[demo.slug] ?? DEFAULT_SPAN;
          return (
            <Link
              key={demo.slug}
              href={`/${demo.slug}`}
              className={`${styles.tile} ${styles.card} bento-tile`}
              style={
                {
                  '--accent': demo.accent,
                  gridColumn: `span ${span.col}`,
                  gridRow: `span ${span.row}`,
                } as React.CSSProperties
              }
            >
              <div className={styles.cardGlow} aria-hidden />
              <div className={styles.cardTop}>
                <span className={styles.cardIndex}>{demo.index}</span>
                <span className={styles.cardConcept}>{demo.concept}</span>
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{demo.title}</h2>
                <span className={styles.cardSubtitle}>{demo.subtitle}</span>
                <p className={styles.cardDesc}>{demo.description}</p>
              </div>
              <div className={styles.cardArrow} aria-hidden>
                →
              </div>
            </Link>
          );
        })}

        {/* 小部件:统计 */}
        <section className={`${styles.tile} ${styles.tileWidget} bento-tile`}>
          <LabStats />
        </section>

        {/* 小部件:彩蛋 */}
        <section className={`${styles.tile} ${styles.tileWidget} bento-tile`}>
          <LabEasterEgg />
        </section>

        {/* 页脚砖 */}
        <section className={`${styles.tile} ${styles.tileFooter} bento-tile`}>
          <span>React + TypeScript + CSS Modules</span>
          <span className={styles.sep}>·</span>
          <span>GSAP 3 + ScrollTrigger</span>
        </section>
      </div>
    </div>
  );
}
