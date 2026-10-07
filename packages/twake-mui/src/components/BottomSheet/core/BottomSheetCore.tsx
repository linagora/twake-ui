/*
 * Adapted from mui-bottom-sheet
 * Copyright (c) 2020 Harley Alexander, MIT License
 */
import { animated, config, useSpring } from '@react-spring/web'
import type { SpringConfig } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import React, { useEffect, useRef } from 'react'
import useMeasure from 'react-use-measure'

import { computeClosestStop, computeNextStop, isNodeInside } from './helpers'

const HIDDEN_MARGIN = 30
const HORIZONTAL_DRAG_RATIO = 0.8

export type SnapPointSeekerMode = 'close' | 'next'

export interface BottomSheetCoreProps {
  /** Height of the sheet when closed, in px */
  defaultHeight?: number
  /** Intermediate heights the sheet stops at, in px */
  peekHeights?: number[] | null
  /** Allows the sheet to go full screen, otherwise it tops out at its content height */
  fullHeight?: boolean
  /** Index of the stop to move the sheet to, among `[defaultHeight, ...peekHeights, fullHeight]` */
  currentIndex?: number
  /** Called with the index of the stop the user moved the sheet to */
  onIndexChange?: (index: number) => void
  /** Moves the sheet off screen */
  hidden?: boolean
  /** Distance above the highest stop, in px, at which dragging up is cancelled */
  threshold?: number
  /** Prevents dragging the sheet below its lowest stop */
  disabledClosing?: boolean
  /** On release, snaps to the closest stop or to the next one in the drag direction */
  snapPointSeekerMode?: SnapPointSeekerMode
  springConfig?: SpringConfig
  skipAnimation?: boolean
  className?: string
  children?: React.ReactNode
}

export function BottomSheetCore({
  defaultHeight = 100,
  peekHeights = [],
  fullHeight = true,
  currentIndex,
  onIndexChange,
  hidden = false,
  threshold = 70,
  disabledClosing = false,
  snapPointSeekerMode = 'close',
  springConfig = config.stiff,
  skipAnimation = false,
  className,
  children
}: BottomSheetCoreProps): React.JSX.Element {
  const computeStopPosition = (height: number): number =>
    window.innerHeight - height

  const defaultPosition = computeStopPosition(defaultHeight)
  const stops = [defaultPosition]

  const [measureRef, { height }] = useMeasure()

  if (height > window.innerHeight && fullHeight) {
    stops.push(0)
  }

  if (height < window.innerHeight && height > defaultHeight) {
    stops.push(computeStopPosition(height))
  }

  peekHeights?.forEach(peekHeight => {
    const position = computeStopPosition(peekHeight)
    if (
      peekHeight < height &&
      peekHeight < window.innerHeight &&
      !stops.includes(position)
    ) {
      stops.push(position)
    }
  })

  // Positions grow from top to bottom while peek heights grow from bottom to top, so a descending
  // sort makes stop indexes match peek height indexes
  stops.sort((a, b) => b - a)

  const containerRef = useRef<HTMLDivElement>(null)
  const lastDirectionYRef = useRef(0)

  const [{ y }, api] = useSpring(() => ({ y: defaultPosition }))

  const bind = useDrag(
    ({
      last,
      cancel,
      offset: [, offsetY],
      delta: [deltaX, deltaY],
      direction: [, directionY],
      event
    }) => {
      event.stopPropagation()

      if (!isNodeInside(event.target, containerRef.current)) return

      if (
        Math.abs(deltaX) >
        HORIZONTAL_DRAG_RATIO * Math.hypot(deltaX, deltaY)
      ) {
        cancel()
      }

      if (containerRef.current?.scrollTop) return

      if (offsetY < 0 || offsetY < Math.min(...stops) - threshold) {
        cancel()
      }

      if (disabledClosing && offsetY > Math.max(...stops)) {
        cancel()
      }

      if (!last) {
        lastDirectionYRef.current = directionY
        void api.start({
          y: offsetY,
          config: { duration: 0 },
          immediate: skipAnimation
        })
        return
      }

      // The release event resets the direction when the pointer stood still, so the direction
      // of the last move decides which stop comes next
      const newPosition =
        snapPointSeekerMode === 'next'
          ? computeNextStop(offsetY, lastDirectionYRef.current, stops)
          : computeClosestStop(offsetY, stops)

      void api.start({
        y: newPosition,
        config: springConfig,
        immediate: skipAnimation
      })
      onIndexChange?.(stops.findIndex(stop => stop === newPosition))
    },
    {
      // Once the content is scrolled, starting from that negative offset makes the sheet follow
      // the pointer only after the content is back to its top
      from: (): [number, number] => [
        0,
        containerRef.current?.scrollTop
          ? -containerRef.current.scrollTop + Math.min(...stops)
          : y.goal
      ],
      bounds: { top: 0 },
      // Touch and mouse events let the content scroll natively, unlike pointer events
      pointer: { touch: true, mouse: true },
      // Arrow keys typed in the sheet content must not move the sheet
      keys: false
    }
  )

  useEffect(() => {
    void api.start({
      y: hidden ? window.innerHeight + HIDDEN_MARGIN : defaultPosition,
      config: config.gentle,
      immediate: skipAnimation
    })
  }, [hidden, api, defaultPosition, skipAnimation])

  // Stops are recomputed on every render, so this check runs after each one
  useEffect(() => {
    if (currentIndex !== undefined && y.goal !== stops[currentIndex]) {
      void api.start({
        y: stops[currentIndex],
        config: springConfig,
        immediate: skipAnimation
      })
    }
  })

  return (
    <animated.div
      {...bind()}
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        minHeight: defaultHeight,
        maxHeight: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        y,
        display: y.to(positionY =>
          positionY < window.innerHeight + HIDDEN_MARGIN ? 'block' : 'none'
        ),
        // Content only scrolls once the sheet reached its highest stop
        overflowY: y.to(positionY =>
          positionY > Math.min(...stops) ? 'hidden' : 'scroll'
        )
      }}
    >
      <div ref={measureRef}>{children}</div>
    </animated.div>
  )
}
