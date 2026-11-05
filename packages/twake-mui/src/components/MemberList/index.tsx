import { List } from '@mui/material'
import React from 'react'
import { useGetIsMounted } from 'rooks'

import MemberRow from '../MemberRow'
import { Member, MemberRole } from '../MemberRow/types'
import EmptyMembers from './EmptyMembers'

export interface MemberListProps {
  members: Member[]
  /** Roles a member can get */
  roles: MemberRole[]
  /** Shows a placeholder when there is no member but the owner */
  showEmptyState?: boolean
  className?: string
  onRoleChange: (member: Member, role: string) => void
  onRemove: (member: Member) => void
}

/** Members of a sharing, the owner first */
const MemberList = ({
  members,
  roles,
  showEmptyState = true,
  className,
  onRoleChange,
  onRemove
}: MemberListProps): React.JSX.Element => {
  const getIsMounted = useGetIsMounted()
  const owner = members.find(member => member.isOwner)
  const otherMembers = members.filter(member => !member.isOwner)
  const hasOwner = owner !== undefined

  return (
    <>
      <List className={className}>
        {hasOwner && (
          <MemberRow
            member={owner}
            roles={roles}
            onRoleChange={onRoleChange}
            onRemove={onRemove}
          />
        )}
        {otherMembers.map(member => (
          <MemberRow
            key={member.id}
            member={member}
            roles={roles}
            isNew={getIsMounted()}
            onRoleChange={onRoleChange}
            onRemove={onRemove}
          />
        ))}
      </List>
      {showEmptyState && otherMembers.length === 0 && <EmptyMembers />}
    </>
  )
}

export default MemberList
