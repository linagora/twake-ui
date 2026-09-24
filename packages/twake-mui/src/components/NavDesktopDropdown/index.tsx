import { ListItem } from '@mui/material'
import React, { Children, isValidElement, useState } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import DropdownText from '../DropdownText'

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
  const { isDesktop } = useBreakpoints()
  const [open, setOpen] = useState(defaultOpen)
  const isActivated =
    Children.toArray(children).filter(isValidElement).length > limit

  const onToggle = (): void => setOpen(current => !current)

  if (!isDesktop) return null

  return (
    <>
      <ListItem
        sx={{
          minHeight: 48,
          py: 1,
          px: 2,
          cursor: isActivated ? 'pointer' : undefined
        }}
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
