import { Star, StarOutline } from '@linagora/twake-icons'

import { makeAction } from './makeAction'
import { getActionsI18n } from '../locales'
import { Action, ActionDocument, ShowAlert } from '../types'

export interface FavoritesActionOptions {
  client: { save: (doc: ActionDocument) => Promise<unknown> }
  showAlert: ShowAlert
  splitFilename: (doc: ActionDocument) => { filename: string }
}

interface FavoriteActionSettings extends FavoritesActionOptions {
  favorite: boolean
}

const makeFavoriteAction = ({
  favorite,
  client,
  showAlert,
  splitFilename
}: FavoriteActionSettings): Action => {
  const { t } = getActionsI18n()
  const scope = favorite ? 'add' : 'remove'

  return makeAction({
    name: favorite ? 'addToFavorites' : 'removeFromFavorites',
    label: t(`ActionsMenu.favorites.${scope}.label`),
    icon: favorite ? StarOutline : Star,
    displayCondition: docs =>
      docs.length > 0 &&
      docs.every(doc => !!doc.cozyMetadata?.favorite !== favorite),
    action: async (docs: ActionDocument[]): Promise<void> => {
      try {
        for (const doc of docs) {
          await client.save({
            ...doc,
            cozyMetadata: { ...doc.cozyMetadata, favorite }
          })
        }

        const { filename } = splitFilename(docs[0])
        showAlert({
          message: t(`ActionsMenu.favorites.${scope}.success`, {
            filename,
            smart_count: docs.length
          }),
          severity: 'success'
        })
      } catch {
        showAlert({
          message: t('ActionsMenu.favorites.error'),
          severity: 'error'
        })
      }
    }
  })
}

export const addToFavorites = (options: FavoritesActionOptions): Action => {
  return makeFavoriteAction({ ...options, favorite: true })
}

export const removeFromFavorites = (
  options: FavoritesActionOptions
): Action => {
  return makeFavoriteAction({ ...options, favorite: false })
}
