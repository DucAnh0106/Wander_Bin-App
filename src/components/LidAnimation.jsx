import COLORS from '../utils/colors'

export default function LidAnimation({ open }) {
  return (
    <div style={{ width: 140, height: 100, margin: '0 auto', position: 'relative' }}>
      <svg width="140" height="100" viewBox="0 0 140 100">
        {/* Bin body */}
        <rect x="20" y="40" width="100" height="55" rx="8" fill={COLORS.blue} />
        <rect x="30" y="50" width="80" height="35" rx="4" fill={COLORS.navy} opacity="0.15" />
        <text x="70" y="72" textAnchor="middle" fontSize="20" fill="#fff" opacity="0.5">♻</text>

        {/* Lid — pivots open from left hinge */}
        <rect
          x="15" y="30" width="110" height="14" rx="5"
          fill={COLORS.navy}
          style={{
            transformOrigin: '15px 37px',
            transform: open ? 'rotate(-55deg)' : 'rotate(0deg)',
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />

        {/* Hinge */}
        <circle cx="18" cy="37" r="3" fill={COLORS.gray400} />
      </svg>
    </div>
  )
}
