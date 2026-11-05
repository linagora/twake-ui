import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react'

import { CrossCircleOutline, Icon, Spinner } from '@linagora/twake-icons'
import { useI18n } from 'twake-i18n'

import MemberRoleMenu from './MemberRoleMenu'
import { Member, MemberRole } from './types'

interface MemberRowActionsProps {
  member: Member
  roles: MemberRole[]
  onRoleChange: (member: Member, role: string) => void
  onRemove: (member: Member) => void
}

const MemberRowActions = ({
  member,
  roles,
  onRoleChange,
  onRemove
}: MemberRowActionsProps): React.JSX.Element => {
  const { t } = useI18n()
  const { role, canChangeRole, canRemove, removeIcon, removeLabel, isPending } =
    member
  const memberRoles = member.roles ?? roles

  const isRoleMenuShown = canChangeRole && !isPending

  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
      {isPending && (
        <Icon
          icon={Spinner}
          spin
          size={16}
          color="var(--twake-palette-primary-main)"
          className="u-mh-half"
        />
      )}
      {isRoleMenuShown ? (
        <MemberRoleMenu
          member={member}
          value={role ?? ''}
          roles={memberRoles}
          onChange={newRole => onRoleChange(member, newRole)}
        />
      ) : (
        <Typography variant="body2">
          {memberRoles.find(memberRole => memberRole.value === role)?.label}
        </Typography>
      )}
      {canRemove && !isPending && (
        <IconButton
          size="small"
          className="u-ml-half"
          aria-label={removeLabel ?? t('MemberRow.remove')}
          onClick={() => onRemove(member)}
        >
          <Icon icon={removeIcon ?? CrossCircleOutline} />
        </IconButton>
      )}
    </Stack>
  )
}

export default MemberRowActions
