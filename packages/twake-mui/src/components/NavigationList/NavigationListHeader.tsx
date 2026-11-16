import { Typography } from '@mui/material'
import React, { ReactNode } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import ListSubheader from '../ListSubheader'

export interface NavigationListHeaderProps {
  children?: ReactNode
}

const NavigationListHeader = ({
  children
}: NavigationListHeaderProps): React.ReactElement => {
  const { isMobile } = useBreakpoints()

  return isMobile ? (
    <ListSubheader>{children}</ListSubheader>
  ) : (
    <Typography variant="subtitle1" color="text.secondary" className="u-mb-1">
      {children}
    </Typography>
  )
}

export default NavigationListHeader
