// src/services/esp32.js

function getESP32Url() {
  const url = import.meta.env.VITE_ESP32_URL
  if (!url) {
    console.warn(
      'VITE_ESP32_URL is not set. Falling back to http://localhost:3001. ' +
        'Set it in your .env file for local dev or as a GitHub secret for deployment.'
    )
    return 'http://localhost:3001'
  }
  return url
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
    const response = await fetch(`${getESP32Url()}/lid-control`, {
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
    const response = await fetch(`${getESP32Url()}/status`, {
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
