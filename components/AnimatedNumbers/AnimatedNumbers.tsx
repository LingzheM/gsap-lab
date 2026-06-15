// AnimatedNumbers.tsx  —— 无 ref、无 useEffect，纯渲染
import { useMemo, type CSSProperties } from "react";
import styles from "./AnimatedNumbers.module.css";
import {
  type AnimatedNumbersProps,
  DEFAULT_COLORS,
  DEFAULT_STAGGER,
  splitChars,
  colorAt,
  makeSpeedFactors,
} from "./AnimatedNumbers";

export default function AnimatedNumbers({
  value,
  colors = DEFAULT_COLORS,
  digitFill = "#EEEFEB",
  amplitude = "48px",
  stagger = DEFAULT_STAGGER,
  speeds,
  fontFamily,
  height = "60vh",
  gap = "0px",
  ariaLabel,
  className,
}: AnimatedNumbersProps) {
  const chars = useMemo(() => splitChars(value), [value]);
  const factors = useMemo(
    () => speeds ?? makeSpeedFactors(chars.length, stagger),
    [speeds, chars.length, stagger],
  );

  const rootStyle = {
    "--an-height": height,
    "--an-gap": gap,
    "--an-amp": amplitude,
    "--an-digit-fill": digitFill,
    ...(fontFamily ? { "--an-font-family": fontFamily } : {}),
  } as CSSProperties;

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={rootStyle}
      role="img"
      aria-label={ariaLabel ?? value}
    >
      {chars.map((ch, i) => (
        <div
          key={`${ch}-${i}`}
          className={styles.column}
          // 每列只注入两个动态变量：颜色 + 速度（含方向），动画本身全在 CSS
          style={{
            "--col-color": colorAt(colors, i),
            "--col-speed": factors[i],
          } as CSSProperties}
          aria-hidden="true"
        >
          <span className={styles.glyph}>{ch}</span>
        </div>
      ))}
    </div>
  );
}