import { Comment } from '@linagora/twake-icons'

import { makeAction } from './makeAction'
import { getActionsI18n } from '../locales'
import { Action, ActionDocument } from '../types'

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
