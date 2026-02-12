import { useState, useEffect, useRef, useCallback } from 'react'
import COLORS from '../utils/colors' // Ensure this path is correct based on your structure
import { playChime } from '../utils/sounds'
import { vibrate } from '../utils/haptics'
import LEDFace from '../components/LEDFace'
import ScanOverlay from '../components/ScanOverlay'
import { identifyTrash } from '../services/gemini' // Import the AI service

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
            facingMode: 'environment', // Use back camera
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        })
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
          // videoRef.current.play() // sometimes needed explicitly
        }
      } catch (err) {
        console.error("Camera Error:", err);
        if (mounted) setCameraError(true)
      }
    }

    startCamera()

    // Cleanup: Stop camera when leaving screen
    return () => {
      mounted = false
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  // Handle Video Load
  const handleVideoLoaded = () => {
      setCameraReady(true);
      videoRef.current.play().catch(e => console.log("Play error:", e));
  };

  const handleScan = useCallback(async () => {
    if (!videoRef.current || scanning) return;

    vibrate(30)
    playChime('scan')
    setScanning(true)

    try {
      // 1. Capture the current video frame as an image
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // 2. Convert canvas to Blob (file-like object)
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.8));
      const file = new File([blob], "scan.jpg", { type: "image/jpeg" });

      // 3. Send to Gemini API
      const result = await identifyTrash(file);

      // 4. Handle Result
      if (result) {
        // Pass the FULL result object (not just boolean) to onResult
        // onResult needs to handle { isRecyclable, itemName, reason }
        onResult(result); 
      } else {
        alert("Could not identify item. Try getting closer.");
        setScanning(false);
      }

    } catch (error) {
      console.error("Scan failed:", error);
      alert("Error scanning item.");
      setScanning(false);
    }
    
    // Note: We don't stop the camera here anymore, 
    // we let the parent component (App.jsx) unmount this screen if successful.
  }, [scanning, onResult])

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
            onLoadedMetadata={handleVideoLoaded}
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
            color: '#fff'
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
          <p style={{ textAlign: 'center' }}>
            Camera access denied.<br />Check browser permissions.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              background: COLORS.orange || 'orange', // Fallback color
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              fontWeight: 700,
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

        <p style={{ fontSize: 15, color: COLORS.gray600 || '#666', margin: '10px 0 16px' }}>
          {scanning
            ? 'Analyzing item with AI...'
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
              ? (COLORS.gray200 || '#eee')
              : `linear-gradient(135deg, ${COLORS.blue || '#007bff'}, ${COLORS.blueMid || '#0056b3'})`,
            color: scanning ? (COLORS.gray400 || '#999') : '#fff',
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'Fredoka', sans-serif",
            cursor: scanning ? 'default' : 'pointer',
            boxShadow: scanning ? 'none' : '0 4px 20px rgba(27,110,243,0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          {scanning ? '⏳ Analyzing...' : '🔍 Scan Item'}
        </button>
      </div>
    </div>
  )
}
