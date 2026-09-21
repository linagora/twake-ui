import { Icon } from '@linagora/twake-icons'
import { CalendarToday } from '@linagora/twake-icons'
import { IconButton, useTheme } from '@mui/material'
import React from 'react'

export interface ContactPopoverCalendarActionProps {
  /** URL for calendar action (e.g., view attendee's calendar) */
  url: string
}

export const ContactPopoverCalendarAction = ({
  url
}: ContactPopoverCalendarActionProps): JSX.Element => {
  const theme = useTheme()
  return (
    <IconButton
      href={url}
      size="small"
      sx={{ border: `1px solid ${theme.palette.divider}` }}
    >
      <Icon icon={CalendarToday} size={20} color={theme.palette.text.icon} />
    </IconButton>
  )
}
