/* =========================================================
   motion-viewer.js  —  "오르골(music box)" SMPL 모션 뷰어
   ---------------------------------------------------------
   · manifest.json 의 모션 목록을 좌우 버튼/키보드/도트로 전환
   · 받침대 위 캐릭터가 자동으로 천천히 yaw 회전 (오르골)
   · 드래그하면 수동 yaw + 관성, 손 떼고 유휴 시간이 지나면 자동 회전 복귀
   · 모션 소스 우선순위:  SMPL .glb (스키닝 메시)  →  없으면 22-joint .json (캡슐 리그)

   사용 (Next):
     three 는 npm 패키지로 번들된다. MotionViewer 클라이언트 컴포넌트가
     <div class="mviewer" data-manifest="/assets/motion/manifest.json"> 를 렌더한 뒤
     이 모듈을 동적 import 하면, 모듈 하단의 boot() 가 해당 요소를 찾아 초기화한다.
   ========================================================= */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const THEME = {
  light: {
    bg: 0xf4f5f7, fog: 0xf4f5f7,
    body: 0xa9bcd4, bodyEdge: 0x778da9,
    pedestal: 0x1b263b, pedestalTop: 0x415a77,
    ground: 0xe0e1dd, hemiSky: 0xffffff, hemiGround: 0xc9ced6,
    shadow: 0.22,
  },
  dark: {
    bg: 0x14161a, fog: 0x14161a,
    body: 0x8fa6c4, bodyEdge: 0x5c7a9e,
    pedestal: 0x0b0f16, pedestalTop: 0x27364c,
    ground: 0x1b263b, hemiSky: 0x9fb4d0, hemiGround: 0x0d1b2a,
    shadow: 0.38,
  },
};

/* ---------------------------------------------------------- 캡슐 리그 */

// 뼈대별 반지름 (자식 조인트 인덱스 기준). 없으면 기본값.
const BONE_R = {
  1: 0.075, 2: 0.075,               // hips
  3: 0.095, 6: 0.100, 9: 0.095,     // spine
  4: 0.062, 5: 0.062,               // thigh -> knee
  7: 0.050, 8: 0.050,               // shin -> ankle
  10: 0.040, 11: 0.040,             // foot
  12: 0.052, 15: 0.055,             // neck, head
  13: 0.055, 14: 0.055,             // collar
  16: 0.048, 17: 0.048,             // shoulder
  18: 0.042, 19: 0.042,             // upper arm
  20: 0.034, 21: 0.034,             // forearm
};
const JOINT_R = { 0: 0.085, 15: 0.105, 12: 0.055 };

class CapsuleRig {
  /** data: { frames, joints, parents, positions:Float32Array } */
  constructor(data, material) {
    this.data = data;
    this.root = new THREE.Group();
    this.bones = [];
    this.balls = [];

    const { joints, parents } = data;
    const p0 = this.frame(0);

    for (let j = 0; j < joints; j++) {
      const r = JOINT_R[j] ?? (BONE_R[j] ?? 0.045) * 0.92;
      const ball = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), material);
      ball.castShadow = true;
      this.root.add(ball);
      this.balls.push(ball);

