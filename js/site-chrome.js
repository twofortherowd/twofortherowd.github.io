/*
 * Two for the Row'd: shared site header + footer for every inner page
 * --------------------------------------------------------------------
 * Loaded on every page by /js/affiliate-tracking.js.
 * - Replaces the old "\u2190 Back to Two for the Row'd" bar with the same top bar,
 *   logo, menu and Subscribe button as the homepage.
 * - Replaces the old one-line \u00a9 footer with the full homepage footer.
 * - Each page keeps its own design, hero, breadcrumbs and section links.
 * To change the menu or footer on every page at once, edit MENU / FOOTER below.
 * The homepage has this built in, so the script does nothing there.
 */
(function () {
  'use strict';
  if (window.__trrChrome) return;
  window.__trrChrome = true;
  try { if (window.self !== window.top) return; } catch (e) { return; } // not inside embedded maps/iframes

  var path = location.pathname.replace(/\/+$/, '');
  if (path === '' || path === '/index.html') return;          // homepage has its own
  if (/^\/(links|carlow-walking-tour-map|section-[a-z]+)\.html$/.test(path)) return; // link-in-bio page, full-screen map, homepage fragments

  var SITE = 'https://twofortherowd.com';
  var SUBSCRIBE = 'https://preview.mailerlite.io/forms/2378028/188440618450551814/share';
  var VOTE = 'https://thepassportawards.com/v/twofortherowd';
  var VOTE_OPEN = Date.now() < Date.UTC(2027, 1, 15, 0, 0, 0);

  var MENU = [
    ['Destinations', '/#destinations'],
    ['Deals', '/#deals'],
    ['Ireland', '/ireland.html'],
    ['Hotel Stays', '/#hotel'],
    ['Brew for Two', '/#brew']
  ];
  var MORE = [
    ['Ireland on Video', '/#hidden'],
    ['Morocco Series', '/#morocco'],
    ['Christmas Markets', '/christmas-markets-europe.html'],
    ['Extreme Day Trips', '/extreme-day-trips.html'],
    ['Shop &amp; Tours', '/#shop'],
    ['Past Newsletters', '/#newsletters'],
    ['Work With Us', '/#work']
  ];
  var PARTNERS = [
    ['TourRadar tours', 'https://www.tourradar.com/?utm_source=partner-traveller-1228400&utm_medium=ambassador&utm_campaign=site-footer', 'sponsored'],
    ['GetYourGuide experiences', 'https://gyg.me/JeeARAr9', 'sponsored'],
    ['Klook tickets &amp; passes', 'https://affiliate.klook.com/redirect?aid=119289&aff_adid=1262030&k_site=https%3A%2F%2Fwww.klook.com%2F', 'sponsored'],
    ['Our Amazon travel picks', 'https://link.amazon/B07NEpvEG', 'sponsored nofollow'],
    ['Drive From Home', 'https://drivefromhome.com/?utm_source=twofortherowd&utm_medium=partnership&utm_campaign=site-footer', '']
  ];
  var SOCIAL = [
    ['Facebook', 'https://www.facebook.com/share/1DKADAR7dV/?mibextid=wwXIfr', 'M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.2-1.5 1.6-1.5h1.6V5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.6 1.7-4.6 4.7V11H6.6v3h2.7v8h4.2z'],
    ['Instagram', 'https://www.instagram.com/twofortherowd', 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 8.5zm0 2A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 10.5zM18 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z'],
    ['TikTok', 'https://www.tiktok.com/@twofortherowd', 'M14 3c.6 3.5 2.7 5.6 6 5.9V12c-2.1 0-4-.7-5.6-2v6.4c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .6 0 .9.1V14c-.3-.2-.6-.3-.9-.3-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V3h3.1z'],
    ['YouTube', 'https://www.youtube.com/@twofortherowd?sub_confirmation=1', 'M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31.6 31.6 0 0 0 2 12a31.6 31.6 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 22 12a31.6 31.6 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z'],
    ['Pinterest', 'https://www.pinterest.com/twofortherowd/', 'M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.5 2.1-4.5 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.2c0 .2-.2.3-.4.2-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1 0 12 2z']
  ];

  function icons(cls) {
    return SOCIAL.map(function (s) {
      return '<a class="' + cls + '" href="' + s[1] + '" target="_blank" rel="noopener" aria-label="' + s[0] + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + s[2] + '"/></svg></a>';
    }).join('');
  }
  function link(l, cls) { return '<a class="' + cls + '" href="' + l[1] + '">' + l[0] + '</a>'; }

  var CSS = [
    '.trr-chrome,.trr-chrome *{box-sizing:border-box;}',
    '.trr-chrome{font-family:"DM Sans","Segoe UI",Arial,sans-serif;line-height:1.5;text-align:left;position:relative!important;z-index:1000!important;}',
    '.trr-chrome a{display:inline-flex;align-items:center;gap:7px;background:none;border:0;box-shadow:none;padding:0;margin:0;border-radius:0;text-decoration:none;font-weight:600;letter-spacing:normal;text-transform:none;}',
    '.trr-chrome svg{width:17px;height:17px;fill:currentColor;display:block;}',
    /* top bar */
    '.trr-top{background:#1a1208;color:#fdf8ef;font-size:13px;}',
    '.trr-top-in{max-width:1180px;margin:0 auto;padding:7px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;}',
    '.trr-top a{color:#fdf8ef;font-size:13px;}.trr-top a:hover{color:#ffd84a;}',
    '.trr-tl,.trr-tr{display:flex;align-items:center;gap:14px;min-width:0;}',
    '.trr-chrome a.trr-vote{padding:3px 11px;border-radius:999px;background:rgba(255,216,74,.14);border:1px solid rgba(255,216,74,.45);color:#ffd84a;font-weight:700;white-space:nowrap;}',
    '.trr-chrome a.trr-vote:hover{background:#ffd84a;color:#1a1208;}',
    '.trr-follow{font-weight:600;opacity:.8;}.trr-sep{width:1px;height:18px;background:rgba(253,248,239,.25);}',
    '.trr-soc{display:flex;align-items:center;gap:12px;}',
    /* main bar */
    '.trr-main{background:#fff;border-bottom:3px solid #ffd84a;box-shadow:0 6px 20px rgba(26,18,8,.08);}',
    '.trr-main-in{max-width:1180px;margin:0 auto;padding:8px 18px;display:flex;align-items:center;justify-content:space-between;gap:16px;position:relative;}',
    '.trr-brand img{height:54px;width:auto;display:block;max-width:none;border:0;box-shadow:none;border-radius:0;margin:0;}',
    '.trr-nav{display:flex;align-items:center;gap:4px;}',
    '.trr-chrome a.trr-nl{padding:9px 11px;border-radius:8px;font-size:15px;font-weight:700;color:#1a1208;white-space:nowrap;}',
    '.trr-chrome a.trr-nl:hover{background:rgba(255,216,74,.3);}',
    '.trr-more{position:relative;}',
    '.trr-more>button{background:none;border:0;padding:9px 11px;font:700 15px "DM Sans","Segoe UI",Arial,sans-serif;color:#1a1208;cursor:pointer;border-radius:8px;margin:0;box-shadow:none;}',
    '.trr-more>button:hover,.trr-more.open>button{background:rgba(255,216,74,.3);}',
    '.trr-menu{display:none;position:absolute;right:0;top:calc(100% + 8px);min-width:220px;background:#fff;border:1px solid rgba(26,18,8,.12);border-radius:14px;box-shadow:0 16px 48px rgba(26,18,8,.15);padding:8px;z-index:1001;}',
    '.trr-more.open .trr-menu{display:block;}',
    '.trr-menu a.trr-nl{display:flex;width:100%;}',
    '.trr-chrome a.trr-cta{padding:10px 18px;margin-left:8px;border-radius:10px;background:#ffd84a;border:1px solid #e8c235;color:#1a1208;font-weight:800;font-size:14px;white-space:nowrap;}',
    '.trr-chrome a.trr-cta:hover{background:#e8c235;}',
    '.trr-burger{display:none;background:#fff;border:1.5px solid rgba(26,18,8,.16);border-radius:10px;width:44px;height:44px;cursor:pointer;font-size:22px;line-height:1;color:#1a1208;padding:0;margin:0;}',
    '@media(max-width:980px){',
    ' .trr-burger{display:block;}.trr-brand img{height:46px;}',
    ' .trr-nav{display:none;position:absolute;left:0;right:0;top:100%;background:#fff;flex-direction:column;align-items:stretch;padding:10px 14px 16px;border-bottom:3px solid #ffd84a;box-shadow:0 16px 48px rgba(26,18,8,.15);}',
    ' .trr-nav.open{display:flex;}',
    ' .trr-chrome a.trr-nl{padding:12px 10px;border-bottom:1px solid rgba(26,18,8,.1);border-radius:0;}',
    ' .trr-more>button{display:none;}.trr-menu{display:block;position:static;box-shadow:none;border:0;padding:0;min-width:0;}',
    ' .trr-chrome a.trr-cta{margin:12px 0 0;justify-content:center;}',
    ' .trr-follow,.trr-sep,.trr-mail span{display:none;}',
    '}',
    '@media(max-width:520px){.trr-vote .trr-long{display:none;}.trr-top-in{padding:7px 12px;}.trr-soc{gap:10px;}}',
    /* footer */
    '.trr-foot{background:#1a1208;color:rgba(253,248,239,.82);border-top:4px solid #ffd84a;font-size:14px;margin-top:30px;}',
    '.trr-foot a{color:rgba(253,248,239,.82);font-weight:500;}.trr-foot a:hover{color:#ffd84a;}',
    '.trr-ft{max-width:1180px;margin:0 auto;padding:40px 18px 20px;display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:28px;}',
    '.trr-ft p{margin:0 0 10px;color:rgba(253,248,239,.82);font-size:14px;}',
    '.trr-ft p.trr-ftb{font-family:"Playfair Display",Georgia,serif;font-size:1.6rem;font-weight:800;color:#fff!important;margin:0 0 8px;}',
    '.trr-fc h4{font-family:"DM Sans","Segoe UI",Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#ffd84a;margin:4px 0 12px;}',
    '.trr-fc ul{list-style:none;padding:0;margin:0;}.trr-fc li{margin:0 0 8px;padding:0;}.trr-fc li::before{content:none;}',
    '.trr-fsoc{display:flex;gap:12px;margin:14px 0;}.trr-fsoc svg{width:20px;height:20px;}',
    '.trr-chrome a.trr-fsub{padding:11px 18px;border-radius:10px;background:#ffd84a;color:#1a1208;font-weight:800;}',
    '.trr-chrome a.trr-fsub:hover{background:#e8c235;color:#1a1208;}',
    '.trr-fbot{max-width:1180px;margin:0 auto;padding:16px 18px 26px;border-top:1px solid rgba(253,248,239,.15);display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;font-size:12px;color:rgba(253,248,239,.6);}',
    '.trr-fbot p{margin:0;max-width:720px;font-size:12px;color:rgba(253,248,239,.6);}',
    '@media(max-width:900px){.trr-ft{grid-template-columns:1fr 1fr;}}',
    '@media(max-width:520px){.trr-ft{grid-template-columns:1fr;}}',
    '.trr-hide{display:none!important;}'
  ].join('\n');

  var voteHTML = VOTE_OPEN ? '<a class="trr-vote" href="' + VOTE + '" target="_blank" rel="noopener" data-trr="vote">\ud83d\udec2 <span class="trr-long">Nominated: Best Budget Traveller \u00b7</span> Vote for us \u2192</a>' : '';

  var HEADER =
    '<div class="trr-top"><div class="trr-top-in">' +
      '<div class="trr-tl"><a class="trr-mail" href="mailto:twofortherowd@gmail.com" aria-label="Email us"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.4 7H4v.4l8 5.6 8-5.6V7h-.4L12 12.2z"/></svg><span>twofortherowd@gmail.com</span></a>' + voteHTML + '</div>' +
      '<div class="trr-tr"><span class="trr-follow">Follow us</span><span class="trr-sep"></span><div class="trr-soc">' + icons('') + '</div></div>' +
    '</div></div>' +
    '<div class="trr-main"><div class="trr-main-in">' +
      '<a class="trr-brand" href="/" aria-label="Two for the Row\'d home"><img src="/img/logoimg2.png" alt="Two for the Row\'d logo" width="752" height="223"></a>' +
      '<button class="trr-burger" type="button" aria-label="Open menu" aria-expanded="false">\u2630</button>' +
      '<div class="trr-nav" role="navigation" aria-label="Main menu">' +
        MENU.map(function (l) { return link(l, 'trr-nl'); }).join('') +
        '<div class="trr-more"><button type="button" aria-haspopup="true" aria-expanded="false">More \u25be</button><div class="trr-menu">' +
          MORE.map(function (l) { return link(l, 'trr-nl'); }).join('') +
        '</div></div>' +
        '<a class="trr-cta" href="' + SUBSCRIBE + '" target="_blank" rel="noopener" data-trr="subscribe">Subscribe</a>' +
      '</div>' +
    '</div></div>';

  var FOOTER =
    '<div class="trr-ft">' +
      '<div class="trr-fc"><p class="trr-ftb">Two for the Row\'d</p>' +
        '<p>An Irish travel couple from Carlow sharing honest travel guides, hidden Irish gems, hotel stays and the tours we actually rate. Proof you don\'t need to quit your job to see the world.</p>' +
        '<p><a href="mailto:twofortherowd@gmail.com">twofortherowd@gmail.com</a></p>' +
        (VOTE_OPEN ? '<p><a href="' + VOTE + '" target="_blank" rel="noopener" data-trr="vote"><strong style="color:#fff">\ud83d\udec2 Nominated: Best Budget Traveller</strong></a><br>The Passport Awards 2027 \u00b7 <a href="' + VOTE + '" target="_blank" rel="noopener" data-trr="vote">Vote for us \u2192</a></p>' : '') +
      '</div>' +
      '<div class="trr-fc"><h4>Explore</h4><ul>' +
        [['Destinations', '/#destinations'], ['Travel deals', '/#deals'], ['Ireland guide', '/ireland.html'], ['Ireland on Video', '/#hidden'], ['Morocco Series', '/#morocco'], ['Hotel Stays', '/#hotel'], ['Brew for Two', '/#brew'], ['Extreme day trips', '/extreme-day-trips.html']]
          .map(function (l) { return '<li><a href="' + l[1] + '">' + l[0] + '</a></li>'; }).join('') +
      '</ul></div>' +
      '<div class="trr-fc"><h4>Book with our partners</h4><ul>' +
        PARTNERS.map(function (p) { return '<li><a href="' + p[1].replace(/&/g, '&amp;') + '" target="_blank" rel="noopener' + (p[2] ? ' ' + p[2] : '') + '">' + p[0] + '</a></li>'; }).join('') +
        '<li><a href="/#shop">Shop &amp; Tours</a></li>' +
      '</ul></div>' +
      '<div class="trr-fc"><h4>Stay in touch</h4><ul><li><a href="/#newsletters">Past newsletters</a></li><li><a href="/#work">Work with us</a></li></ul>' +
        '<div class="trr-fsoc">' + icons('') + '</div>' +
        '<a class="trr-fsub" href="' + SUBSCRIBE + '" target="_blank" rel="noopener" data-trr="subscribe">Subscribe \u2192</a>' +
      '</div>' +
    '</div>' +
    '<div class="trr-fbot"><p><strong>Affiliate disclosure:</strong> Some links on this website are affiliate links. If you book or buy through them, we may earn a small commission at no extra cost to you. We only recommend experiences and products we genuinely believe are useful.</p>' +
      '<span>\u00a9 ' + new Date().getFullYear() + ' Two for the Row\'d \u00b7 Built with love, caffeine, and a bit of chaos</span></div>';

  function bleed(el, top, bottom) {
    // stretch edge to edge even when the page's <body> has padding
    var cs = getComputedStyle(document.body);
    var pl = parseFloat(cs.paddingLeft) || 0, pr = parseFloat(cs.paddingRight) || 0;
    var pt = parseFloat(cs.paddingTop) || 0, pb = parseFloat(cs.paddingBottom) || 0;
    el.style.marginLeft = (-pl) + 'px';
    el.style.marginRight = (-pr) + 'px';
    if (top) el.style.marginTop = (-pt) + 'px';
    if (bottom) el.style.marginBottom = (-pb) + 'px';
  }

  function build() {
    if (document.querySelector('.mainbar') || document.querySelector('.trr-chrome')) return;

    var st = document.createElement('style');
    st.id = 'trr-chrome-css';
    st.textContent = CSS;
    document.head.appendChild(st);
    if (!document.querySelector('link[href*="DM+Sans"]')) {
      var f = document.createElement('link');
      f.rel = 'stylesheet';
      f.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(f);
    }

    // old "Back to Two for the Row'd" bars
    var olds = [].slice.call(document.querySelectorAll('.backBar'));
    [].slice.call(document.querySelectorAll('body > div.topbar, body > div.top')).forEach(function (t) {
      if (/Back to|Two for the Row/i.test(t.textContent)) olds.push(t);
    });
    // newer city pages: keep their dark bar of section links, just drop the duplicate site name
    [].slice.call(document.querySelectorAll('header.topbar .brand')).forEach(function (b) { b.classList.add('trr-hide'); });
    olds.forEach(function (b) { b.classList.add('trr-hide'); });
    // section menus that used to stick just under the old (sticky) back bar now stick to the very top
    if (olds.length) {
      [].slice.call(document.querySelectorAll('nav, [class*="Nav"], [class*="nav"], [class*="sticky"]')).forEach(function (n) {
        if (n.closest('.trr-chrome')) return;
        var cs = getComputedStyle(n), t = parseFloat(cs.top);
        if (cs.position === 'sticky' && t >= 40 && t <= 70) n.style.top = '0px';
      });
    }

    // old awards banner from passport-vote.js (the vote link now lives in the top bar);
    // a hidden placeholder stops it being added if that script runs after this one
    var pb = document.getElementById('passportBanner');
    if (pb) { pb.classList.add('trr-hide'); }
    else { pb = document.createElement('div'); pb.id = 'passportBanner'; pb.hidden = true; document.body.insertBefore(pb, document.body.firstChild); }

    var head = document.createElement('div');
    head.className = 'trr-chrome trr-head';
    head.setAttribute('role', 'banner');
    head.innerHTML = HEADER;
    document.body.insertBefore(head, document.body.firstChild);

    // old one-line \u00a9 footers
    var oldFoot = [].slice.call(document.querySelectorAll('footer')).filter(function (f) { return /\u00a9|&copy;/.test(f.innerHTML); });
    oldFoot.forEach(function (f) { f.classList.add('trr-hide'); });
    var foot = document.createElement('div');
    foot.className = 'trr-chrome trr-foot';
    foot.setAttribute('role', 'contentinfo');
    foot.innerHTML = FOOTER;
    document.body.appendChild(foot);

    function fit() { bleed(head, true, false); bleed(foot, false, true); }
    fit();
    window.addEventListener('resize', fit, { passive: true });

    // menus
    var nav = head.querySelector('.trr-nav'), burger = head.querySelector('.trr-burger'), more = head.querySelector('.trr-more');
    burger.addEventListener('click', function () {
      var open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.textContent = open ? '\u2715' : '\u2630';
    });
    more.querySelector('button').addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !more.classList.contains('open');
      more.classList.toggle('open', open);
      this.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) { if (!more.contains(e.target)) more.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') more.classList.remove('open'); });

    // analytics for the new links
    [head, foot].forEach(function (box) {
      box.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[data-trr]');
        if (!a) return;
        try {
          if (a.dataset.trr === 'vote' && window.gtag) window.gtag('event', 'passport_vote_click', { prompt: 'site_header_footer' });
          if (a.dataset.trr === 'subscribe') { if (window.fbq) window.fbq('trackCustom', 'SignupClick'); if (window.gtag) window.gtag('event', 'subscribe_click', { placement: 'site_header_footer' }); }
        } catch (err) {}
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
