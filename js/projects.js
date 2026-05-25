/* ═══════════════════════════════════════════
   SOJIB AHMED — PROJECTS PAGE JS
   Filter, Modal, Card Tilt
   ═══════════════════════════════════════════ */

/* ── PROJECT DATA ── */
const projects = [
  {
    id: 7,
    emoji: '🩸',
    type: 'Full-Stack Web App',
    category: 'web',
    title: 'Emergency Blood Finder System',
    desc: 'A highly secure, full-stack blood finder platform built with Java, Spring Boot, React, and MySQL featuring REST APIs.',
    longDesc: 'Developed an enterprise-grade Emergency Blood Finder System. Features a robust Java and Spring Boot backend offering high-performance REST APIs secured by JWT authentication. The responsive frontend is built with React, Vite, and Tailwind CSS, integrating with a MySQL database to securely manage donor accounts, location-based searches, and donor-seeker match requests.',
    stack: ['Java', 'Spring Boot', 'React', 'MySQL', 'JWT', 'Tailwind CSS'],
    featured: true,
    github: 'https://github.com/sojibahmed404/',
    live: 'https://emergency-blood-finder-system.vercel.app/'
  },
  {
    id: 1,
    emoji: '🌐',
    type: 'Web Development',
    category: 'web',
    title: 'Personal Portfolio Website',
    desc: 'A responsive, modern portfolio website built with HTML, CSS & JavaScript featuring dark mode, smooth animations, and contact form integration.',
    longDesc: 'Designed and developed a fully responsive portfolio website showcasing my skills, projects, and contact information. Features include a custom cursor, typewriter effect, smooth scroll animations, project modals, and a fully functional contact section.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    featured: true,
    github: 'https://github.com/sojibahmed404/',
    live: '#'
  },
  {
    id: 8,
    emoji: '📄',
    type: 'Web Tool',
    category: 'web',
    title: 'KYAU PDF Builder',
    desc: 'A lightweight, web-based utility tool built for KYAU students and faculty to easily generate and customize professional PDFs from templates.',
    longDesc: 'Designed and developed a highly useful client-side PDF Builder tailored for KYAU university students and teachers. Built purely with HTML5, CSS3, and JavaScript, it allows users to dynamically input data, select university templates, preview in real-time, and download professional PDFs instantly.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    featured: true,
    github: 'https://github.com/sojibahmed404/',
    live: 'https://kyau-pdf-builder.netlify.app/'
  },
  {
    id: 2,
    emoji: '📱',
    type: 'Mobile App',
    category: 'mobile',
    title: 'Flutter Task Manager',
    desc: 'A cross-platform mobile task management app built with Flutter and Dart featuring local storage, reminders, and a clean Material UI.',
    longDesc: 'Built a full-featured task management mobile application using Flutter and Dart. Includes CRUD operations, local storage with sqflite, push notification reminders, dark/light theme support, and smooth page transitions.',
    stack: ['Flutter', 'Dart', 'SQLite'],
    featured: true,
    github: 'https://github.com/sojibahmed404/',
    live: '#'
  },
  {
    id: 3,
    emoji: '⚛️',
    type: 'Web App',
    category: 'web',
    title: 'React Weather Dashboard',
    desc: 'A real-time weather dashboard using React.js and OpenWeatherMap API with charts, forecasts, and location-based data.',
    longDesc: 'Created a comprehensive weather dashboard with React.js that fetches real-time data from the OpenWeatherMap API. Features include current weather, 5-day forecast, interactive charts with Recharts, geolocation support, and search by city.',
    stack: ['React.js', 'Tailwind CSS', 'API'],
    featured: false,
    github: 'https://github.com/sojibahmed404/',
    live: '#'
  },
  {
    id: 4,
    emoji: '🛒',
    type: 'WordPress',
    category: 'wordpress',
    title: 'E-Commerce WordPress Site',
    desc: 'A fully functional e-commerce website built with WordPress and WooCommerce including custom theme design and payment integration.',
    longDesc: 'Developed a complete e-commerce solution using WordPress and WooCommerce. Includes custom theme development, product management, payment gateway integration (bKash, SSL Commerz), and SEO optimization.',
    stack: ['WordPress', 'WooCommerce', 'PHP', 'CSS'],
    featured: false,
    github: 'https://github.com/sojibahmed404/',
    live: '#'
  },
  {
    id: 5,
    emoji: '🔐',
    type: 'Security Tool',
    category: 'other',
    title: 'Network Scanner Tool',
    desc: 'A basic network vulnerability scanner built in Python for educational purposes as part of ethical hacking studies.',
    longDesc: 'Developed an educational network scanning tool in Python that performs port scanning, OS fingerprinting, and basic vulnerability checks. Built for academic purposes to understand ethical hacking concepts and network security fundamentals.',
    stack: ['Python', 'Nmap', 'Socket'],
    featured: false,
    github: 'https://github.com/sojibahmed404/',
    live: null
  },
  {
    id: 6,
    emoji: '📊',
    type: 'C++ Project',
    category: 'other',
    title: 'Student Management System',
    desc: 'A console-based student management system in C++ featuring file I/O, grade calculation, and report generation.',
    longDesc: 'Built a comprehensive student management system in C++ with features including student record management, grade calculation and GPA computation, file-based storage, search and filter capabilities, and detailed report generation.',
    stack: ['C++', 'File I/O', 'OOP'],
    featured: false,
    github: 'https://github.com/sojibahmed404/',
    live: null
  }
];

