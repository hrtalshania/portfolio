// ============================================================
// Accent mode switcher — cycles the whole site between
// Monochrome (default) and vibrant color palettes.
// data-accent on <html>: mono | violet | emerald | amber
// ============================================================

const ACCENT_ORDER = ["mono", "violet", "emerald", "amber"];

const ACCENT_INFO = {
  mono:    { dot: "#a0a0a0", label: "Monochrome" },
  violet:  { dot: "#a78bfa", label: "Violet Night" },
  emerald: { dot: "#34d399", label: "Emerald Flow" },
  amber:   { dot: "#fbbf24", label: "Amber Heat" }
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
}

function updateAccentIcons(accent) {
  const info = ACCENT_INFO[accent];
  document.querySelectorAll(".accent-toggle").forEach(btn => {
    const dot = btn.querySelector(".accent-dot");
    if (dot) dot.style.background = info.dot;
    btn.title = "Color mode: " + info.label + " (click to change)";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateAccentIcons(getAccent());
});

window.toggleAccent = toggleAccent;
