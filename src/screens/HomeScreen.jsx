import COLORS from '../utils/colors'
import { vibrate } from '../utils/haptics'
import CrabBot from '../components/CrabBot'
import BotCard from '../components/BotCard'

const BOTS = [
  { id: 'CRAB-01', distance: 12, status: 'Ready' },
  { id: 'CRAB-02', distance: 28, status: 'Ready' },
  { id: 'CRAB-03', distance: 45, status: 'Busy' },
]

export default function HomeScreen({ onSummon }) {
  return (
    <div style={{ padding: '0 20px 100px', animation: 'fadeUp 0.5s ease' }}>
      {/* ── Header ── */}
      <div style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 10 }}>
        <CrabBot size={100} mood="neutral" />
        <h1
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: 28,
            color: COLORS.navy,
            margin: '8px 0 0',
            letterSpacing: '-0.5px',
          }}
        >
          Wander-Bin
        </h1>
        <p style={{ fontSize: 14, color: COLORS.gray600, margin: '4px 0 0' }}>
          Smart recycling, delivered to you 🦀
        </p>
      </div>

      {/* ── Location card ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.navy})`,
          borderRadius: 18,
          padding: '18px 20px',
          color: '#fff',
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.7, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          📍 Your Location
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>
          Block 123, Ang Mo Kio Ave 6
        </div>
        <div style={{ fontSize: 13, opacity: 0.7, marginTop: 2 }}>
          Level 1 · Void Deck
        </div>
      </div>

      {/* ── Bot list ── */}
      <div style={{ marginBottom: 10 }}>
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.navy,
            margin: '0 0 12px',
          }}
        >
          Nearby Wander-Bins
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {BOTS.map((bot) => (
            <BotCard key={bot.id} bot={bot} onSummon={onSummon} />
          ))}
        </div>
      </div>

      {/* ── Sticky CTA ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 20px 28px',
          background: `linear-gradient(transparent, ${COLORS.gray50} 30%)`,
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 430, margin: '0 auto' }}>
          <button
            onClick={() => {
              vibrate(40)
              onSummon(BOTS[0])
            }}
            style={{
              width: '100%',
              padding: 18,
              borderRadius: 16,
              border: 'none',
              background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeWarm})`,
              color: '#fff',
              fontSize: 17,
              fontWeight: 700,
              fontFamily: "'Fredoka', sans-serif",
              letterSpacing: '0.02em',
              cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(255,122,47,0.35)',
            }}
          >
            🦀 Summon Nearest Bot
          </button>
        </div>
      </div>
    </div>
  )
}
