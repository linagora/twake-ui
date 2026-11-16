import type React from 'react'

export interface DialogSectionsProps {
  title?: React.ReactNode
  content?: React.ReactNode
  actions?: React.ReactNode
  actionsLayout?: 'row' | 'column'
}
