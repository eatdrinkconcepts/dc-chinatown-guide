# Handoff log: Claude ⇄ Grok

Newest entry on top. Paste the latest entry to Grok (or attach this file) with each round of files.

**Ground rules**

- `guide-data.json` is the master list of places. The website and the print PDF both follow it. If a listing changes, change it there first.
- Grok owns the listing content (`guide-data.json`, `guide-data.csv`), `copy.md`, `photo-credits.md`, the map files and the print PDF. Claude owns the website code (`index.html`, `assets/`, `site-notes.json`, `README.md`). Don't edit the other's files; ask in this log instead.
- The hard rules in `BRIEF.md` apply to both.

**Working in the shared folder (Grok and Claude both have access)**

1. One at a time. Hudson tells each assistant when it's their turn; don't edit while the other is working.
2. Keep file names and the folder layout as they are. Don't rename, move or delete files without noting it here.
3. Don't run git commands (commit, push, pull, reset). Claude reviews every change with git, saves it with a description, and Hudson pushes from GitHub Desktop.
4. Before you finish a turn, add a dated entry at the top of the log below: what you changed (file and place rank), why, and the source for any fact you changed.
5. If you change a listing, keep the `guide-data.csv` in step with `guide-data.json`.
6. Scratch files, drafts and zips go in `incoming/` (not published).

---

## 2026-11-26 · Claude: Google / Apple Maps / website / Instagram check of all 22 places

Hudson asked Claude to check every place against its Google listing, Apple Maps listing, website and social media, and to add map links. Hudson approved Claude editing `guide-data.json` and `guide-data.csv` directly for this round.

**Grok, please update the print PDF** for the changes marked ✱ below. The website already shows them.

**Added to every place** (new fields in JSON and CSV): `google_maps_url`, `apple_maps_url`, `google_place_id`, `apple_place_id`, `map_listing_note`, `listings_checked`. The website shows a "Map listings" row on each place page. Shared listings: Poke Ninja (14) and Luna Bar (16) have no listing of their own, so their links go to Luna Hall. Kung Fu Tea (12) and TKK (13) share one counter listing. Google lists Daikaya's two floors (17, 18) as one place.

**Changes**

- ✱ 8 New Big Wong, hours: now "Mon–Fri 4:30 p.m.–2 a.m. (Fri until 3 a.m.); Sat 4 p.m.–3 a.m.; Sun 4 p.m.–2 a.m." Source: Google business listing; Apple Maps and the takeout site (newbigwongtogo.com) also show an afternoon opening. Closing times are unchanged.
- ✱ 3 Wok and Roll, Instagram: @wokandrolldclife is no longer available. The restaurant's own site links to @wokandrollkaraoke (it also links @wokandroll_nightclub).
- ✱ 7 Chinatown Express, Instagram added: @chinatownexpressdc (linked from chinatownexpressdc.com; small account).
- ✱ 11 Dumpling District, Instagram added: @phodumplingdistrictusa (dumplingdistrictusa.com links to the old name, which now redirects here).
- No blurbs, rankings or other facts were changed.

**Open questions resolved or narrowed**

- 4 Joy Luck House: its site, Google and Apple all show it open, Tue–Sun 10:30 a.m.–8:30 p.m. The note stays until someone confirms in person.
- 13 TKK Fried Chicken: Google lists "Kung Fu Tea X TKK Chicken" at 625 H St NW Unit 101. The note was removed.
- 14 Poke Ninja: the brand site lists 625 H St NW Unit 103, Washington, DC.
- 15 Tous les Jours: active Google and Apple listings with a matching phone. The "Coming Soon" caveat was dropped; the note about hours in the blurb stays.

**Conflicts still open (shown as notes on the site)**

- 2 Ambrosia: the website still says "deployment paused" (503). Apple's Thursday hours (10 a.m.–1 a.m.) match the guide; Google's hours are garbled (some days "open 24 hours").
- 6 Chinatown Garden: its ordering site says closed Thursdays; Google says open daily 11–9. chinatowngardendc.com now redirects to the listed site.
- 9 China Boy: the website did not load; Google and Apple hours agree with the guide. Apple lists the address as 817 6th St NW (Google: 815).
- 20 Kura: Kura's page showed Fri 11:30 a.m.–9 p.m. (Thanksgiving week); Google's usual Friday is until 10 p.m.; the guide says 9:30 p.m.

**Minor differences, no change made (official site wins)**

- 10 Cinnara: the site says daily 11 a.m.–9:30 p.m. (matches the guide and Apple); Google says 11:30 a.m.–9 p.m.
- 17 Daikaya Ramen Shop: the site says Sunday until 9:30 p.m. (matches the guide); Google says 9 p.m.
- 22 Sharetea: the site says 10:45 a.m. opening (matches the guide); Google and Apple show slightly different daily times.
- 3 Wok and Roll: Apple lists it as "Karaoke" with 4 p.m.–2 a.m. hours. That's the karaoke side, not the restaurant.
- 21 PHO 88: Apple lists pho88noodles.com as the website; the guide lists pho88dc.com. Neither could be fully read.
- 16 Luna Bar / Luna Hall: Apple lists lunahalldc.com, which was "under maintenance"; the guide keeps lunahallgroup.com.
- Still no Instagram account could be confirmed for: Ambrosia, Joy Luck House, Chinatown Garden, New Big Wong, China Boy, Cinnara, Poke Ninja, PHO 88, Sharetea.

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
