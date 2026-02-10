import { useState, useEffect, useRef, useCallback } from 'react'
import COLORS from '../utils/colors'
import { playChime } from '../utils/sounds'
import { vibrate } from '../utils/haptics'
import LEDFace from '../components/LEDFace'
import ScanOverlay from '../components/ScanOverlay'

export default function ScanScreen({ onResult }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [cameraError, setCameraError] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)

  // Start camera on mount
  useEffect(() => {
    let mounted = true

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        })
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
          setCameraReady(true)
        }
      } catch {
        if (mounted) setCameraError(true)
      }
    }

    startCamera()

    return () => {
      mounted = false
      streamRef.current?.getTracks()?.forEach((t) => t.stop())
    }
  }, [])

  // Simulate scan + classification
  const handleScan = useCallback(() => {
    vibrate(30)
    playChime('scan')
    setScanning(true)

    // Simulate processing time (2.5s) then return result
    // For Wizard-of-Oz: 60% chance recyclable
    setTimeout(() => {
      const recyclable = Math.random() > 0.4
      streamRef.current?.getTracks()?.forEach((t) => t.stop())
      onResult(recyclable)
    }, 2500)
  }, [onResult])

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#000',
        animation: 'fadeUp 0.4s ease',
      }}
    >
      {/* ── Camera Feed / Error Fallback ── */}
      {!cameraError ? (
        <div style={{ position: 'relative', width: '100%', height: '70vh', overflow: 'hidden' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <ScanOverlay scanning={scanning} />

          {/* Blue flash overlay while scanning */}
          {scanning && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(27,110,243,0.12)',
                animation: 'pulse 0.6s ease-in-out infinite',
              }}
            />
          )}
        </div>
      ) : (
        <div
          style={{
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 30,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
          <p
            style={{
              color: '#fff',
              fontSize: 16,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Camera access is needed to scan items.
            <br />
            Please enable camera permissions in your browser settings and reload.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              background: COLORS.orange,
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Bottom Panel ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px 24px 0 0',
          padding: '24px 20px 36px',
          textAlign: 'center',
        }}
      >
        <LEDFace expression={scanning ? 'scanning' : 'neutral'} size={56} />

        <p style={{ fontSize: 15, color: COLORS.gray600, margin: '10px 0 16px' }}>
          {scanning
            ? 'Analyzing item...'
            : cameraReady
            ? 'Point camera at your item and tap Scan'
            : 'Starting camera...'}
        </p>

        <button
          onClick={handleScan}
          disabled={scanning || !cameraReady}
          style={{
            width: '100%',
            padding: 16,
            borderRadius: 14,
            border: 'none',
            background: scanning
              ? COLORS.gray200
              : `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueMid})`,
            color: scanning ? COLORS.gray400 : '#fff',
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'Fredoka', sans-serif",
            cursor: scanning ? 'default' : 'pointer',
            boxShadow: scanning ? 'none' : '0 4px 20px rgba(27,110,243,0.3)',
          }}
        >
          {scanning ? '⏳ Scanning...' : '🔍 Scan Item'}
        </button>
      </div>
    </div>
  )
}
