import React, { Children, isValidElement, useState, useContext } from 'react'

import { Bottom, Top } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import { useBreakpoints } from '../../hooks/useBreakpoints.js'
import { NavIcon } from '../NavIcon/index.js'
import { NavItem } from '../NavItem/index.js'
import { NavLink } from '../NavLink/NavLink.js'
import NavText from '../NavText/index.js'
import { SidebarContext } from '../Sidebar/SidebarContext.js'
import de from './locales/de.json' with { type: 'json' }
import en from './locales/en.json' with { type: 'json' }
import es from './locales/es.json' with { type: 'json' }
import fr from './locales/fr.json' with { type: 'json' }
import it from './locales/it.json' with { type: 'json' }
import ru from './locales/ru.json' with { type: 'json' }
import vi from './locales/vi.json' with { type: 'json' }

const locales = { de, en, es, fr, it, ru, vi }

export interface NavDesktopLimiterProps {
  children: React.ReactNode
  max?: number
}

export const NavDesktopLimiter = ({
  children,
  max = 5
}: NavDesktopLimiterProps): React.ReactElement | null => {
  useExtendI18n(locales)
  const disableMobileView = useContext(SidebarContext)
  const { t } = useI18n()
  const [viewingAll, setViewingAll] = useState(false)
  const { isDesktop } = useBreakpoints()
  const items = Children.toArray(children).filter(isValidElement)
  const amountHidden = Math.max(0, items.length - max)

  if (!isDesktop && !disableMobileView) return null

  return (
    <>
      {viewingAll ? items : items.slice(0, max)}
      {amountHidden > 0 && (
        <NavItem variant="secondary">
          <NavLink onClick={() => setViewingAll(current => !current)}>
            <NavIcon icon={viewingAll ? Top : Bottom} />
            <NavText>
              {viewingAll
                ? t('NavDesktopLimiter.showLess')
                : `${t('NavDesktopLimiter.showMore')} (${amountHidden})`}
            </NavText>
          </NavLink>
        </NavItem>
      )}
    </>
  )
}
