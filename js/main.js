/* ==============================================
   {{BRAND_NAME}} — Landing Hub Scripts
   Click tracking · UTM forwarding · GA4 events
   ============================================== */

(function () {
  'use strict';

  // ---------------------------------------------
  // 1. Set current year in footer
  // ---------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------------------------------------------
  // 2. Forward incoming UTM params to outbound links
  //    so we can attribute downstream sales properly
  // ---------------------------------------------
  function getIncomingUTMs() {
    const params = new URLSearchParams(window.location.search);
    const utms = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .forEach((k) => {
        if (params.get(k)) utms[k] = params.get(k);
      });
    return utms;
  }

  const incomingUtms = getIncomingUTMs();
  if (Object.keys(incomingUtms).length) {
    try {
      sessionStorage.setItem('incoming_utms', JSON.stringify(incomingUtms));
    } catch (e) { /* ignore storage errors */ }
  }

  function appendUtms(url) {
    if (!url || url.startsWith('#') || url.startsWith('mailto:')) return url;
    let stored = {};
    try {
      stored = JSON.parse(sessionStorage.getItem('incoming_utms') || '{}');
    } catch (e) {}
    if (!Object.keys(stored).length) return url;

    try {
      const u = new URL(url, window.location.origin);
      Object.entries(stored).forEach(([k, v]) => {
        if (!u.searchParams.has(k)) u.searchParams.set(k, v);
      });
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  // ---------------------------------------------
  // 3. Click tracking — fire GA4 event for every
  //    element with [data-track]
  // ---------------------------------------------
  function track(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params || {});
    }
    if (typeof clarity === 'function') {
      try {
        if (params && params.platform) clarity('set', 'platform', params.platform);
        clarity('event', eventName);
      } catch (e) {}
    }
    if (window.DEBUG_ANALYTICS) console.log('[track]', eventName, params);
  }

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', function (e) {
      const eventName = el.getAttribute('data-track');
      const platform  = el.getAttribute('data-platform') || null;
      const product   = el.getAttribute('data-product') || null;
      const href      = el.getAttribute('href') || null;

      const payload = {
        platform: platform,
        product:  product,
        href:     href,
        link_text: (el.textContent || '').trim().slice(0, 60),
        page_section: getSection(el)
      };

      track(eventName, payload);

      if (href && /^https?:/.test(href)) {
        const newHref = appendUtms(href);
        if (newHref !== href) el.setAttribute('href', newHref);
      }
    });
  });

  function getSection(el) {
    const section = el.closest('section, header, footer');
    return section ? (section.id || section.tagName.toLowerCase()) : 'unknown';
  }

  // ---------------------------------------------
  // 4. Smooth scroll for in-page anchors
  // ---------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---------------------------------------------
  // 5. Scroll-depth tracking (25/50/75/100%)
  // ---------------------------------------------
  const milestones = [25, 50, 75, 100];
  const fired = new Set();
  function onScroll() {
    const scrolled = window.scrollY + window.innerHeight;
    const total    = document.documentElement.scrollHeight;
    const pct      = Math.round((scrolled / total) * 100);
    milestones.forEach((m) => {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        track('scroll_depth', { depth: m });
      }
    });
  }
  let scrollTimeout;
  window.addEventListener('scroll', function () {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      onScroll();
      scrollTimeout = null;
    }, 250);
  }, { passive: true });

  // ---------------------------------------------
  // 6. Time-on-page heartbeat
  // ---------------------------------------------
  let timeOnPage = 0;
  const heartbeats = [10, 30, 60, 120, 300];
  const beatFired  = new Set();
  setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    timeOnPage += 5;
    heartbeats.forEach((s) => {
      if (timeOnPage >= s && !beatFired.has(s)) {
        beatFired.add(s);
        track('time_on_page', { seconds: s });
      }
    });
  }, 5000);

  // ---------------------------------------------
  // 7. Reveal-on-scroll for sections
  // ---------------------------------------------
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.platform-card, .product, .quote').forEach((el) => {
      observer.observe(el);
    });
  }

  // ---------------------------------------------
  // 8. Debug toggle: ?debug=1
  // ---------------------------------------------
  if (new URLSearchParams(window.location.search).get('debug') === '1') {
    window.DEBUG_ANALYTICS = true;
    console.log('[analytics] debug mode on');
  }
})();
