import { useGSAP} from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);


interface UseVoyagerTimelineOptions {
  rootRef: RefObject<HTMLElement | null>;
  yearRef: RefObject<HTMLElement | null>;
  distRef: RefObject<HTMLElement | null>;
}

export function useVoyagerTimeline({ rootRef, yearRef, distRef }: UseVoyagerTimelineOptions) {
  
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      // 在scope内查元素
      const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);

      // 收集所有 SplitText 实例， cleanup 时统一 revert（还原 DOM）
      const splits: SplitText[] = [];
      const split = (sel: string) => {
        const el = q(sel);
        if (!el) return null;
        const s = SplitText.create(el, { type: 'chars' });
        splits.push(s);
        return s;
      };

      // 风粒子动态生成
      const windEls: HTMLElement[] = [];
      const boundStage = q('.bound-stage');
      if (boundStage) {
        for (let i = 0; i < 22; i++) {
          const w = document.createElement('div');
          w.className = 'wind';
          w.style.left = `${10 + i * 3.6}%`;
          w.style.top = `${50 + (Math.random() * 40 - 20)}%`;
          boundStage.appendChild(w);
          windEls.push(w);
        }
      }

      // 全局遥测：纪年 + 距离绑全局滚动进度
      ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const p = self.progress;
          if (yearRef.current) yearRef.current.textContent = String(Math.round(1977 + p * 48));
          if (distRef.current) {
            distRef.current.textContent = Math.round(p * 24700000000).toLocaleString('en-US');
          }
        },
      });

      // 1 序幕 亲密（自动播放，不绑 scroll）
      const splitPro = split('.prologue-line');
      if (splitPro) {
        gsap.from(splitPro.chars, {
          y: 28, opacity: 0, duration: 1.1, ease: 'power2.out', stagger: 0.045, delay: 0.35,
        });
      }
      gsap.from('.prologue-sub', { opacity: 0, y: 12, duration: 1, delay: 1.4 });
      gsap.to('.scroll-hint', { opacity: 0.4, duration: 1, delay: 2 });

      // ② 发射 · 紧张（scrub + pin，power4.in 对抗引力后猛然释放）
      gsap.timeline({
        scrollTrigger: { trigger: '.sc-launch', start: 'top top', end: '+=150%', scrub: 1, pin: true },
      })
        .fromTo('.earth', { scale: 5.5, opacity: 1 }, { scale: 0.05, ease: 'power4.in', duration: 1 })
        .fromTo('.streak', { scaleY: 0, opacity: 0.9 }, { scaleY: 1.4, opacity: 0, ease: 'power3.in', duration: 0.7 }, 0)
        .fromTo('.launch-cap',
          { opacity: 0, y: 30, letterSpacing: '0.6em' },
          { opacity: 1, y: 0, letterSpacing: '0.05em', duration: 0.4 }, 0.45);

      
            // ③ 飞掠 · 惊叹（toggleActions，back.out 孩子气的探头；土星环晚到）
      gsap.timeline({
        scrollTrigger: { trigger: '.sc-flyby', start: 'top 62%', toggleActions: 'play none none reverse' },
      })
        .from('.planet', { y: 90, opacity: 0, scale: 0.6, ease: 'back.out(1.5)', duration: 0.9, stagger: 0.22 })
        .from('.ring', { scaleX: 0, opacity: 0, transformOrigin: 'center', ease: 'back.out(2.2)', duration: 0.7 }, '-=0.25')
        .from('.f-caption', { y: 24, opacity: 0, duration: 0.6 }, '-=0.3');
        
      // 字体加载完后刷新，保证 pin / 拆字宽度准确
      document.fonts.ready.then(() => ScrollTrigger.refresh());

      // cleanup: 还原所有拆字 + 清除风粒子
      return () => {
        splits.forEach((s) => s.revert());
        windEls.forEach((w) => w.remove());
      }
    },
    { scope: rootRef }
  );
}