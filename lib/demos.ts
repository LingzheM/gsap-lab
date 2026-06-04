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


export const demos: DemoMeta[] = [];