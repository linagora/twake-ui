import { Icon, CrossSmall } from '@linagora/twake-icons'
import {
  Box,
  Chip as MuiChip,
  ChipProps as MuiChipProps,
  IconButton
} from '@mui/material'
import cx from 'classnames'
import React from 'react'

export interface ChipProps extends MuiChipProps {
  endIcon?: React.ReactNode
  square?: boolean
}

export const Chip: React.FC<ChipProps> = ({
  className,
  deleteIcon = (
    <IconButton>
      <Icon icon={CrossSmall} />
    </IconButton>
  ),
  label,
  endIcon,
  square = false,
  ...props
}) => {
  return (
    <MuiChip
      className={cx(className, { square })}
      deleteIcon={deleteIcon}
      label={
        endIcon ? (
          <Box
            component="span"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {label}
            <span>{endIcon}</span>
          </Box>
        ) : (
          label
        )
      }
      {...props}
    />
  )
}

export default Chip
