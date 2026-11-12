// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgCredit({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1.614 -1.628 19.228 19.228"
      ref={iconRef}
      {...props}
    >
      <g fillRule="evenodd">
        <path
          d="M3.414 10H11a1 1 0 0 1 0 2H3.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 1 1 1.414 1.414z"
          opacity={0.322}
        />
        <path d="m12.586 4-1.293-1.293a1 1 0 1 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L12.586 6H5a1 1 0 1 1 0-2z" />
      </g>
    </svg>
  );
}
export default SvgCredit;

