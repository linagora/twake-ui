import { Dots } from '@linagora/twake-icons'

import { makeAction } from './makeAction'
import { getActionsI18n } from '../locales'
import { Action } from '../types'

export const others = (): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'others',
    label: t('ActionsMenu.others'),
    icon: Dots
  })
}
