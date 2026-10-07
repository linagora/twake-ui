import { Backdrop, Portal } from '@mui/material'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useMutationObserver, useTimeoutWhen } from 'rooks'

import {
  ANIMATION_DURATION,
  computeBottomSpacer,
  computeMaxHeight,
  computeMediumHeight,
  computeMinHeight,
  getCssValue,
  makeOverriddenChildren,
  minimizeAndClose,
  setBottomPosition,
  setTopPosition
} from './helpers'
import {
  BORDER_RADIUS,
  BottomSheetBounceSafer,
  BottomSheetContainer,
  BottomSheetHandleBar,
  BottomSheetIndicator,
  BottomSheetOffsetSafer,
  BottomSheetRenderSafer,
  BottomSheetRenderSaferFill,
  BottomSheetRoot,
  BottomSheetSpacer,
  BottomSheetStack
} from './styles'
import {
  BottomSheetContentProps,
  BottomSheetProps,
  BottomSheetToolbarProps
} from './types'

/** Shared default, so that effects depending on it do not run on every render */
const NO_TOOLBAR_PROPS: BottomSheetToolbarProps = {}
const DEFAULT_MEDIUM_HEIGHT_RATIO = 0.75
const SPRING_CONFIG = { tension: 165, friction: 17, clamp: true }

