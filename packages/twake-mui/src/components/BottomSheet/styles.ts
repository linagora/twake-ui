import { Paper, Stack } from '@mui/material'
import { keyframes, styled, Theme } from '@mui/material/styles'

import { BottomSheetCore } from './core/BottomSheetCore'
import { ANIMATION_DURATION } from './helpers'

export const BORDER_RADIUS = 16
const BOUNCE_SAFER_HEIGHT = 50

const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
const collapse = keyframes({ from: { height: '100%' }, to: { height: 0 } })

export const BottomSheetContainer = styled('div')(
  ({ theme }: { theme: Theme }) => ({
    position: 'fixed',
    zIndex: theme.zIndex.modal,
    inset: 0
  })
)

export const BottomSheetRoot = styled(BottomSheetCore, {
  shouldForwardProp: prop => prop !== 'isTopPosition' && prop !== 'hasToolbar'
})<{ isTopPosition: boolean; hasToolbar: boolean }>(
  ({ theme }: { theme: Theme }) => ({
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    transition: 'border-radius 0.5s',
    boxShadow:
      '0 -0.5px 0px 0 rgba(0, 0, 0, 0.10), 0 -2px 2px 0 rgba(0, 0, 0, 0.02), 0 -4px 4px 0 rgba(0, 0, 0, 0.02), 0 -8px 8px 0 rgba(0, 0, 0, 0.02), 0 -16px 16px 0 rgba(0, 0, 0, 0.02)',
    backgroundColor: theme.vars.palette.background.paper,
    zIndex: theme.zIndex.modal,
    variants: [
      {
        props: { isTopPosition: true },
        style: {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          boxShadow: '0 -1px 0 0 rgba(255, 255, 255, 1)'
        }
      },
      {
        props: { isTopPosition: true, hasToolbar: true },
        style: { boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.5)' }
      }
    ]
  })
)

export const BottomSheetHandleBar = styled(Paper)({
  width: '100%',
  height: '3rem',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const BottomSheetIndicator = styled('div')(
  ({ theme }: { theme: Theme }) => ({
    width: '4rem',
    height: '0.25rem',
    borderRadius: 99,
    backgroundColor: theme.vars.palette.text.secondary
  })
)

export const BottomSheetStack = styled(Stack)(
  ({ theme }: { theme: Theme }) => ({
    overflow: 'hidden',
    backgroundColor: theme.vars.palette.background.default
  })
)

export const BottomSheetSpacer = styled('div', {
  shouldForwardProp: prop => prop !== 'spacerHeight'
})<{ spacerHeight: number }>(({ spacerHeight }) => ({ height: spacerHeight }))

/** Covers the screen bottom while the sheet bounces up */
export const BottomSheetBounceSafer = styled('div')(
  ({ theme }: { theme: Theme }) => ({
    height: BOUNCE_SAFER_HEIGHT,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    backgroundColor: theme.vars.palette.background.paper,
    animation: `${fadeIn} ${ANIMATION_DURATION}ms ${theme.transitions.easing.easeInOut}`
  })
)

/** Covers the offset area below the sheet */
export const BottomSheetOffsetSafer = styled('div', {
  shouldForwardProp: prop => prop !== 'offset' && prop !== 'isBottomPosition'
})<{ offset: number; isBottomPosition: boolean }>(
  ({ theme, offset, isBottomPosition }) => ({
    opacity: isBottomPosition ? 0 : 1,
    height: offset,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    backgroundColor: theme.vars.palette.background.paper,
    zIndex: theme.zIndex.modal + 10,
    transition: `opacity ${ANIMATION_DURATION}ms`,
    animation: `${fadeIn} ${ANIMATION_DURATION}ms ${theme.transitions.easing.easeInOut}`
  })
)

/** Hides the gap left under the sheet while it shrinks to a lower content height */
export const BottomSheetRenderSafer = styled('div', {
  shouldForwardProp: prop => prop !== 'saferHeight'
})<{ saferHeight: number }>(({ saferHeight }) => ({
  height: saferHeight,
  width: '100%',
  position: 'fixed',
  bottom: 0,
  pointerEvents: 'none'
}))

export const BottomSheetRenderSaferFill = styled(Paper)({
  position: 'absolute',
  bottom: 0,
  height: 0,
  width: '100%',
  animation: `${collapse} 1s`
})
