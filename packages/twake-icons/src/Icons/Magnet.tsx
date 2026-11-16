// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgMagnet({
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
      <path
        fillRule="evenodd"
        d="M11 3h4v6A7 7 0 1 1 1 9V3h4v6c0 1.654 1.346 3 3 3s3-1.346 3-3zm0-1V0h4.001v2zM1 2V0h4v2z"
      />
    </svg>
  );
}
export default SvgMagnet;