const BottomSheetContent = memo(function BottomSheetContent({
  toolbarProps = NO_TOOLBAR_PROPS,
  settings,
  backdrop = false,
  skipAnimation,
  onClose,
  offset = 0,
  children
}: BottomSheetContentProps): React.JSX.Element {
  const mediumHeight = settings?.mediumHeight ?? null
  const mediumHeightRatio =
    settings?.mediumHeightRatio ?? DEFAULT_MEDIUM_HEIGHT_RATIO
  const isOpenMin = settings?.isOpenMin ?? false
  const hasMinHeightOffset = settings?.hasMinHeightOffset ?? false

  const innerContentRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const headerContentRef = useRef<HTMLDivElement | null>(null)
  const [isTopPosition, setIsTopPosition] = useState(false)
  const [isBottomPosition, setIsBottomPosition] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [showBackdrop, setShowBackdrop] = useState(backdrop)
  const [peekHeights, setPeekHeights] = useState<number[] | null>(null)
  // Starts at the medium stop, the one the initial position is computed from
  const [currentIndex, setCurrentIndex] = useState(1)
  const [bottomSpacerHeight, setBottomSpacerHeight] = useState(0)
  const [initPos, setInitPos] = useState(0)
  const prevInitPos = useRef(0)
  const [forceRender, setForceRender] = useState(0)

  const hasToolbarProps = Object.keys(toolbarProps).length > 0
  const isClosable = !!onClose || backdrop
  const renderSaferHeight =
    initPos < prevInitPos.current ? prevInitPos.current - BORDER_RADIUS : 0
  const showRenderSafer =
    prevInitPos.current !== 0 && prevInitPos.current > initPos

  const overriddenChildren = makeOverriddenChildren(children, headerContentRef)

  if (backdrop && !onClose) {
    throw new Error(
      'BottomSheet must have `onClose` method to work properly when setting `backdrop` to `true`'
    )
  }

  const handleClose = useCallback(() => {
    setShowBackdrop(false)
    setIsHidden(true)
    onClose?.()
  }, [onClose])

  const handleIndexChange = (snapIndex: number): void => {
    setCurrentIndex(snapIndex)
    setTopPosition({
      snapIndex,
      peekHeights: peekHeights ?? [],
      isTopPosition,
      setIsTopPosition
    })
    setBottomPosition({ snapIndex, isBottomPosition, setIsBottomPosition })
  }

  const handleBackdropClick = (): void => {
    minimizeAndClose({
      backdrop,
      setCurrentIndex,
      setIsTopPosition,
      setIsBottomPosition,
      handleClose
    })
  }

  // Recomputes the stops when the content changes, after loading or navigating inside it
  useMutationObserver(innerContentRef, () => {
    setForceRender(value => value + 1)
  })

  // Prevents the pull-to-refresh of iOS Safari while dragging the sheet down
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return (): void => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useTimeoutWhen(
    () => handleClose(),
    ANIMATION_DURATION,
    isClosable && isBottomPosition
  )

  useEffect(() => {
    const headerContent = headerContentRef.current
    const innerContentHeight = innerContentRef.current?.offsetHeight ?? 0
    const actionButtonsHeight = getCssValue(headerContent, 'height')
    const actionButtonsBottomMargin = getCssValue(
      headerContent,
      'padding-bottom'
    )

    const maxHeight = computeMaxHeight(toolbarProps)

    const newBottomSpacerHeight = computeBottomSpacer({
      backdrop,
      maxHeight,
      innerContentHeight,
      toolbarProps,
      offset
    })
    const minHeight = computeMinHeight({
      isClosable,
      isOpenMin,
      headerRef,
      offset: hasMinHeightOffset ? offset : 0,
      actionButtonsHeight,
      actionButtonsBottomMargin
    })
    const computedMediumHeight =
      isOpenMin && actionButtonsHeight > 0
        ? minHeight + 1
        : computeMediumHeight({
            backdrop,
            maxHeight,
            mediumHeight,
            mediumHeightRatio,
            innerContentHeight,
            bottomSpacerHeight: newBottomSpacerHeight,
            offset
          })

    const newPeekHeights = [
      ...new Set([minHeight, computedMediumHeight, maxHeight])
    ]

    const hasPeekHeightsChanged =
      peekHeights?.toString() !== newPeekHeights.toString()

    // Lowers the sheet when its stops change while it is at the top
    const snapIndex =
      hasPeekHeightsChanged && isTopPosition
        ? currentIndex - 1 - (currentIndex - (newPeekHeights.length - 1))
        : currentIndex

    setCurrentIndex(snapIndex)
    setPeekHeights(newPeekHeights)
    prevInitPos.current = initPos
    setInitPos(computedMediumHeight)
    setTopPosition({
      snapIndex,
      peekHeights: newPeekHeights,
      isTopPosition,
      setIsTopPosition
    })
    // Lets the sheet open up to the top without stopping at the content height
    setBottomSpacerHeight(newBottomSpacerHeight)

    // initPos is left out on purpose: the effect needs its previous value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    innerContentRef,
    toolbarProps,
    mediumHeightRatio,
    mediumHeight,
    showBackdrop,
    backdrop,
    isClosable,
    offset,
    forceRender
  ])

  const content = (
    <>
      {showBackdrop && <Backdrop open onClick={handleBackdropClick} />}
      <BottomSheetRoot
        isTopPosition={isTopPosition}
        hasToolbar={hasToolbarProps}
        peekHeights={peekHeights}
        defaultHeight={initPos}
        fullHeight={!hasToolbarProps}
        currentIndex={currentIndex}
        onIndexChange={handleIndexChange}
        threshold={0}
        springConfig={SPRING_CONFIG}
        disabledClosing={!onClose}
        hidden={isHidden}
        snapPointSeekerMode="next"
        skipAnimation={skipAnimation}
      >
        <div ref={innerContentRef}>
          <BottomSheetHandleBar
            data-testid="bottomSheet-header"
            ref={headerRef}
            elevation={0}
            square
          >
            <BottomSheetIndicator />
          </BottomSheetHandleBar>
          <BottomSheetStack spacing={1.5}>
            {overriddenChildren}
          </BottomSheetStack>
        </div>
        <BottomSheetSpacer spacerHeight={bottomSpacerHeight} />
      </BottomSheetRoot>
      {showRenderSafer && (
        <BottomSheetRenderSafer saferHeight={renderSaferHeight}>
          <BottomSheetRenderSaferFill elevation={0} square />
        </BottomSheetRenderSafer>
      )}
      {!isBottomPosition && <BottomSheetBounceSafer />}
      {Boolean(offset) && (
        <BottomSheetOffsetSafer
          offset={offset}
          isBottomPosition={isBottomPosition}
        />
      )}
    </>
  )

  return showBackdrop ? (
    <BottomSheetContainer>{content}</BottomSheetContainer>
  ) : (
    content
  )
})

/**
 * Panel coming up from the bottom of the screen, that the user can drag between a minimum, a
 * medium and a full height. Rendered in a portal, like dialogs.
 */
const BottomSheet = ({
  portalProps,
  ...props
}: BottomSheetProps): React.JSX.Element => (
  <Portal {...portalProps}>
    <BottomSheetContent {...props} />
  </Portal>
)

export default BottomSheet
