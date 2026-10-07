import { FolderOpen } from '@linagora/twake-icons'

import { makeAppWebLink } from './helpers'
import { makeAction } from './makeAction'
import { getActionsI18n } from '../locales'
import { Action, ActionDocument, WebLinkActionOptions } from '../types'

export const viewInDrive = ({
  client,
  generateWebLink
}: WebLinkActionOptions): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'viewInDrive',
    label: t('ActionsMenu.viewInDrive'),
    icon: FolderOpen,
    action: (docs: ActionDocument[]): void => {
      const { dir_id: dirId, driveId } = docs[0]
      const webLink = makeAppWebLink({
        client,
        generateWebLink,
        slug: 'drive',
        hash: driveId ? `shareddrive/${driveId}/${dirId}` : `folder/${dirId}`
      })

      window.open(webLink, '_blank')
    }
  })
}
