import { SxProps, Theme } from '@mui/material/styles'
import { isMuiElement } from '@mui/material/utils'
import cx from 'classnames'
import React, { Children, cloneElement, isValidElement } from 'react'

import { ListItemText, ListItemTextProps } from '../ListItemText'

export type ListItemGutters = 'default' | 'double' | 'disabled'
export type ListItemSize = 'small' | 'medium' | 'large'

/** cozy-ui props shared by ListItem and ListItemButton */
export interface ListItemCozyProps {
  gutters?: ListItemGutters
  size?: ListItemSize
  ellipsis?: boolean
}

interface ListItemRowOptions extends ListItemCozyProps {
  className?: string
  disableGutters?: boolean
  sx?: SxProps<Theme>
  children?: React.ReactNode
}

export interface ListItemRow {
  className: string
  disableGutters: boolean
  sx: SxProps<Theme>
  action: React.ReactElement | null
  content: React.ReactNode
}

const ACTION_BUTTON_SIZE = 48

export function computeListItemRow({
  className,
  gutters = 'default',
  size = 'medium',
  ellipsis = true,
  disableGutters = false,
  sx,
  children
}: ListItemRowOptions): ListItemRow {
  const items = Children.toArray(children)
  const lastItem = items.at(-1)
  const action =
    isValidElement<{ children?: React.ReactNode }>(lastItem) &&
    isMuiElement(lastItem, ['ListItemSecondaryAction'])
      ? lastItem
      : null
  const actionPadding = action
    ? Children.count(action.props.children) * ACTION_BUTTON_SIZE +
      (gutters === 'double' ? 24 : 8)
    : 0

  return {
    className: cx(className, size, { doubleGutters: gutters === 'double' }),
    disableGutters: disableGutters || gutters === 'disabled',
    sx: [
      // && outranks the theme's .doubleGutters padding
      actionPadding > 0 && { '&&': { paddingRight: `${actionPadding}px` } },
      sx ?? false
    ].flat(),
    action,
    content: (action ? items.slice(0, -1) : items).map(item =>
      isValidElement<ListItemTextProps>(item) && item.type === ListItemText
        ? cloneElement(item, { ellipsis })
        : item
    )
  }
}