      const par = parents[j];
      if (par < 0) continue;
      // 뼈 길이는 시퀀스 내내 거의 일정 → 평균 길이로 캡슐을 한 번만 만든다
      const len = this.meanBoneLength(j, par);
      if (len < 1e-3) { this.bones.push(null); continue; }
      const rad = BONE_R[j] ?? 0.045;
      const geo = new THREE.CapsuleGeometry(rad, Math.max(len - rad * 1.2, 0.01), 6, 14);
      const m = new THREE.Mesh(geo, material);
      m.castShadow = true;
      m.userData.child = j;
      m.userData.parent = par;
      this.root.add(m);
      this.bones.push(m);
    }
    this.apply(p0);
  }

  meanBoneLength(j, par) {
    const { frames, joints, positions } = this.data;
    let s = 0;
    for (let t = 0; t < frames; t++) {
      const o = t * joints * 3;
      const dx = positions[o + j * 3] - positions[o + par * 3];
      const dy = positions[o + j * 3 + 1] - positions[o + par * 3 + 1];
      const dz = positions[o + j * 3 + 2] - positions[o + par * 3 + 2];
      s += Math.hypot(dx, dy, dz);
    }
    return s / frames;
  }

  /** 선형 보간된 프레임 포즈를 Float32Array(joints*3) 로 반환 */
  frame(time) {
    const { frames, joints, positions } = this.data;
    const f = ((time % frames) + frames) % frames;
    const i0 = Math.floor(f), i1 = (i0 + 1) % frames, a = f - i0;
    const out = new Float32Array(joints * 3);
    const o0 = i0 * joints * 3, o1 = i1 * joints * 3;
    for (let k = 0; k < joints * 3; k++) out[k] = positions[o0 + k] * (1 - a) + positions[o1 + k] * a;
    return out;
  }

  apply(p) {
    const up = new THREE.Vector3(0, 1, 0);
    const a = new THREE.Vector3(), b = new THREE.Vector3(), d = new THREE.Vector3();
    for (let j = 0; j < this.balls.length; j++) {
      this.balls[j].position.set(p[j * 3], p[j * 3 + 1], p[j * 3 + 2]);
    }
    for (const m of this.bones) {
      if (!m) continue;
      const j = m.userData.child, par = m.userData.parent;
      a.set(p[par * 3], p[par * 3 + 1], p[par * 3 + 2]);
      b.set(p[j * 3], p[j * 3 + 1], p[j * 3 + 2]);
      m.position.copy(a).add(b).multiplyScalar(0.5);
      d.copy(b).sub(a);
      const len = d.length();
      if (len < 1e-6) continue;
      m.quaternion.setFromUnitVectors(up, d.divideScalar(len));
    }
  }

  update(timeSec, fps) {
    const p = this.frame(timeSec * fps);
    this.rootXZ = [p[0], p[2]];
    this.apply(p);
  }

  get duration() { return this.data.frames / this.data.fps; }

  dispose() {
    this.root.traverse(o => { if (o.geometry) o.geometry.dispose(); });
  }
}

/* ---------------------------------------------------------- 뷰어 */

class MusicBoxViewer {
  constructor(root) {
    this.root = root;
    this.index = 0;
    this.motions = [];
    this.current = null;          // { object3D, mixer|rig, duration, fps }
    this.clock = new THREE.Clock();
    this.stopped = false;         // destroy() 후 루프를 멈추기 위한 플래그

    // 회전 상태
    this.yaw = 0;
    this.yawVel = 0;
    this.dragging = false;
    this.idle = 0;
    this.autoSpin = !REDUCED && root.dataset.autospin !== 'false';
    this.follow = root.dataset.follow !== 'false';    // 루트 수평이동 상쇄(트레드밀)
    this.spinSpeed = parseFloat(root.dataset.spinSpeed || '0.32');   // rad/s
    this.playing = true;
    this.time = 0;
    this.visible = true;

    this.base = (root.dataset.manifest || '').replace(/[^/]*$/, '');
    this.buildDOM();
    this.buildScene();
    this.bindEvents();
    this.load(root.dataset.manifest);
  }

