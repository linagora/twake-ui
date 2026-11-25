import { Telephone } from '@linagora/twake-icons'

import { getActionsI18n } from '../locales/index.js'
import { Action, ActionDocument } from '../types.js'
import { makeAction } from './makeAction.js'

export const call = (): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'call',
    label: t('ActionsMenu.call'),
    icon: Telephone,
    action: (docs: ActionDocument[]): void => {
      const target = docs[0]?.phone?.[0]?.number
      if (target) window.open(`tel:${target}`, '_self')
    }
  })
}
