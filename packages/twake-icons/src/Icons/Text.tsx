// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgText({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 6"
      ref={iconRef}
      {...props}
    >
      <path d="M0 0h16v2H0zm0 4h10v2H0z" />
    </svg>
  );
}
export default SvgText;

