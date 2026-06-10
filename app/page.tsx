"use client";

import { useRef } from "react";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { demos } from '@/lib/demos';
import Link from "next/link";
import styles from './page.module.css';
import { LabClock } from "@/components/LabWidgets/LabClock";
import { DEFAULT_SPAN, demoSpans } from "@/lib/bento";
import { LabStats } from "@/components/LabWidgets/LabStats";
import { LabEasterEgg } from "@/components/LabWidgets/LabEasterEgg";

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.bento-tile', {
        y: 28,
        opacity: 0,
        scale: 0.98,
        duration: 0.7,
        stagger: { each: 0.05, from: 'start' },
        ease: 'power3.out',
      })
    }
  )

  return (
    <div ref={rootRef} className={styles.page}>
      <div className={styles.grain} aria-hidden />

      <div className={styles.bento}>
        {/** 标题砖：占满整行的活字招牌 */}
        <section className={`${styles.tile} ${styles.tileWordmark} bento-tile`}>
          <div className={styles.kicker}>GSAP · Motion Lab</div>
          <h1 className={styles.wordmark}>
            练习集
          </h1>
          <p className={styles.intro}>
            GSAP demo
          </p>
        </section>

        {/** 小部件：时钟 */}
        <section className={`${styles.tile} ${styles.tileWidget} bento-tile`}>
          <LabClock />
        </section>

        {/** demo 卡片 */}
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
              </div>
              <div className={styles.cardArrow} aria-hidden>
              </div>
            </Link>
          )
        })}

        {/** 小部件：统计 */}
        <section className={`${styles.tile} ${styles.tileWidget} bento-tile`}>
          <LabStats />
        </section>

        {/** 小部件：彩蛋 */}
        <section className={`${styles.tile} ${styles.tileWidget} bento-tile`}>
          <LabEasterEgg />
        </section>

        {/** 页脚砖 */}
        <section className={`${styles.tile} ${styles.tileFooter} bento-tile`}>
          <span>React + TypeScript + CSS Modules</span>
          <span className={styles.sep}>·</span>
          <span>GSAP 3 + ScrollTrigger</span>
        </section>
      </div>
    </div>
  )
}