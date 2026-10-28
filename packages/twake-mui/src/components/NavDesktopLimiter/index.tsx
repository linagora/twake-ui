import React, { Children, isValidElement, useState, useContext } from 'react'

import { Bottom, Top } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import { NavIcon } from '../NavIcon'
import { NavItem } from '../NavItem'
import { NavLink } from '../NavLink/NavLink'
import NavText from '../NavText'
import { SidebarContext } from '../Sidebar/SidebarContext'
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import ru from './locales/ru.json'
import vi from './locales/vi.json'

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
