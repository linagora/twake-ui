import { DialogActions, DialogActionsProps } from '@mui/material'
import cx from 'classnames'
import React from 'react'

import type { DialogSectionsProps } from './types'

export interface DialogFluidContentProps extends Omit<
  DialogSectionsProps,
  'title'
> {
  /** Rendered above the content, inside the scrolling area */
  header?: React.ReactNode
  dialogActionsProps: DialogActionsProps
  className?: string
}

/** Content of a dialog whose actions follow the content, and stick to the bottom of the screen on mobile */
const DialogFluidContent = ({
  header,
  content,
  actions,
  actionsLayout,
  dialogActionsProps,
  className
}: DialogFluidContentProps): React.ReactElement => (
  <div className={cx('dialogContentInner withFluidActions', className)}>
    {header}
    <div
      className={cx('dialogContentWrapper', {
        withActions: Boolean(actions)
      })}
    >
      {content}
    </div>
    {actions && (
      <DialogActions
        {...dialogActionsProps}
        disableSpacing
        className={cx(
          'dialogActionsFluid',
          { columnLayout: actionsLayout === 'column' },
          dialogActionsProps.className
        )}
      >
        {actions}
      </DialogActions>
    )}
  </div>
)

export default DialogFluidContent
