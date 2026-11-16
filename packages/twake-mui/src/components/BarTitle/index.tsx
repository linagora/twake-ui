import { Box, Typography } from '@mui/material'
import React from 'react'

export interface BarTitleProps {
  children?: React.ReactNode
  /** Truncates the title with an ellipsis instead of wrapping */
  noWrap?: boolean
}

const BarTitle: React.FC<BarTitleProps> = ({ noWrap = false, children }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', height: 48 }}>
    <Typography variant="h4" component="h1" color="textPrimary" noWrap={noWrap}>
      {children}
    </Typography>
  </Box>
)

export default BarTitle
