import axios from 'axios';

// ─────────────────────────────────────────────────────────────────────────────
// Axios instance — NASA Public APIs
//
// Requests go through the Vite proxy at /api/nasa which rewrites to:
//   https://api.nasa.gov/...
//
// Auth: NASA provides a free DEMO_KEY that allows 1,000 req/day with no sign-up.
// For higher limits, add VITE_NASA_API_KEY to your .env file and get a free
// personal key at https://api.nasa.gov/
// ─────────────────────────────────────────────────────────────────────────────

const nasaAPI = axios.create({
  baseURL: '/api/nasa',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── REQUEST INTERCEPTOR ─────────────────────────────────────────────────────
// Append api_key to every request's query params automatically.
// Falls back to NASA's built-in DEMO_KEY (1000 req/day) if no env var is set.
// ─────────────────────────────────────────────────────────────────────────────
nasaAPI.interceptors.request.use(
  (config) => {
    const key = import.meta.env.VITE_NASA_API_KEY ?? 'DEMO_KEY';
    config.params = { api_key: key, ...config.params };
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── RESPONSE INTERCEPTOR ────────────────────────────────────────────────────
nasaAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const status  = error.response?.status;
    const url     = error.config?.url;
    const message = error.response?.data?.msg ?? error.message;
    console.error(`[nasaAPI] ${status ?? 'NETWORK'} error on "${url}": ${message}`);
    return Promise.reject(error);
  }
);

export default nasaAPI;
