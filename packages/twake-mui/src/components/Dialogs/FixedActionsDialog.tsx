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

export interface FixedActionsDialogProps
  extends DialogLayoutProps, DialogSectionsProps {}

/** Dialog whose actions stay visible while the title scrolls with a long content */
const FixedActionsDialog = ({
  title,
  content,
  actions,
  actionsLayout,
  ...props
}: FixedActionsDialogProps): React.ReactElement => {
  const {
    id,
    fullScreen,
    dialogProps,
    dialogTitleProps,
    dividerProps,
    dialogActionsProps,
    dialogContentProps
  } = useDialogLayout({ ...props, isFluidTitle: true })

  return (
    <Dialog {...dialogProps}>
      <DialogNavButtons
        id={id}
        fullScreen={fullScreen}
        onClose={props.onClose}
        onBack={props.onBack}
      />
      <DialogContent {...dialogContentProps}>
        <div className="dialogContentInner">
          {title && (
            <div className="dialogTitleFluidContainer">
              <DialogTitle {...dialogTitleProps}>{title}</DialogTitle>
            </div>
          )}
          {content}
        </div>
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

export default FixedActionsDialog
