'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* 기존 main.js 의 DOM 동작들을 한 곳에 모은 클라이언트 컴포넌트.
   - .reveal 스크롤 등장
   - 홈의 nav 활성 링크 표시
   - autoplay 비디오를 화면에 들어올 때만 재생
   - .thumb-motion 카드의 hover 재생
   라우팅으로 내용이 바뀌면 다시 붙여야 하므로 pathname 을 의존성에 둔다. */
export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    /* ----- .reveal 등장 ----- */
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (revealEls.length) {
      if (!('IntersectionObserver' in window)) {
        revealEls.forEach((e) => e.classList.add('in'));
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                en.target.classList.add('in');
                io.unobserve(en.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        revealEls.forEach((e) => io.observe(e));
        cleanups.push(() => io.disconnect());
      }
    }

    /* ----- nav 활성 링크 (홈의 섹션 앵커에만 해당) ----- */
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.nav-links a')
    );
    const sections = navLinks
      .map((a) => {
        const hash = a.getAttribute('href')?.split('#')[1];
        const el = hash ? document.getElementById(hash) : null;
        return el ? { link: a, el } : null;
      })
      .filter((x): x is { link: HTMLAnchorElement; el: HTMLElement } => !!x);

    if (sections.length) {
      const onScroll = () => {
        const pos = window.scrollY + 120;
        let current: (typeof sections)[number] | null = null;
        for (const s of sections) if (s.el.offsetTop <= pos) current = s;
        navLinks.forEach((a) => a.classList.remove('active'));
        if (current) current.link.classList.add('active');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanups.push(() => window.removeEventListener('scroll', onScroll));
    }

    /* ----- 화면에 보일 때만 재생 ----- */
    const vids = Array.from(
      document.querySelectorAll<HTMLVideoElement>('video[autoplay]')
    );
    if (vids.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            const v = en.target as HTMLVideoElement;
            if (en.isIntersecting) v.play?.().catch(() => {});
            else v.pause?.();
          });
        },
        { threshold: 0.25 }
      );
      vids.forEach((v) => io.observe(v));
      cleanups.push(() => io.disconnect());
    }

    /* ----- 썸네일 카드: hover 시 재생, 벗어나면 되감기 ----- */
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll<HTMLElement>('.thumb-motion').forEach((box) => {
        const v = box.querySelector('video');
        if (!v) return;
        const host = (box.closest('.entry') as HTMLElement) || box;
        const play = () => {
          box.classList.add('is-playing');
          v.play()?.catch(() => box.classList.remove('is-playing'));
        };
        const stop = () => {
          box.classList.remove('is-playing');
          v.pause();
          try {
            v.currentTime = 0;
          } catch {}
        };
        host.addEventListener('mouseenter', play);
        host.addEventListener('mouseleave', stop);
        host.addEventListener('focus', play);
        host.addEventListener('blur', stop);
        cleanups.push(() => {
          host.removeEventListener('mouseenter', play);
          host.removeEventListener('mouseleave', stop);
          host.removeEventListener('focus', play);
          host.removeEventListener('blur', stop);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
