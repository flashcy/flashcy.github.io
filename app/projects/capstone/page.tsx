import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Img from '@/components/Img';
import ModeShare from '@/components/ModeShare';

export const metadata: Metadata = {
  title: '시각장애인을 위한 양방향 위치 인식 교통 보조 서비스 — Capstone Design',
  description: 'UWB 삼각측량으로 사용자와 버스의 좌표를 특정하고, 버스 단말기의 승차 확정으로 양방향 소통을 구현한 종합설계 프로젝트.',
};

export default function Page() {
  return (
    <>
      <section className="proj-banner">
        <div className="banner-inner">

          <div className="banner-copy">
            <Link className="paper-back" href="/#projects">← Back to projects</Link>
            <p className="banner-eyebrow">(01) Project — Capstone Design</p>
            <h1 className="banner-title">시각장애인을 위한 양방향 위치 인식 교통 보조 서비스</h1>
            <p className="banner-authors"><span className="me">김찬영</span>, 김성민, 허승범</p>
            <p className="banner-affil">인하대학교 컴퓨터공학 종합설계 · 팀 브rainstorming · 지도교수 신병석</p>
            <p className="banner-desc">
              시각장애인이 버스를 &ldquo;안내받는&rdquo; 것을 넘어 <strong>주체적으로</strong> 탈 수 있게 하는 서비스입니다.
              정류장에 설치한 UWB 앵커 3개로 사용자와 버스의 좌표를 cm 단위로 특정하고,
              거리는 진동 주기로, 방향은 휴대폰을 돌려도 흔들리지 않는 화살표로 전달합니다.
              동시에 버스 단말기에 승차 확정 버튼을 두어, 기사가 시각장애인을 인지하지 못한 채
              출발하는 문제까지 <strong>양방향</strong>으로 해결했습니다.
            </p>
            <dl className="banner-meta">
              <dt>Award</dt><dd>3rd Prize · 인하대학교 종합설계 (2024.06)</dd>
              <dt>Role</dt><dd>애플리케이션 개발 · 거리 기반 진동 피드백 설계 · 방위각 보정 수식 구현</dd>
              <dt>Stack</dt><dd>Kotlin / Android · React · Spring Boot · MyBatis · MySQL (Amazon RDS) · NGINX · UWB</dd>
              <dt>Date</dt><dd>2024.03 – 2024.06</dd>
            </dl>
          </div>

          <div className="banner-visual">
            <div className="phone-strip">
              <Img src="/assets/figures/project_capstone/main.webp" alt="목적지 검색 화면" />
              <Img src="/assets/figures/project_capstone/bus-stop.webp" alt="정류장 방향 안내 화면" />
              <Img src="/assets/figures/project_capstone/bus-near.webp" alt="버스 근접 알림 화면" />
            </div>
          </div>

        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>App Walkthrough</h2>
          <p>
            목적지 입력부터 하차까지, 사용자가 해야 할 동작은 최소로 하고 전달되는 정보는 최대로 하는 것을 원칙으로 설계했습니다.
            화면당 기능은 하나, 배색은 고대비, 그리고 <strong>화면 전체가 터치 영역</strong>입니다.
            네비게이션 바처럼 흐름을 분기시키는 요소는 모두 걷어냈습니다.
          </p>
        </div>

        <div className="paper-container">
          <div className="phone-grid">

            <div className="phone-item">
              <Img src="/assets/figures/project_capstone/main.webp" alt="목적지 검색 화면" />
              <span className="phone-step">1</span>
              <p className="phone-cap">목적지 검색</p>
              <p className="phone-sub">실행 즉시 TTS로 안내합니다. 타이핑 외에 <strong>화면 흔들기</strong> 제스처로도 음성 인식을 켤 수 있고, 인식 결과는 서버의 검색어 보정 API를 거칩니다.</p>
            </div>

            <div className="phone-item">
              <Img src="/assets/figures/project_capstone/search.webp" alt="버스 노선 검색 결과" />
              <span className="phone-step">2</span>
              <p className="phone-cap">노선 안내</p>
              <p className="phone-sub">여러 경로를 슬라이드로 넘기며, 넘길 때마다 해당 경로를 TTS로 읽어줍니다. 어디를 터치해도 다음으로 진행됩니다.</p>
            </div>

            <div className="phone-item">
              <Img src="/assets/figures/project_capstone/bus-stop.webp" alt="정류장까지의 거리와 방향" />
              <span className="phone-step">3</span>
              <p className="phone-cap">정류장 찾기</p>
              <p className="phone-sub">출발 정류장까지 남은 거리와 시계 방향을 화살표로 제시합니다. 50cm 이내로 들어오면 도착으로 보고 자동 전환됩니다.</p>
            </div>

            <div className="phone-item">
              <Img src="/assets/figures/project_capstone/bus-far.webp" alt="버스 도착 예정 안내" />
              <span className="phone-step">4</span>
              <p className="phone-cap">버스 대기</p>
              <p className="phone-sub">버스가 아직 멀면 남은 정류장 수와 시간만 알립니다. 이 구간에서는 줄 수 있는 정보가 그것뿐입니다.</p>
            </div>

            <div className="phone-item">
              <Img src="/assets/figures/project_capstone/bus-near.webp" alt="버스 근접 시 방향 안내" />
              <span className="phone-step">5</span>
              <p className="phone-cap">탑승 보조</p>
              <p className="phone-sub">버스가 전 정류장을 통과하면 거리·방향 안내로 전환되고, 거리에 반비례하는 주기의 진동이 함께 시작됩니다.</p>
            </div>

            <div className="phone-item">
              <Img src="/assets/figures/project_capstone/on-bus.webp" alt="탑승 후 하차 안내" />
              <span className="phone-step">6</span>
              <p className="phone-cap">하차 안내</p>
              <p className="phone-sub">기사가 승차를 확정하면 노선도로 넘어갑니다. 직전 정류장에서 &ldquo;곧 도착&rdquo;을, 도착 시 하차 안내를 TTS로 알립니다.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>왜 만들었나</h2>
          <p>
            시각장애인의 버스 이용률은 비장애인에 비해 현저히 낮습니다. 버스 번호를 알아보기 어렵고,
            도착 시각이 불규칙하며, 무엇보다 <strong>기사가 시각장애인을 인지하지 못한 채 출발하는</strong> 일이 잦기 때문입니다.
            버스에서 밀려난 수요는 대부분 장애인 택시(30%)와 무료 셔틀버스(9%)가 받아냅니다.
          </p>

          <ModeShare />
        </div>

        <div className="container content">
          <p>
            정확도가 곧 안전으로 직결되는 서비스라 오차 요인을 실측으로 하나씩 걷어냈습니다.
          </p>
          <ul>
            <li>
              <strong>근접 시 오차 증가</strong> — 태그가 앵커에 가까울수록 오차가 커지는 현상이 있어,
              앵커를 정류장 <em>구석</em>에 배치해 사용자·버스와 항상 일정 거리 이상 떨어지도록 설계했습니다.
            </li>
            <li>
              <strong>기판 접촉 시 오차 증가</strong> — 보드가 물체에 닿으면 값이 튀어,
              시연에서는 삼각대로 띄워 고정했습니다.
            </li>
          </ul>
          <p>
            두 요인을 통제한 뒤 오차 발생 빈도가 눈에 띄게 줄었고, 실제 정류장에서도 앵커 배치만 고려하면
            충분한 정밀도를 얻을 수 있다고 판단했습니다.
          </p>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>방위각 보정</h2>
          <p>
            화살표로 방향을 안내하려면 한 가지 문제를 풀어야 합니다. <strong>사용자가 휴대폰을 어떻게 들고 있는지 모른다는 것</strong>입니다.
            앵커가 이루는 좌표계와 휴대폰이 바라보는 방향은 서로 다른 기준을 쓰기 때문에, 그대로 그리면
            휴대폰을 돌릴 때마다 화살표도 같이 돌아가 버립니다.
          </p>
          <p>
            그래서 회전 벡터 센서의 <strong>방위각</strong>을 받아 두 기준을 하나로 맞추는 보정 함수를 넣었습니다.
            앵커 좌표계의 y축이 북(N)과 이루는 각을 <em>A</em>, 휴대폰이 북 기준으로 측정한 방위각을 <em>B</em>라 할 때,
            부호 방향을 맞춘 뒤 두 각을 합성해 <em>y축으로부터 사용자가 바라보는 방향까지의 각</em>을 얻습니다.
            여기에 사용자–버스 좌표를 <code>arctan</code>으로 푼 상대 각을 더하면 화면에 그릴 최종 각이 나옵니다.
          </p>

        </div>

        <div className="paper-container">
          <div className="screens">
            <figure className="square">
              <Img src="/assets/figures/project_capstone/azimuth-portrait.webp" alt="휴대폰을 세로로 들었을 때의 방향 안내" />
              <figcaption><strong>세로로 들었을 때</strong> — 5시 방향, 30m</figcaption>
            </figure>
            <figure className="square">
              <Img src="/assets/figures/project_capstone/azimuth-rotated.webp" alt="휴대폰을 90도 회전했을 때의 방향 안내" />
              <figcaption><strong>90° 돌렸을 때</strong> — UI는 함께 돌아가지만 화살표가 가리키는 실제 방향은 그대로</figcaption>
            </figure>
          </div>
          <p className="screens-caption">보정이 없으면 화살표가 휴대폰을 따라 돌아가 방향 안내가 무의미해집니다.</p>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>거리를 진동으로</h2>
          <p>
            화면을 볼 수 없는 사용자에게 &ldquo;12m 남았습니다&rdquo;라는 음성만으로는 접근 속도가 전달되지 않습니다.
            그래서 거리에 <strong>반비례하는 주기의 진동</strong>을 함께 주어, 버스가 다가오는 것을 감각으로 인지하도록 했습니다.
            가까워질수록 진동이 촘촘해집니다.
          </p>

          <div className="paper-table">
            <table>
              <caption>버스와의 거리에 따른 진동 주기</caption>
              <thead>
                <tr><th className="row-label">거리</th><th>진동 주기</th></tr>
              </thead>
              <tbody>
                <tr><td className="row-label">10m 이상</td><td>없음</td></tr>
                <tr><td className="row-label">5 – 10m</td><td>3초</td></tr>
                <tr><td className="row-label">3 – 5m</td><td>1.5초</td></tr>
                <tr><td className="row-label">1 – 3m</td><td>0.5초</td></tr>
                <tr className="ours"><td className="row-label">1m 이내</td><td>0.3초</td></tr>
              </tbody>
            </table>
          </div>

          <p>
            같은 이유로 TTS는 cm 단위를 읽지 않습니다. 오히려 혼동을 주기 때문에 &ldquo;1m 이내&rdquo;로 뭉뚱그려 알리고,
            정류장은 <strong>50cm 이내</strong>에 들어오면 도착으로 판정해 다음 화면으로 자동 전환합니다.
          </p>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>양방향: 버스 단말기</h2>
          <p>
            이 프로젝트에서 가장 중요한 화면은 사용자 앱이 아니라 <strong>기사가 보는 단말기</strong>입니다.
            대기 중인 시각장애인이 있으면 해당 정류장이 노선도에 &ldquo;시각장애인 승차&rdquo;로 표시되고,
            좌측 하단에 사용자의 방향과 거리(예: 후방 1.7m)가 실시간으로 뜨며, <strong>승차 버튼</strong>이 활성화됩니다.
          </p>
          <p>
            기사가 승차를 눈으로 확인하고 버튼을 누르면 사용자의 상태가 <code>waiting</code>에서 <code>onBoard</code>로 바뀌고,
            사용자 앱은 자동으로 하차 안내(노선도) 화면으로 넘어갑니다.
            &ldquo;못 보고 출발하는&rdquo; 실패 지점을 시스템이 직접 막는 장치입니다.
          </p>
        </div>

        <div className="paper-container">
          <div className="paper-fig fig-80">
            <Img src="/assets/figures/project_capstone/bus-terminal.webp" alt="버스 단말기 화면 — 승차 대기 중인 시각장애인 표시와 승차 버튼" />
            <div className="caption">버스 단말기 — 대기 중인 사용자의 방향·거리와 승차 확정 버튼. 승차 처리 후에는 버튼과 정보가 함께 비활성화됩니다.</div>
          </div>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>Role / Contribution</h2>
          <p>애플리케이션 개발을 담당하였으며, 구체적인 기여는 다음과 같습니다.</p>
          <ul>
            <li>
              <strong>거리 기반 진동 피드백 설계</strong> — 서버가 내려주는 사용자–버스 거리를 구간으로 나누고,
              구간마다 진동 주기를 달리해 접근 정도를 감각적으로 전달하는 로직을 설계·구현했습니다.
            </li>
            <li>
              <strong>방위각 보정 수식 구현</strong> — 회전 벡터 센서의 방위각과 UWB 앵커 좌표계를 정합해,
              휴대폰을 어떻게 들고 있든 화살표가 같은 실제 방향을 가리키도록 하는 변환을 구현했습니다.
              이 보정이 있어야 &ldquo;거리&rdquo;뿐 아니라 &ldquo;방향&rdquo; 안내가 성립합니다.
            </li>
            <li>
              <strong>애플리케이션 통합</strong> — SSE로 들어오는 실시간 좌표 처리부터 TTS·진동 출력까지의
              파이프라인을 하나의 안드로이드 애플리케이션으로 통합했습니다.
            </li>
          </ul>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>Outcome</h2>
          <p>
            인하대학교 종합설계(Capstone Design)에서 <strong>3등상</strong>을 수상했습니다.
            정류장에 앵커를 설치하고 버스 단말기 시나리오까지 포함해, 목적지 검색부터 하차 안내까지
            전 과정이 이어지는 형태로 시연했습니다.
          </p>
          <p>
            기술적으로는 &ldquo;인식&rdquo; 대신 &ldquo;측위&rdquo;를 택한 것, 그리고 사용자 쪽만이 아니라
            <strong>기사 쪽에도 화면을 만든 것</strong>이 이 프로젝트의 핵심이었습니다.
            접근성 문제를 다룰 때 정보 전달의 정확도만큼이나 <em>상호작용의 방향</em>이 중요하다는 것을 배운 프로젝트입니다.
          </p>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>System</h2>
          <p>
            안드로이드 앱(사용자)과 React 웹(버스 단말기)이 NGINX 리버스 프록시를 거쳐 두 개의 Spring Boot 서비스와 통신합니다.
            하나는 서비스 로직을, 다른 하나는 UWB 센서 데이터 수신을 전담하며, 상태는 Amazon RDS의 MySQL에 저장됩니다.
            실시간 좌표처럼 서버에서 밀어주는 데이터는 <strong>SSE</strong>로, 경로 검색이나 검색어 보정처럼
            요청-응답이 명확한 것은 <strong>REST</strong>로 나누어 처리했습니다.
          </p>
        </div>

        <div className="paper-container">
          <div className="paper-fig">
            <Img src="/assets/figures/project_capstone/architecture.webp" alt="시스템 아키텍처" />
            <div className="caption">클라이언트(앱 · 버스 단말기 · UWB 센서) → NGINX → Spring Boot 2종 → MySQL(RDS)</div>
          </div>
        </div>
      </section>
      <Footer note="Project page." />
    </>
  );
}
