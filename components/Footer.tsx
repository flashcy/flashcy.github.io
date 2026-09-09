import Link from 'next/link';

/* 기존 5개 HTML 에 복붙돼 있던 푸터.
   홈은 LinkedIn 을, 하위 페이지는 Portfolio 로 돌아가는 링크를 둔다. */
export default function Footer({ note, home }: { note?: string; home?: boolean }) {
  return (
    <footer className="footer">
      <div className="container content">
        <div className="footer-inner">
          <div>© 2026 Chanyoung Kim.{note ? ` ${note}` : ''}</div>
          <div className="footer-links">
            {!home && <Link href="/">Portfolio</Link>}
            <a href="https://github.com/flashcy">GitHub</a>
            {home && (
              <a href="https://www.linkedin.com/in/찬영-김-b21267338">LinkedIn</a>
            )}
            <a href="mailto:flashcy@inha.edu">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
