export interface DemoMeta {
  /** 路由 slug,对应 app/<slug>/page.tsx */
  slug: string;
  /** 序号(显示用) */
  index: string;
  /** 标题 */
  title: string;
  /** 英文副标题 */
  subtitle: string;
  /** 这个 demo 教的 GSAP 核心概念 */
  concept: string;
  /** 一句话描述 */
  description: string;
  /** 卡片主色(用于 hover 光晕等) */
  accent: string;
  /**
   * 类型:
   * - 'story'  有故事/情绪主题的沉浸式 demo(旅行者号、下潜…)
   * - 'lesson' 纯讲一个 GSAP 技术点的教学 demo(舞台 + 控制 + 代码/解释)
   */
  kind: 'story' | 'lesson';
}


export const demos: DemoMeta[] = [
  {
    slug: 'voyager',
    index: '06',
    title: '旅行者一号',
    subtitle: 'Voyager',
    concept: 'ScrollTrigger + SplitText 叙事',
    description: '七屏滚动叙事',
    accent: '#ffd700',
    kind: 'story'
  },
  {
    slug: 'clarity-story',
    index: '07',
    title: '澄明',
    subtitle: 'Genesis of Clarity',
    concept: 'DrawSVG',
    description: 'SVG描边于路径变形。',
    accent: '#27AE60',
    kind: 'story',
  },
  {
    slug: 'flip-layout',
    index: '08',
    title: '位移魔法',
    subtitle: 'Flip Layout',
    concept: 'Flip',
    description: '只改 DOM，新旧布局之间的位移全由 Flip 自动补出来：卡片放大成主角、列表平滑重排。',
    accent: '#c0532f',
    kind: 'lesson',
  },
];