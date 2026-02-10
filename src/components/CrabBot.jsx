import COLORS from '../utils/colors'

/**
 * CRAB-E Robot illustration — animated SVG crab with recycling motif.
 * Props:
 *   size     — base width (default 140)
 *   animate  — enable walking animation
 *   mood     — 'happy' | 'sad' | 'neutral'
 */
export default function CrabBot({ size = 140, animate = false, mood = 'neutral' }) {
  const bodyColor = COLORS.orange
  const accentColor = COLORS.blue

  return (
    <div style={{ position: 'relative', width: size, height: size * 0.9, margin: '0 auto' }}>
      <svg width={size} height={size * 0.9} viewBox="0 0 140 126">
        {/* ── Legs ── */}
        <g>
          <path d="M30 85 L10 110" stroke={bodyColor} strokeWidth="5" strokeLinecap="round">
            {animate && (
              <animate attributeName="d" values="M30 85 L10 110;M30 85 L14 108;M30 85 L10 110" dur="0.6s" repeatCount="indefinite" />
            )}
          </path>
          <path d="M45 90 L28 115" stroke={bodyColor} strokeWidth="5" strokeLinecap="round">
            {animate && (
              <animate attributeName="d" values="M45 90 L28 115;M45 90 L32 113;M45 90 L28 115" dur="0.6s" repeatCount="indefinite" begin="0.1s" />
            )}
          </path>
          <path d="M110 85 L130 110" stroke={bodyColor} strokeWidth="5" strokeLinecap="round">
            {animate && (
              <animate attributeName="d" values="M110 85 L130 110;M110 85 L126 108;M110 85 L130 110" dur="0.6s" repeatCount="indefinite" begin="0.15s" />
            )}
          </path>
          <path d="M95 90 L112 115" stroke={bodyColor} strokeWidth="5" strokeLinecap="round">
            {animate && (
              <animate attributeName="d" values="M95 90 L112 115;M95 90 L108 113;M95 90 L112 115" dur="0.6s" repeatCount="indefinite" begin="0.25s" />
            )}
          </path>
        </g>

        {/* ── Claws ── */}
        <g>
          <path d="M25 55 Q5 40 15 25 Q20 18 28 28" stroke={bodyColor} strokeWidth="5" fill="none" strokeLinecap="round">
            {animate && (
              <animateTransform attributeName="transform" type="rotate" values="0 25 55;-8 25 55;0 25 55" dur="0.8s" repeatCount="indefinite" />
            )}
          </path>
          <path d="M115 55 Q135 40 125 25 Q120 18 112 28" stroke={bodyColor} strokeWidth="5" fill="none" strokeLinecap="round">
            {animate && (
              <animateTransform attributeName="transform" type="rotate" values="0 115 55;8 115 55;0 115 55" dur="0.8s" repeatCount="indefinite" begin="0.15s" />
            )}
          </path>
        </g>

        {/* ── Body ── */}
        <ellipse cx="70" cy="70" rx="48" ry="35" fill={bodyColor} />
        <ellipse cx="70" cy="65" rx="38" ry="25" fill="none" stroke={COLORS.orangeWarm} strokeWidth="1.5" opacity="0.5" />

        {/* ── Face panel ── */}
        <rect x="48" y="52" rx="10" ry="10" width="44" height="34" fill={accentColor} />

        {/* ── Eyes + Mouth ── */}
        {mood === 'happy' ? (
          <>
            <circle cx="60" cy="64" r="5" fill="#fff" />
            <circle cx="80" cy="64" r="5" fill="#fff" />
            <path d="M58 76 Q70 85 82 76" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : mood === 'sad' ? (
          <>
            <circle cx="60" cy="64" r="5" fill="#fff" />
            <circle cx="80" cy="64" r="5" fill="#fff" />
            <path d="M58 80 Q70 73 82 80" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="60" cy="64" r="5" fill="#fff" />
            <circle cx="80" cy="64" r="5" fill="#fff" />
            <line x1="58" y1="77" x2="82" y2="77" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {/* ── Antenna ── */}
        <line x1="55" y1="38" x2="48" y2="22" stroke={bodyColor} strokeWidth="3" strokeLinecap="round" />
        <circle cx="48" cy="20" r="4" fill={accentColor} />
        <line x1="85" y1="38" x2="92" y2="22" stroke={bodyColor} strokeWidth="3" strokeLinecap="round" />
        <circle cx="92" cy="20" r="4" fill={accentColor} />

        {/* ── Recycle symbol ── */}
        <text x="70" y="100" textAnchor="middle" fontSize="14" fill="#fff" opacity="0.7">♻</text>
      </svg>
    </div>
  )
}
