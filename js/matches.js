/* ==============================================
   Pixl Forge — World Cup 2026 Fixtures
   ----------------------------------------------
   SAMPLE DATA. Replace with the official FIFA schedule
   once finalized. Each match is a static entry; live
   scores are fetched from football-data.org and merged
   in main.js when an API key is provided.

   Schema:
     id        — unique string (used for live-score merge)
     stage     — 'group' | 'r32' | 'r16' | 'qf' | 'sf' | '3rd' | 'final'
     group     — 'A'..'L' (group stage only) | null
     dateISO   — kickoff in ISO 8601 with timezone offset
     home      — { name, flag (emoji), code (FIFA 3-letter) }
     away      — { name, flag, code }
     venue     — short string (stadium · city)
     score     — { home, away } when match is past or live, else null
     status    — 'SCHEDULED' | 'LIVE' | 'FINISHED' (default SCHEDULED)
   ============================================== */

window.WC2026_MATCHES = [
  /* ---------- PAST: sample warm-up friendlies ---------- */
  {
    id: 'fr-001', stage: 'friendly', group: null,
    dateISO: '2026-04-15T19:00:00-07:00',
    home: { name: 'Mexico',    flag: '🇲🇽', code: 'MEX' },
    away: { name: 'Colombia',  flag: '🇨🇴', code: 'COL' },
    venue: 'Estadio Azteca · Mexico City',
    score: { home: 2, away: 1 }, status: 'FINISHED'
  },
  {
    id: 'fr-002', stage: 'friendly', group: null,
    dateISO: '2026-04-22T17:00:00-07:00',
    home: { name: 'USA',       flag: '🇺🇸', code: 'USA' },
    away: { name: 'Japan',     flag: '🇯🇵', code: 'JPN' },
    venue: "Levi's Stadium · Bay Area",
    score: { home: 1, away: 1 }, status: 'FINISHED'
  },
  {
    id: 'fr-003', stage: 'friendly', group: null,
    dateISO: '2026-05-02T19:00:00-04:00',
    home: { name: 'Canada',    flag: '🇨🇦', code: 'CAN' },
    away: { name: 'Senegal',   flag: '🇸🇳', code: 'SEN' },
    venue: 'BMO Field · Toronto',
    score: { home: 0, away: 2 }, status: 'FINISHED'
  },

  /* ---------- UPCOMING: WC2026 Group Stage (sample) ---------- */
  {
    id: 'wc-001', stage: 'group', group: 'A',
    dateISO: '2026-06-11T11:00:00-06:00',
    home: { name: 'Mexico',    flag: '🇲🇽', code: 'MEX' },
    away: { name: 'Morocco',   flag: '🇲🇦', code: 'MAR' },
    venue: 'Estadio Azteca · Mexico City',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-002', stage: 'group', group: 'B',
    dateISO: '2026-06-12T13:00:00-04:00',
    home: { name: 'Canada',    flag: '🇨🇦', code: 'CAN' },
    away: { name: 'Switzerland', flag: '🇨🇭', code: 'SUI' },
    venue: 'BMO Field · Toronto',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-003', stage: 'group', group: 'C',
    dateISO: '2026-06-12T16:00:00-07:00',
    home: { name: 'USA',       flag: '🇺🇸', code: 'USA' },
    away: { name: 'Ecuador',   flag: '🇪🇨', code: 'ECU' },
    venue: 'SoFi Stadium · Los Angeles',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-004', stage: 'group', group: 'D',
    dateISO: '2026-06-13T15:00:00-04:00',
    home: { name: 'Brazil',    flag: '🇧🇷', code: 'BRA' },
    away: { name: 'Norway',    flag: '🇳🇴', code: 'NOR' },
    venue: 'MetLife Stadium · New Jersey',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-005', stage: 'group', group: 'E',
    dateISO: '2026-06-13T18:00:00-04:00',
    home: { name: 'Argentina', flag: '🇦🇷', code: 'ARG' },
    away: { name: 'South Korea', flag: '🇰🇷', code: 'KOR' },
    venue: 'Hard Rock Stadium · Miami',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-006', stage: 'group', group: 'F',
    dateISO: '2026-06-14T12:00:00-05:00',
    home: { name: 'France',    flag: '🇫🇷', code: 'FRA' },
    away: { name: 'Senegal',   flag: '🇸🇳', code: 'SEN' },
    venue: 'AT&T Stadium · Dallas',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-007', stage: 'group', group: 'G',
    dateISO: '2026-06-14T15:00:00-04:00',
    home: { name: 'England',   flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'ENG' },
    away: { name: 'Croatia',   flag: '🇭🇷', code: 'CRO' },
    venue: 'Mercedes-Benz Stadium · Atlanta',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-008', stage: 'group', group: 'H',
    dateISO: '2026-06-15T17:00:00-04:00',
    home: { name: 'Germany',   flag: '🇩🇪', code: 'GER' },
    away: { name: 'Japan',     flag: '🇯🇵', code: 'JPN' },
    venue: 'Lincoln Financial Field · Philadelphia',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-009', stage: 'group', group: 'I',
    dateISO: '2026-06-15T20:00:00-05:00',
    home: { name: 'Spain',     flag: '🇪🇸', code: 'ESP' },
    away: { name: 'Australia', flag: '🇦🇺', code: 'AUS' },
    venue: 'NRG Stadium · Houston',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-010', stage: 'group', group: 'J',
    dateISO: '2026-06-16T15:00:00-07:00',
    home: { name: 'Portugal',  flag: '🇵🇹', code: 'POR' },
    away: { name: 'Uruguay',   flag: '🇺🇾', code: 'URU' },
    venue: 'Lumen Field · Seattle',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-011', stage: 'group', group: 'K',
    dateISO: '2026-06-16T18:00:00-04:00',
    home: { name: 'Netherlands', flag: '🇳🇱', code: 'NED' },
    away: { name: 'Egypt',     flag: '🇪🇬', code: 'EGY' },
    venue: 'Gillette Stadium · Boston',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-012', stage: 'group', group: 'L',
    dateISO: '2026-06-17T13:00:00-05:00',
    home: { name: 'Belgium',   flag: '🇧🇪', code: 'BEL' },
    away: { name: 'Iran',      flag: '🇮🇷', code: 'IRN' },
    venue: 'Arrowhead Stadium · Kansas City',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-013', stage: 'group', group: 'A',
    dateISO: '2026-06-17T16:00:00-06:00',
    home: { name: 'Mexico',    flag: '🇲🇽', code: 'MEX' },
    away: { name: 'Poland',    flag: '🇵🇱', code: 'POL' },
    venue: 'Estadio Akron · Guadalajara',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-014', stage: 'group', group: 'C',
    dateISO: '2026-06-18T17:00:00-04:00',
    home: { name: 'USA',       flag: '🇺🇸', code: 'USA' },
    away: { name: 'Saudi Arabia', flag: '🇸🇦', code: 'KSA' },
    venue: 'MetLife Stadium · New Jersey',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-015', stage: 'group', group: 'D',
    dateISO: '2026-06-19T15:00:00-04:00',
    home: { name: 'Brazil',    flag: '🇧🇷', code: 'BRA' },
    away: { name: 'Cameroon',  flag: '🇨🇲', code: 'CMR' },
    venue: 'Hard Rock Stadium · Miami',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-r32-1', stage: 'r32', group: null,
    dateISO: '2026-06-28T15:00:00-04:00',
    home: { name: 'Winner A',  flag: '🏆', code: 'TBD' },
    away: { name: 'Runner-up B', flag: '🥈', code: 'TBD' },
    venue: 'TBD',
    score: null, status: 'SCHEDULED'
  },
  {
    id: 'wc-final', stage: 'final', group: null,
    dateISO: '2026-07-19T15:00:00-04:00',
    home: { name: 'Winner SF1', flag: '🏆', code: 'TBD' },
    away: { name: 'Winner SF2', flag: '🏆', code: 'TBD' },
    venue: 'MetLife Stadium · New Jersey',
    score: null, status: 'SCHEDULED'
  }
];

/* ==============================================
   Live-scores config (football-data.org)
   ----------------------------------------------
   To enable live scores:
   1. Sign up free at https://www.football-data.org/client/register
   2. Copy your API token
   3. Replace the empty string below with your token
   4. Done — the Live tab will populate during matches

   Free tier: 10 requests/min, World Cup competition
   ID = 'WC'. The site works fine without a key —
   the schedule renders from the static list above.
   ============================================== */
window.FOOTBALL_DATA_API_KEY = ''; // ← paste your key here

window.FOOTBALL_DATA_CONFIG = {
  baseUrl: 'https://api.football-data.org/v4',
  competition: 'WC',
  refreshSeconds: 60
};
