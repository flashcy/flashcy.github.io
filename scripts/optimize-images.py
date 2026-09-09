# -*- coding: utf-8 -*-
"""public/assets 의 PNG/JPG 를 WebP 로 변환하고 참조를 함께 고친다.

GitHub Pages 는 정적 파일만 서빙하므로 next/image 의 런타임 최적화를 쓸 수 없다.
대신 빌드 전에 한 번 변환해 두어 같은 효과를 낸다.

  python scripts/optimize-images.py          # 변환 + 참조 수정 + 크기표 갱신
  python scripts/optimize-images.py --dry    # 무엇이 바뀌는지만 출력

파비콘류는 PNG 로 남긴다 (브라우저 지원이 고르지 않다).
"""
import io, json, os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, 'public', 'assets')
KEEP_PNG = {'favicon-64.png', 'favicon-64-dark.png', 'apple-touch-icon.png'}
QUALITY = 82

DRY = '--dry' in sys.argv


def convert_all():
    from PIL import Image
    converted = {}   # 원본 상대 URL -> 새 URL
    saved_before = saved_after = 0

    for dp, dn, fn in os.walk(ASSETS):
        for f in sorted(fn):
            if not f.lower().endswith(('.png', '.jpg', '.jpeg')):
                continue
            if f in KEEP_PNG:
                continue
            src = os.path.join(dp, f)
            dst = os.path.splitext(src)[0] + '.webp'
            before = os.path.getsize(src)

            if not DRY:
                im = Image.open(src)
                # 알파가 있으면 유지, 없으면 RGB 로
                im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB')
                im.save(dst, 'WEBP', quality=QUALITY, method=6)
                after = os.path.getsize(dst)
                os.remove(src)
            else:
                after = before  # 실제 변환은 하지 않음

            saved_before += before
            saved_after += after
            rel = '/' + os.path.relpath(src, os.path.join(ROOT, 'public')).replace(os.sep, '/')
            converted[rel] = os.path.splitext(rel)[0] + '.webp'

    return converted, saved_before, saved_after


def rewrite_refs(mapping):
    """페이지·컴포넌트·CSS 안의 이미지 경로를 새 확장자로 바꾼다."""
    targets = (glob.glob(os.path.join(ROOT, 'app', '**', '*.tsx'), recursive=True)
               + glob.glob(os.path.join(ROOT, 'components', '*.tsx'))
               + [os.path.join(ROOT, 'app', 'globals.css')])
    total = 0
    for p in targets:
        t = io.open(p, encoding='utf-8').read()
        orig = t
        for old, new in mapping.items():
            if old in t:
                t = t.replace(old, new)
                total += 1
        if t != orig and not DRY:
            io.open(p, 'w', encoding='utf-8').write(t)
    return total


def rebuild_sizes():
    from PIL import Image
    sizes = {}
    for dp, dn, fn in os.walk(ASSETS):
        for f in fn:
            if not f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.gif')):
                continue
            p = os.path.join(dp, f)
            try:
                im = Image.open(p)
            except Exception:
                continue
            url = '/' + os.path.relpath(p, os.path.join(ROOT, 'public')).replace(os.sep, '/')
            sizes[url] = [im.size[0], im.size[1]]
    if not DRY:
        io.open(os.path.join(ROOT, 'lib', 'image-sizes.json'), 'w', encoding='utf-8').write(
            json.dumps(sizes, ensure_ascii=False, indent=0, sort_keys=True))
    return len(sizes)


if __name__ == '__main__':
    mapping, before, after = convert_all()
    print('변환 대상 %d개' % len(mapping))
    if not DRY:
        print('  %.1f MB → %.1f MB  (-%.0f%%)'
              % (before / 1048576, after / 1048576, 100 * (1 - after / before) if before else 0))
    n = rewrite_refs(mapping)
    print('참조 수정 %d건' % n)
    print('크기표 %d개 이미지' % rebuild_sizes())
    if DRY:
        print('(--dry: 실제로 바꾸지 않았습니다)')
