import { Icon, IconProps, Bottom } from '@linagora/twake-icons'
import { Box, Typography, TypographyProps } from '@mui/material'
import React from 'react'

const iconSizeByVariant = {
  h1: 24,
  h2: 17,
  h3: 15,
  h4: 14,
  h5: 13,
  h6: 12,
  body1: 12,
  body2: 11,
  caption: 10,
  subtitle1: 11,
  subtitle2: 10
} as const

export type DropdownTextVariant = keyof typeof iconSizeByVariant

export interface DropdownTextProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'color'
> {
  variant?: DropdownTextVariant
  color?: TypographyProps['color']
  disabled?: boolean
  noWrap?: boolean
  spaceBetween?: boolean
  innerTextProps?: TypographyProps
  innerIconContainerProps?: TypographyProps
  innerIconProps?: Omit<IconProps, 'icon'>
}

const DropdownText = React.forwardRef<HTMLDivElement, DropdownTextProps>(
  (
    {
      variant = 'body1',
      color = 'inherit',
      disabled = false,
      noWrap = false,
      spaceBetween = false,
      innerTextProps,
      innerIconContainerProps,
      innerIconProps,
      children,
      ...props
    },
    ref
  ) => {
    const textColor = disabled ? 'textDisabled' : color

    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: spaceBetween ? 'space-between' : undefined
        }}
        {...props}
      >
        <Typography
          variant={variant}
          color={textColor}
          noWrap={noWrap}
          {...innerTextProps}
        >
          {children}
        </Typography>
        <Typography
          component="span"
          color={textColor}
          sx={{
            display: 'flex',
            ml: '5px',
            mt: variant === 'body1' ? '3px' : undefined
          }}
          {...innerIconContainerProps}
        >
          <Icon
            icon={Bottom}
            size={iconSizeByVariant[variant]}
            {...innerIconProps}
          />
        </Typography>
      </Box>
    )
  }
)

DropdownText.displayName = 'DropdownText'

export default DropdownText
