# Harshit Talshania — Portfolio

Personal portfolio of **Harshit Talshania** — Software Engineer building complete systems (APIs, databases, real-time apps, and the UIs that use them), with .NET, Angular, and Blazor among the tools used daily. Includes self-hosting (Oracle VM), test automation (Playwright), and AI-assisted development experience.

**Live site (GitHub Pages):** https://hrtalshania.github.io/portfolio/

---

## ✏️ Editing the content — **you never need to touch HTML/CSS/JS logic**

Every visible word on the site comes from **one file: [`js/data.js`](js/data.js)**.
Each field has a `// TODO:` comment where something is still a placeholder. Search for `TODO` to find everything left to fill.

| You want to change… | Edit in `js/data.js` |
|---|---|
| Nav logo (HRT) & links | `nav.logo`, `nav.links[]` |
| Resume PDF link | `nav.resume` (put the PDF in `resume/` first) |
| Headline, subtitle, description, tagline, CTAs | `hero.*` (add `name` for the "Hi, I'm ..." line) |
| **Your profile photo** | copy your file to `assets/profile.jpg`, then set `hero.image: "assets/profile.jpg"` (until then the HRT monogram card shows) |
| "What I Do" cards | `services[]` (title, description, icon: `code` / `api` / `database` / `architecture` / `cloud` / `robot` / `test` / `compass`) |
| "How I Work" steps | `approach.steps[]` |
| About principles ("How I think" list) | `about.principles[]` |
| **Featured projects** (summary cards) | `projects[]` — `slug` (used in the case-study URL), `summary` (card text), plus the full case study: problem, solution, features, tech, `links` (live URL, `liveNote`, `hosting[]`, `githubLabel`), `learnings` |
| **More Projects row** (compact cards) | `moreProjects[]` — same shape; `tech` is the one-liner label, `techList` the tag list on the detail page |
| **Case-study pages** | `projects/index.html?id=<slug>` — one template reads every project from `data.js`; nothing to edit per project |
| **Screenshots gallery** | drop images into `assets/projects/<slug>/`, then list filenames in that project's `gallery: []` (see `assets/projects/README.md`). Layout: 2 large + 3 small tiles, rest behind a "+N more" tile |
| Tech experience columns | `technologies` — each key becomes a column heading, each value a list. Add/rename keys freely. `technologiesNote` is the line above the grid |
| Work experience | `experience[]` (optional `location` and `note` per entry) |
| Education | `education.degree` / `education.diploma` |
| About me text & focus tags | `about.content` (two paragraphs separated by `\n\n`), `about.interests[]` |
| Email & social links | `contact.email`, `contact.socials[]` |
| Footer text | `footer.*` |
| Browser tab title/meta | `meta.title`, `meta.description` |

After editing — just refresh the browser (`Ctrl+Shift+R` for a clean reload). No build step exists, by design.

### Local preview

```bash
python -m http.server 8080   # or: npx serve
# open http://localhost:8080
```

(Opening `index.html` directly via double-click also works.)

### Colors & theme (no editing needed)

- 🌙 **Moon/sun button** — dark / light theme
- ◇ **Diamond button** — cycles palettes: Monochrome → Violet Night → Emerald Flow → Amber Heat (choice is remembered)
- Both states persist in localStorage; palette definitions live at the bottom of `css/main.css` if you ever want custom colors.

### Animations

GSAP entrance/scroll animations come from `js/animations.js` (bundled at `js/vendor/`). If your OS has "Animation effects" OFF (Windows accessibility), they are skipped — preview them by opening the page with **`?motion=force`** in the URL. A status line also prints in the browser console (F12).

---

## 📄 Resume

The PDF linked in the nav is `resume/Harshit_Talshania_Resume.pdf`.

Both artifacts are *generated* from `resume/builder/data.json`:

```bash
cd resume/builder
node build.js       # -> resume/Harshit_Talshania_Resume.docx (Word format)
node build-pdf.js   # -> resume/Harshit_Talshania_Resume.pdf (prints the HTML resume via headless Edge/Chrome)
```

The docx is the editable Word version; the PDF is the site's download link. Edit `data.json`, run both, done. (If you prefer Word's own PDF export, open the docx and save as PDF instead — content is identical.)

---

## 🌐 Public profiles (LinkedIn, Upwork, GitHub)

The same facts, written differently for each platform, live in **one file: [`profile/master.json`](profile/master.json)**.

```bash
cd profile
node build.mjs      # validates limits, writes out/*.md + STATUS.md
```

Each platform gets a paste sheet in `profile/out/` (field by field, with character counts), and `profile/STATUS.md` says which platform is behind the current version. Nothing is posted automatically — LinkedIn, Upwork, Instagram, and Facebook do not allow profile edits by API. Full workflow: [`profile/README.md`](profile/README.md).

---

## 📁 Structure

```
index.html          page skeleton (sections) — rarely needs edits
projects/index.html case-study template (reads ?id=<slug> from js/data.js)
css/                layout.css (component layout) + main.css (theme/polish/palettes) + project.css (case-study page)
js/data.js          ← ALL site content (edit this)
js/render.js        draws data.js into the home page
js/project-detail.js draws one project's case study into projects/index.html
js/animations.js    GSAP timelines & scroll triggers
js/accent.js        palette cycler; js/theme-toggle.js dark/light; js/scroll-effects.js
js/vendor/          gsap + ScrollTrigger (bundled, offline-safe)
resume/             generated PDF + docx builder (data.json)
profile/            master.json → paste sheets for LinkedIn, Upwork, GitHub
assets/             images (screenshots, profile photo)
docs/CONTEXT.md     decision log & working notes — read this first
_drafts/            old drafts (ignored by git)
```

## 🚀 Pushing changes to GitHub

```bash
git add -A
git commit -m "describe what you changed"
git push
```

The remote is `https://github.com/hrtalshania/portfolio.git` (branch `main`).

## Projects shown

| Project | What it is | Stack |
|---|---|---|
| ArenaHub | Sports turf booking platform | ASP.NET Core Minimal API · Angular · PostgreSQL · Razorpay · Cloudflare R2 |
| Algo Trade Dashboard | Real-time market data dashboard | Python/FastAPI · Angular · WebSocket · Broker APIs |
| BlazingAuth | Complete auth system from scratch | ASP.NET Core · JWT · Blazor · SQL Server |
| Cab Booking Platform | Self-hosted booking platform on an Oracle free-tier VM | ASP.NET Core · Angular · Oracle Cloud · DuckDNS |
| Bridge Messaging | Slack ↔ Discord ↔ Telegram bridge, now growing into a Slack client in .NET MAUI | Python · AI agents |
| Ayurbeat | Ayurvedic multi-vendor e-commerce | PHP · MySQL |

DownWind Aviation is company work at [Sky9 IT Craft Pvt. Ltd.](https://sky9itcraft.com/) (Blazor · EF Core · SQL Server · Azure Blob) — shown in the Experience section as professional work, not a personal project.
