/* ==============================================
   Pixl Forge — World Cup 2026 Site Scripts
   Countdown · Match hub · Live scores · Analytics
   ============================================== */

(function () {
  'use strict';

  const matches = window.WC2026_MATCHES || [];
  const apiKey  = window.FOOTBALL_DATA_API_KEY || '';
  const apiCfg  = window.FOOTBALL_DATA_CONFIG || {};

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function getIncomingUTMs() {
    const params = new URLSearchParams(window.location.search);
    const utms = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .forEach((k) => { if (params.get(k)) utms[k] = params.get(k); });
    return utms;
  }
  const incomingUtms = getIncomingUTMs();
  if (Object.keys(incomingUtms).length) {
    try { sessionStorage.setItem('incoming_utms', JSON.stringify(incomingUtms)); }
    catch (e) {}
  }
  function appendUtms(url) {
    if (!url || url.startsWith('#') || url.startsWith('mailto:')) return url;
    let stored = {};
    try { stored = JSON.parse(sessionStorage.getItem('incoming_utms') || '{}'); }
    catch (e) {}
    if (!Object.keys(stored).length) return url;
    try {
      const u = new URL(url, window.location.origin);
      Object.entries(stored).forEach(([k, v]) => {
        if (!u.searchParams.has(k)) u.searchParams.set(k, v);
      });
      return u.toString();
    } catch (e) { return url; }
  }

  function track(eventName, params) {
    if (typeof gtag === 'function') gtag('event', eventName, params || {});
    if (typeof clarity === 'function') {
      try {
        if (params && params.platform) clarity('set', 'platform', params.platform);
        clarity('event', eventName);
      } catch (e) {}
    }
    if (window.DEBUG_ANALYTICS) console.log('[track]', eventName, params);
  }
  function getSection(el) {
    const section = el.closest('section, header, footer');
    return section ? (section.id || section.tagName.toLowerCase()) : 'unknown';
  }
  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-track]');
    if (!el) return;
    const eventName = el.getAttribute('data-track');
    const platform  = el.getAttribute('data-platform') || null;
    const product   = el.getAttribute('data-product') || null;
    const method    = el.getAttribute('data-method') || null;
    const href      = el.getAttribute('href') || null;
    track(eventName, {
      platform, product, method, href,
      link_text: (el.textContent || '').trim().slice(0, 60),
      page_section: getSection(el)
    });
    if (href && /^https?:/.test(href)) {
      const newHref = appendUtms(href);
      if (newHref !== href) el.setAttribute('href', newHref);
    }
  });

  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  const cdEls = {
    days:     document.getElementById('cdDays'),
    hours:    document.getElementById('cdHours'),
    mins:     document.getElementById('cdMins'),
    secs:     document.getElementById('cdSecs'),
    label:    document.getElementById('countdownMatch'),
    datetime: document.getElementById('countdownDatetime'),
    venue:    document.getElementById('countdownVenue')
  };
  function getNextMatch() {
    const now = Date.now();
    return matches
      .filter((m) => new Date(m.dateISO).getTime() > now && m.status !== 'FINISHED')
      .sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO))[0];
  }
  function pad2(n) { return String(n).padStart(2, '0'); }
  function updateCountdown() {
    const next = getNextMatch();
    if (!next) {
      if (cdEls.label) cdEls.label.textContent = 'Tournament complete';
      ['days','hours','mins','secs'].forEach((k) => {
        if (cdEls[k]) cdEls[k].textContent = '00';
      });
      return;
    }
    if (cdEls.label) {
      cdEls.label.textContent = `${next.home.flag} ${next.home.name} vs ${next.away.name} ${next.away.flag}`;
    }
    if (cdEls.datetime) cdEls.datetime.textContent = `${formatDay(next.dateISO)} · ${formatTime(next.dateISO)}`;
    if (cdEls.venue)    cdEls.venue.textContent    = next.venue || '';
    const diff = new Date(next.dateISO).getTime() - Date.now();
    if (diff <= 0) { updateCountdown(); return; }
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);
    if (cdEls.days)  cdEls.days.textContent  = pad2(days);
    if (cdEls.hours) cdEls.hours.textContent = pad2(hours);
    if (cdEls.mins)  cdEls.mins.textContent  = pad2(mins);
    if (cdEls.secs)  cdEls.secs.textContent  = pad2(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const tabs   = document.querySelectorAll('.hub__tab');
  const panels = document.querySelectorAll('.hub__panel');
  let liveTimer = null;
  function activateTab(name) {
    tabs.forEach((t) => {
      const active = t.dataset.tab === name;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
    });
    panels.forEach((p) => {
      p.classList.toggle('is-active', p.dataset.panel === name);
    });
    track('hub_tab_change', { tab: name });
    if (name === 'live') {
      renderLive();
      if (apiKey) {
        liveTimer = setInterval(renderLive, (apiCfg.refreshSeconds || 60) * 1000);
      }
    } else if (liveTimer) {
      clearInterval(liveTimer); liveTimer = null;
    }
  }
  tabs.forEach((tab) => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));

  function formatTime(iso) {
    return new Date(iso).toLocaleTimeString([], {
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
    });
  }
  function formatDay(iso) {
    return new Date(iso).toLocaleDateString([], {
      weekday: 'long', month: 'long', day: 'numeric'
    });
  }
  function dayKey(iso) {
    return new Date(iso).toLocaleDateString([], {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  }
  function matchHTML(m, opts) {
    opts = opts || {};
    const isLive = opts.live || m.status === 'LIVE';
    const isPast = opts.past || m.status === 'FINISHED';
    const cls = ['match'];
    if (isLive) cls.push('match--live');
    if (isPast) cls.push('match--past');
    let center;
    if (isLive) {
      center = `<span class="match__live-pill">LIVE${m.minute ? ' · ' + m.minute + "'" : ''}</span><span class="match__score">${(m.score && m.score.home) || 0} – ${(m.score && m.score.away) || 0}</span>`;
    } else if (isPast && m.score) {
      center = `<span class="match__score">${m.score.home} – ${m.score.away}</span><span class="match__date">FT</span>`;
    } else {
      center = `<span class="match__time">${formatTime(m.dateISO)}</span><span class="match__date">${m.group ? 'Group ' + m.group : (m.stage || '').toUpperCase()}</span>`;
    }
    return `<article class="${cls.join(' ')}"><div class="team"><span class="team__flag">${m.home.flag}</span><span class="team__name">${m.home.name}</span></div><div class="match__center">${center}</div><div class="team team--away"><span class="team__flag">${m.away.flag}</span><span class="team__name">${m.away.name}</span></div>${m.venue ? '<span class="match__venue" style="grid-column:1/-1;text-align:center;">' + m.venue + '</span>' : ''}</article>`;
  }
  function groupByDay(list) {
    const groups = new Map();
    list.forEach((m) => {
      const k = dayKey(m.dateISO);
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(m);
    });
    return groups;
  }
  function renderUpcoming() {
    const panel = document.getElementById('panelUpcoming');
    if (!panel) return;
    const now = Date.now();
    const upcoming = matches
      .filter((m) => new Date(m.dateISO).getTime() > now && m.status !== 'FINISHED')
      .sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
    if (!upcoming.length) {
      panel.innerHTML = '<div class="hub__empty">No upcoming matches scheduled.</div>';
      return;
    }
    const groups = groupByDay(upcoming);
    let html = '<div class="match-list">';
    groups.forEach((dayMatches) => {
      html += '<div class="match-day">' + formatDay(dayMatches[0].dateISO) + '</div>';
      dayMatches.forEach((m) => { html += matchHTML(m); });
    });
    html += '</div>';
    panel.innerHTML = html;
    observeReveal(panel.querySelectorAll('.match'));
  }
  function renderPast() {
    const panel = document.getElementById('panelPast');
    if (!panel) return;
    const now = Date.now();
    const past = matches
      .filter((m) => m.status === 'FINISHED' || (m.score && new Date(m.dateISO).getTime() < now))
      .sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));
    if (!past.length) {
      panel.innerHTML = '<div class="hub__empty">No completed matches yet — check back during the tournament.</div>';
      return;
    }
    const groups = groupByDay(past);
    let html = '<div class="match-list">';
    groups.forEach((dayMatches) => {
      html += '<div class="match-day">' + formatDay(dayMatches[0].dateISO) + '</div>';
      dayMatches.forEach((m) => { html += matchHTML(m, { past: true }); });
    });
    html += '</div>';
    panel.innerHTML = html;
    observeReveal(panel.querySelectorAll('.match'));
  }

  async function fetchLiveMatches() {
    if (!apiKey) return null;
    try {
      const url = `${apiCfg.baseUrl}/competitions/${apiCfg.competition}/matches?status=LIVE,IN_PLAY,PAUSED`;
      const res = await fetch(url, { headers: { 'X-Auth-Token': apiKey } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      return (data.matches || []).map((m) => ({
        id: 'fd-' + m.id,
        stage: 'live',
        group: null,
        dateISO: m.utcDate,
        home: { name: (m.homeTeam && m.homeTeam.name) || 'Home', flag: '⚽', code: (m.homeTeam && m.homeTeam.tla) || '' },
        away: { name: (m.awayTeam && m.awayTeam.name) || 'Away', flag: '⚽', code: (m.awayTeam && m.awayTeam.tla) || '' },
        venue: m.venue || '',
        score: { home: (m.score && m.score.fullTime && m.score.fullTime.home) || 0, away: (m.score && m.score.fullTime && m.score.fullTime.away) || 0 },
        minute: m.minute || null,
        status: 'LIVE'
      }));
    } catch (e) {
      console.warn('[live scores] fetch failed:', e.message);
      return null;
    }
  }
  async function renderLive() {
    const panel = document.getElementById('panelLive');
    if (!panel) return;
    if (!apiKey) {
      panel.innerHTML = '<div class="hub__empty"><strong style="display:block;color:var(--chalk);margin-bottom:.5rem;">Live scores not connected</strong>Add your free <a href="https://www.football-data.org/" target="_blank" rel="noopener">football-data.org</a> API key in <code style="color:var(--gold-bright);">js/matches.js</code> to enable live scoring.</div>';
      return;
    }
    panel.innerHTML = '<div class="hub__loading">Checking for live matches…</div>';
    const live = await fetchLiveMatches();
    if (live === null) {
      panel.innerHTML = '<div class="hub__empty">Couldn\'t reach the live-scores API. Try again in a minute.</div>';
      return;
    }
    if (!live.length) {
      panel.innerHTML = '<div class="hub__empty">No matches currently in play. Check the Upcoming tab for the next kickoff.</div>';
      return;
    }
    let html = '<div class="match-list">';
    live.forEach((m) => { html += matchHTML(m, { live: true }); });
    html += '</div>';
    panel.innerHTML = html;
    observeReveal(panel.querySelectorAll('.match'));
  }

  const modal     = document.getElementById('claimModal');
  const claimItem = document.getElementById('claimItem');
  function openModal(productKey) {
    if (!modal) return;
    if (claimItem) {
      const labels = {
        golden_boot:  'the Golden Boot',
        golden_glove: 'the Golden Glove',
        wc_trophy:    'the WC Trophy',
        keychains:    'a Team Keychain',
        jersey_print: 'a Jersey Print',
        mini_stadium: 'a Mini Stadium',
        figurine:     'a Player Figurine',
        match_ball:   'a Match Ball'
      };
      claimItem.textContent = labels[productKey] || 'this item';
    }
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.btn--claim').forEach((btn) =>
    btn.addEventListener('click', () => openModal(btn.dataset.product))
  );
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.matches('[data-modal-close]')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  let revealObs = null;
  if ('IntersectionObserver' in window) {
    revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  function observeReveal(els) {
    if (!revealObs || !els) return;
    els.forEach((el) => revealObs.observe(el));
  }
  observeReveal(document.querySelectorAll('.product-card, .other-card'));

  const milestones = [25, 50, 75, 100];
  const fired = new Set();
  let scrollT;
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
  window.addEventListener('scroll', () => {
    if (scrollT) return;
    scrollT = setTimeout(() => { onScroll(); scrollT = null; }, 250);
  }, { passive: true });

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

  if (new URLSearchParams(window.location.search).get('debug') === '1') {
    window.DEBUG_ANALYTICS = true;
    console.log('[analytics] debug mode on');
  }

  renderUpcoming();
  renderPast();
})();
