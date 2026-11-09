// Hand-written: scripts/generate-svgr.sh skips assets/animated, whose CSS
// keyframes break SVGr. The keyframes live in ../Icon/styles.ts.
import * as React from 'react'
import type { SVGProps } from 'react'

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeDasharray: '100px, 100px',
  strokeDashoffset: '200px'
} as const

function SvgIconCrossAnimated({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      ref={iconRef}
      {...props}
    >
      <path
        d="M2 2L14 14"
        {...strokeProps}
        style={{ animation: 'twake-icon-draw 0.5s ease-in-out backwards' }}
      />
      <path
        d="M14 2L2 14"
        {...strokeProps}
        style={{
          animation: 'twake-icon-draw 0.5s ease-in-out 0.16s backwards'
        }}
      />
    </svg>
  )
}
export default SvgIconCrossAnimated
