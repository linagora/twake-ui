import { Icon } from '@linagora/twake-icons'
import { Discuss } from '@linagora/twake-icons'
import { IconButton, useTheme } from '@mui/material'
import React from 'react'

export interface ContactPopoverChatActionProps {
  /** URL for chat action (e.g., Twake Chat link) */
  url: string
}

export const ContactPopoverChatAction = ({
  url
}: ContactPopoverChatActionProps): JSX.Element => {
  const theme = useTheme()
  return (
    <IconButton
      href={url}
      size="small"
      sx={{ border: `1px solid ${theme.palette.divider}` }}
    >
      <Icon icon={Discuss} size={20} color={theme.palette.text.icon} />
    </IconButton>
  )
}
