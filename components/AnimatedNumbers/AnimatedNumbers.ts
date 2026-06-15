export interface AnimatedNumbersProps {
  value: string;
  colors?: string[];
  digitFill?: string;
  amplitude?: string;
  stagger?: number;
  speeds?: number[];
  fontFamily?: string;
  height?: string;
  gap?: string;
  ariaLabel?: string;
  className?: string;
}

export const DEFAULT_COLORS = ["#FFCE2E", "#5C92FF", "#FF98FB", "#FF6200", "#FF0B00"];
export const DEFAULT_STAGGER = 0.18;

export const splitChars = (value: string): string[] => Array.from(value);

export const colorAt = (colors: string[], i: number): string => colors[i % colors.length];

export function makeSpeedFactors(count: number, stagger = DEFAULT_STAGGER): number[] {
  return Array.from({ length: count }, (_, i) => {
    const magnitude = Math.max(0.25, 1 - i * stagger);
    const sign = i % 2 === 0 ? 1 : -1;
    return Number((magnitude * sign).toFixed(3));
  });
}