import {
  Popover as MuiPopover,
  PopoverProps as MuiPopoverProps
} from '@mui/material'
import React, { forwardRef } from 'react'

import { usePositionOnResize } from '../../hooks/usePositionOnResize.js'

export type PopoverProps = MuiPopoverProps

/** MUI's `Popover`, placed again when its content changes size */
const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ action, slotProps, ...props }, ref) => {
    const position = usePositionOnResize(action, slotProps?.paper)

    return (
      <MuiPopover
        ref={ref}
        action={position.action}
        slotProps={{ ...slotProps, paper: position.paperSlot }}
        {...props}
      />
    )
  }
)

Popover.displayName = 'Popover'

export default Popover
