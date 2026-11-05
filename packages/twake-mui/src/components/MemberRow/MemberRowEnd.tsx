import { Button, Typography } from '@mui/material'
import React from 'react'

import { useI18n } from 'twake-i18n'

import MemberRowActions from './MemberRowActions'
import { Member, MemberRole } from './types'

interface MemberRowEndProps {
  member: Member
  roles: MemberRole[]
  onRoleChange: (member: Member, role: string) => void
  onRemove: (member: Member) => void
}

/** Owner label, action button, or role and remove button of a member */
const MemberRowEnd = ({
  member,
  roles,
  onRoleChange,
  onRemove
}: MemberRowEndProps): React.JSX.Element => {
  const { t } = useI18n()
  const { isOwner, action } = member
  const hasAction = action !== undefined

  if (isOwner) {
    return <Typography variant="body2">{t('MemberRow.owner')}</Typography>
  }

  if (hasAction) {
    return (
      <Button
        variant="text"
        // Relative position puts the button above a bottom sheet on iOS
        sx={{ position: 'initial' }}
        onClick={action.onClick}
      >
        {action.label}
      </Button>
    )
  }

  return (
    <MemberRowActions
      member={member}
      roles={roles}
      onRoleChange={onRoleChange}
      onRemove={onRemove}
    />
  )
}

export default MemberRowEnd
