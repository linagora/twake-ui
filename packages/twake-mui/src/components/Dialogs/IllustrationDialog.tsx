import { DialogContent, DialogTitle } from '@mui/material'
import cx from 'classnames'
import React from 'react'

import Dialog from '../Dialog'
import DialogFluidContent from './DialogFluidContent'
import DialogNavButtons from './DialogNavButtons'
import type { DialogSectionsProps } from './types'
import { DialogLayoutProps, useDialogLayout } from './useDialogLayout'

export interface IllustrationDialogProps
  extends DialogLayoutProps, DialogSectionsProps {}

/** Dialog whose title is an illustration, centered above a short content */
const IllustrationDialog = ({
  title,
  content,
  actions,
  actionsLayout,
  ...props
}: IllustrationDialogProps): React.ReactElement => {
  const {
    id,
    fullScreen,
    dialogProps,
    dialogTitleProps,
    dialogActionsProps,
    dialogContentProps
  } = useDialogLayout({
    ...props,
    isFluidTitle: true,
    disableTitleAutoPadding: true
  })

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
          className="u-pt-1-half"
          header={
            title && (
              <div className="dialogTitleFluidContainer">
                <DialogTitle
                  {...dialogTitleProps}
                  className={cx(
                    'u-flex u-flex-justify-center',
                    dialogTitleProps.className
                  )}
                >
                  {title}
                </DialogTitle>
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

export default IllustrationDialog
