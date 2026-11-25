import { Copy } from '@linagora/twake-icons'

import { writeToClipboard } from '../../../lib/writeToClipboard.js'
import { ShowAlert } from '../../../providers/AlertProvider/useAlert.js'
import { getActionsI18n } from '../locales/index.js'
import { Action, ActionCallbackOptions } from '../types.js'
import { makeAction } from './makeAction.js'

interface CopyToClipboardCallbackOptions extends ActionCallbackOptions {
  showAlert: ShowAlert
  copyValue?: string
  /** The clicked item, from the click event spread into the options */
  currentTarget?: Element | null
}

export const copyToClipboard = (): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'copyToClipboard',
    label: t('ActionsMenu.copyToClipboard.copy'),
    icon: Copy,
    action: async (
      _docs,
      { showAlert, copyValue, currentTarget }: CopyToClipboardCallbackOptions
    ): Promise<boolean> => {
      if (!copyValue) return false

      try {
        await writeToClipboard(copyValue, currentTarget)
        showAlert({
          message: t('ActionsMenu.copyToClipboard.success'),
          severity: 'success',
          variant: 'filled'
        })
        return true
      } catch {
        showAlert({
          message: t('ActionsMenu.copyToClipboard.error'),
          severity: 'error',
          variant: 'filled'
        })
        return false
      }
    }
  })
}
