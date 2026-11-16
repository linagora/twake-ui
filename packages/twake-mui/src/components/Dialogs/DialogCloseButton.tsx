import { IconButton, IconButtonProps } from '@mui/material'
import cx from 'classnames'
import React from 'react'

import { CrossMedium, Icon } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import { locales } from './locales'

export interface DialogCloseButtonProps extends IconButtonProps {
  onClick: NonNullable<IconButtonProps['onClick']>
}

/** Close button pinned to the top right corner of a dialog */
const DialogCloseButton = ({
  className,
  ...props
}: DialogCloseButtonProps): React.ReactElement => {
  useExtendI18n(locales)
  const { t } = useI18n()

  return (
    <IconButton
      {...props}
      aria-label={t('Dialogs.closeButton')}
      className={cx('dialogIconButton', 'dialogCloseButton', className)}
      size="medium"
    >
      <Icon icon={CrossMedium} />
    </IconButton>
  )
}

export default DialogCloseButton
