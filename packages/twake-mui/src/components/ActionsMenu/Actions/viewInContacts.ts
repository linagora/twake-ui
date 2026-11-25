import { Openapp } from '@linagora/twake-icons'

import { getActionsI18n } from '../locales/index.js'
import { Action, ActionDocument, WebLinkActionOptions } from '../types.js'
import { makeAppWebLink } from './helpers.js'
import { makeAction } from './makeAction.js'

export const viewInContacts = ({
  client,
  generateWebLink
}: WebLinkActionOptions): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'viewInContacts',
    label: t('ActionsMenu.viewInContacts'),
    icon: Openapp,
    action: (docs: ActionDocument[]): void => {
      const webLink = makeAppWebLink({
        client,
        generateWebLink,
        slug: 'contacts',
        hash: `/${docs[0]._id}`
      })

      window.open(webLink, '_blank')
    }
  })
}
