import { useEffect } from 'react'
import COLORS from '../utils/colors'
import { playChime } from '../utils/sounds'
import { vibrate } from '../utils/haptics'
import LEDFace from '../components/LEDFace'
import LidAnimation from '../components/LidAnimation'

export default function NotRecyclableScreen({ onScanAgain, onDismiss }) {
  useEffect(() => {
    playChime('fail')
    vibrate([50, 100, 50])
  }, [])

  return (
    <div
      style={{
        padding: '0 20px',
        textAlign: 'center',
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${COLORS.redLight} 0%, ${COLORS.white} 50%)`,
        animation: 'fadeUp 0.5s ease',
      }}
    >
      {/* LED Face — sad */}
      <div style={{ paddingTop: 50 }}>
        <LEDFace expression="sad" size={100} />
      </div>

      <h2
        style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: 26,
          color: COLORS.navy,
          margin: '20px 0 6px',
        }}
      >
        ❌ Not Recyclable
      </h2>
      <p style={{ fontSize: 15, color: COLORS.gray600, margin: '0 0 24px' }}>
        This item cannot be placed in the recycling bin.
      </p>

      {/* Lid stays locked */}
      <LidAnimation open={false} />

      {/* Disposal guidance */}
      <div
        style={{
          background: COLORS.orangeLight,
          borderRadius: 14,
          padding: '16px 20px',
          margin: '20px 0 28px',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: COLORS.orange,
            marginBottom: 6,
          }}
        >
          🗑️ Disposal Guidance
        </div>
        <p style={{ fontSize: 14, color: COLORS.gray600, margin: 0, lineHeight: 1.5 }}>
          Please dispose of this item in the <strong>general waste bin</strong>.
          Common non-recyclable items include food-soiled packaging, styrofoam,
          and certain plastics.
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => { vibrate(20); onScanAgain() }}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 14,
            border: 'none',
            background: COLORS.blue,
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          🔍 Scan Another
        </button>
        <button
          onClick={() => { vibrate(20); onDismiss() }}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 14,
            border: `2px solid ${COLORS.gray200}`,
            background: 'transparent',
            color: COLORS.gray600,
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Dismiss Robot
        </button>
      </div>
    </div>
  )
}
