import { Download } from '@linagora/twake-icons'
import type { WebviewService } from 'cozy-intent'

import { getActionsI18n } from '../locales'
import { Action, ActionCallbackOptions, ActionDocument } from '../types'
import { makeAction } from './makeAction'

export interface DownloadFileOptions<Client> {
  client: Client
  file: ActionDocument
  webviewIntent?: WebviewService
  driveId?: string
}

export interface DownloadActionOptions<Client> {
  client: Client
  downloadFile: (options: DownloadFileOptions<Client>) => unknown
}

interface DownloadCallbackOptions extends ActionCallbackOptions {
  driveId?: string
}

export const download = <Client>({
  client,
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
        webviewIntent,
        driveId
      })
  })
}
