import cx from 'classnames'
import React, { forwardRef } from 'react'

// Wraps the RTL-overflowing last part so its characters still read left-to-right
const LRM = '‎'

export interface MidEllipsisProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  text?: string
  children?: string
}

const MidEllipsis = forwardRef<HTMLDivElement, MidEllipsisProps>(
  ({ text, className, children, ...props }, ref) => {
    const str = text || children || ''
    const partLength = Math.round(str.length / 2)

    return (
      <div className={cx('u-midellipsis', className)} ref={ref} {...props}>
        <span>{str.substring(0, partLength)}</span>
        <span>
          {LRM}
          {str.substring(partLength)}
          {LRM}
        </span>
      </div>
    )
  }
)

MidEllipsis.displayName = 'MidEllipsis'

export default MidEllipsis
