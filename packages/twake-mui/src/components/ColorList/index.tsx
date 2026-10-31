import {
  ButtonBase,
  ImageList,
  ImageListItem,
  ImageListProps,
  TextField,
  imageListItemClasses
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useEffect, useRef, useState } from 'react'

import { Icon, Check, Palette } from '@linagora/twake-icons'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import Avatar from '../Avatar'
import { COLORS, normalizeHexColor } from './helpers'

// `touch` is the area a finger hits: 44 px when the gap has room for it, else
// the whole pitch, so that two colors never overlap
const sizes = {
  small: { avatar: 21, icon: 10, cols: 7, gap: 5, touch: 26 },
  medium: { avatar: 41, icon: 16, cols: 5, gap: 16, touch: 44 }
}

const TOUCH_MEDIA = '@media (pointer: coarse)'

const ColorListRoot = styled(ImageList)({
  margin: 0,
  [`& .${imageListItemClasses.root}`]: { alignItems: 'center' },
  // Room for the touch areas, which go past the edges of the list while it
  // stays scrollable, as `overflow: visible` would not
  [TOUCH_MEDIA]: { padding: 4, margin: -4 }
})

export type ColorListSize = keyof typeof sizes

export interface ColorListCustomInput {
  label: string
  helperText?: string
  /** Replaces `helperText` when `showError` is set and the text is no color */
  errorText?: string
  /**
   * An untouched field stays quiet until a submit is attempted. Without
   * `errorText` there is no error to show, and the field stays as it is
   */
  showError?: boolean
  /** Controls the field, opened by the custom button and closed by a color */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Told whether the color can be used: always true while the field is closed */
  onValidityChange?: (isValid: boolean) => void
  inputRef?: React.Ref<HTMLInputElement>
  'data-testid'?: string
}

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
    /**
     * Makes the custom button open a text field under the list. A color typed
     * there goes to `onClick` as `#RRGGBB`. It is open at mount on a
     * `selectedColor` out of the list, and `aria-label` defaults to its label.
     */
    input?: ColorListCustomInput
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
  const {
    enabled: isCustomEnabled,
    input,
    onClick: onCustomClick,
    ...customButtonProps
  } = customColorProps ?? {}
  const colors = [
    ...new Set([
      ...COLORS,
      ...extraColors.map(
        color => normalizeHexColor(color) ?? color.toUpperCase()
      )
    ])
  ]
  // `selectedColor` can be null or empty from a JavaScript caller
  const [isOpenState, setIsOpenState] = useState(
    selectedColor ? !colors.includes(selectedColor.toUpperCase()) : false
  )
  const [text, setText] = useState(selectedColor ?? '')
  const isOpen =
    isCustomEnabled === true &&
    input !== undefined &&
    (input.open ?? isOpenState)
  const [wasOpen, setWasOpen] = useState(isOpen)
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen)
    if (isOpen) setText(selectedColor ?? '')
  }
  const isValid = !isOpen || normalizeHexColor(text) !== null
  const onValidityChangeRef = useRef(input?.onValidityChange)
  useEffect(() => {
    onValidityChangeRef.current = input?.onValidityChange
  })
  useEffect(() => {
    onValidityChangeRef.current?.(isValid)
  }, [isValid])
  const setIsOpen = (open: boolean): void => {
    setIsOpenState(open)
    input?.onOpenChange?.(open)
  }
  const shownColor = isOpen ? undefined : selectedColor?.toUpperCase()
  const hasError =
    input?.showError === true && !isValid && input.errorText !== undefined
  const { isMobile } = useBreakpoints()
  const { avatar, icon, cols, gap, touch } =
    sizes[size ?? (isMobile ? 'medium' : 'small')]
  // `inset` starts inside a border: the custom button has one of 1 px
  const makeTouchAreaSx = (border: number): Record<string, object> => ({
    [TOUCH_MEDIA]: {
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: (avatar - touch) / 2 - border
      }
    }
  })

  return (
    <>
      <ColorListRoot cols={cols} rowHeight={avatar} gap={gap} {...props}>
        {colors.map(color => (
          <ImageListItem key={color}>
            <ButtonBase
              component="div"
              className="u-bdrs-circle"
              sx={makeTouchAreaSx(0)}
              aria-label={getColorLabel?.(color) ?? color}
              aria-pressed={shownColor === color}
              onClick={() => {
                if (isOpen) setIsOpen(false)
                onClick?.(color)
              }}
            >
              <Avatar color={color} size={avatar}>
                {shownColor === color ? <Icon icon={Check} size={icon} /> : ' '}
              </Avatar>
            </ButtonBase>
          </ImageListItem>
        ))}
        {isCustomEnabled && (
          <ImageListItem>
            <ButtonBase
              aria-label={input?.label}
              aria-pressed={input === undefined ? undefined : isOpen}
              {...customButtonProps}
              onClick={event => {
                if (input !== undefined && !isOpen) setIsOpen(true)
                onCustomClick?.(event)
              }}
              sx={{
                width: avatar,
                height: avatar,
                borderRadius: '50%',
                border: '1px solid transparent',
                backgroundImage:
                  'linear-gradient(#fff, #fff), conic-gradient(from 0deg, #FB2C36, #AD46FF, #2B7FFF, #FB2C36)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                ...makeTouchAreaSx(1)
              }}
            >
              <Icon icon={Palette} size={icon} color="#000" />
            </ButtonBase>
          </ImageListItem>
        )}
      </ColorListRoot>
      {isOpen && (
        <TextField
          fullWidth
          className="u-mt-1"
          label={input?.label}
          value={text}
          inputRef={input?.inputRef}
          error={hasError}
          helperText={hasError ? input?.errorText : input?.helperText}
          onChange={event => {
            setText(event.target.value)
            const color = normalizeHexColor(event.target.value)
            if (color !== null) onClick?.(color)
          }}
          slotProps={{
            htmlInput: { 'data-testid': input?.['data-testid'] },
            formHelperText: hasError ? { role: 'alert' } : undefined
          }}
        />
      )}
    </>
  )
}

export default ColorList
