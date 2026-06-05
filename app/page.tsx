"use client";

import { useRef } from "react";
import { demos } from '@/lib/demos';
import Link from "next/link";
import styles from './page.module.css';

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef} className={styles.page}>
      <div className={styles.grain} aria-hidden />
      <header className={`${styles.head} lab-head`}>
        <div className={styles.kicker}>GSAP Motion Lab</div>
        <h1 className={styles.title}></h1>
      </header>
      <main className={styles.grid}>
        {demos.map((demo) => (
          <Link
            key={demo.slug}
            href={`/${demo.slug}`}
            className={`${styles.card} lab-card`}
            style={{ '--accent': demo.accent } as React.CSSProperties}
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
        ))}
      </main>

      <footer>

      </footer>
    </div>
  )
}