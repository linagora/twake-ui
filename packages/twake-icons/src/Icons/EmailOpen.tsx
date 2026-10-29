// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgEmailOpen({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      ref={iconRef}
      {...props}
    >
      <g clipPath="url(#email-open_svg__a)" filter="url(#email-open_svg__b)">
        <path
          fillRule="evenodd"
          d="M6.572 10.531 1.405 6.913l.746-1.065 5.167 3.619c.41.287.955.287 1.364 0l5.167-3.62.746 1.066-5.167 3.618a2.49 2.49 0 0 1-2.856 0M1.3 6.647v6.562c0 .805.653 1.458 1.459 1.458H13.24c.806 0 1.459-.653 1.459-1.458V6.647a1 1 0 0 0-.393-.795l-5.7-4.347a1 1 0 0 0-1.212 0l-5.7 4.347a1 1 0 0 0-.394.795m-1.3 0c0-.717.335-1.394.905-1.828L6.605.47a2.3 2.3 0 0 1 2.79 0l5.7 4.348c.57.434.905 1.11.905 1.828v6.562a2.76 2.76 0 0 1-2.759 2.758H2.76A2.76 2.76 0 0 1 0 13.21z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="email-open_svg__a">
          <path d="M0 0h16v16H0z" />
        </clipPath>
        <filter
          id="email-open_svg__b"
          width={18.462}
          height={18.429}
          x={-1.231}
          y={-0.985}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.246} />
          <feGaussianBlur stdDeviation={0.615} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1426_12797"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1426_12797"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
export default SvgEmailOpen;

