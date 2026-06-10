import { demos } from '@/lib/demos';
import styles from './LabWidgets.module.css';

export function LabStats() {

  const total = demos.length;

  const scrollDriven = demos.filter((d) => d.concept.includes('ScrollTrigger')).length;

  const conceptWords = new Set(
    demos.flatMap((d) => d.concept.split(/[\s·+]+/).filter(Boolean))
  )

  const items = [
    { value: total, label: 'Demos' },
    { value: scrollDriven, label: 'Scroll-driven' },
    { value: conceptWords, label: 'GSAP 能力' }
  ];
  return (
    <div className={styles.stats}>
      {items.map((it) => (
        <div key={it.label} className={styles.startItem}>
          <span className={styles.statValue}>{it.value}</span>
          <span className={styles.statLabel}>{it.label}</span>
        </div>
      ))}  
    </div>
  )
}