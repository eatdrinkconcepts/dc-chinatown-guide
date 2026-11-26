/* DC Chinatown Restaurant Guide — static single-page app.
 * Data comes from guide-data.json (the master list, shared with the print edition),
 * site-notes.json (visible "check before you go" notes) and map/map.svg.
 * No build step: edit the JSON and refresh.
 */
(function () {
  "use strict";

  var COLORS = {
    "Chinese": "#c0392b",
    "Japanese": "#2c6fbb",
    "Vietnamese": "#1e8449",
    "Taiwanese": "#d68910",
    "Poke": "#138d75",
    "Bubble tea": "#6d4c41",
    "Bakery & desserts": "#b03a7a",
    "Bar": "#4a5a68"
  };
  var CC_ADDRESS = "801 Mount Vernon Pl NW, Washington, DC 20001";

  var state = { data: null, notes: {}, events: null, places: [], byRank: {}, svgText: null, lastPlacesHash: "#places" };
  var main = document.getElementById("main");

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function color(c) { return COLORS[c] || "#8f2c1f"; }
  function pin(p, cls) {
    return '<span class="pin ' + (cls || "") + '" style="--c:' + color(p.cuisine) + '" aria-hidden="true">' + p.rank + "</span>";
  }
  function walkText(p) { return p.walk_time_min != null ? p.walk_time_min + " min walk" : ""; }
  function hostOf(url) {
    try { return new URL(url).host.replace(/^www\./, ""); } catch (e) { return url; }
  }
  function tpl(id) { return document.getElementById(id).content.cloneNode(true); }
  function fillAsOf(root) {
    if (!state.data) return;
    (root || document).querySelectorAll("[data-asof]").forEach(function (el) {
      el.textContent = state.data.current_as_of_display;
    });
  }
  function setNav(route) {
    document.querySelectorAll(".nav a").forEach(function (a) {
      if (a.dataset.route === route) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }
  function setHeaderOffset() {
    var h = document.querySelector(".site-header").offsetHeight;
    document.documentElement.style.setProperty("--hdr", h + "px");
    document.querySelectorAll(".filters").forEach(function (f) { f.style.top = h + "px"; });
  }
  function card(p, opts) {
    opts = opts || {};
    var tags = "";
    if (p.featured) tags += '<span class="tag">Featured</span>';
    if (p.hall) tags += '<span class="tag hall">' + esc(p.hall) + "</span>";
    var meta = '<span class="walk">' + esc(walkText(p)) + "</span>";
    meta += "<span>" + esc(p.type_base || p.type) + "</span>";
    if (p.price) meta += "<span>" + esc(p.price) + "</span>";
    var acts = [];
    if (p.reserve && p.reserve.url && !p.reserve.scope) acts.push("Reservations");
    if ((p.order || []).length) acts.push("Order online");
    if (acts.length) meta += '<span class="card-acts">' + acts.join(" · ") + "</span>";
    if (state.notes[p.rank]) meta += '<span class="card-flag">⚠ Check before you go</span>';
    return '<a class="card" href="#place-' + p.rank + '">' + pin(p) +
      '<div class="card-title">' + esc(p.name) + tags + "</div>" +
      '<div class="card-sub">' + esc(p.cuisine_detail) + "</div>" +
      '<div class="card-meta">' + meta + "</div></a>";
  }

  // ---------- views ----------
  function viewHome() {
    setNav("home");
    main.innerHTML = "";
    main.appendChild(tpl("tpl-home"));
    var featured = state.places.filter(function (p) { return p.featured; })
      .sort(function (a, b) { return (a.featured_order || a.rank) - (b.featured_order || b.rank); });
    main.querySelector("#featured-cards").innerHTML = featured.map(function (p) { return card(p); }).join("");
    var up = upcoming().slice(0, 3), box = main.querySelector("#home-events");
    if (box && up.length) box.innerHTML = '<div class="section-head"><h2>Coming up</h2><a href="#events">All events →</a></div><div class="events">' + up.map(function (e) { return eventCard(e, false); }).join("") + "</div>";
    document.title = "DC Chinatown Restaurant Guide · The Lion's Path";
  }

  function viewPlaces(params) {
    setNav("places");
    var active = "All";
    Object.keys(COLORS).forEach(function (c) { if (slug(c) === params.c) active = c; });
    var feature = params.c === "reservations" ? "reserve" : params.c === "order-online" ? "order" : null;
    function hasFeature(p) { return feature === "reserve" ? !!(p.reserve && p.reserve.url && !p.reserve.scope) : feature === "order" ? (p.order || []).length > 0 : true; }
    state.lastPlacesHash = location.hash || "#places";

    var counts = {};
    state.places.forEach(function (p) { counts[p.cuisine] = (counts[p.cuisine] || 0) + 1; });
    var order = (state.data.cuisine_sections || []).map(function (s) { return s.cuisine; });

    var chips = '<button class="chip" data-c="All" aria-pressed="' + (active === "All" && !feature) + '">All <span class="n">' + state.places.length + "</span></button>";
    chips += '<button class="chip" data-c="reservations" aria-pressed="' + (feature === "reserve") + '">Reservations <span class="n">' + state.places.filter(function (p) { return p.reserve && p.reserve.url && !p.reserve.scope; }).length + "</span></button>";
    chips += '<button class="chip" data-c="order-online" aria-pressed="' + (feature === "order") + '">Order online <span class="n">' + state.places.filter(function (p) { return (p.order || []).length; }).length + "</span></button>";
    order.forEach(function (c) {
      chips += '<button class="chip" data-c="' + esc(c) + '" aria-pressed="' + (active === c) + '" style="--c:' + color(c) + '"><span class="dot"></span>' + esc(c) + ' <span class="n">' + (counts[c] || 0) + "</span></button>";
    });

    var html = '<h1 style="margin:22px 0 4px">All 22 places</h1>' +
      '<p style="color:var(--muted);margin:0 0 6px;font-size:.92rem">In guide order. Walk times are from the Convention Center (801 Mount Vernon Pl NW).</p>' +
      '<div class="filters" role="toolbar" aria-label="Filter by cuisine">' + chips + "</div>";

    var inScope = state.places.filter(function (p) { return (active === "All" || p.cuisine === active) && hasFeature(p); });
    var featured = inScope.filter(function (p) { return p.featured; });
    if (featured.length) {
      html += '<div class="group-head"><h2>Featured</h2></div><div class="cards">' +
        featured.map(function (p) { return card(p); }).join("") + "</div>";
    }
    (state.data.cuisine_sections || []).forEach(function (sec) {
      if (active !== "All" && sec.cuisine !== active) return;
      var rest = inScope.filter(function (p) { return p.cuisine === sec.cuisine && !p.featured; });
      var featuredHere = state.places.filter(function (p) { return p.cuisine === sec.cuisine && p.featured && hasFeature(p); });
      if (!rest.length && !featuredHere.length) return;
      html += '<div class="group-head"><h2 style="--c:' + color(sec.cuisine) + '"><span class="dot"></span>' + esc(sec.cuisine) + "</h2>" +
        '<p class="group-intro">' + esc(sec.intro) + "</p>";
      if (featuredHere.length) {
        html += '<p class="group-note">Featured above: ' + featuredHere.map(function (p) {
          return '<a href="#place-' + p.rank + '">' + p.rank + ". " + esc(p.name) + "</a>";
        }).join(", ") + ".</p>";
      }
      html += "</div>";
      if (rest.length) html += '<div class="cards">' + rest.map(function (p) { return card(p); }).join("") + "</div>";
    });
    if (!inScope.length) html += '<p class="empty">No places in this category.</p>';

    main.innerHTML = html;
    main.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () {
        var c = b.dataset.c;
        var h = c === "All" ? "#places" : "#places-" + (c === "reservations" || c === "order-online" ? c : slug(c));
        if (location.hash !== h) { state.keepScroll = true; location.hash = h; }
      });
    });
    setHeaderOffset();
    var on = main.querySelector('.chip[aria-pressed="true"]');
    if (on && on.parentNode.scrollTo) on.parentNode.scrollTo({ left: on.offsetLeft - 16 });
    document.title = (feature === "reserve" ? "Reservations" : feature === "order" ? "Order online" : active === "All" ? "All places" : active) + " · DC Chinatown Restaurant Guide";
  }

  function actionBar(p) {
    var b = [], notes = [];
    function btn(url, label, cls) { return '<a class="btn ' + cls + '" href="' + esc(url) + '" rel="noopener" target="_blank">' + esc(label) + "</a>"; }
    if (p.reserve && p.reserve.url) b.push(btn(p.reserve.url, p.reserve.label || "Reserve", "btn-primary"));
    (p.order || []).forEach(function (o, i) { b.push(btn(o.url, o.label || "Order online", (!b.length && i === 0) ? "btn-primary" : "btn-ghost")); if (o.note) notes.push(o.note); });
    if (p.menu && p.menu.url) b.push(btn(p.menu.url, p.menu.label || "Menu", "btn-ghost"));
    if (p.phone) b.push('<a class="btn btn-ghost" href="tel:' + esc(p.phone.replace(/[^\d+]/g, "")) + '">Call ' + esc(p.phone.replace(/\s*\([^()]*line\)$/, "")) + "</a>");
    if (p.reserve && p.reserve.note) notes.unshift(p.reserve.note);
    if (p.reserve && !p.reserve.url && p.reserve.label) notes.unshift(p.reserve.label + ".");
    if (!b.length) return "";
    var linked = (p.reserve && p.reserve.url) || (p.order || []).length || (p.menu && p.menu.url);
    return '<div class="actions">' + b.join("") + "</div>" +
      (notes.length ? '<p class="actions-note">' + notes.map(esc).join(" ") + "</p>" : "") +
      (!linked ? "" : '<p class="actions-note">These links go to the restaurant\'s own booking and ordering pages. The Lion\'s Path takes no bookings and earns nothing from them.</p>');
  }

  function viewPlace(rank) {
    setNav("places");
    var p = state.byRank[rank];
    if (!p) { viewNotFound(); return; }
    var i = state.places.indexOf(p);
    var prev = state.places[i - 1], next = state.places[i + 1];

    var tags = "";
    if (p.featured) tags += '<span class="tag">Featured</span>';
    tags += '<span class="tag hall" style="color:' + color(p.cuisine) + ";border-color:" + color(p.cuisine) + '">' + esc(p.cuisine) + "</span>";
    if (p.hall) tags += '<span class="tag hall">' + esc(p.hall) + "</span>";

    var photo = "";
    if (p.photo && p.photo.file) {
      photo = '<figure><img src="' + esc(p.photo.file) + '" alt="' + esc(p.name + " storefront: " + p.photo.caption) + '" loading="lazy">' +
        "<figcaption>" + esc(p.photo.caption) + '. <a href="' + esc(p.photo.url) + '" rel="noopener">Photo: ' + esc(p.photo.credit) + "</a></figcaption></figure>";
    }
    var note = state.notes[p.rank]
      ? '<div class="notice" role="note"><strong>Check before you go</strong>' + esc(state.notes[p.rank]) + "</div>" : "";

    var dir = "https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=" +
      encodeURIComponent(CC_ADDRESS) + "&destination=" + encodeURIComponent(p.address);

    var rows = [];
    function row(label, val) { if (val) rows.push("<tr><th scope=\"row\">" + label + "</th><td>" + val + "</td></tr>"); }
    row("Cuisine", esc(p.cuisine_detail));
    row("Type", esc(p.type));
    row("Address", esc(p.address) + (p.location ? '<span class="small">' + esc(p.location) + "</span>" : ""));
    row("Hours", esc(p.hours) + (p.hours_source ? '<span class="small">Source: ' + esc(p.hours_source) + "</span>" : ""));
    row("Walk", esc(p.walk) + '<span class="small"><a href="' + dir + '" rel="noopener" target="_blank">Walking directions from the Convention Center ↗</a></span>');
    row("Phone", p.phone ? '<a href="tel:' + esc(p.phone.replace(/[^\d+]/g, "")) + '">' + esc(p.phone) + "</a>" : "");
    row("Website", p.website ? '<a href="' + esc(p.website) + '" rel="noopener" target="_blank">' + esc(hostOf(p.website)) + "</a>" : "");
    row("Instagram", p.instagram ? (p.instagram_url ? '<a href="' + esc(p.instagram_url) + '" rel="noopener" target="_blank">' + esc(p.instagram) + "</a>" : esc(p.instagram)) +
      (p.instagram_scope === "brand" ? '<span class="small">Brand account</span>' : "") : "");
    if (p.google_maps_url || p.apple_maps_url) {
      var maps = [];
      if (p.google_maps_url) maps.push('<a href="' + esc(p.google_maps_url) + '" rel="noopener" target="_blank">Google Maps ↗</a>');
      if (p.apple_maps_url) maps.push('<a href="' + esc(p.apple_maps_url) + '" rel="noopener" target="_blank">Apple Maps ↗</a>');
      row("Map listings", maps.join(" · ") + (p.map_listing_note ? '<span class="small">' + esc(p.map_listing_note) + "</span>" : ""));
    }
    row("For groups", esc(p.group_notes));

    var sources = (p.sources || []).length
      ? '<div class="sources"><strong>Description sources</strong><ul>' + p.sources.map(function (s) {
          return '<li><a href="' + esc(s.url) + '" rel="noopener" target="_blank">' + esc(s.label) + "</a></li>";
        }).join("") + "</ul></div>" : "";

    main.innerHTML =
      '<a class="back" href="' + esc(state.lastPlacesHash) + '">← All places</a>' +
      '<div class="detail-head">' + pin(p, "lg") + "<h1>" + esc(p.name) + "</h1></div>" +
      '<div class="detail-tags">' + tags + "</div>" +
      actionBar(p) + photo + note +
      '<p class="blurb">' + esc(p.blurb) + "</p>" +
      '<table class="facts"><tbody>' + rows.join("") + "</tbody></table>" +
      placeEvents(p) + placeMedia(p) +
      '<section style="margin-top:16px">' + sources + "</section>" +
      '<p style="font-size:.85rem"><a href="#map-' + p.rank + '">Show on map</a></p>' +
      '<nav class="pager" aria-label="Previous and next place">' +
        (prev ? '<a href="#place-' + prev.rank + '">← ' + prev.rank + ". " + esc(prev.name) + "</a>" : "") +
        (next ? '<a class="next" href="#place-' + next.rank + '">' + next.rank + ". " + esc(next.name) + " →</a>" : "") +
      "</nav>";
    document.title = p.name + " · DC Chinatown Restaurant Guide";
  }

  function viewMap(params) {
    setNav("map");
    main.innerHTML = "";
    main.appendChild(tpl("tpl-map"));
    document.title = "Map · DC Chinatown Restaurant Guide";

    var legend = Object.keys(COLORS).map(function (c) {
      return '<span style="--c:' + COLORS[c] + '"><i class="dot"></i>' + esc(c) + "</span>";
    }).join("") + '<span><i class="pill"></i>Luna Hall (11–16)</span>';
    main.querySelector("#map-legend").innerHTML = legend;

    main.querySelector("#map-index").innerHTML = state.places.map(function (p) {
      return '<li><span class="pin" style="--c:' + color(p.cuisine) + '">' + p.rank + '</span><a href="#place-' + p.rank + '">' + esc(p.name) + "</a></li>";
    }).join("");

    var wrap = main.querySelector("#map-wrap");
    var render = function () {
      wrap.innerHTML = state.svgText;
      wrap.removeAttribute("aria-busy");
      var svg = wrap.querySelector("svg");
      svg.removeAttribute("width"); svg.removeAttribute("height");
      enhanceMap(svg);
      var sel = params.pin;
      if (sel) selectPin(sel, true);
    };
    if (state.svgText) render();
    else fetch("map/map.svg").then(function (r) { return r.text(); }).then(function (t) {
      state.svgText = t; if (document.body.contains(wrap)) render();
    }).catch(function () {
      wrap.innerHTML = '<img src="map/map.png" alt="Map of the 22 places in DC Chinatown">';
    });
  }

  var SVGNS = "http://www.w3.org/2000/svg";
  function enhanceMap(svg) {
    svg.querySelectorAll("text.mn").forEach(function (label) {
      var shape = label.previousElementSibling;
      if (!shape) return;
      var key = label.textContent.trim().replace("-", "–");
      var a = document.createElementNS(SVGNS, "a");
      a.setAttribute("class", "mpin");
      a.setAttribute("href", "#map-" + key.replace("–", "-"));
      a.setAttribute("data-key", key);
      var names = pinPlaces(key).map(function (p) { return p.rank + ". " + p.name; }).join(", ");
      a.setAttribute("aria-label", names || key);
      shape.parentNode.insertBefore(a, shape);
      a.appendChild(shape); a.appendChild(label);
      a.addEventListener("click", function (e) { e.preventDefault(); selectPin(key, false); });
    });
  }
  function pinPlaces(key) {
    if (key.indexOf("–") > -1) {
      var parts = key.split("–").map(Number);
      return state.places.filter(function (p) { return p.rank >= parts[0] && p.rank <= parts[1]; });
    }
    var p = state.byRank[key];
    return p ? [p] : [];
  }
  function selectPin(key, fromUrl) {
    key = String(key);
    var wrap = document.getElementById("map-wrap");
    var panel = document.getElementById("map-panel");
    if (!wrap || !panel) return;
    // a rank inside Luna Hall highlights the hall pill
    var target = null;
    wrap.querySelectorAll("a.mpin").forEach(function (a) {
      var k = a.getAttribute("data-key");
      var match = k === key || pinPlaces(k).some(function (p) { return String(p.rank) === key; });
      a.classList.toggle("active", match);
      if (match) target = a;
    });
    var list = target ? pinPlaces(target.getAttribute("data-key")) : pinPlaces(key);
    if (!list.length) return;
    var head = list.length > 1 ? "Luna Hall, 625 H St NW · " + list.length + " stalls" : "Pin " + list[0].rank;
    panel.innerHTML = '<div class="map-panel-head"><span>' + esc(head) + '</span><button type="button" aria-label="Close">Close ✕</button></div>' +
      '<div class="cards">' + list.map(function (p) { return card(p); }).join("") + "</div>";
    panel.hidden = false;
    panel.querySelector("button").addEventListener("click", function () {
      panel.hidden = true;
      wrap.querySelectorAll("a.mpin.active").forEach(function (a) { a.classList.remove("active"); });
      history.replaceState(null, "", "#map");
    });
    if (!fromUrl) history.replaceState(null, "", "#map-" + key.replace("–", "-"));
    if (fromUrl && target && target.scrollIntoView) {
      setTimeout(function () { target.scrollIntoView({ block: "center" }); }, 50);
    }
  }

  // ---------- events ----------
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function pd(s) { var a = s.split("-").map(Number); return new Date(a[0], a[1] - 1, a[2]); }
  function today() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function dateRange(e) {
    var s = pd(e.start), f = pd(e.end || e.start);
    if (+s === +f) return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][s.getDay()] + ", " + MON[s.getMonth()] + " " + s.getDate();
    if (s.getMonth() === f.getMonth()) return MON[s.getMonth()] + " " + s.getDate() + "–" + f.getDate();
    return MON[s.getMonth()] + " " + s.getDate() + " – " + MON[f.getMonth()] + " " + f.getDate();
  }
  function upcoming() {
    if (!state.events) return [];
    var t = today();
    return (state.events.dated || []).filter(function (e) { return pd(e.end || e.start) >= t; })
      .sort(function (a, b) { return pd(a.start) - pd(b.start); });
  }
  function placeLinks(ranks) {
    return (ranks || []).map(function (r) {
      var p = state.byRank[r];
      return p ? '<a href="#place-' + r + '">' + r + ". " + esc(p.name) + "</a>" : "";
    }).join(", ");
  }
  function srcLinks(srcs) {
    return (srcs || []).map(function (s) { return '<a href="' + esc(s.url) + '" rel="noopener" target="_blank">' + esc(s.label) + "</a>"; }).join(" · ");
  }
  function eventCard(e, recurring) {
    var when = recurring ? esc(e.schedule) : esc(dateRange(e)) + (e.time ? " · " + esc(e.time) : "");
    return '<article class="event">' +
      '<div class="event-when">' + when + "</div>" +
      '<h3 class="event-title">' + esc(e.title) + "</h3>" +
      (e.where ? '<div class="event-where">' + esc(e.where) + "</div>" : "") +
      '<p class="event-desc">' + esc(e.description) + "</p>" +
      '<div class="event-meta">At: ' + placeLinks(e.ranks) + "</div>" +
      '<div class="event-src">Source: ' + srcLinks(e.sources) + "</div></article>";
  }
  function viewEvents() {
    setNav("events");
    document.title = "Events · DC Chinatown Restaurant Guide";
    var ev = state.events;
    if (!ev) { main.innerHTML = '<section><h1>Events</h1><p class="empty">The events list did not load.</p></section>'; return; }
    var list = upcoming(), html = '<h1 style="margin:22px 0 4px">Events</h1>' +
      '<p style="color:var(--muted);margin:0 0 4px;font-size:.92rem">What the places in this guide have announced through ' + esc(MONTHS[pd(ev.window_end).getMonth()] + " " + pd(ev.window_end).getFullYear()) +
      ', taken from their own websites and Instagram. Plans change, so check with the restaurant before you go.</p>' +
      '<span class="asof">Checked ' + esc((function (d) { return MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(); })(pd(ev.checked))) + "</span>";
    if (list.length) {
      var cur = "";
      list.forEach(function (e) {
        var s = pd(e.start), t = today(), m = s < t ? t : s, key = MONTHS[m.getMonth()] + " " + m.getFullYear();
        if (key !== cur) { if (cur) html += "</div>"; html += '<h2 class="month">' + key + '</h2><div class="events">'; cur = key; }
        html += eventCard(e, false);
      });
      html += "</div>";
    } else html += '<p class="empty">No dated events are on the calendar right now.</p>';
    if ((ev.recurring || []).length) {
      html += '<h2 class="month">Every week</h2><div class="events">' + ev.recurring.map(function (e) { return eventCard(e, true); }).join("") + "</div>";
    }
    if (ev.not_yet_announced) html += '<p class="group-note" style="margin-top:18px">' + esc(ev.not_yet_announced) + "</p>";
    html += '<p class="group-note">Events are listed for information only. They are run by the restaurants, not by The Lion\'s Path.</p>';
    main.innerHTML = html;
  }
  function placeEvents(p) {
    if (!state.events) return "";
    var mine = upcoming().filter(function (e) { return (e.ranks || []).indexOf(p.rank) > -1; })
      .map(function (e) { return eventCard(e, false); })
      .concat((state.events.recurring || []).filter(function (e) { return (e.ranks || []).indexOf(p.rank) > -1; }).map(function (e) { return eventCard(e, true); }));
    return mine.length ? '<section><h2 class="sub">Events</h2><div class="events">' + mine.join("") + '</div><p class="group-note"><a href="#events">All events →</a></p></section>' : "";
  }
  function placeMedia(p) {
    if (!(p.media || []).length) return "";
    return '<section><h2 class="sub">In the news</h2><ul class="media">' + p.media.map(function (m) {
      return '<li><a href="' + esc(m.url) + '" rel="noopener" target="_blank">' + esc(m.title) + '</a><span class="small">' + esc(m.outlet) + (m.date ? " · " + esc(m.date) : "") + "</span></li>";
    }).join("") + "</ul></section>";
  }

  function viewAbout(anchor) {
    setNav("about");
    main.innerHTML = "";
    main.appendChild(tpl("tpl-about"));
    document.title = "About The Lion's Path · DC Chinatown Restaurant Guide";
    if (anchor) {
      var el = document.getElementById(anchor);
      if (el) setTimeout(function () { el.scrollIntoView(); }, 0);
      return true;
    }
  }

  function viewNotFound() {
    setNav("");
    main.innerHTML = '<section><h1>Page not found</h1><p><a href="#home">Back to the guide</a></p></section>';
  }

  // ---------- router ----------
  // Routes are plain #names so links work on GitHub Pages and in the Claude preview:
  // (none) home · #map · #map-5 · #map-11-16 · #places · #places-japanese · #place-5 · #about · #credits
  function slug(s) { return String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function route() {
    var h = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    var keep = state.keepScroll; state.keepScroll = false;
    var scrolled = false, m;
    if (h === "" || h === "home") viewHome();
    else if (h === "map") viewMap({});
    else if ((m = h.match(/^map-(\d+(?:-\d+)?)$/))) viewMap({ pin: m[1].replace("-", "–") });
    else if (h === "places") viewPlaces({});
    else if ((m = h.match(/^places-([a-z0-9-]+)$/))) viewPlaces({ c: m[1] });
    else if ((m = h.match(/^place-(\d+)$/))) viewPlace(m[1]);
    else if (h === "events") viewEvents();
    else if (h === "about") viewAbout();
    else if (h === "credits") scrolled = viewAbout("credits");
    else viewNotFound();

    fillAsOf(main);
    if (!keep && !scrolled) window.scrollTo(0, 0);
    if (!keep) main.focus({ preventScroll: true });
  }

  // ---------- boot ----------
  function boot() {
    Promise.all([
      fetch("guide-data.json").then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }),
      fetch("site-notes.json").then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
      fetch("events.json").then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
    ]).then(function (res) {
      state.data = res[0];
      state.notes = res[1] || {};
      state.events = res[2];
      state.places = (state.data.places || []).slice().sort(function (a, b) { return a.rank - b.rank; });
      state.places.forEach(function (p) { state.byRank[p.rank] = p; });
      fillAsOf(document);
      window.addEventListener("hashchange", route);
      window.addEventListener("resize", setHeaderOffset);
      route();
    }).catch(function (err) {
      main.innerHTML = '<section><h1>Could not load the guide</h1><p>The listings file did not load (' + esc(err.message) +
        '). If you opened index.html directly from your computer, run a local web server instead; see README.md.</p></section>';
    });
  }
  boot();
})();
