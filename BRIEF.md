# Brief for a mobile-first web version of the DC Chinatown Restaurant Guide

This package is a handoff from The Lion's Path so a web guide can be built for people visiting DC's Chinatown, especially guests of events at the Walter E. Washington Convention Center. It is based on the text-and-map print edition in this folder (`dc-chinatown-restaurant-guide-2027.pdf`).

The print PDF is a reference for tone, order, typography, and layout decisions. The structured data, copy, map, and the seven cleared Wikimedia photographs in this package are what the site should be built from.

**Nothing in this package has been published yet.** Data should be re-verified before the site goes live. No restaurant has agreed to appear in this guide, to host visitors, or to offer anything. The site must not imply a partnership, sponsorship, endorsement, discount, or official relationship with any restaurant.

## Purpose

A mobile-first web guide for Convention Center visitors (and anyone else coming to eat in Chinatown) that helps them walk to independent and neighborhood restaurants instead of defaulting to chains. The voice should feel like a good city guidebook — specifically in the style of **Ryan Sutton** and **Francis Lam**: precise, appetizing, historically aware, and unwilling to flatter. Keep the blurbs as written unless a fact-check forces a change.

Point readers to Instagram **@lionspathdc** (`https://www.instagram.com/lionspathdc/`) for updates. Do not invent a Lion's Path website or email as the public contact.

## Hard rules

1. **Lucky Danger is #1. Ambrosia is #2.** Keep that featured ranking. Do not reorder the six featured places (Lucky Danger, Ambrosia, Wok and Roll, Joy Luck House, Reren Lamen & Bar, Chinatown Garden).
2. **Never describe Lion's Path as a “bridge between City Hall and Chinatown”** (or “between City Hall and the Chinatown community”). That wording was deliberately removed and must not be reused or paraphrased back in.
3. **No discount card, no offers, no implied deals.** The expired print discount card was removed and must stay out.
4. **Use only the seven photographs in `photos/`, with credits shown** next to each image and on a credits page. Credit lines and license URLs are in `photo-credits.md`. Hudson approved four additional Wikimedia Commons photographs on November 26, 2026, as a separate rights clearance beyond the original three-photo rule (seven openly licensed images in all). Do not scrape, generate, or substitute other restaurant photos, including stock, AI-generated, or restaurant-owned images, without written permission.
5. **Point to Instagram @lionspathdc**, including the QR in `brand/` if a print-like or shareable treatment is useful.
6. **Keep the guidebook voice** (Sutton / Lam): specific dishes only when a source names them, no hype, no invented color.
7. **Do not imply partnership.** A listing is not an agreement. Do not use language such as “partner restaurants,” “official picks in collaboration with,” or “recommended by the restaurants themselves.”

## Current as of, and re-verification

All data in this package is **current as of November 26, 2026**. Hours, websites, lease status, and stall lineups change. **Re-verify every place — especially hours, phone numbers, open/closed status, and the caveats below — before publishing.** Display a visible “Current as of …” date on the site, and plan to update it when the data is checked again.

## Known data caveats

Treat these as open issues, not settled facts:

- **Joy Luck House (748 6th St NW).** A Washingtonian piece (October 2025) said the lease was up in September 2026. Listings as of November 15, 2026 (official site hours; Restaurantji) still showed it open, and no closure notice was found. It remains in the guide, flagged only. Confirm it is still open before launch.
- **New Big Wong opening time.** Closing times used here are 2 a.m. Sunday–Thursday and 3 a.m. Friday–Saturday (Destination DC late-night list, updated August 5, 2026, plus current listings). The opening time is disputed: the DowntownDC BID has listed 10:30 a.m.; some directories now show 4:30 p.m. The hours field already flags this. Do not invent an opening time.
- **Ambrosia website down.** `https://ambrosiadc.vercel.app/` returned HTTP 503 (DEPLOYMENT_PAUSED) on November 26 and again on November 27, 2026. The URL is still listed. Hours and the blurb were updated on November 27 from Ambrosia's Instagram announcements of November 9 and 12, 2026 (open continuously from 11 a.m. Thursday through 10 p.m. Monday; Tuesday–Wednesday 11 a.m.–10 p.m.), corroborated that day by the DowntownDC BID listing. There is still no live official hours page.
- **Tous les Jours and TKK Fried Chicken at Luna Hall (625 H St NW).** Tous les Jours' official store page listed the DC hall (Unit 101) as open on November 26, 2026, with hours that match the hall; Luna Hall Group's homepage still said “Coming Soon” for that stall. TKK Fried Chicken appears in current DC hall listings (including a combined Kung Fu Tea / TKK Yelp listing); TKK's national site does not list the address. Confirm both stalls before launch.
- **Pelicana Chicken and Takumi** appear on Luna Hall Group's site as group brands but could not be confirmed at the DC hall; **Pollo Aria**, a former stall, has closed. None of these is in the 22. Carmen's Italian Ice is at the hall but is not an Asian restaurant and is not listed.
- **China Boy and Chinatown Express hours** come from listings, not a usable official page, as of the November 26 refresh.
- **Kura Revolving Sushi Bar.** Regular hours are used, not the Thanksgiving-week hours that the official page showed on November 26, 2026 (Thursday closed, Friday until 9 p.m.).
- **Kung Fu Tea and Tous les Jours blurbs** mention slightly different hours than the facts table (Kung Fu Tea blurb: 11 a.m.–9:30 p.m.; Tous les Jours blurb: 11:15 a.m.–10:30 p.m.). The facts-table hours are the Luna Hall hours used across stalls, except where a store page supplied its own. Prefer a visible note over silently “fixing” the blurb.
- **Walk times** are Manhattan distance on the downtown street grid from the south edge of the Convention Center OSM footprint (801 Mount Vernon Place NW), at 3 mph, rounded to the nearest minute — not live walking directions.
- **The alleyway / public-investment line** on the back page was deliberately softened to “substantial proposed public investment.” Do not restore an older “$3 million in committed public investment” claim.

