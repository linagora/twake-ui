import type { MenuProps, PopoverActions } from '@mui/material'
import { setRef, useForkRef } from '@mui/material/utils'
import React, { useCallback, useRef } from 'react'

type PaperSlot = NonNullable<MenuProps['slotProps']>['paper']
type PaperSlotProps = Exclude<PaperSlot, (...args: never[]) => unknown>

/**
 * Places a popover again whenever its paper changes size: MUI places it when
 * it opens or renders, so content that grows afterwards without a render (a
 * page translated by the browser) would push it past the edge of the screen
 */
export const usePositionOnResize = (
  action: React.Ref<PopoverActions> | undefined,
  paperSlot: PaperSlot
): {
  action: React.Ref<PopoverActions>
  paperSlot: PaperSlot
} => {
  const actionsRef = useRef<PopoverActions | null>(null)
  const observerRef = useRef<ResizeObserver | null>(null)
  const paperRefOfCaller = useRef<React.Ref<HTMLElement> | undefined>(undefined)
  const handleAction = useForkRef(actionsRef, action)

  // Stable, so that a render neither drops nor restarts the observer; React
  // calls it with null on unmount, which disconnects the observer
  const handlePaper = useCallback((paper: HTMLElement | null): void => {
    setRef(paperRefOfCaller.current, paper)
    observerRef.current?.disconnect()
    observerRef.current = null
    if (paper === null || typeof ResizeObserver === 'undefined') return
    observerRef.current = new ResizeObserver(() => {
      actionsRef.current?.updatePosition()
    })
    observerRef.current.observe(paper)
  }, [])

  const withObserver = (slot: PaperSlotProps): PaperSlotProps => {
    // The paper is an element: the slot types its ref for any paper component
    paperRefOfCaller.current = slot?.ref as React.Ref<HTMLElement> | undefined
    return { ...slot, ref: handlePaper }
  }

  return {
    action: handleAction,
    paperSlot:
      typeof paperSlot === 'function'
        ? (ownerState): PaperSlotProps => withObserver(paperSlot(ownerState))
        : withObserver(paperSlot)
  }
}
