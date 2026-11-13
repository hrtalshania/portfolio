"use strict";

// Generates a print-styled A4 HTML resume from data.json, then prints it
// to PDF with headless Edge/Chrome. Content mirrors resume/builder/data.json
// so the docx and PDF always say the same thing.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data.json"), "utf8")
);

const esc = (s) =>
  String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// https://www.linkedin.com/in/x/ -> linkedin.com/in/x (compact display text)
const compact = (u) => String(u).replace(/^https?:\/\//, "").replace(/\/$/, "");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${esc(data.name)} - Resume</title>
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: Calibri, "Segoe UI", Arial, sans-serif;
    font-size: 10pt; color: #1a1a1a; line-height: 1.35;
  }
  h1 {
    text-align: center; color: #1F3B63; font-size: 20pt;
    letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4pt;
  }
  .contact { text-align: center; color: #595959; font-size: 9pt; margin-bottom: 10pt; }
  .contact span + span::before { content: "  |  "; color: #b0b0b0; }
  h2 {
    color: #1F3B63; font-size: 10.5pt; letter-spacing: 1.2px;
    text-transform: uppercase; border-bottom: 1px solid #BFBFBF;
    padding-bottom: 2pt; margin: 10pt 0 5pt;
  }
  p { margin-bottom: 4pt; }
  /* ATS / print hardening: never strand a heading, never split a row or entry */
  h2 { break-after: avoid; page-break-after: avoid; break-inside: avoid; }
  .row, .proj, .skills p { break-inside: avoid; page-break-inside: avoid; }
  ul { break-inside: avoid; }
  a { color: #0563C1; text-decoration: none; }
  .row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1pt; }
  .row .title { font-weight: bold; font-size: 10pt; }
  .row .title a { color: #0563C1; }
  .row .when { color: #595959; font-size: 9pt; white-space: nowrap; margin-left: 12pt; }
  .sub { color: #595959; font-size: 9.5pt; margin-bottom: 4pt; }
  ul { list-style: none; margin: 0 0 4pt; padding: 0; }
  ul li { padding-left: 12pt; position: relative; margin-bottom: 2.5pt; }
  ul li::before { content: "\\2022"; position: absolute; left: 2pt; color: #595959; }
  .skills p { margin-bottom: 3pt; }
  .skills b { font-weight: bold; }
  .proj { margin-bottom: 6pt; }
  .proj .meta { color: #595959; font-size: 9pt; margin: 1pt 0 2pt; }
</style>
</head>
<body>
  <h1>${esc(data.name)}</h1>
  <p class="contact">${[
    data.contact.location ? `<span>${esc(data.contact.location)}</span>` : "",
    data.contact.phone ? `<span>${esc(data.contact.phone)}</span>` : "",
    data.contact.email ? `<span><a href="mailto:${esc(data.contact.email)}">${esc(data.contact.email)}</a></span>` : "",
    data.contact.linkedin ? `<span><a href="${esc(data.contact.linkedin)}">${esc(compact(data.contact.linkedin))}</a></span>` : "",
    data.contact.github ? `<span><a href="${esc(data.contact.github)}">${esc(compact(data.contact.github))}</a></span>` : "",
    data.contact.portfolio ? `<span><a href="${esc(data.contact.portfolio)}">${esc(compact(data.contact.portfolio))}</a></span>` : "",
  ].filter(Boolean).join("")}</p>

  ${data.objective ? `<h2>Summary</h2><p>${esc(data.objective)}</p>` : ""}

  ${data.education && data.education.length ? `<h2>Education</h2>` + data.education.map(e => `
    <div class="row"><span class="title">${esc(e.degree)}</span><span class="when">${esc(e.period)}</span></div>
    <p class="sub">${esc(e.institute)}${e.details ? "  -  " + esc(e.details) : ""}</p>
  `).join("") : ""}

  ${data.skills && data.skills.length ? `<h2>Technical Skills</h2><div class="skills">` +
    data.skills.map(s => `<p><b>${esc(s.category)}:</b> ${esc(s.items.join(", "))}</p>`).join("") +
  `</div>` : ""}

  ${data.experience && data.experience.length ? `<h2>Experience</h2>` + data.experience.map(x => `
    <div class="row"><span class="title">${esc(x.role)}${x.company ? " - " + esc(x.company) : ""}</span><span class="when">${esc(x.period)}</span></div>
    ${x.description ? `<ul><li>${esc(x.description)}</li></ul>` : ""}
    ${(x.subItems || []).map(s => `<ul><li><b>${esc(s.name)}:</b> ${esc(s.text)}</li></ul>`).join("")}
  `).join("") : ""}

  ${data.projects && data.projects.length ? `<h2>Projects</h2>` + data.projects.map(p => `
    <div class="proj">
      <div class="row"><span class="title">${p.link ? `<a href="${esc(p.link)}">${esc(p.title)}</a>` : esc(p.title)}</span><span class="when">${esc(p.period)}</span></div>
      ${p.description ? `<p>${esc(p.description)}</p>` : ""}
      ${p.tech && p.tech.length ? `<p class="meta"><b>Tech:</b> ${esc(p.tech.join(", "))}</p>` : ""}
    </div>
  `).join("") : ""}

  ${data.achievements && data.achievements.length ? `<h2>Achievements</h2><ul>` +
    data.achievements.map(a => `<li>${esc(a)}</li>`).join("") + `</ul>` : ""}
</body>
</html>`;

const htmlPath = path.join(__dirname, "resume.html");
fs.writeFileSync(htmlPath, html);
console.log("Wrote:", htmlPath);

// Print to PDF with headless Edge (falls back to Chrome).
const browsers = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];
const browser = browsers.find(p => fs.existsSync(p));
if (!browser) {
  console.error("No Edge/Chrome found for PDF printing.");
  process.exit(1);
}

const pdfPath = path.join(__dirname, "..", "Harshit_Talshania_Resume.pdf");
execFileSync(browser, [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${pdfPath}`,
  "file:///" + htmlPath.replace(/\\/g, "/"),
], { stdio: "ignore", timeout: 90000 });

console.log("Wrote:", pdfPath);
