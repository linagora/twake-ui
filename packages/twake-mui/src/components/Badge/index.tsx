import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material'
import cx from 'classnames'
import React from 'react'

export type BadgeSize = 'small' | 'medium' | 'large'

export interface BadgeProps extends MuiBadgeProps {
  size?: BadgeSize
  withBorder?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  size = 'medium',
  withBorder = true,
  classes,
  ...props
}) => {
  return (
    <MuiBadge
      classes={{
        ...classes,
        badge: cx(`size-${size}`, { border: withBorder }, classes?.badge)
      }}
      {...props}
    />
  )
}

export default Badge
