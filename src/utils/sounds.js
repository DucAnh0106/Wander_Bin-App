/**
 * Audio feedback using the Web Audio API
 * Plays short synthesized chimes for each app event
 */

export function playChime(type = 'success') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.value = 0.12

    switch (type) {
      case 'success': {
        osc.frequency.value = 523
        osc.start()
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1)
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2)
        gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.3)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
        osc.stop(ctx.currentTime + 0.6)
        break
      }
      case 'fail': {
        osc.frequency.value = 392
        osc.start()
        osc.frequency.setValueAtTime(349, ctx.currentTime + 0.15)
        osc.frequency.setValueAtTime(311, ctx.currentTime + 0.3)
        gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.35)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7)
        osc.stop(ctx.currentTime + 0.7)
        break
      }
      case 'arrive': {
        osc.frequency.value = 440
        osc.type = 'triangle'
        osc.start()
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.08)
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.16)
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.24)
        gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.32)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
        osc.stop(ctx.currentTime + 0.6)
        break
      }
      case 'scan': {
        osc.frequency.value = 800
        osc.type = 'sine'
        osc.start()
        osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.05)
        osc.frequency.setValueAtTime(800, ctx.currentTime + 0.1)
        gain.gain.setValueAtTime(0.06, ctx.currentTime + 0.12)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
        osc.stop(ctx.currentTime + 0.25)
        break
      }
      case 'depart': {
        osc.frequency.value = 659
        osc.type = 'triangle'
        osc.start()
        osc.frequency.setValueAtTime(523, ctx.currentTime + 0.15)
        osc.frequency.setValueAtTime(392, ctx.currentTime + 0.3)
        gain.gain.setValueAtTime(0.08, ctx.currentTime + 0.35)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7)
        osc.stop(ctx.currentTime + 0.7)
        break
      }
      default:
        osc.stop()
    }
  } catch (e) {
    // Silently fail — audio is non-critical
  }
}
