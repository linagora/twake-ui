import { Divider } from '@mui/material'
import React, { forwardRef } from 'react'

import { Action, ActionComponentProps } from '../types'

const DividerAction = forwardRef<HTMLElement, ActionComponentProps>(
  (_props, ref) => (
    <Divider ref={ref as React.Ref<HTMLHRElement>} sx={{ my: 1 }} />
  )
)

DividerAction.displayName = 'divider'

export const divider = (): Action => {
  return { name: 'divider', Component: DividerAction }
}
