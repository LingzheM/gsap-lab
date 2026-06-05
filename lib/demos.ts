export interface DemoMeta {
  /** 路由 slug，对应 app/<slug>/page.tsx */
  slug: string;
  /** 序号 */
  index: string;
  title: string;
  subtitle: string;
  concept: string;
  description: string;
  accent: string;
}


export const demos: DemoMeta[] = [
  {
    slug: 'voyager',
    index: '06',
    title: '旅行者一号',
    subtitle: 'Voyager',
    concept: 'ScrollTrigger + SplitText 叙事',
    description: '七屏滚动叙事',
    accent: '#ffd700'
  }
];