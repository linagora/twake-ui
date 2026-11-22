import { FabProps } from '@mui/material'
import { useForkRef } from '@mui/material/utils'
import React, {
  RefObject,
  forwardRef,
  useEffect,
  useRef,
  useState
} from 'react'

import { Icon, IconProps } from '@linagora/twake-icons'

import Label from './Label'
import UnshrinkableFab from './UnshrinkableFab'

export interface ScrollOptions {
  /** Time in ms without a scroll event after which the Fab unfolds */
  delay?: number
}

type Follow = Window | HTMLElement | RefObject<HTMLElement | null>

export interface ExtendableFabProps extends Omit<FabProps, 'ref' | 'children'> {
  label: string
  icon: IconProps['icon']
  /** What scrolls: the page (default), an element, or a ref to one. The content of an element is followed too. */
  follow?: Follow
  scrollOptions?: ScrollOptions
  /** @deprecated Ignored: the Fab folds while its content scrolls, wherever the scroll position is. */
  topLimit?: number
}

const PAGE = 'page'

/** The element followed, `PAGE` for the page, or null while a ref is empty */
const resolveFollow = (
  follow: Follow | undefined
): Element | typeof PAGE | null => {
  if (!follow || 'scrollY' in follow) return PAGE
  const element = 'current' in follow ? follow.current : follow
  if (!element) return null
  const { body, documentElement } = element.ownerDocument
  return element === body || element === documentElement ? PAGE : element
}

/** Whether a scroll fired at the target is one of what is followed */
const isScrollFollowed = (
  follow: Follow | undefined,
  target: EventTarget | null
): boolean => {
  const followed = resolveFollow(follow)
  const node = target as Node | null
  // The page scroll is fired at the document, or at the body when it scrolls on its own
  if (followed === PAGE)
    return (
      node?.nodeType === Node.DOCUMENT_NODE ||
      node === node?.ownerDocument?.body
    )
  return !!followed?.contains(node)
}

/** Whether a gesture over the target can scroll what is followed */
const isGestureFollowed = (
  follow: Follow | undefined,
  target: EventTarget | null
): boolean => {
  const followed = resolveFollow(follow)
  return followed === PAGE || !!followed?.contains(target as Node | null)
}

/** The keys that scroll the box under the focus */
const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' '
])

/** Whether the focused element takes the key instead of scrolling with it */
const isKeyTakenByTarget = (event: KeyboardEvent): boolean => {
  const element = event.target as HTMLElement
  // A keydown fired at the document itself
  if (typeof element.closest !== 'function') return false
  if (element.isContentEditable || element.closest('input, textarea, select'))
    return true
  return event.key === ' ' && !!element.closest('button, [role="button"]')
}

/** Time in ms after a gesture during which a scroll is the user's */
const GESTURE_VALIDITY_MS = 250

interface UseIsScrollingOptions {
  buttonRef: RefObject<HTMLButtonElement | null>
  follow?: Follow
  delay?: number
}

/**
 * Whether the user scrolls what is followed: a scroll counts when it follows
 * a gesture (wheel, finger, scroll key, pointer held as on a scrollbar) or
 * goes on a fold (momentum). A list that scrolls itself back to where it was
 * is not the user scrolling.
 */
const useIsScrolling = ({
  buttonRef,
  follow,
  delay = 250
}: UseIsScrollingOptions): boolean => {
  const [isScrolling, setIsScrolling] = useState(false)
  const followRef = useRef(follow)
  useEffect(() => {
    followRef.current = follow
  })

  useEffect(() => {
    const doc = buttonRef.current?.ownerDocument ?? document
    let isFolded = false
    let isPointerDown = false
    let isAfterGesture = false
    let gesture: ReturnType<typeof setTimeout> | undefined
    const startGestureWindow = (): void => {
      isAfterGesture = true
      clearTimeout(gesture)
      gesture = setTimeout(() => {
        isAfterGesture = false
      }, GESTURE_VALIDITY_MS)
    }
    const handleGesture = (event: Event): void => {
      if (isGestureFollowed(followRef.current, event.target))
        startGestureWindow()
    }
    // Keys stay document-wide: with the focus on the body, the browser
    // scrolls the box clicked last
    const handleKey = (event: KeyboardEvent): void => {
      if (isKeyTakenByTarget(event)) return
      if (SCROLL_KEYS.has(event.key)) startGestureWindow()
    }
    const handlePointerDown = (event: Event): void => {
      isPointerDown = isGestureFollowed(followRef.current, event.target)
    }
    const handlePointerUp = (): void => {
      isPointerDown = false
    }
    let timer: ReturnType<typeof setTimeout> | undefined
    const handleScroll = (event: Event): void => {
      if (!isFolded && !isAfterGesture && !isPointerDown) return
      if (!isScrollFollowed(followRef.current, event.target)) return
      isFolded = true
      setIsScrolling(true)
      clearTimeout(timer)
      timer = setTimeout(() => {
        isFolded = false
        setIsScrolling(false)
      }, delay)
    }
    // Scroll events do not bubble: the capture phase sees those of every scrolling box.
    // Listening to the document rather than to the followed element keeps up with a ref filled or replaced later.
    const options = { capture: true, passive: true }
    const listeners: [string, (event: Event) => void][] = [
      ['wheel', handleGesture],
      ['touchmove', handleGesture],
      ['keydown', handleKey as (event: Event) => void],
      ['pointerdown', handlePointerDown],
      ['pointerup', handlePointerUp],
      ['pointercancel', handlePointerUp],
      ['scroll', handleScroll]
    ]
    for (const [type, listener] of listeners)
      doc.addEventListener(type, listener, options)
    return (): void => {
      for (const [type, listener] of listeners)
        doc.removeEventListener(type, listener, options)
      clearTimeout(gesture)
      clearTimeout(timer)
      setIsScrolling(false)
    }
  }, [buttonRef, delay])

  return isScrolling
}

const ExtendableFab = forwardRef<HTMLButtonElement, ExtendableFabProps>(
  (
    { label, icon, follow, scrollOptions, topLimit: _topLimit, ...props },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const handleRef = useForkRef(ref, buttonRef)
    const isFolded = useIsScrolling({
      buttonRef,
      follow,
      delay: scrollOptions?.delay
    })

    return (
      <UnshrinkableFab
        ref={handleRef}
        aria-label={label}
        variant="extended"
        {...props}
      >
        <Icon icon={icon} aria-hidden />
        <Label isFolded={isFolded}>
          <span>{label}</span>
        </Label>
      </UnshrinkableFab>
    )
  }
)

ExtendableFab.displayName = 'ExtendableFab'

export default ExtendableFab
