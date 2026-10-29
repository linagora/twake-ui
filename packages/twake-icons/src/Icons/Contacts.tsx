// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgContacts({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      ref={iconRef}
      {...props}
    >
      <g filter="url(#contacts_svg__a)">
        <path
          fill="#fff"
          d="M15.992 5.874c5.857 0 10.606 4.102 10.606 9.16 0 5.06-4.749 9.16-10.606 9.16a12.1 12.1 0 0 1-3.432-.49q-1.805 1.404-5.596 2.356a.485.485 0 0 1-.541-.706l.18-.329q1.26-2.316 1.572-3.8c-1.733-1.63-2.79-3.804-2.79-6.19 0-5.06 4.749-9.16 10.607-9.16Z"
        />
      </g>
      <g clipPath="url(#contacts_svg__b)">
        <rect width={32} height={32} fill="url(#contacts_svg__c)" rx={10} />
        <g fill="#fff" filter="url(#contacts_svg__d)">
          <path d="M15.99 16.016a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9m8.85 6.028c-.68-1.907-2.795-4.028-8.85-4.028s-8.171 2.122-8.85 4.029c-.599 1.682 1.081 2.971 2.867 2.971h11.965c1.786 0 3.466-1.289 2.867-2.971Z" />
        </g>
      </g>
      <defs>
        <filter
          id="contacts_svg__a"
          width={24.477}
          height={23.463}
          x={3.753}
          y={4.569}
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
            result="effect1_dropShadow_3096_936"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3096_936"
            result="shape"
          />
        </filter>
        <filter
          id="contacts_svg__d"
          width={23.66}
          height={23.714}
          x={4.16}
          y={4.731}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.571} />
          <feGaussianBlur stdDeviation={1.429} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3096_936"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3096_936"
            result="shape"
          />
        </filter>
        <linearGradient
          id="contacts_svg__c"
          x1={5.548}
          x2={30.188}
          y1={29.127}
          y2={1.958}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.23} stopColor="#f74ea9" />
          <stop offset={1} stopColor="#ffb2a8" />
        </linearGradient>
        <clipPath id="contacts_svg__b">
          <path fill="#fff" d="M0 0h31.983v31.983H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
export default SvgContacts;

