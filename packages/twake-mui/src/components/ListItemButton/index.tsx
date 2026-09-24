import {
  ListItem,
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps
} from '@mui/material'
import React, { forwardRef } from 'react'

import { computeListItemRow, ListItemCozyProps } from '../ListItem/helpers'

export type ListItemButtonProps = Omit<MuiListItemButtonProps, 'ref'> &
  ListItemCozyProps

export const ListItemButton = forwardRef<HTMLDivElement, ListItemButtonProps>(
  (
    {
      className,
      gutters,
      size,
      ellipsis,
      disableGutters,
      sx,
      children,
      ...props
    },
    ref
  ) => {
    const row = computeListItemRow({
      className,
      gutters,
      size,
      ellipsis,
      disableGutters,
      sx,
      children
    })

    const button = (
      <MuiListItemButton
        ref={ref}
        {...props}
        className={row.className}
        disableGutters={row.disableGutters}
        sx={row.sx}
      >
        {row.content}
      </MuiListItemButton>
    )

    if (row.action === null) return button

    // Keeps the action out of the button, so clicking it does not click the row
    return (
      <ListItem disablePadding>
        {button}
        {row.action}
      </ListItem>
    )
  }
)

ListItemButton.displayName = 'ListItemButton'

export default ListItemButton
