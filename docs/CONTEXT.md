# CONTEXT.md — Working Notes & Decision Log

> Purpose-of-file: capture the reasoning behind this portfolio so that anyone (a mentor, a reviewer, a future AI agent, or future me) opening this repo understands what is here, why it is this way, and what remains to be done. Updated as work progresses; dated entries, newest at the bottom.

---

## Project decisions (2026-10-20, planning + first build)

### Positioning
- **Primary identity:** Software Developer, .NET-focused (ASP.NET Core Minimal APIs, Angular, Blazor).
- Earlier stacks (PHP, MERN, Python, Capacitor) are shown honestly as *earlier / auxiliary experience* — depth in .NET first, breadth second.
- Rationale: remote-job reviewers and freelance clients need one clear claim, backed by real evidence.
- Black & white minimal theme is intentional — no animation tricks, no fake skill-percentage bars.

### Project showcase strategy (how many & which)
- **3 featured projects** with full problem/solution cards: ArenaHub, Trading Dashboard, BlazingAuth.
- **Compact "More Projects" section** (one-liners): Slack/Discord/Telegram bridge, Ayurbeat (PHP), MERN Student Management, Capacitor mobile app.
- Cab booking is in progress → mentioned only in text, no card yet until stable.
- **DownWind Aviation is company work** at Sky9 IT Craft Pvt. Ltd. — shown in the Experience section only (tech + role, never the codebase), since the product belongs to the company/client.

### Private repos policy
- Project repos are private by default. Strategy until they go public:
  - Featured cards link with label "Code (on request)" (GitHub) + live demo where available (ArenaHub is already deployed: Netlify frontend / Render API).
  - Public repo + scrubbed secrets is preferred eventually for ArenaHub, Trading Dashboard, BlazingAuth.
  - GitHub has no "read-only for everyone" mode on private repos; options are public repo, invite a specific reviewer as read collaborator, or demo + detailed README.
- DownWind / cab-booking repos stay private permanently (company IP).

### Data flow of the site
- All content lives in `js/data.js`; `render.js` draws it into the page. Edit one file, whole site updates. No framework or build step.
- Search `TODO` in `js/data.js` for every placeholder to fill.

### Resume
- Resume is generated: `resume/builder/build.js` (Node + `docx`) reads `resume/builder/data.json` → writes `resume/Harshit_Talshania_Resume.docx`. The commit-able artifact is the PDF `resume/Harshit_Talshania_Resume.pdf`, linked from the site nav.
- `data.json` was rewritten from the student-era version (Java/PHP/"learning React") to the current .NET-focused profile. The stale docx was renamed/regenerated; `*.docx` is gitignored.
- Repo is intended to stay **private**, so phone/email live in `data.json` — revisit if the repo ever goes public.

### Housekeeping
- `_drafts/` and the tutorial zip/extraction are kept locally but excluded from git (see `.gitignore`).
- Unused tutorial images were removed from `assets/`; the folder stays for future real screenshots.
- Company reference: https://sky9itcraft.com/ (Sky9 IT Craft Pvt. Ltd., Rajkot).

---

## 2026-11-13 — Engineer identity + humanized content + project case-study pages

