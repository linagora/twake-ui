import { Printer } from '@linagora/twake-icons'

import { FetchBlobFileById, makeBase64FromFile, makePdfBlob } from './helpers'
import { logger } from './logger'
import { makeAction } from './makeAction'
import { getActionsI18n } from '../locales'
import { Action, ActionCallbackOptions, ActionDocument } from '../types'

export interface PrintClient {
  collection: (doctype: 'io.cozy.files') => {
    getDownloadLinkById: (id: string, filename?: string) => Promise<string>
  }
}

export interface PrintActionOptions<Client extends PrintClient> {
  client: Client
  fetchBlobFileById: FetchBlobFileById<Client>
  isFile: (doc: ActionDocument) => boolean
}

export const print = <Client extends PrintClient>({
  client,
  fetchBlobFileById,
  isFile
}: PrintActionOptions<Client>): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'print',
    label: t('ActionsMenu.print'),
    icon: Printer,
    disabled: docs => docs.length === 0,
    displayCondition: docs => docs.every(doc => isFile(doc)),
    action: async (
      docs: ActionDocument[],
      { webviewIntent }: ActionCallbackOptions
    ): Promise<unknown> => {
      const [firstDoc] = docs
      const isSingleDoc = docs.length === 1

      try {
        if (webviewIntent) {
          const blob = isSingleDoc
            ? await fetchBlobFileById(client, firstDoc._id)
            : await makePdfBlob({ client, docs, fetchBlobFileById })
          const base64 = await makeBase64FromFile(blob)

          return await webviewIntent.call('print', base64)
        }

        const docUrl = isSingleDoc
          ? await client
              .collection('io.cozy.files')
              .getDownloadLinkById(firstDoc._id, firstDoc.name)
          : URL.createObjectURL(
              await makePdfBlob({ client, docs, fetchBlobFileById })
            )

        // Safari blocks window.open called from an async function
        setTimeout(() => {
          window.open(docUrl, '_blank')
        })

        return docUrl
      } catch (error: unknown) {
        logger.error(
          `Error trying to print document ${
            webviewIntent ? 'inside' : 'outside'
          } the native app: ${JSON.stringify(error)}`
        )
        return null
      }
    }
  })
}
