import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'

export interface NavigationListSectionProps {
  children?: ReactNode
}

const NavigationListSection = ({
  children
}: NavigationListSectionProps): React.ReactElement => {
  const { isMobile } = useBreakpoints()

  return isMobile ? (
    <>{children}</>
  ) : (
    <Box
      className="u-ov-hidden u-mb-1-half u-bdrs-4"
      sx={{ border: 1, borderColor: 'divider' }}
    >
      {children}
    </Box>
  )
}

export default NavigationListSection
