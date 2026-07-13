// ---------------------------------------------------------------------------
// SpaceDashboard.jsx
// Dev/testing dashboard that renders live data for every celestial body.
// Drop this onto any route to inspect what the API returns.
// ---------------------------------------------------------------------------

import { useSpaceData } from '../hooks/useSpaceData';

// ---------------------------------------------------------------------------
// Colour palette per body (matches the existing app aesthetic)
// ---------------------------------------------------------------------------
const BODY_COLORS = {
  sun          : { accent: '#fbbf24', glow: 'rgba(251,191,36,0.25)' },
  mercury      : { accent: '#9ca3af', glow: 'rgba(156,163,175,0.20)' },
  venus        : { accent: '#f97316', glow: 'rgba(249,115,22,0.20)'  },
  earth        : { accent: '#60a5fa', glow: 'rgba(96,165,250,0.20)'  },
  moon         : { accent: '#d1d5db', glow: 'rgba(209,213,219,0.15)' },
  mars         : { accent: '#ef4444', glow: 'rgba(239,68,68,0.20)'   },
  asteroidBelt : { accent: '#a3e635', glow: 'rgba(163,230,53,0.18)'  },
  jupiter      : { accent: '#fcd34d', glow: 'rgba(252,211,77,0.20)'  },
  saturn       : { accent: '#fde68a', glow: 'rgba(253,230,138,0.20)' },
  uranus       : { accent: '#67e8f9', glow: 'rgba(103,232,249,0.20)' },
  neptune      : { accent: '#818cf8', glow: 'rgba(129,140,248,0.20)' },
};

// ---------------------------------------------------------------------------
// Helper: format a number safely
// ---------------------------------------------------------------------------
function fmt(val, unit = '') {
  if (val === null || val === undefined) return 'N/A';
  return `${Number(val).toLocaleString()}${unit ? ' ' + unit : ''}`;
}

