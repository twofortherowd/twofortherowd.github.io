/* Two for the Row'd — suitcase opener.
   Plays on every homepage load, on the homepage only, before the page is revealed.
   Never plays for: search-engine visitors, reduced-motion users, Save-Data or
   2G connections, bots, or anyone landing on a specific tab (e.g. /#deals).
   The homepage is fully loaded underneath; tap, Esc or Skip ends it at once. */
(function () {
  "use strict";
  var KEY = "tftrOpenerSeen";
  /* Plays on every homepage visit (Nicola's choice). To make it once per visit again, restore the ls.get(KEY) check below. */
  var ls = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return "1"; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  try {
    var p = location.pathname;
    if (p !== "/" && p !== "/index.html") return;
    if (typeof INITIAL_HASH !== "undefined" && INITIAL_HASH) return;
    if (location.search && /[?&]noopener/.test(location.search)) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (/(google|bing|duckduckgo|yahoo|ecosia|baidu|yandex)\./i.test(document.referrer || "")) return;
    if (/bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent || "")) return;
    var c = navigator.connection;
    if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ""))) return;
  } catch (e) { return; }

  var small = Math.min(window.innerWidth, window.innerHeight * 1.78) < 900;
  var SRC_CLOSED = small ? "/img/opener-suitcase-closed-sm.webp" : "/img/opener-suitcase-closed.webp";
  var SRC_OPEN = small ? "/img/opener-suitcase-open-sm.webp" : "/img/opener-suitcase-open.webp";
  var SRC_US = "/img/home-tile-destinations.jpg";

  var css = "" +
    ".tfo{position:fixed;inset:0;z-index:20000;background:#0e0a05;overflow:hidden;cursor:pointer;opacity:0;transition:opacity .45s ease}" +
    ".tfo.tfo-in{opacity:1}.tfo.tfo-out{opacity:0;transition:opacity .8s ease}" +
    ".tfo-frame{position:absolute;left:50%;top:50%;width:max(100vw,177.78vh);aspect-ratio:16/9;translate:-50% -50%;transition:transform 2.4s cubic-bezier(.4,0,.3,1),opacity .6s ease}" +
    "@media (max-aspect-ratio:1/1){.tfo-frame{width:165vw}}" +
    ".tfo-frame img{position:absolute;inset:0;width:100%;height:100%;display:block}" +
    ".tfo-closed{transform:scale(1.08);transform-origin:50% 46%}.tfo-closed.tfo-on{transform:scale(1)}" +
    ".tfo-open{opacity:0;transform:scale(1.16);transform-origin:52% 42%}" +
    ".tfo-open.tfo-on{opacity:1;transform:scale(1);transition:transform 2.6s cubic-bezier(.45,0,.3,1),opacity .7s ease}" +
    ".tfo-open.tfo-push{transform:scale(1.12);transition:transform 1.2s cubic-bezier(.5,0,.3,1)}" +
    ".tfo-seam{position:absolute;left:10%;right:9%;top:45.6%;height:6px;margin-top:-3px;border-radius:6px;background:#fff3c4;" +
      "box-shadow:0 0 18px 6px rgba(255,214,120,.95),0 0 70px 26px rgba(255,190,80,.6);transform:scaleX(0);opacity:0;transition:transform .6s cubic-bezier(.3,0,.2,1),opacity .3s}" +
    ".tfo-seam.tfo-on{transform:scaleX(1);opacity:1}" +
    ".tfo-bloom{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .9s ease;" +
      "background:radial-gradient(ellipse at 50% 46%,rgba(255,246,216,.95) 0%,rgba(255,210,122,.85) 40%,rgba(232,166,64,.7) 100%)}" +
    ".tfo-bloom.tfo-on{opacity:1;transition:opacity .35s ease}" +
    ".tfo-vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 75% at 50% 45%,rgba(0,0,0,0) 55%,rgba(14,10,5,.6) 100%)}" +
    ".tfo-spark{position:absolute;bottom:34%;width:4px;height:4px;border-radius:50%;background:#fff3c4;box-shadow:0 0 8px 2px rgba(255,220,130,.85);opacity:0;animation:tfoRise 3.2s linear infinite}" +
    "@keyframes tfoRise{0%{opacity:0;transform:translate(0,0)}15%{opacity:.9}100%{opacity:0;transform:translate(20px,-34vh)}}" +
    ".tfo-title{position:absolute;left:0;right:0;top:9vh;text-align:center;color:#fdf8ef;text-shadow:0 2px 14px rgba(0,0,0,.6);opacity:0;transform:translateY(14px);transition:opacity .8s ease,transform .8s ease;pointer-events:none}" +
    "@media (max-aspect-ratio:1/1){.tfo-title{top:auto;bottom:10vh}}" +
    ".tfo-title.tfo-on{opacity:1;transform:none}" +
    ".tfo-kick{font:600 12px/1.4 'DM Sans',system-ui,sans-serif;letter-spacing:.3em;color:#ffd84a;margin-bottom:8px}" +
    ".tfo-name{font-family:'Playfair Display',Georgia,serif;font-size:clamp(34px,6vw,58px);line-height:1}" +
    ".tfo-open.tfo-dive{opacity:0;transform:scale(2.2);transition:transform 1.3s cubic-bezier(.55,0,.4,1),opacity .9s ease .3s}" +
    ".tfo-us{position:absolute;left:50%;top:50%;height:min(84vh,118vw);aspect-ratio:3/4;translate:-50% -50%;opacity:0;transform:scale(1.55) rotate(0deg);transform-origin:50% 32%;" +
      "transition:opacity .9s ease,transform 1.6s cubic-bezier(.3,0,.2,1)}" +
    ".tfo-us img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}" +
    ".tfo-us.tfo-on{opacity:1}" +
    ".tfo-us.tfo-out2{transform:scale(.86) rotate(-2deg);box-shadow:0 0 0 12px #fbf7ef,0 0 0 13px rgba(0,0,0,.08),0 30px 60px rgba(0,0,0,.55)}" +
    ".tfo-cap{position:absolute;left:0;right:0;bottom:-58px;text-align:center;font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:24px;color:#fdf8ef;opacity:0;transition:opacity .7s ease .6s}" +
    ".tfo-us.tfo-out2 .tfo-cap{opacity:1}" +
    ".tfo.tfo-land{background:transparent;transition:background-color .9s ease}" +
    ".tfo.tfo-land .tfo-frame,.tfo.tfo-land .tfo-bloom,.tfo.tfo-land .tfo-vig,.tfo.tfo-land .tfo-title,.tfo.tfo-land .tfo-skip,.tfo.tfo-land .tfo-cap{opacity:0!important;transition:opacity .6s ease}" +
    ".tfo-fly{position:fixed;z-index:3;overflow:hidden;pointer-events:none;box-shadow:0 0 0 12px #fbf7ef,0 30px 60px rgba(0,0,0,.55);" +
      "transition:left 1.15s cubic-bezier(.6,0,.2,1),top 1.15s cubic-bezier(.6,0,.2,1),width 1.15s cubic-bezier(.6,0,.2,1),height 1.15s cubic-bezier(.6,0,.2,1)," +
      "transform 1.15s cubic-bezier(.6,0,.2,1),border-radius 1.15s ease,box-shadow .9s ease,opacity .5s ease}" +
    ".tfo-fly img{width:100%;height:100%;object-fit:cover;display:block}" +
    ".tfo-skip{position:absolute;top:18px;right:18px;z-index:2;min-height:44px;padding:0 18px;background:rgba(26,18,8,.5);border:1px solid rgba(253,248,239,.55);" +
      "border-radius:999px;color:#fdf8ef;font:600 14px 'DM Sans',system-ui,sans-serif;cursor:pointer}" +
    ".tfo-skip:focus-visible{outline:2px solid #ffd84a;outline-offset:2px}";

  var timers = [];
  var done = false;
  var overlay, closedF, openF, seam, bloom, title, sparks, us;
  var prevOverflow = "";

  function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function on(el) { el.classList.add("tfo-on"); }
  function track(name) { try { if (window.gtag) gtag("event", name); } catch (e) {} }

  function finish(skipped) {
    if (done) return;
    done = true;
    timers.forEach(clearTimeout);
    track(skipped ? "opener_skip" : "opener_complete");
    overlay.classList.add("tfo-out");
    document.documentElement.style.overflow = prevOverflow;
    document.removeEventListener("keydown", onKey);
    setTimeout(function () { if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 850);
  }
  /* Fly the photo of us onto the matching homepage tile, so the opener melts into the site */
  function land() {
    if (done) return;
    timers.forEach(clearTimeout); timers = [];
    var from = us.querySelector("img").getBoundingClientRect();
    var tile = document.querySelector('img[src*="home-tile-destinations"]');
    var to = tile ? tile.getBoundingClientRect() : null;
    var visible = to && to.width > 40 && to.top >= 0 && to.bottom <= window.innerHeight;
    var fly = document.createElement("div");
    fly.className = "tfo-fly";
    fly.style.cssText = "left:" + from.left + "px;top:" + from.top + "px;width:" + from.width + "px;height:" + from.height + "px;transform:rotate(-2deg);border-radius:2px";
    fly.innerHTML = '<img alt="" src="' + SRC_US + '">';
    overlay.appendChild(fly);
    us.style.visibility = "hidden";
    overlay.classList.add("tfo-land");
    document.documentElement.style.overflow = prevOverflow;
    void fly.offsetWidth;
    if (visible) {
      var radius = "14px";
      try {
        var el = tile;
        for (var i = 0; i < 4 && el; i++) { var br = getComputedStyle(el).borderTopLeftRadius; if (br && br !== "0px") { radius = br; break; } el = el.parentElement; }
      } catch (e) {}
      fly.style.left = to.left + "px"; fly.style.top = to.top + "px";
      fly.style.width = to.width + "px"; fly.style.height = to.height + "px";
      fly.style.transform = "rotate(0deg)"; fly.style.borderRadius = radius;
      fly.style.boxShadow = "0 0 0 0 rgba(251,247,239,0),0 0 0 rgba(0,0,0,0)";
      setTimeout(function () { fly.style.opacity = "0"; }, 1150);
    } else {
      fly.style.transform = "rotate(0deg) scale(.6)";
      fly.style.opacity = "0";
    }
    setTimeout(function () { finish(false); }, visible ? 1500 : 900);
  }
  function onKey(e) { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { e.preventDefault(); finish(true); } }

  function build() {
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    overlay = document.createElement("div");
    overlay.className = "tfo";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", "Two for the Row'd intro. Press Skip or Escape to go straight to the site.");

    closedF = document.createElement("div");
    closedF.className = "tfo-frame tfo-closed";
    closedF.innerHTML = '<img alt="" src="' + SRC_CLOSED + '"><div class="tfo-seam"></div>';
    seam = closedF.querySelector(".tfo-seam");

    openF = document.createElement("div");
    openF.className = "tfo-frame tfo-open";
    var sp = "";
    var xs = [14, 22, 30, 38, 46, 54, 62, 70, 78, 86, 26, 50, 66, 82];
    for (var i = 0; i < xs.length; i++) {
      sp += '<span class="tfo-spark" style="left:' + xs[i] + '%;animation-delay:' + (i * 0.23).toFixed(2) + 's"></span>';
    }
    openF.innerHTML = '<img alt="" src="' + SRC_OPEN + '">' + sp;

    us = document.createElement("div"); us.className = "tfo-us";
    us.innerHTML = '<img alt="" src="' + SRC_US + '"><div class="tfo-cap">Nicola &amp; P\u00e1draig</div>';
    bloom = document.createElement("div"); bloom.className = "tfo-bloom";
    var vig = document.createElement("div"); vig.className = "tfo-vig";
    title = document.createElement("div"); title.className = "tfo-title";
    title.innerHTML = '<div class="tfo-kick">FROM CARLOW TO ANYWHERE</div><div class="tfo-name">Two for the Row’d</div>';

    var skip = document.createElement("button");
    skip.type = "button"; skip.className = "tfo-skip"; skip.textContent = "Skip";
    skip.addEventListener("click", function (e) { e.stopPropagation(); finish(true); });

    overlay.appendChild(closedF); overlay.appendChild(openF); overlay.appendChild(us); overlay.appendChild(bloom);
    overlay.appendChild(vig); overlay.appendChild(title); overlay.appendChild(skip);
    overlay.addEventListener("click", function () { finish(true); });
    document.addEventListener("keydown", onKey);

    prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.appendChild(overlay);
  }

  function play() {
    /* Don't stack the newsletter pop-up on top of the opener in the same visit */
    try { sessionStorage.setItem("promoClosedXmas26", "1"); } catch (e) {}
    build();
    track("opener_play");
    requestAnimationFrame(function () {
      overlay.classList.add("tfo-in");
      requestAnimationFrame(function () { on(closedF); });
    });
    at(1600, function () { on(seam); });
    at(2200, function () { on(bloom); });
    at(2550, function () { closedF.style.opacity = "0"; on(openF); bloom.classList.remove("tfo-on"); });
    at(3200, function () { on(title); });
    /* dive into the suitcase, land close-up on the two of us, then pull back to a framed print */
    at(4700, function () { title.classList.remove("tfo-on"); openF.classList.add("tfo-dive"); });
    at(5000, function () { on(us); });
    at(5500, function () { us.classList.add("tfo-out2"); });
    at(6900, land);
  }

  /* Preload both images; give up quietly if they're slow so nobody waits */
  var ready = 0, gaveUp = false;
  var giveUp = setTimeout(function () { gaveUp = true; }, 2500);
  function loaded() { ready++; if (ready === 3 && !gaveUp) { clearTimeout(giveUp); play(); } }
  [SRC_CLOSED, SRC_OPEN, SRC_US].forEach(function (src) {
    var im = new Image();
    im.onload = loaded;
    im.onerror = function () { gaveUp = true; };
    im.src = src;
  });
})();
