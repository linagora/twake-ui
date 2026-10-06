import { styled } from '@mui/material/styles'
import React, { forwardRef } from 'react'

import BottomSheetItem, { BottomSheetItemProps } from './BottomSheetItem'

export type BottomSheetHeaderProps = Omit<
  BottomSheetItemProps,
  'disableGutters' | 'disableElevation'
>

const BottomSheetHeaderRoot = styled(BottomSheetItem)({
  display: 'flex',
  alignItems: 'center'
})

/**
 * Content kept visible at the bottom of the sheet when it is at its lowest stop, such as action
 * buttons. Its height and bottom padding are part of the sheet minimum height.
 */
const BottomSheetHeader = forwardRef<HTMLDivElement, BottomSheetHeaderProps>(
  (props, ref) => (
    <BottomSheetHeaderRoot
      ref={ref}
      disableGutters
      disableElevation
      {...props}
    />
  )
)

BottomSheetHeader.displayName = 'BottomSheetHeader'

export default BottomSheetHeader
