/* ═══════════════════════════════════════════
   SOJIB AHMED — CANVAS PARTICLES BG
   Floating particle network effect
   ═══════════════════════════════════════════ */

(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const MAX = 60;
  const CONNECT_DIST = 120;
  const MOUSE = { x: null, y: null };

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
      // Color variants: cyan, violet, amber
      const colors = ['56,189,248', '129,140,248', '245,158,11', '52,211,153'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      // Mouse repulsion
      if (MOUSE.x !== null) {
        const dx = this.x - MOUSE.x;
        const dy = this.y - MOUSE.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < 80) {
          const force = (80-dist)/80;
          this.vx += dx/dist * force * 0.8;
          this.vy += dy/dist * force * 0.8;
        }
      }
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: MAX }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist/CONNECT_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    MOUSE.x = e.clientX - r.left;
    MOUSE.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => {
    MOUSE.x = null;
    MOUSE.y = null;
  });

  init();
  draw();
})();
