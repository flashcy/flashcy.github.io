import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Img from '@/components/Img';

export const metadata: Metadata = {
  title: 'Chanyoung Kim — AI Researcher Portfolio',
  description:
    'Chanyoung Kim — AI Researcher. Generative Models, Multimodal Learning, Text-to-Motion.',
};

export default function Home() {
  // body.home 대신 래퍼 div 로 — .home .container.content 는 자손 선택자라 그대로 동작한다
  return (
    <div className="home">
      {/* ============ NAV ============ */}


      {/* ============ HERO / ABOUT ============ */}
      <header className="hero" id="top">
        <div className="container content">

          <div className="hero-split">

            {/* ----- left: profile ----- */}
            <div className="hero-profile">
              <div className="hero-photo"><Img src="/assets/profile.webp" alt="Chanyoung Kim" priority sizes="(max-width: 900px) 100vw, 280px" /></div>

              <h1 className="hero-name">
                <span className="name-line">AI Researcher <i className="name-dash"></i></span>
                <span className="name-line"><strong>Chanyoung Kim</strong> 입니다.</span>
              </h1>

              <p className="hero-tagline">
                텍스트와 휴먼 모션 모달리티를 다루는 생성형 AI 연구자.
                Diffusion 기반 모션 생성·이해 모델을 설계하고, 시계열 생성·예측까지 확장 중입니다.
              </p>

              <div className="hero-meta-row">
                <span className="meta-degree">M.S. Candidate<br />Inha University</span>
                <span className="meta-kw">
                  Text-to-Motion<br />
                  Generative Models<br />
                  Multimodal Learning<br />
                  Diffusion Models
                </span>
              </div>

              <dl className="hero-contact">
                <dt>
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-8 4.75-8-4.75V6l8 4.75L20 6v2.24Z" />
                  </svg>
                  <span className="sr-only">Email</span>
                </dt>
                <dd><a href="mailto:flashcy@inha.edu">flashcy@inha.edu</a></dd>

                <dt>
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z" />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </dt>
                <dd><a href="https://github.com/flashcy">github.com/flashcy</a></dd>

                <dt>
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </dt>
                <dd><a href="https://www.linkedin.com/in/찬영-김-b21267338">linkedin.com/in/찬영-김</a></dd>

                <dt>
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13Z" />
                  </svg>
                  <span className="sr-only">CV</span>
                </dt>
                <dd><Link href="/assets/cv.pdf" target="_blank" rel="noopener">CV</Link></dd>
              </dl>
            </div>

            {/* ----- right: education / awards / experience ----- */}
            <div className="cv-col">

              <div className="cv-group" id="education">
                <h2 className="cv-group-title">Education</h2>
                <div className="simple-list">
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">M.S. in Electrical and Computer Engineering</p>
                      <p className="item-sub">Inha University · Advisor: Prof. Byeong-Seok Shin</p>
                    </div>
                    <div className="item-date">25.03~</div>
                  </div>
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">B.S. in Computer Science Engineering (7 semesters)</p>
                      <p className="item-sub">Inha University</p>
                    </div>
                    <div className="item-date">19.03~25.02</div>
                  </div>
                </div>
              </div>

              <div className="cv-group" id="awards">
                <h2 className="cv-group-title">Awards</h2>
                <div className="simple-list">
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">Outstanding Presentation Award</p>
                      <p className="item-sub">Korea Software Congress (KSC) 2025 · Korean Institute of Information Scientists and Engineers (KIISE)</p>
                    </div>
                    <div className="item-date">26.01</div>
                  </div>
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">Gold Award, International Collegiate Challenge for AI-Assisted Society (ICCAS) 2024</p>
                      <p className="item-sub">Euro-Korean Women Scientists and Engineers Association · University of Warwick, UK</p>
                    </div>
                    <div className="item-date">24.08</div>
                  </div>
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">Outstanding Poster Award</p>
                      <p className="item-sub">Europe-Korea Conference on Science and Technology (EKC) 2024</p>
                    </div>
                    <div className="item-date">24.08</div>
                  </div>
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">3rd Prize, Capstone Design (Spring 2024)</p>
                      <p className="item-sub">Inha University</p>
                    </div>
                    <div className="item-date">24.06</div>
                  </div>
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">Gold Award, Inha University Programming Contest (IUPC) 2024</p>
                      <p className="item-sub">Inha University · 3rd place individual among ~50 participants</p>
                    </div>
                    <div className="item-date">24.04</div>
                  </div>
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">Academic Scholarship</p>
                      <p className="item-sub">Inha University</p>
                    </div>
                    <div className="item-date">19.09</div>
                  </div>
                </div>
              </div>

              <div className="cv-group" id="experience">
                <h2 className="cv-group-title">Experience</h2>
                <div className="simple-list">
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">EKC 2024 Science School Session — Volunteer Mentor</p>
                      <p className="item-sub">University of Warwick, Coventry, UK · 한국어/영어 병행 멘토링</p>
                    </div>
                    <div className="item-date">24.08</div>
                  </div>
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">International Collegiate Challenge for AI-Assisted Society — Participant</p>
                      <p className="item-sub">University of Warwick, Coventry, UK · Gold Award</p>
                    </div>
                    <div className="item-date">24.07~24.08</div>
                  </div>
                  <div className="simple-item">
                    <div className="item-main">
                      <p className="item-title">MediaAI Lab, Inha University — Undergraduate Research Intern</p>
                      <p className="item-sub">Advisor: Prof. Byeong-Seok Shin · 그래픽스 심화 강의 조교 보조, 산학 과제 참여</p>
                    </div>
                    <div className="item-date">24.03~24.06</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ============ PUBLICATIONS ============ */}
      <section className="block" id="publications">
        <div className="container content">
          <h2 className="section-title reveal"><span className="num">01</span> Publications</h2>
        </div>
        <div className="entry-list">

            <Link className="entry reveal" href="/projects/paper-1">
              <div className="num-label">01</div>
              <div className="entry-body">
                <div className="entry-meta">
                  <span className="entry-venue venue-journal-text">Computers, Materials and Continua (CMC), 2026</span>
                </div>
                <h3>Global-Local Embedding Gating Network for Part-wise Text-to-Motion Generation</h3>
                <p className="pub-authors"><span className="me">Chanyoung Kim</span>, Jion Kim, Byeong-Seok Shin</p>
                <p className="entry-desc">
                  diffusion 기반 T2M에서 글로벌·파트-레벨 텍스트 조건의 기여도를 현재 노이즈 모션 상태와
                  diffusion timestep에 따라 동적으로 조절하는 Embedding Gating Network(EGN) 제안.
                  부분별 생성 pathway와 PartFuse 융합으로 부분 의미 정합성과 전신 일관성을 동시에 달성.
                </p>
                <div className="entry-metrics">
                  <span className="metric">R@1 <strong>0.4708</strong> <span className="delta">(+15.4%)</span></span>
                  <span className="metric">FID <strong>0.1780</strong> <span className="delta">(4.8× 개선)</span></span>
                  <span className="metric">MM-Dist <strong>3.1581</strong> <span className="delta">(−10.0%)</span></span>
                </div>
              </div>
              {/* 평소엔 잔상(trail) 렌더, 마우스를 올리면 모션이 재생됩니다. */}
              <div className="entry-thumb thumb-motion">
                <video className="motion-clip" muted={true} loop={true} playsInline={true} preload="auto" aria-hidden="true">
                  <source src="/assets/figures/paper1/thumb_loop.mp4" type="video/mp4" />
                </video>
                <Img className="motion-still" src="/assets/figures/paper1/thumb_trail.webp" alt="EGN이 생성한 모션의 잔상 렌더 — 오른손 펀치와 오른발 전진" />
              </div>
            </Link>

            <Link className="entry reveal" href="/projects/paper-2">
              <div className="num-label">02</div>
              <div className="entry-body">
                <div className="entry-meta">
                  <span className="entry-venue venue-conf-text">Korea Software Congress (KSC), 2025</span>
                </div>
                <h3>Semantic Joint Grouping for Text-to-Motion Diffusion Model</h3>
                <p className="pub-authors"><span className="me">Chanyoung Kim</span>, Jion Kim, Byeong-Seok Shin</p>
                <p className="entry-desc">
                  확산 모델의 연속 표현 공간을 활용한 의미론적 관절 그룹화. 인체 관절을 6개 의미 그룹으로
                  분해·독립 diffusion 수행, VQ 기반 방법의 이산화 한계를 극복하여 복합 프롬프트 처리 향상.
                </p>
                <div className="entry-metrics">
                  <span className="metric">FID <strong>0.3020</strong> <span className="delta">(2.8× 개선)</span></span>
                  <span className="metric">R@3 <strong>0.7833</strong> <span className="delta">(+8.9%)</span></span>
                </div>
              </div>
              {/* TODO(썸네일): npy 확보 후 paper1처럼 렌더 루프(thumb_loop.mp4) + 스틸 조합으로 교체.
                   SJG는 "부위별 의미 관절 그룹화"가 핵심이므로, 가능하면 그룹별로 색을 달리한
                   부위 강조 렌더로 만들 것. 파이프라인은 tools/motion/ (01_fit_joints2smpl → 02_smpl2glb
                   → blender_render) 참고. 그 전까지는 정성 결과 그림으로 대체해 둡니다. */}
              <div className="entry-thumb">
                <Img src="/assets/figures/paper2/p003_img002.webp" alt="복합 프롬프트에 대한 MDM · ParCo · Ours 생성 결과 비교" />
              </div>
            </Link>

          </div>
      </section>

      {/* ============ PREPRINTS / SUBMITTED ============ */}
      <section className="block" id="preprints">
        <div className="container content">
          <h2 className="section-title reveal"><span className="num">02</span> Preprints &amp; Under Review</h2>
        </div>
        <div className="entry-list">

            {/* 심사 중인 논문은 상세 페이지 없이 목록 항목으로만 노출합니다. */}
            <div className="entry entry-static reveal">
              <div className="num-label">01</div>
              <div className="entry-body">
                <div className="entry-meta">
                  <span className="entry-venue venue-preprint-text">KIISE Transactions on Computing Practices (KTCP), 2026 · Under Review</span>
                </div>
                <h3>Semantic Joint Grouping for Text-Motion Alignment in Diffusion Models</h3>
                <p className="pub-authors"><span className="me">Chanyoung Kim</span>, Jion Kim, Byeong-Seok Shin</p>
                <p className="entry-desc">
                  KSC 2025 &ldquo;Semantic Joint Grouping&rdquo;의 확장판. LLM 기반 부위별 의미론적 중요도 추정을
                  관절 위치·속도 손실 가중치에 반영하는 의미론기반 손실 가중치 전략 추가.
                </p>
                <div className="entry-metrics">
                  <span className="metric">R@3 <strong>+1.0%</strong></span>
                  <span className="metric">MM-Dist <strong>−0.8%</strong> <span className="delta">(KSC 2025 대비)</span></span>
                </div>
              </div>
            </div>

          </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section className="block" id="projects">
        <div className="container content">
          <h2 className="section-title reveal"><span className="num">03</span> Projects</h2>
        </div>
        <div className="entry-list">

            <Link className="entry reveal" href="/projects/capstone">
              <div className="num-label">
                01
                <Img className="num-icon" src="/assets/figures/project_capstone/icon.webp" alt="" aria-hidden="true" />
              </div>
              <div className="entry-body">
                <div className="entry-meta">
                  <span className="entry-venue venue-preprint-text">Capstone Design · Spring 2024 · 3rd Prize</span>
                </div>
                <h3>시각장애인을 위한 양방향 위치 인식 교통 보조 서비스</h3>
                <p className="entry-desc">
                  정류장에 설치한 UWB 앵커 3개의 삼각측량으로 사용자와 버스의 좌표를 cm 단위로 특정.
                  거리는 반비례 주기의 진동으로, 방향은 방위각 보정된 화살표로 전달하고,
                  버스 단말기의 승차 확정 버튼으로 기사가 시각장애인을 인지하지 못한 채 출발하는 문제까지 해결.
                </p>
              </div>
              <div className="entry-thumb thumb-phones">
                <Img src="/assets/figures/project_capstone/main.webp" alt="목적지 검색 화면" />
                <Img src="/assets/figures/project_capstone/bus-stop.webp" alt="정류장 방향 안내 화면" />
                <Img src="/assets/figures/project_capstone/bus-near.webp" alt="버스 근접 알림 화면" />
              </div>
            </Link>

            <Link className="entry reveal" href="/projects/ekc2024">
              <div className="num-label">
                02
                <Img className="num-icon" src="/assets/figures/project_iccas/icon.webp" alt="" aria-hidden="true" />
              </div>
              <div className="entry-body">
                <div className="entry-meta">
                  <span className="entry-venue venue-conf-text">ICCAS 2024 · EKC 2024 · Warwick, UK</span>
                </div>
                <h3>난독증 아동을 위한 지능형 기능성 게임 (Digital Therapeutics)</h3>
                <p className="entry-desc">
                  초등 저학년 난독증 아동을 위한 놀이형 디지털 치료 게임. 아동의 수행 패턴에 따라 과제 난이도와
                  피드백 방식을 조절하는 적응형 알고리즘 구현. ICCAS 2024 Gold Award · EKC 2024 Outstanding Poster Award.
                </p>
              </div>
              <div className="entry-thumb thumb-animals" role="img" aria-label="게임 캐릭터 애니메이션: 원숭이, 고양이, 곰, 토끼">
                <span className="sprite sprite-monkey"></span>
                <span className="sprite sprite-cat"></span>
                <span className="sprite sprite-bear"></span>
                <span className="sprite sprite-rabbit"></span>
              </div>
            </Link>

            <div className="entry reveal" style={{ cursor: 'default' }}>
              <div className="num-label">03</div>
              <div className="entry-body">
                <div className="entry-meta">
                  <span className="entry-venue venue-preprint-text">Personal · WIP</span>
                </div>
                <h3>개인 연구 프로젝트 (예정)</h3>
                <p className="entry-desc">직무 관련 휴먼 모션·생성형 AI 개인 프로젝트를 준비 중입니다.</p>
              </div>
              <div className="entry-thumb">
                <div style={{ width: '100%', height: '100%', background: 'var(--color-accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', fontSize: '.78rem', fontWeight: '500' }}>Coming soon</div>
              </div>
            </div>

          </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer home />
    </div>
  );
}
