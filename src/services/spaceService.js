// ─────────────────────────────────────────────────────────────────────────────
// spaceService.js
// All API calls to the Solar System OpenData API go through this module.
//
// The solarSystemAPI Axios instance already:
//   • Routes requests via the Vite proxy (no CORS)
//   • Attaches Authorization: Bearer <token> on every request
//   • Logs 401 / network errors to the console
//
// French body IDs used by the API:
//   soleil, mercure, venus, terre, lune, mars,
//   jupiter, saturne, uranus, neptune, ceres
// ─────────────────────────────────────────────────────────────────────────────

import solarSystemAPI from '../api/solarSystemAPI';
import nasaAPI        from '../api/nasaAPI';
import wikiAPI        from '../api/wikiAPI';


// ─── INTERNAL HELPERS ────────────────────────────────────────────────────────

/**
 * Validate a celestial-body response object.
 * Logs a warning if required fields are missing — never throws.
 *
 * @param {unknown} data  - Raw response payload
 * @param {string}  label - Human-readable label for logging
 * @returns {boolean} true if the data looks valid
 */
function validateBody(data, label) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    console.warn(`[spaceService] ${label}: expected an object, got`, typeof data, data);
    return false;
  }

  const required = ['id', 'englishName', 'bodyType'];
  const missing  = required.filter((key) => !(key in data));

  if (missing.length) {
    // Fields missing but not fatal — downstream code must handle null values
    console.warn(
      `[spaceService] ${label}: response is missing fields [${missing.join(', ')}]`,
      data
    );
  }

  return true;
}

// ─── GENERIC FETCH ───────────────────────────────────────────────────────────

/**
 * Fetch a single celestial body by its French API ID.
 *
 * @param {string} id     - API body ID, e.g. 'mars', 'soleil'
 * @param {string} [label] - Human label used in log messages (defaults to id)
 * @returns {Promise<object>} Validated body data
 *
 * @example
 *   const mars = await getPlanetData('mars');
 *   console.log(mars.englishName); // "Mars"  (string, not [object Object])
 */
export async function getPlanetData(id, label = id) {
  // The proxy rewrites /api/solar/bodies/mars
  //   → https://api.le-systeme-solaire.net/rest/bodies/mars
  const { data } = await solarSystemAPI.get(`/bodies/${id}`);

  // Verify before returning — avoids silent [object Object] bugs downstream
  validateBody(data, label);

  return data;
}

// ─── INDIVIDUAL BODY FETCHES ─────────────────────────────────────────────────
// One named export per celestial body — keeps components readable.

export const fetchSun     = () => getPlanetData('soleil',  'Sun');
export const fetchMercury = () => getPlanetData('mercure', 'Mercury');
export const fetchVenus   = () => getPlanetData('venus',   'Venus');
export const fetchEarth   = () => getPlanetData('terre',   'Earth');
export const fetchMoon    = () => getPlanetData('lune',    'Moon');
export const fetchMars    = () => getPlanetData('mars',    'Mars');
export const fetchJupiter = () => getPlanetData('jupiter', 'Jupiter');
export const fetchSaturn  = () => getPlanetData('saturne', 'Saturn');
export const fetchUranus  = () => getPlanetData('uranus',  'Uranus');
export const fetchNeptune = () => getPlanetData('neptune', 'Neptune');

// ─── ASTEROID BELT ───────────────────────────────────────────────────────────

/**
 * Fetch the 5 largest asteroids in the belt (by semimajorAxis)
 * plus Ceres (the belt's largest body, classified as a dwarf planet).
 *
 * Uses Promise.allSettled so one failure doesn't block the other.
 *
 * @returns {Promise<{ asteroids: object[], ceres: object|null }>}
 */
export async function fetchAsteroidBelt() {
  const [asteroidsRes, ceresRes] = await Promise.allSettled([
    solarSystemAPI.get('/bodies', {
      params: {
        'filter[]': 'bodyType,eq,Asteroid',
        order     : 'semimajorAxis,asc',
        page      : '1,5',
      },
    }),
    getPlanetData('ceres', 'Ceres'),
  ]);

  const asteroids =
    asteroidsRes.status === 'fulfilled'
      ? (asteroidsRes.value.data?.bodies ?? [])
      : [];

  const ceres =
    ceresRes.status === 'fulfilled' ? ceresRes.value : null;

  if (!asteroids.length && !ceres) {
    console.warn('[spaceService] AsteroidBelt: no data returned from either request');
  }

  return { asteroids, ceres };
}

// ─── COMPOSITE FETCH ─────────────────────────────────────────────────────────

/**
 * Fetch every supported body in parallel.
 * One failed request returns null for that key — others are unaffected.
 *
 * @returns {Promise<Record<string, object|null>>}
 */
export async function getCelestialBodies() {
  const fetchers = {
    sun         : fetchSun,
    mercury     : fetchMercury,
    venus       : fetchVenus,
    earth       : fetchEarth,
    moon        : fetchMoon,
    mars        : fetchMars,
    asteroidBelt: fetchAsteroidBelt,
    jupiter     : fetchJupiter,
    saturn      : fetchSaturn,
    uranus      : fetchUranus,
    neptune     : fetchNeptune,
  };

  const entries = Object.entries(fetchers);
  const results = await Promise.allSettled(entries.map(([, fn]) => fn()));

  return Object.fromEntries(
    entries.map(([key], i) => {
      const result = results[i];

      if (result.status === 'rejected') {
        console.error(
          `[spaceService] getCelestialBodies: "${key}" failed —`,
          result.reason?.message ?? result.reason
        );
        return [key, null];
      }

      return [key, result.value];
    })
  );
}

// ─── BLACK HOLE DATA ─────────────────────────────────────────────────────────

/**
 * Fetch a curated NASA Astronomy Picture of the Day related to black holes.
 * Uses a fixed date (April 10, 2019) — the day the first-ever black hole
 * image (M87*) was released by the Event Horizon Telescope collaboration.
 *
 * @returns {Promise<{ title, url, hdurl, explanation, date, media_type }>}
 */
export async function fetchBlackHoleApod() {
  const { data } = await nasaAPI.get('/planetary/apod', {
    params: { date: '2019-04-10' },
  });
  return data;
}

/**
 * Fetch a structured Wikipedia summary for "Black hole".
 * Returns title, extract (plain-text summary), thumbnail, and page URL.
 *
 * @returns {Promise<{ title, extract, thumbnail, content_urls }>}
 */
export async function fetchBlackHoleSummary() {
  const { data } = await wikiAPI.get('/page/summary/Black_hole');
  return data;
}

// ─── SUPERNOVA DATA ──────────────────────────────────────────────────────────

/**
 * Fetch a curated NASA APOD entry for supernova SN 1987A —
 * the closest observed supernova in modern times (Feb 24, 1987).
 *
 * @returns {Promise<{ title, url, hdurl, explanation, date, media_type }>}
 */
export async function fetchSupernovaApod() {
  const { data } = await nasaAPI.get('/planetary/apod', {
    params: { date: '2017-02-24' },
  });
  return data;
}

/**
 * Fetch a structured Wikipedia summary for "Supernova".
 * Returns title, extract (plain-text summary), thumbnail, and page URL.
 *
 * @returns {Promise<{ title, extract, thumbnail, content_urls }>}
 */
export async function fetchSupernovaSummary() {
  const { data } = await wikiAPI.get('/page/summary/Supernova');
  return data;
}
