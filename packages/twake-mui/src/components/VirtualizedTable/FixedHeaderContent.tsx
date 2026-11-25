import { TableRow } from '@mui/material'
import React from 'react'

import { HeadCell } from './HeadCell.js'
import type { Column, OrderDirection } from './types.js'

interface FixedHeaderContentProps {
  columns: Column[]
  orderBy?: string
  orderDirection: OrderDirection
  onClick: (columnId: string) => void
  isLoading?: boolean
}

export const FixedHeaderContent: React.FC<FixedHeaderContentProps> = ({
  columns,
  orderBy,
  orderDirection,
  onClick,
  isLoading
}) => (
  <TableRow>
    {columns.map(column => (
      <HeadCell
        key={column.id}
        column={column}
        orderBy={orderBy}
        orderDirection={orderDirection}
        onClick={() => onClick(column.id)}
        isLoading={isLoading}
      />
    ))}
  </TableRow>
)
