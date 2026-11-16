import { ButtonProps, ListItemIcon, Radio } from '@mui/material'
import React, { useRef, useState } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import ActionsMenuItem from '../ActionsMenu/ActionsMenuItem'
import ActionsMenuWrapper from '../ActionsMenu/ActionsMenuWrapper'
import DropdownButton from '../DropdownButton'
import ListItemText from '../ListItemText'
import MemberRoleMenuHeader from './MemberRoleMenuHeader'
import { Member, MemberRole } from './types'

export interface MemberRoleMenuProps {
  /** Member shown in the header of the menu on mobile */
  member?: Member
  value: string
  roles: MemberRole[]
  size?: ButtonProps['size']
  disabled?: boolean
  onChange: (role: string) => void
  onOpen?: () => void
  onClose?: () => void
}

/** Role of a member in a dropdown button, opening a menu to pick another one */
const MemberRoleMenu = ({
  member,
  value,
  roles,
  size,
  disabled = false,
  onChange,
  onOpen,
  onClose
}: MemberRoleMenuProps): React.JSX.Element => {
  const { isMobile } = useBreakpoints()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isMenuDisplayed, setMenuDisplayed] = useState(false)

  const label = roles.find(role => role.value === value)?.label
  const isHeaderShown = isMobile && member !== undefined

  const openMenu = (): void => {
    setMenuDisplayed(true)
    onOpen?.()
  }

  const closeMenu = (): void => {
    setMenuDisplayed(false)
    onClose?.()
  }

  const handleRoleClick = (role: MemberRole): void => {
    if (role.value !== value) onChange(role.value)
  }

  return (
    <>
      <DropdownButton
        ref={buttonRef}
        aria-controls="simple-menu"
        aria-haspopup="true"
        textVariant="body2"
        size={size}
        disabled={disabled}
        onClick={openMenu}
      >
        {label}
      </DropdownButton>
      <ActionsMenuWrapper
        open={isMenuDisplayed}
        anchorEl={buttonRef.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        keepMounted
        autoClose
        onClose={closeMenu}
      >
        {/* The header renders nothing on desktop but would still take the initial focus of the menu */}
        {isHeaderShown && <MemberRoleMenuHeader member={member} />}
        {roles.map(role => (
          <ActionsMenuItem
            key={role.value}
            onClick={() => handleRoleClick(role)}
          >
            <ListItemIcon>
              <Radio readOnly checked={role.value === value} />
            </ListItemIcon>
            <ListItemText primary={role.label} />
          </ActionsMenuItem>
        ))}
      </ActionsMenuWrapper>
    </>
  )
}

export default MemberRoleMenu
