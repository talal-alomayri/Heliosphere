import axios from 'axios';

// ─────────────────────────────────────────────────────────────────────────────
// Axios instance — Wikipedia REST API v1
//
// Requests go through the Vite proxy at /api/wiki which rewrites to:
//   https://en.wikipedia.org/api/rest_v1/...
//
// No authentication required. Returns structured article summaries with
// plain-text extracts, thumbnail images, and page metadata.
// Docs: https://en.wikipedia.org/api/rest_v1/
// ─────────────────────────────────────────────────────────────────────────────

const wikiAPI = axios.create({
  baseURL: '/api/wiki',
  headers: {
    'Content-Type': 'application/json',
    // Wikipedia requires a descriptive User-Agent per their API policy
    'Api-User-Agent': 'Heliosphere/1.0 (educational space app)',
  },
});

// ─── RESPONSE INTERCEPTOR ────────────────────────────────────────────────────
wikiAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const status  = error.response?.status;
    const url     = error.config?.url;
    const message = error.response?.data?.detail ?? error.message;
    console.error(`[wikiAPI] ${status ?? 'NETWORK'} error on "${url}": ${message}`);
    return Promise.reject(error);
  }
);

export default wikiAPI;
