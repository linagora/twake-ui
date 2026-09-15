import { Icon, TwakeText } from '@linagora/twake-icons'
import { Box } from '@mui/material'
import { CSSObject, Theme } from '@mui/material/styles'
import React, { FC } from 'react'

interface AppTitleProps {
  appIcon: React.ElementType
  appTextIcon: React.ElementType
}

const AppTitle: FC<AppTitleProps> = ({ appIcon, appTextIcon }) => {
  if (!appIcon || !appTextIcon) return null

  const AppTextIcon = appTextIcon

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Icon icon={appIcon} size="32" />
      <Box
        component={TwakeText}
        height="22"
        sx={[
          { fill: '#000' },
          (theme: Theme): CSSObject =>
            theme.applyStyles('dark', { fill: '#fff' })
        ]}
      />
      <Box
        component={AppTextIcon}
        height={22}
        sx={[
          { width: 'auto', fill: '#000' },
          (theme: Theme): CSSObject =>
            theme.applyStyles('dark', { fill: '#fff' })
        ]}
      />
    </Box>
  )
}

export default AppTitle
