import { Button, useTheme } from '@mui/material'
import React from 'react'

import { useI18n } from 'twake-i18n'

export interface ContactPopoverEmailActionProps {
  /** URL for email action */
  url: string
  /** Disable the action button */
  disabled?: boolean
}

export const ContactPopoverEmailAction = ({
  url,
  disabled = false
}: ContactPopoverEmailActionProps): React.ReactElement => {
  const theme = useTheme()
  const { t } = useI18n()

  return (
    <Button
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      size="small"
      disabled={disabled}
      sx={{
        justifyContent: 'center',
        color: theme.palette.text.primary,
        borderColor: theme.palette.divider
      }}
    >
      {t('ContactPopover.emailButton')}
    </Button>
  )
}
