// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgChat({
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
      <g clipPath="url(#chat_svg__a)">
        <rect
          width={32.017}
          height={32.017}
          x={0.704}
          y={0.704}
          fill="url(#chat_svg__b)"
          rx={10.574}
        />
        <g filter="url(#chat_svg__c)">
          <path
            fill="#fff"
            d="M16.704 7.398c5.861 0 10.613 4.104 10.613 9.165 0 5.062-4.752 9.165-10.613 9.165a12.1 12.1 0 0 1-3.433-.49q-1.806 1.404-5.6 2.356a.484.484 0 0 1-.54-.706l.18-.329q1.26-2.318 1.572-3.802c-1.733-1.63-2.791-3.806-2.791-6.194 0-5.061 4.751-9.165 10.612-9.165"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="chat_svg__b"
          x1={5.031}
          x2={30.745}
          y1={30.092}
          y2={0.704}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8135fe" />
          <stop offset={1} stopColor="#e8a6ff" />
        </linearGradient>
        <clipPath id="chat_svg__a">
          <path fill="#fff" d="M.704.704h32v32h-32z" />
        </clipPath>
        <filter
          id="chat_svg__c"
          width={24.49}
          height={23.476}
          x={4.459}
          y={6.092}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.327} />
          <feGaussianBlur stdDeviation={0.816} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11347_30938"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_11347_30938"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
export default SvgChat;

