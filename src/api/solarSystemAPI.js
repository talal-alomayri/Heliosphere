import axios from 'axios';

// ─────────────────────────────────────────────────────────────────────────────
// Axios instance — Solar System OpenData API
//
// WHY /api/solar instead of the direct external URL?
//   Browsers block cross-origin requests that include an Authorization header
//   unless the remote server explicitly allows it in its CORS preflight response.
//   api.le-systeme-solaire.net rejects the OPTIONS preflight → ERR_FAILED.
//
//   Solution: the Vite dev-server proxy (configured in vite.config.js) forwards
//   every /api/solar/* request to https://api.le-systeme-solaire.net/rest/*
//   server-side, so the browser only ever talks to localhost — zero CORS, and
//   the Authorization header still reaches the real API untouched.
// ─────────────────────────────────────────────────────────────────────────────

const solarSystemAPI = axios.create({
  // Proxy path — Vite rewrites this to import.meta.env.VITE_SPACE_API_URL
  // at the server level. See vite.config.js → server.proxy.
  baseURL: '/api/solar',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── REQUEST INTERCEPTOR ─────────────────────────────────────────────────────
// Reads the token from import.meta.env.VITE_SPACE_API_TOKEN and attaches it
// as "Authorization: Bearer <token>" on every outgoing request.
// ─────────────────────────────────────────────────────────────────────────────
solarSystemAPI.interceptors.request.use(
  (config) => {
    // Read the Vite env variable at request time (always fresh in dev HMR)
    const token = import.meta.env.VITE_SPACE_API_TOKEN;

    if (token) {
      // Attach the bearer token — forwarded to the real API via the proxy
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      // Warn loudly in dev if the variable is missing — fail early
      console.warn(
        '[solarSystemAPI] ⚠ VITE_SPACE_API_TOKEN is not set.\n' +
          '  1. Add it to your .env file.\n' +
          '  2. Restart the Vite dev server (env vars are baked at startup).\n' +
          '  3. Get a free key at https://api.le-systeme-solaire.net/generatekey.html'
      );
    }

    return config;
  },
  // Pass request setup errors straight through
  (error) => Promise.reject(error)
);

// ─── RESPONSE INTERCEPTOR ────────────────────────────────────────────────────
// Centralised error logging with specific guidance for common HTTP codes.
// ─────────────────────────────────────────────────────────────────────────────
solarSystemAPI.interceptors.response.use(
  // Success — return the response unchanged
  (response) => response,

  // Error — log a clean message then re-throw so React Query can handle it
  (error) => {
    const status  = error.response?.status;
    const url     = error.config?.url;
    const message = error.response?.data?.message ?? error.message;

    if (status === 401) {
      // Token is missing, wrong, or expired
      console.error(
        `[solarSystemAPI] 401 Unauthorized on "${url}".\n` +
          '  → Check that VITE_SPACE_API_TOKEN in .env is correct and that\n' +
          '    you restarted the dev server after editing .env.'
      );
    } else {
      console.error(
        `[solarSystemAPI] ${status ?? 'NETWORK'} error on "${url}": ${message}`
      );
    }

    return Promise.reject(error);
  }
);

export default solarSystemAPI;
