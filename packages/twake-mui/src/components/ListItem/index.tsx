import {
  ListItem as MuiListItem,
  ListItemProps as MuiListItemProps
} from '@mui/material'
import cx from 'classnames'
import React from 'react'

export type ListItemSize = 'small' | 'medium' | 'large'
export type ListItemGutters = 'default' | 'double' | 'disabled'

export interface ListItemProps extends MuiListItemProps {
  size?: ListItemSize
  gutters?: ListItemGutters
}

// cozy-ui reserves 48px per action button, plus the gutter before them
const makeActionsWidth = (
  secondaryAction: React.ReactNode,
  gutters: ListItemGutters
): number => {
  const count =
    React.isValidElement<{ children?: React.ReactNode }>(secondaryAction) &&
    secondaryAction.type === React.Fragment
      ? React.Children.count(secondaryAction.props.children)
      : 1
  return count * 48 + (gutters === 'double' ? 24 : 8)
}

export const ListItem: React.FC<ListItemProps> = ({
  className,
  size = 'medium',
  gutters = 'default',
  secondaryAction,
  style,
  ...props
}) => (
  <MuiListItem
    className={cx(className, size)}
    disableGutters={gutters === 'disabled' || props.disableGutters}
    secondaryAction={secondaryAction}
    style={{
      ...(gutters === 'double' && { '--ListItem-gutter': '32px' }),
      ...(secondaryAction && {
        '--ListItem-actionsWidth': `${makeActionsWidth(secondaryAction, gutters)}px`
      }),
      ...style
    }}
    {...props}
  />
)

export default ListItem
