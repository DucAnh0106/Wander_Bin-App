// src/services/esp32.js

let _cachedUrl = null

async function getESP32Url() {
  if (_cachedUrl !== null) return _cachedUrl

  // Try loading the runtime config (generated during CI from GitHub secrets).
  // This file is fetched fresh on every page load to pick up secret changes
  // without relying on Vite's build-time env injection.
  try {
    const base = import.meta.env.BASE_URL || '/'
    const response = await fetch(`${base}env-config.json?v=${Date.now()}`)
    if (response.ok) {
      const config = await response.json()
      if (config.VITE_ESP32_URL) {
        _cachedUrl = config.VITE_ESP32_URL
        return _cachedUrl
      }
    }
  } catch (e) {
    console.warn('Could not load runtime config:', e.message)
  }

  // Fallback to build-time env var (for local development with .env file)
  const url = import.meta.env.VITE_ESP32_URL
  if (url) {
    _cachedUrl = url
    return _cachedUrl
  }

  console.warn(
    'VITE_ESP32_URL is not set. Falling back to http://localhost:3001. ' +
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
    const response = await fetch(`${esp32Url}/lid-control`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        allowOpen: isRecyclable,
        itemName,
        reason,
      }),
    })

    if (!response.ok) {
      console.warn(`ESP32 lid-control returned status ${response.status}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.warn('ESP32 lid-control failed (server may be offline):', error.message)
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
      console.warn(`ESP32 status returned status ${response.status}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.warn('ESP32 status failed (server may be offline):', error.message)
    return null
  }
}
