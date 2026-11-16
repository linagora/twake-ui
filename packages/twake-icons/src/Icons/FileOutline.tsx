// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgFileOutline({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 16"
      ref={iconRef}
      {...props}
    >
      <path d="M8.6 0H2.2C1.32 0 .608.72.608 1.6L.6 14.4c0 .88.712 1.6 1.592 1.6H11.8c.88 0 1.6-.72 1.6-1.6V4.8zM2.2 14.4V1.6h5.6v4h4v8.8z" />
    </svg>
  );
}
export default SvgFileOutline;

