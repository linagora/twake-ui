import { TableRow as MuiTableRow } from '@mui/material'
import React from 'react'
import type { TableComponents } from 'react-virtuoso'

import type { Row, TableContext } from './types'

type TableRowProps = React.ComponentProps<
  NonNullable<TableComponents<Row, TableContext>['TableRow']>
>

export const TableRow: React.FC<TableRowProps> = ({
  item,
  context,
  ...props
}) => {
  // grouped tables do not receive `item`, so we read it back from the sorted data
  const row = item ?? context.data?.[props['data-item-index']]
  const isSelected = row ? context.isSelectedItem(row) : false
  const isNew = row ? context.isNewItem?.(row) : false

  return (
    <MuiTableRow
      {...props}
      className={isNew ? 'new' : undefined}
      selected={isSelected}
      hover
    />
  )
}
