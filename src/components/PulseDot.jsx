import COLORS from '../utils/colors'

export default function PulseDot({ color = COLORS.green, size = 10 }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 0 0 ${color}`,
        animation: 'pulseDot 1.5s ease-in-out infinite',
      }}
    />
  )
}
