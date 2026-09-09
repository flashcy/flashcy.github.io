import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Img from '@/components/Img';
import BibTeX from '@/components/BibTeX';

export const metadata: Metadata = {
  title: 'Semantic Joint Grouping for Text-to-Motion Diffusion Model',
  description: '인체 관절을 의미 그룹으로 분해해 그룹별 확산을 수행하는 text-to-motion 기법. KSC 2025.',
};

export default function Page() {
  return (
    <>
      <section className="proj-banner">
        <div className="banner-inner">

          <div className="banner-copy">
            <Link className="paper-back" href="/#publications">← Back to publications</Link>
            <p className="banner-eyebrow">(02) Publication — Text-to-Motion</p>
            <h1 className="banner-title">Semantic Joint Grouping for Text-to-Motion Diffusion Model</h1>
            <p className="banner-authors"><span className="me">Chanyoung Kim</span>, Jion Kim, Byeong-Seok Shin</p>
            <p className="banner-affil">Department of Electrical and Computer Engineering, Inha University</p>
            <p className="banner-desc">
              확산 모델의 연속 표현 공간을 활용한 의미론적 관절 그룹화. 인체 관절을 6개 의미 그룹으로
              분해해 독립적으로 diffusion을 수행하여, VQ 기반 방법의 이산화 한계를 극복하고
              복합 프롬프트 처리 성능을 높였습니다.
            </p>
            <dl className="banner-meta">
              <dt>Venue</dt><dd>Korea Software Congress (KSC), 2025 · <strong>Outstanding Presentation Award</strong></dd>
              <dt>Role</dt><dd>제1저자 · semantic joint grouping framework 설계 및 구현, 실험 수행과 결과 분석 주도</dd>
              <dt>Date</dt><dd>2025</dd>
            </dl>
            <div className="banner-links">
              <svg className="btn-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13Z" /></svg>
              <a href="#">Paper (PDF)</a>

              <svg className="btn-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z" /></svg>
              <a href="#">Code</a>
            </div>
          </div>

          {/* 모션 렌더 영상 준비 전이라 대표 figure로 대체해 둡니다.
               assets/motion/paper2.mp4 를 추가하면 아래 <img> 를 이 <video> 로 바꾸세요:
               <video class="banner-media" autoplay muted loop playsinline
                      poster="../assets/figures/paper2/p003_img002.webp"
                      aria-label="Generated motion with semantic joint grouping">
                 <source src="../assets/motion/paper2.mp4" type="video/mp4" />
               </video> */}
          <div className="banner-visual">
            <Img className="banner-media" src="/assets/figures/paper2/p003_img002.webp" alt="복합 프롬프트에 대한 MDM · ParCo · Ours 생성 결과 비교" />
          </div>

        </div>
      </section>

      <section className="paper-section">
        <div className="paper-container">
          <h2>Abstract</h2>
          <p>
            텍스트 기반 휴먼 모션 생성에서 VQ 기반 모델은 연속적인 모션을 제한된 이산 토큰으로 표현해
            정보 손실과 다양성 감소를 초래한다. 특히 특정 부위 동작과 전신 동작이 동시에 기술된
            다중 제약 프롬프트에서 두 동작이 하나의 모션으로 보간되지 못한다. 본 논문은 인체 관절을
            의미론적으로 분리된 그룹으로 분해하고 각 그룹에 별도의 확산 과정을 적용하는
            <strong>의미론적 관절 그룹화 기법</strong>을 제안한다. 그룹별 확산 모델의 연속 표현으로
            다중 제약 프롬프트를 처리하여, 기존 VQ 모델 대비 복잡한 프롬프트에 대한 모션 생성 정확도를
            크게 향상시켰다.
          </p>
        </div>
      </section>

      <section className="paper-section">
        <div className="paper-container">
          <h2>Method</h2>
          <p>
            텍스트 프롬프트는 CLIP 인코더로 임베딩, 인체 관절 집합 J를 P개 의미 그룹
            G={'{'}g_1,...,g_P{'}'}로 분할. 각 그룹별 forward diffusion q(x_t^p|x_0^p)=N(√ᾱ_t x_0^p, (1-ᾱ_t)I)을
            수행하고, K개의 <strong>FuseDenoiser</strong> 블록을 시퀀스 방향으로 적층해 x̂_0^p 예측.
          </p>
          <p>
            하나의 FuseDenoiser는 (1) self-attention으로 그룹 내 동역학, (2) cross-attention으로 텍스트 조건
            e_d 주입, (3) <strong>FuseMLP</strong>로 다른 그룹 은닉 상태 y_p=[h_t^(k),1|...|h_t^(k),P]_{'{'}j≠p{'}'}와
            현재 그룹 은닉 상태를 LN(h_t^(k),p + MLP(y_p)) 로 융합해 그룹 간 연관관계 학습.
            손실은 복원 손실 + 기하 손실(뼈 길이·속도 정규화·발 접촉, InterGen).
          </p>
          <div className="paper-fig">
            <Img src="/assets/figures/paper2/p002_img001.webp" alt="Method overview" />
            <div className="caption">Figure 1. (a) 전체 아키텍처 (b) FuseDenoiser 블록.</div>
          </div>
        </div>
      </section>

      <section className="paper-section">
        <div className="paper-container">
          <h2>Key Results</h2>
          <p>
            HumanML3D에서 단일 전신 diffusion(MDM)과 6부위 VQ 모델(ParCo)과 비교.
            제안 기법은 FID 0.3020, R@1=0.4727, R@3=0.7833, MM-Dist=3.1423로 MDM 대비 모든 지표 개선.
            복합 프롬프트에서 ParCo는 VQ 이산화 한계로 동작 붕괴/지배적 선택 현상이 발생한 반면,
            본 기법은 전신 동작과 부분 동작을 모두 성공적으로 생성.
          </p>
          <p className="fig-note">정성 비교는 페이지 상단 teaser 그림을 참고하세요.</p>
        </div>
      </section>

      <section className="paper-section">
        <div className="paper-container">
          <h2>BibTeX</h2>
          <BibTeX>{`@inproceedings{kim2025sjg,
  title     = {Semantic Joint Grouping for Text-to-Motion Diffusion Model},
  author    = {Kim, Chanyoung and Kim, Jion and Shin, Byeong-Seok},
  booktitle = {Korea Software Congress (KSC)},
  year      = {2025}
}`}</BibTeX>
        </div>
      </section>
      <Footer note="Paper project page." />
    </>
  );
}
