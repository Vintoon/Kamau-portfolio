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