  /* ---------- DOM ---------- */
  buildDOM() {
    this.root.classList.add('mviewer');
    this.root.innerHTML = `
      <div class="mv-stage">
        <canvas class="mv-canvas"></canvas>
        <div class="mv-loading" role="status">모션 불러오는 중…</div>
        <button class="mv-arrow mv-prev" type="button" aria-label="이전 모션">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z"/></svg>
        </button>
        <button class="mv-arrow mv-next" type="button" aria-label="다음 모션">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4L13.2 12z"/></svg>
        </button>
        <div class="mv-badge"><span class="mv-src">—</span></div>
      </div>
      <div class="mv-progress" role="slider" aria-label="재생 위치" tabindex="0"
           aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div>
      <div class="mv-caption">
        <p class="mv-prompt">&nbsp;</p>
        <div class="mv-controls">
          <button class="mv-btn mv-play" type="button" aria-label="일시정지">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
          </button>
          <button class="mv-btn mv-spin" type="button" aria-label="자동 회전 끄기">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 5V2L8 6l4 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg>
          </button>
          <div class="mv-dots" role="tablist" aria-label="모션 선택"></div>
        </div>
      </div>`;

    this.el = {
      stage: this.root.querySelector('.mv-stage'),
      canvas: this.root.querySelector('.mv-canvas'),
      loading: this.root.querySelector('.mv-loading'),
      prev: this.root.querySelector('.mv-prev'),
      next: this.root.querySelector('.mv-next'),
      dots: this.root.querySelector('.mv-dots'),
      prompt: this.root.querySelector('.mv-prompt'),
      play: this.root.querySelector('.mv-play'),
      spin: this.root.querySelector('.mv-spin'),
      bar: this.root.querySelector('.mv-progress'),
      barFill: this.root.querySelector('.mv-progress i'),
      src: this.root.querySelector('.mv-src'),
    };
    this.el.spin.classList.toggle('is-off', !this.autoSpin);
  }

  /* ---------- three.js ---------- */
  buildScene() {
    const c = this.el.canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
    this.camera.position.set(0, 1.45, 4.3);
    this.camera.lookAt(0, 0.95, 0);

    // 턴테이블: 캐릭터 + 받침대가 함께 돈다
    this.turntable = new THREE.Group();
    this.scene.add(this.turntable);

    this.key = new THREE.DirectionalLight(0xffffff, 2.1);
    this.key.position.set(2.6, 5.2, 3.4);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(1024, 1024);
    const s = this.key.shadow.camera;
    s.left = -1.8; s.right = 1.8; s.top = 2.6; s.bottom = -0.4; s.near = 0.5; s.far = 14;
    this.key.shadow.bias = -0.0009;
    this.key.shadow.normalBias = 0.02;
    this.scene.add(this.key, this.key.target);

    this.fill = new THREE.DirectionalLight(0xffffff, 0.5);
    this.fill.position.set(-3.2, 2.0, -2.4);
    this.scene.add(this.fill);

    this.hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.0);
    this.scene.add(this.hemi);

    this.bodyMat = new THREE.MeshStandardMaterial({
      color: 0xa9bcd4, roughness: 0.58, metalness: 0.0,
      transparent: true, opacity: 1,
    });

