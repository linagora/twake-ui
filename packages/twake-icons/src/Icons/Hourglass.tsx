// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgHourglass({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 20"
      ref={iconRef}
      {...props}
    >
      <path d="m0 0 .01 6L4 10 .01 14.01 0 20h12v-6l-4-4 4-3.99V0zm10 14.5V18H2v-3.5l4-4z" />
    </svg>
  );
}
export default SvgHourglass;

