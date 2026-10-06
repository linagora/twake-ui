/*
 * Snap point helpers adapted from mui-bottom-sheet
 * Copyright (c) 2020 Harley Alexander, MIT License
 */

export function computeClosestStop(goal: number, stops: number[]): number {
  return stops.reduce((prev, stop) =>
    Math.abs(stop - goal) < Math.abs(prev - goal) ? stop : prev
  )
}

/**
 * Finds the stop following `goal` in the drag direction: a higher value for a positive direction,
 * a lower or equal one otherwise. A found `0` stop (full screen) falls back to the last stop like
 * a miss: `||` is kept over `??` to preserve that snapping.
 */
export function computeNextStop(
  goal: number,
  direction: number,
  stops: number[]
): number {
  if (direction > 0) {
    const ascStops = [...stops].sort((a, b) => a - b)
    return ascStops.find(stop => stop >= goal) || ascStops[ascStops.length - 1]
  }

  const descStops = [...stops].sort((a, b) => b - a)
  return descStops.find(stop => stop <= goal) || descStops[descStops.length - 1]
}

export function isNodeInside(
  node: EventTarget | null,
  container: Node | null
): boolean {
  let current = node instanceof Node ? node : null

  while (current?.parentNode) {
    if (current === container) return true
    current = current.parentNode
  }

  return false
}