    // 받침대 (오르골 베이스)
    this.pedestal = new THREE.Group();
    const topMat = new THREE.MeshStandardMaterial({ color: 0x415a77, roughness: 0.45, metalness: 0.15 });
    const sideMat = new THREE.MeshStandardMaterial({ color: 0x1b263b, roughness: 0.6, metalness: 0.1 });
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.02, 0.035, 72), topMat);
    disc.position.y = -0.018; disc.receiveShadow = true;
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.14, 0.10, 72), sideMat);
    skirt.position.y = -0.085; skirt.receiveShadow = true;
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.012, 8, 96), topMat);
    rim.rotation.x = Math.PI / 2; rim.position.y = -0.001;
    this.pedestal.add(disc, skirt, rim);
    this.turntable.add(this.pedestal);

    // 정지된 바닥 (그림자 수신용, 회전하지 않음)
    this.ground = new THREE.Mesh(
      new THREE.CircleGeometry(6, 64),
      new THREE.ShadowMaterial({ opacity: 0.22 })
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.y = -0.135;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    this.applyTheme();
    this.resize();
  }

  applyTheme() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const t = dark ? THEME.dark : THEME.light;
    this.scene.background = new THREE.Color(t.bg);
    this.scene.fog = new THREE.Fog(t.fog, 6, 16);
    this.bodyMat.color.setHex(t.body);
    this.pedestal.children[0].material.color.setHex(t.pedestalTop);
    this.pedestal.children[1].material.color.setHex(t.pedestal);
    this.ground.material.opacity = t.shadow;
    this.hemi.color.setHex(t.hemiSky);
    this.hemi.groundColor.setHex(t.hemiGround);
    this.hemi.intensity = dark ? 0.75 : 1.0;
  }

  /* ---------- 이벤트 ---------- */
  bindEvents() {
    const c = this.el.canvas;
    let lastX = 0, id = null;

    c.addEventListener('pointerdown', e => {
      id = e.pointerId; lastX = e.clientX;
      this.dragging = true; this.yawVel = 0;
      c.setPointerCapture(id);
      this.root.classList.add('is-dragging');
    });
    c.addEventListener('pointermove', e => {
      if (!this.dragging || e.pointerId !== id) return;
      const dx = e.clientX - lastX; lastX = e.clientX;
      const d = dx * 0.0075;
      this.yaw += d;
      this.yawVel = d / Math.max(1 / 60, this.lastDt || 1 / 60);
      this.idle = 0;
    });
    const end = e => {
      if (!this.dragging || (id !== null && e.pointerId !== id)) return;
      this.dragging = false; id = null;
      this.root.classList.remove('is-dragging');
    };
    c.addEventListener('pointerup', end);
    c.addEventListener('pointercancel', end);
    c.addEventListener('lostpointercapture', end);

    this.el.prev.addEventListener('click', () => this.go(-1));
    this.el.next.addEventListener('click', () => this.go(1));
    this.el.play.addEventListener('click', () => this.setPlaying(!this.playing));
    this.el.spin.addEventListener('click', () => {
      this.autoSpin = !this.autoSpin;
      this.el.spin.classList.toggle('is-off', !this.autoSpin);
      this.el.spin.setAttribute('aria-label', this.autoSpin ? '자동 회전 끄기' : '자동 회전 켜기');
    });

    this.root.setAttribute('tabindex', '0');
    this.root.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { this.go(-1); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { this.go(1); e.preventDefault(); }
      else if (e.key === ' ') { this.setPlaying(!this.playing); e.preventDefault(); }
    });

    const seek = e => {
      const r = this.el.bar.getBoundingClientRect();
      const a = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      this.seek(a);
    };
    this.el.bar.addEventListener('pointerdown', e => {
      seek(e); this.el.bar.setPointerCapture(e.pointerId); this.el.bar.dataset.seeking = '1';
    });
    this.el.bar.addEventListener('pointermove', e => { if (this.el.bar.dataset.seeking) seek(e); });
    this.el.bar.addEventListener('pointerup', e => { delete this.el.bar.dataset.seeking; });

    new ResizeObserver(() => this.resize()).observe(this.el.stage);

    new IntersectionObserver(([en]) => { this.visible = en.isIntersecting; },
      { threshold: 0.05 }).observe(this.root);

    new MutationObserver(() => this.applyTheme())
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  resize() {
    const w = this.el.stage.clientWidth || 640;
    const h = this.el.stage.clientHeight || Math.round(w * 0.62);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    // 좁은 화면에서 인물이 잘리지 않도록 거리 보정
    this.camera.position.z = 4.3 * Math.min(1.8, Math.max(1, 1.15 / this.camera.aspect));
    this.camera.updateProjectionMatrix();
  }

  /* ---------- 로딩 ---------- */
  async load(manifestUrl) {
    try {
      const res = await fetch(manifestUrl);
      if (!res.ok) throw new Error(`manifest ${res.status}`);
      const man = await res.json();
      this.motions = man.motions || [];
      if (!this.motions.length) throw new Error('empty manifest');
    } catch (err) {
      this.fail(`모션 목록을 불러오지 못했습니다 (${err.message})`);
      return;
    }
    this.renderDots();
    this.gltf = new GLTFLoader();
    await this.show(0);
    this.loop();
  }

  renderDots() {
    this.el.dots.innerHTML = this.motions.map((m, i) =>
      `<button class="mv-dot" type="button" role="tab" data-i="${i}"
               aria-label="${i + 1}번 모션" title="${(m.title || '').replace(/"/g, '&quot;')}"></button>`
    ).join('');
    this.el.dots.querySelectorAll('.mv-dot').forEach(b =>
      b.addEventListener('click', () => this.show(+b.dataset.i)));
  }

  fail(msg) {
    this.el.loading.textContent = msg;
    this.el.loading.classList.add('is-error');
  }

  go(step) { this.show((this.index + step + this.motions.length) % this.motions.length); }

  async show(i) {
    if (this.busy) return;
    this.busy = true;
    this.index = i;
    const m = this.motions[i];

    this.el.dots.querySelectorAll('.mv-dot').forEach((b, k) =>
      b.classList.toggle('is-on', k === i));
    this.el.prompt.textContent = m.prompt || m.title || m.id;
    this.el.loading.hidden = false;
    this.el.loading.textContent = '모션 불러오는 중…';
    this.el.loading.classList.remove('is-error');
    this.root.classList.add('is-loading');

    let next = null;
    try {
      if (m.glb) next = await this.tryGLB(this.base + m.glb);
      if (!next && m.joints) next = await this.tryJoints(this.base + m.joints);
    } catch (err) {
      console.warn('[motion-viewer]', err);
    }
    if (!next) {
      this.fail('이 모션의 데이터를 찾지 못했습니다.');
      this.busy = false;
      return;
    }

    if (this.current) {
      this.turntable.remove(this.current.object3D);
      this.current.dispose?.();
    }
    this.current = next;
    this.turntable.add(next.object3D);
    this.time = 0;
    this.el.src.textContent = next.kind === 'glb' ? 'SMPL mesh' : 'skeleton';
    this.el.loading.hidden = true;
    this.root.classList.remove('is-loading');
    this.busy = false;
  }

  async tryGLB(url) {
    let buf;
    try {
      const res = await fetch(url);
      if (!res.ok) return null;                      // 아직 안 구운 경우 → 조용히 폴백
      buf = await res.arrayBuffer();
    } catch { return null; }

    const gltf = await new Promise((ok, no) => this.gltf.parse(buf, '', ok, no));
    const obj = gltf.scene;
    obj.traverse(o => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = false;
      o.frustumCulled = false;                       // 스키닝 바운딩박스 이슈 회피
      o.material = this.bodyMat;
    });
    const mixer = new THREE.AnimationMixer(obj);
    const clip = gltf.animations[0];
    const action = mixer.clipAction(clip);
    action.play();
    const arm = obj.getObjectByName('Armature') || obj.children[0];
    return {
      kind: 'glb', object3D: obj, duration: clip.duration,
      setTime: t => { mixer.setTime(t); },
      getRootXZ: () => (arm ? [arm.position.x, arm.position.z] : [0, 0]),
      dispose: () => { mixer.stopAllAction(); obj.traverse(o => o.geometry?.dispose()); },
    };
  }

  async tryJoints(url) {
    const res = await fetch(url);
    if (!res.ok) return null;
    const j = await res.json();
    const data = {
      frames: j.frames, joints: j.joints, fps: j.fps || 20,
      parents: j.parents, positions: Float32Array.from(j.positions),
    };
    const rig = new CapsuleRig(data, this.bodyMat);
    rig.update(0, data.fps);
    return {
      kind: 'joints', object3D: rig.root, duration: data.frames / data.fps,
      setTime: t => rig.update(t, data.fps),
      getRootXZ: () => rig.rootXZ,
      dispose: () => rig.dispose(),
    };
  }

  /* ---------- 재생 ---------- */
  setPlaying(v) {
    this.playing = v;
    this.el.play.classList.toggle('is-paused', !v);
    this.el.play.setAttribute('aria-label', v ? '일시정지' : '재생');
    this.el.play.innerHTML = v
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
  }

  seek(a) {
    if (!this.current) return;
    this.time = a * this.current.duration;
    this.current.setTime(this.time);
    this.updateBar();
  }

  updateBar() {
    if (!this.current) return;
    const a = this.current.duration ? (this.time % this.current.duration) / this.current.duration : 0;
    this.el.barFill.style.transform = `scaleX(${a})`;
    this.el.bar.setAttribute('aria-valuenow', Math.round(a * 100));
  }

  loop() {
    if (this.stopped) return;
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.lastDt = dt;
    requestAnimationFrame(() => this.loop());
    if (!this.visible) return;

    // ---- yaw: 드래그 → 관성 → 유휴 후 자동 회전 복귀
    if (!this.dragging) {
      if (Math.abs(this.yawVel) > 1e-4) {
        this.yaw += this.yawVel * dt;
        this.yawVel *= Math.pow(0.06, dt);        // 지수 감쇠
        this.idle = 0;
      } else {
        this.yawVel = 0;
        this.idle += dt;
      }
      if (this.autoSpin) {
        const ramp = Math.min(1, Math.max(0, (this.idle - 1.6) / 1.4));  // 부드러운 복귀
        this.yaw += this.spinSpeed * ramp * dt;
      }
    }
    this.turntable.rotation.y = this.yaw;

    // ---- 모션 재생
    if (this.current) {
      if (this.playing) {
        this.time = (this.time + dt) % this.current.duration;
        this.current.setTime(this.time);
      }
      // 트레드밀 보정: 루트 수평 이동을 상쇄해 회전축 위에 고정한다.
      // (Y 는 그대로 두어 점프/웅크림은 살린다. 발은 받침대 기준으로 미끄러지므로
      //  런닝머신 위를 걷는 것처럼 보이고, 궤적이 커도 프레임을 벗어나지 않는다.)
      if (this.follow && this.current.getRootXZ) {
        const [x, z] = this.current.getRootXZ();
        this.current.object3D.position.set(-x, 0, -z);
      }
      this.updateBar();
    }

    this.key.target.position.set(0, 0.9, 0);
    this.key.target.updateMatrixWorld();
    this.renderer.render(this.scene, this.camera);
  }
}

