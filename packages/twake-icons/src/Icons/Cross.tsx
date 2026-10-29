// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgCross({
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
      <path d="M2.4 15 1 13.6 6.6 8 1 2.4 2.4 1 8 6.6 13.6 1 15 2.4 9.4 8l5.6 5.6-1.4 1.4L8 9.4z" />
    </svg>
  );
}
export default SvgCross;

