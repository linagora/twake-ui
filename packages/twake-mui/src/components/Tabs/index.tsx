import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material'
import cx from 'classnames'
import React from 'react'

export interface TabsProps extends MuiTabsProps {
  /** Drops the minimum tab width */
  narrowed?: boolean
  /** Pill container with the selected tab raised on a white pill */
  segmented?: boolean
}

export const Tabs: React.FC<TabsProps> = ({
  className,
  narrowed,
  segmented,
  ...props
}) => <MuiTabs className={cx(className, { narrowed, segmented })} {...props} />

export default Tabs