- **Identity change:** "Software Developer" → **"Software Engineer"** across meta, hero, experience, footer, and resume. Language lists removed from the pitch (hero subtitle is now capability based); stack names remain only as factual history in the Experience section and resume.
- **Humanization pass:** every paragraph in `js/data.js` rewritten in plain first-person prose, no em-dash chains, no listicle rhythm (hero, services, approach, philosophy, about, contact, all project texts).
- **Services expanded to 7:** added Cloud Setup & Deployment (Oracle VM, Netlify/Render, Azure), AI Solutions & Integrations, Test Automation (Playwright with automated screenshot capture), Learning & Problem Solving. New icons added to `getIcon`: cloud, robot, test, compass.
- **Project case-study pages:** new template `projects/index.html?id=<slug>` rendered by `js/project-detail.js` (styles in `css/project.css`). One template, all content still in `data.js`, no build step, works on Netlify. Every featured and secondary project now has: problem, solution, features, built-with, hosting notes, learnings, source-code policy text.
- **Home project cards are now summary cards** ("Read case study" + "Live site") instead of cramming problem/solution/features in. Live-link cards show the free-tier note ("backend sleeps, allow 5–10 min to boot").
- **Live links added:** ArenaHub `https://staging-arenahub.netlify.app/profile` (Netlify + Render, free tier), Algo Trade `https://algo-trade-by-hrt.netlify.app/login` (Netlify + Render, free tier), Cab Booking `https://ruhicabs.duckdns.org/` (self hosted on Oracle Cloud free tier VM, DuckDNS domain).
- **Cab Booking promoted to a featured project** — showcases self-hosting/VM/DNS experience. Bridge Messaging given a full case study (Telegram bot → Discord → bridge → Slack client in .NET MAUI, vibe-coded with AI agents, in progress). Ayurbeat / Student Management / Capacitor stay as compact one-liners on the home page but each has a detail page.
- **Private repos policy (site side):** private repos show "Code on request"; live sites carry the proof. Detail pages include an explicit source-code note: repos stay private for security, walkthrough/access on request.
- **Contact:** real GitHub (`hrtalshania`), LinkedIn (`harshit-talshania`), email `hrtalshania@gmail.com`. Subtitle now "Looking for a software engineer? Let's talk."
- **Experience:** Sky9 dates filled (Aug 2024 · Present, Rajkot, on-site), internship start story added. **Education corrected:** BE Computer Engineering at GTU (2022–2025) and Diploma at A.V. Parekh Technical Institute, Rajkot (2019–2022, Grade A). The old GEC Rajkot entry was wrong.
- **Technology Experience:** added the "AI era" note above the grid — specific stacks matter less, core principles and building blocks matter more (`data.technologiesNote`, rendered into `#tech-note`).
- **Resume:** `resume/builder/data.json` updated to match (identity, dates, education, live links, cab booking + bridge projects, Playwright/self-hosting skills). `Harshit_Talshania_Resume.docx` regenerated with `node build.js`. **PDF not regenerated** — no Word/LibreOffice on this machine; open the docx in Word/Google Docs and export to `resume/Harshit_Talshania_Resume.pdf` manually.
- **Icons kept as-is** (user decision). **Images/screenshots deferred** (user will handle later).
- **Next phase (not started):** mirror these projects onto the GitHub profile README and LinkedIn featured section.

---

## 2026-11-13 (2) — UI consistency fixes after user review

- **Hero tagline is now a link** to https://sky9itcraft.com/ (`hero.taglineUrl` in data.js, rendered by `renderHero`).
- **Free-tier live note moved off home cards** — it shows only on the case-study page; home cards keep the small "Live site" pill.
- **Theme mismatch root cause fixed:** `index.html` only restored the saved accent before first paint, not the saved theme, so the home page could open dark while the detail page opened light. Both pages now restore `theme` + `accent` with identical pre-paint scripts.
- **Image gallery wired (images added later):** per-project folder `assets/projects/<slug>/`, filenames listed in each project's `gallery: []` in data.js (empty = section hidden, no limit). Detail pages render a "Screenshots" grid + lightbox (prev/next, keyboard, Esc). Instructions in `assets/projects/README.md`.
- **Dash bars and arrow bullets removed site-wide:** the small `—` bar before section headings (home cards + case study) and the `→` list markers (project lists, experience lists) replaced with plain headings and dot bullets (palette accent colors now ride on `::marker`).
- **Detail page layout:** container narrowed to 960px so the article fills the page without huge side margins; back link larger; detail nav padding now matches the home nav (20px 40px).
- **"Read more" underline removed** on More Projects cards (hover color instead).
- **Source-code note links "reach out"** to the contact section (`../index.html#contact`).
- **"Open live site" big button replaced** with the same small icon pill used on home cards; the GitHub link on detail pages uses an icon too (no text arrows).

---

## 2026-11-13 (3) — Section restructure + gallery layout + hero identity

