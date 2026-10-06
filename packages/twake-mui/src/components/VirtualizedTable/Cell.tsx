import { TableCell, Skeleton } from '@mui/material'
import React, { useRef } from 'react'
import { useOnLongPress } from 'rooks'

import { getPath } from './helpers'
import {
  _isLoading as _isLoadingSymbol,
  type CellChildProps,
  type Column,
  type Row,
  type RowContentProps
} from './types'

const DOUBLE_CLICK_DELAY = 400
const LONG_PRESS_DURATION = 300

interface CellProps extends RowContentProps {
  row: Row
  columns: Column[]
  column: Column
}

export const Cell: React.FC<CellProps> = ({
  row,
  columns,
  column,
  onClick,
  onDoubleClick,
  onLongPress,
  children
}) => {
  // onClick is triggered after a long press anyway, so we need this flag to swallow it
  const isLongPress = useRef(false)
  const lastClickTime = useRef(0)

  const _isLoading = row[_isLoadingSymbol] === true

  const cellContent = getPath(row, column.id)
  const cell = cellContent === undefined ? '—' : cellContent

  const longPressRef = useOnLongPress(
    () => {
      // without a long press handler, a slow click must stay a click
      if (_isLoading || column.disableClick || !onLongPress) return
      isLongPress.current = true
      onLongPress(row, column)
    },
    { duration: LONG_PRESS_DURATION }
  )

  const handleClick = (): void => {
    if (_isLoading || column.disableClick) return

    if (isLongPress.current) {
      isLongPress.current = false
      return
    }

    const now = Date.now()
    const isDoubleClick = now - lastClickTime.current < DOUBLE_CLICK_DELAY
    lastClickTime.current = now

    if (!isDoubleClick) onClick?.(row, column)
  }

  return (
    <TableCell
      ref={longPressRef}
      sx={{
        cursor:
          !!onClick && !_isLoading && !column.disableClick
            ? 'pointer'
            : undefined,
        width: column.width,
        maxWidth: column.maxWidth
      }}
      className={column.noWrap ? 'u-ellipsis' : undefined}
      align={column.textAlign ?? 'left'}
      padding={column.disablePadding ? 'none' : 'normal'}
      onClick={handleClick}
      onDoubleClick={() =>
        _isLoading || column.disableClick
          ? undefined
          : onDoubleClick?.(row, column)
      }
      onContextMenu={ev => isLongPress.current && ev.preventDefault()}
    >
      {_isLoading
        ? column.skeleton || <Skeleton animation="wave" variant="text" />
        : children
          ? React.Children.map(children, child =>
              React.isValidElement<Partial<CellChildProps>>(child)
                ? React.cloneElement(child, { row, columns, column, cell })
                : null
            )
          : (cell as React.ReactNode)}
    </TableCell>
  )
}
