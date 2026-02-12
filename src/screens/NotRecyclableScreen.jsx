import { useEffect } from 'react'
import COLORS from '../utils/colors'
import { playChime } from '../utils/sounds'
import { vibrate } from '../utils/haptics'
import LEDFace from '../components/LEDFace'
import LidAnimation from '../components/LidAnimation'

// UPDATED: Now accepts 'itemData' prop
export default function NotRecyclableScreen({ itemData, onScanAgain, onDismiss }) {
  
  // Fallback defaults
  const itemName = itemData?.itemName || "This item";
  const reason = itemData?.reason || "It cannot be processed by this bin.";

  useEffect(() => {
    playChime('fail')
    vibrate([50, 100, 50])
  }, [])

  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${COLORS.redLight} 0%, ${COLORS.white} 50%)`,
        animation: 'fadeUp 0.5s ease',
        boxSizing: 'border-box'
      }}
    >
      {/* LED Face — sad */}
      <div style={{ paddingTop: 40 }}>
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
        ❌ {itemName}
      </h2>
      <p style={{ fontSize: 16, color: COLORS.gray600, margin: '0 0 24px', fontWeight: 500 }}>
        Not Recyclable
      </p>

      {/* Lid stays locked */}
      <LidAnimation open={false} />

      {/* Disposal guidance */}
      <div
        style={{
          background: COLORS.orangeLight || '#fff7ed', // Ensure fallback color
          borderRadius: 14,
          padding: '16px 20px',
          margin: '20px 0 28px',
          textAlign: 'left',
          borderLeft: `4px solid ${COLORS.orange}`
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: COLORS.orange,
            marginBottom: 6,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>⚠️</span> Why?
        </div>
        <p style={{ fontSize: 15, color: COLORS.gray600, margin: 0, lineHeight: 1.5 }}>
          {reason}
        </p>
        <hr style={{ border: 'none', borderTop: `1px solid ${COLORS.gray200}`, margin: '12px 0' }} />
        <p style={{ fontSize: 13, color: COLORS.gray400, margin: 0 }}>
          Please use the <strong>General Waste</strong> bin instead.
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
          Scan Another
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
          Dismiss
        </button>
      </div>
    </div>
  )
}
