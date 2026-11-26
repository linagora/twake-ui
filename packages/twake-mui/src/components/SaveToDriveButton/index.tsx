import {
  CircularProgress,
  IconButton,
  IconButtonProps,
  Tooltip
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

import { AddToCloud, CheckCircle, Icon } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import de from './locales/de.json' with { type: 'json' }
import en from './locales/en.json' with { type: 'json' }
import es from './locales/es.json' with { type: 'json' }
import fr from './locales/fr.json' with { type: 'json' }
import it from './locales/it.json' with { type: 'json' }
import ru from './locales/ru.json' with { type: 'json' }
import vi from './locales/vi.json' with { type: 'json' }

const locales = { de, en, es, fr, it, ru, vi }

export type SaveToDriveStatus = 'idle' | 'saving' | 'saved'

export interface SaveToDriveButtonProps extends Omit<
  IconButtonProps,
  'children' | 'onClick' | 'loading'
> {
  status: SaveToDriveStatus
  onSave: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Without it, `saved` is a status, not a button */
  onOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SavedStatus = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  padding: 5,
  color: theme.vars.palette.success.main
}))

const SaveToDriveButton = ({
  status,
  size = 'xsmall',
  onSave,
  onOpen,
  ...props
}: SaveToDriveButtonProps): React.ReactElement => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const savedLabel = t('SaveToDriveButton.saved')
  // Mounted from the first render: a region created with its message may not be announced
  const announcement = (
    <span className="u-visuallyhidden" role="status">
      {status === 'saved' ? savedLabel : ''}
    </span>
  )

  if (status === 'saved' && onOpen === undefined) {
    const { className, id, sx } = props
    // Only what a span takes: the button props would reach the DOM
    const dataAttributes = Object.fromEntries(
      Object.entries(props).filter(([key]) => key.startsWith('data-'))
    )
    return (
      <>
        {announcement}
        <Tooltip title={savedLabel}>
          <SavedStatus
            className={className}
            id={id}
            {...dataAttributes}
            sx={sx}
          >
            <Icon icon={CheckCircle} size={18} />
          </SavedStatus>
        </Tooltip>
      </>
    )
  }

  const label = t(
    status === 'saved'
      ? 'SaveToDriveButton.open'
      : `SaveToDriveButton.${status}`
  )
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (status === 'idle') onSave(event)
    else if (status === 'saved') onOpen?.(event)
    // A click while it saves must not reach a clickable parent either
    else event.stopPropagation()
  }

  return (
    <>
      {announcement}
      <Tooltip title={label}>
        {/* MUI's `loading` sets `disabled`, which drops the focus while it saves */}
        <IconButton
          aria-label={label}
          aria-disabled={status === 'saving' ? true : undefined}
          color={status === 'saved' ? 'success' : 'default'}
          size={size}
          {...props}
          onClick={handleClick}
        >
          {status === 'saving' ? (
            <CircularProgress size={18} aria-hidden="true" />
          ) : (
            <Icon
              icon={status === 'saved' ? CheckCircle : AddToCloud}
              size={status === 'saved' ? 18 : 16}
            />
          )}
        </IconButton>
      </Tooltip>
    </>
  )
}

export default SaveToDriveButton
