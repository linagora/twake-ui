import { Paper, PaperProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { forwardRef } from 'react'

/** Flat extra shadow the theme defines past the 24 MUI elevations */
const ITEM_ELEVATION = 25

export interface BottomSheetItemProps extends Omit<PaperProps, 'ref'> {
  /** Removes the default padding */
  disableGutters?: boolean
  /** Removes the default elevation */
  disableElevation?: boolean
}

const BottomSheetItemRoot = styled(Paper, {
  shouldForwardProp: prop => prop !== 'disableGutters'
})<{ disableGutters: boolean }>(({ theme }) => ({
  variants: [
    {
      props: { disableGutters: false },
      style: { padding: theme.spacing(2) }
    }
  ]
}))

const BottomSheetItem = forwardRef<HTMLDivElement, BottomSheetItemProps>(
  ({ disableGutters = false, disableElevation = false, ...props }, ref) => (
    <BottomSheetItemRoot
      ref={ref}
      elevation={disableElevation ? 0 : ITEM_ELEVATION}
      square
      disableGutters={disableGutters}
      {...props}
    />
  )
)

BottomSheetItem.displayName = 'BottomSheetItem'

export default BottomSheetItem
