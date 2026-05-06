/* scripts.js — Victor Kamau Portfolio */

// ── Scroll Reveal ──────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children if multiple come in at once
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ── Active Nav on Scroll ───────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));

// ── Mobile Menu Toggle ─────────────────────────────────
const menuToggle = document.querySelector('.menu-toggle');
const navLinksList = document.querySelector('.nav-links');

if (menuToggle && navLinksList) {
  menuToggle.addEventListener('click', () => {
    const open = navLinksList.style.display === 'flex';
    navLinksList.style.display = open ? 'none' : 'flex';
    navLinksList.style.flexDirection = 'column';
    navLinksList.style.position = 'absolute';
    navLinksList.style.top = '70px';
    navLinksList.style.right = '1.5rem';
    navLinksList.style.background = 'rgba(255,255,255,0.9)';
    navLinksList.style.backdropFilter = 'blur(20px)';
    navLinksList.style.borderRadius = '16px';
    navLinksList.style.padding = '0.75rem';
    navLinksList.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
    navLinksList.style.border = '1px solid rgba(255,255,255,0.5)';
    if (open) { navLinksList.style.display = ''; }
  });
}

// ── Smooth close mobile menu on link click ─────────────
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      navLinksList.style.display = '';
    }
  });
});

// ── Cursor glow effect (desktop only) ─────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 280px; height: 280px; border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.4s ease, top 0.4s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ── Stat counter animation ─────────────────────────────
const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const text  = el.textContent;
      const num   = parseFloat(text);
      const suffix = text.replace(/[\d.]/g, '');
      if (!isNaN(num)) {
        let start = 0;
        const step = num / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { start = num; clearInterval(timer); }
          el.textContent = (Number.isInteger(num) ? Math.round(start) : start.toFixed(1)) + suffix;
        }, 30);
      }
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.7 });

statNums.forEach(el => statsObserver.observe(el));
    /* ── Scroll Reveal ─────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');
    const revObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          revObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revObserver.observe(el));

    /* ── Dark Mode ─────────────────────────────────── */
    const html  = document.documentElement;
    const btn   = document.getElementById('themeToggle');
    const saved = localStorage.getItem('vk-theme');
    if (saved) { html.setAttribute('data-theme', saved); btn.textContent = saved === 'dark' ? '☀️' : '🌙'; }
    btn.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      const next   = isDark ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('vk-theme', next);
    });

    /* ── Scroll Progress ───────────────────────────── */
    const progressBar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = Math.min(pct, 100) + '%';
    });

    /* ── Back to Top ───────────────────────────────── */
    const btt = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ── Toast ─────────────────────────────────────── */
    function showToast(msg, type = '') {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.className = 'toast show ' + type;
      setTimeout(() => { t.className = 'toast'; }, 3600);
    }

    /* ── Mobile Menu ───────────────────────────────── */
    const menuToggle   = document.getElementById('menuToggle');
    const navLinks     = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('mobile-open');
      if (open) {
        Object.assign(navLinks.style, {
          display:'flex', flexDirection:'column', position:'absolute',
          top:'70px', right:'1.5rem', borderRadius:'16px',
          padding:'0.75rem', boxShadow:'0 8px 32px rgba(0,0,0,0.12)',
          border:'1px solid rgba(255,255,255,0.4)',
          background:'rgba(255,255,255,0.88)', backdropFilter:'blur(20px)'
        });
      } else { navLinks.style.display = ''; }
    });
    navLinks.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        if (window.innerWidth < 768) { navLinks.style.display = ''; navLinks.classList.remove('mobile-open'); }
      });
    });

    /* ── Char Counter ──────────────────────────────── */
    const msgArea  = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    msgArea.addEventListener('input', () => {
      const len = msgArea.value.length;
      charCount.textContent = len + ' / 1000';
      charCount.className = 'char-count' + (len > 900 ? ' limit' : len > 750 ? ' near' : '');
    });

    /* ── Form Validation & Submit ──────────────────── */
    const form = document.getElementById('contactForm');
    const fields = {
      name:    { el: document.getElementById('name'),    err: document.getElementById('nameErr'),    validate: v => v.trim().length >= 2 },
      email:   { el: document.getElementById('email'),   err: document.getElementById('emailErr'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      subject: { el: document.getElementById('subject'), err: document.getElementById('subjectErr'), validate: v => v !== '' },
      message: { el: document.getElementById('message'), err: document.getElementById('msgErr'),     validate: v => v.trim().length >= 20 }
    };

    function validateField(key) {
      const { el, err, validate } = fields[key];
      const ok = validate(el.value);
      el.classList.toggle('error', !ok);
      err.classList.toggle('show', !ok);
      return ok;
    }

    Object.keys(fields).forEach(k => {
      fields[k].el.addEventListener('blur', () => validateField(k));
      fields[k].el.addEventListener('input', () => {
        if (fields[k].el.classList.contains('error')) validateField(k);
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const allValid = Object.keys(fields).map(k => validateField(k)).every(Boolean);
      if (!allValid) { showToast('Please fix the errors above.', 'error'); return; }

      const submitBtn = document.getElementById('submitBtn');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      try {
        const data = new FormData(form);
        await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
        document.getElementById('formWrapper').style.display = 'none';
        document.getElementById('successState').classList.add('show');
        showToast('Message sent! I\'ll be in touch soon. ✨', 'success');
      } catch {
        showToast('Oops — something went wrong. Please try emailing directly.', 'error');
        submitBtn.textContent = 'Send Message →';
        submitBtn.disabled = false;
      }
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      form.reset();
      charCount.textContent = '0 / 1000';
      charCount.className = 'char-count';
      Object.keys(fields).forEach(k => {
        fields[k].el.classList.remove('error');
        fields[k].err.classList.remove('show');
      });
      showToast('Form cleared.');
    });

    function showFormAgain() {
      document.getElementById('formWrapper').style.display = '';
      document.getElementById('successState').classList.remove('show');
      form.reset();
    }

    /* ── Cursor glow ───────────────────────────────── */
    if (window.matchMedia('(pointer: fine)').matches) {
      const glow = document.createElement('div');
      glow.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.07) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left 0.4s ease,top 0.4s ease;will-change:left,top;`;
      document.body.appendChild(glow);
      document.addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
    }
