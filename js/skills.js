/* ═══════════════════════════════════════════
   SOJIB AHMED — SKILLS PAGE JS
   Proficiency Rings, Marquee, Card Tilt
   ═══════════════════════════════════════════ */

/* ── PROFICIENCY RINGS ANIMATION ── */
(function initRings() {
  const rings = document.querySelectorAll('.ring-fill[data-pct]');
  if (!rings.length) return;

  const circumference = 2 * Math.PI * 35; // r=35 => ~220

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const pct = parseFloat(ring.dataset.pct) / 100;
        const offset = circumference * (1 - pct);

        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = circumference;

        // Force reflow
        ring.getBoundingClientRect();

        ring.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)';
        ring.style.strokeDashoffset = offset;

        // Update center text
        const container = ring.closest('.ring-container');
        const pctEl = container?.querySelector('.ring-pct');
        if (pctEl) {
          let current = 0;
          const target = parseFloat(ring.dataset.pct);
          const duration = 1800;
          const start = performance.now();
          function updatePct(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            pctEl.textContent = Math.round(eased * target) + '%';
            if (progress < 1) requestAnimationFrame(updatePct);
          }
          requestAnimationFrame(updatePct);
        }

        io.unobserve(ring);
      }
    });
  }, { threshold: 0.3 });

  rings.forEach(ring => io.observe(ring));
})();

/* ── SKILL CATEGORY CARD TILT ── */
(function initSkCardTilt() {
  document.querySelectorAll('.sk-cat-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-6px) perspective(500px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── MARQUEE DUPLICATE (for infinite scroll) ── */
(function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  // Clone items for seamless loop
  const items = track.innerHTML;
  track.innerHTML = items + items;
})();

/* ── STAGGER SKILL CARDS ON LOAD ── */
(function staggerSkCards() {
  const cards = document.querySelectorAll('.sk-cat-card');
  if (!cards.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }, idx * 80);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(20px)';
    c.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(0.34,1.2,0.64,1)';
    io.observe(c);
  });
})();

/* ── TAG HOVER RIPPLE ── */
document.querySelectorAll('.stag').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.08)';
    setTimeout(() => { this.style.transform = ''; }, 150);
  });
});
