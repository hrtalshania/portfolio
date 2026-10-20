// ============================================================
// GSAP entrance & scroll animations.
// Runs only if GSAP/ScrollTrigger loaded from CDN.
// Without GSAP, scroll-effects.js fallback handles reveals.
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  if (!window.gsap) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // ---- Hero entrance timeline ----
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".hero-photo",     { y: 40, scale: 0.92, opacity: 0, duration: 0.9 })
    .from(".hero-title",     { y: 44, opacity: 0, duration: 0.85 }, "-=0.6")
    .from(".hero-subtitle",  { y: 26, opacity: 0, duration: 0.6 }, "-=0.55")
    .from(".hero-description", { y: 26, opacity: 0, duration: 0.6 }, "-=0.5")
    .from(".hero-tagline",   { y: 26, opacity: 0, duration: 0.6 }, "-=0.5")
    .from(".hero-cta .btn",  { y: 26, opacity: 0, duration: 0.5, stagger: 0.12 }, "-=0.5");

  // ---- Section headers reveal ----
  gsap.utils.toArray(".section-header").forEach(header => {
    gsap.from(header, {
      y: 34, opacity: 0, duration: 0.75,
      scrollTrigger: { trigger: header, start: "top 86%" }
    });
  });

  // ---- Card grids / lists stagger in ----
  [
    "#services-grid .service-card",
    "#projects-grid .project-card",
    "#more-projects-grid .more-project-card",
    "#tech-grid .tech-category",
    "#experience-list .experience-card",
    "#education-list .education-card",
    "#approach-content .approach-step"
  ].forEach(selector => {
    const items = gsap.utils.toArray(selector);
    if (!items.length) return;
    gsap.from(items, {
      y: 32, opacity: 0, duration: 0.65, stagger: 0.09,
      ease: "power2.out",
      scrollTrigger: {
        trigger: items[0].parentElement,
        start: "top 82%"
      }
    });
  });

  // ---- Philosophy / about content ----
  const about = document.querySelector("#about-content");
  if (about) {
    gsap.from(about.children, {
      y: 26, opacity: 0, duration: 0.7, stagger: 0.15,
      scrollTrigger: { trigger: about, start: "top 82%" }
    });
  }
});
