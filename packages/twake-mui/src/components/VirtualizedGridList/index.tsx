import React, { forwardRef } from 'react'
import {
  VirtuosoGrid,
  type VirtuosoGridHandle,
  type VirtuosoGridProps
} from 'react-virtuoso'

export interface VirtualizedGridListProps extends VirtuosoGridProps<
  unknown,
  unknown
> {
  /** Items of the grid: their count is the default `totalCount` */
  items?: readonly unknown[]
}

const VirtualizedGridList = forwardRef<
  VirtuosoGridHandle,
  VirtualizedGridListProps
>(({ items = [], ...props }, ref) => (
  <VirtuosoGrid
    ref={ref}
    style={{ height: '100%' }}
    totalCount={items.length}
    {...props}
  />
))

VirtualizedGridList.displayName = 'VirtualizedGridList'

export default VirtualizedGridList
