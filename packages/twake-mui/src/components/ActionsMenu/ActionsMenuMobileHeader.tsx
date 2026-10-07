import { Divider } from '@mui/material'
import React, { forwardRef } from 'react'

import ActionsMenuItem, { ActionsMenuItemProps } from './ActionsMenuItem'
import { useBreakpoints } from '../../hooks/useBreakpoints'

export type ActionsMenuMobileHeaderProps = Omit<
  ActionsMenuItemProps,
  'isListItem'
>

/** Gives context to the actions, only on mobile where the menu hides its anchor */
const ActionsMenuMobileHeader = forwardRef<
  HTMLElement,
  ActionsMenuMobileHeaderProps
>(({ children, ...props }, ref) => {
  const { isMobile } = useBreakpoints()

  if (!isMobile) return null

  return (
    <>
      <ActionsMenuItem {...props} ref={ref} isListItem>
        {children}
      </ActionsMenuItem>
      <Divider sx={{ my: 1 }} />
    </>
  )
})

ActionsMenuMobileHeader.displayName = 'ActionsMenuMobileHeader'

export default ActionsMenuMobileHeader
