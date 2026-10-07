import React, { cloneElement, isValidElement } from 'react'

import BottomSheetHeader from './BottomSheetHeader'
import { getSafeAreaInset } from './safeArea'
import {
  BottomPositionParams,
  BottomSheetToolbarProps,
  BottomSpacerParams,
  MediumHeightParams,
  MinHeightParams,
  MinimizeAndCloseParams,
  TopPositionParams
} from './types'

export const ANIMATION_DURATION = 250

export const computeToolbarHeight = (
  toolbarProps: BottomSheetToolbarProps = {}
): number => {
  const { ref, height } = toolbarProps
  let toolbarHeight = 1

  if (height) {
    toolbarHeight = height
  } else if (ref?.current) {
    toolbarHeight = ref.current.offsetHeight
  }

  return toolbarHeight + getSafeAreaInset('top')
}

export const computeMaxHeight = (
  toolbarProps?: BottomSheetToolbarProps
): number => {
  return window.innerHeight - computeToolbarHeight(toolbarProps)
}

export const computeMediumHeight = ({
  backdrop,
  maxHeight,
  mediumHeight,
  mediumHeightRatio,
  innerContentHeight,
  bottomSpacerHeight,
  offset
}: MediumHeightParams): number => {
  const mediumHeightOrWithRatio =
    mediumHeight || Math.round(maxHeight * mediumHeightRatio)

  if (backdrop) {
    if (mediumHeightOrWithRatio < innerContentHeight) {
      return mediumHeightOrWithRatio < maxHeight
        ? mediumHeightOrWithRatio
        : maxHeight
    }
    return innerContentHeight > maxHeight
      ? maxHeight
      : innerContentHeight + bottomSpacerHeight
  }

  if (innerContentHeight < mediumHeightOrWithRatio) {
    return innerContentHeight + offset
  }
  return mediumHeightOrWithRatio > maxHeight
    ? maxHeight
    : mediumHeightOrWithRatio
}

export const computeMinHeight = ({
  isClosable,
  isOpenMin,
  headerRef,
  offset = 0,
  actionButtonsHeight,
  actionButtonsBottomMargin
}: MinHeightParams): number => {
  if (isClosable && !isOpenMin) return 0

  return (
    (headerRef.current?.offsetHeight ?? 0) +
    offset +
    actionButtonsHeight +
    actionButtonsBottomMargin +
    getSafeAreaInset('bottom')
  )
}

/** Gives the header child the ref the sheet measures it with */
export const makeOverriddenChildren = (
  children: React.ReactNode,
  headerContentRef: React.Ref<HTMLDivElement>
): React.ReactNode => {
  return React.Children.map(children, child =>
    isValidElement(child) && child.type === BottomSheetHeader
      ? cloneElement(
          child as React.ReactElement<React.RefAttributes<HTMLDivElement>>,
          {
            ref: headerContentRef
          }
        )
      : child
  )
}

export const setTopPosition = ({
  snapIndex,
  peekHeights,
  isTopPosition,
  setIsTopPosition
}: TopPositionParams): void => {
  const maxHeightSnapIndex = peekHeights.length - 1

  if (snapIndex > maxHeightSnapIndex) {
    setIsTopPosition(true)
  }
  if (snapIndex === maxHeightSnapIndex && !isTopPosition) {
    setIsTopPosition(true)
  }
  if (snapIndex < maxHeightSnapIndex && isTopPosition) {
    setIsTopPosition(false)
  }
}

export const setBottomPosition = ({
  snapIndex,
  isBottomPosition,
  setIsBottomPosition
}: BottomPositionParams): void => {
  if (snapIndex === 0 && !isBottomPosition) {
    setIsBottomPosition(true)
  }
  if (snapIndex !== 0 && isBottomPosition) {
    setIsBottomPosition(false)
  }
}

export const minimizeAndClose = ({
  backdrop,
  setCurrentIndex,
  setIsTopPosition,
  setIsBottomPosition,
  handleClose
}: MinimizeAndCloseParams): void => {
  if (backdrop) {
    setCurrentIndex(0)
    setIsTopPosition(false)
    setIsBottomPosition(true)
    setTimeout(handleClose, ANIMATION_DURATION)
  }
}

export const computeBottomSpacer = ({
  backdrop,
  maxHeight,
  innerContentHeight,
  toolbarProps,
  offset
}: BottomSpacerParams): number => {
  // Content taller than the available height
  if (maxHeight - innerContentHeight <= 0) {
    return offset + computeToolbarHeight(toolbarProps)
  }

  // Without backdrop, the sheet must be able to open up to the top of the window
  return backdrop ? offset : maxHeight - innerContentHeight
}

export const getCssValue = (
  element: Element | null,
  property: string
): number => {
  return element
    ? parseFloat(getComputedStyle(element).getPropertyValue(property))
    : 0
}
