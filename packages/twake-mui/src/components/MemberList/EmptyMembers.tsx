import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import cx from 'classnames'
import React from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import EmptyMembersIllustration from './EmptyMembersIllustration'
import { locales } from './locales'

const EmptyMembersRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.alpha(
    theme.vars.palette.secondary.main,
    theme.vars.palette.action.hoverOpacity
  )
}))

const EmptyMembers = (): React.JSX.Element => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  return (
    <EmptyMembersRoot
      className={cx(
        'u-flex u-flex-column u-flex-items-center u-pv-2 u-ph-1 u-bdrs-6',
        isMobile ? 'u-mh-1' : 'u-mh-2'
      )}
    >
      <EmptyMembersIllustration width={59} height={37} />
      <Typography variant="body2" className="u-mt-half">
        {t('MemberList.empty.title')}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {t('MemberList.empty.subtitle')}
      </Typography>
    </EmptyMembersRoot>
  )
}

export default EmptyMembers
