import {
  ListItem as MuiListItem,
  ListItemProps as MuiListItemProps
} from '@mui/material'
import React, { forwardRef } from 'react'

import { computeListItemRow, ListItemLayoutProps } from './helpers.js'

export type { ListItemGutters, ListItemSize } from './helpers.js'

export type ListItemProps = Omit<MuiListItemProps, 'ref'> & ListItemLayoutProps

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
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
        {row.content}
        {row.action}
      </MuiListItem>
    )
  }
)

ListItem.displayName = 'ListItem'

export default ListItem
