import React from 'react'

import { AvatarSize } from '../Avatar/index.js'
import MemberAvatar from './MemberAvatar.js'
import MemberGroupAvatar from './MemberGroupAvatar.js'
import { Member } from './types.js'

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
