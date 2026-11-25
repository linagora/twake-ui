import { Comment } from '@linagora/twake-icons'

import { getActionsI18n } from '../locales/index.js'
import { Action, ActionDocument } from '../types.js'
import { makeAction } from './makeAction.js'

export const smsTo = (): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'smsTo',
    label: t('ActionsMenu.smsTo'),
    icon: Comment,
    action: (docs: ActionDocument[]): void => {
      const target = docs[0]?.phone?.[0]?.number
      if (target) window.open(`sms:${target}`, '_self')
    }
  })
}
