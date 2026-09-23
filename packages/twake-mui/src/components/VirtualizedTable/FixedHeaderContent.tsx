import { TableRow } from '@mui/material'
import React from 'react'

import { HeadCell } from './HeadCell'
import type { Column, OrderDirection } from './types'

interface FixedHeaderContentProps {
  columns: Column[]
  orderBy?: string
  orderDirection: OrderDirection
  onClick: (columnId: string) => void
}

export const FixedHeaderContent: React.FC<FixedHeaderContentProps> = ({
  columns,
  orderBy,
  orderDirection,
  onClick
}) => (
  <TableRow>
    {columns.map(column => (
      <HeadCell
        key={column.id}
        column={column}
        orderBy={orderBy}
        orderDirection={orderDirection}
        onClick={() => onClick(column.id)}
      />
    ))}
  </TableRow>
)
