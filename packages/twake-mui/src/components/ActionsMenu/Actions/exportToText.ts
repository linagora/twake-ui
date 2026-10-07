import { Export } from '@linagora/twake-icons'

import { downloadBlob } from './helpers'
import { logger } from './logger'
import { makeAction } from './makeAction'
import { makePdfBlobFromText } from './pdfHelpers'
import { getActionsI18n } from '../locales'
import { Action, ActionDocument } from '../types'

export interface ExportToTextActionOptions {
  exportedText?: string
  file?: ActionDocument
}

export const exportToText = ({
  exportedText,
  file
}: ExportToTextActionOptions): Action => {
  const { t } = getActionsI18n()

  return makeAction({
    name: 'exportToText',
    label: t('ActionsMenu.exportToText'),
    icon: Export,
    displayCondition: () => !!exportedText,
    action: async (): Promise<boolean> => {
      try {
        const blob = await makePdfBlobFromText(exportedText ?? '')
        const baseName = file?.name
          ? `${file.name.replace(/\.[^/.]+$/, '')}_export`
          : 'export'

        return downloadBlob(blob, `${baseName}.pdf`)
      } catch (error: unknown) {
        logger.error(error)
        return false
      }
    }
  })
}
