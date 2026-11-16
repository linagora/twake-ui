import React from 'react'

import { Icon, Peoples } from '@linagora/twake-icons'

import Avatar, { AvatarSize } from '../Avatar'
import { colorToGradient } from '../Avatar/helpers'
import { COLORS } from '../ColorList/helpers'

const DEFAULT_COLOR = COLORS[4]

export interface MemberGroupAvatarProps {
  size?: AvatarSize | number
  /** Hex color of the group, as `#RRGGBB` */
  color?: string
  className?: string
}

/** Avatar of a group of members */
const MemberGroupAvatar = ({
  size,
  color = DEFAULT_COLOR,
  className
}: MemberGroupAvatarProps): React.JSX.Element => (
  <Avatar size={size} color={colorToGradient(color)} className={className}>
    <Icon icon={Peoples} />
  </Avatar>
)

export default MemberGroupAvatar
