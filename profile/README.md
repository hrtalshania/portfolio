# Public profile content

One source file for every public profile, with per-platform wording and a generated paste sheet for each.

```
profile/
  master.json   ← the only file you edit
  build.mjs     ← validates limits, writes out/ and STATUS.md
  STATUS.md     ← generated: what is stale, what to paste next
  out/          ← generated paste sheets (do not edit)
```

## Why it exists

The portfolio, resume, LinkedIn, Upwork, and GitHub all describe the same facts, but each one needs different wording: a recruiter skims, a client compares proposals, a developer reads code. Copy-pasting one text everywhere is why most profiles read like filler.

`master.json` holds the facts once, then each platform's finished copy. The build step does not rewrite prose — it checks limits, renders paste sheets, and tells you when a platform is behind a fact change.

## The loop

```bash
cd profile
node build.mjs
```

Then:

1. Open `STATUS.md` — it lists what is stale.
2. Open the platform sheet in `out/` and paste field by field.
3. In `master.json`, set that platform's `syncedVersion` to the master `version` and `lastSynced` to today.
4. Run `node build.mjs` again to confirm it is current.

## Changing a fact

Example: ArenaHub gets a new URL.

1. Edit `facts.projects[arenahub].url` and the copy that mentions it in each platform block.
2. Bump `version` to `2`.
3. Add a changelog entry:

```json
{ "version": 2, "date": "2026-12-01", "keys": ["projects.arenahub.url"], "note": "New ArenaHub domain" }
```

4. `node build.mjs`. Every platform still on v1 is flagged with the key it is missing.

You still paste manually. The point is that you cannot forget *which* platform was missed.

## What the build checks

- Character limits: LinkedIn headline/About/experience, Upwork title/overview, GitHub bio, X bio, Instagram bio/name, Facebook bio.
- Item counts: LinkedIn skills (50), Upwork skills (20), Upwork portfolio (20).
- Repeated sentences across platforms, so "different wording" is enforced.
- Unknown URLs, so a stale or invented link gets caught.
- Dates and employers in platform copies that no longer match `facts`.

Errors block nothing in `out/` (the sheets are still written) but exit non-zero, so check the console.

## What is automated and what is not

| Platform | Automated? |
|---|---|
| GitHub | README is a file you paste into the `hrtalshania` repo. Nothing else can be pushed without your git auth. |
| LinkedIn | No. Profile Edit API is partner-only; browser bots risk the account. Paste from the sheet. |
| Upwork | No. The official MCP server covers jobs, proposals, and messages, not profile fields. |
| Instagram / Facebook | No. Their APIs publish content for professional accounts; they do not edit bios. |
| X | No. Bio editing is legacy and the API is pay-per-use. |

## Enabling the social drafts

`x`, `instagram`, and `facebook` are `"enabled": false`. Set it to `true`, fill `handle`, run the build, and the sheet appears in `out/`. Nothing is published by the build.

## Rules

- Client work: role and technology only. Never the codebase.
- No phone number on any public profile. Email only.
- No paragraph reused verbatim between platforms. The build warns if one slips through.
- The portfolio URL is the single destination in every bio.
