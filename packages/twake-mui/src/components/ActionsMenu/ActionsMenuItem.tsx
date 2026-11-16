import { MenuItem, MenuItemProps, SxProps, Theme } from '@mui/material'
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement
} from 'react'

import { ListItemSize } from '../ListItem'
import ListItemButton from '../ListItemButton'
import ListItemText, { ListItemTextProps } from '../ListItemText'
import { Action, ActionDocument } from './types'

export interface ActionsMenuItemProps extends Omit<
  MenuItemProps,
  'ref' | 'onClick' | 'action'
> {
  /** Action rendered by the item, kept off the DOM */
  action?: Action
  /** Documents the action applies to, kept off the DOM */
  docs?: ActionDocument[]
  /** Renders a list item, as in a bottom sheet, instead of a menu item */
  isListItem?: boolean
  size?: ListItemSize
  onClick?: (clickProps?: object) => void
}

const NON_DOM_PROPS = ['t', 'f', 'lang']

const omitNonDomProps = (
  props: Record<string, unknown>
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !NON_DOM_PROPS.includes(key))
  )
}

const mergeSx = (
  style: SxProps<Theme>,
  sx: SxProps<Theme> | undefined
): SxProps<Theme> => {
  return [style, sx ?? false].flat()
}

const ActionsMenuItem = forwardRef<HTMLElement, ActionsMenuItemProps>(
  (
    { action: _action, docs: _docs, isListItem, size, sx, children, ...props },
    ref
  ) => {
    const domProps = omitNonDomProps(props)

    if (isListItem) {
      return (
        <ListItemButton
          {...domProps}
          ref={ref as React.Ref<HTMLDivElement>}
          size={size}
          ellipsis={false}
          sx={mergeSx({ wordBreak: 'break-word' }, sx)}
        >
          {children}
        </ListItemButton>
      )
    }

    return (
      <MenuItem
        {...domProps}
        ref={ref as React.Ref<HTMLLIElement>}
        sx={mergeSx({ minWidth: 256 }, sx)}
      >
        {Children.map(children, child =>
          isValidElement<ListItemTextProps>(child) &&
          child.type === ListItemText
            ? cloneElement(child, { ellipsis: false })
            : child
        )}
      </MenuItem>
    )
  }
)

ActionsMenuItem.displayName = 'ActionsMenuItem'

export default ActionsMenuItem
