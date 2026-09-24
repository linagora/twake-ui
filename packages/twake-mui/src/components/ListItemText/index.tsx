import {
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps
} from '@mui/material'
import cx from 'classnames'
import React, { forwardRef } from 'react'

export interface ListItemTextProps extends Omit<MuiListItemTextProps, 'ref'> {
  ellipsis?: boolean
}

export const ListItemText = forwardRef<HTMLDivElement, ListItemTextProps>(
  ({ ellipsis = true, slotProps, ...props }, ref) => {
    const primarySlot = slotProps?.primary
    const ellipsisClassName = cx({ ellipsis })

    return (
      <MuiListItemText
        ref={ref}
        {...props}
        // A primary or secondary slot replaces these defaults, ellipsis included, as in cozy-ui
        slotProps={{
          ...slotProps,
          primary:
            typeof primarySlot === 'function'
              ? primarySlot
              : {
                  // cozy-ui renders it with MUI's Typography, out of the grey caption rule
                  color: 'inherit',
                  ...(primarySlot ?? { className: ellipsisClassName })
                },
          secondary: slotProps?.secondary ?? {
            variant: 'caption',
            className: ellipsisClassName
          }
        }}
      />
    )
  }
)

ListItemText.displayName = 'ListItemText'

export default ListItemText
