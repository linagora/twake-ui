import {
  Button as MuiButton,
  ButtonTypeMap as MuiButtonTypeMap,
  buttonClasses
} from '@mui/material'
import {
  OverridableComponent,
  OverrideProps
} from '@mui/material/OverridableComponent'
import { styled, Theme } from '@mui/material/styles'
import React from 'react'

import { radius } from '../../lib/radius'

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
      icon: React.ReactNode
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

const NavbarButtonRoot = styled(MuiButton, {
  shouldForwardProp: prop => prop !== 'navbarVariant'
})<{ navbarVariant: NavbarButtonVariant }>(({ theme }: { theme: Theme }) => ({
  ...theme.typography.body2,
  gap: 7,
  borderRadius: radius.lg,
  [`& .${buttonClasses.startIcon}`]: {
    margin: 0,
    '& > *': { width: 12, height: 12, fontSize: 12 }
  },
  [`&.${buttonClasses.disabled}`]: {
    color: theme.vars.palette.text.disabled
  },
  variants: [
    {
      props: { navbarVariant: 'primary' },
      style: {
        '@media (hover: hover)': {
          '&:hover': {
            backgroundColor: theme.vars.palette.primary.main,
            backgroundImage: `linear-gradient(${theme.vars.palette.action.hover}, ${theme.vars.palette.action.hover})`
          }
        }
      }
    },
    {
      props: { navbarVariant: 'secondary' },
      style: {
        color: theme.vars.palette.text.primary,
        backgroundColor: theme.vars.palette.background.paper,
        '@media (hover: hover)': {
          '&:hover': { backgroundColor: theme.vars.palette.background.paper }
        }
      }
    }
  ]
}))

export const NavbarButton = React.forwardRef<
  HTMLButtonElement,
  NavbarButtonProps
>(({ icon, text, variant = 'primary', ...props }, ref) => (
  <NavbarButtonRoot
    ref={ref}
    variant="contained"
    navbarVariant={variant}
    startIcon={icon}
    {...props}
  >
    {text}
  </NavbarButtonRoot>
)) as OverridableComponent<NavbarButtonTypeMap> & { displayName?: string }

NavbarButton.displayName = 'NavbarButton'

export default NavbarButton
