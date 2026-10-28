import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider
} from '@mui/material'
import cx from 'classnames'
import React from 'react'

import Dialog from '../Dialog'
import DialogNavButtons from './DialogNavButtons'
import type { DialogSectionsProps } from './types'
import { DialogLayoutProps, useDialogLayout } from './useDialogLayout'

export interface FixedDialogProps
  extends DialogLayoutProps, DialogSectionsProps {}

/** Dialog whose title and actions stay visible while a long content scrolls between them */
const FixedDialog = ({
  title,
  content,
  actions,
  actionsLayout,
  ...props
}: FixedDialogProps): React.ReactElement => {
  const {
    id,
    fullScreen,
    dialogProps,
    dialogTitleProps,
    dividerProps,
    dialogActionsProps,
    dialogContentProps
  } = useDialogLayout(props)

  return (
    <Dialog {...dialogProps}>
      <DialogNavButtons
        id={id}
        fullScreen={fullScreen}
        onClose={props.onClose}
        onBack={props.onBack}
      />
      {title && (
        <>
          <DialogTitle {...dialogTitleProps}>{title}</DialogTitle>
          <Divider {...dividerProps} />
        </>
      )}
      <DialogContent {...dialogContentProps}>
        <div className="dialogContentInner">{content}</div>
      </DialogContent>
      <Divider {...dividerProps} />
      {actions && (
        <DialogActions
          {...dialogActionsProps}
          disableSpacing
          className={cx(
            { columnLayout: actionsLayout === 'column' },
            dialogActionsProps.className
          )}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default FixedDialog
