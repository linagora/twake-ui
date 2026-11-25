import React, { Children, isValidElement, useState, useContext } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints.js'
import DropdownText from '../DropdownText/index.js'
import ListItem from '../ListItem/index.js'
import ListItemButton from '../ListItemButton/index.js'
import { SidebarContext } from '../Sidebar/SidebarContext.js'

const StaticHeader = ({ label }: { label: string }): React.ReactElement => (
  <ListItem size="small">
    <DropdownText
      variant="caption"
      color="textSecondary"
      spaceBetween
      innerIconProps={{ display: 'none' }}
    >
      {label}
    </DropdownText>
  </ListItem>
)

interface ToggleHeaderProps {
  label: string
  open: boolean
  onToggle: () => void
}

const ToggleHeader = ({
  label,
  open,
  onToggle
}: ToggleHeaderProps): React.ReactElement => (
  <ListItem disablePadding>
    <ListItemButton size="small" onClick={onToggle} aria-expanded={open}>
      <DropdownText
        variant="caption"
        color="textSecondary"
        spaceBetween
        innerIconProps={{ rotate: open ? 0 : -90 }}
      >
        {label}
      </DropdownText>
    </ListItemButton>
  </ListItem>
)

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
      {isActivated ? (
        <ToggleHeader label={label} open={open} onToggle={onToggle} />
      ) : (
        <StaticHeader label={label} />
      )}
      {open && children}
    </>
  )
}
