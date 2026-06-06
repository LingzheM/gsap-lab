import { RefObject } from "react"
import styles from './VoyagerNarrative.module.css';

interface MissionHudProps {
  yearRef: RefObject<HTMLElement | null>;
  distRef: RefObject<HTMLElement | null>;
}

export function MissionHud({ yearRef, distRef }: MissionHudProps) {
  return (
    <div className={styles.hud}>
      <div>Voyager 1 任务日志</div>
      <div className={styles.hudRight}>
        <div>
          纪年 <b ref={yearRef}>1977</b>
        </div>
        <div>
          距地球 <b ref={distRef}></b>
        </div>
      </div>
    </div>
  )
}