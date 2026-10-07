import { Pen } from '@linagora/twake-icons'

import { makeAppWebLink } from './helpers'
import { makeAction } from './makeAction'
import { getActionsI18n } from '../locales'
import { Action, ActionDocument, WebLinkActionOptions } from '../types'

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
