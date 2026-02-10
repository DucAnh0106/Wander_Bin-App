import { useState, useEffect } from 'react'
import COLORS from '../utils/colors'
import { playChime } from '../utils/sounds'
import CrabBot from '../components/CrabBot'

export default function DepartureScreen({ onComplete }) {
  const [phase, setPhase] = useState(0) // 0 = departing, 1 = gone

  useEffect(() => {
    playChime('depart')
    const t1 = setTimeout(() => setPhase(1), 3000)
    const t2 = setTimeout(() => onComplete(), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <div
      style={{
        padding: '0 20px',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeUp 0.5s ease',
      }}
    >
      {/* Crab bot shrinks and fades away */}
      <div
        style={{
          transform: phase === 0 ? 'scale(1)' : 'scale(0.3) translateY(-100px)',
          opacity: phase === 0 ? 1 : 0,
          transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <CrabBot size={130} animate={true} mood="happy" />
      </div>

      <h2
        style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: 24,
          color: COLORS.navy,
          margin: '24px 0 8px',
        }}
      >
        {phase === 0 ? 'Robot is heading back 🏠' : 'See you next time! 👋'}
      </h2>

      <p style={{ fontSize: 15, color: COLORS.gray600, margin: 0 }}>
        {phase === 0 ? 'Returning to base...' : 'Thank you for recycling responsibly!'}
      </p>

      {/* Loading dots */}
      {phase === 0 && (
        <div style={{ display: 'flex', gap: 6, marginTop: 24 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: COLORS.orange,
                animation: 'bounce 0.6s ease infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
