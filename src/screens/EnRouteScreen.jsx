import { useState, useEffect } from 'react'
import COLORS from '../utils/colors'
import { playChime } from '../utils/sounds'
import { vibrate } from '../utils/haptics'
import CrabBot from '../components/CrabBot'
import LEDFace from '../components/LEDFace'
import ProgressRing from '../components/ProgressRing'

const TRAVEL_TIME_MS = 12000 // 12-second simulated journey

export default function EnRouteScreen({ bot, onArrived, onCancel }) {
  const [progress, setProgress] = useState(0)
  const [distance, setDistance] = useState(bot?.distance || 12)
  const [arrived, setArrived] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / TRAVEL_TIME_MS, 1)
      setProgress(p)
      setDistance(Math.max(0, Math.round((bot?.distance || 12) * (1 - p))))

      if (p >= 1) {
        clearInterval(interval)
        playChime('arrive')
        vibrate(100)
        setArrived(true)
        setTimeout(() => onArrived(), 2000)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [bot, onArrived])

  return (
    <div style={{ padding: '0 20px', textAlign: 'center', animation: 'fadeUp 0.5s ease' }}>
      {/* Progress ring with crab bot inside */}
      <div style={{ paddingTop: 40 }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <ProgressRing progress={progress} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CrabBot size={90} animate={!arrived} mood={arrived ? 'happy' : 'neutral'} />
          </div>
        </div>
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: 24,
          color: COLORS.navy,
          margin: '20px 0 6px',
        }}
      >
        {arrived ? '🎉 Robot Arrived!' : `${bot?.id || 'CRAB-01'} is on the way!`}
      </h2>

      {/* Approaching state */}
      {!arrived && (
        <>
          <p style={{ fontSize: 15, color: COLORS.gray600, margin: '0 0 28px' }}>
            {distance > 0 ? `About ${distance}m away...` : 'Almost there...'}
          </p>

          {/* Path dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 32,
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: i / 5 <= progress ? COLORS.orange : COLORS.gray200,
                  transition: 'background 0.3s',
                  animation: i / 5 <= progress ? 'bounce 0.5s ease' : 'none',
                }}
              />
            ))}
            <div style={{ fontSize: 20 }}>📍</div>
          </div>

          <button
            onClick={() => {
              vibrate(20)
              onCancel()
            }}
            style={{
              background: 'none',
              border: `2px solid ${COLORS.gray200}`,
              borderRadius: 12,
              padding: '12px 28px',
              color: COLORS.gray600,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel Summon
          </button>
        </>
      )}

      {/* Arrived state */}
      {arrived && (
        <div style={{ animation: 'fadeUp 0.5s ease' }}>
          <LEDFace expression="happy" size={80} />
          <p style={{ fontSize: 15, color: COLORS.gray600, marginTop: 12 }}>
            Preparing scanner...
          </p>
        </div>
      )}
    </div>
  )
}
