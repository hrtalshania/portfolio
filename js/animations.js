// ============================================================
// GSAP entrance & scroll animations.
// Runs only if GSAP/ScrollTrigger loaded from CDN.
// Without GSAP, scroll-effects.js fallback handles reveals.
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const forceMotion = window.location.search.includes("motion=force");

  if (!window.gsap) {
    console.log("[portfolio] animations NOT loaded (gsap missing) — check js/vendor/");
    return;
  }

  if (reduceMotion && !forceMotion) {
    window.__portfolioAnimationsActive = false;
    console.log("[portfolio] animations DISABLED — prefers-reduced-motion is ON in your OS/browser. " +
                "Open the page with ?motion=force to preview them anyway.");
    return;
  }

  window.__portfolioAnimationsActive = true;
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

  const triggers = ScrollTrigger.getAll().length;
  console.log(`[portfolio] animations active — GSAP ${gsap.version} · ${triggers} scroll triggers · reduced-motion: ${reduceMotion}`);
});
