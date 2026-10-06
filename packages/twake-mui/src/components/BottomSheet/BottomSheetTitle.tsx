import { Icon, IconProps } from '@linagora/twake-icons'
import { List, ListItemIcon, Typography } from '@mui/material'
import React, { forwardRef } from 'react'

import BottomSheetItem from './BottomSheetItem'
import ListItem from '../ListItem'
import ListItemText from '../ListItemText'

export interface BottomSheetTitleProps {
  className?: string
  label?: string
  /** Shows the title as a list item with this icon */
  icon?: IconProps['icon']
}

const BottomSheetTitle = forwardRef<HTMLElement, BottomSheetTitleProps>(
  ({ className, label, icon }, ref) => {
    if (icon) {
      return (
        <BottomSheetItem disableGutters disableElevation>
          <List ref={ref as React.Ref<HTMLUListElement>}>
            <ListItem>
              <ListItemIcon>
                <Icon icon={icon} size={32} />
              </ListItemIcon>
              <ListItemText
                primary={label}
                slotProps={{ primary: { variant: 'h6', noWrap: true } }}
              />
            </ListItem>
          </List>
        </BottomSheetItem>
      )
    }

    return (
      <BottomSheetItem disableElevation>
        <Typography ref={ref} className={className} variant="h6" align="center">
          {label}
        </Typography>
      </BottomSheetItem>
    )
  }
)

BottomSheetTitle.displayName = 'BottomSheetTitle'

export default BottomSheetTitle
