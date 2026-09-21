import { Bottom, Top } from '@linagora/twake-icons'
import React, { Children, isValidElement, useState } from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import { NavIcon } from '../NavIcon'
import { NavItem } from '../NavItem'
import { NavLink } from '../NavLink'
import { NavText } from '../NavText'
import en from './locales/en.json'
import fr from './locales/fr.json'
import ru from './locales/ru.json'
import vi from './locales/vi.json'
import { useBreakpoints } from '../../hooks/useBreakpoints'

const locales = { en, fr, ru, vi }

export interface NavDesktopLimiterProps {
  children: React.ReactNode
  max?: number
}

export const NavDesktopLimiter = ({
  children,
  max = 5
}: NavDesktopLimiterProps): React.ReactElement | null => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const [viewingAll, setViewingAll] = useState(false)
  const { isMobile } = useBreakpoints()
  const items = Children.toArray(children).filter(isValidElement)
  const amountHidden = Math.max(0, items.length - max)

  if (isMobile) return null

  return (
    <>
      {viewingAll ? items : items.slice(0, max)}
      {amountHidden > 0 && (
        <NavItem secondary>
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
