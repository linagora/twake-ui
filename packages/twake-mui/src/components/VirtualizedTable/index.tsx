import { TableCell } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import {
  GroupedTableVirtuoso,
  GroupedTableVirtuosoHandle,
  TableVirtuoso,
  TableVirtuosoHandle,
  TableVirtuosoProps
} from 'react-virtuoso'

import { FixedHeaderContent } from './FixedHeaderContent'
import { RowContent } from './RowContent'
import { getComparator, stableSort } from './helpers'
import type {
  Column,
  OrderDirection,
  Row,
  RowContentProps,
  TableContext
} from './types'
import { virtuosoComponents } from './virtuosoComponents'

export type {
  Column as VirtualizedTableColumn,
  Row as VirtualizedTableRow
} from './types'

export interface VirtualizedTableProps extends Omit<
  TableVirtuosoProps<Row, TableContext>,
  | 'data'
  | 'rows'
  | 'context'
  | 'components'
  | 'itemContent'
  | 'fixedHeaderContent'
> {
  /** Rows to display in the table */
  rows: Row[]
  /** Column configuration */
  columns: Column[]
  /** Split the sorted rows into groups */
  groups?: (rows: Row[]) => {
    groupLabels: React.ReactNode[]
    groupCounts: number[]
  }
  /** Default sorting configuration */
  defaultOrder?: { direction?: OrderDirection; by?: string }
  /** Applied after the column sort, e.g. to keep directories before files */
  secondarySort?: (rows: Row[]) => Row[]
  /** Array of selected items */
  selectedItems?: unknown[]
  /** Function to determine if a row is selected */
  isSelectedItem?: (row: Row) => boolean
  /** Function to determine if a row is new */
  isNewItem?: (row: Row) => boolean
  /** Context object passed down to children and virtuoso */
  context?: Record<string, unknown>
  /** Props passed to child components */
  componentsProps?: { rowContent?: RowContentProps }
  /** Custom components used by react-virtuoso */
  components?: TableVirtuosoProps<Row, TableContext>['components']
  /** Callback called after the sort */
  onSortChange?: (sort: { order: OrderDirection; orderBy: string }) => void
}

export const VirtualizedTable = forwardRef<
  TableVirtuosoHandle,
  VirtualizedTableProps
>(
  (
    {
      rows,
      columns,
      groups,
      defaultOrder,
      secondarySort,
      selectedItems = [],
      isSelectedItem = (): boolean => false,
      isNewItem,
      context,
      componentsProps,
      components = virtuosoComponents,
      onSortChange,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [orderDirection, setOrderDirection] = useState<OrderDirection>(
      defaultOrder?.direction ?? 'asc'
    )
    const [orderBy, setOrderBy] = useState(defaultOrder?.by)

    const sortedRows = orderBy
      ? stableSort(rows, getComparator(orderDirection, orderBy))
      : rows
    const data = secondarySort ? secondarySort(sortedRows) : sortedRows
    const { groupLabels, groupCounts } = groups?.(data) ?? {}
    const tableContext: TableContext = {
      ...context,
      data,
      selectedItems,
      isSelectedItem,
      isNewItem
    }

    const handleSort = (property: string): void => {
      const isAsc = orderBy === property && orderDirection === 'asc'
      const newOrder: OrderDirection = isAsc ? 'desc' : 'asc'
      setOrderDirection(newOrder)
      setOrderBy(property)
      onSortChange?.({ order: newOrder, orderBy: property })
    }

    const shared = {
      ...props,
      context: tableContext,
      components,
      fixedHeaderContent: (): React.ReactElement => (
        <FixedHeaderContent
          columns={columns}
          orderDirection={orderDirection}
          orderBy={orderBy}
          onClick={handleSort}
        />
      ),
      itemContent: (index: number): React.ReactElement => (
        <RowContent
          {...componentsProps?.rowContent}
          row={data[index]}
          columns={columns}
        />
      )
    }

    return groupCounts ? (
      <GroupedTableVirtuoso
        {...shared}
        // both handles expose the same scroll methods, only the location typing differs
        ref={ref as React.ForwardedRef<GroupedTableVirtuosoHandle>}
        groupCounts={groupCounts}
        groupContent={index => (
          <TableCell colSpan={columns.length} size="small">
            {groupLabels?.[index]}
          </TableCell>
        )}
      />
    ) : (
      <TableVirtuoso {...shared} ref={ref} data={data} />
    )
  }
)

VirtualizedTable.displayName = 'VirtualizedTable'

export default VirtualizedTable
