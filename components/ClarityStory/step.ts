export interface StoryStep {
  id: string;
  title: string;
  /** 正文，用 \n 换行 */
  body: string;
}

export const steps: StoryStep[] = [
  {
    id: 'step-1',
    title: '混沌',
    body: '一开始，脑海中总是充满了噪音。\n无数个想法纠缠在一起，找不到出口。',
  },
  {
    id: 'step-2',
    title: '深呼吸',
    body: '但只要退后一步，理清线索。\n最复杂的难题，也能化为最纯粹的本质。',
  },
  {
    id: 'step-3',
    title: '绽放',
    body: '当逻辑贯通，表达自然流露。\n你的想法，终于迎来了属于它的绽放。',
  },
];