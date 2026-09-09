'use client';

import { useState } from 'react';

/* 기존 charts.js 의 파이 차트.
   HTML 표를 읽어오던 방식 대신 데이터를 props 로 직접 받는다
   (같은 데이터로 아래 표도 렌더하므로 둘이 어긋날 수 없다).

   색은 '항목'을 따라간다 — 강조 두 항목만 앱 색을 쓰고 나머지는 회색.
   자세한 근거는 globals.css 의 데이터 시각화 주석 참고. */

export type Part = { label: string; value: number };
export type Group = { name: string; parts: Part[] };

const W = 340;
const H = 250;
const CX = 170;
const CY = 112;
const R = 84;

/* 12시에서 시작해 시계방향. SVG 는 y 가 아래로 자라므로 cos 부호를 뒤집는다. */
function pt(r: number, th: number): [number, number] {
  return [CX + r * Math.sin(th), CY - r * Math.cos(th)];
}

function slicePath(th0: number, th1: number) {
  const [ax, ay] = pt(R, th0);
  const [bx, by] = pt(R, th1);
  const large = th1 - th0 > Math.PI ? 1 : 0;
  return (
    `M${CX},${CY}L${ax.toFixed(2)},${ay.toFixed(2)}` +
    `A${R},${R} 0 ${large} 1 ${bx.toFixed(2)},${by.toFixed(2)}Z`
  );
}

export default function PieShare({
  groups,
  series,
  emphasis,
}: {
  groups: Group[];
  /** 조각 순서를 고정한다 (색 배정과 인접 조합이 흔들리지 않도록) */
  series: string[];
  /** 색과 직접 라벨을 받을 두 항목 */
  emphasis: [string, string];
}) {
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);

  return (
    <div className="chart">
      <div className="chart-pies">
        {groups.map((g) => {
          const total = g.parts.reduce((s, p) => s + p.value, 0);
          const parts = [...g.parts].sort((a, b) => {
            const ia = series.indexOf(a.label);
            const ib = series.indexOf(b.label);
            if (ia === -1 && ib === -1) return b.value - a.value;
            if (ia === -1) return 1;
            if (ib === -1) return -1;
            return ia - ib;
          });

          let th = 0;
          return (
            <figure className="chart-pie" key={g.name}>
              <svg
                className="chart-svg"
                viewBox={`0 0 ${W} ${H}`}
                role="img"
                aria-label={`${g.name} 이용 수단 분담률`}
              >
                {parts.map((p) => {
                  const th0 = th;
                  const th1 = th + (p.value / total) * Math.PI * 2;
                  th = th1;

                  const rank = emphasis.indexOf(p.label);
                  const cls =
                    rank === 0 ? 'cat-1' : rank === 1 ? 'cat-2' : 'cat-muted';
                  const text = `${g.name} · ${p.label} ${p.value}%`;

                  const thm = (th0 + th1) / 2;
                  const [lx, ly] = pt(R + 2, thm);
                  const [tx, ty] = pt(R + 15, thm);
                  const right = Math.sin(thm) >= 0;

                  return (
                    <g key={p.label}>
                      <path
                        d={slicePath(th0, th1)}
                        className={`chart-slice ${cls}`}
                        tabIndex={0}
                        role="listitem"
                        aria-label={`${g.name} ${p.label} ${p.value}%`}
                        onMouseMove={(e) =>
                          setTip({ x: e.clientX, y: e.clientY, text })
                        }
                        onMouseLeave={() => setTip(null)}
                        onFocus={(e) => {
                          const r = e.currentTarget.getBoundingClientRect();
                          setTip({ x: r.left + r.width / 2, y: r.top, text });
                        }}
                        onBlur={() => setTip(null)}
                      />
                      {rank !== -1 && (
                        <>
                          <line
                            x1={lx.toFixed(2)}
                            y1={ly.toFixed(2)}
                            x2={tx.toFixed(2)}
                            y2={ty.toFixed(2)}
                            className="chart-leader"
                          />
                          <text
                            x={(tx + (right ? 5 : -5)).toFixed(2)}
                            y={(ty + 4).toFixed(2)}
                            className="chart-outlabel"
                            textAnchor={right ? 'start' : 'end'}
                          >
                            {p.label} {p.value}%
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
              <figcaption>{g.name}</figcaption>
            </figure>
          );
        })}
      </div>

      <Tip tip={tip} />

      <p className="chart-legend">
        {emphasis.map((e, i) => (
          <span className="key" key={e}>
            <i className={`sw cat-${i + 1}`} />
            {e}
          </span>
        ))}
        <span className="key">
          <i className="sw cat-muted" />
          그 외 수단{' '}
          <span className="muted">(조각에 마우스를 올리면 항목별 값)</span>
        </span>
      </p>
    </div>
  );
}

/* 툴팁은 뷰포트 좌표로 받아 .chart 기준으로 옮겨 놓는다 */
function Tip({ tip }: { tip: { x: number; y: number; text: string } | null }) {
  return (
    <div
      className={`chart-tip${tip ? ' on' : ''}`}
      role="status"
      style={
        tip
          ? { position: 'fixed', left: tip.x, top: tip.y }
          : undefined
      }
    >
      {tip?.text}
    </div>
  );
}
