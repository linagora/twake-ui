import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  ButtonTypeMap as MuiButtonTypeMap
} from '@mui/material'
import {
  OverridableComponent,
  OverrideProps
} from '@mui/material/OverridableComponent'
import React from 'react'

// legacy variant names, mapped to their MUI counterpart
const legacyVariants = { primary: 'contained', secondary: 'outlined' } as const

type LegacyVariant = keyof typeof legacyVariants

export interface ButtonTypeMap<
  AdditionalProps = object,
  RootComponent extends React.ElementType = 'button'
> {
  props: AdditionalProps &
    Omit<MuiButtonTypeMap['props'], 'variant'> & {
      variant?: MuiButtonProps['variant'] | LegacyVariant
    }
  defaultComponent: RootComponent
}

export type ButtonProps<
  RootComponent extends React.ElementType = 'button',
  AdditionalProps = object
> = OverrideProps<ButtonTypeMap<AdditionalProps, RootComponent>, RootComponent>

const isLegacy = (variant: ButtonProps['variant']): variant is LegacyVariant =>
  typeof variant === 'string' && variant in legacyVariants

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, ...props }, ref) => (
    <MuiButton
      ref={ref}
      variant={isLegacy(variant) ? legacyVariants[variant] : variant}
      {...props}
    />
  )
) as OverridableComponent<ButtonTypeMap> & { displayName?: string }

Button.displayName = 'Button'

export default Button