- **Philosophy section removed.** It duplicated the Engineering Approach ideas (evidence/verification, AI-as-leverage appeared in both). Its 3 strongest, non-overlapping principles folded into the About section as a "How I think" list (`about.principles` in data.js). The home page lost one section and gained honesty.
- **Section order restructured into the recruiting funnel:** Hero → What I Do → Projects → More Projects → Experience → Technology → Engineering Approach → Education → About → Contact. Proof (projects) now comes before trust content (approach). Nav link order matches the page order.
- **AI-era tech note stays in the Technology section** (it reframes the grid below), trimmed so it no longer overlaps the About principles.
- **Full name added to the hero:** "Hi, I'm Harshit Talshania" eyebrow line above the headline (`hero.name` in data.js, in the GSAP entrance timeline). Phone number deliberately kept off the site (spam scraping; resume carries it).
- **Subtle hero photo hover lift** (CSS transform, no JS hover machinery).
- **Gallery layout reworked:** first 2 images large, next 3 small, everything beyond 5 collapses into a "+N more" tile. Lightbox still shows all images.

---

## 2026-11-13 (4) — Multi-client experience + fresh resume PDF

- **All three Sky9 client projects now shown with real names** (user decision): DownWind Aviation (aircraft ownership + flight record management, techlog, document uploads, expense tracking, MFA, GoCardless payments), Presort EMS (US enterprise mailing platform, legacy RDLC PDF generation, payment/invoice/reconciliation flows), Country Style (UK waste management, admin panel with bookings/invoices/reports/analysis, interactive site map, charts across collection/sorting/material waste on multiple SQL servers + Azure). Rendered as compact one-liners with tech tags in a "Client work" block inside the Sky9 experience card (`experience[].clientProjects` in data.js) — no metrics, no inflation, confidentiality note updated to cover all three.
- Payments corrected: DownWind uses **GoCardless** (old text said generic "payment gateway flows").
- **Hero description extended** with the UI line ("I also enjoy the UI side: building clean, responsive interfaces in Angular and Blazor...").
- **Resume fully regenerated from current site content:** `resume/builder/data.json` synced (identity, 3 client projects as sub-bullets, education, live links, skills incl. GoCardless/RDLC/Playwright/self-hosting). `build.js` extended to render `subItems`. New `resume/builder/build-pdf.js` generates a print-styled A4 HTML resume and prints it to PDF via headless Edge — no LibreOffice/Word needed on this machine. **Fresh `Harshit_Talshania_Resume.pdf` committed** (verified visually via headless screenshot).
- Resume workflow now: `node build.js` (docx) + `node build-pdf.js` (PDF), both from the same `data.json`.

---

## 2026-11-13 (5) — ATS-proof resume rebuild + gallery/hero fixes

