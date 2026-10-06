import { SafeAreaSide } from './types'

/** Returns the device safe area inset (notch, home indicator), in px */
export function getSafeAreaInset(side: SafeAreaSide): number {
  // env() is only resolved through a style, so a probe element reads it
  const probe = document.createElement('div')
  probe.style.paddingTop = `env(safe-area-inset-${side})`
  document.body.appendChild(probe)
  const inset = parseFloat(getComputedStyle(probe).paddingTop) || 0
  probe.remove()

  return inset
}
