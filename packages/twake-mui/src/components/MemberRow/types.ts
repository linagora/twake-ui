import type React from 'react'

import type { IconProps } from '@linagora/twake-icons'

export interface MemberRole {
  value: string
  label: string
}

/** Display data of a member, built by the app from its own contacts, groups or users */
export interface Member {
  /** Unique key of the member */
  id: string
  /** Displayed name, replaced by "You" when `isCurrentUser` */
  name?: string
  subtitle?: React.ReactNode
  /** Email of the person: two members with the same one are the same person */
  email?: string
  avatarUrl?: string
  initials?: string
  /** Hex color of a group avatar */
  color?: string
  isGroup?: boolean
  /** Shows the "Owner" label and no action, whatever the other props */
  isOwner?: boolean
  isCurrentUser?: boolean
  /** Current role, among the roles of the member */
  role?: string
  /** Roles of this member, when they differ from the roles of the row */
  roles?: MemberRole[]
  /** Shows the role in a menu, as text otherwise */
  canChangeRole?: boolean
  canRemove?: boolean
  removeIcon?: IconProps['icon']
  /** Accessible label of the remove button */
  removeLabel?: string
  /** Button shown in place of the role and the remove button */
  action?: { label: string; onClick: () => void }
  /** Shows a spinner and the role as text, without role menu nor remove button */
  isPending?: boolean
  /** Makes the row clickable */
  onClick?: () => void
  /** Anything the app needs back in its callbacks, not read by the components */
  data?: unknown
}
