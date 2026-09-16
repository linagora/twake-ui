import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps
} from '@mui/material'
import cx from 'classnames'
import React from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'

export type DialogSize = 'small' | 'medium' | 'large' | 'full'

export interface DialogProps extends MuiDialogProps {
  /** Paper width. Every size but `small` goes full screen on mobile */
  size?: DialogSize
}

export const Dialog: React.FC<DialogProps> = ({
  size = 'medium',
  fullScreen,
  classes,
  ...props
}) => {
  const { isMobile } = useBreakpoints()

  return (
    <MuiDialog
      fullScreen={fullScreen ?? (size !== 'small' && isMobile)}
      classes={{ ...classes, paper: cx(size, classes?.paper) }}
      {...props}
    />
  )
}

export default Dialog