/* ---------------------------------------------------------- 부트스트랩 */

/** 렌더 루프를 멈추고 GL 컨텍스트를 반납한다.
 *  SPA 라우팅에서 컴포넌트가 언마운트될 때 호출한다. */
MusicBoxViewer.prototype.destroy = function () {
  this.stopped = true;
  try { this.current?.dispose?.(); } catch (e) {}
  try { this.renderer?.dispose(); } catch (e) {}
  try { this.renderer?.forceContextLoss?.(); } catch (e) {}
  this.renderer = null;
  delete this.root.dataset.mvReady;
  this.root.innerHTML = '';
};

/** data-manifest 를 가진 요소를 찾아 뷰어를 붙이고, 만들어진 인스턴스를 돌려준다.
 *  이미 붙은 요소는 data-mv-ready 로 걸러 중복 초기화를 막는다. */
function boot() {
  const made = [];
  document.querySelectorAll('[data-manifest]').forEach(el => {
    if (el.dataset.mvReady) return;
    el.dataset.mvReady = '1';
    try { made.push(new MusicBoxViewer(el)); }
    catch (err) {
      console.error('[motion-viewer] init failed', err);
      el.innerHTML = '<div class="mv-fallback">WebGL 뷰어를 초기화하지 못했습니다.</div>';
    }
  });
  return made;
}

export { MusicBoxViewer, boot };
