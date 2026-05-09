# AUDIT REPORT — Pre-Redesign File Classification
Generated on the `redesign-landing-hub` branch before any changes.

---

## Summary

| Classification | Count | Action |
|---|---|---|
| **KEEP** | 3 | Leave in place — still needed |
| **REPLACE** | 3 | Move to `_archive/replaced/` — being rewritten |
| **ARCHIVE** | 8 | Move to `_archive/` — old content to preserve |
| **UNKNOWN** | 3 | Leave in place — flagged for user review |

---

## KEEP — Leave in place, still needed

| File | Size | Modified | Reason |
|---|---|---|---|
| `CNAME` | 19 B | 2026-05-06 | Contains real custom domain `mahns-operation.com` — critical, must keep |
| `LICENSE` | 1,211 B | 2026-05-06 | Unlicense (public domain) — keep as-is |
| `.gitignore` | 64 B | 2026-05-06 | Git config — will be overwritten with improved version by new site |

---

## REPLACE — Being fully rewritten (archive old version first)

| File | Size | Modified | Reason |
|---|---|---|---|
| `index.html` | 28,206 B | 2026-05-08 | Old STRATA·3D storefront — replaced by new landing-hub index.html |
| `styles.css` | 21,357 B | 2026-05-08 | Old STRATA·3D stylesheet — replaced by new `css/styles.css` |
| `script.js` | 3,325 B | 2026-05-08 | Old STRATA·3D interactions — replaced by new `js/main.js` |

---

## ARCHIVE — Old content, preserve but no longer active

| File | Size | Modified | Reason |
|---|---|---|---|
| `assistant.html` | 16,663 B | 2026-05-08 | AI Order Assistant page — not part of new site but should be preserved |
| `CLAUDE.md` | 5,816 B | 2026-05-08 | Old project guide for Claude Code — new README replaces it |
| `README.md` | 1,755 B | 2026-05-06 | Old generic README — replaced by new project README |
| `images/Screenshot 2023-01-23 at 9.52.16 PM.jpg` | 53,660 B | 2026-05-06 | Screenshot from original site — archive, may want to reuse photo |
| `.DS_Store` | 8,196 B | 2026-05-06 | macOS system file — archive (harmless, but should be gitignored) |
| `.DS_Store~Stashed changes` | 8,196 B | 2026-05-06 | macOS system file (stashed) — archive |
| `js/.DS_Store` | 6,148 B | 2026-05-06 | macOS system file in js/ folder — archive |
| `.gitignore` | 64 B | 2026-05-06 | Current gitignore is minimal (only ignores `.idea/` and `.DS_Store`) — will be replaced with comprehensive version from new site |

> **Note on the screenshot:** `images/Screenshot 2023-01-23 at 9.52.16 PM.jpg`
> appears to be a Rodeo/Amazon FC dashboard screenshot — not a product photo.
> No reusable product images were found in the repo. You'll need to add real
> product photos to `assets/` before the new site goes live.

---

## UNKNOWN — Flagged for review, left untouched

| File | Size | Modified | Reason |
|---|---|---|---|
| `.idea/MahnZo.github.io.iml` | 336 B | 2026-05-06 | JetBrains IDE project file — safe to archive, but leaving for user to decide |
| `.idea/misc.xml` | 172 B | 2026-05-06 | JetBrains IDE config — same as above |
| `.idea/modules.xml` | 284 B | 2026-05-06 | JetBrains IDE config — same as above |
| `.idea/vcs.xml` | 167 B | 2026-05-06 | JetBrains VCS config — same as above |

> The `.idea/` folder is IntelliJ/WebStorm IDE metadata. It's already in the
> old `.gitignore` (sort of) but these files are tracked in git. They're
> harmless but add noise. Recommend archiving them, but flagged for your call.

---

## No product photos found

The repo contains **no product photos** that can be reused for the new
`assets/` folder. You'll need to add your own images before launch.
See `assets/README.md` (created by the new site) for the exact files needed.
