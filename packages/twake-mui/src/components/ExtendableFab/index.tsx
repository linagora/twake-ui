import { Fab, FabProps, styled } from '@mui/material'
import React, { forwardRef, useEffect, useState } from 'react'
import { useDebounce } from 'rooks'

import { Icon, IconProps } from '@linagora/twake-icons'

export interface ScrollOptions {
  /** Delay in ms before the window scroll position is read */
  delay?: number
}

export interface ExtendableFabProps extends Omit<FabProps, 'ref' | 'children'> {
  label: string
  icon: IconProps['icon']
  /** Window scroll offset in px below which the Fab stays extended */
  topLimit?: number
  scrollOptions?: ScrollOptions
}

const GappedFab = styled(Fab)(({ theme }) => ({ gap: theme.spacing(1) }))

export const ExtendableFab = forwardRef<HTMLButtonElement, ExtendableFabProps>(
  ({ label, icon, topLimit = 50, scrollOptions, ...props }, ref) => {
    const [isBelowTopLimit, setIsBelowTopLimit] = useState(true)

    const handleScroll = useDebounce((): void => {
      setIsBelowTopLimit(window.scrollY < topLimit)
    }, scrollOptions?.delay ?? 250)

    useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return (): void => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
      <GappedFab
        ref={ref}
        aria-label={label}
        variant={isBelowTopLimit ? 'extended' : 'circular'}
        {...props}
      >
        <Icon icon={icon} />
        {isBelowTopLimit && label}
      </GappedFab>
    )
  }
)

ExtendableFab.displayName = 'ExtendableFab'

export default ExtendableFab
