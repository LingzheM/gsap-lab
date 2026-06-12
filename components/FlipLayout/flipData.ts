/** Flip demo 的卡片数量 */
export const CARD_COUNT = 8;

/** 每个动作对应的代码片段 + 解释,集中放数据里,组件只管渲染 */
export interface FlipActionCopy {
  code: string;
  explain: string;
}

export const COPY: Record<'feature' | 'shuffle' | 'reset', FlipActionCopy> = {
  feature: {
    code: `const state = Flip.getState(cards);   // ① 拍下现状
card.classList.toggle("featured");      // ② 改 DOM(瞬间跳变)
Flip.from(state, { duration: 0.6,       // ③ 把差异演出来
  ease: "power2.inOut", absolute: true });`,
    explain:
      '放大成主角：你只是给它加了个 class 让它占 2×2。其它卡片自动重排让位，而每一张的位移都是 Flip 补出来的——你一个坐标都没算。',
  },
  shuffle: {
    code: `const state = Flip.getState(cards);
shuffle(cards).forEach(c => grid.appendChild(c)); // ② 改顺序
Flip.from(state, { absolute: true, stagger: 0.03 });`,
    explain:
      '打乱顺序：只是改了 DOM 里的排列顺序，Flip 让每张卡片平滑滑到自己的新格子——这就是「排序后重新布局」的精致版。',
  },
  reset: {
    code: `Flip.from(state, { ... });  // 回到 1–8 顺序,也是同一招`,
    explain:
      '复位：排回 1–8。复位和打乱用的是完全一样的三步，只是「改 DOM」那一步不同。',
  },
};
