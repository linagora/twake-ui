import React, { forwardRef, useMemo } from 'react'

import { useWebviewIntent } from 'cozy-intent'
import { useI18n } from 'twake-i18n'

import { ListItemSize } from '../ListItem'
import { getActionName, getOnlyNeededActions } from './helpers'
import { ActionComponent, ActionDocument, ActionObject } from './types'

export interface ActionsItemsProps {
  docs: ActionDocument[]
  actions: ActionObject[]
  /** Options passed to the `action` method of every action */
  actionOptions?: Record<string, unknown>
  /** Renders every action with this component instead of its own */
  component?: ActionComponent
  /** Called after any action is clicked */
  onClick?: () => void
  isListItem?: boolean
  size?: ListItemSize
}

const ActionsItems = forwardRef<HTMLElement, ActionsItemsProps>(
  (
    {
      docs,
      actions,
      actionOptions,
      component,
      onClick: overriddenClick,
      ...props
    },
    ref
  ) => {
    const webviewIntent = useWebviewIntent()
    const { t } = useI18n()

    const cleanedActions = useMemo(
      () => getOnlyNeededActions(actions, docs),
      [actions, docs]
    )

    return cleanedActions.map((actionObject, idx) => {
      const actionName = getActionName(actionObject)
      const actionDefinition = actionObject[actionName]
      const { Component: ActionComponent, disabled } = actionDefinition

      const handleClick = (clickProps?: object): void => {
        actionDefinition.action?.(docs, {
          t,
          webviewIntent,
          ...actionOptions,
          ...clickProps
        })
        overriddenClick?.()
      }

      const Component = component ?? ActionComponent

      return (
        <Component
          {...props}
          ref={ref}
          key={actionName + idx}
          action={actionDefinition}
          docs={docs}
          autoFocus={idx === 0}
          disabled={disabled?.(docs)}
          onClick={handleClick}
        />
      )
    })
  }
)

ActionsItems.displayName = 'ActionsItems'

export default ActionsItems
