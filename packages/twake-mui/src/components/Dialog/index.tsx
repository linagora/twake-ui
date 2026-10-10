import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps
} from '@mui/material'
import cx from 'classnames'
import React from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'

export type DialogSize = 'small' | 'medium' | 'large' | 'full'

export type DialogBackdrop = 'light' | 'dark'

export interface DialogProps extends MuiDialogProps {
  /** Paper width. Every size but `small` goes full screen on mobile */
  size?: DialogSize
  /** Veil behind the dialog. `light` is a tint of the text colour */
  backdrop?: DialogBackdrop
}

export const Dialog: React.FC<DialogProps> = ({
  size = 'medium',
  backdrop = 'dark',
  fullScreen,
  classes,
  className,
  ...props
}) => {
  const { isMobile } = useBreakpoints()

  return (
    <MuiDialog
      fullScreen={fullScreen ?? (size !== 'small' && isMobile)}
      classes={{ ...classes, paper: cx(size, classes?.paper) }}
      className={cx({ backdropLight: backdrop === 'light' }, className)}
      {...props}
    />
  )
}

export default Dialog
