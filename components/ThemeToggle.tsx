'use client';

import { useEffect, useState } from 'react';

/* 기존 main.js 의 테마 토글.
   첫 페인트 전 적용은 layout.tsx 의 인라인 스크립트가 담당하고,
   여기서는 현재 값을 읽어 버튼 상태만 맞춘 뒤 토글을 처리한다. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const cur = document.documentElement.getAttribute('data-theme');
    setTheme(cur === 'dark' ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme" title="Toggle theme">
      <span className="icon-moon">◐</span>
      <span className="icon-sun">◑</span>
    </button>
  );
}
