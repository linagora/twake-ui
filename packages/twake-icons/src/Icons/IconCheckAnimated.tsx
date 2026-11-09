// Hand-written: scripts/generate-svgr.sh skips assets/animated, whose CSS
// keyframes break SVGr. The keyframes live in ../Icon/styles.ts.
import * as React from 'react'
import type { SVGProps } from 'react'

function SvgIconCheckAnimated({
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
        d="M1 11L4 14L15 3"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="100px, 100px"
        strokeDashoffset="200px"
        style={{ animation: 'twake-icon-draw 1s ease-in-out backwards' }}
      />
    </svg>
  )
}
export default SvgIconCheckAnimated
