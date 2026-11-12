import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { mergeSlotProps, useForkRef } from '@mui/material/utils'
import React, { useRef } from 'react'

import { CalendarToday, ClockOutline, Icon } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import ru from './locales/ru.json'
import vi from './locales/vi.json'

const locales = { de, en, es, fr, it, ru, vi }

export type DateTimeFieldProps = Omit<TextFieldProps, 'type'> & {
  type: 'date' | 'time'
  /** The name of the button opening the picker, by default "Choose a date" or "Choose a time" */
  pickerLabel?: string
}

// Chromium hides the button the browser draws, WebKit draws none; Gecko
// (told by a pseudo-element of its own) draws one no CSS hides, and keeps it
const canHideNativePicker = (): boolean =>
  !(
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('selector(::-moz-range-thumb)')
  )

const OwnPickerTextField = styled(TextField)({
  '& input::-webkit-calendar-picker-indicator': { display: 'none' }
})

const openPicker = (input: HTMLInputElement | null): void => {
  if (input === null) return
  input.focus()
  try {
    input.showPicker()
  } catch {
    // Older Safari and Firefox: the focused field takes the typing
  }
}

/**
 * A date or time field whose picker button is a twake-icons button, with a
 * name, opening the picker of the browser (where it can hide its own)
 */
const DateTimeField = ({
  type,
  pickerLabel,
  inputRef,
  slotProps,
  ...props
}: DateTimeFieldProps): React.ReactElement => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const input = useRef<HTMLInputElement | null>(null)
  const handleInputRef = useForkRef(inputRef, input)
  const label = pickerLabel ?? t(`DateTimeField.${type}`)

  if (!canHideNativePicker()) {
    return (
      <TextField
        type={type}
        inputRef={inputRef}
        slotProps={slotProps}
        {...props}
      />
    )
  }
  return (
    <OwnPickerTextField
      type={type}
      inputRef={handleInputRef}
      {...props}
      slotProps={{
        ...slotProps,
        input: mergeSlotProps(slotProps?.input, {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={label}
                disabled={props.disabled}
                onClick={() => openPicker(input.current)}
                edge="end"
              >
                <Icon icon={type === 'date' ? CalendarToday : ClockOutline} />
              </IconButton>
            </InputAdornment>
          )
        })
      }}
    />
  )
}

export default DateTimeField
