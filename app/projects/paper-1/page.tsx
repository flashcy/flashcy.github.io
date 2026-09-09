import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Img from '@/components/Img';
import MotionViewer from '@/components/MotionViewer';
import BibTeX from '@/components/BibTeX';

export const metadata: Metadata = {
  title: 'Global-Local Embedding Gating Network for Part-wise Text-to-Motion Generation',
  description: 'Diffusion 기반 text-to-motion 에서 글로벌·파트 조건의 기여도를 동적으로 조절하는 Embedding Gating Network. CMC 2026.',
};

export default function Page() {
  return (
    <>
      {/* ============ NAV ============ */}


      {/* ============ BANNER ============ */}
      <section className="proj-banner">
        <div className="banner-inner">

          <div className="banner-copy">
            <Link className="paper-back" href="/#publications">← Back to publications</Link>
            <p className="banner-eyebrow">(01) Publication — Text-to-Motion</p>
            <h1 className="banner-title">Global-Local Embedding Gating Network for Part-wise Text-to-Motion Generation</h1>
            <p className="banner-authors"><span className="me">Chanyoung Kim</span>, Jion Kim, Byeong-Seok Shin</p>
            <p className="banner-affil">Department of Electrical and Computer Engineering, Inha University</p>
            <p className="banner-desc">
              diffusion 기반 T2M에서 글로벌·파트-레벨 텍스트 조건의 기여도를 현재 노이즈 모션 상태와
              diffusion timestep에 따라 동적으로 조절하는 Embedding Gating Network(EGN)를 제안합니다.
              부분별 생성 pathway와 PartFuse 융합으로 부분 의미 정합성과 전신 일관성을 동시에 달성합니다.
            </p>
            <dl className="banner-meta">
              <dt>Venue</dt><dd>Computers, Materials and Continua (CMC), 2026</dd>
              <dt>Role</dt><dd>제1저자 · 문제 정의, 모델 아키텍처 설계, 학습 파이프라인 구현, 실험 설계 및 수행, 논문 작성 전 과정 주도</dd>
              <dt>Date</dt><dd>2026</dd>
            </dl>
            <div className="banner-links">
              <svg className="btn-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13Z" /></svg>
              <a href="#">Paper (PDF)</a>

              <svg className="btn-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1ZM8 13h8v-2H8v2Zm9-6h-4v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10Z" /></svg>
              <a href="#">DOI</a>

              <svg className="btn-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z" /></svg>
              <a href="#">Code</a>

              <svg className="btn-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7ZM19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7Z" /></svg>
              <a href="#">arXiv</a>
            </div>
          </div>

          {/* 히어로 = three.js 라이브 뷰어. 받침대 위에서 자동 회전하고,
               드래그로 각도를 돌리고, 좌우 버튼/← →/도트로 프롬프트를 바꿉니다.
               data-autospin="false" 로 자동 회전 끄기, data-spin-speed 로 속도(rad/s) 조절. */}
          <MotionViewer
            manifest="/assets/motion/manifest.json"
            spinSpeed={0.32}
            poster="/assets/figures/paper1/thumb_trail.webp"
            posterAlt="생성된 모션의 잔상 렌더"
            hint="드래그해서 돌려보세요 · 좌우 버튼(또는 ← →)으로 다른 프롬프트 결과 보기"
          />

        </div>
      </section>

      {/* ============ ABSTRACT ============ */}
      <section className="paper-section">
        <div className="paper-container">
          <h2>Abstract</h2>
          <p>
            Diffusion-based methods have substantially improved the performance of full-body Text-to-Motion (T2M)
            generation from natural language descriptions. Despite this progress, accurately capturing the
            fine-grained semantics of composite prompts remains challenging. Approaches that rely solely on a
            single global text condition often fail to retain part-specific semantic cues, leading to deviations
            in the motions of certain body parts from the intended descriptions.
          </p>
          <p>
            We propose the <strong>Embedding Gating Network (EGN)</strong>, which dynamically modulates the
            contributions of global and local information according to the current noisy motion state and the
            diffusion timestep. The conditioned signals are processed through independent part-wise generation
            pathways to minimize semantic interference, while a lightweight fusion module enables inter-part
            information exchange to preserve structural coherence across the full body. Experiments on the
            HumanML3D benchmark show that the proposed method consistently improves text-motion alignment over
            existing full-body and part-based baselines, without compromising motion quality or diversity.
          </p>
        </div>
      </section>

      {/* ============ APPROACH OVERVIEW ============ */}
      <section className="paper-section">
        <div className="paper-container">
          <h2>Approach Overview</h2>
          <p>
            EGN은 <strong>(1) Transformation module</strong>과 <strong>(2) GlocalGate</strong>로 구성된다.
            글로벌 텍스트 임베딩과 LLM(Qwen2.5-7B-Instruct)으로 분해된 6개 부위별 로컬 텍스트 임베딩을
            CLIP 인코딩 후 residual adapter로 motion-relevant 보정한다. GlocalGate는 노이즈 모션
            <code>x_t</code>와 timestep <code>t</code>로부터 글로벌/로컬 가중치 <code>(α_g, α_l)</code>를
            softmax로 예측하고, 부품별 조건 <code>c_p(t) = α_g·e_g + α_l,p·e_l,p</code>로 시간-가변 결합한다.
          </p>
          <p>
            각 부위는 part-specific attention으로 의미 합성 후, <strong>PartFuse</strong> 블록이 MLP로
            다른 부위 은닉 상태를 통합해 전신 조정. 의미 해석과 부품 간 조정을 layer 수준에서 분리해
            부위 표현을 뚜렷하게 유지한다.
          </p>
          <div className="paper-fig">
            <Img src="/assets/figures/paper1/p006_img002.webp" alt="Method overview" />
            <div className="caption">Figure 1. Overall architecture of the proposed framework. (a) EGN computes part-specific embeddings; (b) PartFuse blocks maintain full-body consistency.</div>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="paper-section">
        <div className="paper-container">
          <h2>Gallery of Generation</h2>
          <p>
            복합 프롬프트(part + full body)에 대한 생성 결과 예시. 영상 자리는 Cloudinary/YouTube embed로
            준비되는 대로 교체하면 됩니다.
          </p>
        </div>

        <div className="gallery-grid">
          {/* Gallery item */}
          <div className="gallery-item">
            <div className="prompt">"A person sits down and stretches his legs straight."</div>
            <div className="paper-fig">
              <div className="placeholder">Gallery video placeholder (Cloudinary mp4)</div>
            </div>
          </div>

          <div className="gallery-item">
            <div className="prompt">"A person bends forward and picks up an object in their right hand."</div>
            <div className="paper-fig">
              <div className="placeholder">Gallery video placeholder (Cloudinary mp4)</div>
            </div>
          </div>

          <div className="gallery-item">
            <div className="prompt">"A person kicks with their right leg then jabs several times."</div>
            <div className="paper-fig">
              <div className="placeholder">Gallery video placeholder (Cloudinary mp4)</div>
            </div>
          </div>

          <div className="gallery-item">
            <div className="prompt">"A man walks forward, stumbles to the right, and then regains his balance."</div>
            <div className="paper-fig">
              <div className="placeholder">Gallery video placeholder (Cloudinary mp4)</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISONS ============ */}
      <section className="paper-section">
        <div className="paper-container">
          <h2>Comparisons</h2>
          <p>
            본 방법은 MDM, ParCo, LGTM과 비교. 복합 프롬프트에서 part-specific instruction이
            global context에 묻히지 않고 정확히 반영됨을 보여준다.
          </p>

          {/* 세로로 긴 그림이라 100% 폭이면 화면 높이를 넘긴다 */}
          <div className="paper-fig fig-narrow">
            <Img src="/assets/figures/paper1/p008_img003.webp" alt="Qualitative comparison" />
            <div className="caption">Figure 2. Qualitative comparison with baselines. Red dashed lines indicate missing instructions; red solid lines indicate motion collapse artifacts. MDM, ParCo, LGTM exhibit missing or incorrectly reflected instructions along with body distortion artifacts, whereas the proposed method reflects the given instructions while generating natural body motion.</div>
          </div>

          <div className="paper-fig">
            <Img src="/assets/figures/paper1/p009_img004.webp" alt="Part-wise instruction reflection" />
            <div className="caption">Figure 3. Generation results according to different embedding methods for part-wise instructions. Green lines indicate parts where instructions are well-reflected, and red lines indicate parts where instructions are missing. LGTM fails to reflect the "stretches legs straight" instruction, whereas the proposed method correctly captures both "sits down" and "stretches legs straight".</div>
          </div>
        </div>
      </section>

      {/* ============ QUANTITATIVE RESULTS ============ */}
      <section className="paper-section">
        <div className="paper-container">
          <h2>Quantitative Results</h2>
          <p>
            HumanML3D에서 MDM, ParCo, LGTM과 비교. R-Precision(Top-1/2/3)·MM-Dist 모든 정합성 지표에서
            최고 성능(R@1=0.4708, R@3=0.7852, MM-Dist=3.1581). FID=0.1780로 diffusion 기반 중 최고이며
            VQ 기반 ParCo(0.1427)와 근접. Diversity=9.3350로 real(9.0372) 수준 유지.
          </p>

          <div className="paper-table">
            <table>
              <caption>Table 1. Quantitative comparison with baseline models on HumanML3D dataset. <span style={{ fontWeight: '600' }}>Bold</span> indicates the best performance, and <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>underline</span> indicates the second-best performance.</caption>
              <thead>
                <tr>
                  <th rowSpan={2} className="row-label">Method</th>
                  <th colSpan={3}>R-Precision <sup>↑</sup></th>
                  <th rowSpan={2}>FID <sup>↓</sup></th>
                  <th rowSpan={2}>MM-Dist <sup>↓</sup></th>
                  <th rowSpan={2}>Diversity <sup>↑</sup></th>
                </tr>
                <tr>
                  <th>Top-1</th><th>Top-2</th><th>Top-3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="row-label">Real</td>
                  <td>0.4616</td><td>0.6726</td><td>0.7746</td>
                  <td>—</td><td>3.2408</td><td>9.0372</td>
                </tr>
                <tr><td colSpan={7} className="sep"></td></tr>
                <tr>
                  <td className="row-label">MDM</td>
                  <td>0.4078</td><td>0.6065</td><td>0.7194</td>
                  <td>0.8482</td><td>3.5088</td><td>9.1045</td>
                </tr>
                <tr>
                  <td className="row-label">ParCo</td>
                  <td className="second">0.4514</td><td className="second">0.6552</td><td>0.7635</td>
                  <td className="best">0.1427</td><td className="second">3.2785</td><td className="best">9.4201</td>
                </tr>
                <tr>
                  <td className="row-label">LGTM</td>
                  <td>0.4486</td><td>0.6551</td><td className="second">0.7676</td>
                  <td>0.8015</td><td>3.3048</td><td>8.7743</td>
                </tr>
                <tr className="ours">
                  <td className="row-label">Ours</td>
                  <td className="best">0.4708</td><td className="best">0.6771</td><td className="best">0.7852</td>
                  <td className="second">0.1780</td><td className="best">3.1581</td><td className="second">9.3350</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ GATING ANALYSIS ============ */}
      <section className="paper-section">
        <div className="paper-container">
          <h2>Gating Coefficient Analysis</h2>
          <p>
            학습된 gating 계수 분석: early denoising 단계에서는 로컬 조건이 부위별 구조 윤곽 형성에
            주로 기여, late 단계에서는 글로벌 조건이 부품 간 의미 통합·전신 일관성 정제에 영향 증가.
            고정 비율 conditioning 대비 동적 변조가 유효함을 시사.
          </p>

          <div className="paper-fig">
            <Img src="/assets/figures/paper1/p012_img006.webp" alt="Gating coefficient analysis" />
            <div className="caption">Figure 4. Timestep-wise α_g / α_l 평균 변화. Local conditions contribute primarily to part-wise structural outlines during early denoising, whereas global conditions become increasingly influential in later stages.</div>
          </div>

          <div className="paper-fig">
            <Img src="/assets/figures/paper1/p012_img005.webp" alt="Part-level semantic alignment" />
            <div className="caption">Figure 5. 부품별 의미 정합성(PMMSim) 분석.</div>
          </div>

          <h3 style={{ marginTop: '32px', fontSize: '1.05rem', fontWeight: '600' }}>Gating Strategy Comparison</h3>
          <p>
            local gating 계수 α(t)의 전략 비교: α(t)=0(글로벌만), α(t)=0.5(고정 50%),
            Mirrored(early/late 반전), Learnable(제안). 학습 가능한 gating이 모든 지표에서 최고.
          </p>

          <div className="paper-table">
            <table>
              <caption>Table 2. Performance metrics according to local gating coefficients across timesteps. <span style={{ fontWeight: '600' }}>Bold</span> = best, <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>underline</span> = second-best.</caption>
              <thead>
                <tr>
                  <th rowSpan={2} className="row-label">Method</th>
                  <th colSpan={3}>R-Precision <sup>↑</sup></th>
                  <th rowSpan={2}>FID <sup>↓</sup></th>
                  <th rowSpan={2}>MM-Dist <sup>↓</sup></th>
                  <th rowSpan={2}>Diversity <sup>↑</sup></th>
                </tr>
                <tr>
                  <th>Top-1</th><th>Top-2</th><th>Top-3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="row-label">α(t) = 0</td>
                  <td className="second">0.4575</td><td className="second">0.6631</td><td className="second">0.7718</td>
                  <td className="best">0.1738</td><td className="second">3.2190</td><td className="second">9.3201</td>
                </tr>
                <tr>
                  <td className="row-label">α(t) = 0.5</td>
                  <td>0.4295</td><td>0.6418</td><td>0.7470</td>
                  <td>0.6598</td><td>3.4003</td><td>9.1112</td>
                </tr>
                <tr>
                  <td className="row-label">Mirrored</td>
                  <td>0.3616</td><td>0.5355</td><td>0.6395</td>
                  <td>2.0028</td><td>4.2265</td><td>8.1536</td>
                </tr>
                <tr><td colSpan={7} className="sep"></td></tr>
                <tr className="ours">
                  <td className="row-label">Learnable (Ours)</td>
                  <td className="best">0.4708</td><td className="best">0.6771</td><td className="best">0.7852</td>
                  <td className="second">0.1780</td><td className="best">3.1581</td><td className="best">9.3350</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ ABLATION ============ */}
      <section className="paper-section">
        <div className="paper-container">
          <h2>Ablation Study</h2>
          <p>
            각 구성 요소의 기여도 검증: EGN에서 noisy motion conditioning 제거, EGN 전체 제거,
            part-wise text description 제거, part-wise generation pathway 제거 순으로 비교.
          </p>

          <div className="paper-table">
            <table>
              <caption>Table 3. Ablation study on the HumanML3D dataset. <span style={{ fontWeight: '600' }}>Bold</span> = best, <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>underline</span> = second-best.</caption>
              <thead>
                <tr>
                  <th rowSpan={2} className="row-label">Method</th>
                  <th colSpan={3}>R-Precision <sup>↑</sup></th>
                  <th rowSpan={2}>FID <sup>↓</sup></th>
                  <th rowSpan={2}>MM-Dist <sup>↓</sup></th>
                  <th rowSpan={2}>Diversity <sup>↑</sup></th>
                </tr>
                <tr>
                  <th>Top-1</th><th>Top-2</th><th>Top-3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="row-label">EGN w/o noisy motion</td>
                  <td>0.4655</td><td>0.6700</td><td>0.7800</td>
                  <td className="second">0.1835</td><td>3.1893</td><td className="best">9.4955</td>
                </tr>
                <tr>
                  <td className="row-label">w/o EGN</td>
                  <td>0.4659</td><td>0.6680</td><td>0.7756</td>
                  <td>0.3091</td><td>3.2078</td><td>9.5743</td>
                </tr>
                <tr>
                  <td className="row-label">w/o Part-wise description</td>
                  <td className="best">0.4719</td><td className="second">0.6752</td><td className="second">0.7848</td>
                  <td>0.2066</td><td className="best">3.1412</td><td>9.3100</td>
                </tr>
                <tr>
                  <td className="row-label">w/o Part-wise generation</td>
                  <td>0.4639</td><td>0.6670</td><td>0.7750</td>
                  <td>0.2274</td><td>3.2098</td><td>9.3021</td>
                </tr>
                <tr><td colSpan={7} className="sep"></td></tr>
                <tr className="ours">
                  <td className="row-label">Ours</td>
                  <td className="second">0.4708</td><td className="best">0.6771</td><td className="best">0.7852</td>
                  <td className="best">0.1780</td><td className="second">3.1581</td><td className="second">9.3350</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ BIBTEX ============ */}
      <section className="paper-section">
        <div className="paper-container">
          <h2>BibTeX</h2>
          <BibTeX>{`@article{kim2026glegn,
  title   = {Global-Local Embedding Gating Network for Part-wise Text-to-Motion Generation},
  author  = {Kim, Chanyoung and Kim, Jion and Shin, Byeong-Seok},
  journal = {Computers, Materials & Continua (CMC)},
  year    = {2026}
}`}</BibTeX>
        </div>
      </section>

      {/* ============ FOOTER ============ */}




      {/* three.js (ES module) — 히어로 모션 뷰어용 */}
      <Footer note="Paper project page." />
    </>
  );
}
