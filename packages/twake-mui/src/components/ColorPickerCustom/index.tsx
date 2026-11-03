import { FormHelperText, Stack, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useId, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

import { useExtendI18n, useI18n } from 'twake-i18n'

import Button from '../Button'
import { toHex } from '../ColorList/helpers'
import { locales } from './locales'

// The sizes of cozy-ui's ColorPickerCustom
const ColorPickerCustomRoot = styled('form')({
  '& .react-colorful': { width: 246, height: 140 },
  '& .react-colorful__saturation': { borderRadius: 0 },
  '& .react-colorful__hue': { height: 18, borderRadius: 0, marginTop: 20 },
  '& .react-colorful__pointer': { width: 20, height: 20, borderWidth: 1 }
})

const HexField = styled(TextField)({ width: 96 })

export interface ColorPickerCustomProps {
  className?: string
  color?: string
  /** Gets the color it was opened with */
  onCancel?: (color?: string) => void
  onSave?: (color: string) => void
}

const ColorPickerCustom: React.FC<ColorPickerCustomProps> = ({
  className,
  color,
  onCancel,
  onSave
}) => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const fieldId = useId()
  const errorId = useId()
  const [newColor, setNewColor] = useState(toHex(color ?? '') ?? '')
  const [text, setText] = useState(newColor)
  const isValid = toHex(text) !== null
  // Nothing typed yet is not an error, but nothing to save either
  const hasError = !isValid && text.trim() !== ''

  return (
    <ColorPickerCustomRoot
      className={className}
      onKeyDown={event => {
        if (event.key !== 'Escape') return
        // A dialog around it stays open
        event.stopPropagation()
        onCancel?.(color)
      }}
      onSubmit={event => {
        event.preventDefault()
        if (isValid) onSave?.(newColor)
      }}
    >
      <Stack spacing={2}>
        <HexColorPicker
          color={newColor}
          onChange={picked => {
            setNewColor(picked.toUpperCase())
            setText(picked.toUpperCase())
          }}
        />
        <Stack direction="row" spacing={1} className="u-flex-items-baseline">
          <Typography component="label" variant="h6" htmlFor={fieldId}>
            Hex
          </Typography>
          <HexField
            id={fieldId}
            size="small"
            value={text}
            error={hasError}
            slotProps={{
              htmlInput: { 'aria-describedby': hasError ? errorId : undefined }
            }}
            onChange={event => {
              setText(event.target.value)
              const typed = toHex(event.target.value)
              if (typed !== null) setNewColor(typed)
            }}
          />
        </Stack>
        {hasError ? (
          <FormHelperText id={errorId} error>
            {t('ColorPickerCustom.invalid')}
          </FormHelperText>
        ) : null}
        <Stack direction="row" spacing={1} className="u-flex-justify-end">
          <Button variant="text" onClick={() => onCancel?.(color)}>
            {t('ColorPickerCustom.cancel')}
          </Button>
          <Button type="submit" variant="contained" disabled={!isValid}>
            {t('ColorPickerCustom.submit')}
          </Button>
        </Stack>
      </Stack>
    </ColorPickerCustomRoot>
  )
}

export default ColorPickerCustom
