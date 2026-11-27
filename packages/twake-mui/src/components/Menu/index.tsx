import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material'
import React, { forwardRef } from 'react'

import { usePositionOnResize } from '../../hooks/usePositionOnResize.js'

export type MenuProps = MuiMenuProps

/** MUI's `Menu`, placed again when its content changes size */
const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ action, slotProps, ...props }, ref) => {
    const position = usePositionOnResize(action, slotProps?.paper)

    return (
      <MuiMenu
        ref={ref}
        action={position.action}
        slotProps={{ ...slotProps, paper: position.paperSlot }}
        {...props}
      />
    )
  }
)

Menu.displayName = 'Menu'

export default Menu
