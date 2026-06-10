export interface BentoSpan {
  col: 1 | 2;
  row: 1 | 2;
}

export const demoSpans: Record<string, BentoSpan> = {
  voyager: { col: 2, row: 2 },
}

export const DEFAULT_SPAN: BentoSpan = { col: 1, row: 1 };