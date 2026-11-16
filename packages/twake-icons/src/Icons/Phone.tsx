// Automatically created, please run `scripts/generate-svgr.sh ` to regenerate;
import * as React from "react";
import type { SVGProps } from "react";
function SvgPhone({
  iconRef,
  ...props
}: SVGProps<SVGSVGElement> & {
  iconRef?: React.Ref<SVGSVGElement>,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 16"
      ref={iconRef}
      {...props}
    >
      <path d="M9.628.007 2.355 0C1.555 0 .908.655.908 1.455v13.09c0 .8.647 1.455 1.447 1.455h7.273c.8 0 1.454-.655 1.454-1.454V1.455c0-.8-.654-1.448-1.454-1.448m0 13.084H2.355V2.909h7.273z" />
    </svg>
  );
}
export default SvgPhone;

