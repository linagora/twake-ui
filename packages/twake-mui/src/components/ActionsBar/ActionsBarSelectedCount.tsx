import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

import { CheckCircle, CrossCircle, Icon } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import ru from './locales/ru.json'
import vi from './locales/vi.json'

const locales = { de, en, es, fr, it, ru, vi }

const DefaultIcon = (): React.JSX.Element => (
  <Box component="span" sx={{ display: 'inline-flex', mr: 2 }}>
    <Icon icon={CheckCircle} />
  </Box>
)

export interface ActionsBarSelectedCountProps {
  count: number
  IconComponent?: React.ElementType
  onClose?: () => void
}

const ActionsBarSelectedCount = ({
  count,
  IconComponent = DefaultIcon,
  onClose
}: ActionsBarSelectedCountProps): React.JSX.Element => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  if (isMobile) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          pr: 2,
          borderRadius: '15px 0 0 0',
          bgcolor: 'background.paper',
          color: 'text.primary'
        }}
      >
        <IconButton color="inherit" onClick={onClose}>
          <Icon icon={CrossCircle} />
        </IconButton>
        {count}
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', px: 2 }}>
      <IconComponent />
      <Typography variant="body1" component="span" color="inherit">
        {t('ActionsBar.selected_light', { smart_count: count })}
      </Typography>
    </Box>
  )
}

export default ActionsBarSelectedCount
