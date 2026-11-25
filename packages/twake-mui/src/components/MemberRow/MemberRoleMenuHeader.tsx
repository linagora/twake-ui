import { ListItemIcon } from '@mui/material'
import React from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import ActionsMenuMobileHeader from '../ActionsMenu/ActionsMenuMobileHeader.js'
import ListItemText from '../ListItemText/index.js'
import MemberOrGroupAvatar from './MemberOrGroupAvatar.js'
import { locales } from './locales/index.js'
import { Member } from './types.js'

interface MemberRoleMenuHeaderProps {
  member: Member
}

const MemberRoleMenuHeader = ({
  member
}: MemberRoleMenuHeaderProps): React.JSX.Element => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const { name, isCurrentUser } = member

  return (
    <ActionsMenuMobileHeader>
      <ListItemIcon>
        <MemberOrGroupAvatar member={member} size="m" />
      </ListItemIcon>
      <ListItemText
        primary={
          isCurrentUser
            ? t('MemberRow.you')
            : name || t('MemberRow.defaultName')
        }
        slotProps={{ primary: { variant: 'h6' } }}
      />
    </ActionsMenuMobileHeader>
  )
}

export default MemberRoleMenuHeader
