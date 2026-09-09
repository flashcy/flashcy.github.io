# flashcy.github.io

Chanyoung Kim — AI Researcher 개인 포트폴리오.
Next.js(App Router) 정적 사이트이며 GitHub Pages 로 배포된다.

> 2025-06 까지 이 저장소는 Jekyll 블로그였다.
> 그때 상태는 `blog-archive` 브랜치와 `blog-final` 태그에 남아 있다.

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 정적 사이트를 out/ 으로 내보낸다
```

Node 20.9 이상이 필요하다 (Next 16).

## 구조

```
app/
  layout.tsx      공통 head · nav · 테마 · 폰트
  globals.css     전체 스타일 (구 assets/style.css)
  page.tsx        홈
  projects/{capstone,ekc2024,paper-1,paper-2}/page.tsx
components/       Nav · Footer · ThemeToggle · SiteEffects · Img
                  PieShare · ModeShare · ScreenSlider · MotionViewer · BibTeX
lib/
  motion-viewer.js    three.js 모션 뷰어 (paper-1 에서만 사용)
  image-sizes.json    이미지 크기표 — scripts/optimize-images.py 가 생성
public/assets/    이미지 · 영상 · 모션 데이터 · CV
scripts/
  optimize-images.py  PNG/JPG → WebP 변환
```

## 이미지 추가할 때

GitHub Pages 는 정적 파일만 서빙하므로 `next/image` 의 런타임 최적화를 쓸 수 없다.
대신 커밋 전에 한 번 변환해 둔다.

```bash
python scripts/optimize-images.py --dry   # 무엇이 바뀌는지 확인
python scripts/optimize-images.py         # 변환 + 참조 수정 + 크기표 갱신
```

`public/assets` 의 PNG/JPG 를 WebP 로 바꾸고, 페이지·CSS 의 경로와
`lib/image-sizes.json` 을 함께 고친다. 파비콘 3종은 PNG 로 남긴다.

## 배포

`main` 에 push 하면 `.github/workflows/deploy.yml` 이 빌드해서 Pages 에 올린다.

저장소 **Settings → Pages → Source** 가 `GitHub Actions` 여야 한다
(`Deploy from a branch` 면 워크플로 결과가 반영되지 않는다).

## 알아둘 것

- `public/.nojekyll` 은 지우면 안 된다. 없으면 Pages 가 Jekyll 을 거치면서
  `_next/` 디렉터리를 무시해 CSS·JS 가 전부 404 가 된다.
- `_source/`, `build/`, `tools/` 는 작업용 원본이라 추적하지 않는다.
- `public/assets/figures/project_iccas/demo.mp4` 가 19MB 로 사이트에서 가장 무겁다.
  방문자 체감을 줄이려면 외부 호스팅으로 빼는 편이 낫다.
