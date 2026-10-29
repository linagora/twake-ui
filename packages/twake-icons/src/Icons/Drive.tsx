// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgDrive({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 33 33"
      ref={iconRef}
      {...props}
    >
      <rect
        width={32}
        height={32}
        x={0.618}
        y={0.718}
        fill="url(#drive_svg__a)"
        rx={10.568}
      />
      <g fill="#fff" filter="url(#drive_svg__b)">
        <path
          fillRule="evenodd"
          d="M16.61 18.913a5.3 5.3 0 0 0-.228-1.54 5.5 5.5 0 0 0-.398-.96 5.3 5.3 0 0 0-.927-1.25 5.3 5.3 0 0 0-2.972-1.496 5.5 5.5 0 0 0-.779-.058 5.3 5.3 0 0 0-1.54.229 5.4 5.4 0 0 0-1.406.665 5.3 5.3 0 0 0-1.953 2.38 5.3 5.3 0 0 0-.398 2.29 5.306 5.306 0 0 0 5.037 5.037q.13.006.26.006h8.486v-5.303z"
          clipRule="evenodd"
        />
        <path d="M19.791 24.216a7.425 7.425 0 1 0 0-14.85 7.425 7.425 0 0 0 0 14.85" />
      </g>
      <defs>
        <linearGradient
          id="drive_svg__a"
          x1={4.126}
          x2={39.046}
          y1={29.682}
          y2={-5.32}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.248} stopColor="#ff4759" />
          <stop offset={1} stopColor="#ffd600" />
        </linearGradient>
        <filter
          id="drive_svg__b"
          width={24.477}
          height={18.113}
          x={4.371}
          y={8.061}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.326} />
          <feGaussianBlur stdDeviation={0.816} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11347_30928"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_11347_30928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
export default SvgDrive;

