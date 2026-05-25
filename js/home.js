/* ═══════════════════════════════════════════
   SOJIB AHMED — HOME PAGE JS
   Typewriter, Confetti, Particles, Hero Animations
   ═══════════════════════════════════════════ */

/* ── TYPEWRITER ── */
(function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'Web Development 🌐',
    'Flutter Apps 📱',
    'Problem Solving 💡',
    'React.js Projects ⚛️',
    'Ethical Hacking 🔐',
    'Open Source 🚀'
  ];

  let pIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const phrase = phrases[pIdx];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 50 : 85);
  }

  setTimeout(type, 600);
})();

/* ── CONFETTI BURST ── */
function burstConfetti(x, y, count) {
  count = count || 18;
  const colors = ['#38bdf8','#818cf8','#f59e0b','#f472b6','#34d399','#fff'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:fixed;pointer-events:none;z-index:99990;
      left:${x}px;top:${y}px;
      width:${Math.random()*8+4}px;height:${Math.random()*8+4}px;
      border-radius:${Math.random()>0.5?'50%':'2px'};
      background:${colors[Math.floor(Math.random()*colors.length)]};
      transform-origin:center;
    `;
    document.body.appendChild(p);
    const dx = (Math.random()-0.5)*200;
    const dy = -(Math.random()*180+80);
    const rot = (Math.random()-0.5)*720;
    p.animate([
      { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${dx}px,${dy}px) rotate(${rot}deg)`, opacity: 0 }
    ], { duration: 900+Math.random()*600, easing: 'cubic-bezier(0,0,0.2,1)', fill: 'forwards' })
    .addEventListener('finish', () => p.remove());
  }
}

/* Trigger on hero CTA click */
document.querySelectorAll('.btn-primary.mag-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    burstConfetti(e.clientX, e.clientY);
  });
});

/* ── HERO ORB PARALLAX ── */
(function initHeroParallax() {
  const orbs = document.querySelectorAll('.hero-orb');
  if (!orbs.length) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });
})();

/* ── SCRAMBLE TEXT ── */
(function initScramble() {
  const els = document.querySelectorAll('.scramble');
  if (!els.length) return;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

  els.forEach(el => {
    const orig = el.dataset.text || el.textContent;
    el.dataset.text = orig;

    el.addEventListener('mouseenter', () => {
      let iter = 0;
      clearInterval(el._interval);
      el._interval = setInterval(() => {
        el.textContent = orig.split('').map((ch, i) => {
          if (i < iter) return orig[i];
          if (ch === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        iter += 0.5;
        if (iter > orig.length) {
          clearInterval(el._interval);
          el.textContent = orig;
        }
      }, 35);
    });
  });
})();

/* ── HERO BADGE FLOAT (extra pop on load) ── */
(function animateHeroBadges() {
  document.querySelectorAll('.hero-badge').forEach((badge, i) => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(20px)';
    setTimeout(() => {
      badge.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(0.34,1.56,0.64,1)';
      badge.style.opacity = '1';
      badge.style.transform = '';
    }, 1000 + i * 200);
  });
})();

/* ── DEVELOPER DASHBOARD OBSERVER (COUNTERS & PROGRESS BARS) ── */
(function initDashboardObserver() {
  const dash = document.querySelector('.dev-dashboard');
  if (!dash) return;

  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      dash.classList.add('active');
      initStatCounters?.();
      io.disconnect();
    }
  }, { threshold: 0.15 });
  io.observe(dash);
})();

/* ── HERO GRID BG SUBTLE ANIMATION ── */
(function animateGridBg() {
  const grid = document.querySelector('.hero-grid-bg');
  if (!grid) return;

  let offset = 0;
  function anim() {
    offset += 0.05;
    grid.style.backgroundPosition = `${offset % 60}px ${offset % 60}px`;
    requestAnimationFrame(anim);
  }
  anim();
})();

