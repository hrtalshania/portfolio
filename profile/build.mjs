#!/usr/bin/env node
// profile/build.mjs
// Reads master.json, validates platform limits, writes paste sheets to out/,
// and reports which platforms are behind the current fact version.
//
// Usage: node build.mjs
// No dependencies. Node 18+.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "out");
const TODAY = new Date().toISOString().slice(0, 10);

const master = JSON.parse(readFileSync(join(ROOT, "master.json"), "utf8"));
const P = master.platforms;

const errors = [];
const warnings = [];

const len = (s) => [...String(s ?? "")].length;

function checkLimit(label, text, max) {
  if (typeof text !== "string" || text.length === 0) return;
  const n = len(text);
  if (n > max) {
    errors.push(`${label}: ${n}/${max} — over by ${n - max}`);
  } else if (n > max * 0.95) {
    warnings.push(`${label}: ${n}/${max} — close to the limit`);
  }
}

function checkCount(label, arr, max) {
  if (!Array.isArray(arr)) return;
  if (arr.length > max) errors.push(`${label}: ${arr.length} items, max ${max}`);
}

// ---------------------------------------------------------------- validation

checkLimit("linkedin.headline", P.linkedin.profile.headline, 220);
checkLimit("linkedin.about", P.linkedin.profile.about, 2600);
P.linkedin.experience.forEach((e, i) =>
  checkLimit(`linkedin.experience[${i}].description`, e.description, 2000)
);
checkLimit("upwork.title", P.upwork.profile.title, 70);
checkLimit("upwork.overview", P.upwork.profile.overview, 5000);
checkLimit("github.bio", P.github.bio, 160);
checkLimit("x.bio", P.x.bio, 160);
checkLimit("instagram.bio", P.instagram.bio, 150);
checkLimit("instagram.name", P.instagram.name, 30);
checkLimit("facebook.bio", P.facebook.bio, 101);

checkCount("linkedin.skills", [...P.linkedin.skills.pinned, ...P.linkedin.skills.rest], 50);
checkCount("upwork.skills", P.upwork.skills, 20);
checkCount("upwork.portfolio", P.upwork.portfolio, 20);
checkCount("linkedin.openToWork.titles", P.linkedin.openToWork.titles, 20);

// Every URL used in copy must exist in links/facts. Catches stale or invented links.
const allowedUrls = new Set(
  [...Object.values(master.links), ...master.facts.projects.flatMap((p) => [p.url, p.caseStudy])]
    .filter(Boolean)
);

function walkStrings(node, path, out) {
  if (typeof node === "string") out.push([path, node]);
  else if (Array.isArray(node)) node.forEach((v, i) => walkStrings(v, `${path}[${i}]`, out));
  else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) walkStrings(v, `${path}.${k}`, out);
  }
  return out;
}

