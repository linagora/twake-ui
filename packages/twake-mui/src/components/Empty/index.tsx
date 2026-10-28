import { SxProps, Typography, TypographyProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import cx from 'classnames'
import React from 'react'

import { Icon, IconProps } from '@linagora/twake-icons'

export type EmptyIconSize = 'normal' | 'medium' | 'large'

export interface EmptyComponentsProps {
  icon?: Partial<IconProps>
  title?: TypographyProps
  text?: TypographyProps
  childrenContainer?: React.ComponentPropsWithoutRef<'div'>
}

export interface EmptyProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'title'
> {
  icon?: IconProps['icon']
  iconSize?: EmptyIconSize
  title?: React.ReactNode
  text?: React.ReactNode
  /** Below the `lg` breakpoint, pins the block to the centre of the viewport */
  centered?: boolean
  componentsProps?: EmptyComponentsProps
  sx?: SxProps<Theme>
}

const ICON_CLASS_NAME = 'Empty-icon'

const iconHeights: Record<EmptyIconSize, { desktop: number; mobile: number }> =
  {
    normal: { desktop: 128, mobile: 96 },
    medium: { desktop: 160, mobile: 128 },
    large: { desktop: 192, mobile: 160 }
  }

interface EmptyRootProps {
  iconSize: EmptyIconSize
  centered: boolean
}

const EmptyRoot = styled('div', {
  shouldForwardProp: prop => prop !== 'iconSize' && prop !== 'centered'
})<EmptyRootProps>(
  ({ theme, iconSize, centered }: EmptyRootProps & { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 0 auto',
    alignSelf: 'center',
    margin: '0 auto',
    boxSizing: 'content-box',
    padding: theme.spacing(4),
    textAlign: 'center',
    width: `calc(100% - ${theme.spacing(8)})`,
    maxWidth: 512,
    [`& .${ICON_CLASS_NAME}`]: {
      display: 'block',
      margin: '0 auto 16px',
      height: iconHeights[iconSize].desktop,
      [theme.breakpoints.down('lg')]: {
        marginBottom: 8,
        height: iconHeights[iconSize].mobile
      }
    },
    ...(centered && {
      [theme.breakpoints.down('lg')]: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    })
  })
)

const EmptyContent = styled('div')(({ theme }: { theme: Theme }) => ({
  maxWidth: 1008,
  color: theme.vars.palette.text.secondary,
  lineHeight: 1.5
}))

export const EmptySubTitle: React.FC<TypographyProps> = props => (
  <Typography variant="body1" color="textSecondary" {...props} />
)

const renderIcon = (
  icon: IconProps['icon'],
  iconProps?: Partial<IconProps>
): React.ReactElement => {
  if (React.isValidElement<Partial<IconProps>>(icon)) {
    return React.cloneElement(icon, {
      className: cx(ICON_CLASS_NAME, icon.props.className),
      size: icon.props.size ?? (icon.type === Icon ? '100%' : undefined),
      ...iconProps
    })
  }

  return (
    <Icon className={ICON_CLASS_NAME} icon={icon} size="100%" {...iconProps} />
  )
}

export const Empty: React.FC<EmptyProps> = ({
  icon,
  iconSize = 'normal',
  title,
  text,
  centered = false,
  componentsProps,
  children,
  ...props
}) => (
  <EmptyRoot iconSize={iconSize} centered={centered} {...props}>
    {icon && renderIcon(icon, componentsProps?.icon)}
    {title && (
      <Typography
        gutterBottom
        variant="h3"
        color="textPrimary"
        {...componentsProps?.title}
      >
        {title}
      </Typography>
    )}
    {text && (
      <EmptySubTitle gutterBottom {...componentsProps?.text}>
        {text}
      </EmptySubTitle>
    )}
    <EmptyContent {...componentsProps?.childrenContainer}>
      {children}
    </EmptyContent>
  </EmptyRoot>
)

export default Empty
