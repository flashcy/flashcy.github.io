'use client';

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

/* 기존 screen-slider.js — .screens 안의 figure 를 한 번에 하나씩 보여준다.
   활성 슬라이드의 비디오만 재생하고 나머지는 정지·되감기한다. */
export default function ScreenSlider({
  label,
  labels,
  children,
}: {
  label: string;
  /** 도트의 접근성 레이블 (슬라이드 순서와 같게) */
  labels: string[];
  children: React.ReactNode;
}) {
  const slides = Children.toArray(children).filter(isValidElement) as ReactElement<{
    className?: string;
  }>[];
  const [i, setI] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const go = (k: number) => setI((k + slides.length) % slides.length);

  /* 보이는 슬라이드만 재생 — DOM 을 직접 만지는 편이 확실하다 */
  useEffect(() => {
    const figs = listRef.current?.children;
    if (!figs) return;
    Array.from(figs).forEach((fig, n) => {
      const v = fig.querySelector('video');
      if (!v) return;
      if (n === i) {
        v.play()?.catch(() => {});
      } else {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {}
      }
    });
  }, [i]);

  return (
    <div
      className="slider is-ready"
      role="group"
      aria-roledescription="슬라이드 쇼"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          go(i - 1);
          e.preventDefault();
        }
        if (e.key === 'ArrowRight') {
          go(i + 1);
          e.preventDefault();
        }
      }}
    >
      <div className="screens" ref={listRef}>
        {slides.map((child, n) =>
          cloneElement(child, {
            key: n,
            className: [child.props.className, n === i ? 'is-active' : '']
              .filter(Boolean)
              .join(' '),
          })
        )}
      </div>

      <div className="slider-ui">
        <button
          type="button"
          className="slider-btn"
          aria-label="이전 화면"
          onClick={() => go(i - 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z" />
          </svg>
        </button>

        <div className="slider-dots" role="tablist">
          {slides.map((_, n) => (
            <button
              key={n}
              type="button"
              role="tab"
              className={`slider-dot${n === i ? ' is-on' : ''}`}
              aria-selected={n === i}
              aria-label={labels[n] ?? `${n + 1}번 화면`}
              title={labels[n] ?? `${n + 1}번 화면`}
              onClick={() => go(n)}
            />
          ))}
        </div>

        <button
          type="button"
          className="slider-btn"
          aria-label="다음 화면"
          onClick={() => go(i + 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z" />
          </svg>
        </button>

        <span className="slider-count" aria-live="polite">
          {i + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
}
