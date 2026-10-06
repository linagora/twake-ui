import { describe, expect, it } from 'vitest'

import { computeClosestStop, computeNextStop } from './helpers'

const stops = [900, 700, 500, 50]

describe('computeClosestStop', () => {
  it('should get the closest stop', () => {
    expect(computeClosestStop(620, stops)).toBe(700)
    expect(computeClosestStop(580, stops)).toBe(500)
  })
})

describe('computeNextStop', () => {
  it('should get next stop for positive direction', () => {
    expect(computeNextStop(600, 1, stops)).toBe(700)
  })

  it('should get previous stop for negative direction', () => {
    expect(computeNextStop(600, -1, stops)).toBe(500)
  })

  it('should get extreme stop for move beyond', () => {
    expect(computeNextStop(950, 1, stops)).toBe(900)
    expect(computeNextStop(0, -1, stops)).toBe(50)
  })

  it('should get same stop if no move', () => {
    expect(computeNextStop(700, 0, stops)).toBe(700)
    expect(computeNextStop(50, 0, stops)).toBe(50)
  })
})
