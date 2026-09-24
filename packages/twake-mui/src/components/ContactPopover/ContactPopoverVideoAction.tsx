import { Icon } from '@linagora/twake-icons'
import { Camera } from '@linagora/twake-icons'
import { IconButton, useTheme } from '@mui/material'
import React from 'react'

export interface ContactPopoverVideoActionProps {
  /** URL for video call action (e.g., Twake Meet link) */
  url: string
}

export const ContactPopoverVideoAction = ({
  url
}: ContactPopoverVideoActionProps): JSX.Element => {
  const theme = useTheme()
  return (
    <IconButton
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      size="small"
      sx={{ border: `1px solid ${theme.palette.divider}` }}
    >
      <Icon icon={Camera} size={20} color={theme.palette.text.icon} />
    </IconButton>
  )
}
