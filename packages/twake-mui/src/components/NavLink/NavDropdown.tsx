import { Icon, Dropdown } from '@linagora/twake-icons'
import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { forwardRef } from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import { NavLinkBase, NavLinkBaseProps } from './NavLinkBase'
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import ru from './locales/ru.json'
import vi from './locales/vi.json'

const locales = { de, en, es, fr, it, ru, vi }

export interface NavDropdownProps extends Omit<NavLinkBaseProps, 'onToggle'> {
  open?: boolean
  onToggle?: () => void
  toggleLabel?: string
}

export const NavDropdown = forwardRef<HTMLDivElement, NavDropdownProps>(
  ({ open, onToggle, toggleLabel, onClick, children, ...rest }, ref) => {
    useExtendI18n(locales)
    const { t } = useI18n()
    const theme = useTheme()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (onClick) {
        onClick(e)
      }
    }

    return (
      <NavLinkBase
        ref={ref}
        onClick={handleClick}
        aria-expanded={open}
        {...rest}
      >
        {children}
        <IconButton
          className="u-ml-half"
          size="xsmall"
          aria-label={
            toggleLabel ??
            t(open ? 'NavDropdown.collapse' : 'NavDropdown.expand')
          }
          aria-expanded={open}
          onClick={e => {
            e.stopPropagation()
            onToggle?.()
          }}
        >
          <Icon
            icon={Dropdown}
            rotate={open ? 0 : -90}
            size={14}
            color={theme.vars.palette.text.primary}
          />
        </IconButton>
      </NavLinkBase>
    )
  }
)
NavDropdown.displayName = 'NavDropdown'
