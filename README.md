# Harshit Talshania — Portfolio

Personal portfolio of Harshit Talshania, Software Developer focused on the **.NET ecosystem** (ASP.NET Core Minimal APIs, Angular, Blazor), with real-time systems, database design, and AI-assisted development experience.

**Live site:** TODO — enable GitHub Pages after the first push.

## Stack (of the site itself)

Plain HTML + CSS + vanilla JS. All content lives in [`js/data.js`](js/data.js) — edit that one file to update projects, experience, skills, links. No framework, no build step.

## Structure

```
index.html        page skeleton (sections)
css/              main.css (theme/typography), layout.css (grids)
js/data.js        ALL site content — the file you edit
js/render.js      renders content into the page
js/theme-toggle.js / scroll-effects.js
resume/           resume PDF (linked from the nav) + builder/
docs/CONTEXT.md   decision log & working notes — read this first
assets/           images & icons (screenshots go here)
_drafts/          old design drafts, kept out of git
```

## Resume

The resume is generated: `resume/builder/build.js` reads `resume/builder/data.json` and writes the docx from which the commit-able PDF (`resume/Harshit_Talshania_Resume.pdf`) comes. Edit `data.json`, then run:

```
cd resume/builder && node build.js
```

## Projects shown

| Project | What it is | Stack |
|---|---|---|
| ArenaHub | Sports turf booking platform | ASP.NET Core Minimal API · Angular · PostgreSQL · Razorpay · Cloudflare R2 |
| Trading Dashboard | Real-time market data dashboard | Python/FastAPI · Angular · WebSocket · Broker APIs |
| BlazingAuth | Complete auth system from scratch | ASP.NET Core · JWT · Blazor · SQL Server |
| Bridge Messaging | Slack ↔ Discord ↔ Telegram bridge | Python |

DownWind Aviation is company work at [Sky9 IT Craft Pvt. Ltd.](https://sky9itcraft.com/) (Blazor · EF Core · SQL Server · Azure Blob) — shown in the Experience section as professional work, not a personal project.

## Placeholders to fill

Search `js/data.js` for `TODO` — real links (GitHub/demo/email), resume PDF, experience dates, education years.
