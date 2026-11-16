// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgForbiddenSign({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      ref={iconRef}
      {...props}
    >
      <g clipPath="url(#forbidden-sign_svg__a)">
        <mask
          id="forbidden-sign_svg__b"
          width={16}
          height={16}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "luminance",
          }}
        >
          <path fill="#fff" d="M16 0H0v16h16z" />
        </mask>
        <g mask="url(#forbidden-sign_svg__b)">
          <mask
            id="forbidden-sign_svg__c"
            width={16}
            height={16}
            x={0}
            y={0}
            maskUnits="userSpaceOnUse"
            style={{
              maskType: "luminance",
            }}
          >
            <path fill="#fff" d="M16 0H0v16h16z" />
          </mask>
          <g mask="url(#forbidden-sign_svg__c)">
            <path
              fill="#fff"
              d="M10.722 0H5.287A5.287 5.287 0 0 0 0 5.287v5.435a5.287 5.287 0 0 0 5.287 5.287h5.435a5.287 5.287 0 0 0 5.287-5.287V5.287A5.287 5.287 0 0 0 10.722 0"
            />
            <path
              fill="#ff8f00"
              fillOpacity={0.12}
              d="M10.722 0H5.287A5.287 5.287 0 0 0 0 5.287v5.435a5.287 5.287 0 0 0 5.287 5.287h5.435a5.287 5.287 0 0 0 5.287-5.287V5.287A5.287 5.287 0 0 0 10.722 0"
            />
          </g>
        </g>
      </g>
      <path
        fill="#ff6f00"
        fillRule="evenodd"
        d="M5.555 6.262a3 3 0 0 0 4.184 4.184zm.707-.707 4.183 4.183a3 3 0 0 0-4.184-4.184ZM8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8"
        clipRule="evenodd"
      />
      <defs>
        <clipPath id="forbidden-sign_svg__a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
export default SvgForbiddenSign;

