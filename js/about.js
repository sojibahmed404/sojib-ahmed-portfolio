/* ═══════════════════════════════════════════
   SOJIB AHMED — ABOUT PAGE JS
   Skill Bars, Interest Cards, Scramble
   ═══════════════════════════════════════════ */

/* ── SKILL BARS ANIMATION ── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill[data-w]');
  if (!fills.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        setTimeout(() => {
          fill.style.width = fill.dataset.w;
        }, 100);
        io.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });

  fills.forEach(f => io.observe(f));
})();

/* ── EDUCATION TIMELINE REVEAL ── */
(function initEduTimeline() {
  const items = document.querySelectorAll('.edu-item');
  if (!items.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }, i * 150);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(0.34,1.2,0.64,1)';
    io.observe(item);
  });
})();

/* ── INTEREST CARDS HOVER SOUND EFFECT (visual) ── */
(function initInterestCards() {
  document.querySelectorAll('.interest-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.interest-icon');
      if (icon) {
        icon.style.transform = 'scale(1.15) rotate(5deg)';
        setTimeout(() => { icon.style.transform = ''; }, 200);
      }
    });
  });
})();

/* ── PROFILE CARD TILT ── */
(function initProfileTilt() {
  const card = document.querySelector('.profile-card');
  if (!card) return;

  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    card.style.transition = 'box-shadow .3s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all .3s cubic-bezier(0.34,1.56,0.64,1)';
  });
})();

/* ── GLITCH EFFECT ON NAME ── */
(function initGlitch() {
  const nameEl = document.querySelector('.profile-name-glitch');
  if (!nameEl) return;

  setInterval(() => {
    nameEl.style.textShadow = `
      ${(Math.random()-0.5)*4}px 0 var(--cyan),
      ${(Math.random()-0.5)*4}px 0 var(--rose)
    `;
    setTimeout(() => { nameEl.style.textShadow = ''; }, 80);
  }, 3000);
})();
