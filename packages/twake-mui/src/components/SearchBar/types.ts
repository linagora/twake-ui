import { InputBaseProps, PaperProps } from '@mui/material'
import React from 'react'

export interface SearchBarProps extends Omit<
  PaperProps,
  'onChange' | 'onBlur' | 'onFocus'
> {
  type?: 'button' | 'search'
  size?: 'small' | 'medium' | 'large' | 'auto'
  icon?: React.ElementType
  componentsProps?: {
    inputBase?: InputBaseProps
  }
  value?: string
  defaultValue?: string
  disabledClear?: boolean
  disabledFocus?: boolean
  disabledHover?: boolean
  elevation?: number
  placeholder?: string
  label?: React.ReactNode
  disabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onClear?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}
