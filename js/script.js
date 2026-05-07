/* ══════════════════════════════════════════
   STRATUM — script.js
   Cursor · Nav · Hero Canvas · Countups ·
   Tabs · Reveal · Specs · Testimonials ·
   CTA Canvas · Mobile Menu
══════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   1. CUSTOM CURSOR
   ───────────────────────────────────────── */
(function () {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let rx = 0, ry = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Ring follows with slight lag
  (function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(.5)');
  document.addEventListener('mouseup',   () => dot.style.transform = 'translate(-50%,-50%) scale(1)');
})();

/* ─────────────────────────────────────────
   2. STICKY NAV
   ───────────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 60);
  }, { passive: true });
})();

/* ─────────────────────────────────────────
   3. MOBILE MENU
   ───────────────────────────────────────── */
(function () {
  const burger  = document.getElementById('burger');
  const mobMenu = document.getElementById('mobMenu');
  const links   = mobMenu.querySelectorAll('.mob-link');

  burger.addEventListener('click', () => {
    const open = mobMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.forEach(l => l.addEventListener('click', () => {
    mobMenu.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }));
})();

/* ─────────────────────────────────────────
   4. HERO PARTICLE CANVAS
   ───────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  const ctx    = canvas.getContext('2d');
  let   W, H, particles = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x     = Math.random() * W;
      this.y     = initial ? Math.random() * H : H + 10;
      this.vx    = (Math.random() - .5) * .35;
      this.vy    = -(Math.random() * .55 + .2);
      this.r     = Math.random() * 1.6 + .4;
      this.alpha = Math.random() * .55 + .1;
      this.hue   = Math.random() < .3 ? 30 : 0; // orange-ish or white
    }
    update() {
      // Gentle mouse repulsion
      const dx   = this.x - mouse.x;
      const dy   = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * .8;
        this.vx += dx / dist * force * .06;
        this.vy += dy / dist * force * .06;
      }
      this.x     += this.vx;
      this.y     += this.vy;
      this.alpha -= .0004;
      if (this.y < -10 || this.alpha <= 0) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      if (this.hue === 30) {
        ctx.fillStyle = `rgba(255,120,30,${this.alpha})`;
      } else {
        ctx.fillStyle = `rgba(200,210,230,${this.alpha * .6})`;
      }
      ctx.fill();
    }
  }

  // Spawn 180 particles
  for (let i = 0; i < 180; i++) particles.push(new Particle());

  // Grid lines (layer-by-layer effect)
  function drawGrid() {
    const step = 60;
    ctx.strokeStyle = 'rgba(255,107,0,0.04)';
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    for (let x = 0; x < W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
  }

  // Radial gradient centre glow
  function drawGlow() {
    const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * .45);
    g.addColorStop(0, 'rgba(255,107,0,0.055)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawGlow();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ─────────────────────────────────────────
   5. SCROLL REVEAL
   ───────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const d = parseInt(e.target.dataset.d) || 0;
      setTimeout(() => e.target.classList.add('vis'), d);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────────
   6. COUNT-UP NUMBERS
   ───────────────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('.countup');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const el     = e.target;
      const target = parseFloat(el.dataset.target);
      const dur    = 1600;
      const start  = performance.now();

      function step(now) {
        const t   = Math.min((now - start) / dur, 1);
        const val = target * (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
        el.textContent = Number.isInteger(target) ? Math.round(val) : val.toFixed(1);
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.3 });

  counters.forEach(c => obs.observe(c));
})();

/* ─────────────────────────────────────────
   7. MATERIAL TABS
   ───────────────────────────────────────── */
(function () {
  const tabs   = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.mat-panel');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('tab-' + id);
      if (target) target.classList.add('active');
    });
  });
})();

/* ─────────────────────────────────────────
   8. SPEC BAR ANIMATION
   ───────────────────────────────────────── */
(function () {
  const cards = document.querySelectorAll('.spec-card');
  const obs   = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  cards.forEach(c => obs.observe(c));
})();

/* ─────────────────────────────────────────
   9. TESTIMONIAL SLIDER
   ───────────────────────────────────────── */
(function () {
  const track = document.getElementById('testiTrack');
  const navEl = document.getElementById('testiNav');
  if (!track || !navEl) return;

  const cards = track.querySelectorAll('.testi-card');
  let   current = 0;
  const total   = cards.length;
  const perPage = () => window.innerWidth < 768 ? 1 : 3;

  function buildDots() {
    navEl.innerHTML = '';
    const n = Math.ceil(total / perPage());
    for (let i = 0; i < n; i++) {
      const b = document.createElement('button');
      b.className = 't-dot' + (i === current ? ' on' : '');
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      b.addEventListener('click', () => goTo(i));
      navEl.appendChild(b);
    }
  }

  function goTo(idx) {
    const pp  = perPage();
    const max = Math.ceil(total / pp) - 1;
    current   = Math.max(0, Math.min(idx, max));
    track.style.transform = `translateX(calc(-${current * (100 / pp)}% - ${current * 1.4}rem))`;
    navEl.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('on', i === current));
  }

  buildDots();
  window.addEventListener('resize', () => { buildDots(); goTo(current); }, { passive: true });

  // Auto-advance
  let timer = setInterval(() => {
    const max = Math.ceil(total / perPage()) - 1;
    goTo(current >= max ? 0 : current + 1);
  }, 5000);

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => {
    timer = setInterval(() => {
      const max = Math.ceil(total / perPage()) - 1;
      goTo(current >= max ? 0 : current + 1);
    }, 5000);
  });

  // Touch / swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < 40) return;
    const max = Math.ceil(total / perPage()) - 1;
    if (dx < 0) goTo(Math.min(current + 1, max));
    else         goTo(Math.max(current - 1, 0));
  });
})();

/* ─────────────────────────────────────────
   10. CTA CANVAS (orbiting rings)
   ───────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('ctaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.008;
    const cx = W / 2, cy = H / 2;

    // Background radial glow
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * .5);
    bg.addColorStop(0, 'rgba(255,107,0,0.07)');
    bg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Elliptical orbiting rings
    const rings = [
      { rx: W * .38, ry: H * .28, tilt: 20,  speed: 1,   color: 'rgba(255,107,0,', alpha: .18, dash: [8,12] },
      { rx: W * .26, ry: H * .20, tilt: -15, speed: 1.5, color: 'rgba(0,194,255,', alpha: .12, dash: [4,16] },
      { rx: W * .50, ry: H * .36, tilt: 35,  speed: .7,  color: 'rgba(255,107,0,', alpha: .08, dash: [2,20] },
    ];

    rings.forEach((ring, ri) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((ring.tilt * Math.PI) / 180);
      ctx.setLineDash(ring.dash);
      ctx.strokeStyle = ring.color + ring.alpha + ')';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Orbiting dot
      const angle = t * ring.speed + ri * 2.1;
      const dx = Math.cos(angle) * ring.rx;
      const dy = Math.sin(angle) * ring.ry;
      ctx.beginPath();
      ctx.arc(dx, dy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = ring.color + (ring.alpha * 4) + ')';
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─────────────────────────────────────────
   11. SMOOTH ANCHOR SCROLL
   ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─────────────────────────────────────────
   12. PAGE LOAD ENTRANCE
   ───────────────────────────────────────── */
(function () {
  const heroReveals = document.querySelectorAll('.hero-inner .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('vis'), 200 + i * 130);
  });
})();
