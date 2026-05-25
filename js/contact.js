/* ═══════════════════════════════════════════
   SOJIB AHMED — CONTACT PAGE JS
   Form, AI Chat, Matrix Rain
   ═══════════════════════════════════════════ */

/* ── CONTACT FORM ── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const origText = btn.innerHTML;

    btn.innerHTML = '<span>Sending...</span> ⏳';
    btn.disabled = true;

    // Compile message data
    const formData = {
      name: `${form.fname.value} ${form.lname.value}`.trim(),
      email: form.email.value,
      subject: form.subject.value || 'General Inquiry',
      message: form.message.value
    };

    try {
      // Submit via FormSubmit AJAX endpoint
      const response = await fetch('https://formsubmit.co/ajax/mdsojibahmed544@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        btn.innerHTML = '✅ Sent!';
        btn.style.background = 'linear-gradient(135deg, var(--emerald), #059669)';

        const success = document.getElementById('form-success');
        if (success) {
          form.style.display = 'none';
          success.classList.add('show');
        }
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      btn.innerHTML = '❌ Error';
      btn.style.background = '#e63946';
      alert('Could not send message. Please email directly to mdsojibahmed544@gmail.com');
    }

    setTimeout(() => {
      btn.innerHTML = origText;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
      form.style.display = '';
      const success = document.getElementById('form-success');
      success?.classList.remove('show');
    }, 6000);
  });
})();



/* ── MATRIX RAIN EASTER EGG ── */
(function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  const overlay = document.getElementById('matrix-overlay');
  const exitBtn = document.getElementById('matrix-exit');
  if (!canvas || !overlay) return;

  let running = false;
  let animId;
  const ctx = canvas.getContext('2d');

  function startMatrix() {
    overlay.classList.add('show');
    exitBtn?.classList.add('show');
    running = true;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

    function draw() {
      if (!running) return;
      ctx.fillStyle = 'rgba(0,0,0,.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
  }

  function stopMatrix() {
    running = false;
    cancelAnimationFrame(animId);
    overlay.classList.remove('show');
    exitBtn?.classList.remove('show');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  exitBtn?.addEventListener('click', stopMatrix);

  // Secret: Triple-click footer
  let clickCount = 0;
  document.querySelector('footer')?.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 3) {
      clickCount = 0;
      startMatrix();
    }
    setTimeout(() => { clickCount = 0; }, 800);
  });

  // Secret: Type "matrix"
  let typed = '';
  document.addEventListener('keydown', e => {
    typed += e.key.toLowerCase();
    if (typed.endsWith('matrix')) {
      typed = '';
      if (!running) startMatrix();
    }
    if (typed.length > 20) typed = typed.slice(-20);
  });

  window.addEventListener('resize', () => {
    if (running) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
})();

/* ── CONTACT LINK HOVER EFFECTS ── */
document.querySelectorAll('.cl-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const arrow = card.querySelector('.cl-arrow');
    if (arrow) {
      arrow.style.transform = 'translateX(6px)';
    }
  });
  card.addEventListener('mouseleave', () => {
    const arrow = card.querySelector('.cl-arrow');
    if (arrow) {
      arrow.style.transform = '';
    }
  });
});

/* ── SOUND TOGGLE (Visual only) ── */
(function initSoundToggle() {
  const toggle = document.getElementById('sound-toggle');
  if (!toggle) return;

  let muted = false;
  toggle.addEventListener('click', () => {
    muted = !muted;
    toggle.textContent = muted ? '🔇' : '🔊';
    toggle.classList.toggle('muted', muted);
  });
})();
