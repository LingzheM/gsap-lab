import { useState } from 'react';
import styles from './LabWidgets.module.css';

export function LabEasterEgg() {
  const [count, setCount] = useState(0);

  return (
    <button className={styles.egg} onClick={() => setCount((c) => c + 1)}>
      <span className={styles.eggEmoji}>{count == 0  ? '✨' : '🚀'}</span>
      <span className={styles.eggCount}>{count}</span>
      <span className={styles.eggHint}>{count == 0 ? '戳我一下' : count < 10 ? '继续' : '停不下来了'}</span>
    </button>
  )
}