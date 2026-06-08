import type { RefObject } from 'react';
import styles from './VoyagerNarrative.module.css';

interface MissionHudProps {
  yearRef: RefObject<HTMLElement | null>;
  distRef: RefObject<HTMLElement | null>;
}

// 纪年/距离随全局滚动进度高频更新 —— 走 ref 改 DOM，不走 state
export function MissionHud({ yearRef, distRef }: MissionHudProps) {
  return (
    <div className={styles.hud}>
      <div>Voyager 1 · 任务日志</div>
      <div className={styles.hudRight}>
        <div>
          纪年 <b ref={yearRef}>1977</b>
        </div>
        <div>
          距地球 <b ref={distRef}>0</b> km
        </div>
      </div>
    </div>
  );
}
