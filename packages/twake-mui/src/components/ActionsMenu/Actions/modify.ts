import { Pen } from '@linagora/twake-icons'

import { getActionsI18n } from '../locales/index.js'
import { Action, ActionDocument, WebLinkActionOptions } from '../types.js'
import { makeAppWebLink } from './helpers.js'
import { makeAction } from './makeAction.js'

export const modify = ({
  client,
  generateWebLink
}: WebLinkActionOptions): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'modify',
    label: t('ActionsMenu.modify'),
    icon: Pen,
    action: (docs: ActionDocument[]): void => {
      const webLink = makeAppWebLink({
        client,
        generateWebLink,
        slug: 'contacts',
        hash: `/${docs[0]._id}/edit`
      })

      window.open(webLink, '_blank')
    }
  })
}
