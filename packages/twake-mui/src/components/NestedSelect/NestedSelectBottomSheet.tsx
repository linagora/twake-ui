import { Divider, IconButton, Typography } from '@mui/material'
import cx from 'classnames'
import React from 'react'

import { ArrowUp, Icon } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import BottomSheet from '../BottomSheet/index.js'
import BottomSheetHeader from '../BottomSheet/BottomSheetHeader.js'
import BottomSheetItem from '../BottomSheet/BottomSheetItem.js'
import type { BottomSheetProps } from '../BottomSheet/types.js'
import { locales } from '../Dialogs/locales/index.js'
import NestedSelect from './index.js'
import type { NestedSelectHeaderProps, NestedSelectProps } from './types.js'

export interface NestedSelectBottomSheetProps extends NestedSelectProps {
  onClose?: () => void
  componentsProps?: {
    bottomsheet?: Omit<BottomSheetProps, 'backdrop' | 'onClose' | 'children'>
  }
}

const NestedSelectSheetHeader = ({
  title,
  showBack,
  onClickBack
}: NestedSelectHeaderProps): React.ReactElement | null => {
  useExtendI18n(locales)
  const { t } = useI18n()

  if (!title) return null

  return (
    <>
      <BottomSheetHeader
        className={cx('u-h-3', { 'u-pl-half u-pr-3': showBack })}
      >
        {showBack && (
          <IconButton
            aria-label={t('Dialogs.backButton')}
            onClick={onClickBack}
          >
            <Icon icon={ArrowUp} rotate={-90} />
          </IconButton>
        )}
        <Typography className="u-w-100" variant="h6" align="center">
          {title}
        </Typography>
      </BottomSheetHeader>
      <Divider />
    </>
  )
}

/** NestedSelect in a bottom sheet with a backdrop */
const NestedSelectBottomSheet = ({
  onClose,
  componentsProps,
  ...props
}: NestedSelectBottomSheetProps): React.ReactElement => (
  <BottomSheet {...componentsProps?.bottomsheet} backdrop onClose={onClose}>
    <BottomSheetItem disableGutters>
      <NestedSelect HeaderComponent={NestedSelectSheetHeader} {...props} />
    </BottomSheetItem>
  </BottomSheet>
)

export default NestedSelectBottomSheet
