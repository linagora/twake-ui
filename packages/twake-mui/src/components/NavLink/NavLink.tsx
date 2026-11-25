import React, { forwardRef } from 'react'

import { NavLinkBase, NavLinkBaseProps } from './NavLinkBase.js'

export type NavLinkProps = NavLinkBaseProps

export const NavLink = forwardRef<HTMLDivElement, NavLinkProps>(
  (props, ref) => {
    return <NavLinkBase ref={ref} {...props} />
  }
)
NavLink.displayName = 'NavLink'
