// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgCalendarApp({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 197 197"
      ref={iconRef}
      {...props}
    >
      <rect
        width={197}
        height={197}
        fill="url(#calendar-app_svg__a)"
        rx={64.764}
      />
      <g filter="url(#calendar-app_svg__b)">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M66.58 38.931c-1.135-.607-2.478-.931-4.277-.931h-.57c-1.8 0-3.142.324-4.277.931a6.33 6.33 0 0 0-2.633 2.636c-.607 1.136-.93 2.481-.93 4.283l.005 2.637c-2.66.616-4.65 1.466-6.647 2.535-4.54 2.43-8.102 5.998-10.53 10.543S33 70.619 33 83.051v40.054c0 12.433 1.293 16.941 3.72 21.486 2.429 4.546 5.992 8.113 10.531 10.543 4.54 2.431 9.042 3.725 21.46 3.725h58.578c12.417 0 16.92-1.294 21.46-3.725s8.102-5.997 10.53-10.543S163 135.538 163 123.105V83.051c0-12.432-1.293-16.94-3.721-21.486s-5.991-8.112-10.53-10.543c-1.995-1.068-3.983-1.917-6.639-2.533l-.003-2.64c0-1.801-.323-3.146-.93-4.282a6.33 6.33 0 0 0-2.633-2.636c-1.135-.607-2.478-.931-4.277-.931h-.57c-1.799 0-3.142.324-4.277.931a6.33 6.33 0 0 0-2.633 2.636c-.607 1.136-.93 2.481-.93 4.283v1.447l-55.714-.01V45.85c0-1.802-.323-3.147-.93-4.283a6.33 6.33 0 0 0-2.633-2.636M56.987 82.16h82.025c2.691 0 3.667.28 4.65.807a5.5 5.5 0 0 1 2.282 2.285c.526.985.806 1.961.806 4.655v41.968l-.063 1.165a10.69 10.69 0 0 1-10.639 9.527l-73.135-.161-1.476-.022c-3.66-.105-5.194-.591-6.738-1.42a9.7 9.7 0 0 1-4.026-4.041c-.93-1.741-1.423-3.467-1.423-8.227V89.907l.017-1.054c.068-1.919.338-2.757.79-3.601a5.5 5.5 0 0 1 2.28-2.285c.984-.526 1.96-.807 4.65-.807m69.228 11.621h-5.359c-3.104 0-4.23.324-5.365.932a6.33 6.33 0 0 0-2.632 2.635c-.607 1.136-.93 2.264-.93 5.372v5.365c0 3.108.323 4.235.93 5.371a6.33 6.33 0 0 0 2.632 2.636c1.135.608 2.261.931 5.365.931h5.359c3.105 0 4.23-.323 5.365-.931a6.33 6.33 0 0 0 2.633-2.636c.606-1.136.93-2.263.93-5.371v-5.365c0-3.108-.324-4.236-.93-5.372a6.33 6.33 0 0 0-2.633-2.635c-1.135-.608-2.26-.932-5.365-.932"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <linearGradient
          id="calendar-app_svg__a"
          x1={18.5}
          x2={235}
          y1={196}
          y2={-27.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.287} stopColor="#fd813c" />
          <stop offset={1} stopColor="#fff500" />
        </linearGradient>
        <filter
          id="calendar-app_svg__b"
          width={150}
          height={140.859}
          x={23}
          y={30}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_60858_90"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_60858_90"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
export default SvgCalendarApp;

