import { Bottom, Icon } from '@linagora/twake-icons'
import { ListItem, Typography } from '@mui/material'
import React, { Children, isValidElement, useState } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'

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
        onClick={isActivated ? onToggle : undefined}
        sx={{
          minHeight: 48,
          py: 1,
          px: 2,
          justifyContent: 'space-between',
          cursor: isActivated ? 'pointer' : undefined
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        {isActivated && (
          <Typography
            component="span"
            sx={{ display: 'flex', ml: '5px', color: 'text.secondary' }}
          >
            <Icon icon={Bottom} size={10} rotate={open ? 0 : -90} />
          </Typography>
        )}
      </ListItem>
      {open && children}
    </>
  )
}