// ---------------------------------------------------------------------------
// Single body card
// ---------------------------------------------------------------------------
function BodyCard({ bodyKey, body }) {
  const { accent, glow } = BODY_COLORS[bodyKey] ?? { accent: '#fff', glow: 'transparent' };

  // Asteroid Belt returns { asteroids, ceres } — render differently
  if (bodyKey === 'asteroidBelt') {
    const { ceres, asteroids = [] } = body ?? {};
    return (
      <div style={cardStyle(glow)}>
        <h2 style={{ color: accent, ...titleStyle }}>ASTEROID BELT</h2>
        <p style={subtitleStyle}>Dwarf Planet / Asteroid region between Mars & Jupiter</p>

        {ceres && (
          <>
            <p style={sectionLabel(accent)}>CERES (largest body)</p>
            <div style={gridStyle}>
              <Stat label="Type"        value={ceres.bodyType}                       accent={accent} />
              <Stat label="Radius"      value={fmt(ceres.meanRadius, 'km')}          accent={accent} />
              <Stat label="Gravity"     value={fmt(ceres.gravity, 'm/s²')}           accent={accent} />
              <Stat label="Avg Temp"    value={fmt(ceres.avgTemp, 'K')}              accent={accent} />
            </div>
          </>
        )}

        {asteroids.length > 0 && (
          <>
            <p style={{ ...sectionLabel(accent), marginTop: '12px' }}>NOTABLE ASTEROIDS</p>
            <div style={gridStyle}>
              {asteroids.map((a) => (
                <Stat key={a.id} label={a.englishName || a.id} value={fmt(a.meanRadius, 'km radius')} accent={accent} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  if (!body) {
    return (
      <div style={cardStyle(glow)}>
        <h2 style={{ color: accent, ...titleStyle }}>{bodyKey.toUpperCase()}</h2>
        <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>No data returned</p>
      </div>
    );
  }

  return (
    <div style={cardStyle(glow)}>
      <h2 style={{ color: accent, ...titleStyle }}>{(body.englishName || bodyKey).toUpperCase()}</h2>
      <p style={subtitleStyle}>{body.bodyType ?? 'Unknown type'}</p>
      <div style={gridStyle}>
        <Stat label="Mean Radius"   value={fmt(body.meanRadius,   'km')}   accent={accent} />
        <Stat label="Gravity"       value={fmt(body.gravity,      'm/s²')} accent={accent} />
        <Stat label="Avg Temp"      value={fmt(body.avgTemp,      'K')}    accent={accent} />
        <Stat label="Orbital Period"value={fmt(body.sideralOrbit, 'days')} accent={accent} />
        <Stat label="Moons"         value={body.moons?.length ?? 0}        accent={accent} />
        <Stat label="Is Planet"     value={body.isPlanet ? 'Yes' : 'No'}   accent={accent} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat pill
// ---------------------------------------------------------------------------
function Stat({ label, value, accent }) {
  return (
    <div style={statStyle}>
      <span style={{ color: accent, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
        {label}
      </span>
      <span style={{ color: '#f3f4f6', fontSize: '0.85rem' }}>{value}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const BODY_ORDER = [
  'sun', 'mercury', 'venus', 'earth', 'moon',
  'mars', 'asteroidBelt',
  'jupiter', 'saturn', 'uranus', 'neptune',
];

export default function SpaceDashboard() {
  const { data, isPending, isError, error, refetch } = useSpaceData();

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isPending) {
    return (
      <div style={centeredStyle}>
        <div style={spinnerStyle} />
        <p style={{ color: '#9ca3af', marginTop: '20px', fontSize: '0.95rem' }}>
          Fetching solar system data…
        </p>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div style={centeredStyle}>
        <p style={{ color: '#f87171', fontSize: '1.1rem', marginBottom: '12px' }}>
          ⚠ Failed to load space data
        </p>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '20px', maxWidth: '400px', textAlign: 'center' }}>
          {error?.message ?? 'Unknown error'}
        </p>
        <button onClick={refetch} style={retryBtn}>Retry</button>
      </div>
    );
  }

  // ── Data ─────────────────────────────────────────────────────────────────
  return (
    <div style={dashboardStyle}>
      <h1 style={headingStyle}>SOLAR SYSTEM — LIVE DATA</h1>
      <p style={{ color: '#6b7280', fontSize: '0.8rem', textAlign: 'center', marginBottom: '40px' }}>
        Powered by The Solar System OpenData API
      </p>

      <div style={gridWrapStyle}>
        {BODY_ORDER.map((key) => (
          <BodyCard key={key} bodyKey={key} body={data?.[key]} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline styles (no Tailwind dependency so this component is fully portable)
// ---------------------------------------------------------------------------
function cardStyle(glow) {
  return {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: `0 0 24px ${glow}`,
    backdropFilter: 'blur(8px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };
}

const titleStyle = {
  margin: 0,
  fontSize: '1.1rem',
  fontWeight: 800,
  letterSpacing: '0.12em',
};

const subtitleStyle = {
  color: '#6b7280',
  fontSize: '0.75rem',
  margin: '0 0 8px',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '6px',
};

const statStyle = {
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '6px',
  padding: '8px 10px',
};

function sectionLabel(accent) {
  return {
    color: accent,
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    margin: '4px 0 2px',
  };
}

const dashboardStyle = {
  minHeight: '100vh',
  background: '#050510',
  padding: '80px 24px 60px',
  fontFamily: "'Inter', sans-serif",
  color: '#f3f4f6',
};

const headingStyle = {
  textAlign: 'center',
  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
  fontWeight: 900,
  letterSpacing: '0.15em',
  color: '#f9fafb',
  textShadow: '0 0 20px rgba(148,163,184,0.4)',
  marginBottom: '8px',
};

const gridWrapStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
};

const centeredStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: '#050510',
};

const spinnerStyle = {
  width: '48px',
  height: '48px',
  border: '3px solid rgba(255,255,255,0.1)',
  borderTop: '3px solid #60a5fa',
  borderRadius: '50%',
  animation: 'spin 0.9s linear infinite',
};

const retryBtn = {
  background: 'rgba(96,165,250,0.15)',
  border: '1px solid #60a5fa',
  borderRadius: '8px',
  color: '#93c5fd',
  padding: '10px 28px',
  fontSize: '0.9rem',
  cursor: 'pointer',
  fontWeight: 600,
  letterSpacing: '0.05em',
};
