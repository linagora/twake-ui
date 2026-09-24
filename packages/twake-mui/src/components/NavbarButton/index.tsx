import { Icon, IconProps } from '@linagora/twake-icons'
import { ButtonTypeMap as MuiButtonTypeMap } from '@mui/material'
import {
  OverridableComponent,
  OverrideProps
} from '@mui/material/OverridableComponent'
import cx from 'classnames'
import React from 'react'

import { Button } from '../Button'

export type NavbarButtonVariant = 'primary' | 'secondary'

export interface NavbarButtonTypeMap<
  AdditionalProps = object,
  RootComponent extends React.ElementType = 'button'
> {
  props: AdditionalProps &
    Omit<
      MuiButtonTypeMap['props'],
      'variant' | 'children' | 'startIcon' | 'endIcon'
    > & {
      icon: IconProps['icon']
      text: React.ReactNode
      variant?: NavbarButtonVariant
    }
  defaultComponent: RootComponent
}

export type NavbarButtonProps<
  RootComponent extends React.ElementType = 'button',
  AdditionalProps = object
> = OverrideProps<
  NavbarButtonTypeMap<AdditionalProps, RootComponent>,
  RootComponent
>

const secondarySx = { color: 'text.primary', bgcolor: 'background.paper' }

export const NavbarButton = React.forwardRef<
  HTMLButtonElement,
  NavbarButtonProps
>(({ icon, text, variant = 'primary', className, ...props }, ref) => (
  <Button
    ref={ref}
    startIcon={<Icon icon={icon} size={12} />}
    className={cx('u-bdrs-6 u-fz-small', className)}
    sx={variant === 'secondary' ? secondarySx : undefined}
    {...props}
  >
    {text}
  </Button>
)) as OverridableComponent<NavbarButtonTypeMap> & { displayName?: string }

NavbarButton.displayName = 'NavbarButton'

export default NavbarButton
