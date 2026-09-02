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
