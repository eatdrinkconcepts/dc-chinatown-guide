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

## 2026-11-26 · Claude: Reserve / Order / Menu buttons

Hudson asked to make it easy for guide users to book, order online and see menus.

**New fields in `guide-data.json`:** `reserve` {url, label, note, scope}, `order` [{url, label, note}], `menu` {url, label}. In the CSV they are `reserve_url`, `order_urls` and `menu_url`. All links come from each restaurant's own website (Nov 26, 2026). Third-party links (DoorDash) appear only where the restaurant itself links to them. Menus are links to the restaurants' own pages, not copies, so they stay current and avoid copying anyone's menu.

- Reservations: 1 Lucky Danger (OpenTable) and 18 The Izakaya at Daikaya (OpenTable). 3 Wok and Roll has a karaoke-room booking button (`scope: karaoke`), so it's left out of the "Reservations" filter. 17 Daikaya Ramen Shop is marked walk-in only.
- Online ordering: 14 places (1, 4, 5, 6, 7, 8, 10, 11, 14, 15, 17, 19, 20, 22). Poke Ninja's link is Luna Hall's own Toast page, which covers Poke Ninja and Dumpling District.
- Menus: 15 places.
- No links found for: 2 Ambrosia (site offline), 9 China Boy and 21 PHO 88 (sites would not load), 12 Kung Fu Tea, 13 TKK, 16 Luna Bar. Grok, if you find official links for these, add them in the same format.

**On the site:** each place page now has a row of buttons (Reserve, Order, Menu, Call) and a line saying the links go to the restaurant's own pages and that The Lion's Path takes no bookings and earns nothing from them. Cards show "Reservations · Order online", and the Places list has "Reservations" and "Order online" filters. No change is needed to the PDF, unless Grok wants to print menu or ordering URLs.

---

## 2026-11-26 · Claude: events calendar, "In the news" links, Ambrosia hours

Hudson asked for an events calendar from the restaurants' websites and social media, and for news and media links on each place. Hudson chose to include dated special events and recurring nights, covering three months (through Feb 28, 2027).

**New file: `events.json`.** It has two lists: dated events and recurring nights. Every item cites the restaurant's own website or Instagram, or the event organizer, and nothing is an offer or deal. Deals were left out on purpose (BRIEF.md rule 3): Lucky Danger's $25 lunch and Wok and Roll's Thanksgiving karaoke promotion. The website has a new **Events** tab, a "Coming up" block on the home page, and an Events section on each place page.

- Dated: Lucky Danger and Daikaya (Booth 72) at the DowntownDC Holiday Market, Nov 13–Dec 23; Thanksgiving closures and hours; Lucky Danger Chinese mahjong classes on Dec 9 and Dec 16 ($35, ticketed).
- Recurring: Lucky Danger's weekly mahjong classes and hourly table rental; nightly karaoke at Wok and Roll (606 H St NW).
- No place had posted Christmas, New Year's Eve or Lunar New Year (Feb 6, 2027) plans yet.

**New field in `guide-data.json` / CSV: `media`.** A list of {outlet, date, title, url} for press coverage. The titles are descriptions, not quoted headlines. Every link was found by search, and the PoPville links for Cinnara, Luna Hall and Sharetea were opened and checked. Places 15 (Tous les Jours) and 18 have little or no press.

**✱ Listing change for the PDF: 2 Ambrosia hours.** Ambrosia's Instagram (Nov 9 and 12, 2026) announced new hours: Mon–Wed 11 a.m.–10 p.m., open 24 hours Thu–Sun. Google matches. Hours now read "Mon–Wed 11 a.m.–10 p.m.; open 24 hours Thu–Sun (from 11 a.m. Thursday through 10 p.m. Monday)". **The blurb's last sentence is now wrong** ("keeps night-owl hours: 1 a.m. on weeknights, 2 a.m. Friday to Sunday"). Claude left the blurb as written and added a visible note on the site. Grok, please propose a corrected sentence for both the site and the PDF.

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
- ✱ Instagram handles supplied by Hudson and confirmed to exist (Nov 26): 2 Ambrosia @ambrosiadc · 6 Chinatown Garden @chinatowngardendc · 10 Cinnara @eatcinnara · 21 PHO 88 @pho88_dc · 22 Sharetea @sharetea_dc_chinatown.
- Still no Instagram account for: Joy Luck House, New Big Wong, China Boy, Poke Ninja.

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
