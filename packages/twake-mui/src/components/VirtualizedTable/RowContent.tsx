import React from 'react'

import { Cell } from './Cell'
import type { Column, Row, RowContentProps } from './types'

interface RowContentComponentProps extends RowContentProps {
  row: Row
  columns: Column[]
}

export const RowContent: React.FC<RowContentComponentProps> = React.memo(
  ({ row, columns, children, onClick, onDoubleClick, onLongPress }) => (
    <>
      {columns.map(column => (
        <Cell
          key={column.id}
          row={row}
          columns={columns}
          column={column}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onLongPress={onLongPress}
        >
          {children}
        </Cell>
      ))}
    </>
  )
)
RowContent.displayName = 'RowContent'
