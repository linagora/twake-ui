import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from '@mui/material'
import React, { forwardRef } from 'react'
import type { TableComponents } from 'react-virtuoso'

import { TableRow } from './TableRow'
import type { Row, TableContext } from './types'

/**
 * `context` is spread by virtuoso to every component. We destructure it so it
 * never lands in the DOM.
 */
export const virtuosoComponents: TableComponents<Row, TableContext> = {
  Scroller: forwardRef(function Scroller({ context, ...props }, ref) {
    return (
      <TableContainer
        {...props}
        ref={ref}
        component={Paper}
        elevation={0}
        square
      />
    )
  }),
  Table: ({ context, ...props }) => <Table {...props} />,
  TableHead: forwardRef(function TableHeadAdapter({ context, ...props }, ref) {
    return <TableHead {...props} ref={ref} />
  }),
  TableBody: forwardRef(function TableBodyAdapter({ context, ...props }, ref) {
    return <TableBody {...props} ref={ref} />
  }),
  TableRow
}
