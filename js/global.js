/* ═══════════════════════════════════════════
   SOJIB AHMED — GLOBAL JS
   Cursor, Loader, Nav, Scroll, Konami, Back-Top
   ═══════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const dot = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();

/* ── PAGE LOADER ── */
(function initLoader() {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loader-bar');
  const status = document.getElementById('loader-status');
  if (!loader) return;

  const msgs = ['Initializing...', 'Loading assets...', 'Almost ready...', 'Welcome!'];
  let pct = 0;
  let msgIdx = 0;

  const interval = setInterval(() => {
    pct += Math.random() * 15 + 5;
    if (pct >= 100) pct = 100;
    if (bar) bar.style.width = pct + '%';

    const newIdx = Math.min(Math.floor(pct / 28), msgs.length - 1);
    if (status && newIdx !== msgIdx) {
      msgIdx = newIdx;
      status.textContent = msgs[msgIdx];
    }

    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('done');
        document.body.style.overflow = '';
        initReveal();
        initStatCounters();
      }, 300);
    }
  }, 80);

  document.body.style.overflow = 'hidden';
})();

/* ── NAVIGATION ── */
(function initNav() {
  const nav = document.querySelector('nav[role="navigation"]');
  const ham = document.querySelector('.nav-ham');
  const drawer = document.querySelector('.nav-drawer');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-drawer a');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
    updateActiveLink();
    updateBackTop();
    updatePageIndicator();
  }, { passive: true });

  // Hamburger
  ham?.addEventListener('click', () => {
    ham.classList.toggle('open');
    drawer?.classList.toggle('open');
  });

  // Close drawer on link click
  drawer?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham?.classList.remove('open');
      drawer?.classList.remove('open');
    });
  });

  // Active link
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id], div[id].section-anchor');
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 100) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current || a.getAttribute('href') === current + '.html') {
        a.classList.add('active');
      }
    });
  }
})();

/* ── SCROLL REVEAL ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || i * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, +delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ── STAT COUNTERS ── */
function initStatCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const decimal = parseInt(el.dataset.decimal || '0');
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = eased * target;
      el.textContent = prefix + val.toFixed(decimal) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ── BACK TO TOP ── */
function updateBackTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  if (window.scrollY > 400) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
}
document.getElementById('back-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── PAGE INDICATOR ── */
function updatePageIndicator() {
  const dots = document.querySelectorAll('.pi-dot');
  const sections = document.querySelectorAll('section[id]');
  if (!dots.length || !sections.length) return;

  let current = 0;
  sections.forEach((sec, i) => {
    if (sec.getBoundingClientRect().top <= 150) current = i;
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}
document.querySelectorAll('.pi-dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const sections = document.querySelectorAll('section[id]');
    sections[i]?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── KONAMI CODE ── */
(function initKonami() {
  const CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;

  document.addEventListener('keydown', e => {
    if (e.key === CODE[idx]) {
      idx++;
      if (idx === CODE.length) {
        document.getElementById('konami-overlay')?.classList.add('show');
        idx = 0;
      }
    } else {
      idx = 0;
    }
  });

  document.getElementById('konamiClose')?.addEventListener('click', () => {
    document.getElementById('konami-overlay')?.classList.remove('show');
  });
})();

/* ── MAGNETIC BUTTONS ── */
(function initMagneticBtns() {
  document.querySelectorAll('.mag-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ── 3D TILT CARDS ── */
function initTiltCards(selector) {
  document.querySelectorAll(selector || '.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── RUN ON DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initTiltCards();
});

/* ── AI CHAT WIDGET ── */
(function initAIChat() {
  const btn = document.getElementById('ai-chat-btn');
  const bubble = document.getElementById('ai-chat-bubble');
  const closeBtn = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const msgs = document.getElementById('chat-msgs');

  if (!btn || !bubble) return;

  btn.addEventListener('click', () => {
    bubble.classList.toggle('open');
    if (bubble.classList.contains('open')) {
      input?.focus();
      document.getElementById('term-bubble')?.classList.remove('open');
    }
  });
  closeBtn?.addEventListener('click', () => bubble.classList.remove('open'));

  const knowledge = {
    'who is sojib': 'Md Sojib Ahmed is a passionate CSE student at Khwaja Yunus Ali University, interested in web development, Flutter app development, and problem solving! 👨‍💻',
    'skills': 'Sojib is skilled in: C & C++, Java, Dart & Flutter, HTML/CSS/JS, React.js, Tailwind CSS, WordPress, and Git & GitHub! 🚀',
    'contact': 'You can reach Sojib at mdsojibahmed544@gmail.com or connect on LinkedIn and GitHub! 📧',
    'projects': 'Sojib has built projects including a portfolio website, Flutter task manager, React weather dashboard, WordPress e-commerce site, and more! 💻',
    'education': 'Sojib is currently pursuing a BSc in CSE at Khwaja Yunus Ali University. 🎓',
    'internship': 'Yes! Sojib is actively looking for internship opportunities in web development, Flutter development, or software engineering. Feel free to reach out! 💼',
    'flutter': 'Sojib loves Flutter! He builds cross-platform mobile apps with Dart and Flutter, focusing on clean UI and great UX. 📱',
    'hacking': 'Sojib is interested in ethical hacking and cybersecurity as part of his areas of interest! 🔐',
    'github': 'Check out Sojib\'s GitHub at https://github.com/sojibahmed404/ 🐙',
    'linkedin': 'Connect with Sojib on LinkedIn: https://www.linkedin.com/in/md-sojib-ahmed-a58ab03a2/ 🔗',
    'hello': 'Hello! 👋 I\'m Sojib\'s AI assistant. I can tell you about his skills, projects, education, or contact info!',
    'hi': 'Hi there! 👋 Ask me anything about Sojib Ahmed!'
  };

  function addMsg(text, type) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.textContent = text;
    msgs?.appendChild(msg);
    msgs?.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' });
    return msg;
  }

  function addTyping() {
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot';
    msg.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    msgs?.appendChild(msg);
    msgs?.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' });
    return msg;
  }

  function getResponse(q) {
    const lower = q.toLowerCase();
    for (const [key, val] of Object.entries(knowledge)) {
      if (lower.includes(key)) return val;
    }
    return "I'm not sure about that, but you can email Sojib at mdsojibahmed544@gmail.com for more details! 📧";
  }

  async function handleSend(q) {
    if (!q.trim()) return;
    addMsg(q, 'user');
    if (input) input.value = '';

    const typing = addTyping();
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    typing.remove();
    addMsg(getResponse(q), 'bot');
  }

  sendBtn?.addEventListener('click', () => handleSend(input?.value || ''));
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSend(input.value);
  });

  // Quick buttons
  window.quickAsk = (q) => handleSend(q);
})();
