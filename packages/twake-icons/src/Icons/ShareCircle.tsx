// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgShareCircle({
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
        d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16M6.541 6.92a1.5 1.5 0 1 0 0 2.16l2.47 1.235a1.5 1.5 0 1 0 .447-.894l-2.47-1.236a1.5 1.5 0 0 0 0-.37l2.47-1.235a1.5 1.5 0 1 0-.447-.894z"
      />
    </svg>
  );
}
export default SvgShareCircle;

