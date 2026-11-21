# Profile sync status

Master version **v1** · updated 2026-11-21 · generated 2026-11-21

| Platform | Enabled | Synced version | State | Last synced | Sheet |
|---|---|---|---|---|---|
| linkedin | yes | 0 | never synced | — | `out/linkedin.md` |
| upwork | yes | 0 | never synced | — | `out/upwork.md` |
| github | yes | 0 | never synced | — | `out/github-readme.md` |
| x | draft only | 0 | never synced | — | `out/x.md` |
| instagram | draft only | 0 | never synced | — | `out/instagram.md` |
| facebook | draft only | 0 | never synced | — | `out/facebook.md` |

## What to do next

- **linkedin** — paste from the sheet, then set `syncedVersion: 1`.
- **upwork** — paste from the sheet, then set `syncedVersion: 1`.
- **github** — paste from the sheet, then set `syncedVersion: 1`.

## Checks

- All limits pass. No duplicate sentences across platforms. All URLs known.

## Extra assets

- Upwork intro video — not recorded. Script: `out/upwork-video-script.md`

## Known gaps (not blocking)

- The portfolio and case-study pages have no Open Graph tags, so link previews on LinkedIn and Upwork look plain. Adding static `og:title`, `og:description`, and an image would improve every card.
- `ruhicabs.duckdns.org` has the browser title “Ruhi Cabs – Admin”. Change it to a customer-facing title before featuring it.
- All repos are private, so GitHub pinning waits on the public/secret-scrub decision.
- No project screenshots yet. Featured/LinkedIn media cards need them.
- `README.md` in the repo root still says the live site is a TODO.
