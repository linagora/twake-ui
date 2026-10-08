import { Download } from '@linagora/twake-icons'

import type { WebviewService } from 'cozy-intent'

import { makeAction } from './makeAction'
import { getActionsI18n } from '../locales'
import { Action, ActionCallbackOptions, ActionDocument } from '../types'

export interface DownloadFileOptions<Client> {
  client: Client
  file: ActionDocument
  url?: string
  webviewIntent?: WebviewService
  driveId?: string
}

export interface DownloadActionOptions<Client> {
  client: Client
  encryptedUrl?: string
  downloadFile: (options: DownloadFileOptions<Client>) => unknown
}

interface DownloadCallbackOptions extends ActionCallbackOptions {
  driveId?: string
}

export const download = <Client>({
  client,
  encryptedUrl,
  downloadFile
}: DownloadActionOptions<Client>): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'download',
    label: t('ActionsMenu.download'),
    icon: Download,
    action: (
      docs: ActionDocument[],
      { webviewIntent, driveId }: DownloadCallbackOptions
    ): unknown =>
      downloadFile({
        client,
        file: docs[0],
        url: encryptedUrl,
        webviewIntent,
        driveId
      })
  })
}
