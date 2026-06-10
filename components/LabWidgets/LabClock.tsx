import { useEffect, useRef } from 'react';
import styles from './LabWidgets.module.css';

export function LabClock() {
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => {
      if (!timeRef.current) return;
      const now = new Date();
      const pad = (n:number) => String(n).padStart(2, '0');
      timeRef.current.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.clock}>
      <span className={styles.clockLabel}>Local Time</span>
      <span ref={timeRef} className={styles.clockTime}>
        --:--:--
      </span>
      <span className={styles.clockNote}>实验室运行中</span>
    </div>
  )
}