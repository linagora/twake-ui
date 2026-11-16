import { Box, Typography } from '@mui/material'
import React from 'react'

export interface IntentHeaderProps {
  appName: string
  /** Shown in a regular weight before the app name */
  appEditor?: string
  /** URL of the app icon */
  appIcon?: string
  className?: string
}

const IntentHeader: React.FC<IntentHeaderProps> = ({
  appName,
  appEditor,
  appIcon,
  className
}) => (
  <Box
    className={className}
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      height: 48,
      px: 2,
      py: 1,
      bgcolor: 'background.contrast'
    }}
  >
    <Typography
      component="h1"
      color="textPrimary"
      sx={theme => ({
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.typography.pxToRem(20),
        fontWeight: 'fontWeightBold'
      })}
    >
      {appIcon && (
        <Box component="img" src={appIcon} alt="" sx={{ height: 18, mr: 1 }} />
      )}
      {appEditor && (
        <Box component="span" sx={{ fontWeight: 'fontWeightRegular' }}>
          {appEditor}&nbsp;
        </Box>
      )}
      {appName}
    </Typography>
  </Box>
)

export default IntentHeader
