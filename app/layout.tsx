import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import SiteEffects from '@/components/SiteEffects';
import ThemeToggle from '@/components/ThemeToggle';

/* 기존에 <link> 로 받아오던 폰트를 next/font 로 셀프호스팅한다.
   CSS 변수로 넘겨 globals.css 의 --base-font / --mono-font 가 그대로 쓰인다. */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://flashcy.github.io'),
  title: 'Chanyoung Kim — AI Researcher Portfolio',
  description:
    'Chanyoung Kim — AI Researcher. Generative Models, Multimodal Learning, Text-to-Motion.',
  icons: {
    icon: [
      { url: '/assets/favicon-64.png', type: 'image/png', sizes: '64x64' },
      {
        url: '/assets/favicon-64-dark.png',
        type: 'image/png',
        sizes: '64x64',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: { url: '/assets/apple-touch-icon.png', sizes: '180x180' },
  },
};

/* 첫 페인트 전에 data-theme 를 찍어 테마 깜빡임(FOUC)을 막는다.
   React 하이드레이션보다 먼저 실행되어야 하므로 인라인 스크립트로 둔다.
   이 때문에 <html> 의 속성이 서버 출력과 달라지므로 suppressHydrationWarning 을 함께 쓴다
   (한 단계만 적용되어 <html> 자신의 속성 비교만 건너뛴다). */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Nav />
        {children}
        {/* position:fixed 버튼이라 전 페이지 공통으로 둔다
            (기존에는 5개 중 3개 페이지에만 있었다) */}
        <ThemeToggle />
        <SiteEffects />
      </body>
    </html>
  );
}
