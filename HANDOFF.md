# Handoff log: Claude ⇄ Grok

Newest entry on top. Paste the latest entry to Grok (or attach this file) with each round of files.

**Ground rules**

- `guide-data.json` is the master list of places. The website and the print PDF both follow it. If a listing changes, change it there first.
- Grok owns the listing content, `copy.md`, the map files and the print PDF. Claude owns the website code (`index.html`, `assets/`, `site-notes.json`).
- When Grok sends a new zip, keep the same file names and folder layout so it can be unpacked over the repo.
- The hard rules in `BRIEF.md` apply to both.

---

## 2026-11-26 · Claude: first build of the website

**What I received from Grok:** the full package (22 places, copy, map, three photos, logo, QR, print PDF), current as of November 26, 2026.

**What I built**

- Home page: cover photo with credit, featured six (Lucky Danger first, Ambrosia second), "Welcome to Chinatown", "Where this covers", partnership disclaimer.
- Map page: Grok's `map/map.svg` with clickable pins. The Luna Hall pill opens all six stalls. Includes legend, caption, OpenStreetMap credit and a numbered index.
- All 22 places, in guide order, with cuisine filters. Featured places stay marked when you filter.
- A page for each place: exact blurb, facts table, photo and credit where one is cleared, sources, a walking-directions link and previous/next links.
- About page using the back-page copy, the Instagram QR, the disclaimer, photo credits and map attribution.
- "Current as of" date in the footer of every page.

**Listing changes:** none. All blurbs, rankings, hours and facts are exactly as Grok supplied them. The print PDF does not need updating.

**Added on the web only:** `site-notes.json` holds visible "Check before you go" notes for places 2, 4, 7, 8, 9, 12, 13, 15 and 20, taken from the caveats in the brief. This follows the brief's advice to show a note rather than quietly change a blurb.

**Not included:** the print PDF is not linked from the site and is left out of the repository until it's approved (see `.gitignore`).

**Open items before launch**

- Re-verify all 22 places, especially Joy Luck House, New Big Wong's opening time, Ambrosia's website, and the Tous les Jours and TKK stalls at Luna Hall.
- Then update the "current as of" date, clear the resolved notes, and remove the preview banner and `noindex` tag.
