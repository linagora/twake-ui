import { buttonClasses, Typography } from '@mui/material'
import React, { forwardRef } from 'react'

import { Icon } from '@linagora/twake-icons'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import { ActionComponentProps } from '../ActionsMenu/types'
import Button from '../Button'

const MOBILE_SX = {
  flex: '1 1 0',
  flexDirection: 'column',
  padding: 0,
  textTransform: 'none',
  [`& .${buttonClasses.startIcon}`]: { marginRight: 0, marginBottom: '2px' }
} as const

/** Action of the bar, with its label under its icon on mobile */
const ResponsiveAction = forwardRef<HTMLElement, ActionComponentProps>(
  ({ action, disabled, onClick }, ref) => {
    const { isMobile } = useBreakpoints()

    return (
      <Button
        ref={ref as React.Ref<HTMLButtonElement>}
        variant="text"
        color="inherit"
        startIcon={action.icon && <Icon icon={action.icon} />}
        disabled={disabled}
        sx={isMobile ? MOBILE_SX : undefined}
        onClick={onClick}
      >
        {isMobile ? (
          <Typography variant="caption" color="inherit">
            {action.label}
          </Typography>
        ) : (
          action.label
        )}
      </Button>
    )
  }
)

ResponsiveAction.displayName = 'ResponsiveAction'

export default ResponsiveAction
