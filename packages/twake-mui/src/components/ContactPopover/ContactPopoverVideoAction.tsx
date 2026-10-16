import { Icon } from '@linagora/twake-icons'
import { Camera } from '@linagora/twake-icons'
import { IconButton, useTheme } from '@mui/material'
import React from 'react'

export interface ContactPopoverVideoActionProps {
  /** URL for video call action (e.g., Twake Meet link) */
  url: string
  /** Disable the action button */
  disabled?: boolean
}

export const ContactPopoverVideoAction = ({
  url,
  disabled = false
}: ContactPopoverVideoActionProps): React.ReactElement => {
  const theme = useTheme()
  return (
    <IconButton
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      size="small"
      disabled={disabled}
      sx={{
        border: `1px solid ${theme.vars.palette.divider}`,
        color: theme.vars.palette.text.icon
      }}
    >
      <Icon icon={Camera} size={20} />
    </IconButton>
  )
}
