import { demos } from '@/lib/demos';
import styles from './LabWidgets.module.css';

/** demo 统计面板。数字全是从 demos 数组派生(inline 计算),不存 state。 */
export function LabStats() {
  const total = demos.length;
  // 用到 ScrollTrigger 的 demo 数(concept 里含 ScrollTrigger)
  const scrollDriven = demos.filter((d) => d.concept.includes('ScrollTrigger')).length;
  // 不重复的核心概念词数(粗略数能力广度)
  const conceptWords = new Set(
    demos.flatMap((d) => d.concept.split(/[\s·+]+/).filter(Boolean))
  ).size;

  const items = [
    { value: total, label: 'Demos' },
    { value: scrollDriven, label: 'Scroll-driven' },
    { value: conceptWords, label: 'GSAP 能力' },
  ];

  return (
    <div className={styles.stats}>
      {items.map((it) => (
        <div key={it.label} className={styles.statItem}>
          <span className={styles.statValue}>{it.value}</span>
          <span className={styles.statLabel}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}
