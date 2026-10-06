import { Icon, Check, Palette } from '@linagora/twake-icons'
import {
  ButtonBase,
  ImageList,
  ImageListItem,
  ImageListProps,
  imageListItemClasses
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import { Avatar } from '../Avatar'
import { COLORS } from './helpers'

const sizes = {
  small: { avatar: 21, icon: 10, cols: 7, gap: 5 },
  medium: { avatar: 41, icon: 16, cols: 5, gap: 16 }
}

const ColorListRoot = styled(ImageList)({
  margin: 0,
  [`& .${imageListItemClasses.root}`]: { alignItems: 'center' }
})

export type ColorListSize = keyof typeof sizes

export interface ColorListProps extends Omit<
  ImageListProps,
  'children' | 'onClick'
> {
  /** Defaults to `medium` on mobile and `small` otherwise */
  size?: ColorListSize
  selectedColor?: string
  customColorProps?: {
    enabled?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  }
  onClick?: (color: string) => void
}

const ColorList: React.FC<ColorListProps> = ({
  size,
  selectedColor,
  customColorProps,
  onClick,
  ...props
}) => {
  const { isMobile } = useBreakpoints()
  const { avatar, icon, cols, gap } =
    sizes[size ?? (isMobile ? 'medium' : 'small')]

  return (
    <ColorListRoot cols={cols} rowHeight={avatar} gap={gap} {...props}>
      {COLORS.map(color => (
        <ImageListItem key={color}>
          <ButtonBase
            component="div"
            className="u-bdrs-circle"
            onClick={() => onClick?.(color)}
          >
            <Avatar color={color} size={avatar}>
              {selectedColor?.toUpperCase() === color ? (
                <Icon icon={Check} size={icon} />
              ) : (
                ' '
              )}
            </Avatar>
          </ButtonBase>
        </ImageListItem>
      ))}
      {customColorProps?.enabled && (
        <ImageListItem>
          <ButtonBase
            sx={{
              width: avatar,
              height: avatar,
              borderRadius: '50%',
              border: '1px solid transparent',
              backgroundImage:
                'linear-gradient(#fff, #fff), conic-gradient(from 0deg, #FB2C36, #AD46FF, #2B7FFF, #FB2C36)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
            onClick={customColorProps.onClick}
          >
            <Icon icon={Palette} size={icon} color="#000" />
          </ButtonBase>
        </ImageListItem>
      )}
    </ColorListRoot>
  )
}

export default ColorList
