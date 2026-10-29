// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgFileTypeFolder({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 14"
      ref={iconRef}
      {...props}
    >
      <path
        fill="url(#file-type-folder_svg__a)"
        fillRule="evenodd"
        d="M8 2.125h6.4c.88 0 1.6.731 1.6 1.625v8.125c0 .894-.72 1.625-1.6 1.625H1.6c-.88 0-1.6-.731-1.6-1.625l.008-9.75C.008 1.231.72.5 1.6.5h4.8z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id="file-type-folder_svg__a"
          x1={8}
          x2={8}
          y1={0.5}
          y2={16.25}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.044} stopColor="#1d7aff" />
          <stop offset={0.13} stopColor="#7cb2ff" />
          <stop offset={0.617} stopColor="#76afff" />
          <stop offset={1} stopColor="#4290ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
export default SvgFileTypeFolder;

