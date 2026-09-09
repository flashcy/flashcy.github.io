import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Img from '@/components/Img';
import ScreenSlider from '@/components/ScreenSlider';

export const metadata: Metadata = {
  title: '난독증 아동을 위한 지능형 기능성 게임 — ICCAS / EKC 2024',
  description: '초등학교 저학년 난독증 아동의 조기 치료를 목표로 한 적응형 디지털 치료 게임.',
};

export default function Page() {
  return (
    <>
      <section className="proj-banner">
        <div className="banner-inner">

          <div className="banner-copy">
            <Link className="paper-back" href="/#projects">← Back to projects</Link>
            <p className="banner-eyebrow">(02) Project — Digital Therapeutics / Serious Game</p>
            <h1 className="banner-title">난독증 아동을 위한 지능형 기능성 게임</h1>
            <p className="banner-authors">Jingyeong Lee, Taegeun Kwack, Bokyung Moon, <span className="me">Chanyoung Kim</span></p>
            <p className="banner-affil">Chungbuk National University · Inje University · Inha University<br />ICCAS 2024 · EKC 2024, University of Warwick, UK</p>
            <p className="banner-desc">
              “디지털 치료를 위한 지능형 기능성 게임”이라는 주제 아래, 초등학교 저학년 난독증 아동의
              <strong>조기 치료</strong>를 목표로 한 놀이형 디지털 치료 게임을 기획·개발했습니다.
              아동의 읽기 수준과 반응에 따라 과제 난이도와 피드백 방식이 달라지는 적응형 구조가 핵심입니다.
            </p>
            <dl className="banner-meta">
              <dt>Awards</dt><dd>Gold Award · ICCAS 2024 (2024.08.02)<br />Outstanding Poster Award · EKC 2024 (2024.08.01)</dd>
              <dt>Organizer</dt><dd>Euro-Korean Women Scientists and Engineers Association</dd>
              <dt>Role</dt><dd>핵심 기획 아이디어 제안 · 게임 컨셉 기획 · 디자인 및 기능 개발 주도 · 포스터 제작 및 발표</dd>
              <dt>Date</dt><dd>2024.07 – 2024.08</dd>
            </dl>
          </div>

          {/* 손글씨 답안을 OCR이 인식하고 보상을 주는 핵심 상호작용 */}
          <div className="banner-visual">
            <video className="banner-media" autoPlay={true} muted={true} loop={true} playsInline={true} preload="metadata" poster="/assets/figures/project_iccas/in_game/task_write.webp" aria-label="아동이 손으로 쓴 답을 OCR이 인식하고 별을 주는 게임 화면">
              <source src="/assets/figures/project_iccas/in_game/task_write.mp4" type="video/mp4" />
            </video>
          </div>

        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>Overview</h2>
          <p>
            Euro-Korean Women Scientists and Engineers Association 주관
            <strong>International Collegiate Challenge for AI-Assisted Society (ICCAS) 2024</strong>에
            참여해, 치료 목적의 기능성 게임(serious game)을 개발하는 과제를 수행했습니다.
            “디지털 치료를 위한 지능형 기능성 게임”이라는 큰 주제에 대해,
            <strong>난독증 조기 치료</strong>라는 구체적 방향을 팀의 핵심 기획 아이디어로 제안했습니다.
          </p>
          <p>
            가장 큰 어려움은 난독증이 처음 접하는 도메인이었다는 점이었습니다. 단순히 게임을 만드는 것이 아니라,
            아동의 읽기 수준과 반응에 따라 난이도와 피드백이 달라져야 했기 때문에 <em>교육학적 이해와 기술 구현을
            함께 갖춰야</em> 했습니다. 관련 교육학 논문과 자료를 직접 찾아 읽으며 난독증의 유형과 아동의 반응 특성을
            정리했고, 이를 바탕으로 아동의 수행 패턴에 따라 게임 내 과제의 난이도와 피드백 방식을 조절하는
            <strong>적응형 알고리즘</strong>을 구현했습니다. 치료 콘텐츠의 실효성을 높이기 위해 관련 전문가의 자문도
            반영했습니다.
          </p>
          <p>
            개발 결과는 영국에서 개최된
            <strong>Europe-Korea Conference on Science and Technology (EKC) 2024</strong>에서
            포스터로 발표하였으며, 학회 관계자 대상 최종 발표를 통해서도 선보였습니다.
          </p>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>Game Design</h2>
          <p>
            게임은 놀이공원을 배경으로 하며, 아동이 놀이기구를 타는 흐름 속에서 자연스럽게 학습 과제를 수행하도록
            설계했습니다. 전체는 세 단계로 구성됩니다.
          </p>
          <ul>
            <li>
              <strong>Entry Preparation</strong> — 게임 시작 전 간단한 설문을 통해 난독증 수준을 평가하고,
              게임 종료 후 동일한 설문을 다시 수행해 <em>사전·사후 비교</em>가 가능하도록 했습니다.
            </li>
            <li>
              <strong>Riding</strong> — 음소 인식(phoneme recognition)과 쓰기 능력(writing ability) 두 범주의
              문항을 각 5개씩, 총 10개 제시합니다. 쓰기 과제는 OCR을 활용해 아동이 직접 손으로 쓴 답을 인식합니다.
            </li>
            <li>
              <strong>Reminiscing</strong> — 듣기 단계로, 변형된 단어가 섞인 문장을 듣고 잘못된 부분을 찾아내며
              듣기 이해력과 음소 인식 능력을 함께 훈련합니다.
            </li>
          </ul>
          <p>
            획득한 별로 아이템을 구매하고 캐릭터를 꾸미는 보상 구조를 두어, 치료 과정이 반복되어도
            아동의 몰입이 유지되도록 했습니다. <em>&ldquo;Therapy needs to look like play&rdquo;</em>가 팀의 설계 원칙이었습니다.
          </p>

          <h3>Entry Preparation</h3>
          <div className="screens-split">
            <div className="screens">
              <figure>
                <Img src="/assets/figures/project_iccas/in_game/pretest.webp" alt="CLDQ-R 난독증 선별 설문 화면" />
                <figcaption><strong>선별 설문</strong> — CLDQ-R 기반 문항</figcaption>
              </figure>
            </div>
            <div className="split-copy">
              <p>
                플레이 전에 <strong>CLDQ-R</strong> 기반 선별 설문으로 아동의 난독증 수준을 먼저 확인합니다.
                게임을 마친 뒤 같은 설문을 한 번 더 수행하게 해, 세션 전후를 같은 척도로 비교할 수 있게 했습니다.
              </p>
              <p>
                이 값은 뒤의 세션별 점수 추이와 함께 <em>진척을 판단하는 근거</em>가 됩니다.
                치료용 게임인 만큼, 재미와 별개로 측정 가능한 지표를 처음부터 설계에 넣었습니다.
              </p>
            </div>
          </div>

          <h3>놀이공원과 맵</h3>
          <div className="screens cols-2">
            <figure>
              <video autoPlay={true} muted={true} loop={true} playsInline={true} preload="metadata" poster="/assets/figures/project_iccas/in_game/lobby.webp" aria-label="놀이공원 Wonderland 입구 화면">
                <source src="/assets/figures/project_iccas/in_game/lobby.mp4" type="video/mp4" />
              </video>
              <figcaption><strong>로비</strong> — 놀이공원 <em>Wonderland</em> 입구. 치료 과정을 놀이의 흐름 안에 둡니다.</figcaption>
            </figure>
            <figure>
              <Img src="/assets/figures/project_iccas/in_game/map.webp" alt="놀이기구가 배치된 놀이공원 맵" />
              <figcaption><strong>맵</strong> — 놀이기구 하나가 테마 하나에 대응하며, 아동이 순서를 골라 진행합니다.</figcaption>
            </figure>
          </div>

          <h3>과제 진행</h3>
          <p>
            놀이기구에 타면 과제가 시작됩니다. 좌우 버튼으로 과제 유형을 하나씩 넘겨 보세요.
          </p>
          <ScreenSlider
              label="과제 진행 화면"
              labels={['Riding · 쓰기', 'Riding · 빈칸 채우기', 'Riding · 음소 인식']}
            >
              <figure>
                <video autoPlay={true} muted={true} loop={true} playsInline={true} preload="metadata" poster="/assets/figures/project_iccas/in_game/task_write.webp" aria-label="들은 단어를 손글씨로 쓰면 OCR이 인식하는 화면">
                  <source src="/assets/figures/project_iccas/in_game/task_write.mp4" type="video/mp4" />
                </video>
                <figcaption><strong>Riding · 쓰기</strong> — 들은 단어의 빈칸(<code>d_g</code>)을 손으로 씁니다. NAVER Cloud OCR이 필기를 인식해 즉시 정오답과 보상을 보여줍니다.</figcaption>
              </figure>
              <figure>
                <video autoPlay={true} muted={true} loop={true} playsInline={true} preload="metadata" poster="/assets/figures/project_iccas/in_game/task_listen.webp" aria-label="ball__n 빈칸을 손글씨로 채우는 화면">
                  <source src="/assets/figures/project_iccas/in_game/task_listen.mp4" type="video/mp4" />
                </video>
                <figcaption><strong>Riding · 빈칸 채우기</strong> — 제한 시간 안에 <code>ball__n</code>의 빈칸을 채웁니다.</figcaption>
              </figure>
              <figure>
                <video autoPlay={true} muted={true} loop={true} playsInline={true} preload="metadata" poster="/assets/figures/project_iccas/in_game/task_choice.webp" aria-label="여러 단어 후보 중 올바른 것을 고르는 화면">
                  <source src="/assets/figures/project_iccas/in_game/task_choice.mp4" type="video/mp4" />
                </video>
                <figcaption><strong>Riding · 음소 인식</strong> — 헷갈리는 표기 후보 중 올바른 단어를 고릅니다.</figcaption>
              </figure>
            </ScreenSlider>

          <p className="screens-caption">
            Figure 1. 구현 결과 — 사전 평가, 로비와 맵, 음소 인식·쓰기 과제. 영상은 실제 플레이 화면입니다.
          </p>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>Rewards &amp; Progress</h2>
          <p>
            치료는 한 번으로 끝나지 않기 때문에, <em>다시 오고 싶게 만드는 장치</em>가 게임 설계의 절반을
            차지했습니다. 과제 수행으로 모은 재화로 상점에서 아이템을 사고 캐릭터를 꾸미는 순환을 만들고,
            놀이기구별 도전과제를 두어 반복 플레이에 목표를 부여했습니다.
          </p>
          <p>
            동시에 아동과 보호자가 <strong>변화를 눈으로 확인</strong>할 수 있어야 한다고 봤습니다.
            매 세션의 최고 점수와 평균 점수를 날짜별로 누적해 보여주어, 사전·사후 설문과 함께
            진척을 확인할 수 있는 근거로 삼았습니다.
          </p>

          <h3>테마 결과</h3>
          <div className="screens-split">
            <div className="screens">
              <figure className="shot">
                <Img src="/assets/figures/project_iccas/in_game/result_stars.webp" alt="정답률 36%와 별 1개를 표시한 결과 화면" />
                <figcaption><strong>테마 결과</strong> — 정답률에 따라 별을 최대 3개까지</figcaption>
              </figure>
            </div>
            <div className="split-copy">
              <p>
                놀이기구 하나를 마치면 정답률에 따라 별을 최대 세 개까지 받습니다.
                이 별이 보상 순환의 출발점이자, 아동이 &ldquo;한 번 더&rdquo;를 선택하게 만드는 가장 직접적인 장치입니다.
              </p>
              <p>
                점수를 숫자로만 보여주지 않고 별이라는 <em>수집 가능한 형태</em>로 바꾼 것이 핵심입니다.
                모은 별은 아래의 상점과 도전과제로 이어집니다.
              </p>
            </div>
          </div>

          <h3>도전과제와 성장 추이</h3>
          <div className="screens cols-2">
            <figure>
              <Img src="/assets/figures/project_iccas/in_game/challenge_list.webp" alt="놀이기구별 도전과제 목록" />
              <figcaption><strong>도전과제</strong> — 놀이기구 테마별 목표로 반복 플레이에 방향을 줍니다.</figcaption>
            </figure>
            <figure>
              <Img src="/assets/figures/project_iccas/in_game/progress.webp" alt="날짜별 최고 점수와 평균 점수를 보여주는 꺾은선 그래프" />
              <figcaption><strong>성장 추이</strong> — 세션별 최고(Best)·평균(Average) 점수를 누적해, 아동과 보호자가 변화를 확인할 수 있게 했습니다.</figcaption>
            </figure>
          </div>

          <h3>상점과 캐릭터 꾸미기</h3>
          <div className="screens row-shots">
            <figure>
              <Img src="/assets/figures/project_iccas/in_game/store.webp" alt="팝콘과 풍선 아이템을 파는 상점 화면" />
              <figcaption><strong>상점</strong> — 모은 재화로 아이템을 구매합니다.</figcaption>
            </figure>
            <figure>
              <Img src="/assets/figures/project_iccas/in_game/character_preview.webp" alt="공룡 인형 아이템 미리보기" />
              <figcaption><strong>미리보기</strong> — 구매 전 확인</figcaption>
            </figure>
            <figure>
              <Img src="/assets/figures/project_iccas/in_game/character_equipped.webp" alt="공룡 인형을 착용한 캐릭터" />
              <figcaption><strong>착용</strong> — 꾸미기로 이어지는 보상 순환</figcaption>
            </figure>
          </div>
          <p className="screens-caption">Figure 2. 보상 순환과 진척 추적 — 테마 결과, 도전과제와 점수 추이, 상점·아이템 착용.</p>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>Demo</h2>
          <p>발표에 사용한 플레이 데모 영상입니다. 로비에서 시작해 과제 수행과 보상까지의 흐름을 담았습니다.</p>
          <div className="paper-fig">
            <video controls={true} preload="none" playsInline={true} poster="/assets/figures/project_iccas/in_game/lobby.webp">
              <source src="/assets/figures/project_iccas/demo.mp4" type="video/mp4" />
              브라우저가 영상을 지원하지 않습니다.
            </video>
            <div className="caption">Figure 3. 플레이 데모 (1분 13초).</div>
          </div>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>System Architecture</h2>
          <p>
            클라이언트는 <strong>Unity</strong>로 개발해 Android로 배포했고, 학습 과제에 필요한 인식·생성 기능은
            외부 AI API를 연동해 처리했습니다. 게임 계정과 진행 데이터는 게임 백엔드 서비스
            <strong>뒤끝(Backend)</strong>으로 관리하고, 그 외 서버 로직은 직접 구축한
            <strong>Spring Boot</strong> 서버가 담당합니다.
          </p>
          <ul>
            <li>
              <strong>클라이언트</strong> — Unity 기반 Android 애플리케이션. 사용자 입력과 게임 진행을 처리합니다.
            </li>
            <li>
              <strong>AI API 연동</strong> — 발음·듣기 과제에는 <strong>Google Cloud Speech API</strong>,
              손글씨 쓰기 과제의 문자 인식(OCR)에는 <strong>NAVER Cloud Platform</strong>,
              학습 문장 생성에는 <strong>ChatGPT API</strong>를 사용했습니다.
            </li>
            <li>
              <strong>서버</strong> — <strong>Nginx</strong>를 리버스 프록시로 두고 <strong>Spring Boot</strong> 서버가
              요청을 처리하며, 데이터는 <strong>MySQL</strong>에 저장합니다.
            </li>
            <li>
              <strong>배포 파이프라인</strong> — GitHub에 push하면 <strong>GitHub Actions</strong>가 이미지를 빌드해
              <strong>Docker Hub</strong>에 올리고, 서버가 이를 내려받아 배포하는 자동화 흐름을 구성했습니다.
            </li>
          </ul>
          <div className="paper-fig fig-narrow">
            <Img src="/assets/figures/project_iccas/architecture.webp" alt="시스템 아키텍처 다이어그램" />
            <div className="caption">
              Figure 4. 시스템 아키텍처 — Unity 클라이언트, 외부 AI API, Nginx·Spring Boot·MySQL 서버,
              GitHub Actions 기반 배포 파이프라인.
            </div>
          </div>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>Contribution</h2>
          <ul>
            <li>
              <strong>핵심 기획</strong> — “디지털 치료를 위한 지능형 기능성 게임”이라는 과제 주제에 맞춰,
              난독증 조기 치료라는 프로젝트의 핵심 방향과 아이디어를 제안했습니다.
            </li>
            <li>
              <strong>게임 컨셉 및 개발</strong> — 초등학교 저학년이라는 주 타깃층에 맞춰 놀이형 게임 컨셉을 기획하고,
              디자인과 기능 개발을 주도했습니다.
            </li>
            <li>
              <strong>적응형 난이도·피드백 알고리즘</strong> — 아동의 수행 패턴에 따라 과제 난이도와 피드백 방식을
              조절하는 알고리즘을 설계·구현했습니다.
            </li>
            <li>
              <strong>전문가 자문 반영 및 발표</strong> — 치료 콘텐츠의 실효성을 높이기 위해 관련 전문가의 자문을 반영했고,
              EKC 2024 학회 포스터 디자인 및 개발 관련 내용 작성, 최종 내용 검토와 발표를 담당했습니다.
            </li>
          </ul>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>Outcome</h2>
          <p>
            기획부터 개발, 발표까지 전 과정에 참여한 성과를 인정받아
            <strong>ICCAS 2024 Gold Award</strong>와
            <strong>EKC 2024 Outstanding Poster Award</strong>를 함께 수상했습니다.
            포스터 제목은 <em>“A Digital Therapeutic for Early Intervention in Dyslexia in Early School Age Children”</em>입니다.
          </p>
          <p>
            낯선 분야를 짧은 시간 안에 학습해 실제로 작동하는 결과물로 완성하고 국제 무대에서 성과로 이어간 경험이며,
            기술이 그 자체의 완성도에 머무를 때보다 <em>사용자의 어려움을 실질적으로 줄이는 방향으로 이어질 때</em>
            더 큰 가치를 가진다는 관점을 갖게 된 계기이기도 합니다.
          </p>
          <div className="poster-fig">
            <Link href="/assets/figures/project_iccas/poster.webp" target="_blank" rel="noopener">
              <Img src="/assets/figures/project_iccas/poster.webp" alt="EKC 2024 포스터: A Digital Therapeutic for Early Intervention in Dyslexia in Early School Age Children" />
            </Link>
            <p className="zoom-note">클릭하면 포스터 원본 크기로 열립니다.</p>
          </div>
        </div>
      </section>

      <section className="paper-section">
        <div className="container content">
          <h2>Related Activity</h2>
          <p>
            EKC 2024 학회 기간 중에는 영국 University of Warwick에서 열린 <strong>Science School Session</strong>에
            자원봉사자로도 참여했습니다. 해외 거주 한국 학생 2명의 전담 멘토를 맡아, 개별 전자 부품으로부터
            블루투스 스피커를 직접 조립해 완성하는 기술 체험 프로젝트의 전 과정을 안내하고 지도했습니다.
            학생들의 이해 수준에 맞춰 한국어와 영어를 병행해 소통하며, 스스로 결과물을 완성하는 경험 속에서
            기술에 대한 흥미와 성취감을 느낄 수 있도록 이끌었습니다.
          </p>
        </div>
      </section>
      <Footer note="Project page." />
    </>
  );
}
