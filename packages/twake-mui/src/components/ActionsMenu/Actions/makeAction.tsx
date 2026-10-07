import { Icon } from '@linagora/twake-icons'
import { ListItemIcon } from '@mui/material'
import React, { forwardRef } from 'react'

import ListItemText from '../../ListItemText'
import ActionsMenuItem from '../ActionsMenuItem'
import {
  Action,
  ActionComponent,
  ActionComponentProps,
  ActionComponentSlotProps
} from '../types'

export interface MakeActionComponentOptions {
  name: string
  label?: string
  icon?: Action['icon']
  componentProps?: ActionComponentSlotProps
}

export const makeActionComponent = ({
  name,
  label,
  icon,
  componentProps
}: MakeActionComponentOptions): ActionComponent => {
  const Component = forwardRef<HTMLElement, ActionComponentProps>(
    (props, ref) => (
      <ActionsMenuItem {...props} ref={ref}>
        <ListItemIcon>
          {icon !== undefined && <Icon {...componentProps?.Icon} icon={icon} />}
        </ListItemIcon>
        <ListItemText primary={label} {...componentProps?.ListItemText} />
      </ActionsMenuItem>
    )
  )

  Component.displayName = name

  return Component
}

export type MakeActionOptions = Omit<Action, 'Component'> &
  Partial<Pick<Action, 'Component'>>

/** Makes an action, with a default `Component` when none is given */
export const makeAction = ({
  Component,
  ...action
}: MakeActionOptions): Action => {
  return {
    ...action,
    Component: Component ?? makeActionComponent(action)
  }
}
