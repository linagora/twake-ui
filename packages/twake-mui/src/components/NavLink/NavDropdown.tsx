import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { forwardRef } from 'react'

import { Icon, Dropdown } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import { NavLinkBase, NavLinkBaseProps } from './NavLinkBase.js'
import de from './locales/de.json' with { type: 'json' }
import en from './locales/en.json' with { type: 'json' }
import es from './locales/es.json' with { type: 'json' }
import fr from './locales/fr.json' with { type: 'json' }
import it from './locales/it.json' with { type: 'json' }
import ru from './locales/ru.json' with { type: 'json' }
import vi from './locales/vi.json' with { type: 'json' }

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
