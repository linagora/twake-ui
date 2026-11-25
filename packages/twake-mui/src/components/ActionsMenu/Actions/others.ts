import { Dots } from '@linagora/twake-icons'

import { getActionsI18n } from '../locales/index.js'
import { Action } from '../types.js'
import { makeAction } from './makeAction.js'

export const others = (): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'others',
    label: t('ActionsMenu.others'),
    icon: Dots
  })
}
