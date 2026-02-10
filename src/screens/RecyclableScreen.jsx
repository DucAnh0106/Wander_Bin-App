import { useState, useEffect } from 'react'
import COLORS from '../utils/colors'
import { playChime } from '../utils/sounds'
import { vibrate } from '../utils/haptics'
import LEDFace from '../components/LEDFace'
import LidAnimation from '../components/LidAnimation'

export default function RecyclableScreen({ onScanAgain, onDismiss }) {
  const [lidOpen, setLidOpen] = useState(false)
  const [disposed, setDisposed] = useState(false)

  useEffect(() => {
    playChime('success')
    vibrate(50)
  }, [])

  const handleWave = () => {
    vibrate(40)
    setLidOpen(true)
    setTimeout(() => setDisposed(true), 1200)
  }

  return (
    <div
      style={{
        padding: '0 20px',
        textAlign: 'center',
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${COLORS.greenLight} 0%, ${COLORS.white} 50%)`,
        animation: 'fadeUp 0.5s ease',
      }}
    >
      {/* LED Face */}
      <div style={{ paddingTop: 50 }}>
        <LEDFace expression="happy" size={100} />
      </div>

      <h2
        style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: 26,
          color: COLORS.navy,
          margin: '20px 0 6px',
        }}
      >
        ✅ This item is recyclable!
      </h2>
      <p style={{ fontSize: 15, color: COLORS.gray600, margin: '0 0 28px' }}>
        Great job identifying a recyclable item.
      </p>

      {/* ── Pre-disposal: wave to open lid ── */}
      {!disposed ? (
        <>
          <LidAnimation open={lidOpen} />

          {!lidOpen ? (
            <>
              <p
                style={{
                  fontSize: 14,
                  color: COLORS.gray600,
                  margin: '20px 0 16px',
                  background: COLORS.blueLight,
                  padding: '12px 16px',
                  borderRadius: 12,
                }}
              >
                👋 Wave your hand near the bin to open the lid
              </p>
              <button
                onClick={handleWave}
                style={{
                  width: '100%',
                  padding: 16,
                  borderRadius: 14,
                  border: 'none',
                  background: `linear-gradient(135deg, ${COLORS.green}, #16A34A)`,
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Fredoka', sans-serif",
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(34,197,94,0.35)',
                }}
              >
                👋 Wave to Open Lid
              </button>
            </>
          ) : (
            <p
              style={{
                fontSize: 15,
                color: COLORS.green,
                fontWeight: 600,
                margin: '16px 0',
                animation: 'fadeUp 0.5s ease',
              }}
            >
              Lid opening... dispose your item now!
            </p>
          )}
        </>
      ) : (
        /* ── Post-disposal: confirmation ── */
        <div style={{ animation: 'fadeUp 0.5s ease' }}>
          <div
            style={{
              background: COLORS.greenLight,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
            <p
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: 18,
                color: COLORS.green,
                fontWeight: 700,
                margin: 0,
              }}
            >
              Item disposed! Thank you for recycling.
            </p>
          </div>

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
      )}
    </div>
  )
}
