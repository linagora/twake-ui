import { Download } from '@linagora/twake-icons'

import { getActionsI18n } from '../locales/index.js'
import {
  Action,
  ActionCallbackOptions,
  ActionDocument,
  WebviewIntent
} from '../types.js'
import { makeAction } from './makeAction.js'

export interface DownloadFileOptions<Client> {
  client: Client
  file: ActionDocument
  webviewIntent?: WebviewIntent
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
