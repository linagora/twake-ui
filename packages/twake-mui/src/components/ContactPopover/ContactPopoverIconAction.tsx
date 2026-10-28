import { Box, IconButton, Tooltip, useTheme } from '@mui/material'
import React from 'react'

import { Icon } from '@linagora/twake-icons'

export interface ContactPopoverIconActionProps {
  /** Icon shown in the button */
  icon: React.ComponentProps<typeof Icon>['icon']
  /** Accessible name of the button, also shown as its tooltip */
  label: string
  /** URL opened in a new tab when the button is clicked */
  url?: string
  /** Callback when the button is clicked, used when no url is given */
  onClick?: () => void
  /** Disable the action button */
  disabled?: boolean
}

export const ContactPopoverIconAction = ({
  icon,
  label,
  url,
  onClick,
  disabled = false
}: ContactPopoverIconActionProps): React.ReactElement => {
  const theme = useTheme()
  const linkProps = url
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick }

  return (
    // the span lets the tooltip show on a disabled button, and takes its
    // aria-label: the button is named too
    <Tooltip title={label}>
      <Box component="span" sx={{ display: 'inline-flex' }}>
        <IconButton
          {...linkProps}
          aria-label={label}
          size="small"
          disabled={disabled}
          sx={{
            border: `1px solid ${theme.vars.palette.divider}`,
            color: theme.vars.palette.text.icon
          }}
        >
          <Icon icon={icon} size={20} />
        </IconButton>
      </Box>
    </Tooltip>
  )
}
