import { Icon, IconProps } from '@linagora/twake-icons'
import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps
} from '@mui/material'
import React from 'react'

export interface SwitchProps extends Omit<
  MuiSwitchProps,
  'icon' | 'checkedIcon'
> {
  /** A twake icon drawn inside the thumb */
  icon?: IconProps['icon']
}

export const Switch: React.FC<SwitchProps> = ({ icon, ...props }) => {
  const thumb = (
    <span className="switchThumb">
      {!!icon && <Icon icon={icon} size={14} />}
    </span>
  )

  return <MuiSwitch icon={thumb} checkedIcon={thumb} {...props} />
}

export default Switch
