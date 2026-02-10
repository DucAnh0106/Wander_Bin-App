import COLORS from '../utils/colors'

export default function ScanOverlay({ scanning }) {
  const corners = [
    { top: 0, left: 0, borderTop: '3px solid #fff', borderLeft: '3px solid #fff' },
    { top: 0, right: 0, borderTop: '3px solid #fff', borderRight: '3px solid #fff' },
    { bottom: 0, left: 0, borderBottom: '3px solid #fff', borderLeft: '3px solid #fff' },
    { bottom: 0, right: 0, borderBottom: '3px solid #fff', borderRight: '3px solid #fff' },
  ]

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{ width: 220, height: 220, position: 'relative' }}>
        {/* Corner brackets */}
        {corners.map((style, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 36,
              height: 36,
              borderRadius: 4,
              ...style,
            }}
          />
        ))}

        {/* Animated scan line */}
        {scanning && (
          <div
            style={{
              position: 'absolute',
              left: 10,
              right: 10,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.orange}, transparent)`,
              boxShadow: `0 0 12px ${COLORS.orange}`,
              animation: 'scanLine 1.8s ease-in-out infinite',
            }}
          />
        )}
      </div>
    </div>
  )
}
