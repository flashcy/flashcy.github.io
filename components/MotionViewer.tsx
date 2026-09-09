'use client';

import { useEffect, useRef } from 'react';

/* lib/motion-viewer.js (three.js) 를 감싸는 클라이언트 컴포넌트.
   three 번들이 크므로 SSR 없이 마운트 후에 동적 import 한다.
   언마운트 시 destroy() 로 렌더 루프를 멈추고 GL 컨텍스트를 반납한다. */
export default function MotionViewer({
  manifest,
  spinSpeed,
  poster,
  posterAlt,
  hint,
}: {
  manifest: string;
  spinSpeed?: number;
  poster: string;
  posterAlt: string;
  hint?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let instances: Array<{ destroy?: () => void }> = [];
    let cancelled = false;

    import('@/lib/motion-viewer')
      .then((mod) => {
        if (cancelled) return;
        instances = mod.boot() ?? [];
      })
      .catch((err) => {
        console.error('[MotionViewer] load failed', err);
      });

    return () => {
      cancelled = true;
      instances.forEach((v) => v.destroy?.());
    };
  }, []);

  return (
    <div className="banner-visual">
      <div
        className="mviewer"
        ref={hostRef}
        data-manifest={manifest}
        {...(spinSpeed != null ? { 'data-spin-speed': String(spinSpeed) } : {})}
      >
        {/* three.js 가 뜨면 뷰어로 교체된다. 실패하면 이 그림이 남는다. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mv-poster" src={poster} alt={posterAlt} />
      </div>
      {hint ? <p className="mv-hint">{hint}</p> : null}
    </div>
  );
}
