import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material'
import { mergeSlotProps } from '@mui/material/utils'
import React, { useState } from 'react'

import { Eye, EyeClosed, Icon } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import ru from './locales/ru.json'
import vi from './locales/vi.json'

const locales = { de, en, es, fr, it, ru, vi }

export type PasswordFieldProps = TextFieldProps

/** Password field with a button to show or hide its value */
const PasswordField = ({
  slotProps,
  ...props
}: PasswordFieldProps): React.ReactElement => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const [hidden, setHidden] = useState(true)

  return (
    <TextField
      type={hidden ? 'password' : 'text'}
      {...props}
      slotProps={{
        ...slotProps,
        input: mergeSlotProps(slotProps?.input, {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  hidden ? t('PasswordField.show') : t('PasswordField.hide')
                }
                disabled={props.disabled}
                onClick={() => setHidden(current => !current)}
                edge="end"
              >
                <Icon icon={hidden ? Eye : EyeClosed} />
              </IconButton>
            </InputAdornment>
          )
        })
      }}
    />
  )
}

export default PasswordField