const platformStrings = walkStrings(master.platforms, "platforms", []);
const urlRe = /https?:\/\/[^\s)\]"'<>]+/g;
const allowedHosts = [/^https:\/\/img\.shields\.io\//];
for (const [path, text] of platformStrings) {
  for (const url of text.match(urlRe) ?? []) {
    if (allowedUrls.has(url)) continue;
    if (allowedHosts.some((re) => re.test(url))) continue;
    warnings.push(`unknown URL in ${path}: ${url}`);
  }
}

for (const name of ["linkedin", "upwork", "github", "x", "instagram", "facebook"]) {
  const p = P[name];
  if (p?.website && p.website !== master.links.portfolio) {
    warnings.push(`${name}.website differs from links.portfolio`);
  }
}

// Reused sentences: same wording on two platforms defeats the point.
const sentenceSources = new Map();
for (const name of ["linkedin", "upwork", "github", "x", "instagram", "facebook"]) {
  const p = P[name];
  if (!p?.enabled) continue;
  for (const [path, text] of walkStrings(p, name, [])) {
    for (const raw of text.split(/(?<=[.!?])\s+/)) {
      const s = raw.replace(/\s+/g, " ").trim();
      if (s.length < 60) continue;
      const key = s.toLowerCase().replace(/[^a-z0-9 ]/g, "");
      if (!sentenceSources.has(key)) sentenceSources.set(key, []);
      sentenceSources.get(key).push(path);
    }
  }
}
for (const [, places] of sentenceSources) {
  const unique = [...new Set(places.map((p) => p.split(".")[0]))];
  if (unique.length > 1) {
    warnings.push(`same sentence used on ${unique.join(" + ")}: "${places[0]}"`);
  }
}

// Facts must match the per-platform copies (dates, schools, employers).
const factEducation = master.facts.education;
const factExperience = master.facts.experience;

for (const [name, list] of [
  ["linkedin", P.linkedin.education ?? []],
  ["upwork", P.upwork.education ?? []],
]) {
  for (const e of list) {
    const f = factEducation.find((x) => x.school === e.school);
    if (!f) warnings.push(`${name}: education "${e.school}" is not in facts`);
    else if (f.start !== e.start || f.end !== e.end)
      warnings.push(`${name}: dates for ${e.school} differ from facts`);
  }
}

for (const [name, list] of [
  ["linkedin", P.linkedin.experience ?? []],
  ["upwork", P.upwork.employment ?? []],
]) {
  for (const item of list) {
    const f = factExperience.find((x) => x.company === item.company);
    if (!f) warnings.push(`${name}: employer "${item.company}" is not in facts`);
    else if (f.start !== item.start)
      warnings.push(`${name}: start date for ${item.company} differs from facts`);
  }
}

// ------------------------------------------------------------------ rendering

const fence = (text, lang = "text") => "```" + lang + "\n" + text + "\n```";

function header(title, platform, note) {
  const p = P[platform];
  const lines = [`# ${title} — paste sheet`, ""];
  lines.push(
    `Generated from \`profile/master.json\` v${master.version} (${master.updated}) on ${TODAY}.`,
    `Do not edit this file. Edit \`master.json\`, then run \`node build.mjs\`.`
  );
  if (!p.enabled) lines.push("", `> **DRAFT — disabled in master.json.** Nothing to paste yet.`);
  if (note) lines.push("", note);
  lines.push("", "After pasting, set `platforms." + platform + ".syncedVersion` to `" + master.version + "` and `lastSynced` to today in `master.json`.", "");
  return lines.join("\n");
}

function field(n, label, text, limit, lang) {
  const c = limit ? `${len(text)} / ${limit}` : `${len(text)} chars`;
  return `## ${n}. ${label} (${c})\n\n${fence(text, lang)}\n`;
}

function subfield(label, text, limit, lang) {
  const c = limit ? `${len(text)} / ${limit}` : `${len(text)} chars`;
  return `**${label}** (${c})\n\n${fence(text, lang)}\n`;
}

const clean = (s) => s.replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";

function bullets(items, render = (x) => `- ${x}`) {
  return items.map(render).join("\n");
}

// --- LinkedIn ---------------------------------------------------------------
function renderLinkedIn() {
  const { profile, banner, experience, education, projects, featured, skills, openToWork, services } =
    P.linkedin;
  const out = [];
  out.push(
    header("LinkedIn", "linkedin", [
      "Work top to bottom. P0 fields are what a recruiter sees before scrolling.",
      "",
      "**Manual steps:** photo, banner, location, industry, and the contact-info website field.",
    ].join("\n"))
  );

  out.push(`## 1. Profile basics (you set these)\n`);
  out.push(
    bullets([
      `Name: ${master.identity.name}`,
      `Location: ${profile.location}`,
      `Industry: ${profile.industry}`,
      `Custom URL: ${profile.customUrl}`,
      `Contact email: ${profile.contactEmail}`,
      `Website: ${profile.website}`,
    ])
  );
  out.push("");

  out.push(field(2, "Headline", profile.headline, 220));
  out.push("");

  out.push(field(3, "About", profile.about, 2600));
  out.push("");

  out.push(`## 4. Experience\n`);
  experience.forEach((e, i) => {
    const meta = [e.title, e.company, e.employmentType, e.location, `${e.start} – ${e.end}`]
      .filter(Boolean)
      .join(" · ");
    out.push(`### ${i + 1}) ${meta}\n`);
    out.push(subfield("Description", e.description, 2000));
    out.push(subfield("Skills for this role", e.skills.join(", ")));
    out.push("");
  });

  out.push(`## 5. Education\n`);
  education.forEach((e, i) => {
    out.push(
      bullets([
        `School: ${e.school}`,
        `Degree: ${e.degree}`,
        `Dates: ${e.start} – ${e.end}`,
        `Grade: ${e.grade || "leave blank"}`,
        `Description: ${e.description || "leave blank"}`,
      ]).split("\n").join("\n")
    );
    out.push("");
  });

  out.push(`## 6. Projects section\n`);
  projects.forEach((p, i) => {
    out.push(`### Project ${i + 1}: ${p.title}\n`);
    out.push(subfield("Description", p.description));
    out.push(p.url ? `URL: ${p.url}\n` : "URL: leave blank — code on request.\n");
  });

  out.push(`## 7. Featured\n`);
  out.push(
    "Remove anything currently in Featured first, then add in this order. If a preview looks wrong, upload a screenshot as media with the title instead of a bare link.\n"
  );
  out.push(
    bullets(featured, (f) => `- **${f.title}** — ${f.url}${f.note ? ` _(${f.note})_` : ""}`)
  );
  out.push("");

  out.push(`## 8. Skills\n`);
  out.push(`**Pin these three (top of profile):** ${skills.pinned.join(", ")}\n`);
  out.push(`**Add in this order:**\n\n${bullets(skills.rest, (s) => `- ${s}`)}\n`);

  out.push(`## 9. Open to work\n`);
  out.push(`Job titles: ${openToWork.titles.join(", ")}\n`);
  out.push(`Locations:\n\n${bullets(openToWork.locations)}`);
  out.push("");
  out.push(`Job types: ${openToWork.types.join(", ")}`);
  out.push("");
  out.push(`_${openToWork.note}_`);
  out.push("");

  if (services.enabled) {
    out.push(`## 10. Services\n`);
    out.push(`**Title:** ${services.title}\n`);
    out.push(`**Description:**\n\n${fence(services.description)}\n`);
    out.push(`**Services to list:**\n\n${bullets(services.services)}\n`);
  }

  out.push(`## 11. Banner spec (you create this)\n`);
  out.push(`${banner.size}\n\n${fence(banner.spec)}\n`);
  out.push(`## 12. Check before you close the tab\n`);
  out.push(
    bullets([
      "Headline and About saved, no LinkedIn auto-formatting mangled the line breaks.",
      "All three client projects visible under Sky9 with the confidentiality line intact.",
      "Contact info shows the portfolio URL, not a dead link.",
      "Featured cards open the right pages.",
      "Open-to-work visibility set to recruiters only.",
    ])
  );
  out.push("");
  return clean(out.join("\n"));
}

// --- Upwork -----------------------------------------------------------------
function renderUpwork() {
  const { profile, category, skills, employment, education, languages, linkedAccounts, portfolio, projectCatalog } =
    P.upwork;
  const out = [header("Upwork", "upwork", "**One profile now.** Specialized Profiles were retired in May 2026, so this profile carries both .NET and AI/automation work.")];
  out.push("");

  out.push(field(1, "Professional title", profile.title, 70));
  out.push("");

  out.push(`## 2. Rate and availability (you set these)\n`);
  out.push(
    bullets([
      `Hourly rate: $${profile.hourlyRate}`,
      `Internal floor: $${profile.rateFloor} — ${profile.rateNote}`,
      `Availability: ${profile.availability} — ${profile.availabilityNote}`,
      `Response time: ${profile.responseTime}`,
      `Location: ${master.identity.location}`,
      `Timezone: ${master.identity.timezone}`,
    ])
  );
  out.push("");

  out.push(field(3, "Overview", profile.overview, 5000));
  out.push("");

  out.push(`## 4. Category\n`);
  out.push(
    bullets([
      `Main category: ${category.main}`,
      `Subcategories: ${category.sub.join(", ")}`,
      `Note: ${category.note}`,
    ])
  );
  out.push("");

  out.push(`## 5. Skills (${skills.length} / 20) — paste in this order\n`);
  out.push(bullets(skills, (s, i2) => `${String(i2 + 1).padStart(2, "0")}. ${s}`));
  out.push("");

  out.push(`## 6. Employment history\n`);
  employment.forEach((e, i) => {
    out.push(`### ${i + 1}) ${e.title} — ${e.company}\n`);
    out.push(`Location: ${e.location || "leave blank"} · ${e.start} – ${e.end}\n`);
    out.push(subfield("Description", e.description));
  });

  out.push(`## 7. Education\n`);
  education.forEach((e) => {
    out.push(
      bullets([
        `School: ${e.school}`,
        `Degree: ${e.degree}`,
        `Dates: ${e.start} – ${e.end}`,
        `Description: ${e.description}`,
      ])
    );
    out.push("");
  });

  out.push(`## 8. Languages\n`);
  out.push(bullets(languages, (l) => `- ${l.language} — ${l.level}`));
  out.push("");

  out.push(`## 9. Linked accounts\n`);
  out.push(bullets(linkedAccounts, (a) => `- ${a.name}: ${a.url}`));
  out.push("");

  out.push(`## 10. Portfolio items\n`);
  out.push("Add in this order. Use the case-study page as the reference link where there is no live site.\n");
  portfolio.forEach((p, i) => {
    out.push(`### Item ${i + 1}: ${p.title}\n`);
    out.push(subfield("Description", p.description));
    out.push(`Skills: ${p.skills.join(", ")}\n`);
    out.push(p.url ? `URL: ${p.url}\n` : "URL: none — say code on request.\n");
  });

  out.push(`## 11. Project catalog (later)\n`);
  out.push(`${projectCatalog.note}\n`);
  out.push("");
  out.push(`## 12. Intro video\n`);
  out.push(`Script: \`out/upwork-video-script.md\` — ${P.upwork.video?.recorded ? "recorded" : "not recorded yet"}.\n`);
  return clean(out.join("\n"));
}

// --- GitHub -----------------------------------------------------------------
function renderGitHub() {
  const g = P.github;
  const out = [header("GitHub", "github", "The README lives in a public repo named exactly `hrtalshania`. Create it, add `README.md`, paste.")];
  out.push("");

  out.push(`## 1. Create the profile repo (you do this)\n`);
  out.push(
    bullets([
      "New repository → name: `hrtalshania` (must match the username exactly).",
      "Visibility: public. Tick “Add a README file”.",
      "The README then renders at the top of github.com/hrtalshania.",
    ])
  );
  out.push("");

  out.push(field(2, "Bio", g.bio, 160));
  out.push("");
  out.push(`## 3. Website field\n\n${g.website}\n`);
  out.push("");
  out.push(field(4, "README.md", g.readme, null, "markdown"));
  out.push("");

  out.push(`## 5. Pinned repositories\n`);
  if (g.pinned.length === 0) {
    out.push(`${g.pinNote}\n`);
    out.push(bullets(g.pinCandidates, (c) => `- \`${c.repo}\` — ${c.reason}`));
  } else {
    out.push(bullets(g.pinned, (r) => `- ${r}`));
  }
  out.push("");

  out.push(`## 6. Repo metadata (optional)\n`);
  out.push(bullets(g.repoMeta, (r) => `- ${r.repo}: "${r.description}" — topics: ${r.topics.join(", ")}`));
  out.push("");
  return clean(out.join("\n"));
}

// --- Social -----------------------------------------------------------------
function renderX() {
  const x = P.x;
  const out = [header("X", "x")];
  out.push("");
  out.push(`## 1. Handle\n\n${x.handle || "choose one — keep it close to hrtalshania"}\n`);
  out.push(field(2, "Name", x.name));
  out.push(field(3, "Bio", x.bio, 160));
  out.push(`## 4. Location\n\n${x.location}\n`);
  out.push(`## 5. Website\n\n${x.website}\n`);
  out.push(field(6, "Pinned post", x.pinnedPost));
  out.push(`## 7. Note\n\n${x.note}\n`);
  return clean(out.join("\n"));
}

function renderInstagram() {
  const ig = P.instagram;
  const out = [header("Instagram", "instagram")];
  out.push("");
  out.push(`## 1. Handle\n\n${ig.handle || "choose one — keep it close to hrtalshania"}\n`);
  out.push(field(2, "Name field", ig.name, 30));
  out.push(field(3, "Bio", ig.bio, 150));
  out.push(`## 4. Website\n\n${ig.website}\n`);
  out.push(`## 5. Category\n\n${ig.category}\n`);
  out.push(`## 6. Highlights\n\n${bullets(ig.highlights)}\n`);
  out.push(`## 7. Note\n\n${ig.note}\n`);
  return clean(out.join("\n"));
}

function renderFacebook() {
  const fb = P.facebook;
  const out = [header("Facebook", "facebook")];
  out.push("");
  out.push(field(1, "Bio", fb.bio, 101));
  out.push(`## 2. Website\n\n${fb.website}\n`);
  out.push(`## 3. Note\n\n${fb.note}\n`);
  return clean(out.join("\n"));
}

// --- Upwork video ------------------------------------------------------------
function renderVideo() {
  const v = P.upwork.video;
  if (!v) return null;

  const words = (segs) => segs.reduce((n, s) => n + s.text.trim().split(/\s+/).length, 0);
  const script = (segs) => segs.map((s) => `**${s.time} · ${s.beat}**\n\n${s.text}`).join("\n\n");

  const out = [];
  out.push(`# Upwork intro video — script`);
  out.push("");
  out.push(
    `Generated from \`profile/master.json\` v${master.version} on ${TODAY}. Read from this file while recording.`
  );
  out.push("");
  out.push(`**Status:** ${v.recorded ? "recorded" : "not recorded yet"}`);
  out.push("");
  out.push(`Cue words for the sticky note beside the lens: **${v.cues.join(" · ")}**`);
  out.push("");

  out.push(`## Format and compliance`);
  out.push("");
  out.push(bullets(v.spec));
  out.push("");

  out.push(`## 75-second script (~${words(v.script75)} words)`);
  out.push("");
  out.push(`Read slightly slower than normal. The timings are guidance, not a stopwatch.`);
  out.push("");
  out.push(script(v.script75));
  out.push("");

  out.push(`## 45-second cut (~${words(v.script45)} words)`);
  out.push("");
  out.push(`Use this if the long take feels slow on playback. Record the 75s first and cut.`);
  out.push("");
  out.push(script(v.script45));
  out.push("");

  out.push(`## Alternate lines`);
  out.push("");
  out.push(`**Hooks**\n\n${bullets(v.alternates.hooks)}`);
  out.push("");
  out.push(`**Chess lines**\n\n${bullets(v.alternates.chess)}`);
  out.push("");
  out.push(`**Call to action**\n\n${bullets(v.alternates.ctas)}`);
  out.push("");

  out.push(`## Do not say`);
  out.push("");
  out.push(bullets(v.dontSay, (s) => `- "${s}"`));
  out.push("");

  out.push(`## Delivery checklist`);
  out.push("");
  out.push(bullets(v.delivery));
  out.push("");
  return clean(out.join("\n"));
}

// --- status -----------------------------------------------------------------
function pendingKeys(syncedVersion) {
  return master.changelog
    .filter((c) => c.version > syncedVersion)
    .flatMap((c) => c.keys)
    .filter((k) => k !== "initial");
}

function renderStatus() {
  const rows = [];
  for (const [key, p] of Object.entries(P)) {
    const stale = p.syncedVersion < master.version;
    const state =
      p.syncedVersion === 0 ? "never synced" : stale ? `behind (v${p.syncedVersion})` : "current";
    rows.push(
      `| ${key} | ${p.enabled ? "yes" : "draft only"} | ${p.syncedVersion} | ${state} | ${p.lastSynced || "—"} | \`out/${key === "github" ? "github-readme" : key}.md\` |`
    );
  }

  const out = [];
  out.push(`# Profile sync status`);
  out.push("");
  out.push(`Master version **v${master.version}** · updated ${master.updated} · generated ${TODAY}`);
  out.push("");
  out.push("| Platform | Enabled | Synced version | State | Last synced | Sheet |");
  out.push("|---|---|---|---|---|---|");
  out.push(...rows);
  out.push("");
  out.push(`## What to do next`);
  out.push("");
  const actions = [];
  for (const [key, p] of Object.entries(P)) {
    if (!p.enabled) continue;
    if (p.syncedVersion < master.version) {
      const keys = pendingKeys(p.syncedVersion);
      actions.push(
        `- **${key}** — paste from the sheet${keys.length ? ` (missed: ${keys.join(", ")})` : ""}, then set \`syncedVersion: ${master.version}\`.`
      );
    }
  }
  out.push(actions.length ? actions.join("\n") : "- Everything is current. Nothing to paste.");
  out.push("");
  out.push(`## Checks`);
  out.push("");
  if (!errors.length && !warnings.length) {
    out.push("- All limits pass. No duplicate sentences across platforms. All URLs known.");
  } else {
    for (const e of errors) out.push(`- **ERROR** ${e}`);
    for (const w of warnings) out.push(`- warn ${w}`);
  }
  out.push("");
  out.push(`## Extra assets`);
  out.push("");
  out.push(
    `- Upwork intro video — ${P.upwork.video?.recorded ? "recorded" : "not recorded"}. Script: \`out/upwork-video-script.md\``
  );
  out.push("");
  out.push(`## Known gaps (not blocking)`);
  out.push("");
  out.push(
    [
      "- The portfolio and case-study pages have no Open Graph tags, so link previews on LinkedIn and Upwork look plain. Adding static `og:title`, `og:description`, and an image would improve every card.",
      "- `ruhicabs.duckdns.org` has the browser title “Ruhi Cabs – Admin”. Change it to a customer-facing title before featuring it.",
      "- All repos are private, so GitHub pinning waits on the public/secret-scrub decision.",
      "- No project screenshots yet. Featured/LinkedIn media cards need them.",
      "- `README.md` in the repo root still says the live site is a TODO.",
    ].join("\n")
  );
  out.push("");
  return clean(out.join("\n"));
}

// -------------------------------------------------------------------- write

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const files = {
  "linkedin.md": renderLinkedIn(),
  "upwork.md": renderUpwork(),
  "github-readme.md": renderGitHub(),
  "x.md": renderX(),
  "instagram.md": renderInstagram(),
  "facebook.md": renderFacebook(),
};

const video = renderVideo();
if (video) files["upwork-video-script.md"] = video;

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(OUT, name), content, "utf8");
}
writeFileSync(join(ROOT, "STATUS.md"), renderStatus(), "utf8");

// ------------------------------------------------------------------- report

console.log(`profile: master v${master.version} (${master.updated})`);
for (const [name, content] of Object.entries(files)) {
  console.log(`  wrote out/${name} (${content.split("\n").length} lines)`);
}
console.log("  wrote STATUS.md");

if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  ERROR ${e}`);
}
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  warn  ${w}`);
}
if (!errors.length && !warnings.length) console.log("\nAll checks pass.");

process.exit(errors.length ? 1 : 0);
