import { Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

import DropdownText, {
  DropdownTextProps,
  DropdownTextVariant
} from '../DropdownText'

export interface DropdownButtonProps extends ButtonProps {
  textVariant?: DropdownTextVariant
  spaceBetween?: boolean
  noWrap?: boolean
  dropdownTextProps?: Partial<DropdownTextProps>
}

const StyledButton = styled(Button)({
  minHeight: 'auto',
  margin: -8,
  padding: 8,
  textAlign: 'left',
  variants: [
    {
      props: { fullWidth: true },
      style: { width: 'calc(100% + 16px)' }
    }
  ]
})

const DropdownButton = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
  (
    {
      textVariant = 'body1',
      spaceBetween = false,
      disabled = false,
      fullWidth = false,
      noWrap = false,
      dropdownTextProps,
      children,
      ...props
    },
    ref
  ) => (
    <StyledButton
      ref={ref}
      variant="text"
      color="inherit"
      disabled={disabled}
      fullWidth={fullWidth || noWrap}
      {...props}
    >
      <DropdownText
        variant={textVariant}
        spaceBetween={spaceBetween}
        disabled={disabled}
        noWrap={noWrap}
        {...dropdownTextProps}
      >
        {children}
      </DropdownText>
    </StyledButton>
  )
)

DropdownButton.displayName = 'DropdownButton'

export default DropdownButton