/* ── RENDER PROJECT CARDS ── */
function renderProjects(filter) {
  const grid = document.getElementById('pj-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="pj-card tilt-card reveal" data-id="${p.id}" data-cat="${p.category}" style="--delay:${i*80}ms">
      <div class="pj-thumb">
        ${p.featured ? '<div class="pj-featured-badge">⭐ Featured</div>' : ''}
        <div class="pj-thumb-emoji">${p.emoji}</div>
        <div class="pj-num">0${i+1}</div>
      </div>
      <div class="pj-body">
        <div class="pj-type">${p.type}</div>
        <h3 class="pj-title">${p.title}</h3>
        <p class="pj-desc">${p.desc}</p>
        <div class="pj-footer">
          <div class="pj-stack">
            ${p.stack.map(s => `<span class="tag">${s}</span>`).join('')}
          </div>
          <div class="pj-link-row">
            <a href="${p.github}" target="_blank" class="pj-link" title="GitHub" data-tooltip="GitHub">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            ${p.live ? `<a href="${p.live}" target="_blank" class="pj-link" title="Live Demo" data-tooltip="Live">🔗</a>` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Re-attach card click for modal
  grid.querySelectorAll('.pj-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.pj-link')) return;
      openModal(+card.dataset.id);
    });
  });

  // Re-init tilt and reveal for new cards
  if (typeof initTiltCards === 'function') initTiltCards('.pj-card');
  if (typeof initReveal === 'function') initReveal();
}

/* ── FILTER BUTTONS ── */
(function initFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });
  // Initial render
  renderProjects('all');
})();

/* ── PROJECT MODAL ── */
function openModal(id) {
  const p = projects.find(x => x.id === id);
  if (!p) return;

  const overlay = document.getElementById('proj-modal-overlay');
  const box = overlay?.querySelector('.proj-modal-box');
  if (!overlay || !box) return;

  const thumbColors = {
    web: 'linear-gradient(135deg, rgba(56,189,248,.2), rgba(129,140,248,.2))',
    mobile: 'linear-gradient(135deg, rgba(245,158,11,.15), rgba(244,114,182,.15))',
    wordpress: 'linear-gradient(135deg, rgba(52,211,153,.15), rgba(56,189,248,.15))',
    other: 'linear-gradient(135deg, rgba(129,140,248,.15), rgba(244,114,182,.15))'
  };

  box.innerHTML = `
    <button class="modal-close-btn" id="modal-close">✕</button>
    <div class="modal-thumb" style="background:${thumbColors[p.category] || thumbColors.other}">
      <span style="font-size:5rem;filter:drop-shadow(0 4px 16px rgba(0,0,0,.4))">${p.emoji}</span>
    </div>
    <div class="modal-body">
      <div class="modal-type">${p.type}</div>
      <h2 class="modal-title">${p.title}</h2>
      <p class="modal-desc">${p.longDesc}</p>
      <div class="modal-tags">
        ${p.stack.map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
      <div class="modal-links">
        <a href="${p.github}" target="_blank" class="btn-primary" style="font-size:.82rem;padding:.65rem 1.4rem">
          View on GitHub →
        </a>
        ${p.live ? `<a href="${p.live}" target="_blank" class="btn-outline" style="font-size:.82rem;padding:.65rem 1.4rem">Live Demo 🔗</a>` : ''}
      </div>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  box.querySelector('#modal-close')?.addEventListener('click', closeModal);
}

function closeModal() {
  const overlay = document.getElementById('proj-modal-overlay');
  overlay?.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('proj-modal-overlay')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
