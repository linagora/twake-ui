import { TextInfo } from '@linagora/twake-icons'

import { getActionsI18n } from '../locales/index.js'
import { Action, ActionCallbackOptions, ActionDocument } from '../types.js'
import { makeAction } from './makeAction.js'

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
