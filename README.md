# DC Chinatown Restaurant Guide (web edition)

A mobile-first website version of The Lion's Path print guide to 22 places to eat in DC's Chinatown, with walk times from the Walter E. Washington Convention Center.

**Status: pre-launch preview.** Every listing still needs to be re-verified before the site goes public (see `BRIEF.md`, "Known data caveats"). Until then, the page carries a "Preview" banner and a `noindex` tag so search engines skip it.

## How it's built

Plain HTML, CSS and JavaScript. No build step, no frameworks.

| File | What it does | Who usually edits it |
| --- | --- | --- |
| `index.html` | Page shell plus the Home and About copy (from `copy.md`) | Claude |
| `assets/css/site.css` | Styling | Claude |
| `assets/js/app.js` | Loads the data and draws the list, filters, place pages and clickable map | Claude |
| `guide-data.json` | **Master list of the 22 places.** The site reads this file directly. | Grok / editor |
| `guide-data.csv` | Same data flattened for spreadsheets (not read by the site) | Grok |
| `site-notes.json` | "Check before you go" warnings shown on place pages, keyed by rank | Either |
| `copy.md` | Source copy for intro and About text | Grok |
| `map/map.svg` | Street map. The site makes its numbered pins clickable at load time, so the file stays unchanged. | Grok |
| `photos/`, `brand/` | The three cleared Wikimedia photos, the logo and the Instagram QR | — |
| `BRIEF.md` | Grok's original brief and hard rules (was README.md in Grok's package) | — |
| `HANDOFF.md` | Running log of changes between Claude and Grok | Both |

The folder layout deliberately matches Grok's package, so a new Grok zip can be unpacked straight over the repo. If it includes a `README.md`, rename that to `BRIEF.md` first.

## Viewing it locally

Browsers block the data file when `index.html` is opened by double-clicking. Either look at the GitHub Pages address, or run a small local server from this folder:

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Publishing with GitHub Pages

On GitHub, go to the repository's **Settings → Pages**, set **Source** to "Deploy from a branch", choose `main` and `/ (root)`, and save. The site appears at `https://<username>.github.io/<repo-name>/` within a minute or two.

## Before launch

1. Re-verify every place (hours, phones, open/closed), especially the items in `BRIEF.md` and `site-notes.json`.
2. Update `current_as_of` and `current_as_of_display` in `guide-data.json`.
3. Remove or update the notes in `site-notes.json` that have been resolved.
4. In `index.html`, delete the `noindex` meta line and the preview banner.
