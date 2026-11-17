/*
 * Two for the Row'd: Passport Awards 2027 vote prompts
 * ----------------------------------------------------
 * Adds, on every page that loads /js/affiliate-tracking.js:
 *   1. A slim banner at the top of the page (closable; remembered per visitor)
 *   2. A "Found this guide useful?" vote card just above the footer
 * Both switch themselves off automatically when round-one voting closes
 * (end of Sunday 14 February 2027), so nothing needs removing by hand.
 * The homepage already has its own banner, so this script never adds a second one.
 */
(function () {
  'use strict';
  if (window.__trrPassportVote) return;
  window.__trrPassportVote = true;

  var CLOSES = Date.UTC(2027, 1, 15, 0, 0, 0); // 15 Feb 2027 00:00 UTC
  if (Date.now() >= CLOSES) return;

  var VOTE_URL = 'https://thepassportawards.com/v/twofortherowd';
  var NAVY = '#13264a', GOLD = '#e7c873';

  function closedBefore() {
    try { return localStorage.getItem('passportBannerClosed') === '1'; } catch (e) { return false; }
  }
  function track(where) {
    try { if (window.gtag) window.gtag('event', 'passport_vote_click', { prompt: where }); } catch (e) {}
  }

  function addBanner() {
    if (document.getElementById('passportBanner') || closedBefore()) return;
    var b = document.createElement('div');
    b.id = 'passportBanner';
    b.setAttribute('role', 'region');
    b.setAttribute('aria-label', 'Passport Awards vote');
    b.style.cssText = 'background:' + NAVY + ';color:#fff;font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:10px 44px 10px 14px;text-align:center;position:relative;z-index:50;';
    b.innerHTML = '\ud83d\udec2 We\'re nominated for <strong>Best Budget Traveller</strong> at The Passport Awards 2027! ' +
      '<a href="' + VOTE_URL + '" target="_blank" rel="noopener" style="color:' + GOLD + ' !important;font-weight:700;white-space:nowrap;">Vote for us \u2192</a>' +
      '<button type="button" aria-label="Close banner" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:0;color:#fff;font-size:20px;line-height:1;cursor:pointer;padding:4px 8px;">\u00d7</button>';
    b.querySelector('a').addEventListener('click', function () { track('banner'); });
    b.querySelector('button').addEventListener('click', function () {
      b.style.display = 'none';
      try { localStorage.setItem('passportBannerClosed', '1'); } catch (e) {}
    });
    document.body.insertBefore(b, document.body.firstChild);
  }

  function addCard() {
    var path = location.pathname.replace(/\/+$/, '');
    if (path === '' || path === '/index.html') return; // homepage has its own badge in the footer
    if (document.getElementById('passportVoteCard')) return;
    var c = document.createElement('section');
    c.id = 'passportVoteCard';
    c.style.cssText = 'max-width:720px;margin:32px auto;padding:0 16px;box-sizing:border-box;';
    c.innerHTML =
      '<div style="background:' + NAVY + ';color:#fff;border-radius:18px;padding:22px 22px 20px;text-align:center;font:16px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.12);">' +
        '<div style="font-size:28px;line-height:1;margin-bottom:8px;">\ud83d\udec2</div>' +
        '<div style="font-weight:800;font-size:19px;margin-bottom:6px;color:#fff;">Found this guide useful?</div>' +
        '<p style="margin:0 0 16px;color:#e9e6df;">We\'re nominated for <strong style="color:' + GOLD + ';">Best Budget Traveller</strong> at The Passport Awards 2027. A free vote takes 30 seconds and would mean the world to us \ud83d\udc9b</p>' +
        '<a href="' + VOTE_URL + '" target="_blank" rel="noopener" style="display:inline-block;background:' + GOLD + ';color:' + NAVY + ' !important;font-weight:800;text-decoration:none;padding:12px 26px;border-radius:999px;">Vote for Two for the Row\'d \u2192</a>' +
        '<div style="margin-top:10px;font-size:13px;color:#c9c4b8;">Nicola &amp; P\u00e1draig</div>' +
      '</div>';
    c.querySelector('a').addEventListener('click', function () { track('end_card'); });
    var footer = document.querySelector('footer');
    if (footer && footer.parentNode) footer.parentNode.insertBefore(c, footer);
    else document.body.appendChild(c);
  }

  function run() { addBanner(); addCard(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
