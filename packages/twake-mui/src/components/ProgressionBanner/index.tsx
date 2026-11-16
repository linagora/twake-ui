import { AlertProps, Typography } from '@mui/material'
import React from 'react'

import ProgressionBannerProgress from './ProgressionBannerProgress'
import ProgressionBannerRoot from './ProgressionBannerRoot'

export interface ProgressionBannerProps extends Omit<
  AlertProps,
  'color' | 'children'
> {
  /** Percentage of progression, between 0 and 100. Without it the bar is indeterminate. */
  value?: number
  text?: React.ReactNode
  /** Rendered as the alert action */
  button?: React.ReactNode
  progressBar?: boolean
  /** Background colour of the banner, any CSS colour */
  color?: string
}

const ProgressionBanner: React.FC<ProgressionBannerProps> = ({
  value,
  text,
  icon,
  button,
  progressBar = true,
  color,
  ...props
}) => (
  <>
    <ProgressionBannerRoot
      icon={
        React.isValidElement<{ size?: number | string }>(icon)
          ? React.cloneElement(icon, { size: icon.props.size ?? 32 })
          : icon
      }
      action={button}
      background={color}
      {...props}
    >
      <Typography component="span" variant="h6">
        {text}
      </Typography>
    </ProgressionBannerRoot>
    {progressBar && (
      <ProgressionBannerProgress
        variant={value ? 'determinate' : 'indeterminate'}
        value={value}
      />
    )}
  </>
)

export default ProgressionBanner
