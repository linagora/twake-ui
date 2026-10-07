import { Email } from '@linagora/twake-icons'

import { makeAction } from './makeAction'
import { getActionsI18n } from '../locales'
import { Action, ActionDocument } from '../types'

export const emailTo = (): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'emailTo',
    label: t('ActionsMenu.emailTo'),
    icon: Email,
    action: (docs: ActionDocument[]): void => {
      const target = docs[0]?.email?.[0]?.address
      if (target) window.open(`mailto:${target}`, '_self')
    }
  })
}
