import { Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import { useAlert } from '../../providers/AlertProvider/useAlert'
import ConfirmDialog from './ConfirmDialog'
import { locales } from './locales'
import {
  SaveShortcut,
  checkAndSaveShortcut,
  makeHumanReadableFileName
} from './shortcutHelpers'

export interface ShortcutDialogProps {
  /** Shortcut to edit, which prefills the fields */
  shortcut?: { name?: string; url?: string }
  /** Called with the file name and the URL of the shortcut */
  onSave: SaveShortcut
  onClose: () => void
}

/** Creates or edits a shortcut to a URL. Must be rendered within an `AlertProvider` */
const ShortcutDialog = ({
  shortcut,
  onSave,
  onClose
}: ShortcutDialogProps): React.ReactElement => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const { showAlert } = useAlert()
  const isEditing = Boolean(shortcut)

  const [fileName, setFileName] = useState(
    makeHumanReadableFileName(shortcut?.name ?? '')
  )
  const [url, setUrl] = useState(shortcut?.url ?? '')

  const saveShortcut = (): void => {
    void checkAndSaveShortcut({
      fileName,
      url,
      isEditing,
      onSave,
      onClose,
      showAlert,
      t
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') saveShortcut()
  }

  return (
    <ConfirmDialog
      open
      title={t(
        isEditing
          ? 'Dialogs.shortcut.editTitle'
          : 'Dialogs.shortcut.createTitle'
      )}
      onClose={onClose}
      content={
        <Stack spacing={2}>
          <div>
            <TextField
              label={t('Dialogs.shortcut.url')}
              value={url}
              id="shortcuturl"
              onChange={event => setUrl(event.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              fullWidth
              margin="normal"
              autoFocus
            />
          </div>
          <div>
            <TextField
              label={t('Dialogs.shortcut.filename')}
              value={fileName}
              id="shortcutfilename"
              onChange={event => setFileName(event.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              fullWidth
              margin="normal"
            />
          </div>
        </Stack>
      }
      actions={
        <>
          <Button variant="outlined" onClick={onClose}>
            {t('Dialogs.shortcut.cancel')}
          </Button>
          <Button onClick={saveShortcut}>
            {t(isEditing ? 'Dialogs.shortcut.edit' : 'Dialogs.shortcut.create')}
          </Button>
        </>
      }
    />
  )
}

export default ShortcutDialog
