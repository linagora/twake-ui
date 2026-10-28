import { Copy } from '@linagora/twake-icons'

import { ShowAlert } from '../../../providers/AlertProvider/useAlert'
import { getActionsI18n } from '../locales'
import { Action, ActionCallbackOptions } from '../types'
import { makeAction } from './makeAction'

interface CopyToClipboardCallbackOptions extends ActionCallbackOptions {
  showAlert: ShowAlert
  copyValue?: string
}

export const copyToClipboard = (): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'copyToClipboard',
    label: t('ActionsMenu.copyToClipboard.copy'),
    icon: Copy,
    action: async (
      _docs,
      { showAlert, copyValue }: CopyToClipboardCallbackOptions
    ): Promise<boolean> => {
      if (!copyValue) return false

      try {
        await navigator.clipboard.writeText(copyValue)
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
