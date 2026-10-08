import { Openapp } from '@linagora/twake-icons'

import { makeAppWebLink } from './helpers'
import { makeAction } from './makeAction'
import { getActionsI18n } from '../locales'
import { Action, ActionDocument, WebLinkActionOptions } from '../types'

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