A few other Asian restaurants in or near the boundary are **not** in this 22-place guide and should not be added without a separate editorial decision: Spice 6 (740 6th St NW, reopened November 9, 2026 under new management — flagged as a candidate only); Zumo Thai; Chili Bistro; Wasai & Gong Cha; Karizma / Karma Modern Indian (was in renovation after October 17, 2026); Absolute Thai; Absolute Noodle & Sushi Bar. Closed places explicitly not included: Market To Market, Thai Chili, Full Kee, Momiji, Jackey Cafe, Tony Cheng's, Tonari.

## Suggested site structure

1. **Home / intro** — Cover identity, the “Welcome to Chinatown” history, “Where this covers,” the November 26, 2026 (or later re-check) date, and a clear path to the map and the list. Featured six can be teased here, with Lucky Danger and Ambrosia first.
2. **Map** — Use `map/map.svg` or `map/map.png`, or rebuild an interactive map from `map/boundary.geojson` and `map/pins.geojson`. Keep the Design Review boundary, the Convention Center / Mount Vernon Square relationship, the Luna Hall 11–16 marker logic, and the OpenStreetMap attribution (required).
3. **List with cuisine filter** — All 22 places in guide order, filterable by the `cuisine` field (Chinese, Japanese, Vietnamese, Taiwanese, Poke, Bubble tea, Bakery & desserts, Bar). Featured places should remain visible as featured even when the user is browsing by cuisine. Show walk time from the Convention Center on every card.
4. **Place detail** — Rank, name, blurb (exact text), facts (cuisine detail, type, address, hours, walk, phone, website, Instagram, group notes, location/hall), sources, and the Wikimedia photo only when one is supplied. No implied offers.
5. **About Lion's Path** — Use the back-page copy in `copy.md`. Include guiding priorities, the work underway, Instagram @lionspathdc (and the QR if useful), photo credits, map attribution, and a plain statement that listings are independent and do not imply partnership. Do not add City Hall “bridge” language. Do not add a discount or offers module.

A footer “Current as of …” line, analogous to the print footer, should appear throughout.

## What's in this package

| File | What it is |
| --- | --- |
| `README.md` | This brief |
| `guide-data.json` | All 22 places in guide order, plus guide metadata and cuisine-section intros |
| `guide-data.csv` | The same place data, flattened for spreadsheets |
| `copy.md` | Intro, history, section intros, map caption, and back-page / About copy |
| `photo-credits.md` | Exact author, license, and Wikimedia URL for the seven photos |
| `photos/` | The seven Wikimedia photographs (three original storefronts, plus four added with Hudson's approval on November 26, 2026) |
| `map/map.svg` | Self-contained street-grid map (same drawing as the print map) |
| `map/map.png` | Raster export of that map |
| `map/map-page.png` | The full map page from the print PDF, including legend, caption, and street index |
| `map/boundary.geojson` | Chinatown Design Review boundary |
| `map/pins.geojson` | Pin points for the 22 places (Luna Hall stalls share an address) and the walk origin |
| `map/ATTRIBUTION.md` | Required basemap attribution |
| `brand/logo.svg` | Lion's Path logo, as used on the print back page |
| `brand/ig-qr.svg` and `brand/ig-qr.png` | QR code to https://www.instagram.com/lionspathdc/ |
| `brand/USAGE.md` | How the logo and QR may be used |
| `dc-chinatown-restaurant-guide-2027.pdf` | The text-and-map print edition, for reference |

## Data field notes

In `guide-data.json`, each place includes: `rank`, `featured`, `name`, `cuisine` (filter category), `cuisine_detail` (the “Cuisine” line from the print facts table), `type`, `address`, `lat` / `lng`, `hours`, `walk` plus numeric `walk_distance_mi` and `walk_time_min`, `phone`, `website`, `instagram`, `group_notes`, `blurb` (exact print text), and `sources` (array of `{label, url}`).

Additional fields that help a web build: `hall`, `location` (the print “Location” line, when present), `instagram_url`, `instagram_scope` (`brand` vs location), `hours_source`, `status`, and `photo` (only when a cleared Wikimedia image exists).

Coordinates are WGS84. Walk times start from latitude 38.90313, longitude -77.0229439, the south edge of the Convention Center footprint at 801 Mount Vernon Place NW.

On the map, Luna Hall's six stalls (ranks 11–16: Dumpling District, Kung Fu Tea, TKK Fried Chicken, Poke Ninja, Tous les Jours, Luna Bar) share one dark marker in the print map. Daikaya Ramen Shop (#17) and The Izakaya at Daikaya (#18) share a building at 705 6th St NW and sit side by side.

## Design cues from the print edition (optional, not mandatory)

- Fonts: Inter (UI, facts, ranks) and Source Serif Pro (headings and blurbs)
- Lion's Path red `#8F2C1F` / a close print red `#8a2b1f`; cream page `#F8EFD9` / `#fbfaf7`; gold accent `#f0c987`
- Cuisine colors used on map pins: Chinese `#c0392b`, Japanese `#2c6fbb`, Vietnamese `#1e8449`, Taiwanese `#d68910`, Poke `#138d75`, Bubble tea `#6d4c41`, Bakery & desserts `#b03a7a`, Bar `#4a5a68`

These are cues from the booklet, not a required brand system for the web.

## Partnership disclaimer (please put this on the site)

No restaurant in this guide has agreed to be included, to work with The Lion's Path, or to offer visitors anything. Inclusion is editorial. Nothing on the site should be read as a partnership, sponsorship, or joint promotion.
