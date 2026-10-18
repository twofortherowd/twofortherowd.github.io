/* Haunted Ireland newsletter pop-up.
   Shows once someone has scrolled halfway down the page or after 25 seconds,
   at most once every 7 days per visitor, and never again after they click through.
   Include on a page with: <script src="/js/haunted-popup.js" defer></script> */
(function () {
  var KEY = 'hauntedPopup';
  var SIGNUP = 'https://preview.mailerlite.io/forms/2378028/188440618450551814/share';
  var WEEK = 7 * 24 * 60 * 60 * 1000;

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var saved = get();
  if (saved === 'signed-up') return;
  if (saved && Date.now() - Number(saved) < WEEK) return;
  if (location.pathname.indexOf('haunted-ireland') !== -1) return;

  var css = '' +
    '.hp-overlay{position:fixed;inset:0;z-index:2147483000;background:rgba(5,4,8,.72);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .35s ease}' +
    '.hp-overlay.hp-open{opacity:1}' +
    '.hp-box{position:relative;width:100%;max-width:640px;display:grid;grid-template-columns:200px 1fr;gap:26px;align-items:center;padding:30px 30px 26px;border-radius:14px;border:1px solid rgba(217,180,95,.6);background:radial-gradient(ellipse 120% 80% at 50% 0%,#2a2033 0%,#141018 60%,#0b0a0d 100%);box-shadow:0 30px 90px rgba(0,0,0,.6);color:#e9e2d2;font-family:"Cormorant Garamond",Georgia,serif;text-align:left;transform:translateY(12px);transition:transform .35s ease}' +
    '.hp-open .hp-box{transform:none}' +
    '.hp-cover{width:100%;border-radius:4px;border:1px solid rgba(217,180,95,.6);box-shadow:0 16px 40px rgba(0,0,0,.55);transform:rotate(-3deg)}' +
    '.hp-kick{font-family:Cinzel,Georgia,serif;font-size:11px;letter-spacing:3px;color:#d9b45f;text-transform:uppercase}' +
    '.hp-title{font-family:"Great Vibes",cursive;font-weight:400;font-size:46px;line-height:1.05;color:#f3e3b8;margin:8px 0 6px}' +
    '.hp-text{font-size:17px;line-height:1.5;margin:0 0 18px;color:#e9e2d2}' +
    '.hp-btn{display:inline-block;font-family:Cinzel,Georgia,serif;font-size:13px;letter-spacing:1.5px;text-decoration:none;color:#0e0b11!important;background:linear-gradient(180deg,#f0d38a,#c9a24a);padding:13px 24px;border-radius:999px;box-shadow:0 8px 24px rgba(217,180,95,.25)}' +
    '.hp-no{display:block;margin-top:12px;background:none;border:0;padding:0;font-family:inherit;font-style:italic;font-size:15px;color:#a39985;cursor:pointer}' +
    '.hp-x{position:absolute;top:10px;right:12px;background:none;border:0;color:#d9b45f;font-size:26px;line-height:1;cursor:pointer;padding:4px 8px}' +
    '@media (max-width:560px){.hp-box{grid-template-columns:1fr;text-align:center;padding:26px 20px 22px;gap:14px}.hp-cover{width:130px;margin:0 auto}.hp-title{font-size:40px}.hp-text{font-size:16px}}';

  function build() {
    if (document.querySelector('.hp-overlay')) return;
    // Don't stack on top of another open pop-up (e.g. the Tally poll or the homepage modal).
    if (document.querySelector('.promoModal.open, iframe[src*="tally.so"]')) { setTimeout(build, 30000); return; }

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    if (!document.querySelector('link[href*="Great+Vibes"]')) {
      var f = document.createElement('link');
      f.rel = 'stylesheet';
      f.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Great+Vibes&family=Cinzel:wght@400;600&display=swap';
      document.head.appendChild(f);
    }

    var o = document.createElement('div');
    o.className = 'hp-overlay';
    o.setAttribute('role', 'dialog');
    o.setAttribute('aria-modal', 'true');
    o.setAttribute('aria-label', 'Free Haunted Ireland guide');
    o.innerHTML =
      '<div class="hp-box">' +
        '<button class="hp-x" type="button" aria-label="Close">&times;</button>' +
        '<img class="hp-cover" src="/img/haunted-ireland-cover.jpg" alt="Cover of the free Haunted Ireland guide">' +
        '<div>' +
          '<div class="hp-kick">Free guide &middot; Friday Night Frights</div>' +
          '<div class="hp-title">Haunted Ireland</div>' +
          '<p class="hp-text">Get our free guide to <strong>13 Irish ghost stories, myths &amp; legends</strong>, from the Devil at Loftus Hall to the Witch of Kilkenny. Join our newsletter and it’s yours.</p>' +
          '<a class="hp-btn" href="' + SIGNUP + '" target="_blank" rel="noopener">Send me the guide &rarr;</a>' +
          '<button class="hp-no" type="button">No thanks, I’m not scared</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(o);
    requestAnimationFrame(function () { o.classList.add('hp-open'); });

    function close() {
      set(String(Date.now()));
      o.classList.remove('hp-open');
      setTimeout(function () { o.remove(); }, 350);
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    o.querySelector('.hp-x').addEventListener('click', close);
    o.querySelector('.hp-no').addEventListener('click', close);
    o.addEventListener('click', function (e) { if (e.target === o) close(); });
    document.addEventListener('keydown', onKey);
    o.querySelector('.hp-btn').addEventListener('click', function () {
      set('signed-up');
      if (window.fbq) fbq('track', 'Lead');
      if (window.gtag) gtag('event', 'generate_lead', { form: 'haunted-popup' });
      setTimeout(function () { o.remove(); }, 200);
    });
  }

  var fired = false;
  function trigger() {
    if (fired) return;
    fired = true;
    window.removeEventListener('scroll', onScroll);
    build();
  }
  function onScroll() {
    var h = document.documentElement;
    if ((h.scrollTop + window.innerHeight) / h.scrollHeight >= 0.5) trigger();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  setTimeout(trigger, 25000);
})();
