import { DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

import Dialog from '../Dialog'
import DialogFluidContent from './DialogFluidContent'
import DialogNavButtons from './DialogNavButtons'
import type { DialogSectionsProps } from './types'
import { DialogLayoutProps, useDialogLayout } from './useDialogLayout'

export interface ConfirmDialogProps
  extends DialogLayoutProps, DialogSectionsProps {}

/** Small dialog asking to confirm an action, its title scrolling with the content */
const ConfirmDialog = ({
  size = 'small',
  title,
  content,
  actions,
  actionsLayout,
  ...props
}: ConfirmDialogProps): React.ReactElement => {
  const {
    id,
    fullScreen,
    dialogProps,
    dialogTitleProps,
    dialogActionsProps,
    dialogContentProps
  } = useDialogLayout({ ...props, size, isFluidTitle: true })

  return (
    <Dialog {...dialogProps}>
      <DialogNavButtons
        id={id}
        fullScreen={fullScreen}
        onClose={props.onClose}
        onBack={props.onBack}
      />
      <DialogContent {...dialogContentProps}>
        <DialogFluidContent
          header={
            title && (
              <div className="dialogTitleFluidContainer">
                <DialogTitle {...dialogTitleProps}>{title}</DialogTitle>
              </div>
            )
          }
          content={content}
          actions={actions}
          actionsLayout={actionsLayout}
          dialogActionsProps={dialogActionsProps}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
