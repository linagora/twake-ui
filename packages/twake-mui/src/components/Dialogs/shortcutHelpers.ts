import type { ShowAlert } from '../../providers/AlertProvider/useAlert'

const SHORTCUT_EXTENSION = '.url'

export const isValidUrl = (url: string): boolean => {
  try {
    return Boolean(new URL(url))
  } catch {
    return false
  }
}

/** Returns the URL, prefixed with `https://` when it lacks a protocol, or `null` when it stays invalid */
export const makeValidUrl = (url: string): string | null => {
  if (isValidUrl(url)) return url
  if (isValidUrl(`https://${url}`)) return `https://${url}`
  return null
}

export const makeValidFileName = (fileName: string): string =>
  fileName.endsWith(SHORTCUT_EXTENSION)
    ? fileName
    : `${fileName}${SHORTCUT_EXTENSION}`

export const makeHumanReadableFileName = (fileName: string): string =>
  fileName.endsWith(SHORTCUT_EXTENSION)
    ? fileName.slice(0, -SHORTCUT_EXTENSION.length)
    : fileName

export type SaveShortcut = (
  fileName: string,
  url: string
) => void | Promise<void>

interface CheckAndSaveShortcutOptions {
  fileName: string
  url: string
  isEditing: boolean
  onSave: SaveShortcut
  onClose: () => void
  showAlert: ShowAlert
  t: (key: string) => string
}

/** Saves the shortcut once its name and URL are valid, and reports the outcome in an alert */
export const checkAndSaveShortcut = async ({
  fileName,
  url,
  isEditing,
  onSave,
  onClose,
  showAlert,
  t
}: CheckAndSaveShortcutOptions): Promise<void> => {
  if (!fileName || !url) {
    showAlert({ message: t('Dialogs.shortcut.needsInfo'), severity: 'error' })
    return
  }

  const validUrl = makeValidUrl(url)

  if (!validUrl) {
    showAlert({
      message: t('Dialogs.shortcut.urlBadFormat'),
      severity: 'error'
    })
    return
  }

  try {
    await onSave(makeValidFileName(fileName), validUrl)
    showAlert({
      message: t(
        isEditing ? 'Dialogs.shortcut.edited' : 'Dialogs.shortcut.created'
      ),
      severity: 'success'
    })
  } catch {
    showAlert({ message: t('Dialogs.shortcut.errored'), severity: 'error' })
  }

  onClose()
}
