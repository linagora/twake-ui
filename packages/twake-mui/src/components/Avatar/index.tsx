import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

import { colorMapping, nameToColor, supportedColors } from './helpers'

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

type AvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl'
type AvatarColor = (typeof supportedColors)[number] | 'none'
type AvatarDisplay = 'initial' | 'inline'

export interface AvatarProps extends Omit<MuiAvatarProps, 'color'> {
  color?: AvatarColor
  size?: AvatarSize | number
  border?: boolean
  innerBorder?: boolean
  disabled?: boolean
  display?: AvatarDisplay
}

const StyledAvatar = styled(MuiAvatar, {
  shouldForwardProp: prop => prop !== 'gradientColor'
})<{ gradientColor?: string }>(({ theme, gradientColor }) => ({
  ...(gradientColor && {
    color: theme.palette.primary.contrastText,
    background: colorMapping[gradientColor] || undefined
  })
}))

export const Avatar: React.FC<AvatarProps> = ({
  className,
  color,
  size,
  border,
  innerBorder,
  disabled,
  display = 'initial',
  sx,
  ...props
}) => {
  const defaultColor =
    typeof props.children === 'string' ? nameToColor(props.children) : undefined

  const finalColor =
    color === 'none'
      ? undefined
      : color && supportedColors.includes(color)
      ? color
      : defaultColor

  const classNames: string[] = []
  if (className) classNames.push(className)
  if (size && typeof size === 'string') classNames.push(`size-${size}`)
  if (disabled) classNames.push('disabled')
  if (border) classNames.push('border')
  if (innerBorder) classNames.push('innerBorder')
  if (display !== 'initial') classNames.push(`display${capitalize(display)}`)

  return (
    <StyledAvatar
      gradientColor={finalColor}
      className={classNames.join(' ') || undefined}
      sx={sx}
      {...props}
    />
  )
}

export default Avatar
