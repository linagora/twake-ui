import { PopoverOrigin } from '@mui/material'
import React, { forwardRef } from 'react'

import ActionsItems, { ActionsItemsProps } from './ActionsItems'
import ActionsMenuWrapper, {
  ActionsMenuWrapperProps
} from './ActionsMenuWrapper'
import { ActionDocument, ActionObject } from './types'

export interface ActionsMenuComponentsProps {
  actionsItems?: Pick<ActionsItemsProps, 'actionOptions' | 'onClick'>
}

export interface ActionsMenuProps extends ActionsMenuWrapperProps {
  docs?: ActionDocument[]
  actions?: ActionObject[]
  anchorOrigin?: PopoverOrigin
  autoCloseOnContextMenu?: boolean
  componentsProps?: ActionsMenuComponentsProps
}

const DEFAULT_ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left'
}

const computeTransformOrigin = ({
  vertical,
  horizontal
}: PopoverOrigin): PopoverOrigin => {
  const opposites: Record<string, PopoverOrigin['vertical']> = {
    bottom: 'top',
    top: 'bottom'
  }

  return { vertical: opposites[vertical] ?? vertical, horizontal }
}

/**
 * Menu of actions, displayed as a bottom sheet on mobile. The `ref` is the
 * element the menu is anchored to on desktop.
 */
const ActionsMenu = forwardRef<HTMLElement, ActionsMenuProps>(
  (
    {
      docs = [],
      actions = [],
      anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
      autoClose = true,
      autoCloseOnContextMenu = true,
      componentsProps = {},
      children,
      onClose,
      ...props
    },
    ref
  ) => {
    const getAnchorEl = (): HTMLElement | null =>
      ref && typeof ref === 'object' ? ref.current : null

    const handleContextMenu = (event: React.MouseEvent): void => {
      event.preventDefault()
      onClose?.()
    }

    return (
      <ActionsMenuWrapper
        {...props}
        anchorEl={getAnchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={computeTransformOrigin(anchorOrigin)}
        keepMounted
        autoClose={autoClose}
        {...(autoCloseOnContextMenu && { onContextMenu: handleContextMenu })}
        onClose={onClose}
      >
        {children}
        <ActionsItems
          {...componentsProps.actionsItems}
          docs={docs}
          actions={actions}
        />
      </ActionsMenuWrapper>
    )
  }
)

ActionsMenu.displayName = 'ActionsMenu'

export default ActionsMenu
