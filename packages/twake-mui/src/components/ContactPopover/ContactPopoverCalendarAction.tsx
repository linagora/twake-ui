import { Icon } from '@linagora/twake-icons'
import { CalendarToday } from '@linagora/twake-icons'
import { IconButton, useTheme } from '@mui/material'
import React from 'react'

export interface ContactPopoverCalendarActionProps {
  /** URL for calendar action (e.g., view attendee's calendar) */
  url: string
  /** Disable the action button */
  disabled?: boolean
}

export const ContactPopoverCalendarAction = ({
  url,
  disabled = false
}: ContactPopoverCalendarActionProps): React.ReactElement => {
  const theme = useTheme()
  return (
    <IconButton
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      size="small"
      disabled={disabled}
      sx={{ border: `1px solid ${theme.vars.palette.divider}` }}
    >
      <Icon
        icon={CalendarToday}
        size={20}
        color={theme.vars.palette.text.icon}
      />
    </IconButton>
  )
}
