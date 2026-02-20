// src/services/esp32.js

let _cachedUrl = null

async function getESP32Url() {
  if (_cachedUrl) return _cachedUrl

  // Try loading the runtime config (generated during CI from GitHub secrets).
  // This file is fetched fresh on every page load to pick up secret changes
  // without relying on Vite's build-time env injection.
  try {
    const base = import.meta.env.BASE_URL || '/'
    const response = await fetch(`${base}env-config.json?v=${Date.now()}`)
    if (response.ok) {
      const config = await response.json()
      if (config.VITE_ESP32_URL) {
        console.log('[ESP32] Using runtime config URL:', config.VITE_ESP32_URL)
        _cachedUrl = config.VITE_ESP32_URL
        return _cachedUrl
      }
    }
  } catch (e) {
    console.warn('[ESP32] Could not load runtime config:', e.message)
  }

  // Fallback to build-time env var (for local development with .env file)
  const url = import.meta.env.VITE_ESP32_URL
  if (url) {
    console.log('[ESP32] Using build-time env URL:', url)
    _cachedUrl = url
    return _cachedUrl
  }

  console.warn(
    '[ESP32] VITE_ESP32_URL is not set. Falling back to http://localhost:3001. ' +
      'Set it in your .env file for local dev or as a GitHub secret for deployment.'
  )
  _cachedUrl = 'http://localhost:3001'
  return _cachedUrl
}

/**
 * Sends a command to the ESP32 to allow or disallow the lid to open
 * @param {boolean} isRecyclable - Whether the item is recyclable
 * @param {string} itemName - Name of the scanned item
 * @param {string} reason - Reason for recyclability decision
 * @returns {Promise<Object|null>} Response data or null on error
 */
export async function sendLidCommand(isRecyclable, itemName, reason) {
  try {
    const esp32Url = await getESP32Url()
    const url = `${esp32Url}/lid-control`
    const payload = JSON.stringify({
      allowOpen: isRecyclable,
      itemName,
      reason,
    })

    console.log('[ESP32] Sending lid command to:', url)

    // Use text/plain to avoid CORS preflight (OPTIONS request) which most
    // ESP32 / simple HTTP servers do not handle.  The body is still JSON —
    // the server just needs to parse it from a text/plain content-type.
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: payload,
    })

    if (!response.ok) {
      console.warn(`[ESP32] lid-control returned status ${response.status}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.warn('[ESP32] lid-control failed:', error.message)
    if (error instanceof TypeError) {
      console.warn(
        '[ESP32] This is likely a network/CORS error. If deploying on HTTPS (e.g. GitHub Pages), ' +
          'make sure your ESP32 URL also uses HTTPS (e.g. via ngrok or Cloudflare Tunnel).'
      )
    }
    return null
  }
}

/**
 * Gets the current status of the ESP32
 * @returns {Promise<Object|null>} Status data or null on error
 */
export async function getESP32Status() {
  try {
    const esp32Url = await getESP32Url()
    const response = await fetch(`${esp32Url}/status`, {
      method: 'GET',
    })

    if (!response.ok) {
      console.warn(`[ESP32] status returned status ${response.status}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.warn('[ESP32] status failed (server may be offline):', error.message)
    return null
  }
}
