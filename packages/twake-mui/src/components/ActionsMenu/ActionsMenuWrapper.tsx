import { Menu, MenuProps, Paper } from '@mui/material'
import React, { Children, cloneElement, isValidElement } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import BottomSheet from '../BottomSheet'
import { ListItemSize } from '../ListItem'

interface ItemProps {
  isListItem?: boolean
  size?: ListItemSize
  autoFocus?: boolean
  onClick?: (clickProps?: object) => void
}

export interface ActionsMenuWrapperProps extends Omit<
  MenuProps,
  'open' | 'onClose'
> {
  open?: boolean
  /** Closes the menu when an item is clicked */
  autoClose?: boolean
  onClose?: () => void
}

const getComponentName = (node: React.ReactNode): string | null => {
  if (!isValidElement(node) || typeof node.type === 'string') return null

  const type = node.type as { displayName?: string; name?: string }

  return type.displayName ?? type.name ?? null
}

/** Renders its items in a menu on desktop, in a bottom sheet on mobile */
const ActionsMenuWrapper = ({
  children,
  autoClose,
  open = false,
  onClose,
  ...props
}: ActionsMenuWrapperProps): React.JSX.Element | null => {
  const { isMobile } = useBreakpoints()

  const makeClickHandler =
    (itemProps: ItemProps) =>
    (clickProps?: object): void => {
      itemProps.onClick?.(clickProps)
      if (autoClose) onClose?.()
    }

  if (isMobile) {
    if (!open) return null

    return (
      <BottomSheet backdrop onClose={onClose}>
        <Paper square>
          {Children.map(children, child =>
            isValidElement<ItemProps>(child)
              ? cloneElement(child, {
                  isListItem: true,
                  size: 'small',
                  onClick: makeClickHandler(child.props)
                })
              : null
          )}
        </Paper>
      </BottomSheet>
    )
  }

  const items = Children.toArray(children)
  // Keeps the focus on the first action, as the mobile header renders nothing here
  const isFirstItemMobileHeader =
    getComponentName(items[0]) === 'ActionsMenuMobileHeader'

  return (
    <Menu {...props} open={open} onClose={onClose}>
      {Children.map(children, (child, idx) =>
        isValidElement<ItemProps>(child)
          ? cloneElement(child, {
              autoFocus:
                isFirstItemMobileHeader && idx === 1 ? true : undefined,
              onClick: makeClickHandler(child.props)
            })
          : null
      )}
    </Menu>
  )
}

export default ActionsMenuWrapper
