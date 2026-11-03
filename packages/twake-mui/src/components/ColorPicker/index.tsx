import React, { useRef, useState } from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import ColorList, { ColorListProps } from '../ColorList'
import { COLORS, toHex } from '../ColorList/helpers'
import ColorPickerCustom from '../ColorPickerCustom'
import { locales } from './locales'

export interface ColorPickerProps extends Omit<
  ColorListProps,
  'selectedColor' | 'customColorProps' | 'onClick' | 'onChange'
> {
  color?: string
  onChange?: (color: string) => void
}

/** `ColorList`, whose custom button opens `ColorPickerCustom` in its place */
const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  extraColors = [],
  ...props
}) => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const [isCustom, setIsCustom] = useState(false)
  // Back from ColorPickerCustom, the focus goes to the button that opened it
  const isReturning = useRef(false)
  const selected = toHex(color ?? '')
  const isOtherColor =
    selected !== null &&
    ![...COLORS, ...extraColors].some(
      listed => (toHex(listed) ?? listed) === selected
    )

  const close = (): void => {
    isReturning.current = true
    setIsCustom(false)
  }

  if (isCustom) {
    return (
      <ColorPickerCustom
        color={color}
        autoFocus
        onCancel={close}
        onSave={saved => {
          close()
          onChange?.(saved)
        }}
      />
    )
  }
  return (
    <ColorList
      {...props}
      extraColors={extraColors}
      selectedColor={color}
      onClick={onChange}
      customColorProps={{
        enabled: true,
        'aria-label': t('ColorPicker.custom'),
        'aria-pressed': isOtherColor,
        ref: button => {
          if (button !== null && isReturning.current) {
            isReturning.current = false
            button.focus()
          }
        },
        onClick: () => {
          setIsCustom(true)
        }
      }}
    />
  )
}

export default ColorPicker
