import { createContext, useContext } from 'react'

import type { ConfirmDialogProps } from '../../components/Dialogs/ConfirmDialog'

export type ShowConfirmDialogOptions = Omit<ConfirmDialogProps, 'open'>

export interface ConfirmDialogContextValue {
  showConfirmDialog: (options: ShowConfirmDialogOptions) => void
  closeConfirmDialog: () => void
}

export const ConfirmDialogContext =
  createContext<ConfirmDialogContextValue | null>(null)

export const useConfirmDialog = (): ConfirmDialogContextValue => {
  const context = useContext(ConfirmDialogContext)

  if (!context) {
    throw new Error(
      'useConfirmDialog must be used within a ConfirmDialogProvider'
    )
  }
  return context
}
