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

  var state = { data: null, notes: {}, places: [], byRank: {}, svgText: null, lastPlacesHash: "#/places" };
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
    if (state.notes[p.rank]) meta += '<span class="card-flag">⚠ Check before you go</span>';
    return '<a class="card" href="#/place/' + p.rank + '">' + pin(p) +
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
    document.title = "DC Chinatown Restaurant Guide · The Lion's Path";
  }

  function viewPlaces(params) {
    setNav("places");
    var active = params.get("c") || "All";
    if (active !== "All" && !COLORS[active]) active = "All";
    state.lastPlacesHash = location.hash || "#/places";

    var counts = {};
    state.places.forEach(function (p) { counts[p.cuisine] = (counts[p.cuisine] || 0) + 1; });
    var order = (state.data.cuisine_sections || []).map(function (s) { return s.cuisine; });

    var chips = '<button class="chip" data-c="All" aria-pressed="' + (active === "All") + '">All <span class="n">' + state.places.length + "</span></button>";
    order.forEach(function (c) {
      chips += '<button class="chip" data-c="' + esc(c) + '" aria-pressed="' + (active === c) + '" style="--c:' + color(c) + '"><span class="dot"></span>' + esc(c) + ' <span class="n">' + (counts[c] || 0) + "</span></button>";
    });

    var html = '<h1 style="margin:22px 0 4px">All 22 places</h1>' +
      '<p style="color:var(--muted);margin:0 0 6px;font-size:.92rem">In guide order. Walk times are from the Convention Center (801 Mount Vernon Pl NW).</p>' +
      '<div class="filters" role="toolbar" aria-label="Filter by cuisine">' + chips + "</div>";

    var inScope = state.places.filter(function (p) { return active === "All" || p.cuisine === active; });
    var featured = inScope.filter(function (p) { return p.featured; });
    if (featured.length) {
      html += '<div class="group-head"><h2>Featured</h2></div><div class="cards">' +
        featured.map(function (p) { return card(p); }).join("") + "</div>";
    }
    (state.data.cuisine_sections || []).forEach(function (sec) {
      if (active !== "All" && sec.cuisine !== active) return;
      var rest = inScope.filter(function (p) { return p.cuisine === sec.cuisine && !p.featured; });
      var featuredHere = state.places.filter(function (p) { return p.cuisine === sec.cuisine && p.featured; });
      if (!rest.length && !featuredHere.length) return;
      html += '<div class="group-head"><h2 style="--c:' + color(sec.cuisine) + '"><span class="dot"></span>' + esc(sec.cuisine) + "</h2>" +
        '<p class="group-intro">' + esc(sec.intro) + "</p>";
      if (featuredHere.length) {
        html += '<p class="group-note">Featured above: ' + featuredHere.map(function (p) {
          return '<a href="#/place/' + p.rank + '">' + p.rank + ". " + esc(p.name) + "</a>";
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
        var h = c === "All" ? "#/places" : "#/places?c=" + encodeURIComponent(c);
        if (location.hash !== h) { state.keepScroll = true; location.hash = h; }
      });
    });
    setHeaderOffset();
    document.title = (active === "All" ? "All places" : active) + " · DC Chinatown Restaurant Guide";
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
    row("For groups", esc(p.group_notes));

    var sources = (p.sources || []).length
      ? '<div class="sources"><strong>Description sources</strong><ul>' + p.sources.map(function (s) {
          return '<li><a href="' + esc(s.url) + '" rel="noopener" target="_blank">' + esc(s.label) + "</a></li>";
        }).join("") + "</ul></div>" : "";

    main.innerHTML =
      '<a class="back" href="' + esc(state.lastPlacesHash) + '">← All places</a>' +
      '<div class="detail-head">' + pin(p, "lg") + "<h1>" + esc(p.name) + "</h1></div>" +
      '<div class="detail-tags">' + tags + "</div>" +
      photo + note +
      '<p class="blurb">' + esc(p.blurb) + "</p>" +
      '<table class="facts"><tbody>' + rows.join("") + "</tbody></table>" +
      '<section style="margin-top:16px">' + sources + "</section>" +
      '<p style="font-size:.85rem"><a href="#/map?pin=' + p.rank + '">Show on map</a></p>' +
      '<nav class="pager" aria-label="Previous and next place">' +
        (prev ? '<a href="#/place/' + prev.rank + '">← ' + prev.rank + ". " + esc(prev.name) + "</a>" : "") +
        (next ? '<a class="next" href="#/place/' + next.rank + '">' + next.rank + ". " + esc(next.name) + " →</a>" : "") +
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
      return '<li><span class="pin" style="--c:' + color(p.cuisine) + '">' + p.rank + '</span><a href="#/place/' + p.rank + '">' + esc(p.name) + "</a></li>";
    }).join("");

    var wrap = main.querySelector("#map-wrap");
    var render = function () {
      wrap.innerHTML = state.svgText;
      wrap.removeAttribute("aria-busy");
      var svg = wrap.querySelector("svg");
      svg.removeAttribute("width"); svg.removeAttribute("height");
      enhanceMap(svg);
      var sel = params.get("pin");
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
      a.setAttribute("href", "#/map?pin=" + encodeURIComponent(key));
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
      history.replaceState(null, "", "#/map");
    });
    if (!fromUrl) history.replaceState(null, "", "#/map?pin=" + encodeURIComponent(key));
    if (fromUrl && target && target.scrollIntoView) {
      setTimeout(function () { target.scrollIntoView({ block: "center" }); }, 50);
    }
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
    main.innerHTML = '<section><h1>Page not found</h1><p><a href="#/">Back to the guide</a></p></section>';
  }

  // ---------- router ----------
  function route() {
    var h = location.hash.replace(/^#/, "") || "/";
    var anchor = null;
    var hashIdx = h.indexOf("#");
    if (hashIdx > -1) { anchor = h.slice(hashIdx + 1); h = h.slice(0, hashIdx); }
    var q = h.indexOf("?");
    var path = q > -1 ? h.slice(0, q) : h;
    var params = new URLSearchParams(q > -1 ? h.slice(q + 1) : "");
    var keep = state.keepScroll; state.keepScroll = false;
    var scrolled = false;

    var m;
    if (path === "/" || path === "") viewHome();
    else if (path === "/map") viewMap(params);
    else if (path === "/places") viewPlaces(params);
    else if ((m = path.match(/^\/place\/(\d+)$/))) viewPlace(m[1]);
    else if (path === "/about") scrolled = viewAbout(anchor);
    else viewNotFound();

    fillAsOf(main);
    if (!keep && !scrolled) window.scrollTo(0, 0);
    if (!keep) main.focus({ preventScroll: true });
  }

  // ---------- boot ----------
  function boot() {
    Promise.all([
      fetch("guide-data.json").then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }),
      fetch("site-notes.json").then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; })
    ]).then(function (res) {
      state.data = res[0];
      state.notes = res[1] || {};
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
