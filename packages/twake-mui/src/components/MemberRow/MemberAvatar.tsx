import React from 'react'

import Avatar, { AvatarProps } from '../Avatar'

export interface MemberAvatarProps extends Omit<AvatarProps, 'src'> {
  initials?: string
  avatarUrl?: string
}

/** Avatar of a member, showing its initials when its image is missing or fails to load */
const MemberAvatar = ({
  initials,
  avatarUrl,
  ...props
}: MemberAvatarProps): React.JSX.Element => (
  <Avatar {...props} src={avatarUrl}>
    {initials}
  </Avatar>
)

export default MemberAvatar
