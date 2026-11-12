import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material'
import cx from 'classnames'
import React from 'react'

export interface AlertProps extends MuiAlertProps {
  /** Puts the action on a row of its own under the message, aligned to this side (`true` is `'end'`) */
  block?: boolean | 'start' | 'center' | 'end'
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, block = false, ...props }, ref) => (
    <MuiAlert
      ref={ref}
      className={cx(className, {
        block: Boolean(block),
        blockStart: block === 'start',
        blockCenter: block === 'center'
      })}
      {...props}
    />
  )
)

Alert.displayName = 'Alert'

export default Alert
