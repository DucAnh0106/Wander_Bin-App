# 🦀 Wander-Bin — Smart Recycling Robot Web App

A mobile-first web prototype for the CRAB-E smart recycling robot, designed for HDB residents in Singapore. Built as a Wizard-of-Oz prototype for user testing.

## Features

- **Summon** — Browse nearby bots and request one to your location
- **En Route** — Animated robot approach with progress ring (12s simulation)
- **Scan** — Live rear camera feed with viewfinder overlay for item scanning
- **Result** — Recyclable → hand-wave → lid opens → disposal confirmation
- **Reject** — Not recyclable → locked lid → disposal guidance
- **Departure** — Robot returns to base animation
- **Audio/Haptic** — Sound chimes + vibration for all key interactions

## Tech Stack

- **React 18** + **Vite** — fast dev and build
- **Google Gemini AI** (`@google/generative-ai`) — image-based recyclable detection
- **CSS-in-JS** (inline styles) — no external CSS framework needed
- **Web Audio API** — synthesized sound effects
- **getUserMedia** — device camera access (requires HTTPS)
- **Vibration API** — haptic feedback on supported devices

## Quick Start

```bash
# Install dependencies
npm install

# Create a .env file with your Gemini API key (get one at https://aistudio.google.com/apikey)
cp .env.example .env
# Edit .env and replace your_gemini_api_key_here with your actual key

# Start dev server (with HTTPS for camera)
npm run dev

# Build for production
npm run build
```

## Deploy to GitHub Pages

The project uses **GitHub Actions** to automatically build and deploy on every push to `main`.

1. Go to **Settings → Pages → Source** and select **GitHub Actions**.
2. Add your Gemini API key as a repository secret named `VITE_GEMINI_API_KEY` under **Settings → Secrets and variables → Actions**.
3. Push to `main` — the workflow will build the app with your API key and deploy it automatically.

### Camera Access

✅ **GitHub Pages serves over HTTPS** — camera access (`getUserMedia`) works out of the box.

⚠️ For **local development**, Vite's dev server runs on `localhost` which browsers treat as a secure context, so camera also works locally.

## Project Structure

```
wanderbin/
├── index.html                  # Entry HTML
├── vite.config.js              # Vite config (set base for GH Pages)
├── package.json
└── src/
    ├── main.jsx                # React root
    ├── App.jsx                 # Screen router + state
    ├── styles/
    │   └── global.css          # Reset, keyframes, animations
    ├── utils/
    │   ├── colors.js           # CRAB-E color palette tokens
    │   ├── sounds.js           # Web Audio API chimes
    │   └── haptics.js          # Vibration API wrapper
    ├── services/
    │   └── gemini.js           # Google Gemini AI recyclable detection
    ├── components/
    │   ├── LEDFace.jsx         # Animated emoticon face (5 expressions)
    │   ├── CrabBot.jsx         # SVG crab robot illustration
    │   ├── BotCard.jsx         # Bot list item card
    │   ├── PulseDot.jsx        # Animated status dot
    │   ├── ProgressRing.jsx    # Circular progress indicator
    │   ├── ScanOverlay.jsx     # Camera viewfinder frame
    │   └── LidAnimation.jsx    # Bin lid open/close
    └── screens/
        ├── HomeScreen.jsx      # Bot list + summon CTA
        ├── EnRouteScreen.jsx   # Robot approaching animation
        ├── ScanScreen.jsx      # Camera + scan classification
        ├── RecyclableScreen.jsx    # ✅ Success flow
        ├── NotRecyclableScreen.jsx # ❌ Reject flow
        └── DepartureScreen.jsx     # Robot returns to base
```

## Notes

- **Scan results** use Google Gemini AI (`gemini-2.5-flash`) for item classification
- **Robot movement** is simulated (Wizard-of-Oz) — no real hardware communication
- **Camera**: Uses rear camera by default; falls back with clear error message if denied
- Tested on iOS Safari 15+ and Chrome Android 10+
