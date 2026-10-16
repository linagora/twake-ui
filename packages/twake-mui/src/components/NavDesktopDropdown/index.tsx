import React, { Children, isValidElement, useState, useContext } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import DropdownText from '../DropdownText'
import ListItem from '../ListItem'
import { SidebarContext } from '../Sidebar/SidebarContext'

export interface NavDesktopDropdownProps {
  label: string
  children: React.ReactNode
  defaultOpen?: boolean
  limit?: number
}

export const NavDesktopDropdown = ({
  label,
  children,
  defaultOpen = true,
  limit = 5
}: NavDesktopDropdownProps): React.ReactElement | null => {
  const disableMobileView = useContext(SidebarContext)
  const { isDesktop } = useBreakpoints()
  const [open, setOpen] = useState(defaultOpen)
  const isActivated =
    Children.toArray(children).filter(isValidElement).length > limit

  const onToggle = (): void => setOpen(current => !current)

  if (!isDesktop && !disableMobileView) return null

  return (
    <>
      <ListItem
        size="small"
        sx={{ cursor: isActivated ? 'pointer' : undefined }}
      >
        <DropdownText
          variant="caption"
          color="textSecondary"
          spaceBetween
          onClick={isActivated ? onToggle : undefined}
          innerIconProps={{
            rotate: open ? 0 : -90,
            display: isActivated ? undefined : 'none'
          }}
        >
          {label}
        </DropdownText>
      </ListItem>
      {open && children}
    </>
  )
}
