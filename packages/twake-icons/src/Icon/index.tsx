import React, {
  type CSSProperties,
  type ComponentType,
  type ReactElement,
  type SVGAttributes
} from 'react'

import './styles'

const DEFAULT_SIZE = '16'

function makeSvgObject(
  icon: string
): ComponentType<SVGAttributes<SVGSVGElement>> {
  const anchor = icon.startsWith('#') ? icon : `#${icon}`

  function SvgObject(props: SVGAttributes<SVGSVGElement>): ReactElement {
    return (
      <svg {...props}>
        <use href={anchor} />
      </svg>
    )
  }
  SvgObject.displayName = 'SvgObject'
  return SvgObject
}

function isFunction(
  value: unknown
): value is ComponentType<SVGAttributes<SVGSVGElement>> {
  return typeof value === 'function'
}

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  icon: string | ComponentType<SVGAttributes<SVGSVGElement>> | ReactElement
  width?: number | string
  height?: number | string
  size?: number | string
  color?: string
  preserveColor?: boolean
  rotate?: number
  spin?: boolean
}

function Icon(props: IconProps): ReactElement | null {
  const {
    icon,
    width,
    height,
    color,
    style,
    className,
    preserveColor,
    rotate,
    size,
    spin,
    ...restProps
  } = props

  if (!icon) return null

  if (React.isValidElement(icon)) {
    return icon
  }

  const isPngPath = typeof icon === 'string' && icon.includes('.png')

  if (isPngPath)
    return (
      <img
        src={icon}
        className={className}
        style={style}
        width={width || size || DEFAULT_SIZE}
        height={height || size || DEFAULT_SIZE}
        {...(restProps as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    )

  const Svg = isFunction(icon) ? icon : makeSvgObject(icon as string)

  const _style: CSSProperties = {
    ...style,
    ...(color ? { fill: color } : {}),
    ...(rotate ? { transform: `rotate(${rotate}deg)` } : {})
  }

  const baseClass = preserveColor ? 'twake-icon--preserveColor' : 'twake-icon'
  const iconClass = [baseClass, spin && 'twake-icon--spin', className]
    .filter(Boolean)
    .join(' ')

  return Svg ? (
    // eslint-disable-next-line react-hooks/static-components
    <Svg
      className={iconClass}
      style={_style}
      width={width || size || DEFAULT_SIZE}
      height={height || size || DEFAULT_SIZE}
      {...restProps}
    />
  ) : null
}

export default Icon
