import { IconButton, ListItemIcon } from '@mui/material'
import React, { useRef, useState } from 'react'

import { Dots, Icon } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import ActionsMenu from '.'
import { useBreakpoints } from '../../hooks/useBreakpoints'
import { locales } from './locales'
import { ActionDocument, ActionObject } from './types'

export interface ActionsMenuButtonProps {
  docs?: ActionDocument[]
  actions?: ActionObject[]
}

const ActionsMenuButton = ({
  docs,
  actions
}: ActionsMenuButtonProps): React.JSX.Element => {
  const [showActions, setShowActions] = useState(false)
  const actionsRef = useRef<HTMLButtonElement>(null)
  useExtendI18n(locales)
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  return (
    <>
      <ListItemIcon>
        <IconButton
          ref={actionsRef}
          aria-label={t('ActionsMenu.menu')}
          aria-haspopup={isMobile ? 'dialog' : 'menu'}
          aria-expanded={showActions}
          onClick={() => setShowActions(true)}
        >
          <Icon icon={Dots} />
        </IconButton>
      </ListItemIcon>
      {showActions && (
        <ActionsMenu
          open
          ref={actionsRef}
          docs={docs}
          actions={actions}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={() => setShowActions(false)}
        />
      )}
    </>
  )
}

export default ActionsMenuButton
