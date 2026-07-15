// ---------------------------------------------------------------------------
// useSpaceData.js
// React Query hooks for every celestial body in the Solar System OpenData API.
//
// EXPORTS
//   useSpaceData()   — fetches ALL bodies at once (for SpaceDashboard)
//   useSun()         — individual hooks for each page
//   useMercury()
//   useVenus()
//   useEarth()
//   useMoon()
//   useMars()
//   useAsteroidBelt()
//   useJupiter()
//   useSaturn()
//   useUranus()
//   useNeptune()
// ---------------------------------------------------------------------------

import { useQuery } from '@tanstack/react-query';
import {
  getCelestialBodies,
  fetchSun,
  fetchMercury,
  fetchVenus,
  fetchEarth,
  fetchMoon,
  fetchMars,
  fetchAsteroidBelt,
  fetchJupiter,
  fetchSaturn,
  fetchUranus,
  fetchNeptune,
  fetchBlackHoleApod,
  fetchBlackHoleSummary,
  fetchSupernovaApod,
  fetchSupernovaSummary,
} from '../services/spaceService';

// ---------------------------------------------------------------------------
// Shared query config
// Space data changes rarely — cache for 10 minutes.
// ---------------------------------------------------------------------------
const QUERY_CONFIG = {
  staleTime : 10 * 60 * 1000, // 10 min
  gcTime    : 30 * 60 * 1000, // keep in cache 30 min after unmount
  retry     : 2,
};

// ---------------------------------------------------------------------------
// Composite hook — all bodies
// ---------------------------------------------------------------------------

/**
 * Fetches every supported celestial body in one parallel request group.
 * data shape: { sun, mercury, venus, earth, moon, mars, asteroidBelt,
 *               jupiter, saturn, uranus, neptune }
 */
export function useSpaceData() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey : ['celestialBodies'],
    queryFn  : getCelestialBodies,
    ...QUERY_CONFIG,
  });

  return { data, isPending, isError, error, refetch };
}

// ---------------------------------------------------------------------------
// Per-body hooks — used directly in individual planet pages
// ---------------------------------------------------------------------------

/** @returns {{ data, isPending, isError, error }} */
export function useSun() {
  return useQuery({ queryKey: ['body', 'sun'],     queryFn: fetchSun,     ...QUERY_CONFIG });
}

export function useMercury() {
  return useQuery({ queryKey: ['body', 'mercury'], queryFn: fetchMercury, ...QUERY_CONFIG });
}

export function useVenus() {
  return useQuery({ queryKey: ['body', 'venus'],   queryFn: fetchVenus,   ...QUERY_CONFIG });
}

export function useEarth() {
  return useQuery({ queryKey: ['body', 'earth'],   queryFn: fetchEarth,   ...QUERY_CONFIG });
}

export function useMoon() {
  return useQuery({ queryKey: ['body', 'moon'],    queryFn: fetchMoon,    ...QUERY_CONFIG });
}

export function useMars() {
  return useQuery({ queryKey: ['body', 'mars'],    queryFn: fetchMars,    ...QUERY_CONFIG });
}

export function useAsteroidBelt() {
  return useQuery({ queryKey: ['body', 'asteroidBelt'], queryFn: fetchAsteroidBelt, ...QUERY_CONFIG });
}

export function useJupiter() {
  return useQuery({ queryKey: ['body', 'jupiter'], queryFn: fetchJupiter, ...QUERY_CONFIG });
}

export function useSaturn() {
  return useQuery({ queryKey: ['body', 'saturn'],  queryFn: fetchSaturn,  ...QUERY_CONFIG });
}

export function useUranus() {
  return useQuery({ queryKey: ['body', 'uranus'],  queryFn: fetchUranus,  ...QUERY_CONFIG });
}

export function useNeptune() {
  return useQuery({ queryKey: ['body', 'neptune'], queryFn: fetchNeptune, ...QUERY_CONFIG });
}

// ---------------------------------------------------------------------------
// Black Hole hook — APOD image + Wikipedia summary fetched in parallel
// ---------------------------------------------------------------------------

/**
 * Fetches the historic first black hole image (M87*, 2019) from NASA APOD
 * and a structured Wikipedia summary for "Black hole".
 *
 * Returns: { apod, wiki, isPending, isError }
 */
export function useBlackHole() {
  return useQuery({
    queryKey : ['blackHole'],
    queryFn  : async () => {
      const [apodRes, wikiRes] = await Promise.allSettled([
        fetchBlackHoleApod(),
        fetchBlackHoleSummary(),
      ]);
      return {
        apod : apodRes.status === 'fulfilled' ? apodRes.value : null,
        wiki : wikiRes.status === 'fulfilled' ? wikiRes.value : null,
      };
    },
    ...QUERY_CONFIG,
  });
}

// ---------------------------------------------------------------------------
// Supernova hook — APOD image + Wikipedia summary fetched in parallel
// ---------------------------------------------------------------------------

/**
 * Fetches a NASA APOD entry for SN 1987A (the nearest modern supernova)
 * and a structured Wikipedia summary for "Supernova".
 *
 * Returns: { apod, wiki, isPending, isError }
 */
export function useSupernova() {
  return useQuery({
    queryKey : ['supernova'],
    queryFn  : async () => {
      const [apodRes, wikiRes] = await Promise.allSettled([
        fetchSupernovaApod(),
        fetchSupernovaSummary(),
      ]);
      return {
        apod : apodRes.status === 'fulfilled' ? apodRes.value : null,
        wiki : wikiRes.status === 'fulfilled' ? wikiRes.value : null,
      };
    },
    ...QUERY_CONFIG,
  });
}
