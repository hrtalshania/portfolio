// ============================================================
// Accent mode switcher — cycles the whole site between
// Monochrome (default) and vibrant color palettes.
// data-accent on <html>: mono | violet | emerald | amber
// ============================================================

const ACCENT_ORDER = ["mono", "violet", "emerald", "amber"];

const ACCENT_INFO = {
  mono:    { label: "Monochrome" },
  violet:  { label: "Violet Night" },
  emerald: { label: "Emerald Flow" },
  amber:   { label: "Amber Heat" }
};

function getAccent() {
  const a = document.documentElement.getAttribute("data-accent");
  return ACCENT_ORDER.includes(a) ? a : "mono";
}

function toggleAccent() {
  const next = ACCENT_ORDER[(ACCENT_ORDER.indexOf(getAccent()) + 1) % ACCENT_ORDER.length];
  applyAccent(next);
}

function applyAccent(accent) {
  document.documentElement.setAttribute("data-accent", accent);
  try { localStorage.setItem("accent", accent); } catch (e) { /* private mode */ }
  updateAccentIcons(accent);

  // Brief color-merge transition, then clear so hover animations stay untouched.
  document.body.classList.add("palette-transitioning");
  clearTimeout(applyAccent._t);
  applyAccent._t = setTimeout(() => document.body.classList.remove("palette-transitioning"), 400);
}

function updateAccentIcons(accent) {
  const info = ACCENT_INFO[accent];
  document.querySelectorAll(".accent-toggle").forEach(btn => {
    // Color indicator is pure CSS (gradient bar using --accent / --accent-2).
    btn.title = "Color mode: " + info.label + " (click to change)";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateAccentIcons(getAccent());
});

window.toggleAccent = toggleAccent;
