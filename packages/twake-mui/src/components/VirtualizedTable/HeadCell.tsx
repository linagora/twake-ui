import { TableCell, TableSortLabel } from '@mui/material'
import React from 'react'

import type { Column, OrderDirection } from './types'

interface HeadCellProps {
  column: Column
  orderBy?: string
  orderDirection: OrderDirection
  onClick: () => void
}

export const HeadCell: React.FC<HeadCellProps> = ({
  column,
  orderBy,
  orderDirection,
  onClick
}) => {
  const isActive = orderBy === column.id

  return (
    <TableCell
      sx={{ width: column.width, maxWidth: column.maxWidth }}
      className={column.noWrap ? 'u-ellipsis' : undefined}
      align={column.textAlign ?? 'left'}
      padding={column.disablePadding ? 'none' : 'normal'}
      sortDirection={isActive ? orderDirection : false}
    >
      {column.sortable !== false ? (
        <TableSortLabel
          active={isActive}
          direction={isActive ? orderDirection : 'asc'}
          onClick={onClick}
        >
          {column.label}
          {isActive && (
            <span className="u-visuallyhidden">
              {orderDirection === 'desc'
                ? 'sorted descending'
                : 'sorted ascending'}
            </span>
          )}
        </TableSortLabel>
      ) : (
        column.label
      )}
    </TableCell>
  )
}
