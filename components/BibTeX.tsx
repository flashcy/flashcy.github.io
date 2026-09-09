'use client';

import { useState } from 'react';

/* 기존 paper 페이지의 인라인 copyBib() 스크립트를 컴포넌트로 옮긴 것 */
export default function BibTeX({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 클립보드 권한이 없으면 조용히 넘어간다 — 본문은 그대로 선택 가능 */
    }
  }

  return (
    <pre className="bibtex">
      <button className="bib-copy" onClick={copy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
      {children}
    </pre>
  );
}