- **Resume redesigned as ATS-proof, in "resume register" not site prose** (design rule: site owns the story, resume owns the compressed claim — same facts, rewritten per audience, never copy-pasted). `data.json` rewritten: "Objective" → **"Summary"**; Class X removed (starts at Diploma); "Independent Developer - Personal Products" entry removed (duplicated the Projects section); Languages section removed; text entries rewritten verb-led and keyword-dense.
- **Contact header all real hyperlinks**: email (`mailto:`), LinkedIn, GitHub, plus portfolio URL `https://hrtalshania.github.io/portfolio/`. Display text compacted (`linkedin.com/in/...`), full URL kept as the link target.
- **Experience sub-items as objects `{name, text}`** — project names (**DownWind Aviation / Presort EMS / Country Style**) render bold before the description, in both docx and PDF builders.
- **Project titles are now the hyperlinks** (blue in PDF, real ExternalHyperlink in docx); visible raw URLs removed from the meta lines.
- **ATS hardening**: strict single column, standard headings, `|` separators, no icons/graphics, text-based Chromium PDF; page-break rules added (headings `keepNext`/`break-after: avoid`, rows/projects/`li` never split across pages). Verified both pages visually (rendered via Windows PDF API).
- **Gallery layout changed to 2 large + 1 "+N more" tile** (user preference, back from the 2-large+3-small version): N = remaining images, and the lightbox now reads the **full `project.gallery`** from data.js, so clicking any tile (including "+N more") browses ALL images (e.g. cab-booking's 7), not just the 3 rendered ones. `gallery-more` tile spans full width as a 21:9 banner; tests updated (48 checks).
- **Hero photo crop**: `object-position: center 22%` on `.hero-photo img` so the portrait headshot stays face-centered in the square frame; user fixed the path itself (`assets/HRT_image2.jpg`, no `../`).
- **Site still uncommitted at this point** — everything (case studies, gallery, images, resume) is being pushed together; live Pages site was running an old commit, which is why live image URLs 404.

---

## TODO checklist (updated 2026-11-13)


- [x] Fill GitHub / LinkedIn URLs in `js/data.js` (contact section; project repos intentionally "on request")
- [x] ArenaHub live URL + hosting note; Algo Trade live URL + note; cab booking live URL
- [x] Experience dates at Sky9
- [x] Review paragraph wording — humanization pass done
- [ ] Add real screenshots (gallery is wired — drop files per `assets/projects/README.md`, then list them in `gallery[]`)
- [ ] Decide: make ArenaHub / Trading Dashboard / BlazingAuth public (after secret scrub)
- [ ] Regenerate `resume/Harshit_Talshania_Resume.pdf` from the updated docx (manual: Word or Google Docs export)
- [ ] Host the site (Netlify currently suspected; if GitHub Pages is used, `projects/index.html?id=` query-param routing works fine)
- [ ] Next phase: GitHub profile README + LinkedIn featured section with the same projects

---

## 2026-10-21 — Vibrant UI + first push

- Commit history rewritten with the correct GitHub identity (`Harshit Talshania <hrtalshania@gmail.com>`) so commits link to the GitHub profile.
- **Accent system added** (`js/accent.js` + palette CSS in `main.css`): the palette button (beside the theme toggle in the nav) cycles the whole site between 4 modes —
  **Mono** (default black & white) → **Violet Night** → **Emerald Flow** → **Amber Heat**.
  In a color mode: gradient hero text, gradient primary buttons, colored tech/interest tags, step numbers, section-title accent bar, glowing card hovers, colored resume-period badges and contact email. Palettes also have light-theme variants. Choice persists in localStorage and is applied before first paint (no flash).
- **GSAP animations** added (CDN, `js/animations.js`): hero entrance timeline, section-header and card-grid reveals via ScrollTrigger. `prefers-reduced-motion` respected; if GSAP fails to load, the site falls back to the old IntersectionObserver fades (`scroll-effects.js` now skips when GSAP is present).
- Resume link also added to the mobile hamburger menu.
- **First push:** https://github.com/hrtalshania/portfolio (main branch). Repo is private.
- Remaining: real links (GitHub/LinkedIn/demo), Sky9 dates, screenshots, decide on opening featured repos.

---

## 2026-10-21 (2) — UI fixes after user review

- **Header stuck bug (real bug):** scroll effects painted navbar background inline Hardcover (only dark/light aware) so it stopped following palette/theme switches. Removed inline style injection; JS toggles `.nav-scrolled` only; background now comes purely from `var(--bg-primary)` + `color-mix` (85% alpha, blur retained), overriding layout.css's light-theme white via matching attribute selectors.
- Accent button redesigned: JS-painted dot trio removed; CSS-only gradient bar (var(--accent) → var(--accent-2)) under the diamond icon — recolors itself in every palette automatically.
- Brand updated HT → **HRT** everywhere (nav logo, hero photo placeholder monogram — both from `data.js`).
- Animation proof: console log on load (`[portfolio] animations active — GSAP … · N scroll triggers · reduced-motion: …`), flag `window.__portfolioAnimationsActive`, `?motion=force` URL override for previewing when OS reduced-motion is on. Most likely cause of "no animations" seen: OS animation-effects off → prefers-reduced-motion.
- Render order gotcha documented for future agents: `index.html` loads layout.css BEFORE main.css so the main.css polish layer wins ties; hero two-column overrides centered defaults from layout.css.
- Verified via disposable jsdom smoke test (run locally once; removed from repo): all sections render, GSAP init OK, accent cycle monochrome→violet→emerald works, monogram = HRT.
