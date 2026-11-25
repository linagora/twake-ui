import { Box, IconButton, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

import { Icon } from '@linagora/twake-icons'
import { Copy } from '@linagora/twake-icons'
import { useI18n } from 'twake-i18n'

import { writeToClipboard } from '../../lib/writeToClipboard.js'
import Avatar from '../Avatar/index.js'
import { nameToColor, getInitials } from '../Avatar/helpers.js'

export interface AttendeeInfoProps {
  /** Attendee display name */
  name: string
  /** Attendee email address */
  email: string
  /** Id of the title of the card: the name, else the email */
  titleId?: string
  /** Picks the colour of the avatar, the name (else the email) by default */
  avatarColorKey?: string
  /** Callback once the email is in the clipboard, with the copy button */
  onEmailCopy?: (email: string, button: HTMLElement) => void
}

export const AttendeeInfo = ({
  name,
  email,
  titleId,
  avatarColorKey,
  onEmailCopy
}: AttendeeInfoProps): React.ReactElement => {
  const theme = useTheme()
  const { t } = useI18n()
  const [showCopied, setShowCopied] = useState(false)
  const hasName = Boolean(name) && name !== email

  const handleCopy = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    const button = event.currentTarget
    try {
      await writeToClipboard(email, button)
    } catch {
      return
    }
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
    onEmailCopy?.(email, button)
  }

  const avatarColor = nameToColor(avatarColorKey ?? (name || email))
  const initials = getInitials(name, email)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar
        color={avatarColor}
        size={48}
        sx={{ width: 48, height: 48, fontSize: '1.25rem' }}
      >
        {initials}
      </Avatar>
      <Box sx={{ minWidth: 0 }}>
        {hasName ? (
          <Typography
            id={titleId}
            variant="body1"
            sx={{ fontWeight: 500, wordBreak: 'break-word' }}
          >
            {name}
          </Typography>
        ) : null}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            id={hasName ? undefined : titleId}
            variant="body2"
            color="text.secondary"
            sx={{ wordBreak: 'break-word' }}
          >
            {email}
          </Typography>
          <IconButton
            size="small"
            onClick={event => void handleCopy(event)}
            sx={{ p: 0.5, color: 'text.primary' }}
            title={
              showCopied
                ? t('ContactPopover.copiedTooltip')
                : t('ContactPopover.copyTooltip')
            }
          >
            <Icon icon={Copy} size={16} color={theme.vars.palette.text.icon} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
