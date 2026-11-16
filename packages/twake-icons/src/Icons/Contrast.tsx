// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgContrast({
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
      <path d="M8 16c4.416 0 8-3.584 8-8s-3.584-8-8-8-8 3.584-8 8 3.584 8 8 8m.8-14.344A6.4 6.4 0 0 1 14.4 8a6.39 6.39 0 0 1-5.6 6.344z" />
    </svg>
  );
}
export default SvgContrast;

