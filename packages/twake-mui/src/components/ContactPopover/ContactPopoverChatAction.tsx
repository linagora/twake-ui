import { Icon } from '@linagora/twake-icons'
import { Discuss } from '@linagora/twake-icons'
import { IconButton, useTheme } from '@mui/material'
import React from 'react'

export interface ContactPopoverChatActionProps {
  /** URL for chat action (e.g., Twake Chat link) */
  url: string
  /** Disable the action button */
  disabled?: boolean
}

export const ContactPopoverChatAction = ({
  url,
  disabled = false
}: ContactPopoverChatActionProps): React.ReactElement => {
  const theme = useTheme()
  return (
    <IconButton
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      size="small"
      disabled={disabled}
      sx={{ border: `1px solid ${theme.palette.divider}` }}
    >
      <Icon icon={Discuss} size={20} color={theme.palette.text.icon} />
    </IconButton>
  )
}
