import { Alert, AlertTitle, Snackbar, SnackbarProps } from '@mui/material'
import React, { ReactNode, useMemo, useState } from 'react'

import { AlertContext, AlertContextValue, ShowAlertOptions } from './useAlert'

export interface AlertProviderProps {
  children?: ReactNode
}

interface AlertState extends ShowAlertOptions {
  open: boolean
}

const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [state, setState] = useState<AlertState>({ message: '', open: false })
  const {
    open,
    message,
    title,
    duration,
    noTimeOut,
    noClickAway,
    ...alertProps
  } = state

  const value = useMemo<AlertContextValue>(
    () => ({
      showAlert: (options): void => setState({ ...options, open: true })
    }),
    []
  )

  const close = (): void => setState(current => ({ ...current, open: false }))

  const handleSnackbarClose: SnackbarProps['onClose'] = (_event, reason) => {
    if (reason === 'clickaway' && noClickAway) return
    if (reason === 'timeout' && noTimeOut) return
    close()
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleSnackbarClose}
      >
        <Alert variant="filled" elevation={6} onClose={close} {...alertProps}>
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  )
}

export default AlertProvider
