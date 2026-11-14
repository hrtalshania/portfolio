document.addEventListener('DOMContentLoaded', function() {
  initScrollEffects();
});

function initScrollEffects() {
  handleNavbarScroll();
  initSmoothScroll();
  initRevealAnimations();
}

function handleNavbarScroll() {
  const navbar = document.querySelector('#desktop-nav') || document.querySelector('#hamburger-nav');

  // JS only toggles a class — the color itself comes from CSS variables
  // (var(--bg-primary)), so the navbar follows palette + theme switches instantly.
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('nav-scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initRevealAnimations() {
  // Let GSAP (animations.js) take over when available.
  if (window.gsap) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .project-card, .approach-step, .tech-category, .experience-card, .education-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll('.revealed, .service-card, .project-card, .approach-step, .tech-category, .experience-card, .education-card').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 100);
}

window.toggleMenu = function(force) {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');

  if (!menu || !icon) return;
  const open = typeof force === 'boolean' ? force : !menu.classList.contains('active');
  menu.classList.toggle('active', open);
  icon.classList.toggle('active', open);
  icon.setAttribute('aria-expanded', String(open));
};

// Close the mobile menu when clicking outside of it, or with Escape.
document.addEventListener('click', function(e) {
  const menu = document.querySelector('.menu-links');
  if (!menu || !menu.classList.contains('active')) return;
  if (e.target.closest('.hamburger-menu')) return; // inside: clicks are handled by their own handlers
  window.toggleMenu(false);
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') window.toggleMenu(false);
});

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('#hero');
  if (hero) {
    hero.style.background = `radial-gradient(ellipse at top, var(--bg-secondary) 0%, var(--bg-primary) ${Math.min(70 + scrolled * 0.1, 100)}%)`;
  }
});