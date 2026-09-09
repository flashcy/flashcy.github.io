import NextImage from 'next/image';
import sizes from '@/lib/image-sizes.json';

/* next/image 얇은 래퍼.
   기존 <img className="..." src="/assets/..." alt="..." /> 마크업을 거의 그대로 두고
   width/height 만 빌드 시 생성한 lib/image-sizes.json 에서 찾아 넣는다.
   → AVIF/WebP 변환과 반응형 srcset 을 받으면서 CSS 는 손대지 않아도 된다.

   크기를 모르는 경로면 최적화를 포기하고 평범한 <img> 로 떨어뜨린다
   (빌드를 깨뜨리는 것보다 낫다). */

const SIZES: Record<string, number[]> = sizes;

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** 첫 화면에 바로 보이는 이미지에만 (LCP 개선) */
  priority?: boolean;
  /** 레이아웃상 실제로 차지하는 폭 — srcset 선택에 쓰인다 */
  sizes?: string;
};

export default function Img({ src, alt, className, priority, sizes: sizesAttr }: Props) {
  const dim = SIZES[src];

  if (!dim) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} src={src} alt={alt} loading="lazy" />;
  }

  return (
    <NextImage
      className={className}
      src={src}
      alt={alt}
      width={dim[0]}
      height={dim[1]}
      priority={priority}
      sizes={sizesAttr ?? '(max-width: 720px) 100vw, 900px'}
    />
  );
}
