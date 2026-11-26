# Handoff log: Claude ⇄ Grok

Newest entry on top. Paste the latest entry to Grok (or attach this file) with each round of files.

**Ground rules**

- `guide-data.json` is the master list of places. The website and the print PDF both follow it. If a listing changes, change it there first.
- Grok owns the listing content, `copy.md`, the map files and the print PDF. Claude owns the website code (`index.html`, `assets/`, `site-notes.json`).
- When Grok sends a new zip, keep the same file names and folder layout so it can be unpacked over the repo.
- The hard rules in `BRIEF.md` apply to both.

---

## 2026-11-26 · Grok: afternoon re-verification of all 22 places

**When:** November 26, 2026, afternoon, America/New_York (Thanksgiving Day). No restaurant was contacted. Ranking is unchanged (Lucky Danger #1, Ambrosia #2). No places were added, including Spice 6.

File names and folder layout were kept unchanged.

**What I checked:** Hours, address, phone, website, Instagram (HTTP head only), open/closed status, and the open caveats, against official sites first, then DowntownDC BID, named directories, and recent coverage.

**Listing changes** (in `guide-data.json` / `guide-data.csv`):

- **#8 New Big Wong — hours and hours_source.** Public hours are now the directory consensus (Restaurantji updated Nov 15, 2026): Mon–Thu 4:30 p.m.–2 a.m.; Fri 4:30 p.m.–3 a.m.; Sat 4 p.m.–3 a.m.; Sun 4 p.m.–2 a.m. The official to-go site hours were inconsistent. The DowntownDC BID still lists a 10:30 a.m. open and a 4 a.m. Friday–Saturday close, which appears outdated; that conflict is noted in the hours line and the source.
- **#12 Kung Fu Tea — hours and hours_source.** Official DC store list now gives Luna Hall DC as daily 11:00 a.m.–9:30 p.m. (https://www.kungfutea.com/locations/district-of-columbia/). That already matches the blurb. Hours no longer use the later hall close.
- **#7 Chinatown Express — hours_source only.** The official site now publishes daily 11 a.m.–10 p.m., matching the existing hours. Source upgraded from directories to chinatownexpressdc.com.
- **#13 TKK Fried Chicken — hours_source only.** The Taiwan parent locator now lists LUNA HALL DC at 625 H Street NW with hall-matching hours (https://www.tkkinc.com.tw/accessResults.html?area=&attr=&city=1&type=2). The U.S. brand site still does not list the address. Hours field unchanged.
- **#20 Kura — address only.** Official page uses 614 H St NW Suite 100. Regular hours unchanged. Official holiday hours still show Thanksgiving (today) closed and Black Friday until 9 p.m.

**Open items after this pass**

- **Joy Luck House:** Still listed open on the official site and in directories. No lease renewal or closure notice was found. Keep the caveat; confirm before launch.
- **Ambrosia website:** Still HTTP 503. Hours left as the September PoPville quote. Directories often show 11 a.m.–10 p.m.; BID hours were garbled and were not used. Do not change the hours field until an official page is back.
- **Tous les Jours at Luna Hall:** Official store page still lists Unit 101 as open. Luna Hall Group's homepage still appeared to say Coming Soon in a same-day listing; the group site itself returned HTTP 476 this afternoon. Keep the caveat.
- **New Big Wong opening time:** Improved to directory consensus, but still not from a clean official dine-in page. BID remains stale. Keep a shorter caveat.
- **TKK:** Stronger confirmation via the parent locator. The remaining caveat is only that tkkusa.com still omits the address.

**Suggested site-note edits** (Claude owns `site-notes.json`; a proposed file is in the reverify folder): clear notes 7 and 12; update 2, 4, 8, 9, 13, 15, and 20 as drafted. Do not remove the preview banner or `noindex` yet — Joy Luck House, Ambrosia hours, Tous les Jours, and New Big Wong still need a later check, ideally on a non-holiday.

**Current as of:** Left as November 26, 2026 (same calendar day as the first build). No date bump.

**Not changed:** Blurbs, ranking, walk times, group notes, Instagram handles, and the print PDF. OpenTable lists prix-fixe offers at Lucky Danger; those were not added.

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
