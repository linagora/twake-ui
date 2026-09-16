import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps
} from '@mui/material'
import { styled } from '@mui/material/styles'
import cx from 'classnames'
import React from 'react'

import { colorMapping, nameToColor } from './helpers'

export type AvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl'

export interface AvatarProps extends Omit<MuiAvatarProps, 'color'> {
  color?: string
  size?: AvatarSize | number
  textColor?: string
  border?: boolean
  innerBorder?: boolean
  disabled?: boolean
  display?: 'initial' | 'inline'
}

interface StyledAvatarProps {
  background?: string
  textColor?: string
  customSize?: number
}

const transientProps = ['background', 'textColor', 'customSize']

const StyledAvatar = styled(MuiAvatar, {
  shouldForwardProp: prop => !transientProps.includes(String(prop))
})<StyledAvatarProps>(({ background, textColor, customSize }) => ({
  ...(customSize && {
    width: customSize,
    height: customSize,
    fontSize: customSize / 2
  }),
  // The text stays white on a coloured avatar whatever the mode
  ...(background && { background, color: '#fff' }),
  ...(textColor && { color: textColor })
}))

export const Avatar: React.FC<AvatarProps> = ({
  className,
  color,
  size = 'm',
  textColor,
  border,
  innerBorder,
  disabled,
  display = 'initial',
  children,
  ...props
}) => {
  const isCustomSize = typeof size === 'number'
  const nameColor = typeof children === 'string' ? nameToColor(children) : ''
  const madeColor = color === 'none' ? '' : color || nameColor

  return (
    <StyledAvatar
      className={cx(className, {
        [`size-${size}`]: !isCustomSize,
        disabled,
        border,
        innerBorder,
        displayInline: display === 'inline'
      })}
      customSize={isCustomSize ? size : undefined}
      background={
        madeColor ? (colorMapping[madeColor] ?? madeColor) : undefined
      }
      textColor={textColor}
      {...props}
    >
      {children}
    </StyledAvatar>
  )
}

export default Avatar
