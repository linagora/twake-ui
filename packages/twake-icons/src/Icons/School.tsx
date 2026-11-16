// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgSchool({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 14"
      ref={iconRef}
      {...props}
    >
      <path d="M8 0 0 4.364l2.91 1.585v4.364L8 13.09l5.09-2.778V5.949l1.456-.793v5.026H16V4.364zm4.96 4.364L8 7.069 3.04 4.364 8 1.658zm-1.324 5.083L8 11.433 4.364 9.447V6.742L8 8.727l3.636-1.985z" />
    </svg>
  );
}
export default SvgSchool;

