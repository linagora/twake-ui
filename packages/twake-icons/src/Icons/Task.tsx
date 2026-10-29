// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgTask({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13 16"
      ref={iconRef}
      {...props}
    >
      <path d="M8 0H1.6C.72 0 .008.72.008 1.6L0 14.4c0 .88.712 1.6 1.592 1.6H11.2c.88 0 1.6-.72 1.6-1.6V4.8zm3.2 14.4H1.6V1.6h5.6v4h4zM3.856 8.84 2.72 9.968 5.552 12.8l4.528-4.528-1.128-1.128-3.392 3.392z" />
    </svg>
  );
}
export default SvgTask;

