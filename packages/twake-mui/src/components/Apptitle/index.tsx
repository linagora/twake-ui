import { Icon, TwakeText } from '@linagora/twake-icons'
import { Box, useTheme } from '@mui/material'
import React, { FC } from 'react'

interface AppTitleProps {
  appIcon: React.ElementType
  appTextIcon: React.ElementType
}

const AppTitle: FC<AppTitleProps> = ({ appIcon, appTextIcon }) => {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'

  if (!appIcon || !appTextIcon) return null

  const AppTextIcon = appTextIcon

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Icon icon={appIcon} size="32" />
      <TwakeText height="22" style={{ fill: isLight ? '#000' : '#fff' }} />
      <AppTextIcon
        height={22}
        style={{ width: 'auto', fill: isLight ? '#000' : '#fff' }}
      />
    </Box>
  )
}

export default AppTitle
