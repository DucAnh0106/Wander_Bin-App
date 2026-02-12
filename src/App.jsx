import { useState } from 'react'
import COLORS from './utils/colors' // Verify this path matches your structure

// Screens
import HomeScreen from './screens/HomeScreen'
import EnRouteScreen from './screens/EnRouteScreen'
import ScanScreen from './screens/ScanScreen'
import RecyclableScreen from './screens/RecyclableScreen'
import NotRecyclableScreen from './screens/NotRecyclableScreen'
import DepartureScreen from './screens/DepartureScreen'

const SCREENS = {
  HOME: 'home',
  EN_ROUTE: 'enRoute',
  SCAN: 'scan',
  RECYCLABLE: 'recyclable',
  NOT_RECYCLABLE: 'notRecyclable',
  DEPARTURE: 'departure',
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME)
  const [selectedBot, setSelectedBot] = useState(null)
  
  // NEW: State to store Gemini's analysis results
  const [scanResult, setScanResult] = useState({ 
    itemName: 'Unknown Item', 
    reason: 'Analysis unavailable' 
  })

  // ── Navigation handlers ──
  const handleSummon = (bot) => {
    setSelectedBot(bot)
    setScreen(SCREENS.EN_ROUTE)
  }

  const handleArrived = () => setScreen(SCREENS.SCAN)

  // UPDATED: Now receives the full result object from ScanScreen
  const handleScanResult = (result) => {
    // 1. Store the AI's findings so we can show them on the next screen
    setScanResult({
      itemName: result.itemName || "Unknown Item",
      reason: result.reason || "No reason provided."
    })

    // 2. Navigate based on recyclability boolean
    if (result.isRecyclable) {
      setScreen(SCREENS.RECYCLABLE)
    } else {
      setScreen(SCREENS.NOT_RECYCLABLE)
    }
  }

  const handleScanAgain = () => setScreen(SCREENS.SCAN)

  const handleDismiss = () => setScreen(SCREENS.DEPARTURE)

  const handleDepartureComplete = () => {
    setSelectedBot(null)
    setScreen(SCREENS.HOME)
  }

  const handleCancel = () => {
    setSelectedBot(null)
    setScreen(SCREENS.HOME)
  }

  const isDarkHeader = screen === SCREENS.SCAN

  return (
    <div
      style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100vh',
        background: COLORS.gray50,
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── App Header Bar ── */}
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontSize: 13,
          fontWeight: 600,
          color: isDarkHeader ? '#fff' : COLORS.navy,
          background: isDarkHeader ? '#000' : COLORS.gray50,
          zIndex: 20,
        }}
      >
        {/* Back button (not on Home or Scan) */}
        {screen !== SCREENS.HOME && screen !== SCREENS.SCAN && (
          <div
            onClick={handleCancel}
            style={{
              position: 'absolute',
              left: 16,
              cursor: 'pointer',
              fontSize: 22,
              lineHeight: 1,
              color: isDarkHeader ? '#fff' : COLORS.navy,
            }}
          >
            ‹
          </div>
        )}
        <span>Wander-Bin</span>
      </div>

      {/* ── Screen Router ── */}
      {screen === SCREENS.HOME && (
        <HomeScreen onSummon={handleSummon} />
      )}
      
      {screen === SCREENS.EN_ROUTE && (
        <EnRouteScreen
          bot={selectedBot}
          onArrived={handleArrived}
          onCancel={handleCancel}
        />
      )}
      
      {screen === SCREENS.SCAN && (
        <ScanScreen onResult={handleScanResult} />
      )}
      
      {/* UPDATED: Passing the AI data to result screens */}
      {screen === SCREENS.RECYCLABLE && (
        <RecyclableScreen
          itemData={scanResult} // Pass the name/reason here
          onScanAgain={handleScanAgain}
          onDismiss={handleDismiss}
        />
      )}
      
      {screen === SCREENS.NOT_RECYCLABLE && (
        <NotRecyclableScreen
          itemData={scanResult} // Pass the name/reason here
          onScanAgain={handleScanAgain}
          onDismiss={handleDismiss}
        />
      )}
      
      {screen === SCREENS.DEPARTURE && (
        <DepartureScreen onComplete={handleDepartureComplete} />
      )}
    </div>
  )
}
