import { Divider, ListItemIcon, Radio, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'

import { Icon, Right } from '@linagora/twake-icons'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import ListItemButton from '../ListItemButton'
import ListItemText from '../ListItemText'
import type { NestedSelectItem, NestedSelectRadioPosition } from './types'

export interface ItemRowProps {
  item: NestedSelectItem
  onClick: (item: NestedSelectItem) => void
  isSelected: boolean
  radioPosition?: NestedSelectRadioPosition
  isLast?: boolean
  ellipsis?: boolean
  noDivider?: boolean
}

const ItemRow = ({
  item,
  onClick,
  isSelected,
  radioPosition,
  isLast,
  ellipsis,
  noDivider
}: ItemRowProps): React.ReactElement => {
  const { isDesktop } = useBreakpoints()
  const theme = useTheme()
  const hasChildren = (item.children?.length ?? 0) > 0

  return (
    <>
      <ListItemButton
        gutters={isDesktop ? 'double' : 'default'}
        ellipsis={ellipsis}
        onClick={() => onClick(item)}
      >
        {radioPosition === 'left' && (
          <ListItemIcon>
            <Radio readOnly checked={isSelected} />
          </ListItemIcon>
        )}
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.title} secondary={item.description} />

        {hasChildren && (
          <ListItemIcon>
            <Icon icon={Right} color={theme.vars?.palette.text.secondary} />
          </ListItemIcon>
        )}

        {radioPosition === 'right' && !hasChildren && (
          <div className="u-flex u-flex-items-center">
            {item.info && (
              <Typography variant="body2" color="textSecondary">
                {item.info}
              </Typography>
            )}
            <ListItemIcon>
              <Radio readOnly edge="end" checked={isSelected} />
            </ListItemIcon>
          </div>
        )}

        {radioPosition === 'right' && item.action && (
          <Divider orientation="vertical" flexItem />
        )}
        {item.action?.Component({ item, ...item.action.props })}
      </ListItemButton>
      {!noDivider && !isLast && <Divider />}
    </>
  )
}

export default ItemRow
