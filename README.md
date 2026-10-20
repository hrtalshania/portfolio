# Harshit Talshania — Portfolio

Personal portfolio of **Harshit Talshania** — Software Developer focused on the .NET ecosystem (ASP.NET Core Minimal APIs, Angular, Blazor), with real-time systems, database design, and AI-assisted development experience.

**Live site (GitHub Pages):** TODO — open Pages after making the repo public.

---

## ✏️ Editing the content — **you never need to touch HTML/CSS/JS logic**

Every visible word on the site comes from **one file: [`js/data.js`](js/data.js)**.
Each field has a `// TODO:` comment where something is still a placeholder. Search for `TODO` to find everything left to fill.

| You want to change… | Edit in `js/data.js` |
|---|---|
| Nav logo (HRT) & links | `nav.logo`, `nav.links[]` |
| Resume PDF link | `nav.resume` (put the PDF in `resume/` first) |
| Headline, subtitle, description, tagline, CTAs | `hero.*` |
| **Your profile photo** | copy your file to `assets/profile.jpg`, then set `hero.image: "assets/profile.jpg"` (until then the HRT monogram card shows) |
| "What I Do" cards | `services[]` (title, description, icon: `code` / `api` / `database` / `architecture`) |
| "How I Work" steps | `approach.steps[]` |
| Philosophy quote & principles | `philosophy.content`, `philosophy.principles[]` |
| **Featured projects** (big cards) | `projects[]` — title, problem, solution, features, tech, links, `githubLabel` |
| **More Projects row** (compact cards) | `moreProjects[]` — title, description, tech, github |
| Tech experience columns | `technologies` — each key becomes a column heading, each value a list. Add/rename keys freely |
| Work experience | `experience[]` |
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

It is *generated*: edit **`resume/builder/data.json`**, then run:

```bash
cd resume/builder
node build.js
```

This rewrites `resume/Harshit_Talshania_Resume.docx` — convert/export to PDF and replace the PDF in `resume/` to update the site's download link.

---

## 📁 Structure

```
index.html          page skeleton (sections) — rarely needs edits
css/                layout.css (component layout) + main.css (theme/polish/palettes)
js/data.js          ← ALL site content (edit this)
js/render.js        draws data.js into the page
js/animations.js    GSAP timelines & scroll triggers
js/accent.js        palette cycler; js/theme-toggle.js dark/light; js/scroll-effects.js
js/vendor/          gsap + ScrollTrigger (bundled, offline-safe)
resume/             generated PDF + docx builder (data.json)
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
| Trading Dashboard | Real-time market data dashboard | Python/FastAPI · Angular · WebSocket · Broker APIs |
| BlazingAuth | Complete auth system from scratch | ASP.NET Core · JWT · Blazor · SQL Server |
| Bridge Messaging | Slack ↔ Discord ↔ Telegram bridge | Python |

DownWind Aviation is company work at [Sky9 IT Craft Pvt. Ltd.](https://sky9itcraft.com/) (Blazor · EF Core · SQL Server · Azure Blob) — shown in the Experience section as professional work, not a personal project.
