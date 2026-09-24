import {
  ListItem as MuiListItem,
  ListItemProps as MuiListItemProps
} from '@mui/material'
import React, { forwardRef } from 'react'

import { computeListItemRow, ListItemCozyProps } from './helpers'

export type { ListItemGutters, ListItemSize } from './helpers'

export type ListItemProps = Omit<MuiListItemProps, 'ref'> & ListItemCozyProps

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
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

    return (
      <MuiListItem
        ref={ref}
        {...props}
        className={row.className}
        disableGutters={row.disableGutters}
        sx={row.sx}
      >
        {children}
      </MuiListItem>
    )
  }
)

ListItem.displayName = 'ListItem'

export default ListItem
