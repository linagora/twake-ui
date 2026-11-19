import {
  ButtonBase,
  buttonBaseClasses,
  ImageList,
  ImageListItem,
  ImageListProps,
  imageListItemClasses
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

import { Icon, Check, Palette } from '@linagora/twake-icons'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import Avatar from '../Avatar'
import { COLORS, toHex } from './helpers'

// `touch` is the area a finger hits: 44 px when the gap has room for it, else
// the whole pitch, so that two colors never overlap
const sizes = {
  small: { avatar: 21, icon: 10, cols: 7, gap: 5, touch: 26 },
  medium: { avatar: 41, icon: 16, cols: 5, gap: 16, touch: 44 }
}

const CUSTOM_CLASS = 'ColorList-custom'

const ColorListRoot = styled(ImageList, {
  shouldForwardProp: prop => prop !== 'touchInset'
})<{ touchInset: number }>(({ touchInset }) => ({
  margin: 0,
  [`& .${imageListItemClasses.root}`]: { alignItems: 'center' },
  // Room for the touch areas, which go past the edges of the list while it
  // stays scrollable, as `overflow: visible` would not
  '@media (pointer: coarse)': {
    padding: 4,
    margin: -4,
    [`& .${buttonBaseClasses.root}::after`]: {
      content: '""',
      position: 'absolute',
      inset: touchInset
    },
    // Its inset starts inside its 1 px border
    [`& .${CUSTOM_CLASS}::after`]: { inset: touchInset - 1 }
  }
}))

export type ColorListSize = keyof typeof sizes

export interface ColorListProps extends Omit<
  ImageListProps,
  'children' | 'onClick'
> {
  /** Defaults to `medium` on mobile and `small` otherwise */
  size?: ColorListSize
  selectedColor?: string
  /** Hexadecimal colors drawn after `COLORS`, those already in it left out */
  extraColors?: readonly string[]
  /** Accessible name of a color. Defaults to its hexadecimal code */
  getColorLabel?: (color: string) => string
  customColorProps?: {
    enabled?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    'aria-label'?: string
    'aria-pressed'?: boolean
    'data-testid'?: string
    ref?: React.Ref<HTMLButtonElement>
  }
  onClick?: (color: string) => void
}

const ColorList: React.FC<ColorListProps> = ({
  size,
  selectedColor,
  extraColors = [],
  getColorLabel,
  customColorProps,
  onClick,
  ...props
}) => {
  const { enabled: isCustomEnabled, ...customButtonProps } =
    customColorProps ?? {}
  const colors = [
    ...new Set([
      ...COLORS,
      ...extraColors.map(color => toHex(color) ?? color.toUpperCase())
    ])
  ]
  const selected = toHex(selectedColor ?? '')
  const { isMobile } = useBreakpoints()
  const { avatar, icon, cols, gap, touch } =
    sizes[size ?? (isMobile ? 'medium' : 'small')]

  return (
    <ColorListRoot
      cols={cols}
      rowHeight={avatar}
      gap={gap}
      touchInset={(avatar - touch) / 2}
      {...props}
    >
      {colors.map(color => (
        <ImageListItem key={color}>
          <ButtonBase
            component="div"
            className="u-bdrs-circle"
            aria-label={getColorLabel?.(color) ?? color}
            aria-pressed={selected === color}
            onClick={() => onClick?.(color)}
          >
            <Avatar color={color} size={avatar}>
              {selected === color ? <Icon icon={Check} size={icon} /> : ' '}
            </Avatar>
          </ButtonBase>
        </ImageListItem>
      ))}
      {isCustomEnabled && (
        <ImageListItem>
          <ButtonBase
            {...customButtonProps}
            className={CUSTOM_CLASS}
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
          >
            <Icon icon={Palette} size={icon} color="#000" />
          </ButtonBase>
        </ImageListItem>
      )}
    </ColorListRoot>
  )
}

export default ColorList
