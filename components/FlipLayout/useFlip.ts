import { useCallback, useRef, type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

interface UseFlipOptions {
  /** scope 根容器 */
  scopeRef: RefObject<HTMLElement | null>;
  /** 依赖:这些值一变,就播放一次 Flip 过渡(放在改 DOM 之后) */
  deps: unknown[];
  /** Flip 选取目标的选择器 */
  selector?: string;
}

/**
 * 把 FLIP 三步心法封装成一个 Hook,适配 React:
 *
 *   ① capture()              在改 state 之前调用 —— 拍下现状(Flip.getState)
 *   ② setState(...)          React 改 DOM(瞬间跳变)
 *   ③ Flip.from(...)         本 Hook 在 re-render 后自动播放差异过渡
 *
 * 关键:React 里"改 DOM"是通过 setState 触发的,是异步的。
 * 所以 getState 必须在 handler 里同步拍下、存进 ref,
 * 等 React 重渲染完(useGSAP 依赖 deps),再读出来 Flip.from。
 */
export function useFlip({ scopeRef, deps, selector = '.flip-card' }: UseFlipOptions) {
  const stateRef = useRef<Flip.FlipState | null>(null);

  // ① 在改 state 之前调用:拍下现状
  const capture = useCallback(() => {
    stateRef.current = Flip.getState(selector);
  }, [selector]);

  // ③ deps 变化(= DOM 已更新)后播放过渡
  useGSAP(
    () => {
      if (!stateRef.current) return; // 首次挂载没有快照,跳过
      Flip.from(stateRef.current, {
        duration: 0.6,
        ease: 'power2.inOut',
        absolute: true, // 过渡期间绝对定位,避免 reflow 抖动
        stagger: 0.03,
      });
    },
    { dependencies: deps, scope: scopeRef }
  );

  return capture;
}
