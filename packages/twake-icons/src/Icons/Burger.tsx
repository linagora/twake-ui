// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgBurger({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 10"
      ref={iconRef}
      {...props}
    >
      <path d="M0 8.2v1.6h16V8.2zm0-4v1.6h16V4.2zm0-4v1.6h16V.2z" />
    </svg>
  );
}
export default SvgBurger;

