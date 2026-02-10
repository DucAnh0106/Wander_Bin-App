import COLORS from '../utils/colors'
import { vibrate } from '../utils/haptics'
import PulseDot from './PulseDot'

export default function BotCard({ bot, onSummon }) {
  return (
    <div
      style={{
        background: COLORS.white,
        borderRadius: 16,
        padding: '16px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxShadow: '0 2px 12px rgba(11,29,58,0.06)',
        border: `1px solid ${COLORS.gray200}`,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${COLORS.orangeLight}, ${COLORS.blueLight})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: 26,
        }}
      >
        🦀
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy }}>
            {bot.id}
          </span>
          <PulseDot color={bot.status === 'Ready' ? COLORS.green : COLORS.gray400} />
        </div>
        <div style={{ fontSize: 13, color: COLORS.gray600, marginTop: 2 }}>
          {bot.distance}m away · {bot.status}
        </div>
      </div>

      {/* Summon button */}
      <button
        onClick={() => {
          vibrate(20)
          onSummon(bot)
        }}
        disabled={bot.status !== 'Ready'}
        style={{
          background: bot.status === 'Ready' ? COLORS.blue : COLORS.gray200,
          color: bot.status === 'Ready' ? '#fff' : COLORS.gray400,
          border: 'none',
          borderRadius: 12,
          padding: '10px 16px',
          fontWeight: 700,
          fontSize: 13,
          cursor: bot.status === 'Ready' ? 'pointer' : 'default',
          letterSpacing: '0.02em',
        }}
      >
        Summon
      </button>
    </div>
  )
}
