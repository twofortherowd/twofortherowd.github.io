/*
 * Two for the Row'd — affiliate click tracking for GA4 (G-H7SPF3M3X8)
 * ------------------------------------------------------------------
 * Sends ONE GA4 event, "affiliate_click", whenever a visitor clicks a link
 * to an affiliate partner, on any page. It never changes, delays or blocks
 * the link itself — it only listens.
 *
 * Event parameters sent:
 *   affiliate_partner  TourRadar | GetYourGuide | Klook | Amazon | Spacegoods | DriveFromHome
 *   link_url           the page/product/tour the link points to (without tracking codes;
 *                      for Klook redirect links, the real Klook page)
 *   link_campaign      the utm_campaign tag on the link, if it has one (e.g. TourRadar)
 *   link_text          the visible text of the link / button / card (or image alt text)
 *   link_domain        the partner's web address domain
 *   link_section       the heading of the section the link sits in (e.g. "Canary Islands")
 *   click_type         "link" for normal links, "widget" for GetYourGuide / TourRadar widgets
 *   page_location / page path are added by GA4 automatically.
 *
 * No personal data is collected: only link and page information.
 *
 * Testing: add ?ga_debug=1 to any page address and the events will show in
 * GA4 Admin → DebugView (and are logged in the browser console).
 */
(function () {
  'use strict';
  if (window.__trrAffiliateTracking) return; // never load twice
  window.__trrAffiliateTracking = true;

  var PARTNERS = [
    { name: 'TourRadar',     test: /(^|\.)tourradar\.com$/i },
    { name: 'GetYourGuide',  test: /(^|\.)(getyourguide\.[a-z.]+|gyg\.me)$/i },
    { name: 'Klook',         test: /(^|\.)klook\.(com|tpo\.?[a-z]*)$/i },
    { name: 'Amazon',        test: /(^|\.)(amzn\.to|amzn\.eu|link\.amazon|amazon\.[a-z.]+)$/i },
    { name: 'Spacegoods',    test: /(^|\.)spacegoods\.com$/i },
    { name: 'DriveFromHome', test: /(^|\.)drivefromhome\.com$/i }
  ];

  // Partner pages that are NOT affiliate links (e.g. TourRadar's testimonial page).
  var EXCLUDE = [/tourradar\.com\/mlp\/affiliates/i];

  var debug = false;
  try {
    if (/[?&]ga_debug=1/.test(location.search)) sessionStorage.setItem('trr_ga_debug', '1');
    debug = sessionStorage.getItem('trr_ga_debug') === '1';
  } catch (e) {}

  function clip(s, n) {
    s = (s || '').replace(/\s+/g, ' ').trim();
    return s.length > n ? s.slice(0, n) : s;
  }

  function partnerFor(url) {
    var u;
    try { u = new URL(url, location.href); } catch (e) { return null; }
    if (!/^https?:$/.test(u.protocol)) return null;
    if (u.hostname === location.hostname) return null;
    for (var i = 0; i < EXCLUDE.length; i++) if (EXCLUDE[i].test(u.href)) return null;
    for (var j = 0; j < PARTNERS.length; j++) {
      if (PARTNERS[j].test.test(u.hostname)) return { name: PARTNERS[j].name, url: u };
    }
    return null;
  }

  // The product / tour address without tracking codes. Klook redirect links
  // carry the real Klook page in "k_site", so we use that instead.
  function destination(u) {
    var d = u;
    var ks = u.searchParams.get('k_site');
    if (ks) { try { d = new URL(ks); } catch (e) {} }
    return clip(d.hostname.replace(/^www\./, '') + d.pathname, 100);
  }

  function linkText(a) {
    var t = clip(a.innerText || a.textContent, 100);
    if (!t) {
      var img = a.querySelector && a.querySelector('img[alt]');
      t = clip(a.getAttribute('aria-label') || a.getAttribute('title') || (img && img.alt), 100);
    }
    return t || '(no text)';
  }

  function sectionFor(el) {
    // The nearest h2/h3 heading that comes before the link on the page.
    var hs = document.querySelectorAll('h2, h3'), found = null;
    for (var i = 0; i < hs.length; i++) {
      if (hs[i].compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) found = hs[i];
      else break;
    }
    return found ? clip(found.textContent, 100) : '(none)';
  }

  function send(params) {
    if (debug) { params.debug_mode = true; console.log('[affiliate_click]', params); }
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_click', params);
    } else {
      (window.dataLayer = window.dataLayer || []).push(['event', 'affiliate_click', params]);
    }
  }

  var lastSent = { key: '', t: 0 };
  function handle(e) {
    if (e.type === 'auxclick' && e.button !== 1) return; // middle-click only
    var path = e.composedPath ? e.composedPath() : [];
    var a = null;
    for (var i = 0; i < path.length; i++) {
      if (path[i].tagName === 'A' && path[i].href) { a = path[i]; break; }
    }
    if (!a && e.target && e.target.closest) a = e.target.closest('a[href]');
    if (!a) return;

    var p = partnerFor(a.href);
    if (!p) return;

    // Ignore accidental double-fires within 1 second for the same link.
    var key = p.url.href, now = Date.now();
    if (lastSent.key === key && now - lastSent.t < 1000) return;
    lastSent = { key: key, t: now };

    send({
      affiliate_partner: p.name,
      link_url: destination(p.url),
      link_campaign: clip(p.url.searchParams.get('utm_campaign') || '(none)', 100),
      link_text: linkText(a),
      link_domain: p.url.hostname.replace(/^www\./, ''),
      link_section: sectionFor(a),
      click_type: 'link'
    });
  }

  document.addEventListener('click', handle, true);
  document.addEventListener('auxclick', handle, true);

  // Widgets (GetYourGuide / TourRadar) live inside frames we can't see into.
  // When the visitor clicks into one, the page loses focus to that frame —
  // we record that as a widget click for the partner.
  window.addEventListener('blur', function () {
    setTimeout(function () {
      var f = document.activeElement;
      if (!f || f.tagName !== 'IFRAME') return;
      var p = partnerFor(f.src || '');
      if (!p) return;
      send({
        affiliate_partner: p.name,
        link_url: destination(p.url),
        link_campaign: '(none)',
        link_text: '(widget)',
        link_domain: p.url.hostname.replace(/^www\./, ''),
        link_section: sectionFor(f),
        click_type: 'widget'
      });
    }, 0);
  });
})();

/* Load the shared site header + footer (same top bar, menu and footer as the homepage).
   Edit js/site-chrome.js to change the menu or footer on every page at once. */
(function () {
  var s = document.createElement('script');
  s.src = '/js/site-chrome.js';
  s.defer = true;
  document.head.appendChild(s);
})();

/* Load the Passport Awards vote prompts (banner + end-of-guide card).
   js/passport-vote.js switches itself off after voting closes on 14 Feb 2027. */
(function () {
  if (Date.now() >= Date.UTC(2027, 1, 15)) return;
  var s = document.createElement('script');
  s.src = '/js/passport-vote.js';
  s.defer = true;
  document.head.appendChild(s);
})();
