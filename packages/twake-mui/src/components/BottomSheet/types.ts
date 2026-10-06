import { PortalProps } from '@mui/material'
import React, { RefObject } from 'react'

export type SafeAreaSide = 'top' | 'bottom'

export interface BottomSheetToolbarProps {
  /** Ref of the toolbar the sheet must stay under when fully open */
  ref?: RefObject<HTMLElement | null>
  /** Height of that toolbar, in px, used instead of measuring `ref` */
  height?: number
}

export interface BottomSheetSettings {
  /** Height of the middle stop, in px */
  mediumHeight?: number | null
  /** Height of the middle stop, as a ratio of the available height */
  mediumHeightRatio?: number
  /** Includes the offset in the minimum height */
  hasMinHeightOffset?: boolean
  /** Opens the sheet at its minimum height, when it has a header */
  isOpenMin?: boolean
}

export interface BottomSheetProps {
  /** Toolbar the sheet must stay under when fully open */
  toolbarProps?: BottomSheetToolbarProps
  settings?: BottomSheetSettings
  /** Adds a backdrop, which requires `onClose` */
  backdrop?: boolean
  /** Removes animations */
  skipAnimation?: boolean
  /** Space kept at the bottom of the sheet, in px */
  offset?: number
  /** Lets the user close the sheet by swiping it down */
  onClose?: () => void
  portalProps?: Omit<PortalProps, 'children'>
  children?: React.ReactNode
}

export type BottomSheetContentProps = Omit<BottomSheetProps, 'portalProps'>

export interface MediumHeightParams {
  backdrop: boolean
  maxHeight: number
  mediumHeight?: number | null
  mediumHeightRatio: number
  innerContentHeight: number
  bottomSpacerHeight: number
  offset: number
}

export interface MinHeightParams {
  isClosable: boolean
  isOpenMin: boolean
  headerRef: RefObject<HTMLElement | null>
  offset?: number
  actionButtonsHeight: number
  actionButtonsBottomMargin: number
}

export interface TopPositionParams {
  snapIndex: number
  peekHeights: number[]
  isTopPosition: boolean
  setIsTopPosition: (isTopPosition: boolean) => void
}

export interface BottomPositionParams {
  snapIndex: number
  isBottomPosition: boolean
  setIsBottomPosition: (isBottomPosition: boolean) => void
}

export interface MinimizeAndCloseParams {
  backdrop: boolean
  setCurrentIndex: (index: number) => void
  setIsTopPosition: (isTopPosition: boolean) => void
  setIsBottomPosition: (isBottomPosition: boolean) => void
  handleClose: () => void
}

export interface BottomSpacerParams {
  backdrop: boolean
  maxHeight: number
  innerContentHeight: number
  toolbarProps?: BottomSheetToolbarProps
  offset: number
}
