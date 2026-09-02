/* ==========================================
   Victor Kamau Portfolio — Liquid Glass JS
========================================== */

// ---------- Mobile Navigation ----------
const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  menuBtn.textContent = navLinks.classList.contains("show") ? "✕" : "☰";
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuBtn.textContent = "☰";
  });
});

// ---------- Scroll Reveal ----------
const revealElements = document.querySelectorAll(".reveal-up, .reveal-right");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ---------- Active Navigation ----------
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ---------- Parallax Background Orbs ----------
const orbs = document.querySelectorAll(".orb");

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.25;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});


// ---------- Cursor Glow ----------
const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
document.body.appendChild(cursorGlow);

window.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

// ---------- Journey Accordion ----------
const detailsElements = document.querySelectorAll(".journey-details");

detailsElements.forEach(detail => {
  detail.addEventListener("toggle", () => {
    if (detail.open) {
      detailsElements.forEach(other => {
        if (other !== detail) other.removeAttribute("open");
      });
    }
  });
});

// ---------- Floating Avatar ----------
const avatar = document.querySelector(".avatar");

window.addEventListener("scroll", () => {
  if (!avatar) return;

  const offset = window.scrollY * 0.08;
  avatar.style.transform = `translateY(${offset}px)`;
});

// ---------- Smooth Scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// ---------- Typing Effect ----------
const role = document.querySelector(".hero-role");

const roles = [
  "Front-End Developer",
  "Full-Stack Developer",
  "UI/UX Designer",
  "Mechatronic Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  if (!role) return;

  const currentRole = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    role.textContent = currentRole.slice(0, charIndex);
  } else {
    charIndex--;
    role.textContent = currentRole.slice(0, charIndex);
  }

  if (!deleting && charIndex === currentRole.length) {
    deleting = true;
    setTimeout(typeRole, 1800);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeRole, deleting ? 45 : 90);
}

typeRole();

// ---------- Hero Fade on Scroll ----------
const hero = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {
  if (!hero) return;

  const opacity = Math.max(1 - window.scrollY / 500, 0);
  hero.style.opacity = opacity;
  hero.style.transform = `translateY(${window.scrollY * 0.15}px)`;
});
/* ==========================================
   PREMIUM LIQUID GLASS UX (Append Below Existing JS)
========================================== */

/* ---------- Scroll Progress Bar ---------- */
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const pageHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  progressBar.style.width = `${(scrollTop / pageHeight) * 100}%`;
});

/* ---------- Apple Liquid Cursor ---------- */
const cursor = document.createElement("div");
cursor.className = "liquid-cursor";

const cursorRing = document.createElement("div");
cursorRing.className = "liquid-cursor-ring";

document.body.append(cursor, cursorRing);

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;

  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";

  requestAnimationFrame(animateRing);
}
animateRing();

/* Expand cursor over interactive items */
document.querySelectorAll(
  "a, button, .glass-card, .service-card, .journey-summary, .skill-chip"
).forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
    cursorRing.classList.add("active");
  });

  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
    cursorRing.classList.remove("active");
  });
});

/* ---------- Soft Glass Hover ---------- */

document.querySelectorAll(".glass-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.015)";
    card.style.transition = "0.35s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

/* ---------- Hero Avatar Parallax ---------- */

if (avatar) {
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 16;
    const y = (e.clientY / window.innerHeight - 0.5) * 16;

    avatar.style.transform = `translate(${x}px, ${y}px)`;
  });

  window.addEventListener("mouseleave", () => {
    avatar.style.transform = "translate(0,0)";
  });
}

/* ---------- Navbar Blur on Scroll ---------- */

const navbar = document.querySelector(".glass-nav");

window.addEventListener("scroll", () => {
  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.style.background = "rgba(8,17,25,0.45)";
    navbar.style.backdropFilter = "blur(36px)";
    navbar.style.borderColor = "rgba(255,255,255,0.12)";
  } else {
    navbar.style.background = "rgba(255,255,255,0.08)";
    navbar.style.backdropFilter = "blur(28px)";
  }
});

/* ---------- Accordion Icon Rotation ---------- */

detailsElements.forEach((detail) => {
  const icon = detail.querySelector(".icon i");

  detail.addEventListener("toggle", () => {
    if (!icon) return;

    if (detail.open) {
      icon.style.transform = "rotate(180deg)";
    } else {
      icon.style.transform = "rotate(0deg)";
    }

    icon.style.transition = "0.35s ease";
  });
});

/* ---------- Magnetic WhatsApp Button ---------- */

const whatsappBtn = document.querySelector(".whatsapp-float");

if (whatsappBtn) {
  whatsappBtn.addEventListener("mousemove", (e) => {
    const rect = whatsappBtn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    whatsappBtn.style.transform = `translate(${x * 0.18}px, ${
      y * 0.18
    }px) scale(1.08)`;
  });

  whatsappBtn.addEventListener("mouseleave", () => {
    whatsappBtn.style.transform = "translate(0,0) scale(1)";
  });
}

/* ---------- Remove Hero Emoji Badge ---------- */

const heroBadge = document.querySelector(".avatar-badge");
if (heroBadge) {
  heroBadge.textContent = "Victor Kamau";
}

/* ---------- Smooth Section Fade ---------- */

const allSections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.12 }
);

allSections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(60px)";
  section.style.transition = "1s ease";

  sectionObserver.observe(section);
});

/* ---------- Gentle Floating Animation for Service Icons ---------- */

document.querySelectorAll(".service-icon").forEach((icon, index) => {
  icon.animate(
    [
      { transform: "translateY(0px)" },
      { transform: "translateY(-8px)" },
      { transform: "translateY(0px)" }
    ],
    {
      duration: 2600 + index * 300,
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});

/* ---------- Cursor Hide on Mobile ---------- */

if ("ontouchstart" in window) {
  cursor.remove();
  cursorRing.remove();
}
