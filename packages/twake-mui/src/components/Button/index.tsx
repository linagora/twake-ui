import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps
} from '@mui/material'
import React from 'react'

// legacy variant names, mapped to their MUI counterpart
const legacyVariants = { primary: 'contained', secondary: 'outlined' } as const

type LegacyVariant = keyof typeof legacyVariants

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: MuiButtonProps['variant'] | LegacyVariant
}

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
)
Button.displayName = 'Button'

export default Button
