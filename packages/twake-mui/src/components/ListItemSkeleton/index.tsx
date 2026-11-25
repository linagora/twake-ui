import { Divider, ListItemIcon, Skeleton } from '@mui/material'
import React from 'react'

import { radius } from '../../lib/radius.js'
import ListItem, { ListItemGutters } from '../ListItem/index.js'
import ListItemText from '../ListItemText/index.js'

export interface ListItemSkeletonProps {
  hasSecondary?: boolean
  divider?: boolean
  gutters?: ListItemGutters
}

const ListItemSkeleton = ({
  hasSecondary,
  divider,
  gutters
}: ListItemSkeletonProps): React.ReactElement => (
  <>
    <ListItem gutters={gutters}>
      <ListItemIcon>
        <Skeleton
          variant="rectangular"
          width={32}
          height={32}
          sx={{ borderRadius: radius.md }}
        />
      </ListItemIcon>
      <ListItemText
        primary={<Skeleton width="75%" height={13} />}
        secondary={
          hasSecondary ? <Skeleton width="37%" height={13} /> : undefined
        }
      />
    </ListItem>
    {divider && <Divider />}
  </>
)

export default ListItemSkeleton
