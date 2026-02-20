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

- **React 18** + **Vite 5** — fast dev and build
- **Google Gemini AI** (`@google/generative-ai`) — image-based recyclable detection
- **ESP32 integration** — lid control commands over HTTP (optional hardware)
- **CSS-in-JS** (inline styles) — no external CSS framework needed
- **Web Audio API** — synthesized sound effects
- **getUserMedia** — device camera access (requires a secure context: HTTPS or `localhost`)
- **Vibration API** — haptic feedback on supported devices

## Prerequisites

- **Node.js 18+** (tested with Node 20) — [download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** — [download](https://git-scm.com/)
- A **Google Gemini API key** — [get one free](https://aistudio.google.com/apikey)

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/DucAnh0106/Wander_Bin-App.git
cd Wander_Bin-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open the `.env` file and fill in your values:

```dotenv
# Required — your Gemini API key for AI-powered scan results
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional — URL of the ESP32 lid-control server (defaults to http://localhost:3001)
VITE_ESP32_URL=http://localhost:3001
```

> **Note:** The app works without an ESP32 server — lid commands will simply log a warning to the console if the server is unreachable.

### 4. Start the development server

```bash
npm run dev
```

Then open the URL shown in the terminal. Because `vite.config.js` sets `base: '/Wander_Bin-App/'` (for GitHub Pages), the local dev URL will be:

```
http://localhost:5173/Wander_Bin-App/
```

> **Camera access:** Browsers treat `localhost` as a secure context, so camera (`getUserMedia`) works without HTTPS during local development.

### 5. Build for production (optional)

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Deploy to GitHub Pages

The project uses **GitHub Actions** to automatically build and deploy on every push to `main`.

1. Go to **Settings → Pages → Source** and select **GitHub Actions**.
2. Add your Gemini API key as a repository secret named `VITE_GEMINI_API_KEY` under **Settings → Secrets and variables → Actions**.
3. Add your ESP32 server URL as a repository secret named `VITE_ESP32_URL` under **Settings → Secrets and variables → Actions**.
4. Push to `main` — the workflow will build the app with your API key and deploy it automatically.

> **Updating the ESP32 URL:** Whenever you change the `VITE_ESP32_URL` secret, go to **Actions → Deploy to GitHub Pages → Run workflow** to redeploy. The app reads the URL from a runtime config file (`env-config.json`), so every page load picks up the latest URL without any code changes.
>
> **⚠️ HTTPS required:** GitHub Pages is served over HTTPS. Browsers block requests from HTTPS pages to plain HTTP servers (mixed content). Make sure your ESP32 URL uses **HTTPS** — for example, expose it via [ngrok](https://ngrok.com/) (`https://xxxx.ngrok-free.app`) or a Cloudflare Tunnel.

### Camera Access

✅ **GitHub Pages serves over HTTPS** — camera access (`getUserMedia`) works out of the box.

⚠️ For **local development**, Vite's dev server runs on `localhost` which browsers treat as a secure context, so camera also works locally.

## Project Structure

```
Wander_Bin-App/
├── index.html                  # Entry HTML
├── vite.config.js              # Vite config (base path set for GitHub Pages)
├── package.json
├── .env.example                # Template for environment variables
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
    │   ├── gemini.js           # Google Gemini AI recyclable detection
    │   └── esp32.js            # ESP32 lid-control HTTP client
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

## Troubleshooting

| Problem | Solution |
|---|---|
| `npm install` fails | Make sure you have Node.js 18+ installed (`node -v` to check) |
| App shows blank page at `localhost:5173` | Navigate to `localhost:5173/Wander_Bin-App/` instead (note the trailing slash) |
| Camera not working | Make sure you're on `localhost` or HTTPS; check browser permissions |
| Scan returns no results | Verify `VITE_GEMINI_API_KEY` is set correctly in your `.env` file |
| ESP32 warnings in console | This is normal if you don't have an ESP32 server running — the app still works |
| ESP32 requests not reaching server | Open browser DevTools → Console and look for `[ESP32]` logs. Verify the URL is correct. If deploying on GitHub Pages, the ESP32 URL **must** be HTTPS (use ngrok or similar). |
| `[ESP32] lid-control failed: Failed to fetch` | Mixed-content or CORS error — make sure the ESP32 URL is HTTPS and the server allows cross-origin requests. |

## Notes

- **Scan results** use Google Gemini AI (`gemini-2.5-flash`) for item classification
- **Robot movement** is simulated (Wizard-of-Oz) — no real hardware communication
- **Camera**: Uses rear camera by default; falls back with clear error message if denied
- Tested on iOS Safari 15+ and Chrome Android 10+
