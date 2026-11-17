import { Copy } from '@linagora/twake-icons'

import { writeToClipboard } from '../../../lib/writeToClipboard'
import { ShowAlert } from '../../../providers/AlertProvider/useAlert'
import { getActionsI18n } from '../locales'
import { Action, ActionCallbackOptions } from '../types'
import { makeAction } from './makeAction'

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
