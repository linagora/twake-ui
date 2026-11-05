import { Fade, ListItemIcon, ListItemSecondaryAction } from '@mui/material'
import React from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import ListItem from '../ListItem'
import ListItemButton from '../ListItemButton'
import ListItemText from '../ListItemText'
import MemberOrGroupAvatar from './MemberOrGroupAvatar'
import MemberRowEnd from './MemberRowEnd'
import { locales } from './locales'
import { Member, MemberRole } from './types'

export const FADE_IN_DURATION = 600

export interface MemberRowProps {
  member: Member
  /** Roles a member can get */
  roles: MemberRole[]
  /** Fades the row in */
  isNew?: boolean
  onRoleChange: (member: Member, role: string) => void
  onRemove: (member: Member) => void
}

/** Member of a sharing: avatar, name, subtitle, role and remove button */
const MemberRow = ({
  member,
  roles,
  isNew,
  onRoleChange,
  onRemove
}: MemberRowProps): React.JSX.Element => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { name, subtitle, isCurrentUser, onClick } = member

  const isClickable = onClick !== undefined
  const gutters = isMobile ? 'default' : 'double'
  const displayedName = isCurrentUser
    ? t('MemberRow.you')
    : name || t('MemberRow.defaultName')

  return (
    <Fade in timeout={isNew ? FADE_IN_DURATION : 0}>
      {isClickable ? (
        <ListItemButton gutters={gutters} size="small" onClick={onClick}>
          <ListItemIcon>
            <MemberOrGroupAvatar member={member} size="m" />
          </ListItemIcon>
          <ListItemText
            primary={displayedName}
            secondary={subtitle}
            slotProps={{ primary: { variant: 'body1', noWrap: true } }}
          />
          <ListItemSecondaryAction className={isMobile ? 'u-mr-1' : 'u-mr-2'}>
            <MemberRowEnd
              member={member}
              roles={roles}
              onRoleChange={onRoleChange}
              onRemove={onRemove}
            />
          </ListItemSecondaryAction>
        </ListItemButton>
      ) : (
        <ListItem gutters={gutters} size="small">
          <ListItemIcon>
            <MemberOrGroupAvatar member={member} size="m" />
          </ListItemIcon>
          <ListItemText
            primary={displayedName}
            secondary={subtitle}
            slotProps={{ primary: { variant: 'body1', noWrap: true } }}
          />
          <MemberRowEnd
            member={member}
            roles={roles}
            onRoleChange={onRoleChange}
            onRemove={onRemove}
          />
        </ListItem>
      )}
    </Fade>
  )
}

export default MemberRow
