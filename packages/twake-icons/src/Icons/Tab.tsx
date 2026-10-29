// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgTab({
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
      <path d="M14.546.454H1.455C.655.454 0 1.108 0 1.908V12.09c0 .8.655 1.454 1.455 1.454h13.09c.8 0 1.455-.654 1.455-1.454V1.908c0-.8-.655-1.454-1.454-1.454m0 11.636H1.455V1.908h7.272v2.91h5.819z" />
    </svg>
  );
}
export default SvgTab;

