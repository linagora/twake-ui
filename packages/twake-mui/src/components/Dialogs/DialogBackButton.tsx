import { IconButton, IconButtonProps } from '@mui/material'
import cx from 'classnames'
import React from 'react'

import { Icon, Previous } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import { locales } from './locales'

export interface DialogBackButtonProps extends IconButtonProps {
  onClick: NonNullable<IconButtonProps['onClick']>
}

/** Back button pinned to the top left corner of a dialog */
const DialogBackButton = ({
  className,
  ...props
}: DialogBackButtonProps): React.ReactElement => {
  useExtendI18n(locales)
  const { t } = useI18n()

  return (
    <IconButton
      {...props}
      aria-label={t('Dialogs.backButton')}
      className={cx('dialogIconButton', 'dialogBackButton', className)}
      size="medium"
    >
      <Icon icon={Previous} />
    </IconButton>
  )
}

export default DialogBackButton
