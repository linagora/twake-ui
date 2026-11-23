import { cdp } from 'vitest/browser'

export const fontSizeOf = (element: Element): number =>
  parseFloat(getComputedStyle(element).fontSize)

export const setTouch = async (enabled: boolean): Promise<void> => {
  await cdp().send('Emulation.setTouchEmulationEnabled', {
    enabled,
    maxTouchPoints: 1
  })
}
