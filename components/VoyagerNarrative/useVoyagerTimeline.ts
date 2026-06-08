import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';

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

      // 在 scope 内查元素的小助手
      const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);

      // ── 收集所有 SplitText 实例，cleanup 时统一 revert（还原 DOM）──
      const splits: SplitText[] = [];
      const split = (sel: string) => {
        const el = q(sel);
        if (!el) return null;
        const s = SplitText.create(el, { type: 'chars' });
        splits.push(s);
        return s;
      };

      // ── 风粒子动态生成（JS 创建的 DOM，cleanup 时清掉）──
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

      // ── 全局遥测：纪年 + 距离绑全局滚动进度 ──
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

      // ① 序幕 · 亲密（自动播放，不绑 scroll）
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

      // ④ 暗淡蓝点 · 谦卑（pin 强制停留，sine.inOut 极缓——安静即音量）
      const splitDot = split('.dot-narr');
      const tlDot = gsap.timeline({
        scrollTrigger: { trigger: '.sc-dot', start: 'top top', end: '+=200%', scrub: 1.2, pin: true },
      });
      tlDot.fromTo('.bluedot', { scale: 7, opacity: 0.9 }, { scale: 0.55, opacity: 1, ease: 'sine.inOut', duration: 1 });
      if (splitDot) {
        tlDot.from(splitDot.chars, { opacity: 0, ease: 'none', duration: 1, stagger: 0.012 }, 0.25);
      }
      tlDot.from('.sunbeam', { opacity: 0, duration: 0.6 }, 0.3);

      // ⑤ 星际边界 · 孤独（边界线划过 + 探测器漂移 + 风反向熄灭）
      gsap.timeline({
        scrollTrigger: { trigger: '.sc-interstellar', start: 'top 65%', toggleActions: 'play none none reverse' },
      })
        .fromTo('.boundary', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', ease: 'power1.inOut', duration: 1.2 })
        .to('.probe4', { left: '78%', ease: 'power1.out', duration: 1.5 }, 0)
        .to('.wind', { opacity: 0, ease: 'power1.out', duration: 0.5, stagger: { each: 0.04, from: 'end' } }, 0.4)
        .from('.i-caption', { opacity: 0, y: 22, duration: 0.8 }, 0.6);

      // ⑥ 黄金唱片 · 希望（from:'random' 像花绽放，back.out 雀跃）
      const tlRec = gsap.timeline({
        scrollTrigger: { trigger: '.sc-record', start: 'top 60%', toggleActions: 'play none none reverse' },
      });
      tlRec
        .from('.disc', { scale: 0.4, opacity: 0, rotation: -40, ease: 'back.out(1.4)', duration: 1 })
        .from('.greeting', { scale: 0, opacity: 0, ease: 'back.out(2)', duration: 0.7, stagger: { each: 0.1, from: 'random' } }, '-=0.4');
      const splitRec = split('.record-cap');
      if (splitRec) {
        tlRec.from(splitRec.chars, { y: 20, opacity: 0, ease: 'back.out(2)', duration: 0.5, stagger: 0.04 }, '-=0.3');
      }

      // ⑦ 永恒 · 苦涩（探测器超长漂出 + 文字反向溶解，sine.in 沉入黑）
      const splitEnd = split('.end-line');
      const tlEnd = gsap.timeline({
        scrollTrigger: { trigger: '.sc-eternity', start: 'top 65%', toggleActions: 'play none none none' },
      });
      if (splitEnd) {
        tlEnd.from(splitEnd.chars, { y: 14, opacity: 0, ease: 'power2.out', duration: 0.7, stagger: 0.05 });
      }
      tlEnd.to('.probe6', { x: '42vw', y: '-12vh', opacity: 0.25, ease: 'sine.inOut', duration: 3 }, 0);
      if (splitEnd) {
        tlEnd.to(splitEnd.chars, { opacity: 0, ease: 'sine.in', duration: 0.9, stagger: { each: 0.06, from: 'end' } }, '+=1.3');
      }

      // 字体加载完后刷新，保证 pin / 拆字宽度准确
      document.fonts.ready.then(() => ScrollTrigger.refresh());

      // ── cleanup：还原所有拆字 + 清掉风粒子 ──
      return () => {
        splits.forEach((s) => s.revert());
        windEls.forEach((w) => w.remove());
      };
    },
    { scope: rootRef }
  );
}
