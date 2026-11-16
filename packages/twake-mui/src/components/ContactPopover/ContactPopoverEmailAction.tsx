import { Button, useTheme } from '@mui/material'
import React from 'react'

import { useI18n } from 'twake-i18n'

export interface ContactPopoverEmailActionProps {
  /** URL for email action */
  url?: string
  /** Callback when the action is clicked, used when no url is given */
  onClick?: () => void
  /** Disable the action button */
  disabled?: boolean
}

export const ContactPopoverEmailAction = ({
  url,
  onClick,
  disabled = false
}: ContactPopoverEmailActionProps): React.ReactElement => {
  const theme = useTheme()
  const { t } = useI18n()
  const linkProps = url
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick }

  return (
    <Button
      {...linkProps}
      variant="outlined"
      size="small"
      disabled={disabled}
      sx={{
        justifyContent: 'center',
        color: theme.vars.palette.text.primary,
        borderColor: theme.vars.palette.divider
      }}
    >
      {t('ContactPopover.emailButton')}
    </Button>
  )
}
