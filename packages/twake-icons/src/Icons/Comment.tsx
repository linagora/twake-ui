// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgComment({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      ref={iconRef}
      {...props}
    >
      <path d="M2 2h16v12H3.17L2 15.17zm0-2C.9 0 .01.9.01 2L0 20l4-4h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm2 10h8v2H4zm0-3h12v2H4zm0-3h12v2H4z" />
    </svg>
  );
}
export default SvgComment;

