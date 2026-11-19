import { SxProps, Typography, TypographyProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import cx from 'classnames'
import React from 'react'

import { Icon, IconProps } from '@linagora/twake-icons'

export type EmptyIconSize = 'normal' | 'medium' | 'large'

export type EmptyIconLook = 'plain' | 'tile'

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
  /** No effect with `tile` or with a `size` in `componentsProps.icon` */
  iconSize?: EmptyIconSize
  /**
   * `plain`: a large glyph in the text colour; `tile`: a 60 px white icon
   * with a soft shadow on a 100 px tile in `action.selected`. `iconSize` has
   * no effect with `tile`
   */
  iconLook?: EmptyIconLook
  title?: React.ReactNode
  text?: React.ReactNode
  /** Below the `lg` breakpoint, pins the block to the centre of the viewport */
  centered?: boolean
  componentsProps?: EmptyComponentsProps
  sx?: SxProps<Theme>
}

const ICON_CLASS_NAME = 'Empty-icon'
const ICON_TILE_CLASS_NAME = 'Empty-iconTile'
const ICON_SIZED_CLASS_NAME = 'Empty-iconSized'
const ILLUSTRATION_ICON_SIZE = 60

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
      [theme.breakpoints.down('lg')]: {
        marginBottom: 8
      },
      [`&.${ICON_TILE_CLASS_NAME}`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        // Rounder than the radius scale, as the Figma (33 on a 100 px tile)
        borderRadius: 33,
        backgroundColor: theme.vars.palette.action.selected,
        color: theme.vars.palette.common.white,
        fill: 'currentColor',
        '& svg': { filter: 'drop-shadow(0 2px 10px rgb(0 0 0 / 10%))' }
      }
    },
    // :where keeps the weight of `& .Empty-icon`, so an app's sx height still wins
    [`& .${ICON_CLASS_NAME}:not(:where(.${ICON_SIZED_CLASS_NAME}, .${ICON_TILE_CLASS_NAME}))`]:
      {
        height: iconHeights[iconSize].desktop,
        [theme.breakpoints.down('lg')]: {
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
  iconLook: EmptyIconLook,
  iconProps?: Partial<IconProps>
): React.ReactElement => {
  if (iconLook === 'tile') {
    return (
      <span
        className={cx(ICON_CLASS_NAME, ICON_TILE_CLASS_NAME)}
        aria-hidden="true"
      >
        {React.isValidElement<Partial<IconProps>>(icon) ? (
          React.cloneElement(
            icon,
            icon.type === Icon
              ? {
                  size: icon.props.size ?? ILLUSTRATION_ICON_SIZE,
                  ...iconProps
                }
              : {
                  width: icon.props.width ?? ILLUSTRATION_ICON_SIZE,
                  height: icon.props.height ?? ILLUSTRATION_ICON_SIZE,
                  ...iconProps
                }
          )
        ) : (
          <Icon icon={icon} size={ILLUSTRATION_ICON_SIZE} {...iconProps} />
        )}
      </span>
    )
  }
  if (React.isValidElement<Partial<IconProps>>(icon)) {
    const size = iconProps?.size ?? icon.props.size
    return React.cloneElement(icon, {
      className: cx(
        ICON_CLASS_NAME,
        size !== undefined && ICON_SIZED_CLASS_NAME,
        icon.props.className
      ),
      ...(icon.type === Icon
        ? { size: size ?? '100%' }
        : size !== undefined && { width: size, height: size }),
      'aria-hidden': 'true',
      ...iconProps
    })
  }

  return (
    <Icon
      className={cx(
        ICON_CLASS_NAME,
        iconProps?.size !== undefined && ICON_SIZED_CLASS_NAME
      )}
      icon={icon}
      size="100%"
      aria-hidden="true"
      {...iconProps}
    />
  )
}

export const Empty: React.FC<EmptyProps> = ({
  icon,
  iconSize = 'normal',
  iconLook = 'plain',
  title,
  text,
  centered = false,
  componentsProps,
  children,
  ...props
}) => (
  <EmptyRoot iconSize={iconSize} centered={centered} {...props}>
    {icon && renderIcon(icon, iconLook, componentsProps?.icon)}
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
