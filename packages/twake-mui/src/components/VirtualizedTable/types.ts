import type { TableCellProps } from '@mui/material'
import type React from 'react'

export type Row = Record<string, unknown>

export type OrderDirection = 'asc' | 'desc'

export interface Column {
  id: string
  label?: React.ReactNode
  width?: number | string
  maxWidth?: number | string
  noWrap?: boolean
  textAlign?: TableCellProps['align']
  disablePadding?: boolean
  sortable?: boolean
  disableClick?: boolean
}

export interface TableContext {
  data?: Row[]
  selectedItems: unknown[]
  isSelectedItem: (row: Row) => boolean
  isNewItem?: (row: Row) => boolean
  [key: string]: unknown
}

export type CellHandler = (row: Row, column: Column) => void

export interface CellChildProps {
  row: Row
  columns: Column[]
  column: Column
  cell: unknown
}

export interface RowContentProps {
  children?: React.ReactNode
  onClick?: CellHandler
  onDoubleClick?: CellHandler
  onLongPress?: CellHandler
}
