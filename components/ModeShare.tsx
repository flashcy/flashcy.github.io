import PieShare, { type Group } from './PieShare';

/* 대중교통 이용 수단 분담률 — 파이 차트와 표가 같은 데이터를 쓴다.
   표는 스크립트 없이도 읽히는 접근성 폴백이자, 회색으로 묶인
   '그 외 수단'의 항목별 값을 확인하는 수단이다. */

const ROWS: { label: string; general: number | null; blind: number | null }[] = [
  { label: '버스', general: 68, blind: 33 },
  { label: '장애인 택시', general: null, blind: 30 },
  { label: '기타', general: 7, blind: 17 },
  { label: '자가용', general: 13, blind: null },
  { label: '도보', general: 12, blind: 11 },
  { label: '무료 셔틀버스', general: null, blind: 9 },
];

/* 조각 순서를 고정해 색 배정과 인접 조합이 흔들리지 않게 한다 */
const SERIES = ['버스', '장애인 택시', '자가용', '도보', '무료 셔틀버스', '기타'];
const EMPHASIS: [string, string] = ['버스', '장애인 택시'];

const GROUPS: Group[] = [
  {
    name: '비장애인',
    parts: ROWS.filter((r) => r.general != null).map((r) => ({
      label: r.label,
      value: r.general as number,
    })),
  },
  {
    name: '시각장애인',
    parts: ROWS.filter((r) => r.blind != null).map((r) => ({
      label: r.label,
      value: r.blind as number,
    })),
  },
];

export default function ModeShare() {
  return (
    <>
      <PieShare groups={GROUPS} series={SERIES} emphasis={EMPHASIS} />

      <div className="paper-table">
        <table>
          <caption>대중교통 이용 수단 분담률 (비장애인 · 시각장애인)</caption>
          <thead>
            <tr>
              <th className="row-label">이동 수단</th>
              <th>비장애인</th>
              <th>시각장애인</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label}>
                <td className="row-label">{r.label}</td>
                <td>{r.general == null ? '–' : `${r.general}%`}</td>
                <td>{r.blind == null ? '–' : `${r.blind}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
