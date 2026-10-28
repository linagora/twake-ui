import React from 'react'

import { Icon } from '@linagora/twake-icons'

import ConfirmDialog, { ConfirmDialogProps } from './ConfirmDialog'
import PermissionDialogIcon from './PermissionDialogIcon'

export interface PermissionDialogProps extends Pick<
  ConfirmDialogProps,
  'open' | 'content' | 'actions' | 'actionsLayout' | 'onClose'
> {
  /** Describes the action to be taken */
  icon: React.ComponentProps<typeof Icon>['icon']
  title: string
}

/** Dialog confirming an action on the system, such as a permission or an authentication */
const PermissionDialog = ({
  open,
  icon,
  title,
  content,
  actions,
  actionsLayout,
  onClose
}: PermissionDialogProps): React.ReactElement => (
  <ConfirmDialog
    open={open}
    size="small"
    disableTitleAutoPadding
    classes={{ paper: 'u-ov-visible' }}
    componentsProps={{
      dialogTitle: {
        className: 'u-flex u-flex-justify-center u-ta-center u-pt-2 u-pb-half'
      },
      dialogContent: { className: 'u-ov-visible' }
    }}
    title={
      <>
        <PermissionDialogIcon
          elevation={2}
          className="u-pos-absolute u-bdrs-circle u-flex"
        >
          <Icon className="u-m-auto" icon={icon} size={48} />
        </PermissionDialogIcon>
        {title}
      </>
    }
    content={content}
    actions={actions}
    actionsLayout={actionsLayout}
    onClose={onClose}
  />
)

export default PermissionDialog
