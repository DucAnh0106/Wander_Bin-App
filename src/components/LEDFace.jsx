import COLORS from '../utils/colors'

/**
 * Digital LED face mimicking the CRAB-E robot's expression display.
 * Expressions: happy, sad, neutral, scanning, wink
 */
export default function LEDFace({ expression = 'neutral', size = 120 }) {
  const r = size / 2
  const eyeR = size * 0.1
  const eyeY = r * 0.7
  const mouthY = r * 1.25

  const faces = {
    happy: {
      bg: COLORS.green,
      glow: '0 0 30px rgba(34,197,94,0.5)',
      leftEye:  <circle cx={r * 0.65} cy={eyeY} r={eyeR} fill="#fff" />,
      rightEye: <circle cx={r * 1.35} cy={eyeY} r={eyeR} fill="#fff" />,
      mouth: (
        <path
          d={`M ${r * 0.55} ${mouthY} Q ${r} ${mouthY + size * 0.18} ${r * 1.45} ${mouthY}`}
          stroke="#fff" strokeWidth={3.5} fill="none" strokeLinecap="round"
        />
      ),
    },

    sad: {
      bg: COLORS.red,
      glow: '0 0 30px rgba(239,68,68,0.45)',
      leftEye:  <circle cx={r * 0.65} cy={eyeY} r={eyeR} fill="#fff" />,
      rightEye: <circle cx={r * 1.35} cy={eyeY} r={eyeR} fill="#fff" />,
      mouth: (
        <path
          d={`M ${r * 0.55} ${mouthY + size * 0.1} Q ${r} ${mouthY - size * 0.08} ${r * 1.45} ${mouthY + size * 0.1}`}
          stroke="#fff" strokeWidth={3.5} fill="none" strokeLinecap="round"
        />
      ),
    },

    neutral: {
      bg: COLORS.blue,
      glow: '0 0 30px rgba(27,110,243,0.4)',
      leftEye:  <circle cx={r * 0.65} cy={eyeY} r={eyeR} fill="#fff" />,
      rightEye: <circle cx={r * 1.35} cy={eyeY} r={eyeR} fill="#fff" />,
      mouth: (
        <line
          x1={r * 0.6} y1={mouthY} x2={r * 1.4} y2={mouthY}
          stroke="#fff" strokeWidth={3} strokeLinecap="round"
        />
      ),
    },

    scanning: {
      bg: COLORS.blueMid,
      glow: '0 0 40px rgba(46,134,240,0.6)',
      leftEye: (
        <circle cx={r * 0.65} cy={eyeY} r={eyeR} fill="none" stroke="#fff" strokeWidth={2}>
          <animate attributeName="r" values={`${eyeR};${eyeR * 0.3};${eyeR}`} dur="1s" repeatCount="indefinite" />
        </circle>
      ),
      rightEye: (
        <circle cx={r * 1.35} cy={eyeY} r={eyeR} fill="none" stroke="#fff" strokeWidth={2}>
          <animate attributeName="r" values={`${eyeR};${eyeR * 0.3};${eyeR}`} dur="1s" repeatCount="indefinite" />
        </circle>
      ),
      mouth: (
        <line
          x1={r * 0.7} y1={mouthY} x2={r * 1.3} y2={mouthY}
          stroke="#fff" strokeWidth={2.5} strokeLinecap="round"
        >
          <animate attributeName="x2" values={`${r * 1.3};${r * 1.1};${r * 1.3}`} dur="0.8s" repeatCount="indefinite" />
        </line>
      ),
    },

    wink: {
      bg: COLORS.orange,
      glow: '0 0 30px rgba(255,122,47,0.5)',
      leftEye: <circle cx={r * 0.65} cy={eyeY} r={eyeR} fill="#fff" />,
      rightEye: (
        <line
          x1={r * 1.2} y1={eyeY} x2={r * 1.5} y2={eyeY}
          stroke="#fff" strokeWidth={3} strokeLinecap="round"
        />
      ),
      mouth: (
        <path
          d={`M ${r * 0.55} ${mouthY} Q ${r} ${mouthY + size * 0.18} ${r * 1.45} ${mouthY}`}
          stroke="#fff" strokeWidth={3.5} fill="none" strokeLinecap="round"
        />
      ),
    },
  }

  const face = faces[expression] || faces.neutral

  return (
    <div
      style={{
        display: 'inline-flex',
        borderRadius: '50%',
        background: face.bg,
        boxShadow: face.glow,
        transition: 'all 0.5s ease',
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {face.leftEye}
        {face.rightEye}
        {face.mouth}
      </svg>
    </div>
  )
}
