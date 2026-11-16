import { List, ListProps } from '@mui/material'
import React, { useId } from 'react'

import ListSubheader from '../ListSubheader'

export interface SpotModalSectionProps extends Omit<ListProps, 'title'> {
  title: string
}

const SpotModalSection: React.FC<SpotModalSectionProps> = ({
  title,
  ...props
}) => {
  const titleId = useId()

  return (
    <List
      role="group"
      aria-labelledby={titleId}
      subheader={
        <ListSubheader id={titleId} role="presentation" disableSticky>
          {title}
        </ListSubheader>
      }
      {...props}
    />
  )
}

export default SpotModalSection
