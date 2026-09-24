import { Button, useTheme } from '@mui/material'
import React from 'react'

import { useI18n } from 'twake-i18n'

export interface ContactPopoverEmailActionProps {
  /** URL for email action */
  url: string
}

export const ContactPopoverEmailAction = ({
  url
}: ContactPopoverEmailActionProps): JSX.Element => {
  const theme = useTheme()
  const { t } = useI18n()

  return (
    <Button
      href={url}
      variant="outlined"
      size="small"
      fullWidth
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
