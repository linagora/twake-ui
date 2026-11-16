// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgCloudHappy({
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
        d="M4 6a4 4 0 1 1 8 0 4 4 0 1 1 0 8H4a4 4 0 1 1 0-8m1 3s0 2 3 2 3-2 3-2z"
      />
    </svg>
  );
}
export default SvgCloudHappy;

