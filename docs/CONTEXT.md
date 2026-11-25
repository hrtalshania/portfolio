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

## 2026-11-13 (6) — ArenaHub link change + hero 4:5 frame + resume advice decisions

- **ArenaHub live link changed** to `https://staging-arenahub.netlify.app/` (was `/profile`) in BOTH `js/data.js` and `resume/builder/data.json`; both resume artifacts rebuilt so the hyperlinked title carries the new URL.
- **Hero photo frame widened from square to 4:5** (280×350 desktop, 200×250 mobile): the tall portrait was over-cropped in the square frame, hiding most of the torso. `object-position: center 22%` retained. Verified via headless screenshot.
- **Advice decisions (no changes needed, recorded so they don't get re-litigated):**
  - Resume links: compact display text + real hyperlinks, **no icons** (ATS extracts text; icon glyphs corrupt parsing).
  - Phone: stays on the resume, stays OFF the site (spam/scraping risk on public pages; serious recruiters get it from the resume download).
  - Resume photo: **no photo, ever** — ATS/bias risk; the portfolio hero photo covers the face-to-name job.
  - Kurta hero photo: kept. Technically good (lighting, focus, eye contact); authentic rather than corporate-formal. Do NOT AI-swap the outfit (looks fake). If the user wants formal later: real photo in a solid shirt, plain wall, daylight, then one-line swap in `data.js`.

---

## 2026-11-13 (7) — Cross-page anchor jumps fixed (hero-strand bug)

- **Bug:** links from detail pages back to home sections (`index.html#projects`, `#contact` — "Back to all projects", "All projects" button, "reach out" link) landed near the hero instead of the target section. Cause: the browser performs its native anchor jump **before** `render.js` (DOMContentLoaded) fills the empty section skeletons, so it scrolls to where the target sat on the short pre-render page; the rendered content then pushes the target away and the viewport is stranded at the top. `scroll-behavior: smooth` made the initial wrong jump animated, amplifying it.
- **Fix:** `initHashScroll()` in render.js — after all render calls, if `location.hash` matches an existing element, `scrollIntoView` it (instant `behavior: 'auto'`), plus one repeat on `window.load` (fonts/hero image/GSAP entrance can still shift layout late). Detail page links were already correct; the bug was entirely home-page-side.
- **CSS:** `.section { scroll-margin-top: 90px }` so the fixed navbar never overlaps the section heading after a jump (also improves same-page nav clicks).
- Tests extended to 51 checks (hash scroll targets contact after render, instant jump, and no forced scroll when no hash).

---

## 2026-11-13 (8) — Gallery redesigned: 40/40/20 magazine row

- **New gallery layout** (user spec): one row, three columns **40% | 40% | 20%**. Big tiles show images 1-2 at full column height (4:3 sets row height); the narrow column stacks up to 3 small cells (images 3-5) as equal flex slices, and when N > 0 the last cell carries a **"+N more" overlay** (cab-booking's 7 images: "+2 more"). Clicking any tile still opens the lightbox browsing ALL images (unchanged).
- Edge cases: 1-2 images → two equal big tiles (`gallery-two` modifier, no narrow column); 3-4 images → narrow column with fewer cells, no overlay; 6+ → full layout as drawn.
- Mobile: big tiles side by side on row 1, narrow column becomes a full-width 3-across strip.
- Tests updated (53 checks): 2 big + 3 small in column, "+2 more" overlay, lightbox opens at image 5 of 7. Verified visually on the cab-booking detail page.

---

## TODO checklist (updated 2026-11-13)


- [x] Fill GitHub / LinkedIn URLs in `js/data.js` (contact section; project repos intentionally "on request")
- [x] ArenaHub live URL + hosting note; Algo Trade live URL + note; cab booking live URL
- [x] Experience dates at Sky9
- [x] Review paragraph wording — humanization pass done
- [ ] Add real screenshots (gallery is wired — drop files per `assets/projects/README.md`, then list them in `gallery[]`)
- [ ] Decide: make ArenaHub / Trading Dashboard / BlazingAuth public (after secret scrub)
- [ ] Regenerate `resume/Harshit_Talshania_Resume.pdf` from the updated docx (manual: Word or Google Docs export)
- [x] Host the site — live on GitHub Pages: https://hrtalshania.github.io/portfolio/
- [ ] Paste the generated profile sheets into LinkedIn, Upwork, and GitHub (see `profile/STATUS.md`)

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

---

## 2026-11-21 — Cross-platform profile system (`profile/`)

### Decision: generate paste sheets, do not automate the platforms

- **Why not automate:** LinkedIn's Profile Edit API is partner-only; Upwork's MCP server covers jobs/proposals/messages but not profile fields; Instagram/Facebook APIs publish content for professional accounts and cannot edit bios; X bio editing sits in legacy v1.1 and the API is now pay-per-use. Browser automation against LinkedIn/Upwork risks the account, so it was ruled out.
- **What is automated:** GitHub only, and even then just as a generated README the user pastes. Everything else is a field-by-field paste sheet.

### Structure

- `profile/master.json` — facts once, then each platform's finished copy. Platform blocks mirror each platform's own sections (`linkedin.experience`, `upwork.portfolio`, `github.readme`, …), because the section list differs per platform.
- `profile/build.mjs` — no dependencies. Checks character limits (LinkedIn 220/2,600/2,000, Upwork title/overview, GitHub bio, X/IG/FB bios), item counts (Upwork 20 skills), repeated sentences across platforms, unknown URLs, and facts-vs-copy date drift. Writes `out/*.md` and `STATUS.md`, exits non-zero on limit errors.
- `profile/out/` — paste sheets. `profile/STATUS.md` — per-platform `syncedVersion` vs master `version`, so a missed platform is visible.
- Prose is written by hand per platform, not templated from facts. The script validates and renders; it does not rewrite sentences.

### Decisions taken

- Positioning: both goals, LinkedIn first. Rate **$20/hr** with a private $15 floor; availability **20–30 hrs/week** (honest next to a full-time role), 24-hour response.
- GitHub: minimal README, six stack badges, no stats widgets. Pinning is deferred because every repo is private and pinned private repos still show as "Private".
- Social (X / Instagram / Facebook): drafts exist but are `enabled: false` until the user decides. No scheduler chosen.
- Email only on public profiles; phone stays on the resume.

### Known gaps recorded in `profile/STATUS.md`

- No Open Graph tags on the portfolio or case-study pages, so LinkedIn/Upwork link previews are plain. Adding static `og:*` tags is the highest-value follow-up to this work.
- `ruhicabs.duckdns.org` has the browser title "Ruhi Cabs – Admin", which would look wrong on a featured card.
- Screenshots still missing, so no media cards yet.
- `README.md` live-site line corrected to the GitHub Pages URL; the old TODO was stale.

---

## 2026-11-24 - Tailored application set (Jibble Group, Senior Back-End Developer)

### Why

The single resume and the placeholder cover letter could not be sent as-is: `cover-letter.json` still carried the `whyThem` placeholder, and the builders hardcoded one output name, so any variant would overwrite the resume linked from the site.

### Changes

- `resume/builder/build.js` and `build-pdf.js` now take an optional data file: `node build.js data.backend.json`. Output name comes from an `outputBase` field in the JSON, so the general resume at `Harshit_Talshania_Resume.pdf` is never touched.
- `build-cover-letter.js` reads `outputBase` from the letter JSON and accepts an optional file argument.
- New `resume/builder/data.backend.json`: backend-focused variant. Summary rewritten around APIs, EF Core, PostgreSQL/SQL Server, RabbitMQ, integrations, Docker/Linux. Skills reordered backend-first, Blazor/Angular demoted to one line, projects trimmed to the five relevant ones.
- `data.json`: title corrected to **Senior Software Developer** (matches the application form), RabbitMQ added to Cloud & Integrations.
- `cover-letter.json`: Jibble-specific `whyThem` (Jibble 2.0 on .NET Core, Gusto/Intercom/Zenefits/Zapier integrations), `date: "auto"`, `outputBase: Harshit_Talshania_Cover_Letter_Jibble`, closing states UTC+5:30 and 30 days' notice.

### Deliberate omissions

- No claim of AWS, microservices, or OpenAPI: not evidenced. RabbitMQ is included because the user confirmed real use.
- Experience is written as "2+ years", not 3+, because Aug 2024 to Nov 2026 is 2 years 4 months including the internship.
- No "years of experience" line on the resume. The dates carry it.

### Outputs

`resume/Harshit_Talshania_Resume.pdf` (general, 2 pages), `resume/Harshit_Talshania_Resume_Backend.pdf` (2 pages), `resume/Harshit_Talshania_Cover_Letter_Jibble.pdf` (1 page) plus docx/txt.

### Open item

The site, LinkedIn copy, and `profile/master.json` still say "Software Engineer (Full Stack .NET)". They need the same title change or the resume contradicts the portfolio.

---

## 2026-11-25 - Mobile UX pass

### What changed

- **Horizontal snap strips (<=768px)** for `#services-grid` (7 cards), `#projects-grid` (4), `#more-projects-grid` (4) and `#tech-grid` (5 category cards). Flex row, `scroll-snap-type: x mandatory`, card widths 76/84/78/78vw so the next card peeks, scrollbar hidden, `overscroll-behavior-x: contain`. The negative inline margin bleeds the track to the screen edges while the matching padding keeps the first card aligned with the rest of the page. Desktop grids untouched.
- **Hero photo -> About portrait.** The hero is text-only on phones: `hero-photo-wrap` is hidden <=768px and the full portrait opens the About section (`about.image` in `data.js`, rendered in `renderAbout`). A 44px avatar inside the greeting was tried and removed - at that size the photo reads as a smudge. Desktop still shows the large hero portrait and a text-only About.
- **Gallery lightbox.** Added horizontal swipe (40px threshold, ignores vertical drags, skips touches starting within 24px of the left edge so iOS keeps its back gesture) and neighbour preloading. On phones the arrows moved to the bottom corners over a 0.6-black background with the counter centred, because the old 8%-white edge buttons were effectively invisible and sat under the back-gesture zone.
- Section padding reduced to 64px and section headers to 36px on mobile. `@media (hover: none)` gives cards a border/background response on tap, since hover does not exist on touch.

### Verification

Headless Edge at 390x844 with touch emulation: hero (text only), services, projects, more projects, technology, about, gallery and open lightbox all render correctly, and `document.documentElement.scrollWidth === clientWidth` on every page, so the bleed adds no horizontal page overflow.

### Note

The screenshot harness (CDP script + local http.server + `__preview.html`) was temporary and is not in the repo.

---

## 2026-11-25 - Upwork profile rewrite (master v2)

### What changed

- **Overview:** removed the three live links and the portfolio URL (Upwork strips external links from the overview and points to the Portfolio section), removed the AVAILABILITY paragraph (it is a profile setting, not prose), and rewrote the prose with "engineer" instead of "developer". New sections: DEPLOYMENT AND OPERATIONS (Oracle Cloud free-tier VM, Docker containers, GitHub Actions CI/CD, container-level port mapping, DuckDNS + HTTPS), Bridge Messaging, and AI IN THE WORKFLOW.
- **AI wording:** Playwright automation with AI agents writing and maintaining the flows, UI work through Stitch AI over MCP, and hands-on work with opencode and local models via llama + LM Studio. Reviewed and owned by me, not delegated.
- **Employment:** DownWind now names the Jira board, sprint planning and day-to-day team collaboration (no people-management claim). Presort names legacy RDLC report generation plus payment, invoice and reconciliation flows. Freelance entry carries the Docker/CI-CD/Oracle Cloud deployment story and is retitled "Software Engineer".
- **Portfolio:** Cab Booking rewritten around deployment; Bridge Messaging added as item 4 (no URL, code on request).
- **Skills (20 cap):** dropped ASP.NET MVC, JavaScript and FastAPI; added RabbitMQ, Jira and CI/CD.
- **build.mjs:** fails when `upwork.overview` contains a URL, a bare domain or an email address. Bare-domain matching is case-sensitive so "ASP.NET" and ".NET Core" are not flagged. Changelog keys may now be platform-prefixed (`upwork-overview`), so an Upwork-only change no longer shows as "missed" on LinkedIn and GitHub.

### Verification

`node profile/build.mjs` -> all limits pass, no duplicate cross-platform sentences, all URLs known. Overview is 3,793 / 5,000 chars, title 61 / 70. `out/upwork.md` and `STATUS.md` regenerated from master v2.

### Open item

The site, LinkedIn and the Upwork employment entry still say "Software Engineer (Full-Stack .NET)", while `resume/builder/data.json` says "Senior Software Developer". Decide one title and apply it everywhere.
