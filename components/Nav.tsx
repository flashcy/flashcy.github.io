import Image from 'next/image';
import Link from 'next/link';

/* 기존 5개 HTML 에 복붙돼 있던 상단 내비게이션.
   섹션 링크는 홈의 앵커로 통일한다(프로젝트 페이지에서도 그대로 동작). */
const LINKS = [
  { href: '/#top', label: 'About' },
  { href: '/#publications', label: 'Publications' },
  { href: '/#preprints', label: 'Preprints' },
  { href: '/#projects', label: 'Projects' },
];

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-brand">
          <Link href="/">
            <Image
              className="brand-logo"
              src="/assets/logo.webp"
              alt="Chanyoung Kim"
              width={220}
              height={54}
              priority
            />
          </Link>
        </div>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
