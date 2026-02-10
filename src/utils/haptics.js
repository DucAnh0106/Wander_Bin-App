/**
 * Haptic feedback via the Vibration API
 * Gracefully degrades on unsupported devices
 * @param {number|number[]} pattern - Duration in ms or pattern array
 */
export function vibrate(pattern = 30) {
  try {
    navigator?.vibrate?.(pattern)
  } catch {
    // Vibration API not supported — no-op
  }
}
