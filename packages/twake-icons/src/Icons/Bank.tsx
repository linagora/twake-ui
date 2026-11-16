// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgBank({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 16"
      ref={iconRef}
      {...props}
    >
      <path d="M4.5 7.2H2.9v5.6h1.6zm4.8 0H7.7v5.6h1.6zm6.8 7.2H.9V16h15.2zm-2-7.2h-1.6v5.6h1.6zM8.5 1.808 12.668 4H4.332zM8.5 0 .9 4v1.6h15.2V4z" />
    </svg>
  );
}
export default SvgBank;

