import type { AlertProps } from '@mui/material'
import { createContext, useContext } from 'react'

export interface ShowAlertOptions extends Omit<AlertProps, 'title'> {
  message: string
  title?: string
  /** Milliseconds before the alert hides, `null` to keep it open */
  duration?: number | null
  /** Ignores the timeout set by `duration` */
  noTimeOut?: boolean
  /** Keeps the alert open on a click outside of it */
  noClickAway?: boolean
}

export type ShowAlert = (options: ShowAlertOptions) => void

export interface AlertContextValue {
  showAlert: ShowAlert
}

export const AlertContext = createContext<AlertContextValue | null>(null)

export const useAlert = (): AlertContextValue => {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('useAlert must be used within a AlertProvider')
  }
  return context
}
