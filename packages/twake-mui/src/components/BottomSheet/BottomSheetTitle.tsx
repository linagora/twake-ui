import { List, ListItemIcon, Typography } from '@mui/material'
import React, { forwardRef, useContext } from 'react'

import { Icon, IconProps } from '@linagora/twake-icons'

import ListItem from '../ListItem'
import ListItemText from '../ListItemText'
import BottomSheetItem from './BottomSheetItem'
import BottomSheetTitleIdContext from './BottomSheetTitleIdContext'

export interface BottomSheetTitleProps {
  className?: string
  label?: string
  /** Shows the title as a list item with this icon */
  icon?: IconProps['icon']
}

const BottomSheetTitle = forwardRef<HTMLElement, BottomSheetTitleProps>(
  ({ className, label, icon }, ref) => {
    const titleId = useContext(BottomSheetTitleIdContext)

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
                slotProps={{
                  primary: { id: titleId, variant: 'h6', noWrap: true }
                }}
              />
            </ListItem>
          </List>
        </BottomSheetItem>
      )
    }

    return (
      <BottomSheetItem disableElevation>
        <Typography
          ref={ref}
          id={titleId}
          className={className}
          variant="h6"
          align="center"
        >
          {label}
        </Typography>
      </BottomSheetItem>
    )
  }
)

BottomSheetTitle.displayName = 'BottomSheetTitle'

export default BottomSheetTitle
