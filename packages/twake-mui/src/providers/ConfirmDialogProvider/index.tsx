import React, { ReactNode, useMemo, useState } from 'react'

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog'
import {
  ConfirmDialogContext,
  ConfirmDialogContextValue,
  ShowConfirmDialogOptions
} from './useConfirmDialog'

export interface ConfirmDialogProviderProps {
  children?: ReactNode
}

interface ConfirmDialogState extends ShowConfirmDialogOptions {
  open: boolean
}

const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = ({
  children
}) => {
  const [state, setState] = useState<ConfirmDialogState>({ open: false })
  const { open, ...confirmDialogProps } = state

  const value = useMemo<ConfirmDialogContextValue>(
    () => ({
      showConfirmDialog: (options): void =>
        setState({ ...options, open: true }),
      closeConfirmDialog: (): void =>
        setState(current => ({ ...current, open: false }))
    }),
    []
  )

  return (
    <ConfirmDialogContext.Provider value={value}>
      {children}
      {open && (
        <ConfirmDialog
          open
          onClose={value.closeConfirmDialog}
          {...confirmDialogProps}
        />
      )}
    </ConfirmDialogContext.Provider>
  )
}

export default ConfirmDialogProvider
