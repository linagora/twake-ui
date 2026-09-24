import {
  ListSubheader as MuiListSubheader,
  ListSubheaderProps as MuiListSubheaderProps
} from '@mui/material'
import cx from 'classnames'
import React, { forwardRef } from 'react'

import { ListItemGutters } from '../ListItem/helpers'

export interface ListSubheaderProps extends Omit<MuiListSubheaderProps, 'ref'> {
  gutters?: ListItemGutters
}

export const ListSubheader = forwardRef<HTMLLIElement, ListSubheaderProps>(
  ({ className, gutters = 'default', disableGutters, ...props }, ref) => (
    <MuiListSubheader
      ref={ref}
      {...props}
      className={cx(className, { doubleGutters: gutters === 'double' })}
      disableGutters={disableGutters || gutters === 'disabled'}
    />
  )
)

ListSubheader.displayName = 'ListSubheader'

export default ListSubheader
