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

## TODO checklist

- [ ] Fill GitHub / LinkedIn URLs in `js/data.js` (contact + project cards)
- [ ] ArenaHub live URL (Netlify) + Render API URL
- [ ] Experience dates at Sky9
- [ ] Review paragraph wording (About / hero / project descriptions) — done once by AI, user reviewing next
- [ ] Real screenshots per project into `assets/projects/` and wire into cards
- [ ] Decide: make ArenaHub / Trading Dashboard / BlazingAuth public (after secret scrub)
- [ ] Push to GitHub (private), rename remote repo sensibly (e.g. `harshit-portfolio`)
- [ ] Enable GitHub Pages only if the repo later becomes public
- [x] Review generated resume PDF next to the site for consistency

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
