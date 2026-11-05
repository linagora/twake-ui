import React from 'react'

import { AvatarSize } from '../Avatar'
import MemberAvatar from './MemberAvatar'
import MemberGroupAvatar from './MemberGroupAvatar'
import { Member } from './types'

interface MemberOrGroupAvatarProps {
  member: Member
  size: AvatarSize | number
  className?: string
}

const MemberOrGroupAvatar = ({
  member,
  size,
  className
}: MemberOrGroupAvatarProps): React.JSX.Element => {
  const { avatarUrl, initials, color, isGroup } = member

  if (isGroup) {
    return <MemberGroupAvatar size={size} color={color} className={className} />
  }

  return (
    <MemberAvatar
      size={size}
      initials={initials}
      avatarUrl={avatarUrl}
      className={className}
    />
  )
}

export default MemberOrGroupAvatar
