// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgAi({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 33 33"
      ref={iconRef}
      {...props}
    >
      <rect width={32.49} height={32.49} fill="url(#ai_svg__a)" rx={10.73} />
      <g
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.608}
        clipPath="url(#ai_svg__b)"
      >
        <path d="M14.586 19.059a1.61 1.61 0 0 0-1.155-1.155L8.5 16.632a.401.401 0 0 1 0-.773l4.931-1.272a1.61 1.61 0 0 0 1.155-1.155l1.272-4.93a.402.402 0 0 1 .774 0l1.27 4.93a1.61 1.61 0 0 0 1.156 1.156l4.93 1.27a.402.402 0 0 1 0 .775l-4.93 1.271a1.61 1.61 0 0 0-1.155 1.155L16.63 23.99a.401.401 0 0 1-.774 0zm8.089-10.048v3.215m1.607-1.606h-3.216M9.813 20.265v1.607m.807-.805H9.012" />
      </g>
      <defs>
        <linearGradient
          id="ai_svg__a"
          x1={32}
          x2={7}
          y1={0}
          y2={28}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#57abff" />
          <stop offset={1} stopColor="#1d7aff" />
        </linearGradient>
        <clipPath id="ai_svg__b">
          <path fill="#fff" d="M6.6 6.6h19.29v19.29H6.6z" />
        </clipPath>
      </defs>
    </svg>
  );
}
export default SvgAi;