/* ── INTERACTIVE TERMINAL WIDGET ── */
(function initTerminal() {
  const openBtn = document.getElementById('term-open-btn');
  const overlay = document.getElementById('terminal-overlay');
  const closeDot = document.getElementById('term-close-dot');
  const termInput = document.getElementById('terminal-input');
  const termBody = document.getElementById('terminal-body');

  if (!openBtn || !overlay || !closeDot || !termInput || !termBody) return;

  const commandHistory = [];
  let historyIndex = -1;

  // Open Terminal
  openBtn.addEventListener('click', () => {
    overlay.classList.add('open');
    setTimeout(() => {
      termInput.focus();
    }, 100);
  });

  // Close Terminal
  closeDot.addEventListener('click', () => {
    overlay.classList.remove('open');
  });

  // Focus input when clicking anywhere inside the terminal window
  overlay.addEventListener('click', (e) => {
    // Only focus if they clicked inside the terminal box or body
    if (e.target.closest('.terminal-box')) {
      termInput.focus();
    }
  });

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const fullCmd = termInput.value;
      if (fullCmd.trim() !== '') {
        commandHistory.push(fullCmd);
        historyIndex = commandHistory.length;
      }

      // Add user line to terminal body
      const userLine = document.createElement('div');
      userLine.className = 'term-line cmd';
      userLine.innerHTML = `sojib@portfolio:~$ <span>${escapeHTML(fullCmd)}</span>`;
      termBody.appendChild(userLine);

      // Process command
      processCommand(fullCmd);

      // Clear input and scroll down
      termInput.value = '';
      setTimeout(() => {
        termBody.scrollTo({ top: termBody.scrollHeight, behavior: 'smooth' });
      }, 50);

    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        termInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        termInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        termInput.value = '';
      }
    }
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function processCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (trimmed === '') return;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const response = document.createElement('div');

    switch (cmd) {
      case 'help':
        response.className = 'term-line info';
        response.innerHTML = `
          <p style="color: #58a6ff; font-weight: bold; margin-bottom: 0.3rem;">💻 Available Terminal Commands:</p>
          <p>  <span style="color: #d2a8ff;">about</span>           - Who is Sojib Ahmed?</p>
          <p>  <span style="color: #d2a8ff;">skills</span>          - Core technical skills list</p>
          <p>  <span style="color: #d2a8ff;">skills --visual</span> - Show animated graphical skills bars</p>
          <p>  <span style="color: #d2a8ff;">projects</span>        - Featured developer projects</p>
          <p>  <span style="color: #d2a8ff;">github</span>          - Load live recent repositories from GitHub API</p>
          <p>  <span style="color: #d2a8ff;">education</span>       - Academic qualifications & department</p>
          <p>  <span style="color: #d2a8ff;">contact</span>         - Get email & social handles</p>
          <p>  <span style="color: #d2a8ff;">neofetch</span>        - Detailed System Specs visual screen</p>
          <p>  <span style="color: #d2a8ff;">sudo hack</span>       - Trigger fake hacking sequence simulation</p>
          <p>  <span style="color: #d2a8ff;">theme &lt;theme&gt;</span>    - Change styling theme (<span style="color: #3fb950;">classic</span>, <span style="color: #ff007f;">cyberpunk</span>, <span style="color: #bd93f9;">dracula</span>, <span style="color: #00ff41;">matrix</span>)</p>
          <p>  <span style="color: #d2a8ff;">quote</span>           - Random programmer motivation quote</p>
          <p>  <span style="color: #d2a8ff;">clear</span>           - Clear logs history</p>
        `;
        termBody.appendChild(response);
        break;

      case 'about':
        response.className = 'term-line out';
        response.innerHTML = `
          <p><span style="color: #3fb950; font-weight: bold;">Md Sojib Ahmed</span> is a B.Sc. student of Computer Science & Engineering (2nd Year) at Khwaja Yunus Ali University (KYAU), Bangladesh.</p>
          <p>Highly active in developing modern web applications, Restful APIs, and cross-platform mobile apps with Flutter. Open-source enthusiast and dedicated problem-solver.</p>
        `;
        termBody.appendChild(response);
        break;

      case 'skills':
        response.className = 'term-line out';
        if (args.includes('--visual')) {
          response.innerHTML = `
            <p><span style="color: #3fb950; font-weight: bold;">Technical Skills Analytics (Graphical):</span></p>
            <p>HTML/CSS/JS:   <span style="color: #3fb950;">███████████████████░░</span> 95%</p>
            <p>React/Vite:    <span style="color: #3fb950;">██████████████████░░░</span> 90%</p>
            <p>Flutter/Dart:  <span style="color: #3fb950;">█████████████████░░░░</span> 85%</p>
            <p>Spring Boot:   <span style="color: #3fb950;">████████████████░░░░░</span> 80%</p>
            <p>WordPress CMS: <span style="color: #3fb950;">███████████████░░░░░░</span> 75%</p>
            <p>Git / GitHub:  <span style="color: #3fb950;">██████████████████░░░</span> 90%</p>
          `;
        } else {
          response.innerHTML = `
            <p><span style="color: #3fb950; font-weight: bold;">Technical Competence:</span></p>
            <p>  · Languages:  C, C++, Java, Dart, JavaScript (ES6+)</p>
            <p>  · Frontend Frameworks: React, Tailwind CSS, Vite, HTML5, CSS3</p>
            <p>  · Enterprise Backend:  Spring Boot, JWT, Restful APIs, MySQL</p>
            <p>  · Mobile Ecosystem:   Flutter, Dart, Cross-Platform UI</p>
            <p>  · CMS & Versioning:   WordPress, WooCommerce, Git, GitHub</p>
            <p>  <span style="color: #8b949e;">* Tip: Type 'skills --visual' to display graphical metrics representation!</span></p>
          `;
        }
        termBody.appendChild(response);
        break;

      case 'projects':
        response.className = 'term-line out';
        response.innerHTML = `
          <p><span style="color: #3fb950; font-weight: bold;">Featured Projects Summary:</span></p>
          <p>1. <span style="color: #58a6ff; font-weight: bold;">Emergency Blood Finder System</span> [Java, Spring Boot, MySQL, React, Tailwind] - 1st/Featured full-stack blood matching platform.</p>
          <p>2. <span style="color: #58a6ff; font-weight: bold;">KYAU PDF Builder</span> [HTML5, CSS3, Vanilla JS] - Real-time custom PDF invoice and document builder.</p>
          <p>3. <span style="color: #58a6ff; font-weight: bold;">Binary Brains Portfolio</span> [HTML, CSS, JS] - Futuristic cyberpunk portfolio platform.</p>
          <p>Type <span style="color: #d2a8ff;">'github'</span> to see all recent repositories or visit Projects page.</p>
        `;
        termBody.appendChild(response);
        break;

      case 'education':
        response.className = 'term-line out';
        response.innerHTML = `
          <p><span style="color: #3fb950; font-weight: bold;">Academic Credentials:</span></p>
          <p>· <span style="color: #58a6ff; font-weight: bold;">B.Sc. in Computer Science & Engineering</span> (Enrolled)</p>
          <p>  Khwaja Yunus Ali University (KYAU) | B.Sc. CSE Department (2nd Year)</p>
          <p>· <span style="color: #58a6ff; font-weight: bold;">Higher Secondary Certificate (HSC)</span></p>
          <p>  Science Major</p>
        `;
        termBody.appendChild(response);
        break;

      case 'contact':
        response.className = 'term-line out';
        response.innerHTML = `
          <p><span style="color: #3fb950; font-weight: bold;">Get in Touch:</span></p>
          <p>  · Email:    <a href="mailto:mdsojibahmed544@gmail.com" style="color: #58a6ff;">mdsojibahmed544@gmail.com</a></p>
          <p>  · GitHub:   <a href="https://github.com/sojibahmed404/" target="_blank" style="color: #58a6ff;">github.com/sojibahmed404</a></p>
          <p>  · LinkedIn: <a href="https://www.linkedin.com/in/md-sojib-ahmed-a58ab03a2/" target="_blank" style="color: #58a6ff;">linkedin.com/in/md-sojib-ahmed-a58ab03a2</a></p>
          <p>  · Facebook: <a href="https://www.facebook.com/mdsojib.ahamed.9615" target="_blank" style="color: #58a6ff;">fb.com/mdsojib.ahamed.9615</a></p>
        `;
        termBody.appendChild(response);
        break;

      case 'neofetch':
        response.className = 'term-line success';
        response.innerHTML = `
          <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center;">
            <pre style="font-family: monospace; font-size: 1rem; color: #3fb950; margin: 0; line-height: 1.25;">
   /\\_/\\
  ( o.o )
   > ^ <
            </pre>
            <div style="font-size: 0.8rem; color: #c9d1d9;">
              <p><span style="color: #3fb950; font-weight: bold;">sojib@portfolio-pc</span></p>
              <p>---------------------</p>
              <p>OS: Sojib Portfolio OS v1.2</p>
              <p>Host: KYAU CSE PC</p>
              <p>Kernel: Web / Flutter Engine</p>
              <p>Uptime: 2 Years (CSE study)</p>
              <p>Shell: bash 5.1.16-web-term</p>
              <p>DE: Hacking Console overlay</p>
              <p>WM: Glassmorphic Floating Panel</p>
              <p>CPU: Energetic Logical Mind 🧠</p>
              <p>GPU: High Fidelity UX Vision 👁️</p>
              <p>Memory: 16GB / 16GB (Always Building)</p>
            </div>
          </div>
        `;
        termBody.appendChild(response);
        break;

      case 'github':
        response.className = 'term-line out';
        response.innerHTML = `<p>⚡ Connecting to GitHub API to load repositories...</p>`;
        termBody.appendChild(response);

        // Fetch repositories from API dynamically!
        fetch('https://api.github.com/users/sojibahmed404/repos?sort=updated&per_page=5')
          .then(res => {
            if (!res.ok) throw new Error('API Rate Limit or Offline');
            return res.json();
          })
          .then(repos => {
            const apiRes = document.createElement('div');
            apiRes.className = 'term-line success';
            let list = `<p style="color: #3fb950; font-weight: bold; margin-top: 0.5rem;">📁 Active Repositories from GitHub API:</p>`;
            repos.forEach(repo => {
              const desc = repo.description || 'No description provided.';
              list += `
                <p>  <span style="color: #58a6ff; font-weight: bold;">&gt; ${repo.name}</span> (${repo.language || 'JS'})
                     <br/>    <span style="color: #8b949e;">${desc}</span>
                     <br/>    ⭐ ${repo.stargazers_count} stars &middot; <a href="${repo.html_url}" target="_blank" style="color: var(--amber); text-decoration: underline;">View Code</a></p>
              `;
            });
            apiRes.innerHTML = list;
            termBody.appendChild(apiRes);
            termBody.scrollTo({ top: termBody.scrollHeight, behavior: 'smooth' });
          })
          .catch(err => {
            const fallback = document.createElement('div');
            fallback.className = 'term-line out';
            fallback.innerHTML = `
              <p style="color: #ff7b72;">[!] API connection error. Loaded local catalog cache:</p>
              <p>  &gt; <span style="color: #58a6ff; font-weight: bold;">emergency-blood-finder-system</span> (Java) - ⭐ 3 stars</p>
              <p>  &gt; <span style="color: #58a6ff; font-weight: bold;">kyau-pdf-builder</span> (JS) - ⭐ 2 stars</p>
              <p>  &gt; <span style="color: #58a6ff; font-weight: bold;">sojib-ahmed-portfolio</span> (HTML) - ⭐ 5 stars</p>
            `;
            termBody.appendChild(fallback);
            termBody.scrollTo({ top: termBody.scrollHeight, behavior: 'smooth' });
          });
        break;

      case 'sudo':
        if (args.length > 0 && args[0].toLowerCase() === 'hack') {
          // Fake hacking sequence simulation
          termInput.disabled = true;
          let step = 0;
          const hackLines = [
            '<span style="color: #d2a8ff;">[~] Initializing root escalation sequence...</span>',
            '<span style="color: #ff7b72;">[!] Bypassing secure socket layer handshake...</span>',
            '<span style="color: #c9d1d9;">[+] Cracking encryption keys... SUCCESS (AES-256 decrypted)</span>',
            '<span style="color: #ff7b72;">[!] Overloading firewall port 8080... OK</span>',
            '<span style="color: #c9d1d9;">[+] Injecting buffer payload script to database...</span>',
            '<span style="color: #3fb950; font-weight: bold;">[#] Privilege escalation to ROOT complete! VIP ACCESS GRANTED! 👑</span>',
            '<span style="color: var(--amber);">[!] Decrypting secret files... Type "secret" to download!</span>'
          ];

          const interval = setInterval(() => {
            const hackLine = document.createElement('div');
            hackLine.className = 'term-line out';
            hackLine.innerHTML = hackLines[step];
            termBody.appendChild(hackLine);
            termBody.scrollTo({ top: termBody.scrollHeight, behavior: 'smooth' });
            
            step++;
            if (step >= hackLines.length) {
              clearInterval(interval);
              termInput.disabled = false;
              termInput.focus();
            }
          }, 600);
        } else {
          response.className = 'term-line error';
          response.innerHTML = `Permission denied. Try running <span style="color: #ff7b72; font-weight: bold;">'sudo hack'</span> for root simulation.`;
          termBody.appendChild(response);
        }
        break;

      case 'secret':
        response.className = 'term-line success';
        response.innerHTML = `
          <p style="color: var(--amber); font-weight: bold; font-family: monospace;">📁 [CLASSIFIED PROFILE DETECTED]</p>
          <p style="margin-top: 0.3rem;">Sojib Ahmed is currently training to become a Master Software Architect.</p>
          <p>Special Traits: Ultra-rapid logical comprehension, 24/7 coding passion, clean code fanatic.</p>
          <p>Current CPU Load: 100% efficient development speed.</p>
          <p>Tip: Continue building amazing things! You found the secret easter egg!</p>
        `;
        termBody.appendChild(response);
        break;

      case 'quote':
        const quotes = [
          "\"Talk is cheap. Show me the code.\" - Linus Torvalds",
          "\"First, solve the problem. Then, write the code.\" - John Johnson",
          "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" - Martin Fowler",
          "\"Experience is the name everyone gives to their mistakes.\" - Oscar Wilde",
          "\"Make it work, make it right, make it fast.\" - Kent Beck",
          "\"Simplicity is the soul of efficiency.\" - Austin Freeman"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        response.className = 'term-line info';
        response.innerHTML = `<p style="font-style: italic; color: #d2a8ff;">${randomQuote}</p>`;
        termBody.appendChild(response);
        break;

      case 'theme':
        const box = document.querySelector('.terminal-box');
        if (!box) return;
        
        if (args.length > 0) {
          const themeName = args[0].toLowerCase();
          box.classList.remove('theme-matrix', 'theme-cyberpunk', 'theme-dracula');
          
          if (themeName === 'matrix') {
            box.classList.add('theme-matrix');
            response.innerHTML = `<p style="color: #00ff41;">System theme successfully configured to: <span style="font-weight: bold;">MATRIX DIGITAL RAIN</span> 🌌</p>`;
          } else if (themeName === 'cyberpunk') {
            box.classList.add('theme-cyberpunk');
            response.innerHTML = `<p style="color: #ff007f;">System theme successfully configured to: <span style="font-weight: bold;">CYBERPUNK NEON GLOW</span> 🌇</p>`;
          } else if (themeName === 'dracula') {
            box.classList.add('theme-dracula');
            response.innerHTML = `<p style="color: #bd93f9;">System theme successfully configured to: <span style="font-weight: bold;">DRACULA NIGHTS</span> 🧛</p>`;
          } else if (themeName === 'classic') {
            response.innerHTML = `<p style="color: #3fb950;">System theme successfully configured to: <span style="font-weight: bold;">CLASSIC TERMINAL</span> 💻</p>`;
          } else {
            response.innerHTML = `<p style="color: #ff7b72;">Theme not found: '${themeName}'. Available: classic, matrix, cyberpunk, dracula.</p>`;
          }
        } else {
          response.innerHTML = `<p>Usage: <span style="color: #58a6ff;">theme &lt;name&gt;</span>. Available: classic, matrix, cyberpunk, dracula.</p>`;
        }
        response.className = 'term-line out';
        termBody.appendChild(response);
        break;

      case 'clear':
        termBody.innerHTML = `
          <div class="term-line welcome-msg">
            <pre class="term-ascii" style="color: #3fb950; font-family: monospace; font-size: clamp(.38rem, 1vw, .55rem); line-height: 1.15; overflow-x: auto; white-space: pre; margin-bottom: 1rem;">
 ____   ___    _ ___ ____    _    _   _ __  __ _____ ____  
/ ___| / _ \\  | |_ _| __ )  / \\  | | | |  \\/  | ____|  _ \\ 
\\___ \\| | | |_| || ||  _ \\ / _ \\ | |_| | |\\/| |  _| | | | |
 ___) | |_| | |_| || || |_) / ___ \\|  _  | |  | | |___| |_| |
|____/ \\___/ \\___/___|____/_/   \\_\\_| |_|_|  |_|_____|____/ 
            </pre>
            <p class="term-line info">Welcome to Sojib's Interactive CLI [Version 1.0.0]</p>
            <p class="term-line info">Type <span style="color: #58a6ff;">'help'</span> to see a list of available commands.</p>
            <br/>
          </div>
        `;
        break;

      default:
        response.className = 'term-line error';
        response.innerHTML = `Command not found: <span style="font-weight: bold;">'${escapeHTML(cmd)}'</span>. Type <span style="color: #58a6ff;">'help'</span> for instructions.`;
        termBody.appendChild(response);
        break;
    }
  }

  // Bind global click function to run commands immediately!
  window.runTermCmd = function(command) {
    if (termInput.disabled) return;
    
    // Put prompt line
    const userLine = document.createElement('div');
    userLine.className = 'term-line cmd';
    userLine.innerHTML = `sojib@portfolio:~$ <span>${escapeHTML(command)}</span>`;
    termBody.appendChild(userLine);

    processCommand(command);

    // Auto scroll down
    setTimeout(() => {
      termBody.scrollTo({ top: termBody.scrollHeight, behavior: 'smooth' });
    }, 50);
  };
})();
