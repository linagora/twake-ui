import { Icon } from '@linagora/twake-icons'
import { Copy } from '@linagora/twake-icons'
import { Box, IconButton, Typography, useTheme, alpha } from '@mui/material'
import React, { useState } from 'react'

import { useI18n } from 'twake-i18n'

import { Avatar } from '../Avatar'
import { nameToColor, getInitials } from '../Avatar/helpers'

export interface AttendeeInfoProps {
  /** Attendee display name */
  name: string
  /** Attendee email address */
  email: string
  /** Callback when email is copied to clipboard */
  onEmailCopy?: (email: string) => void
}

export const AttendeeInfo = ({
  name,
  email,
  onEmailCopy
}: AttendeeInfoProps): JSX.Element => {
  const theme = useTheme()
  const { t } = useI18n()
  const [showCopied, setShowCopied] = useState(false)

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(email)
      onEmailCopy?.(email)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } catch {
      // Clipboard write failed — silently ignore
    }
  }

  const avatarColor = nameToColor(name || email)
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
        {name && name !== email ? (
          <Typography variant="body1" sx={{ fontWeight: 500 }} noWrap>
            {name}
          </Typography>
        ) : null}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {email}
          </Typography>
          <IconButton
            size="small"
            onClick={() => void handleCopy()}
            sx={{ p: 0.5, color: alpha(theme.palette.grey[900], 0.9) }}
            title={
              showCopied
                ? t('ContactPopover.copiedTooltip')
                : t('ContactPopover.copyTooltip')
            }
          >
            <Icon icon={Copy} size={16} color={theme.palette.text.icon} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
