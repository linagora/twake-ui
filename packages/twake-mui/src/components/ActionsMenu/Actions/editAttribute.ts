import { TextInfo } from '@linagora/twake-icons'

import { makeAction } from './makeAction'
import { getActionsI18n } from '../locales'
import { Action, ActionCallbackOptions, ActionDocument } from '../types'

interface EditAttributeCallbackOptions extends ActionCallbackOptions {
  editAttributeCallback: (docs: ActionDocument[]) => unknown
}

export const editAttribute = (): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'editAttribute',
    label: t('ActionsMenu.editAttribute'),
    icon: TextInfo,
    action: (
      docs: ActionDocument[],
      { editAttributeCallback }: EditAttributeCallbackOptions
    ): unknown => editAttributeCallback(docs)
  })
}
