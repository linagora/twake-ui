import { List } from '@mui/material'
import cx from 'classnames'
import React, { CSSProperties, ReactNode } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'

export interface NavigationListProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Navigation choices grouped in sections: a plain list with subheaders on
 * mobile, one bordered card per section on desktop.
 */
const NavigationList = ({
  children,
  className,
  style
}: NavigationListProps): React.ReactElement => {
  const { isMobile } = useBreakpoints()

  return isMobile ? (
    <List className={className} style={style}>
      {children}
    </List>
  ) : (
    <div className={cx('u-stack-s u-nolist', className)} style={style}>
      {children}
    </div>
  )
}

export default NavigationList
