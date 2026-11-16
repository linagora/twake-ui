// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgFiles({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 13"
      ref={iconRef}
      {...props}
    >
      <path
        fill="url(#files_svg__a)"
        fillRule="evenodd"
        d="M8 1.625h6.4c.88 0 1.6.731 1.6 1.625v8.125c0 .894-.72 1.625-1.6 1.625H1.6C.72 13 0 12.269 0 11.375l.008-9.75C.008.731.72 0 1.6 0h4.8z"
        clipRule="evenodd"
      />
      <path
        fill="#000"
        fillRule="evenodd"
        d="M8 1.625h6.4c.88 0 1.6.731 1.6 1.625v8.125c0 .894-.72 1.625-1.6 1.625H1.6C.72 13 0 12.269 0 11.375l.008-9.75C.008.731.72 0 1.6 0h4.8z"
        clipRule="evenodd"
        style={{
          mixBlendMode: "hue",
        }}
      />
      <defs>
        <linearGradient
          id="files_svg__a"
          x1={8}
          x2={8}
          y1={0}
          y2={15.75}
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
export default SvgFiles;

