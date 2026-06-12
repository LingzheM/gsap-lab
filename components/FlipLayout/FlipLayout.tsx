import { useRef } from 'react';
import styles from './FlipLayout.module.css';

export function FlipLayout() {
  const stageRef = useRef<HTMLDivElement>(null);

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
          
        </div>
      </div>
    </div>
  )
}