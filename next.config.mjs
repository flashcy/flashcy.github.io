/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 는 정적 파일만 서빙한다 -> 순수 정적 export.
  output: 'export',

  // 디렉터리 + index.html 형태로 내보낸다.
  // 확장자 없는 URL 을 어떤 정적 호스트에서도 안전하게 찾을 수 있다.
  trailingSlash: true,

  images: {
    // 런타임 최적화 API 가 없으므로 끈다.
    // 대신 scripts/optimize-images.py 로 빌드 전에 WebP 로 변환해 둔다.
    unoptimized: true,
  },
};

export default nextConfig;
