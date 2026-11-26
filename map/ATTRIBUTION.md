# Map attribution

The map in this package is a custom SVG street grid, not a screenshot of a slippy map and not raster tiles.

Street centerlines and the landmark footprints for Capital One Arena, Mount Vernon Square, the Friendship Archway, and Gallery Place–Chinatown Metro are derived from **OpenStreetMap** data.

**Required attribution (must appear with any use of the map or a map rebuilt from this street data):**

© OpenStreetMap contributors (https://www.openstreetmap.org/copyright)

The print edition also places a short credit on the map itself:

> Streets © OpenStreetMap contributors · openstreetmap.org/copyright

The dashed outline is the DC Office of Planning Chinatown Design Review boundary, stored in `boundary.geojson` (lon/lat, WGS84). Restaurant coordinates in `pins.geojson` were already in the guide source and were used to place the numbered pins. Pin positions on the SVG are slightly staggered where labels would otherwise collide; the GeoJSON uses the source coordinates, not the staggered SVG positions.

The walk origin is the south edge of the Walter E. Washington Convention Center OpenStreetMap footprint, 801 Mount Vernon Place NW (latitude 38.90313, longitude -77.0229439).

Extent used to project the SVG (west, east, south, north): −77.0251, −77.0178, 38.8941, 38.9036. SVG viewBox is 0 0 1000 1672, with y increasing southward.
