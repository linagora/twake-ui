import CloseIcon from '@mui/icons-material/Close'
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material'
import cx from 'classnames'
import React from 'react'

export interface ChipProps extends Omit<MuiChipProps, 'color' | 'variant'> {
  color?: 'default' | 'primary' | 'error' | 'warning' | 'success'
  variant?: 'filled' | 'outlined'
  endAdornment?: React.ReactNode
  square?: boolean
}

export const Chip: React.FC<ChipProps> = ({
  className,
  color,
  variant,
  deleteIcon = <CloseIcon />,
  label,
  endAdornment,
  square = false,
  ...props
}) => {
  const finalLabel = endAdornment ? (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>{label}</span>
      <span
        className="TwakeChip-endAdornment"
        onClick={e => e.stopPropagation()}
      >
        {endAdornment}
      </span>
    </span>
  ) : (
    label
  )

  return (
    <MuiChip
      className={cx(className, { square })}
      color={color}
      variant={variant as MuiChipProps['variant']}
      deleteIcon={deleteIcon}
      label={finalLabel}
      {...props}
    />
  )
}

export default Chip
