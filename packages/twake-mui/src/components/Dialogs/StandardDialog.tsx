import { DialogContent, DialogTitle, Divider } from '@mui/material'
import React from 'react'

import Dialog from '../Dialog'
import DialogFluidContent from './DialogFluidContent'
import DialogNavButtons from './DialogNavButtons'
import type { DialogSectionsProps } from './types'
import { DialogLayoutProps, useDialogLayout } from './useDialogLayout'

export interface StandardDialogProps
  extends DialogLayoutProps, DialogSectionsProps {}

/**
 * Dialog laid out with a title, a content and actions. It is labelled by its
 * title and goes full screen on mobile unless its size is `small`.
 */
const StandardDialog = ({
  title,
  content,
  actions,
  actionsLayout,
  ...props
}: StandardDialogProps): React.ReactElement => {
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
        <DialogFluidContent
          content={content}
          actions={actions}
          actionsLayout={actionsLayout}
          dialogActionsProps={dialogActionsProps}
        />
      </DialogContent>
    </Dialog>
  )
}

export default StandardDialog
