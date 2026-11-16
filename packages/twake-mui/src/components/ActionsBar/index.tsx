import { AppBarProps, IconButton, Toolbar } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'

import { Cross, Dots, Icon } from '@linagora/twake-icons'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import ActionsMenu from '../ActionsMenu'
import { makeActions } from '../ActionsMenu/Actions/helpers'
import { others } from '../ActionsMenu/Actions/others'
import ActionsItems from '../ActionsMenu/ActionsItems'
import { getOnlyNeededActions } from '../ActionsMenu/helpers'
import { ActionDocument, ActionObject } from '../ActionsMenu/types'
import ActionsBarActions from './ActionsBarActions'
import ActionsBarRoot from './ActionsBarRoot'
import ActionsBarSelectedCount from './ActionsBarSelectedCount'
import ResponsiveAction from './ResponsiveAction'

const MOBILE_MAX_ACTIONS = 4

export interface ActionsBarProps {
  actions: ActionObject[]
  docs: ActionDocument[]
  /** Closes the bar when an action is clicked */
  autoClose?: boolean
  /** Actions shown in the bar on desktop, the others go to a menu */
  maxDesktopActions?: number
  color?: AppBarProps['color']
  /** Replaces the icon next to the selection count, on desktop */
  IconComponent?: React.ElementType
  onClose?: () => void
}

/** Bar of the actions available on the selected documents */
const ActionsBar = ({
  actions,
  docs,
  autoClose = true,
  maxDesktopActions = 5,
  color = 'default',
  IconComponent,
  onClose
}: ActionsBarProps): React.JSX.Element => {
  const { isMobile } = useBreakpoints()
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [showMenu, setShowMenu] = useState(false)

  const maxActionsDisplayed = isMobile ? MOBILE_MAX_ACTIONS : maxDesktopActions
  const cleanedActions = useMemo(
    () => getOnlyNeededActions(actions, docs),
    [actions, docs]
  )
  // Keeps a slot for the menu button when some actions do not fit
  const countActionsToDisplay =
    cleanedActions.length > maxActionsDisplayed
      ? maxActionsDisplayed - 1
      : maxActionsDisplayed
  const sliceIndex = Math.max(1, countActionsToDisplay)
  const barActions = cleanedActions.slice(0, sliceIndex)
  const menuActions = cleanedActions.slice(sliceIndex)

  const handleClick = (): void => {
    if (autoClose) onClose?.()
  }

  return (
    <ActionsBarRoot position="fixed" color={color}>
      <Toolbar
        variant={isMobile ? 'regular' : 'dense'}
        disableGutters
        sx={{ height: 'inherit' }}
      >
        {!!onClose && !isMobile && (
          <IconButton
            color="inherit"
            sx={{ position: 'absolute', right: 0 }}
            onClick={onClose}
          >
            <Icon icon={Cross} />
          </IconButton>
        )}
        <ActionsBarSelectedCount
          count={docs.length}
          IconComponent={IconComponent}
          onClose={onClose}
        />
        <ActionsBarActions>
          <ActionsItems
            docs={docs}
            actions={barActions}
            component={ResponsiveAction}
            onClick={handleClick}
          />
          {menuActions.length > 0 && (
            <>
              {isMobile ? (
                <ActionsItems
                  docs={docs}
                  actions={makeActions([others])}
                  component={ResponsiveAction}
                  onClick={() => setShowMenu(true)}
                />
              ) : (
                <IconButton
                  ref={anchorRef}
                  color="inherit"
                  onClick={() => setShowMenu(true)}
                >
                  <Icon icon={Dots} />
                </IconButton>
              )}
              <ActionsMenu
                ref={anchorRef}
                open={showMenu}
                docs={docs}
                actions={menuActions}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                componentsProps={{ actionsItems: { onClick: handleClick } }}
                onClose={() => setShowMenu(false)}
              />
            </>
          )}
        </ActionsBarActions>
      </Toolbar>
    </ActionsBarRoot>
  )
}

export default ActionsBar
